#!/usr/bin/env node
/**
 * release ワークフローの公開パッケージを決定し、GITHUB_OUTPUT に書き込みます。
 *
 * 元の GitHub Actions の shell 処理を置き換えるものです。
 * 環境変数 PACKAGE_NAME と VERSION を必要とします。
 *
 * Usage: PACKAGE_NAME=<name|*> VERSION=<version> node scripts/release/determine-packages.mjs
 */

import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { appendOutputs } from "../lib/github-actions.mjs";
import { readWorkspaceEntries } from "../lib/workspace-graph.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

/**
 * release コミットの文面を作ります。
 *
 * 複数パッケージの同時公開時は集約した文面にします。
 * 単一パッケージの全体公開時はバージョンのみの文面にします。
 * 単一パッケージの指定公開時はパッケージタグの文面にします。
 *
 * @param {{ count: number, names: string[], version: string, firstTag: string, nonPrivateCount: number }} options release の集計情報です。
 *
 * @returns {string} release コミットの文面です。
 */
function buildReleaseMessage(options) {
  const { count, names, version, firstTag, nonPrivateCount } = options;

  if (count >= 2) {
    const lines = names.map((name) => `- ${name}`);

    return `release: v${version} (x${String(count)})\n${lines.join("\n")}`;
  }

  if (nonPrivateCount === 1) {
    return `release: v${version}`;
  }

  return `release: ${firstTag}`;
}

/**
 * Release に紐づけるタグを選びます。
 *
 * 複数パッケージの同時公開時は集約用タグを使います。
 * 単一パッケージの公開時は先頭のパッケージタグを使います。
 *
 * @param {{ count: number, version: string, firstTag: string }} options release の集計情報です。
 *
 * @returns {string} Release に紐づけるタグです。
 */
function selectReleaseTag(options) {
  const { count, version, firstTag } = options;

  if (count > 1) {
    return `v${version}`;
  }

  return firstTag;
}

/**
 * package.json の内容が private パッケージか判定します。
 *
 * @param {unknown} packageData package.json の内容です。
 *
 * @returns {boolean} private パッケージの場合は true です。
 */
function isPrivatePackage(packageData) {
  if (typeof packageData !== "object" || packageData === null || Array.isArray(packageData)) {
    return false;
  }

  return packageData.private === true;
}

/**
 * リモートのタグを取得します。
 *
 * @returns {void} 戻り値はありません。
 */
function fetchGitTags() {
  const result = spawnSync("git", ["fetch", "--tags", "--force"], {
    cwd: ROOT,
    stdio: "inherit",
  });

  if (result.error !== undefined) {
    throw new Error(`git fetch に失敗しました。${result.error.message}`);
  }

  if (result.status !== 0) {
    throw new Error(`git fetch に失敗しました（終了コード: ${String(result.status)}）。`);
  }
}

/**
 * リモートにタグが存在するか確認します。
 *
 * @param {string} tag 確認するタグです。
 *
 * @returns {boolean} タグが存在する場合は true です。
 */
function hasRemoteTag(tag) {
  const result = spawnSync(
    "git",
    ["ls-remote", "--exit-code", "--tags", "origin", `refs/tags/${tag}`],
    {
      cwd: ROOT,
      stdio: "pipe",
    },
  );

  if (result.error !== undefined) {
    throw new Error(`git ls-remote に失敗しました。${result.error.message}`);
  }

  return result.status === 0;
}

/**
 * スクリプトの入口です。
 *
 * @returns {void} 戻り値はありません。
 */
function main() {
  const packageName = process.env.PACKAGE_NAME;
  const version = process.env.VERSION;

  if (packageName === undefined || packageName === "") {
    throw new Error("環境変数 PACKAGE_NAME が設定されていません。");
  }

  if (version === undefined || version === "") {
    throw new Error("環境変数 VERSION が設定されていません。");
  }

  fetchGitTags();

  const { entries } = readWorkspaceEntries(ROOT);
  let matched = false;
  let nonPrivateCount = 0;
  let firstTag = "";
  const rows = [];

  for (const entry of entries) {
    if (entry.missing) {
      continue;
    }

    if (isPrivatePackage(entry.data)) {
      continue;
    }

    nonPrivateCount += 1;

    const name = entry.name;

    if (typeof name !== "string" || name === "") {
      throw new Error(`${entry.dir}/package.json: name がありません。`);
    }

    if (packageName !== "*" && name !== packageName) {
      continue;
    }

    matched = true;

    const tag = `${name}@${version}`;

    if (hasRemoteTag(tag)) {
      console.log(`::warning::タグ ${tag} がすでに存在するため ${name} をスキップします。`);

      continue;
    }

    if (firstTag === "") {
      firstTag = tag;
    }

    rows.push({
      dir: entry.dir,
      name,
      version,
    });
  }

  if (packageName !== "*" && !matched) {
    console.log(`::error::公開対象のパッケージ「${packageName}」が見つかりません。`);

    throw new Error(`公開対象のパッケージ「${packageName}」が見つかりません。`);
  }

  if (rows.length === 0) {
    console.log("::error::公開対象のパッケージがありません。");

    throw new Error("公開対象のパッケージがありません。");
  }

  const count = rows.length;
  const names = rows.map((row) => row.name);
  const list = rows.map((row) => `${row.dir}\t${row.name}\t${row.version}`).join("\n");
  const message = buildReleaseMessage({
    count,
    names,
    version,
    firstTag,
    nonPrivateCount,
  });
  const releaseTag = selectReleaseTag({
    count,
    version,
    firstTag,
  });

  if (count > 1 && hasRemoteTag(releaseTag)) {
    console.log(`::error::タグ ${releaseTag} がすでに存在します。`);

    throw new Error(`タグ ${releaseTag} がすでに存在します。`);
  }

  appendOutputs({
    list,
    count: String(count),
    message,
    version,
    first_tag: firstTag,
    non_private: String(nonPrivateCount),
    release_tag: releaseTag,
  });
}

// 直接実行された場合のみ入口を実行します。テストからの import 時は何もしません。
if (process.argv[1] !== undefined && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}

export { selectReleaseTag, buildReleaseMessage };
