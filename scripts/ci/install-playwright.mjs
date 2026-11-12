#!/usr/bin/env node
/**
 * Playwright のブラウザーをインストールします。
 *
 * カレントディレクトリーのパッケージが playwright に依存している場合だけ、制限時間付きで最大 3 回再試行します。
 * CI の「Playwright をインストール」とリリースのテスト手順を共通化するための入口です。
 *
 * Usage: node scripts/ci/install-playwright.mjs
 */

import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { readJson } from "../lib/workspace-graph.mjs";

/** インストールを試行する最大回数です。 */
const MAX_ATTEMPTS = 3;

/** 再試行の前に待機する秒数です。 */
const RETRY_INTERVAL_SECONDS = 10;

/** PLAYWRIGHT_TIMEOUT_MINUTES が未設定のときに使う制限時間（分）です。 */
const DEFAULT_TIMEOUT_MINUTES = 4;

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
 * パッケージが Playwright に依存しているか判定します。
 *
 * dependencies と devDependencies のキーに `playwright` を含むものがあるかを確認します。
 * 元の shell の `grep -q playwright package.json` と等価になるよう、部分一致で判定します。
 *
 * @param {unknown} packageData package.json の内容です。
 *
 * @returns {boolean} Playwright に依存している場合は true です。
 */
function needsPlaywright(packageData) {
  if (!isJsonObject(packageData)) {
    return false;
  }

  for (const key of ["dependencies", "devDependencies"]) {
    const deps = packageData[key];

    if (!isJsonObject(deps)) {
      continue;
    }

    if (Object.keys(deps).some((name) => name.includes("playwright"))) {
      return true;
    }
  }

  return false;
}

/**
 * PLAYWRIGHT_TIMEOUT_MINUTES の文字列表現を分単位の数値に変換します。
 *
 * 未設定または空文字列のときは既定値を返します。
 *
 * @param {string | undefined} raw PLAYWRIGHT_TIMEOUT_MINUTES の値です。
 *
 * @returns {number} 分単位の制限時間です。
 */
function parseTimeoutMinutes(raw) {
  if (raw === undefined || raw === "") {
    return DEFAULT_TIMEOUT_MINUTES;
  }

  const minutes = Number(raw);

  if (!Number.isFinite(minutes) || minutes <= 0) {
    throw new Error(
      `PLAYWRIGHT_TIMEOUT_MINUTES が不正です: ${JSON.stringify(raw)}。正の数を指定してください。`,
    );
  }

  return minutes;
}

/**
 * 指定した秒数だけ待機します。
 *
 * @param {number} seconds 待機する秒数です。
 */
function sleepSeconds(seconds) {
  spawnSync("sleep", [String(seconds)], { stdio: "inherit" });
}

/**
 * 指定したディレクトリーで Playwright のブラウザーをインストールします。
 *
 * apt 処理の停止に備えて、制限時間付きで最大 3 回再試行します。
 * 試行の間は 10 秒待機します（最終試行の後は待ちません）。
 *
 * @param {string} targetDir インストール先のディレクトリーです。
 * @param {number} timeoutMinutes 1 回あたりの制限時間（分）です。
 */
function installPlaywright(targetDir, timeoutMinutes) {
  const timeout = timeoutMinutes * 60 * 1000;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    console.log(`Playwright をインストールします。（試行 ${attempt}/${MAX_ATTEMPTS}）`);

    const result = spawnSync("pnpm", ["exec", "playwright", "install", "--with-deps"], {
      cwd: targetDir,
      stdio: "inherit",
      timeout,
    });

    if (result.status === 0) {
      return;
    }

    if (attempt === MAX_ATTEMPTS) {
      throw new Error(
        `Playwright のインストールに失敗しました。（試行 ${attempt}/${MAX_ATTEMPTS}）`,
      );
    }

    console.log(
      `Playwright のインストールに失敗したため ${RETRY_INTERVAL_SECONDS} 秒待機して再試行します。（試行 ${attempt}/${MAX_ATTEMPTS}）`,
    );
    sleepSeconds(RETRY_INTERVAL_SECONDS);
  }
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
  const packageData = readJson("package.json");

  if (!needsPlaywright(packageData)) {
    console.log("playwright への依存がないためインストールをスキップします。");

    return;
  }

  installPlaywright(process.cwd(), parseTimeoutMinutes(process.env.PLAYWRIGHT_TIMEOUT_MINUTES));
}

if (isMainModule()) {
  try {
    main();
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}

export { needsPlaywright, installPlaywright, parseTimeoutMinutes };
