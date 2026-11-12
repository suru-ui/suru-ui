#!/usr/bin/env node
/**
 * release.yml の「タグを作成」と等価の処理を実行します。
 *
 * 公開対象パッケージの `<名前>@<バージョン>` タグを作り、複数パッケージ同時リリース時は集約用タグも作ってまとめて push します。
 *
 * Usage: [LIST=...] [RELEASE_COUNT=...] [RELEASE_TAG=...] node scripts/release/create-tags.mjs
 */

import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { issueNotice } from "../lib/github-actions.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

/**
 * git を実行します。失敗した場合はエラーを投げます。
 *
 * @param {string[]} args git に渡す引数です。
 */
function runGit(args) {
  const result = spawnSync("git", args, {
    cwd: ROOT,
    stdio: "inherit",
  });

  if (result.error !== undefined) {
    throw new Error(`git ${args.join(" ")} を起動できませんでした。${result.error.message}`);
  }

  if (result.status !== 0) {
    throw new Error(
      `git ${args.join(" ")} が失敗しました（終了コード: ${result.status ?? "不明"}）。`,
    );
  }
}

/**
 * リリース件数を求めます。
 *
 * @returns {number} リリース件数です。未設定や数値でない場合は 1 です。
 */
function releaseCount() {
  const raw = process.env.RELEASE_COUNT ?? "";

  if (raw === "") {
    return 1;
  }

  const count = Number(raw);

  if (Number.isNaN(count)) {
    return 1;
  }

  return count;
}

/** タグ作成の入口です。 */
function main() {
  const listText = process.env.LIST ?? "";
  const releaseTag = process.env.RELEASE_TAG ?? "";
  const tags = [];

  for (const line of listText.split("\n")) {
    const parts = line.split("\t");
    const name = parts[1] ?? "";
    const version = parts[2] ?? "";

    if (name === "") {
      continue;
    }

    const tag = `${name}@${version}`;
    runGit(["tag", "-a", tag, "-m", tag]);
    tags.push(tag);
  }

  if (releaseCount() > 1 && releaseTag !== "") {
    runGit(["tag", "-a", releaseTag, "-m", releaseTag]);
    tags.push(releaseTag);
  }

  if (tags.length === 0) {
    issueNotice("作成するタグがありません。");

    return;
  }

  runGit(["push", "--atomic", "origin", ...tags]);
}

/** 直接実行された場合のみ入口を実行します。 */
if (process.argv[1] !== undefined && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
