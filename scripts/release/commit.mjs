#!/usr/bin/env node
/**
 * release.yml の「更新をコミット」と等価の処理を実行します。
 *
 * CHANGELOG.md・pnpm-lock.yaml と公開対象パッケージの package.json をステージし、変更があればコミットしてブランチへ push します。
 * push の競合時は rebase して 1 回だけ再試行します。
 *
 * Usage: LIST=... MESSAGE=... [BRANCH=...] node scripts/release/commit.mjs
 */

import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { issueNotice, appendOutputs } from "../lib/github-actions.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

/**
 * LIST テキストからコミット対象のパス一覧を作ります。
 *
 * @param {string} listText ディレクトリー・パッケージ名・バージョンをタブ区切りで並べたテキストです。
 *
 * @returns {string[]} コミット対象のパスです。
 */
function commitFilePaths(listText) {
  const paths = ["CHANGELOG.md", "pnpm-lock.yaml"];

  for (const line of listText.split("\n")) {
    const parts = line.split("\t");
    const dir = parts[0] ?? "";
    const name = parts[1] ?? "";

    if (name === "") {
      continue;
    }

    paths.push(`${dir}/package.json`);
  }

  return paths;
}

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
 * git を実行して標準出力を取得します。失敗した場合はエラーを投げます。
 *
 * @param {string[]} args git に渡す引数です。
 *
 * @returns {string} 末尾の空白を除いた標準出力です。
 */
function readGit(args) {
  const result = spawnSync("git", args, {
    cwd: ROOT,
    encoding: "utf8",
  });

  if (result.error !== undefined) {
    throw new Error(`git ${args.join(" ")} を起動できませんでした。${result.error.message}`);
  }

  if (result.status !== 0) {
    throw new Error(
      `git ${args.join(" ")} が失敗しました（終了コード: ${result.status ?? "不明"}）。`,
    );
  }

  return (result.stdout ?? "").trim();
}

/**
 * ステージ済みの変更があるかどうかを返します。
 *
 * @returns {boolean} 変更がある場合は true、ない場合は false です。
 */
function hasStagedChanges() {
  const result = spawnSync("git", ["diff", "--cached", "--quiet"], {
    cwd: ROOT,
    stdio: "inherit",
  });

  if (result.error !== undefined) {
    throw new Error(`git diff を起動できませんでした。${result.error.message}`);
  }

  if (result.status === 0) {
    return false;
  }

  if (result.status === 1) {
    return true;
  }

  throw new Error(
    `git diff --cached --quiet が失敗しました（終了コード: ${result.status ?? "不明"}）。`,
  );
}

/** 更新コミットの入口です。 */
function main() {
  const listText = process.env.LIST ?? "";
  const message = process.env.MESSAGE ?? "";

  if (listText === "") {
    throw new Error("LIST が設定されていません。");
  }

  if (message === "") {
    throw new Error("MESSAGE が設定されていません。");
  }

  runGit(["config", "user.name", "github-actions[bot]"]);
  runGit(["config", "user.email", "41898282+github-actions[bot]@users.noreply.github.com"]);
  runGit(["add", "--", ...commitFilePaths(listText)]);

  if (!hasStagedChanges()) {
    issueNotice("コミット対象の変更がないためコミットをスキップします。");
    appendOutputs({ committed: "false" });

    return;
  }

  runGit(["commit", "-m", message]);

  let branch = process.env.BRANCH ?? "";

  if (branch === "") {
    try {
      branch = readGit(["branch", "--show-current"]);
    } catch {
      branch = "";
    }
  }

  if (branch === "") {
    throw new Error("現在のブランチを特定できません。");
  }

  try {
    runGit(["push", "origin", `HEAD:${branch}`]);
  } catch {
    issueNotice("push に失敗したため rebase して再試行します。");
    runGit(["pull", "--rebase", "origin", branch]);
    runGit(["push", "origin", `HEAD:${branch}`]);
  }

  appendOutputs({
    sha: readGit(["rev-parse", "HEAD"]),
    branch,
    committed: "true",
  });
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

export { commitFilePaths };
