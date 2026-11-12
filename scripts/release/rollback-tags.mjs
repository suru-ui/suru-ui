#!/usr/bin/env node
/**
 * 失敗時にタグと Release を削除します。
 *
 * Release は集約用タグに 1 つのみ作られるため先に削除します。
 * 各パッケージタグはリモートとローカルを順に削除します。
 * 存在確認は終了コードで判定し、削除失敗は警告して続けます。
 *
 * Usage: node scripts/release/rollback-tags.mjs
 */

import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * リモートタグの有無を判定します。
 *
 * @param {string} tag 判定するタグです。
 *
 * @returns {boolean} 存在する場合は true です。
 */
function existsRemoteTag(tag) {
  const result = spawnSync(
    "git",
    ["ls-remote", "--exit-code", "--tags", "origin", `refs/tags/${tag}`],
    {
      stdio: "ignore",
    },
  );

  return result.status === 0;
}

/**
 * ローカルタグの有無を判定します。
 *
 * @param {string} tag 判定するタグです。
 *
 * @returns {boolean} 存在する場合は true です。
 */
function existsLocalTag(tag) {
  const result = spawnSync("git", ["rev-parse", tag], {
    stdio: "ignore",
  });

  return result.status === 0;
}

/**
 * Release の有無を判定します。
 *
 * @param {string} tag 判定するタグです。
 *
 * @returns {boolean} 存在する場合は true です。
 */
function existsRelease(tag) {
  const result = spawnSync("gh", ["release", "view", tag], {
    stdio: "ignore",
  });

  return result.status === 0;
}

/**
 * Release を削除します。
 *
 * 失敗時は警告を出します。
 *
 * @param {string} tag 削除するタグです。
 */
function removeRelease(tag) {
  console.log(`${tag} の Release を削除します。`);

  const result = spawnSync("gh", ["release", "delete", tag, "--yes", "--cleanup-tag"], {
    stdio: "inherit",
  });

  if (result.status !== 0) {
    console.log(`::warning::${tag} の Release 削除に失敗しました。手動で確認してください。`);
  }
}

/**
 * リモートタグを削除します。
 *
 * 存在しない場合はスキップし、失敗時は警告を出します。
 *
 * @param {string} tag 削除するタグです。
 */
function removeRemoteTag(tag) {
  if (!existsRemoteTag(tag)) {
    console.log(`::notice::${tag} はリモートに存在しないため削除をスキップします。`);

    return;
  }

  console.log(`${tag} のタグを削除します。`);

  const result = spawnSync("git", ["push", "origin", `:refs/tags/${tag}`], {
    stdio: "inherit",
  });

  if (result.status !== 0) {
    console.log(`::warning::${tag} のリモートタグ削除に失敗しました。手動で確認してください。`);
  }
}

/**
 * ローカルタグを削除します。
 *
 * 存在する場合のみ削除し、失敗時は警告を出します。
 *
 * @param {string} tag 削除するタグです。
 */
function removeLocalTag(tag) {
  if (!existsLocalTag(tag)) {
    return;
  }

  const result = spawnSync("git", ["tag", "-d", tag], {
    stdio: "inherit",
  });

  if (result.status !== 0) {
    console.log(`::warning::${tag} のローカルタグ削除に失敗しました。`);
  }
}

/**
 * LIST 行からタグの一覧を作ります。
 *
 * 空行と名前の空の行を除きます。
 *
 * @param {string} text LIST の内容です。
 *
 * @returns {string[]} タグの一覧です。
 */
function listTags(text) {
  const tags = [];

  for (const line of text.split("\n")) {
    if (line === "") {
      continue;
    }

    const parts = line.split("\t");
    const name = parts[1] ?? "";
    const version = parts[2] ?? "";

    if (name === "") {
      continue;
    }

    tags.push(`${name}@${version}`);
  }

  return tags;
}

/**
 * 直接実行された場合に true を返します。
 *
 * テストから読み込む際に main() を実行しないために使います。
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

/** スクリプトの入口です。 */
function main() {
  const listText = process.env.LIST ?? "";

  if (listText === "") {
    console.log("::notice::公開対象がないため削除をスキップします。");

    return;
  }

  const releaseTag = process.env.RELEASE_TAG ?? "";
  const releaseCountRaw = process.env.RELEASE_COUNT ?? "";
  const releaseCount = releaseCountRaw === "" ? "1" : releaseCountRaw;

  if (releaseTag !== "") {
    if (existsRelease(releaseTag)) {
      removeRelease(releaseTag);
    } else {
      console.log(`::notice::Release ${releaseTag} は存在しないため削除をスキップします。`);
    }
  }

  const tags = listTags(listText);

  for (const tag of tags) {
    removeRemoteTag(tag);
    removeLocalTag(tag);
  }

  if (Number(releaseCount) > 1 && releaseTag !== "") {
    removeRemoteTag(releaseTag);
    removeLocalTag(releaseTag);
  }
}

if (isMainModule()) {
  try {
    main();
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
