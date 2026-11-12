import { parsePackagesArg } from "../../lib/cli-arguments.mjs";
import { validatePackageName } from "../../lib/input-validators.mjs";
import { askText, askYesNo, askPackageKind } from "../../lib/interactive-prompts.mjs";
import {
  dirForPackageName,
  TEMPLATE_PACKAGES,
  defaultPackageName,
  TEMPLATE_PACKAGE_DIRS,
} from "../../lib/template-constants.mjs";
import { ValidationError } from "../../lib/validation-error.mjs";
import { findPlanProblem, readWorkspacePackageNames } from "../../lib/workspace-checks.mjs";

/**
 * パッケージを 1 つずつ追加し、配置計画を作ります。
 *
 * 「タイプ選択 -> 名前入力 -> もっと追加する？」の順で尋ねます。
 * 同じタイプを何度でも選べます。名前の既定値はないため、必ず入力します。
 * CI やワークスペース定義が空になるのを避けるため、最低 1 つのパッケージが必要です。
 * CLI 指定（テンプレート定義順ソート済み）と成果物順序を一致させるため、戻り値は選択順ではなくテンプレート定義順にソートします（同じ種類内は選択順）。
 *
 * @param {import("../../lib/interactive-prompts.mjs").Ask} ask 質問関数です。
 *
 * @returns {Promise<import("../../lib/template-constants.mjs").PackagePlan[]>} パッケージの配置計画の一覧（テンプレート定義順）です。
 */
async function askPackagePlans(ask) {
  const existingNames = readWorkspacePackageNames({ excludeTemplateDirs: true });
  const plans = [];

  for (;;) {
    const kind = await askPackageKind(ask);

    for (;;) {
      const name = await askText(ask, `パッケージ（${kind}）の名前`, {
        validate: validatePackageName,
      });
      const dir = dirForPackageName(name);
      // すべてのテンプレートは scripts/templates に移動してから複製するため、テンプレートの配置先は再利用できます。
      const problem = findPlanProblem(plans, existingNames, TEMPLATE_PACKAGE_DIRS, kind, name, dir);

      if (problem !== undefined) {
        console.log(problem);
        continue;
      }

      plans.push({
        dir,
        kind,
        name,
      });
      break;
    }

    const more = await askYesNo(ask, "さらにパッケージを追加しますか", false);

    if (!more) {
      break;
    }
  }

  return plans.toSorted(
    (a, b) =>
      TEMPLATE_PACKAGES.findIndex((pkg) => pkg.kind === a.kind) -
      TEMPLATE_PACKAGES.findIndex((pkg) => pkg.kind === b.kind),
  );
}

/**
 * 引数指定の配置計画を検証して作ります。
 *
 * 同じ種類の複数指定を許します。2 件目以降は `kind=名前` で重複しない名前を指定する必要があります。
 * 収集フェーズのため失敗時は ValidationError を投げ、無書込保証を保ちます。
 *
 * @param {import("../../lib/cli-arguments.mjs").PackageSelection[]} selections `--packages` の選択内容です。
 * @param {string} scope `@` 付きのスコープ、またはスコープなしの場合は空文字列です。
 *
 * @returns {import("../../lib/template-constants.mjs").PackagePlan[]} パッケージの配置計画の一覧です。
 */
function buildPackagePlans(selections, scope) {
  const existingNames = readWorkspacePackageNames({ excludeTemplateDirs: true });
  const removableDirs = TEMPLATE_PACKAGE_DIRS;
  const plans = [];

  for (const { kind, rename } of selections) {
    const name = rename ?? defaultPackageName(kind, scope);

    if (rename === undefined && plans.some((plan) => plan.name === name)) {
      throw new ValidationError(
        `--packages で ${kind} を複数回指定する場合は、2 件目以降に名前を指定してください（例: ${kind}=@acme/${kind}-2）。`,
      );
    }

    const nameError = validatePackageName(name);

    if (nameError !== undefined) {
      throw new ValidationError(`パッケージ（${kind}）の名前が不正です。${nameError}`);
    }

    const dir = dirForPackageName(name);
    const problem = findPlanProblem(plans, existingNames, removableDirs, kind, name, dir);

    if (problem !== undefined) {
      throw new ValidationError(problem);
    }

    plans.push({
      dir,
      kind,
      name,
    });
  }

  return plans;
}

/**
 * 追加するパッケージの計画を決定します。引数指定があれば検証して使い、なければ対話で尋ねます。
 *
 * @param {Map<string, string | boolean>} args 解析済みの引数です。
 * @param {import("../../lib/interactive-prompts.mjs").Ask} ask 質問関数です。
 * @param {string} scope `@` 付きのスコープ、またはスコープなしの場合は空文字列です。
 *
 * @returns {Promise<import("../../lib/template-constants.mjs").PackagePlan[]>} パッケージの配置計画の一覧です。
 */
async function resolvePackagePlans(args, ask, scope) {
  const raw = args.get("packages");

  if (typeof raw === "string") {
    // 構文と rename 妥当性は validateCliArgs で検証済みです。ここでは計画化と重複検査を行います。
    const selections = parsePackagesArg(raw);

    return buildPackagePlans(selections, scope);
  }

  if (raw === true) {
    throw new ValidationError(
      "--packages には値が必要です。--packages=<選択> の形式で指定してください。",
    );
  }

  return askPackagePlans(ask);
}

export { askPackagePlans, buildPackagePlans, resolvePackagePlans };
