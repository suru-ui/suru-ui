#!/usr/bin/env node
/**
 * CHANGELOG.md にリリース文面を追記します。
 *
 * release.yml「CHANGELOG.md に追記」相当です。`$RUNNER_TEMP/release-changelog.md` の内容を CHANGELOG.md の先頭（タイトル行の直後）に挿入します。
 *
 * Usage: RUNNER_TEMP=... node scripts/release/append-changelog.mjs
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");

/**
 * CHANGELOG の先頭に追記文面を合成します。
 *
 * 1 行目を残し、空行と追記文面を挟んで残りを続けます。
 *
 * @param {string} base 既存の CHANGELOG.md の内容です。
 * @param {string} entry 追記する文面です。
 *
 * @returns {string} 合成した CHANGELOG.md の内容です。
 */
function mergeChangelog(base, entry) {
  const index = base.indexOf("\n");
  const first = index < 0 ? base : base.slice(0, index + 1);
  const rest = index < 0 ? "" : base.slice(index + 1);

  return `${first}\n${entry}${rest}`;
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

/** CHANGELOG 追記の入口です。 */
function main() {
  const runnerTemp = requiredEnv("RUNNER_TEMP");
  const changelogPath = join(ROOT, "CHANGELOG.md");

  if (!existsSync(changelogPath)) {
    writeFileSync(changelogPath, "# Changelog\n");
  }

  const base = readFileSync(changelogPath, "utf8");
  const entry = readFileSync(join(runnerTemp, "release-changelog.md"), "utf8");
  writeFileSync(changelogPath, mergeChangelog(base, entry));
}

if (isMainModule()) {
  try {
    main();
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}

export { mergeChangelog };
