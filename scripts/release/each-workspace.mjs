#!/usr/bin/env node
/**
 * release ワークフローのビルド・静的検証・テストを各ワークスペースで実行します。
 *
 * 元の GitHub Actions の shell 処理を 1 スクリプトに集約したものです。
 * workspaces の記載順に処理します。
 * workspaces の定義順がトポロジカル順（依存される側が先）であることを前提に、上から順に実行します。順序は mise run test:check で検証済みです。
 *
 * Usage: node scripts/release/each-workspace.mjs <build|check|test>
 */

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { needsPlaywright, installPlaywright } from "../ci/install-playwright.mjs";
import { endGroup, startGroup, issueNotice } from "../lib/github-actions.mjs";
import { readWorkspaceEntries } from "../lib/workspace-graph.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

/**
 * mise tasks --json の出力に指定したタスクが含まれるか判定します。
 *
 * JSON として解析できない場合や配列でない場合は false を返します。
 *
 * @param {string} tasksJson mise tasks --json の出力です。
 * @param {string} taskName 探すタスク名です。
 *
 * @returns {boolean} タスクが含まれる場合は true です。
 */
function hasTask(tasksJson, taskName) {
  let tasks;

  try {
    tasks = JSON.parse(tasksJson);
  } catch {
    return false;
  }

  if (!Array.isArray(tasks)) {
    return false;
  }

  return tasks.some((task) => typeof task === "object" && task !== null && task.name === taskName);
}

/**
 * package.json の内容に build スクリプトがあるか判定します。
 *
 * @param {unknown} packageData package.json の内容です。
 *
 * @returns {boolean} build スクリプトがある場合は true です。
 */
function hasBuildScript(packageData) {
  if (typeof packageData !== "object" || packageData === null || Array.isArray(packageData)) {
    return false;
  }

  const scripts = packageData.scripts;

  if (typeof scripts !== "object" || scripts === null || Array.isArray(scripts)) {
    return false;
  }

  return typeof scripts.build === "string";
}

/**
 * package.json の内容が private パッケージか判定します。
 *
 * @param {unknown} packageData package.json の内容です。
 *
 * @returns {boolean} private パッケージの場合は true です。
 */
function isPrivatePackage(packageData) {
  if (typeof packageData !== "object" || packageData === null || Array.isArray(packageData)) {
    return false;
  }

  return packageData.private === true;
}

/**
 * playwright のブラウザー導入が必要か判定します。
 *
 * PLAYWRIGHT_BROWSERS_PATH が設定されている環境（Playwright コンテナーなど）ではブラウザーが同梱されているため導入しません。
 *
 * @param {unknown} packageData package.json の内容です。
 * @param {string | undefined} browsersPath PLAYWRIGHT_BROWSERS_PATH の値です。
 *
 * @returns {boolean} 導入が必要な場合は true です。
 */
function shouldInstallPlaywright(packageData, browsersPath) {
  if (typeof browsersPath === "string" && browsersPath !== "") {
    return false;
  }

  return needsPlaywright(packageData);
}

/**
 * コマンドを実行し、失敗した場合は例外を投げます。
 *
 * @param {string} command 実行するコマンドです。
 * @param {string[]} args コマンドの引数です。
 * @param {string} dir 作業ディレクトリーです。リポジトリールートからの相対パスです。
 *
 * @returns {void} 戻り値はありません。
 */
function runOrThrow(command, args, dir) {
  const result = spawnSync(command, args, {
    cwd: join(ROOT, dir),
    stdio: "inherit",
  });

  if (result.error !== undefined) {
    throw new Error(`${dir}: ${command} を起動できませんでした。${result.error.message}`);
  }

  if (result.status !== 0) {
    throw new Error(`${dir}: ${command} が失敗しました（終了コード: ${String(result.status)}）。`);
  }
}

/**
 * mise のタスク一覧を JSON として取得します。
 *
 * @param {string} dir 作業ディレクトリーです。リポジトリールートからの相対パスです。
 *
 * @returns {string} mise tasks --json の標準出力です。
 */
function listMiseTasksJson(dir) {
  const result = spawnSync("mise", ["tasks", "--json"], {
    cwd: join(ROOT, dir),
    encoding: "utf8",
  });

  if (result.error !== undefined) {
    throw new Error(`${dir}: mise tasks --json を起動できませんでした。${result.error.message}`);
  }

  if (result.status !== 0) {
    throw new Error(
      `${dir}: mise tasks --json が失敗しました（終了コード: ${String(result.status)}）。`,
    );
  }

  return result.stdout;
}

/**
 * 各ワークスペースでビルドを実行します。
 *
 * website は公開対象外のため除外します。
 * build スクリプトのないワークスペースは通知してスキップします。
 *
 * @param {Array<{ dir: string, name?: string, data?: Record<string, unknown>, missing: boolean }>} entries ワークスペースの一覧です。
 *
 * @returns {void} 戻り値はありません。
 */
function runBuild(entries) {
  for (const entry of entries) {
    if (entry.missing) {
      continue;
    }

    if (entry.name === "website") {
      continue;
    }

    const dir = entry.dir;

    if (!hasBuildScript(entry.data)) {
      issueNotice(`${dir} には build スクリプトがないためスキップします。`);

      continue;
    }

    startGroup(dir);

    try {
      runOrThrow("pnpm", ["run", "build"], dir);
    } finally {
      endGroup();
    }
  }
}

/**
 * 各ワークスペースで静的検証を実行します。
 *
 * private パッケージは対象外のため除外します。
 * test:check タスクのないワークスペースは通知してスキップします。
 *
 * @param {Array<{ dir: string, name?: string, data?: Record<string, unknown>, missing: boolean }>} entries ワークスペースの一覧です。
 *
 * @returns {void} 戻り値はありません。
 */
function runCheck(entries) {
  for (const entry of entries) {
    if (entry.missing) {
      continue;
    }

    if (isPrivatePackage(entry.data)) {
      continue;
    }

    const dir = entry.dir;
    startGroup(dir);

    try {
      const tasksJson = listMiseTasksJson(dir);

      if (!hasTask(tasksJson, "test:check")) {
        issueNotice(`${dir} には test:check タスクがないためスキップします。`);

        continue;
      }

      runOrThrow("mise", ["run", "test:check"], dir);
    } finally {
      endGroup();
    }
  }
}

/**
 * 各ワークスペースでテストを実行します。
 *
 * private パッケージは対象外のため除外します。
 * playwright に依存するワークスペースは事前にブラウザーを導入します。
 * ただし PLAYWRIGHT_BROWSERS_PATH 設定時（Playwright コンテナーなど）は導入しません。
 * pretest.sh があるワークスペースは先に実行します。
 * test タスクのないワークスペースは通知してスキップします。
 *
 * @param {Array<{ dir: string, name?: string, data?: Record<string, unknown>, missing: boolean }>} entries ワークスペースの一覧です。
 *
 * @returns {void} 戻り値はありません。
 */
function runTest(entries) {
  for (const entry of entries) {
    if (entry.missing) {
      continue;
    }

    if (isPrivatePackage(entry.data)) {
      continue;
    }

    const dir = entry.dir;
    startGroup(dir);

    try {
      if (shouldInstallPlaywright(entry.data, process.env.PLAYWRIGHT_BROWSERS_PATH)) {
        installPlaywright(join(ROOT, dir), 9);
      }

      if (existsSync(join(ROOT, dir, "scripts", "pretest.sh"))) {
        runOrThrow("bash", ["-euo", "pipefail", "./scripts/pretest.sh"], dir);
      }

      const tasksJson = listMiseTasksJson(dir);

      if (!hasTask(tasksJson, "test")) {
        issueNotice(`${dir} には test タスクがないためスキップします。`);

        continue;
      }

      runOrThrow("mise", ["run", "test"], dir);
    } finally {
      endGroup();
    }
  }
}

/**
 * 使用方法を表示します。
 *
 * @returns {void} 戻り値はありません。
 */
function printHelp() {
  console.log(`使い方: node scripts/release/each-workspace.mjs <build|check|test>

release ワークフローのビルド・静的検証・テストを各ワークスペースで実行します。
第 1 引数に build、check、test のいずれかを指定します。`);
}

/**
 * スクリプトの入口です。
 *
 * @returns {void} 戻り値はありません。
 */
function main() {
  const args = process.argv.slice(2);
  const mode = args[0];

  if (args.length !== 1 || (mode !== "build" && mode !== "check" && mode !== "test")) {
    printHelp();

    throw new Error("build、check、test のいずれか 1 つを指定してください。");
  }

  const { entries } = readWorkspaceEntries(ROOT);

  if (mode === "build") {
    runBuild(entries);

    return;
  }

  if (mode === "check") {
    runCheck(entries);

    return;
  }

  runTest(entries);
}

// 直接実行された場合のみ入口を実行します。テストからの import 時は何もしません。
if (process.argv[1] !== undefined && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}

export { hasTask, hasBuildScript, shouldInstallPlaywright };
