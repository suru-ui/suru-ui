#!/usr/bin/env node
/**
 * 指定したワークスペースの推移的な内部依存を、依存先から順にビルドします。
 *
 * CI の「内部依存パッケージのビルド」と等価です。対象自身はビルドしません。
 *
 * Usage: node scripts/ci/build-dependencies.mjs <target-directory>
 */

import { spawnSync } from "node:child_process";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { readWorkspaceEntries, collectTransitiveDependencies } from "../lib/workspace-graph.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

/** 使用方法を表示します。 */
function printHelp() {
  console.log(`使い方: node scripts/ci/build-dependencies.mjs <target-directory>

<target-directory> の推移的な内部依存を、依存先から順にビルドします。
対象自身はビルドしません。`);
}

/**
 * 内部依存パッケージを 1 件ビルドします。
 *
 * @param {{ dir: string, name?: string }} dependency ビルド対象のワークスペースです。
 */
function buildDependency(dependency) {
  const dir = dependency.dir;
  const name = dependency.name ?? dir;
  console.log(`${dir} で内部依存パッケージ ${name} をビルドします`);

  const result = spawnSync("pnpm", ["run", "build"], {
    cwd: join(ROOT, dir),
    stdio: "inherit",
  });

  if (result.error !== undefined) {
    throw new Error(`${dir}: pnpm run build を起動できませんでした。${result.error.message}`);
  }

  if (result.status !== 0) {
    throw new Error(
      `${dir}: pnpm run build が失敗しました（終了コード: ${result.status ?? "不明"}）。`,
    );
  }

  console.log();
}

/** スクリプトの入口です。 */
function main() {
  const args = process.argv.slice(2);

  if (args.length !== 1 || args[0] === "-h" || args[0] === "--help") {
    printHelp();

    if (args.length === 1 && (args[0] === "-h" || args[0] === "--help")) {
      return;
    }

    throw new Error("対象ディレクトリーを 1 つ指定してください。");
  }

  const target = args[0];
  const { entries } = readWorkspaceEntries(ROOT);
  const dependencies = collectTransitiveDependencies(entries, target);

  for (const dependency of dependencies) {
    buildDependency(dependency);
  }
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
