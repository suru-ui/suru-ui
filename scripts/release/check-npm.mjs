#!/usr/bin/env node
/**
 * npm レジストリーに公開予定の版がないことを確認します。
 *
 * release.yml「npm レジストリーを確認」相当です。env LIST（`dir\tname\tversion` の並び）を受け取り、公開予定の版がすでに存在する場合や、パッケージ自体が未公開の場合に失敗します。
 * npm の trusted publishing は既存パッケージにしか設定できないため、
 * 初回公開はこのワークフローでは行えません。初回のみ手動で公開してください。
 *
 * Usage: LIST="$(...)" node scripts/release/check-npm.mjs
 */

import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * LIST（`dir\tname\tversion` の並び）を配列に変換します。
 *
 * 空行と名前のない行は読み飛ばします。
 *
 * @param {string} text LIST の内容です。
 *
 * @returns {Array<{ dir: string, name: string, version: string }>} 公開対象の一覧です。
 */
function parseReleaseList(text) {
  const entries = [];

  for (const line of text.split("\n")) {
    if (line === "") {
      continue;
    }

    const [dir, name, version] = line.split("\t");

    if (name === undefined || name === "") {
      continue;
    }

    entries.push({
      dir: dir ?? "",
      name,
      version: version ?? "",
    });
  }

  return entries;
}

/**
 * 指定した仕様が npm レジストリーに存在するかを確認します。
 *
 * @param {string} spec `name@version` 形式またはパッケージ名です。
 *
 * @returns {boolean} 存在する場合は true、存在しない場合は false です。
 */
function existsOnNpm(spec) {
  const result = spawnSync("npm", ["view", spec, "version"], { stdio: "pipe" });

  if (result.error !== undefined) {
    throw new Error(`npm view ${spec} を起動できませんでした。${result.error.message}`, {
      cause: result.error,
    });
  }

  return result.status === 0;
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

/** npm レジストリーの確認の入口です。 */
function main() {
  const list = process.env.LIST;

  if (list === undefined) {
    throw new Error("環境変数 LIST が設定されていません。");
  }

  for (const entry of parseReleaseList(list)) {
    if (existsOnNpm(`${entry.name}@${entry.version}`)) {
      console.log(
        `::error::${entry.name}@${entry.version} は npm レジストリーにすでに存在します。`,
      );
      throw new Error(`${entry.name}@${entry.version} は npm レジストリーにすでに存在します。`);
    }

    if (!existsOnNpm(entry.name)) {
      console.log(
        `::error::${entry.name} は npm レジストリーに存在しません。初回のみ手動で公開してください。`,
      );
      console.log(`::error::npx setup-npm-trusted-publish ${entry.name}`);
      throw new Error(
        `${entry.name} は npm レジストリーに存在しません。初回のみ手動で公開してください。`,
      );
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

export { parseReleaseList };
