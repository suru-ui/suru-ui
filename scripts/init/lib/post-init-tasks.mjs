import { runCommand } from "../../lib/commands.mjs";

/**
 * skills-lock.json からスキルを復元します。
 *
 * @returns {boolean} 成功した場合は true、失敗した場合は false です。
 */
function runSkillsInstall() {
  return runCommand(
    "pnpm",
    ["exec", "skills", "experimental_install"],
    "pnpm exec skills experimental_install",
  );
}

/**
 * mise のツールを更新します。
 *
 * @returns {boolean} 成功した場合は true、失敗した場合は false です。
 */
function runMiseUpdate() {
  return runCommand("mise", ["update"], "mise update");
}

export { runMiseUpdate, runSkillsInstall };
