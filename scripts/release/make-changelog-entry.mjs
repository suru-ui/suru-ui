#!/usr/bin/env node
/**
 * リリース用の CHANGELOG 追記文面を生成します。
 *
 * release.yml「CHANGELOG を生成」相当です。同名パッケージの直前タグを起点にした差分を `$RUNNER_TEMP/release-changelog.md` に書き、`changelog` 出力として渡します。
 *
 * Usage: FIRST_TAG=... RELEASE_VERSION=... RELEASE_COUNT=... GITHUB_REPOSITORY=... RUNNER_TEMP=... node scripts/release/make-changelog-entry.mjs
 */

import { spawnSync, execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { appendOutputs } from "../lib/github-actions.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");

/**
 * CHANGELOG 追記の見出しを求めます。
 *
 * 複数パッケージ同時リリース時は集約用タイトル `v<バージョン>` を、単件時はパッケージタグを使います。
 *
 * @param {number} count 公開対象のパッケージ数です。
 * @param {string} version リリースするバージョンです。
 * @param {string} firstTag 先頭パッケージのタグです。
 *
 * @returns {string} 見出しです。
 */
function changelogHeading(count, version, firstTag) {
  if (count > 1) {
    return `v${version}`;
  }

  return firstTag;
}

/**
 * タグからパッケージ名を取り出します。
 *
 * 末尾の `@<バージョン>` を取り除きます。`@` がないタグはそのまま返します。
 *
 * @param {string} firstTag 先頭パッケージのタグです。
 *
 * @returns {string} パッケージ名です。
 */
function tagPackageName(firstTag) {
  const index = firstTag.lastIndexOf("@");

  if (index < 0) {
    return firstTag;
  }

  return firstTag.slice(0, index);
}

/**
 * 必須の環境変数を読み取ります。
 *
 * @param {string} name 環境変数名です。
 *
 * @returns {string} 環境変数の値です。
 */
function requiredEnv(name) {
  const value = process.env[name];

  if (value === undefined || value === "") {
    throw new Error(`環境変数 ${name} が設定されていません。`);
  }

  return value;
}

/**
 * 同名パッケージの直前タグを求めます。
 *
 * 見つからない場合は空文字列を返します。
 *
 * @param {string} packageName パッケージ名です。
 *
 * @returns {string} 直前タグ、または空文字列です。
 */
function findPreviousTag(packageName) {
  const result = spawnSync(
    "git",
    ["describe", "--tags", "--abbrev=0", "--match", `${packageName}@*`, "HEAD"],
    {
      cwd: ROOT,
      stdio: "pipe",
      encoding: "utf8",
    },
  );

  if (result.status !== 0) {
    return "";
  }

  return result.stdout.trim();
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

/** CHANGELOG 生成の入口です。 */
function main() {
  const firstTag = requiredEnv("FIRST_TAG");
  const releaseVersion = requiredEnv("RELEASE_VERSION");
  const releaseCountText = requiredEnv("RELEASE_COUNT");
  const repository = requiredEnv("GITHUB_REPOSITORY");
  const runnerTemp = requiredEnv("RUNNER_TEMP");

  const releaseCount = Number.parseInt(releaseCountText, 10);

  if (Number.isNaN(releaseCount)) {
    throw new TypeError("環境変数 RELEASE_COUNT が数値ではありません。");
  }

  const heading = changelogHeading(releaseCount, releaseVersion, firstTag);
  const packageName = tagPackageName(firstTag);
  const previousTag = findPreviousTag(packageName);
  const body = execFileSync(
    process.execPath,
    [join(ROOT, "scripts", "release", "generate-changelog.mjs"), repository, firstTag, previousTag],
    { encoding: "utf8" },
  );
  const entry = `## ${heading}\n\n${body}\n`;
  writeFileSync(join(runnerTemp, "release-changelog.md"), entry);
  appendOutputs({ changelog: entry });
}

if (isMainModule()) {
  try {
    main();
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}

export { tagPackageName, changelogHeading };
