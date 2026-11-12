import { readFileSync } from "node:fs";
import { createInterface } from "node:readline/promises";

import { TEMPLATE_PACKAGES } from "./template-constants.mjs";
import { ValidationError } from "./validation-error.mjs";

/**
 * 質問に対する回答を受け付ける関数です。
 *
 * @param {string} query 質問文です。
 *
 * @returns {Promise<string>} 回答です。
 *
 * @callback Ask
 */

/**
 * 質問応答の手段を用意します。
 *
 * 端末接続時は readline を使い、パイプやリダイレクト時は標準入力の内容をすべて先読みして行単位で回答を取り出します。先読み方式では回答が尽きた時点で質問名付きの例外を投げます。
 *
 * @returns {{ ask: Ask, close: function(): void }} 質問関数と終了処理の組です。
 */
function createAsker() {
  if (process.stdin.isTTY) {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return {
      ask: rl.question.bind(rl),
      close: () => {
        rl.close();
      },
    };
  }

  let lines = [];

  try {
    lines = readFileSync(0, "utf8").split(/\r?\n/u);
    if (lines.length > 0 && lines.at(-1) === "") {
      lines.pop();
    }
  } catch {
    lines = [];
  }

  let index = 0;

  return {
    ask: (query) => {
      process.stdout.write(query);
      if (index >= lines.length) {
        throw new ValidationError(
          `質問「${query.trim()}」に対する標準入力の回答が足りません。パイプやリダイレクトで行を追加してください。--help で必要な回答の順序を確認できます。`,
        );
      }

      return Promise.resolve(lines[index++]);
    },
    close: () => {},
  };
}

/**
 * 1 行のテキスト入力を受け付けます。検証に失敗した場合は理由を示して再入力を求めます。
 *
 * @param {Ask} ask 質問関数です。
 * @param {string} message 質問文です。
 * @param {{ defaultValue?: string, validate?: function(string): (string | undefined) }} [options] 既定値と検証関数です。
 *
 * @returns {Promise<string>} 入力された文字列です。
 */
async function askText(ask, message, options) {
  const suffix = options?.defaultValue === undefined ? ": " : ` [${options.defaultValue}]: `;

  for (;;) {
    const answer = await ask(`${message}${suffix}`);
    const raw = answer.trim();
    const value = raw === "" ? (options?.defaultValue ?? "") : raw;

    if (value === "") {
      console.log("値を入力してください。");
      continue;
    }

    const error = options?.validate?.(value);

    if (error !== undefined) {
      console.log(error);
      continue;
    }

    return value;
  }
}

/**
 * はい・いいえの入力を受け付けます。
 *
 * @param {Ask} ask 質問関数です。
 * @param {string} message 質問文です。
 * @param {boolean} defaultValue 回答が空の場合の既定値です。
 *
 * @returns {Promise<boolean>} はいの場合は true、いいえの場合は false です。
 */
async function askYesNo(ask, message, defaultValue) {
  const suffix = defaultValue ? " (Y/n): " : " (y/N): ";

  for (;;) {
    const answer = await ask(`${message}${suffix}`);
    const raw = answer.trim().toLowerCase();

    if (raw === "") {
      return defaultValue;
    }

    if (["y", "yes", "はい"].includes(raw)) {
      return true;
    }

    if (["n", "no", "いいえ"].includes(raw)) {
      return false;
    }

    console.log("y か n で答えてください（はい・いいえ も可）。");
  }
}

/**
 * 追加するパッケージのタイプを番号で 1 つ選択します。
 *
 * 同じタイプを複数回選べるため、候補は常にすべて表示します。
 *
 * @param {Ask} ask 質問関数です。
 * @param {import("./template-constants.mjs").TemplatePackage[]} [packages] 選択肢です。省略時はテンプレート定義の全種類を使います。
 *
 * @returns {Promise<import("./template-constants.mjs").TemplateKind>} 選択された種類です。
 */
async function askPackageKind(ask, packages = TEMPLATE_PACKAGES) {
  console.log("追加するパッケージのタイプを選択します（同じタイプを複数回選べます）。");
  for (const [index, pkg] of packages.entries()) {
    console.log(`  ${index + 1}: ${pkg.title}（${pkg.kind}） … ${pkg.description}`);
  }

  for (;;) {
    const answer = await ask("番号を入力してください: ");
    const raw = answer.trim();

    // Number() は 16 進数（0x1）や指数表記（1e0）も受理するため、先に十進数字のみを通します。
    if (!/^[0-9]+$/u.test(raw)) {
      console.log(`1 から ${packages.length} の番号を入力してください。`);
      continue;
    }

    const num = Number(raw);

    if (!Number.isInteger(num) || num < 1 || num > packages.length) {
      console.log(`1 から ${packages.length} の番号を入力してください。`);
      continue;
    }

    return packages[num - 1].kind;
  }
}

export { askText, askYesNo, createAsker, askPackageKind };
