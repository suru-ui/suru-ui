#!/usr/bin/env node
/**
 * 公開対象のパッケージを検証します。
 *
 * private でない各ワークスペースを pack し、publint と attw で検証します。
 * CI の「パッケージ検証」と等価です。
 *
 * Usage: node scripts/ci/verify-packages.mjs
 */

import { spawnSync } from "node:child_process";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { readWorkspaceEntries } from "../lib/workspace-graph.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

/**
 * 値が JSON オブジェクトか判定します。
 *
 * @param {unknown} value 判定する値です。
 *
 * @returns {value is Record<string, unknown>} JSON オブジェクトの場合は true です。
 */
function isJsonObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * パッケージが非公開か判定します。
 *
 * @param {unknown} packageData package.json の内容です。
 *
 * @returns {boolean} private が true の場合は true です。
 */
function isPrivatePackage(packageData) {
  if (!isJsonObject(packageData)) {
    return false;
  }

  return packageData.private === true;
}

/**
 * 検証コマンドを 1 件実行します。
 *
 * @param {string} dir 実行先のワークスペースディレクトリーです。
 * @param {string[]} args pnpm に渡す引数です。
 * @param {string} label 表示用の名前です。
 */
function runCheck(dir, args, label) {
  const result = spawnSync("pnpm", args, {
    cwd: join(ROOT, dir),
    stdio: "inherit",
  });

  if (result.error !== undefined) {
    throw new Error(`${dir}: ${label} を起動できませんでした。${result.error.message}`);
  }

  if (result.status !== 0) {
    throw new Error(`${dir}: ${label} が失敗しました（終了コード: ${result.status ?? "不明"}）。`);
  }
}

/**
 * パッケージを pack して publint と attw で検証します。
 *
 * @param {string} dir 対象のワークスペースディレクトリーです。
 * @param {string} runnerTemp pack 成果物の出力先ディレクトリーです。
 */
function verifyPackage(dir, runnerTemp) {
  const packResult = spawnSync("pnpm", ["pack", "--pack-destination", runnerTemp], {
    cwd: join(ROOT, dir),
    encoding: "utf8",
  });

  if (packResult.error !== undefined) {
    throw new Error(`${dir}: pnpm pack を起動できませんでした。${packResult.error.message}`);
  }

  if (packResult.status !== 0) {
    throw new Error(
      `${dir}: pnpm pack が失敗しました（終了コード: ${packResult.status ?? "不明"}）。`,
    );
  }

  const file = packResult.stdout
    .split("\n")
    .findLast((line) => line.trim() !== "")
    ?.trim();

  if (file === undefined) {
    throw new Error(`${dir}: pnpm pack の出力からファイル名を取得できませんでした。`);
  }

  runCheck(dir, ["exec", "publint", file], "publint");
  runCheck(dir, ["exec", "attw", "--profile", "esm-only", file], "attw");
}

/**
 * 直接実行された場合に true を返します。
 *
 * テストから純粋関数を読み込む際に main() を実行しないために使います。
 *
 * @returns {boolean} 直接実行された場合は true です。
 */
function isMainModule() {
  const invoked = process.argv[1];

  if (invoked === undefined) {
    return false;
  }

  return resolve(invoked) === fileURLToPath(import.meta.url);
}

/** スクリプトの入口です。 */
function main() {
  const runnerTemp = process.env.RUNNER_TEMP;

  if (runnerTemp === undefined || runnerTemp === "") {
    throw new Error(
      "RUNNER_TEMP が設定されていません。GitHub Actions の実行環境で使ってください。",
    );
  }

  const { entries } = readWorkspaceEntries(ROOT);

  for (const entry of entries) {
    if (entry.missing) {
      continue;
    }

    if (isPrivatePackage(entry.data)) {
      continue;
    }

    verifyPackage(entry.dir, runnerTemp);
  }
}

if (isMainModule()) {
  try {
    main();
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}

export { isPrivatePackage };
