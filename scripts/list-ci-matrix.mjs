#!/usr/bin/env node
/**
 * CI のテスト matrix を package.json の workspaces から生成します。
 *
 * website はテスト対象外のため除外します。出力は GitHub Actions の `fromJSON()` にそのまま渡せる JSON です。
 *
 * Usage: node scripts/list-ci-matrix.mjs
 */

import { dirname, resolve, basename } from "node:path";
import { fileURLToPath } from "node:url";

import { readWorkspaceEntries } from "./lib/workspace-graph.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/**
 * matrix を生成します。
 *
 * @returns {{ package: Array<{ name: string, directory: string }> }} CI matrix です。
 */
function createMatrix() {
  const { entries } = readWorkspaceEntries(ROOT);
  const packages = [];

  for (const entry of entries) {
    if (entry.dir === "website") {
      continue;
    }

    if (entry.missing) {
      throw new Error(`${entry.path}: package.json が見つかりません。`);
    }

    packages.push({
      name: basename(entry.dir),
      directory: entry.dir,
    });
  }

  if (packages.length === 0) {
    throw new Error("CI のテスト対象ワークスペースがありません。");
  }

  return { package: packages };
}

try {
  console.log(JSON.stringify(createMatrix()));
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
