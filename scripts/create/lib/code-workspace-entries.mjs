import { statSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { ROOT } from "../../lib/template-constants.mjs";
import { ValidationError } from "../../lib/validation-error.mjs";

/**
 * JSONC のトークンです。コメントと空白は読み飛ばし、文字列と区切り記号だけを保持します。
 *
 * @typedef {object} JsoncToken
 *
 * @property {"string" | "punct"} type トークンの種類です。
 * @property {string} value 文字列の値、または `[`・`]`・`{`・`}`・`:`・`,` のいずれかです。
 * @property {number} start トークンの開始位置です。
 * @property {number} end トークンの終了位置です。
 */

/**
 * `folders` 配列の位置です。
 *
 * @typedef {object} FoldersArray
 *
 * @property {JsoncToken[]} tokens 解析したトークンの一覧です。
 * @property {number} openTokenIndex `[` のトークン位置です。
 * @property {number} closeTokenIndex 対応する `]` のトークン位置です。
 * @property {number} openIndex `[` の文字位置です。
 * @property {number} closeIndex `]` の文字位置です。
 */

/**
 * JSONC をトークンに分割します。
 *
 * 行コメントとブロックコメント、および文字列内のエスケープを認識します。
 * JSONC は文字列・区切り記号以外（数値・真偽値など）も含められますが、`folders` 配列の解析には不要なため読み飛ばします。
 *
 * @param {string} content JSONC の内容です。
 *
 * @returns {JsoncToken[]} トークンの一覧です。
 */
function tokenizeJsonc(content) {
  const tokens = [];
  let index = 0;

  while (index < content.length) {
    const char = content[index];

    if (char === "/" && content[index + 1] === "/") {
      const newline = content.indexOf("\n", index + 2);
      index = newline < 0 ? content.length : newline + 1;

      continue;
    }

    if (char === "/" && content[index + 1] === "*") {
      const close = content.indexOf("*/", index + 2);
      index = close < 0 ? content.length : close + 2;

      continue;
    }

    if (char === '"') {
      const start = index;

      index++;

      while (index < content.length) {
        const current = content[index];

        if (current === "\\") {
          index += 2;
          continue;
        }

        if (current === '"') {
          index++;
          break;
        }

        index++;
      }

      const raw = content.slice(start, index);
      let value = raw.slice(1, -1);

      try {
        value = JSON.parse(raw);
      } catch {
        // 不正な文字列は検証で扱えるよう、引用符を除いた生の値のままにします。
      }

      tokens.push({
        end: index,
        type: "string",
        start,
        value,
      });
      continue;
    }

    if ("[]{}:,".includes(char)) {
      tokens.push({
        end: index + 1,
        type: "punct",
        start: index,
        value: char,
      });
    }

    index++;
  }

  return tokens;
}

/**
 * JSONC 内の `"folders"` 配列を探します。
 *
 * 文字列・コメントを考慮したスキャンで対応する `]` を特定します。
 *
 * @param {string} content JSONC の内容です。
 *
 * @returns {FoldersArray | undefined} 見つかった場合は配列の位置、見つからない場合は undefined です。
 */
function findFoldersArray(content) {
  const tokens = tokenizeJsonc(content);

  for (let i = 0; i < tokens.length; i++) {
    const key = tokens[i];
    const colon = tokens[i + 1];
    const open = tokens[i + 2];

    if (
      key?.type !== "string" ||
      key.value !== "folders" ||
      colon?.type !== "punct" ||
      colon.value !== ":" ||
      open?.type !== "punct" ||
      open.value !== "["
    ) {
      continue;
    }

    let depth = 0;

    for (let j = i + 2; j < tokens.length; j++) {
      const token = tokens[j];

      if (token.type !== "punct") {
        continue;
      }

      if (token.value === "[" || token.value === "{") {
        depth++;
        continue;
      }

      if (token.value === "]" || token.value === "}") {
        depth--;

        if (depth === 0) {
          if (token.value !== "]") {
            return;
          }

          return {
            tokens,
            openIndex: open.start,
            closeIndex: token.start,
            openTokenIndex: i + 2,
            closeTokenIndex: j,
          };
        }

        if (depth < 0) {
          return;
        }
      }
    }
  }
}

/**
 * `folders` 配列内の `path` の値を集めます。
 *
 * @param {FoldersArray} folders 配列の位置です。
 *
 * @returns {string[]} 既存のフォルダーのパスの一覧です。
 */
function collectFolderPaths(folders) {
  const paths = [];

  for (let i = folders.openTokenIndex + 1; i < folders.closeTokenIndex; i++) {
    const key = folders.tokens[i];
    const colon = folders.tokens[i + 1];
    const value = folders.tokens[i + 2];

    if (
      key?.type === "string" &&
      key.value === "path" &&
      colon?.value === ":" &&
      value?.type === "string"
    ) {
      paths.push(value.value);
    }
  }

  return paths;
}

/**
 * `folders` 配列内で指定した `path` を持つ項目の開始トークン位置を探します。
 *
 * 配列直下のオブジェクトだけを対象にし、入れ子の `path` は無視します。
 *
 * @param {FoldersArray} folders 配列の位置です。
 * @param {string} path 探すフォルダーのパスです。
 *
 * @returns {number | undefined} 見つかった場合は `{` のトークン位置、見つからない場合は undefined です。
 */
function findFolderEntryTokenIndex(folders, path) {
  let depth = 0;
  let entryStart;

  for (let i = folders.openTokenIndex + 1; i < folders.closeTokenIndex; i++) {
    const token = folders.tokens[i];

    if (token.type !== "punct") {
      continue;
    }

    if (token.value === "{") {
      if (depth === 0) {
        entryStart = i;
      }

      depth++;
      continue;
    }

    if (token.value === "[") {
      depth++;
      continue;
    }

    if (token.value === "}" || token.value === "]") {
      depth--;

      if (depth === 0 && entryStart !== undefined) {
        const entryEnd = i;

        for (let j = entryStart; j < entryEnd; j++) {
          const key = folders.tokens[j];
          const colon = folders.tokens[j + 1];
          const value = folders.tokens[j + 2];

          if (
            key?.type === "string" &&
            key.value === "path" &&
            colon?.value === ":" &&
            value?.type === "string" &&
            value.value === path
          ) {
            return entryStart;
          }
        }

        entryStart = undefined;
      }
    }
  }
}

/**
 * 追加するフォルダーの JSONC を組み立てます。
 *
 * @param {{ name: string, path: string }[]} entries 追加するフォルダーです。
 * @param {string} entryIndent 項目のインデントです。
 * @param {string} fieldIndent 項目内のフィールドのインデントです。
 * @param {string} eol 改行コードです。
 *
 * @returns {string} 追加する JSONC です。
 */
function renderFolderEntries(entries, entryIndent, fieldIndent, eol) {
  return entries
    .map(
      (entry) =>
        `${entryIndent}{${eol}${fieldIndent}"name": ${JSON.stringify(entry.name)},${eol}${fieldIndent}"path": ${JSON.stringify(entry.path)},${eol}${entryIndent}},`,
    )
    .join(eol);
}

/**
 * 指定位置を含む行の先頭の空白を返します。
 *
 * @param {string} content ファイルの内容です。
 * @param {number} index 調べる文字位置です。
 *
 * @returns {string} 行頭の空白です。
 */
function lineIndent(content, index) {
  const lineStart = content.lastIndexOf("\n", index - 1) + 1;
  const prefix = content.slice(lineStart, index);
  const match = /^[ \t]*/u.exec(prefix);

  return match === null ? "" : match[0];
}

/**
 * code-workspace に `folders` 配列があることを検証します。一切書き込みません。
 *
 * @param {string} path code-workspace ファイルのパスです。
 */
function validateCodeWorkspaceFile(path) {
  let content;

  try {
    content = readFileSync(path, "utf8");
  } catch (error) {
    throw new ValidationError(
      `${path}: ファイルを読み取れません。${error instanceof Error ? error.message : String(error)}`,
    );
  }

  if (findFoldersArray(content) === undefined) {
    throw new ValidationError(
      `${path}: "folders" 配列が見つかりません。VS Code ワークスペースの構成を確認してください。`,
    );
  }
}

/**
 * `folders` 配列にまだないフォルダーを追加した JSONC を返します。
 *
 * 既存の項目とインデントを維持し、文字列・コメントを考慮して挿入します。
 * `website` の項目があればその直前、なければ対応する `]` の直前に追加します。
 * 末尾のカンマは JSONC の仕様に従って付与します。
 *
 * @param {string} content JSONC の内容です。
 * @param {{ name: string, path: string }[]} entries 追加するフォルダーです。
 *
 * @returns {string} 更新後の JSONC です。
 */
function appendCodeWorkspaceEntries(content, entries) {
  const folders = findFoldersArray(content);

  if (folders === undefined) {
    throw new Error(
      `"folders" 配列が見つかりません。VS Code ワークスペースの構成を確認してください。`,
    );
  }

  const existing = new Set(collectFolderPaths(folders));
  const additions = entries.filter((entry) => !existing.has(entry.path));

  if (additions.length === 0) {
    return content;
  }

  const closeToken = folders.tokens[folders.closeTokenIndex];
  const lastToken = folders.tokens[folders.closeTokenIndex - 1];

  if (lastToken === undefined || closeToken === undefined || lastToken.start < folders.openIndex) {
    throw new Error(
      `"folders" 配列の構造を解析できません。VS Code ワークスペースの構成を確認してください。`,
    );
  }

  const eol = content.includes("\r\n") ? "\r\n" : "\n";
  const lineStart = content.lastIndexOf("\n", folders.closeIndex - 1) + 1;
  const closePrefix = content.slice(lineStart, folders.closeIndex);
  const closeIndent = /^[ \t]*$/u.test(closePrefix)
    ? closePrefix
    : lineIndent(content, folders.openIndex);
  const entryIndent = `${closeIndent}  `;
  const fieldIndent = `${entryIndent}  `;
  const insertionPoint = lastToken.end;
  const gap = content.slice(insertionPoint, folders.closeIndex);
  const gapHasNewline = /[\r\n]/u.test(gap);
  const needsComma = lastToken.value !== "[" && lastToken.value !== ",";

  // テンプレートの並びに合わせて、website の直前に追加します。
  const websiteTokenIndex = findFolderEntryTokenIndex(folders, "website");

  if (websiteTokenIndex !== undefined) {
    const websiteToken = folders.tokens[websiteTokenIndex];
    const previousToken = folders.tokens[websiteTokenIndex - 1];
    const websiteLineStart = content.lastIndexOf("\n", websiteToken.start - 1) + 1;
    const websiteIndent = content.slice(websiteLineStart, websiteToken.start);

    if (
      previousToken !== undefined &&
      (previousToken.value === "[" || previousToken.value === ",") &&
      /^[ \t]*$/u.test(websiteIndent)
    ) {
      const rendered = renderFolderEntries(additions, websiteIndent, `${websiteIndent}  `, eol);

      return content.slice(0, websiteLineStart) + rendered + eol + content.slice(websiteLineStart);
    }
  }

  const rendered = renderFolderEntries(additions, entryIndent, fieldIndent, eol);
  let inserted = needsComma ? "," : "";
  inserted += eol + rendered;

  if (!gapHasNewline) {
    inserted += eol + closeIndent;
  }

  return content.slice(0, insertionPoint) + inserted + content.slice(insertionPoint);
}

/**
 * リポジトリー直下の code-workspace ファイル名を求めます。
 *
 * ルートパッケージ名が `<slug>-monorepo` の場合は `<slug>.code-workspace` を優先し、存在しない場合は最初の `*.code-workspace` を使います。
 *
 * @param {unknown} rootName ルート package.json の name です。
 *
 * @returns {string} code-workspace のファイル名です。
 */
function findCodeWorkspaceFileName(rootName) {
  if (typeof rootName === "string" && rootName.endsWith("-monorepo")) {
    const slug = rootName.slice(0, -"-monorepo".length);
    const preferred = `${slug}.code-workspace`;

    if (slug !== "") {
      try {
        if (statSync(join(ROOT, preferred)).isFile()) {
          return preferred;
        }
      } catch {
        // 優先ファイルがなければ次の候補へ進みます。
      }
    }
  }

  let names = [];

  try {
    names = readdirSync(ROOT, { withFileTypes: true })
      .filter((entry) => entry.isFile() && entry.name.endsWith(".code-workspace"))
      .map((entry) => entry.name)
      .toSorted();
  } catch (error) {
    throw new ValidationError(
      `${ROOT}: ディレクトリーを読み取れません。${error instanceof Error ? error.message : String(error)}`,
    );
  }

  if (names.length === 0) {
    throw new ValidationError(
      `${ROOT}: *.code-workspace が見つかりません。mise init を先に実行してください。`,
    );
  }

  return names[0];
}

/**
 * code-workspace の `folders` 配列に新しい項目を追加します。
 *
 * @param {string} path code-workspace ファイルのパスです。
 * @param {{ name: string, path: string }[]} entries 追加するフォルダーです。
 */
function updateCodeWorkspaceEntries(path, entries) {
  const content = readFileSync(path, "utf8");
  const next = appendCodeWorkspaceEntries(content, entries);

  if (next !== content) {
    writeFileSync(path, next);
  }
}

export {
  findFoldersArray,
  findCodeWorkspaceFileName,
  validateCodeWorkspaceFile,
  appendCodeWorkspaceEntries,
  updateCodeWorkspaceEntries,
};
