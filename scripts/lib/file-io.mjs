import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { ROOT } from "./template-constants.mjs";
import { ValidationError } from "./validation-error.mjs";

/**
 * JSON ファイルを読み取ります。失敗時はパス付きの例外を投げます。
 *
 * 収集・検証フェーズでの使用を想定し、ValidationError で投げます。
 * 実行フェーズで使う場合（updateJsonFile）は呼び出し側で Error に変換します。
 *
 * @param {string} path 読み取るファイルのパスです。
 *
 * @returns {Record<string, unknown>} 解析した JSON オブジェクトです。
 */
function readJsonFile(path) {
  let content;

  try {
    content = readFileSync(path, "utf8");
  } catch (error) {
    throw new ValidationError(
      `${path}: ファイルを読み取れません。${error instanceof Error ? error.message : String(error)}`,
    );
  }

  let data;

  try {
    data = JSON.parse(content);
  } catch (error) {
    throw new ValidationError(
      `${path}: JSON として解析できません。${error instanceof Error ? error.message : String(error)}`,
    );
  }

  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    throw new ValidationError(`${path}: JSON オブジェクトではありません。`);
  }

  return data;
}

/**
 * JSON ファイルを読み取り、更新関数を適用して書き戻します。失敗時はパス付きの例外を投げます。
 *
 * 実行フェーズでの使用を想定し、読み取り失敗（readJsonFile の ValidationError）も Error に変換して部分状態の可能性を示します。
 *
 * @param {string} path 更新するファイルのパスです。
 * @param {function(Record<string, unknown>): void} update 読み取ったデータを更新する関数です。
 */
function updateJsonFile(path, update) {
  let data;

  try {
    data = readJsonFile(path);
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);

    throw new Error(detail, { cause: error });
  }

  update(data);
  try {
    writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`);
  } catch (error) {
    throw new Error(
      `${path}: ファイルを書き込めません。${error instanceof Error ? error.message : String(error)}`,
      { cause: error },
    );
  }
}

/**
 * パッケージ README の 1 行目（タイトル行）を読み取ります。
 *
 * 改行は CRLF・LF の両対応で分割します（createAsker と統一）。
 *
 * @param {string} pkgDir パッケージの配置先（リポジトリールートからの相対パス）です。
 *
 * @returns {string} 1 行目の文字列です。
 */
function readPackageReadmeTitle(pkgDir) {
  const readmePath = join(ROOT, pkgDir, "README.md");
  let content;

  try {
    content = readFileSync(readmePath, "utf8");
  } catch (error) {
    throw new ValidationError(
      `${readmePath}: ファイルを読み取れません。${error instanceof Error ? error.message : String(error)}`,
    );
  }

  const firstLine = content.split(/\r?\n/u)[0];

  if (firstLine === undefined || firstLine.trim() === "") {
    throw new ValidationError(
      `${readmePath}: 1行目が空のためタイトルを置換できません。テンプレート構成を確認してください。`,
    );
  }

  return firstLine;
}

export { readJsonFile, updateJsonFile, readPackageReadmeTitle };
