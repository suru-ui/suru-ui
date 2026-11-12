import { rmSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

import {
  ROOT,
  TEMPLATE_PACKAGES,
  TEMPLATE_WORKSPACE_FILE_NAME,
} from "../../lib/template-constants.mjs";
import { ValidationError } from "../../lib/validation-error.mjs";

/**
 * code-workspace 内の 1 パッケージ分の項目に一致する正規表現を作ります。
 *
 * 1 行形式と複数行形式の両方に対応します。
 * `"..."` の内側は改行を含めない（`[^"\r\n]*`）ことで、複数項目をまたいだ誤一致を防ぎます。
 *
 * @param {import("../../lib/template-constants.mjs").TemplateKind} kind テンプレートの種類です。
 *
 * @returns {RegExp} 項目に一致する正規表現です。
 */
function codeWorkspaceEntryPattern(kind) {
  return new RegExp(
    `[ \\t]*\\{[ \\t]*(?:\\r?\\n[ \\t]*)?"name":[ \\t]*"[^"\\r\\n]*",[ \\t]*(?:\\r?\\n[ \\t]*)?"path":[ \\t]*"packages/${kind}",?[ \\t]*(?:\\r?\\n[ \\t]*)?\\},?\\r?\\n`,
    "u",
  );
}

/**
 * code-workspace 内に 1 パッケージ分の項目があることを検証します。一切書き込みません。
 *
 * 存在確認だけでなく出現件数がちょうど 1 件であることを検証し、実行フェーズの先頭のみ置換による取り残しを防ぎます。
 *
 * @param {import("../../lib/template-constants.mjs").TemplateKind} kind テンプレートの種類です。
 */
function validateCodeWorkspaceEntry(kind) {
  const oldPath = join(ROOT, TEMPLATE_WORKSPACE_FILE_NAME);
  let content;

  try {
    content = readFileSync(oldPath, "utf8");
  } catch (error) {
    throw new ValidationError(
      `${oldPath}: ファイルを読み取れません。${error instanceof Error ? error.message : String(error)}`,
    );
  }

  const count =
    content.match(new RegExp(codeWorkspaceEntryPattern(kind).source, "gu"))?.length ?? 0;

  if (count !== 1) {
    throw new ValidationError(
      `${oldPath}: packages/${kind} の項目が ${count} 箇所見つかりました（期待値: 1）。テンプレート構成が変わっている可能性があります。`,
    );
  }
}

/**
 * VS Code ワークスペース定義を選択されたパッケージに合わせて更新し、名前を変更します。
 *
 * 検証フェーズで各項目が 1 件であることを確認済みのため、ここでも件数を確認してから置換します。
 * 同じ種類が複数選択された場合は、テンプレートの 1 項目をその種類の全パッケージ分の項目に置き換えます。
 * 新規ファイルの作成時は排他フラグで競合を検出します。
 * 事前の existsSync 確認から排他作成までの間は TOCTOU 競合があり得るため、この再検査は緩和策であり厳密な原子性を保証しません（`wx` 失敗時は競合として扱います）。
 *
 * @param {import("./collect-config.mjs").InitConfig} config 初期化内容です。
 */
function updateCodeWorkspace(config) {
  const oldPath = join(ROOT, TEMPLATE_WORKSPACE_FILE_NAME);
  let content = readFileSync(oldPath, "utf8");

  for (const pkg of TEMPLATE_PACKAGES) {
    const kindPlans = config.packages.filter((item) => item.kind === pkg.kind);
    const pattern = codeWorkspaceEntryPattern(pkg.kind);
    const globalPattern = new RegExp(pattern.source, "gu");
    const count = content.match(globalPattern)?.length ?? 0;

    if (count !== 1) {
      throw new Error(
        `${oldPath}: packages/${pkg.kind} の項目が ${count} 箇所見つかりました（期待値: 1）。`,
      );
    }

    if (kindPlans.length === 0) {
      content = content.replace(pattern, "");
      continue;
    }

    // 引用符で囲む箇所には JSON.stringify を使い、検証済みの値でも構造を壊さないようにします。
    const entries = kindPlans
      .map((plan) => {
        const base = plan.dir.slice(plan.dir.lastIndexOf("/") + 1);

        return `    {\n      "name": ${JSON.stringify(base)},\n      "path": ${JSON.stringify(plan.dir)},\n    },\n`;
      })
      .join("");
    content = content.replace(pattern, entries);
  }

  const newPath = join(ROOT, `${config.slug}.code-workspace`);

  if (resolve(newPath) === resolve(oldPath)) {
    writeFileSync(newPath, content);

    return;
  }

  if (existsSync(newPath)) {
    throw new Error(`${newPath} は既に存在します。別のスラグ名にしてください。`);
  }

  try {
    writeFileSync(newPath, content, { flag: "wx" });
  } catch (error) {
    throw new Error(
      `${newPath}: ファイルを書き込めません（競合の可能性があります）。${error instanceof Error ? error.message : String(error)}`,
      { cause: error },
    );
  }

  rmSync(oldPath);
}

export { updateCodeWorkspace, codeWorkspaceEntryPattern, validateCodeWorkspaceEntry };
