#!/usr/bin/env node
/**
 * 失敗時に release コミットを取り消します。
 *
 * リモート先頭がこの実行のコミットの場合のみ取り消します。
 * 検証前の失敗や後続コミットがある場合は、前回の正常リリースを壊さないよう何もしません。
 * 取り消しに失敗しても警告して続けます。
 *
 * Usage: node scripts/release/rollback-commit.mjs
 */

import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * リモート先頭の SHA を取得します。
 *
 * 取得できない場合は空文字を返します。
 *
 * @param {string} branch 対象のブランチです。
 *
 * @returns {string} リモート先頭の SHA です。
 */
function readRemoteSha(branch) {
  const result = spawnSync("git", ["rev-parse", `origin/${branch}`], {
    stdio: ["ignore", "pipe", "ignore"],
    encoding: "utf8",
  });

  if (result.status !== 0) {
    return "";
  }

  if (typeof result.stdout !== "string") {
    return "";
  }

  return result.stdout.trim();
}

/**
 * 直接実行された場合に true を返します。
 *
 * テストから読み込む際に main() を実行しないために使います。
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
  const commitSha = process.env.COMMIT_SHA ?? "";
  const commitBranch = process.env.COMMIT_BRANCH ?? "";

  if (commitBranch === "") {
    console.log(
      "::warning::fetch に失敗したためコミットの取り消しをスキップします。手動で確認してください。",
    );

    return;
  }

  const fetched = spawnSync("git", ["fetch", "origin", commitBranch, "--tags", "--force"], {
    stdio: "inherit",
  });

  if (fetched.status !== 0) {
    console.log(
      "::warning::fetch に失敗したためコミットの取り消しをスキップします。手動で確認してください。",
    );

    return;
  }

  const remoteSha = readRemoteSha(commitBranch);

  if (commitSha === "" || remoteSha !== commitSha) {
    console.log(
      "::notice::リモート先頭がこの実行の release コミットではないためコミットの取り消しをスキップします。",
    );

    return;
  }

  console.log(`release コミットを取り消します: ${commitSha}`);

  const pushed = spawnSync(
    "git",
    ["push", "--force-with-lease", "origin", `HEAD~1:${commitBranch}`],
    {
      stdio: "inherit",
    },
  );

  if (pushed.status !== 0) {
    console.log(
      "::warning::release コミットの取り消し push に失敗しました。手動で確認してください。",
    );

    return;
  }

  const reset = spawnSync("git", ["reset", "--hard", "HEAD~1"], {
    stdio: "inherit",
  });

  if (reset.status !== 0) {
    console.log("::warning::ローカルの reset に失敗しました。");
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
