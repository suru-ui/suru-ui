#!/usr/bin/env node
/**
 * 失敗時に npm 公開を取り消します。
 *
 * この実行で公開した版のみを逆順で取り消します。
 * 取り消しに失敗しても警告して続けます。
 * unpublish した版は同番号で再公開できないため、取り消し後は改版が必要です。
 *
 * Usage: node scripts/release/rollback-npm.mjs
 */

import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * 公開記録を逆順で読み取ります。
 *
 * 存在しない場合や空の場合は空配列を返します。
 *
 * @param {string} filePath 公開記録のパスです。
 *
 * @returns {string[]} 取り消し対象の spec です。新しい順に並びます。
 */
function readPublishedSpecs(filePath) {
  let content = "";

  try {
    content = readFileSync(filePath, "utf8");
  } catch {
    return [];
  }

  if (content === "") {
    return [];
  }

  const specs = [];

  for (const line of content.split("\n")) {
    if (line === "") {
      continue;
    }

    specs.push(line);
  }

  return specs.toReversed();
}

/**
 * 1 件の spec を取り消します。
 *
 * 失敗時は警告を出して続けられるように false を返します。
 *
 * @param {string} spec 取り消す版です。
 *
 * @returns {boolean} 成功した場合は true です。
 */
function unpublishSpec(spec) {
  console.log(`${spec} の npm 公開を取り消します。`);

  const result = spawnSync("npm", ["unpublish", spec], {
    stdio: "inherit",
  });

  if (result.status !== 0) {
    console.log(`::warning::${spec} の取り消しに失敗しました。手動で確認してください。`);

    return false;
  }

  return true;
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
  const runnerTemp = process.env.RUNNER_TEMP;

  if (runnerTemp === undefined || runnerTemp === "") {
    throw new Error("RUNNER_TEMP が設定されていません。");
  }

  const publishedFile = join(runnerTemp, "released-npm.txt");
  const specs = readPublishedSpecs(publishedFile);

  if (specs.length === 0) {
    console.log("::notice::この実行で公開したパッケージはないため取り消しをスキップします。");

    return;
  }

  for (const spec of specs) {
    unpublishSpec(spec);
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
