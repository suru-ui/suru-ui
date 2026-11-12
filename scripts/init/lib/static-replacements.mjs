import { readFileSync } from "node:fs";
import { join } from "node:path";

import {
  ROOT,
  BLUME_REPO_KEY,
  BLUME_OWNER_KEY,
  TEMPLATE_SITE_URL,
  TEMPLATE_COPYRIGHT,
  TEMPLATE_PROJECT_NAME,
  BLUME_PROJECT_KEY_TYPO,
  BLUME_PROJECT_KEY_FIXED,
} from "../../lib/template-constants.mjs";
import { ValidationError } from "../../lib/validation-error.mjs";

/**
 * ファイル内の文字列置換 1 件分です。検証フェーズと実行フェーズで同じ一覧を使います。
 *
 * @typedef {object} TextReplacement
 *
 * @property {string} path 対象ファイルのパスです。
 * @property {string} from 置換元の文字列です。
 * @property {string} to 置換先の文字列です。
 * @property {number} expected 期待される出現件数です。
 */

/**
 * 固定前提の文字列置換の一覧を集めます。
 *
 * 検証フェーズと実行フェーズで同じ一覧を使うため、前提の食い違いが起きません。
 * 値の埋め込みは安全です。project は改行・制御文字を拒否し、owner・repo・scope・パッケージ名のバリデーションで `"`・`\`・改行等を拒否しているため引用符や構造を壊さず、二重引用符で囲む箇所（blume.config.ts・index.mdx のタイトル）には JSON.stringify を使って二重防御しています。
 * YAML/JSONC の再パースは行わず、テンプレート固定の前提文字列を件数付きで置換します。
 * 前提が変わった場合は件数不一致で検証失敗し、何も書き換えません。
 *
 * blume.config.ts のプロジェクト名定義（綴りのゆれあり）とパッケージごとの README タイトルは動的前提のため含みません。
 *
 * @param {import("./collect-config.mjs").InitConfig} config 初期化内容です。
 *
 * @returns {TextReplacement[]} 置換の一覧です。
 */
function collectStaticReplacements(config) {
  const siteUrl = `https://${config.owner}.github.io/${config.repo}`;

  return [
    {
      to: `# ${config.project}`,
      from: `# ${TEMPLATE_PROJECT_NAME}`,
      path: join(ROOT, "README.md"),
      expected: 1,
    },
    {
      to: `${siteUrl}/`,
      from: TEMPLATE_SITE_URL,
      path: join(ROOT, "README.md"),
      expected: 1,
    },
    {
      to: `const GITHUB_REPO = ${JSON.stringify(config.repo)};`,
      from: BLUME_REPO_KEY,
      path: join(ROOT, "website", "blume.config.ts"),
      expected: 1,
    },
    {
      to: `const GITHUB_OWNER = ${JSON.stringify(config.owner)};`,
      from: BLUME_OWNER_KEY,
      path: join(ROOT, "website", "blume.config.ts"),
      expected: 1,
    },
    {
      // プロジェクト名は日本語・スペース・記号を含み得るため、YAML の plain scalar として壊れないよう二重引用符で囲みます。
      to: `title: ${JSON.stringify(config.project)}`,
      from: `title: ${TEMPLATE_PROJECT_NAME}`,
      path: join(ROOT, "website", "docs", "index.mdx"),
      expected: 1,
    },
    {
      // 英語版のトップページも同じプロジェクト名にします。
      to: `title: ${JSON.stringify(config.project)}`,
      from: `title: ${TEMPLATE_PROJECT_NAME}`,
      path: join(ROOT, "website", "docs", "en", "index.mdx"),
      expected: 1,
    },
    {
      to: `Copyright (c) 2026-present, ${config.owner}`,
      from: TEMPLATE_COPYRIGHT,
      path: join(ROOT, "LICENSE"),
      expected: 1,
    },
  ];
}

/**
 * blume.config.ts のプロジェクト名定義の前提を特定します。
 *
 * テンプレート由来の `PROJET` 綴りと修正後の `PROJECT` 綴りのどちらか 1 件を期待します。
 *
 * @returns {string} 見つかった前提文字列です。
 */
function resolveBlumeProjectFrom() {
  const path = join(ROOT, "website", "blume.config.ts");
  let content;

  try {
    content = readFileSync(path, "utf8");
  } catch (error) {
    throw new ValidationError(
      `${path}: ファイルを読み取れません。${error instanceof Error ? error.message : String(error)}`,
    );
  }

  const typoCount = content.split(BLUME_PROJECT_KEY_TYPO).length - 1;
  const fixedCount = content.split(BLUME_PROJECT_KEY_FIXED).length - 1;

  if (typoCount + fixedCount !== 1) {
    throw new ValidationError(
      `${path}: プロジェクト名の定義が ${typoCount + fixedCount} 箇所見つかりました（期待値: 1）。テンプレート構成が変わっている可能性があります。`,
    );
  }

  return typoCount === 1 ? BLUME_PROJECT_KEY_TYPO : BLUME_PROJECT_KEY_FIXED;
}

export { resolveBlumeProjectFrom, collectStaticReplacements };
