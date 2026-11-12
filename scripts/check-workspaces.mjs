#!/usr/bin/env node
/**
 * ワークスペース定義の整合性を検証します。
 *
 * ルート package.json・pnpm-workspace.yaml・*.code-workspace の集合が一致すること、パッケージ名と配置先が重複しないこと、内部依存が workspace: プロトコルを使っていることを確認します。
 *
 * Usage: node scripts/check-workspaces.mjs
 */

import { readdirSync, readFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { sameStringSet, parsePnpmWorkspacePackages } from "./lib/workspace-checks.mjs";
import {
  DEPENDENCY_KEYS,
  readWorkspaceEntries,
  normalizeWorkspaceDir,
} from "./lib/workspace-graph.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/**
 * ルートの *.code-workspace の folders に含まれるパスを読み取ります。
 *
 * @returns {string[]} VS Code ワークスペースのパスです。
 */
function readCodeWorkspacePaths() {
  const files = readdirSync(ROOT).filter((name) => name.endsWith(".code-workspace"));

  if (files.length !== 1) {
    throw new Error(`ルートに *.code-workspace が ${files.length} 個あります（期待値: 1）。`);
  }

  const path = join(ROOT, files[0]);
  const content = readFileSync(path, "utf8");
  const paths = [];
  const pattern = /"path"\s*:\s*"(?<path>[^"]+)"/gu;
  let match;

  while ((match = pattern.exec(content)) !== null) {
    const value = normalizeWorkspaceDir(match.groups?.path ?? "");

    if (value !== "." && value !== "") {
      paths.push(value);
    }
  }

  return paths;
}

/**
 * 内部依存が pnpm の workspace: プロトコルで指定されていることを確認します。
 *
 * @param {Array<{ dir: string, name?: string, data?: Record<string, unknown> }>} entries ワークスペースの一覧です。
 */
function assertInternalDependencyProtocols(entries) {
  const names = new Set(entries.map((entry) => entry.name).filter((name) => name !== undefined));

  for (const entry of entries) {
    const data = entry.data;

    if (data === undefined) {
      continue;
    }

    for (const key of DEPENDENCY_KEYS) {
      const deps = data[key];

      if (typeof deps !== "object" || deps === null || Array.isArray(deps)) {
        continue;
      }

      for (const [name, spec] of Object.entries(deps)) {
        if (!names.has(name) || name === entry.name) {
          continue;
        }

        if (typeof spec !== "string" || !spec.startsWith("workspace:")) {
          throw new Error(
            `${entry.dir}/package.json: 内部依存 ${name} は "workspace:" プロトコルで指定してください（現在: ${JSON.stringify(spec)}）。pnpm publish 時にバージョンが書き換わらず、依存範囲が古くなる恐れがあります。`,
          );
        }
      }
    }
  }
}

/** 検証の入口です。 */
function main() {
  const { entries } = readWorkspaceEntries(ROOT);
  const dirs = entries.map((entry) => normalizeWorkspaceDir(entry.dir));

  if (entries.some((entry) => entry.missing)) {
    const missing = entries.filter((entry) => entry.missing).map((entry) => entry.path);

    throw new Error(`package.json が見つからないワークスペースがあります:\n${missing.join("\n")}`);
  }

  if (new Set(dirs).size !== dirs.length) {
    throw new Error("workspaces に同じディレクトリーが重複しています。");
  }

  const names = entries.map((entry) => entry.name);

  if (names.some((name) => name === undefined)) {
    throw new Error("name のないワークスペースがあります。");
  }

  if (new Set(names).size !== names.length) {
    throw new Error("workspaces のパッケージ名が重複しています。");
  }

  if (!dirs.includes("website")) {
    throw new Error("workspaces に website が含まれていません。");
  }

  const pnpmPath = join(ROOT, "pnpm-workspace.yaml");
  const pnpmPackages = parsePnpmWorkspacePackages(readFileSync(pnpmPath, "utf8"));

  if (pnpmPackages.length === 0) {
    throw new Error(
      `${pnpmPath}: packages の一覧が見つかりません（期待値: "packages:" に続くフロー配列）。`,
    );
  }

  if (!sameStringSet(dirs, pnpmPackages)) {
    throw new Error(
      `pnpm-workspace.yaml の packages が package.json の workspaces と一致しません。\npackage.json: ${JSON.stringify(dirs)}\npnpm-workspace.yaml: ${JSON.stringify(pnpmPackages)}`,
    );
  }

  const codeWorkspacePaths = readCodeWorkspacePaths();

  if (!sameStringSet(dirs, codeWorkspacePaths)) {
    throw new Error(
      `*.code-workspace の folders が package.json の workspaces と一致しません。\nworkspaces: ${JSON.stringify(dirs)}\ncode-workspace: ${JSON.stringify(codeWorkspacePaths)}`,
    );
  }

  assertInternalDependencyProtocols(entries);
  console.log("workspace 定義は一貫しています。");
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
