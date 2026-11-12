#!/usr/bin/env node
/**
 * release.yml の「Release を作成」と等価の処理を実行します。
 *
 * 複数パッケージ同時リリース時は集約用タグに 1 つだけ作り、単件時はパッケージタグごとに作成します。
 *
 * Usage: [LIST=...] [RELEASE_COUNT=...] [RELEASE_TAG=...] [RELEASE_VERSION=...] node scripts/release/create-releases.mjs
 */

import { spawnSync } from "node:child_process";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

/**
 * gh を実行します。失敗した場合はエラーを投げます。
 *
 * @param {string[]} args gh に渡す引数です。
 */
function runGh(args) {
  const result = spawnSync("gh", args, {
    cwd: ROOT,
    stdio: "inherit",
  });

  if (result.error !== undefined) {
    throw new Error(`gh ${args.join(" ")} を起動できませんでした。${result.error.message}`);
  }

  if (result.status !== 0) {
    throw new Error(
      `gh ${args.join(" ")} が失敗しました（終了コード: ${result.status ?? "不明"}）。`,
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

/**
 * 変更履歴ファイルのパスを求めます。
 *
 * @returns {string} 変更履歴ファイルのパスです。
 */
function changelogEntryFile() {
  const runnerTemp = process.env.RUNNER_TEMP ?? "";

  if (runnerTemp === "") {
    throw new Error("RUNNER_TEMP が設定されていません。");
  }

  return join(runnerTemp, "release-changelog.md");
}

/** Release 作成の入口です。 */
function main() {
  if (releaseCount() > 1) {
    runGh([
      "release",
      "create",
      process.env.RELEASE_TAG ?? "",
      "--title",
      `v${process.env.RELEASE_VERSION ?? ""}`,
      "--notes-file",
      changelogEntryFile(),
    ]);

    return;
  }

  const listText = process.env.LIST ?? "";

  for (const line of listText.split("\n")) {
    const parts = line.split("\t");
    const name = parts[1] ?? "";
    const version = parts[2] ?? "";

    if (name === "") {
      continue;
    }

    const tag = `${name}@${version}`;
    runGh(["release", "create", tag, "--title", tag, "--notes-file", changelogEntryFile()]);
  }
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
