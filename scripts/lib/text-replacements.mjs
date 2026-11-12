import { readFileSync, writeFileSync } from "node:fs";

import { ValidationError } from "./validation-error.mjs";

/**
 * 文字列置換の前提件数を検証します。一切書き込みません。
 *
 * @param {{ path: string, from: string, expected: number }} item 検証する置換です。
 */
function assertReplacementCount(item) {
  if (item.from === "") {
    throw new ValidationError(`${item.path}: 置換元が空です。テンプレート構成を確認してください。`);
  }

  let content;

  try {
    content = readFileSync(item.path, "utf8");
  } catch (error) {
    throw new ValidationError(
      `${item.path}: ファイルを読み取れません。${error instanceof Error ? error.message : String(error)}`,
    );
  }

  const count = content.split(item.from).length - 1;

  if (count !== item.expected) {
    throw new ValidationError(
      `${item.path}: ${JSON.stringify(item.from)} が ${count} 箇所見つかりました（期待値: ${item.expected}）。テンプレート構成が変わっている可能性があります。`,
    );
  }
}

/**
 * ファイル内の文字列を置換します。置換対象が見つからない場合は例外を投げます。
 *
 * @param {string} path 対象ファイルのパスです。
 * @param {string} from 置換元の文字列です。
 * @param {string} to 置換先の文字列です。
 * @param {number} [expected] 期待される出現件数です。
 */
function replaceOrThrow(path, from, to, expected = 1) {
  if (from === "") {
    throw new Error(`${path}: 置換元が空のため置換できません。`);
  }

  const content = readFileSync(path, "utf8");
  const count = content.split(from).length - 1;

  if (count !== expected) {
    throw new Error(
      `${path}: ${JSON.stringify(from)} が ${count} 箇所見つかりました（期待値: ${expected}）。`,
    );
  }

  writeFileSync(path, content.split(from).join(to));
}

export { replaceOrThrow, assertReplacementCount };
