import { spawnSync } from "node:child_process";

import { ROOT } from "./template-constants.mjs";

/**
 * 外部コマンドをリポジトリーのルートで実行します。
 *
 * @param {string} command 実行するコマンドです。
 * @param {string[]} args コマンドの引数です。
 * @param {string} label 表示用の名前です。
 *
 * @returns {boolean} 成功した場合は true、失敗した場合は false です。
 */
function runCommand(command, args, label) {
  const result = spawnSync(command, args, {
    cwd: ROOT,
    stdio: "inherit",
  });

  if (result.error !== undefined) {
    console.error(`${label} を起動できませんでした。${result.error.message}`);

    return false;
  }

  if (result.status !== 0) {
    console.error(
      `${label} が失敗しました（終了コード: ${result.status ?? "不明"}${result.signal === null || result.signal === undefined ? "" : `、シグナル: ${result.signal}`}）。`,
    );

    return false;
  }

  return true;
}

/**
 * pnpm install を実行してロックファイルを更新します。
 *
 * @returns {boolean} 成功した場合は true、失敗した場合は false です。
 */
function runPnpmInstall() {
  return runCommand("pnpm", ["install"], "pnpm install");
}

export { runCommand, runPnpmInstall };
