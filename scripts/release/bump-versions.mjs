#!/usr/bin/env node
/**
 * 公開対象パッケージのバージョンを更新します。
 *
 * release.yml「バージョンを更新」相当です。env LIST（`dir\tname\tversion` の並び）を受け取り、各ディレクトリーで `pnpm version` を実行します。
 *
 * Usage: LIST="$(...)" node scripts/release/bump-versions.mjs
 */

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { parseReleaseList } from "./check-npm.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");

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

/** バージョン更新の入口です。 */
function main() {
  const list = process.env.LIST;

  if (list === undefined) {
    throw new Error("環境変数 LIST が設定されていません。");
  }

  for (const entry of parseReleaseList(list)) {
    if (entry.dir === "" || !existsSync(join(ROOT, entry.dir, "package.json"))) {
      continue;
    }

    console.log(`${entry.name} のバージョンを ${entry.version} に更新します。`);

    const result = spawnSync(
      "pnpm",
      ["version", entry.version, "--no-git-tag-version", "--allow-same-version", "--no-git-checks"],
      {
        cwd: join(ROOT, entry.dir),
        stdio: "inherit",
      },
    );

    if (result.error !== undefined) {
      throw new Error(
        `${entry.name} のバージョン更新を起動できませんでした。${result.error.message}`,
        {
          cause: result.error,
        },
      );
    }

    if (result.status !== 0) {
      throw new Error(`${entry.name} のバージョン更新に失敗しました。`);
    }
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
