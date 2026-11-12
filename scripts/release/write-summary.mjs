#!/usr/bin/env node
/**
 * リリース結果とドライラン結果のサマリーを作ります。
 *
 * release.yml の「リリース結果を表示」と「ドライラン結果を表示」を集約します。
 * GITHUB_STEP_SUMMARY への追記は共有ヘルパーに任せます。
 *
 * Usage: node scripts/release/write-summary.mjs <result|dry-run>
 */

import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { appendSummary } from "../lib/github-actions.mjs";

/**
 * LIST 行を解析します。
 *
 * 空行と名前の空の行を除き、タブ区切りの dir・name・version を返します。
 *
 * @param {string} text LIST の内容です。
 *
 * @returns {Array<{ dir: string, name: string, version: string }>} 解析した一覧です。
 */
function parseReleaseList(text) {
  const entries = [];

  for (const line of text.split("\n")) {
    if (line === "") {
      continue;
    }

    const parts = line.split("\t");
    const dir = parts[0] ?? "";
    const name = parts[1] ?? "";
    const version = parts[2] ?? "";

    if (name === "") {
      continue;
    }

    entries.push({
      dir,
      name,
      version,
    });
  }

  return entries;
}

/**
 * リリース結果のサマリーを作ります。
 *
 * 単数時は npm と release の行を出し、複数時は集約行を出します。
 *
 * @param {object} options 必要な値です。
 * @param {string} options.repository リポジトリーです。
 * @param {string} options.listText LIST の内容です。
 * @param {string | number} options.releaseCount 公開数です。
 * @param {string} options.releaseTag リリースタグです。
 *
 * @returns {string} サマリーの Markdown です。
 */
function buildResultSummary(options) {
  const count = Number(options.releaseCount);
  const lines = ["## リリース結果", ""];

  if (count > 1) {
    lines.push(
      `Release: https://github.com/${options.repository}/releases/tag/${options.releaseTag} （${options.releaseCount} 件分を 1 つに集約）`,
      "",
    );
  }

  for (const entry of parseReleaseList(options.listText)) {
    const tag = `${entry.name}@${entry.version}`;
    lines.push(`- ${tag}`);

    lines.push(`  - npm: https://www.npmjs.com/package/${entry.name}/v/${entry.version}`);

    if (count <= 1) {
      lines.push(`  - release: https://github.com/${options.repository}/releases/tag/${tag}`);
    }
  }

  return `${lines.join("\n")}\n`;
}

/**
 * ドライラン結果のサマリーを作ります。
 *
 * 公開対象の表・コミットメッセージ・タグ・CHANGELOG・デバッグ情報を含みます。
 *
 * @param {object} options 必要な値です。
 * @param {string} options.listText LIST の内容です。
 * @param {string} options.message コミットメッセージです。
 * @param {string} options.changelog CHANGELOG の追記内容です。
 * @param {string} options.firstTag 先頭のパッケージタグです。
 * @param {string | number} options.releaseCount 公開数です。
 * @param {string} options.releaseTag リリースタグです。
 * @param {string} options.releaseVersion リリースバージョンです。
 * @param {string} options.nonPrivate 公開パッケージ数です。
 *
 * @returns {string} サマリーの Markdown です。
 */
function buildDryRunSummary(options) {
  const count = Number(options.releaseCount);
  const lines = [
    "## ドライラン結果（公開は行いません）",
    "",
    "### 公開対象",
    "",
    "| ディレクトリ | パッケージ | バージョン |",
    "| --- | --- | --- |",
  ];

  for (const entry of parseReleaseList(options.listText)) {
    lines.push(`| ${entry.dir} | ${entry.name} | ${entry.version} |`);
  }

  lines.push(
    "",
    "### コミットメッセージ",
    "",
    "```",
    options.message,
    "```",
    "",
    "### 作成するタグ",
    "",
  );

  for (const entry of parseReleaseList(options.listText)) {
    lines.push(`- ${entry.name}@${entry.version}`);
  }

  if (count > 1) {
    lines.push(`- ${options.releaseTag} （集約用）`);
  }

  lines.push("");

  if (count > 1) {
    lines.push(
      `Release は ${options.releaseTag} に 1 つ集約します（タイトル: v${options.releaseVersion}）。`,
    );
  } else {
    lines.push(`Release は ${options.releaseTag} に作成します。`);
  }

  lines.push("", "### CHANGELOG 追記内容", "", options.changelog, "", "### デバッグ情報", "");
  lines.push(`- first_tag: ${options.firstTag}`);
  lines.push(`- release_tag: ${options.releaseTag}`);

  if (count > 1) {
    lines.push(`- release_title: v${options.releaseVersion}`);
  } else {
    lines.push(`- release_title: ${options.releaseTag}`);
  }

  lines.push(`- version: ${options.releaseVersion}`);
  lines.push(`- count: ${options.releaseCount}`);
  lines.push(`- non_private: ${options.nonPrivate}`);

  return `${lines.join("\n")}\n`;
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

/** 環境変数を読んでサマリーを追記します。 */
function main() {
  const mode = process.argv[2];

  if (mode !== "result" && mode !== "dry-run") {
    throw new Error('第一引数には "result" または "dry-run" を指定してください。');
  }

  const repository = process.env.GITHUB_REPOSITORY;

  if (repository === undefined || repository === "") {
    throw new Error("GITHUB_REPOSITORY が設定されていません。");
  }

  const listText = process.env.LIST;

  if (listText === undefined) {
    throw new Error("LIST が設定されていません。");
  }

  if (mode === "result") {
    const releaseCountRaw = process.env.RELEASE_COUNT ?? "";
    const releaseCount = releaseCountRaw === "" ? "1" : releaseCountRaw;
    const releaseTag = process.env.RELEASE_TAG ?? "";
    const summary = buildResultSummary({
      listText,
      releaseTag,
      repository,
      releaseCount,
    });
    appendSummary(summary);

    return;
  }

  const summary = buildDryRunSummary({
    message: process.env.MESSAGE ?? "",
    firstTag: process.env.FIRST_TAG ?? "",
    listText,
    changelog: process.env.CHANGELOG ?? "",
    nonPrivate: process.env.NON_PRIVATE ?? "",
    releaseTag: process.env.RELEASE_TAG ?? "",
    releaseCount: process.env.RELEASE_COUNT ?? "",
    releaseVersion: process.env.RELEASE_VERSION ?? "",
  });
  appendSummary(summary);

  console.log("::notice::ドライランのため、コミット・タグ・Release・npm 公開は行いませんでした。");
}

if (isMainModule()) {
  try {
    main();
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}

export { parseReleaseList, buildDryRunSummary, buildResultSummary };
