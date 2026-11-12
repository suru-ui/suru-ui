import { readFileSync, writeFileSync } from "node:fs";

import { ValidationError } from "../../lib/validation-error.mjs";

/**
 * mise init 後に .gitignore へ追記するテストファイルのパターンです。
 */
const SCRIPTS_TEST_GITIGNORE_PATTERN = "scripts/**/*.test.mjs";

/** .gitignore へ追記するコメント行です。 */
const SCRIPTS_TEST_GITIGNORE_COMMENT =
  "# scripts の node:test 用テストファイルは初期化後のリポジトリーでは追跡しません。";

/**
 * .gitignore が読み取れることを検証します。一切書き込みません。
 *
 * @param {string} path .gitignore のパスです。
 */
function assertScriptsTestGitignore(path) {
  try {
    readFileSync(path, "utf8");
  } catch (error) {
    throw new ValidationError(
      `${path}: ファイルを読み取れません。${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

/**
 * .gitignore にテストファイルのパターンがなければ追記します。既にある場合は何もしません。
 *
 * 改行コードは既存の内容に合わせ、CRLF・LF のどちらも維持します。
 *
 * @param {string} path .gitignore のパスです。
 *
 * @returns {boolean} 追記した場合は true、既にあった場合は false です。
 */
function ensureScriptsTestGitignore(path) {
  let content;

  try {
    content = readFileSync(path, "utf8");
  } catch (error) {
    throw new Error(
      `${path}: ファイルを読み取れません。${error instanceof Error ? error.message : String(error)}`,
      { cause: error },
    );
  }

  const lines = content.split(/\r?\n/u);

  if (lines.some((line) => line.trim() === SCRIPTS_TEST_GITIGNORE_PATTERN)) {
    return false;
  }

  const newline = content.includes("\r\n") ? "\r\n" : "\n";
  const body = content === "" || content.endsWith("\n") ? content : `${content}${newline}`;
  const block = `${SCRIPTS_TEST_GITIGNORE_COMMENT}${newline}${SCRIPTS_TEST_GITIGNORE_PATTERN}${newline}`;
  writeFileSync(path, `${body}${block}`);

  return true;
}

export { assertScriptsTestGitignore, ensureScriptsTestGitignore, SCRIPTS_TEST_GITIGNORE_PATTERN };
