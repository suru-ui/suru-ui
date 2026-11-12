#!/usr/bin/env node
/**
 * release.yml の「npm に公開」と等価の処理を実行します。
 *
 * 連続 publish でのレート制限（429）を避けるため、パッケージ間に待機を入れ、制限検出時は指数バックオフで再試行します。
 * この実行で公開した版は released-npm.txt に記録します。
 *
 * Usage: LIST=... RUNNER_TEMP=... node scripts/release/publish-npm.mjs
 */

import { spawnSync } from "node:child_process";
import { writeFileSync, appendFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { issueNotice } from "../lib/github-actions.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const PUBLISH_INTERVAL_SECONDS = 15;
const MAX_RETRIES = 5;
const RETRY_BASE_SECONDS = 30;

/**
 * 出力が npm のレート制限エラーかどうかを判定します。
 *
 * @param {string} text コマンドの出力です。
 *
 * @returns {boolean} レート制限エラーの場合は true、そうでない場合は false です。
 */
function isRateLimitError(text) {
  return /429|too many requests|rate limit/iu.test(text);
}

/**
 * 再試行までの待機秒数を求めます。
 *
 * @param {number} attempt 試行回数（1 始まり）です。
 * @param {number} baseSeconds 基準の秒数です。
 *
 * @returns {number} 待機する秒数です。
 */
function backoffSeconds(attempt, baseSeconds) {
  return baseSeconds * 2 ** (attempt - 1);
}

/**
 * 指定した秒数だけ待機します。
 *
 * @param {number} seconds 待機する秒数です。
 */
function sleepSeconds(seconds) {
  const result = spawnSync("sleep", [String(seconds)], { stdio: "inherit" });

  if (result.error !== undefined) {
    throw new Error(`sleep を起動できませんでした。${result.error.message}`);
  }

  if (result.status !== 0) {
    throw new Error(`sleep が失敗しました（終了コード: ${result.status ?? "不明"}）。`);
  }
}

/**
 * パッケージを公開します。レート制限時は指数バックオフで再試行します。
 *
 * @param {string} dir パッケージのディレクトリーです。
 * @param {string} name パッケージ名です。
 * @param {string} version 公開するバージョンです。
 */
function publishWithRetry(dir, name, version) {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt += 1) {
    console.log(`${name}@${version} を公開します。（試行 ${attempt}/${MAX_RETRIES}）`);

    const result = spawnSync(
      "pnpm",
      ["publish", "--access", "public", "--no-git-checks", "--provenance"],
      {
        cwd: join(ROOT, dir),
        encoding: "utf8",
      },
    );
    const output = `${result.stdout ?? ""}${result.stderr ?? ""}`;

    if (output !== "") {
      console.log(output);
    }

    if (result.error === undefined && result.status === 0) {
      return;
    }

    if (!isRateLimitError(output)) {
      throw new Error(`${name}@${version} の公開に失敗しました。`);
    }

    if (attempt >= MAX_RETRIES) {
      throw new Error(`${name}@${version} の公開でレート制限が解消しませんでした。`);
    }

    const waitSeconds = backoffSeconds(attempt, RETRY_BASE_SECONDS);
    issueNotice(
      `npm のレート制限を検出しました。${waitSeconds}s 待機して再試行します。（試行 ${attempt}/${MAX_RETRIES}）`,
    );
    sleepSeconds(waitSeconds);
  }
}

/** npm 公開の入口です。 */
function main() {
  const listText = process.env.LIST ?? "";

  if (listText === "") {
    throw new Error("LIST が設定されていません。");
  }

  const runnerTemp = process.env.RUNNER_TEMP ?? "";

  if (runnerTemp === "") {
    throw new Error("RUNNER_TEMP が設定されていません。");
  }

  const publishedFile = join(runnerTemp, "released-npm.txt");
  writeFileSync(publishedFile, "", "utf8");

  let first = true;

  for (const line of listText.split("\n")) {
    const parts = line.split("\t");
    const dir = parts[0] ?? "";
    const name = parts[1] ?? "";
    const version = parts[2] ?? "";

    if (name === "") {
      continue;
    }

    if (first) {
      first = false;
    } else {
      issueNotice(`npm のレート制限を避けるため ${PUBLISH_INTERVAL_SECONDS}s 待機します。`);
      sleepSeconds(PUBLISH_INTERVAL_SECONDS);
    }

    publishWithRetry(dir, name, version);
    appendFileSync(publishedFile, `${name}@${version}\n`, "utf8");
  }
}

/** 直接実行された場合のみ入口を実行します。 */
if (process.argv[1] !== undefined && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}

export { backoffSeconds, isRateLimitError };
