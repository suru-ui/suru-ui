import { readFileSync, writeFileSync } from "node:fs";

import { ValidationError } from "../../lib/validation-error.mjs";

/** 初期化後に削除する README セクションの開始マーカーです。 */
const TEMPLATE_ONLY_START = "<!-- TEMPLATE_ONLY_START -->";

/** 初期化後に削除する README セクションの終了マーカーです。 */
const TEMPLATE_ONLY_END = "<!-- TEMPLATE_ONLY_END -->";

/**
 * README のテンプレート専用セクションを検証します。
 *
 * @param {string} path README のパスです。
 */
function assertTemplateOnlySection(path) {
  const content = readFileSync(path, "utf8");
  const startCount = content.split(TEMPLATE_ONLY_START).length - 1;
  const endCount = content.split(TEMPLATE_ONLY_END).length - 1;

  if (startCount !== 1 || endCount !== 1) {
    throw new ValidationError(
      `${path}: テンプレート専用セクションのマーカーが不正です（開始: ${startCount} 件、終了: ${endCount} 件。期待値: 各 1 件）。`,
    );
  }

  if (content.indexOf(TEMPLATE_ONLY_START) > content.indexOf(TEMPLATE_ONLY_END)) {
    throw new ValidationError(
      `${path}: テンプレート専用セクションの開始マーカーが終了マーカーより後にあります。`,
    );
  }
}

/**
 * 正規表現のメタ文字をエスケープします。
 *
 * @param {string} value エスケープする文字列です。
 *
 * @returns {string} エスケープ済みの文字列です。
 */
function escapeRegExp(value) {
  return value.replaceAll(/[.*+?^${}()|[\]\\]/gu, "\\$&");
}

/**
 * README からテンプレート専用セクションを削除します。
 *
 * @param {string} path README のパスです。
 */
function removeTemplateOnlySection(path) {
  const content = readFileSync(path, "utf8");
  const pattern = new RegExp(
    `${escapeRegExp(TEMPLATE_ONLY_START)}[\\s\\S]*?${escapeRegExp(TEMPLATE_ONLY_END)}(?:\\r?\\n)*`,
    "u",
  );
  const next = content.replace(pattern, "");

  if (next === content) {
    throw new ValidationError(`${path}: テンプレート専用セクションを削除できませんでした。`);
  }

  writeFileSync(path, next);
}

export { assertTemplateOnlySection, removeTemplateOnlySection };
