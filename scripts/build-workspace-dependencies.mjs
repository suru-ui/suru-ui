#!/usr/bin/env node
/**
 * 指定したワークスペースの内部依存を、依存先から順に出力します。
 *
 * CI で対象パッケージをビルドする前に、推移的な依存パッケージをビルドするために使います。
 *
 * Usage: node scripts/build-workspace-dependencies.mjs <target-directory>
 */

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { readWorkspaceEntries, collectTransitiveDependencies } from "./lib/workspace-graph.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/** 使用方法を表示します。 */
function printHelp() {
  console.log(`使い方: node scripts/build-workspace-dependencies.mjs <target-directory>

<target-directory> の推移的な内部依存を、依存先から順に 1 行 1 ディレクトリーで出力します。
対象自身は出力に含めません。`);
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
    console.log(dependency.dir);
  }
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
