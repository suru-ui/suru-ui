import { existsSync } from "node:fs";
import { join } from "node:path";

import { parsePackagesArg } from "../../lib/cli-arguments.mjs";
import { readJsonFile } from "../../lib/file-io.mjs";
import { validatePackageName } from "../../lib/input-validators.mjs";
import { askText, askYesNo, askPackageKind } from "../../lib/interactive-prompts.mjs";
import {
  ROOT,
  dirForPackageName,
  TEMPLATE_PACKAGES,
  defaultPackageName,
  TEMPLATE_SOURCE_ROOT,
} from "../../lib/template-constants.mjs";
import { ValidationError } from "../../lib/validation-error.mjs";
import { findPlanProblem, readWorkspacePackageNames } from "../../lib/workspace-checks.mjs";
import { findCodeWorkspaceFileName } from "./code-workspace-entries.mjs";

/**
 * パッケージ追加時に既存ワークスペースから引き継ぐ情報です。
 *
 * @typedef {object} CreateContext
 *
 * @property {import("../../lib/template-constants.mjs").TemplatePackage[]} availablePackages scripts/templates に実在するテンプレートの一覧です。
 * @property {string} owner 既存パッケージの repository.url から求めた GitHub オーナー名です。
 * @property {string} homepage 既存パッケージの homepage です。
 * @property {string} repositoryUrl 既存パッケージの repository.url です。
 * @property {string} scope 既存パッケージ名から推測したスコープです。`@` 付き、または空文字列です。
 * @property {string} workspacePath 更新する `*.code-workspace` の相対パスです。
 * @property {string[]} existingNames 既存ワークスペースのパッケージ名です。
 */

/**
 * パッケージ追加の設定です。
 *
 * @typedef {object} CreateConfig
 *
 * @property {import("../../lib/template-constants.mjs").PackagePlan[]} packages 追加するパッケージの計画です。
 * @property {boolean} runInstall 最後に pnpm install を実行するかどうかです。
 * @property {string} owner GitHub オーナー名です。
 * @property {string} homepage 既存パッケージの homepage です。
 * @property {string} repositoryUrl 既存パッケージの repository.url です。
 * @property {string} workspacePath 更新する `*.code-workspace` の相対パスです。
 * @property {string[]} existingNames 収集時点の既存ワークスペースのパッケージ名です。
 */

/**
 * GitHub のリポジトリー URL からオーナー名を求めます。
 *
 * @param {string} repositoryUrl 既存パッケージの repository.url です。
 *
 * @returns {string} GitHub のオーナー名です。
 */
function ownerFromRepositoryUrl(repositoryUrl) {
  const normalized = repositoryUrl
    .replace(/^git\+/u, "")
    .replace(/^ssh:\/\/git@github\.com\//u, "https://github.com/")
    .replace(/^git@github\.com:/u, "https://github.com/")
    .replace(/\/+$/u, "")
    .replace(/\.git$/u, "");
  const match = /^https?:\/\/github\.com\/(?<owner>[^/]+)\/(?<repo>[^/]+)$/u.exec(normalized);
  const owner = match?.groups?.owner;

  if (owner === undefined || owner === "") {
    throw new ValidationError(
      `repository.url（${repositoryUrl}）から GitHub のオーナー名を読み取れません。既存パッケージの設定を確認してください。`,
    );
  }

  return owner;
}

/**
 * 最初の非 website パッケージからプロジェクト情報を読み取ります。
 *
 * @param {unknown[]} workspaces ルート package.json の workspaces です。
 *
 * @returns {{ homepage: string, repositoryUrl: string, names: string[] }} プロジェクト情報と非 website パッケージ名です。
 */
function readProjectMetadata(workspaces) {
  const names = [];
  let metadata;

  for (const workspace of workspaces) {
    if (workspace === "website") {
      continue;
    }

    const pkgPath = join(ROOT, String(workspace), "package.json");

    if (!existsSync(pkgPath)) {
      continue;
    }

    const data = readJsonFile(pkgPath);

    if (typeof data.name === "string" && data.name !== "") {
      names.push(data.name);
    }

    if (metadata !== undefined) {
      continue;
    }

    if (typeof data.homepage !== "string" || data.homepage === "") {
      throw new ValidationError(
        `${pkgPath}: homepage が見つかりません。既存パッケージの設定を確認してください。`,
      );
    }

    const repository = data.repository;

    if (
      typeof repository !== "object" ||
      repository === null ||
      Array.isArray(repository) ||
      typeof repository.url !== "string" ||
      repository.url === ""
    ) {
      throw new ValidationError(
        `${pkgPath}: repository.url が見つかりません。既存パッケージの設定を確認してください。`,
      );
    }

    metadata = {
      homepage: data.homepage,
      repositoryUrl: repository.url,
    };
  }

  if (metadata === undefined) {
    throw new ValidationError(
      `${join(ROOT, "package.json")}: プロジェクト情報を読み取れる非 website のワークスペースパッケージがありません。mise init を先に実行してください。`,
    );
  }

  return {
    ...metadata,
    names,
  };
}

/**
 * 既存パッケージ名から既定のスコープを求めます。
 *
 * すべての非 website パッケージが同じ `@scope/` を共有している場合だけ、そのスコープを使います。
 *
 * @param {string[]} names 非 website パッケージの名前です。
 *
 * @returns {string} `@` 付きのスコープ、またはスコープなしの場合は空文字列です。
 */
function resolveDefaultScope(names) {
  if (names.length === 0) {
    return "";
  }

  const scopes = new Set();

  for (const name of names) {
    const match = /^(?<scope>@[^/]+)\/.+$/u.exec(name);

    if (match?.groups?.scope === undefined) {
      return "";
    }

    scopes.add(match.groups.scope);
  }

  return scopes.size === 1 ? [...scopes][0] : "";
}

/**
 * パッケージ追加の前提を確認し、既存ワークスペースから引き継ぐ情報を集めます。
 *
 * `scripts/templates` が存在しない場合は、先に `mise init` を実行するよう案内します。
 *
 * @returns {CreateContext} パッケージ追加の前提情報です。
 */
function loadCreateContext() {
  const templateRoot = join(ROOT, TEMPLATE_SOURCE_ROOT);
  const availablePackages = TEMPLATE_PACKAGES.filter((pkg) =>
    existsSync(join(templateRoot, pkg.kind, "package.json")),
  );

  if (!existsSync(templateRoot) || availablePackages.length === 0) {
    throw new ValidationError(
      `${templateRoot}: 利用できるテンプレートがありません。先に mise init を実行してください。`,
    );
  }

  const rootPkgPath = join(ROOT, "package.json");

  if (!existsSync(rootPkgPath)) {
    throw new ValidationError(`${rootPkgPath}: ルートの package.json が見つかりません。`);
  }

  const rootPkg = readJsonFile(rootPkgPath);

  if (!Array.isArray(rootPkg.workspaces)) {
    throw new ValidationError(`${rootPkgPath}: workspaces が配列ではありません。`);
  }

  const existingNames = readWorkspacePackageNames();
  const project = readProjectMetadata(rootPkg.workspaces);

  return {
    owner: ownerFromRepositoryUrl(project.repositoryUrl),
    scope: resolveDefaultScope(project.names),
    homepage: project.homepage,
    existingNames,
    repositoryUrl: project.repositoryUrl,
    workspacePath: findCodeWorkspaceFileName(rootPkg.name),
    availablePackages,
  };
}

/**
 * 既存の計画と衝突しない既定のパッケージ名を作ります。
 *
 * `findPlanProblem` と同じ衝突規則を使い、`-2`、`-3` … を付けて候補を探します。
 *
 * @param {import("../../lib/template-constants.mjs").TemplateKind} kind テンプレートの種類です。
 * @param {string} scope `@` 付きのスコープ、またはスコープなしの場合は空文字列です。
 * @param {import("../../lib/template-constants.mjs").PackagePlan[]} plans これまでに作成した配置計画です。
 * @param {string[]} existingNames 既存ワークスペースのパッケージ名です。
 *
 * @returns {string} 衝突しない既定のパッケージ名です。
 */
function uniqueDefaultName(kind, scope, plans, existingNames) {
  const base = defaultPackageName(kind, scope);

  for (let suffix = 1; suffix <= 1000; suffix++) {
    const candidate = suffix === 1 ? base : `${base}-${suffix}`;
    const dir = dirForPackageName(candidate);
    const problem = findPlanProblem(plans, existingNames, [], kind, candidate, dir);

    // findPlanProblem は init の移動元（packages/<kind>）を例外扱いするため、配置先の存在は別途確認します。
    if (problem === undefined && !existsSync(join(ROOT, dir))) {
      return candidate;
    }
  }

  throw new ValidationError(
    `パッケージ（${kind}）の既定名を決められませんでした。--packages で名前を指定してください。`,
  );
}

/**
 * 計画をテンプレート定義順に並べ替えます。
 *
 * @param {import("../../lib/template-constants.mjs").PackagePlan[]} plans 配置計画です。
 *
 * @returns {import("../../lib/template-constants.mjs").PackagePlan[]} 並べ替えた配置計画です。
 */
function sortPlans(plans) {
  return plans.toSorted(
    (a, b) =>
      TEMPLATE_PACKAGES.findIndex((pkg) => pkg.kind === a.kind) -
      TEMPLATE_PACKAGES.findIndex((pkg) => pkg.kind === b.kind),
  );
}

/**
 * 引数指定の選択内容から配置計画を作ります。
 *
 * 名前を省略した場合は既存ワークスペースと衝突しないよう `-2`、`-3` … を自動で付けます。
 * 明示した名前が重複する場合は ValidationError とします。
 *
 * @param {import("../../lib/cli-arguments.mjs").PackageSelection[]} selections `--packages` の選択内容です。
 * @param {CreateContext} context パッケージ追加の前提情報です。
 *
 * @returns {import("../../lib/template-constants.mjs").PackagePlan[]} 配置計画です。
 */
function buildCreatePlans(selections, context) {
  const plans = [];
  const availableKinds = context.availablePackages.map((pkg) => pkg.kind);

  for (const { kind, rename } of selections) {
    if (!availableKinds.includes(kind)) {
      throw new ValidationError(
        `${TEMPLATE_SOURCE_ROOT}/${kind}: テンプレートがありません。利用できる種類は ${availableKinds.join("、")} です。先に mise init を実行してください。`,
      );
    }

    let name;

    if (rename === undefined) {
      name = uniqueDefaultName(kind, context.scope, plans, context.existingNames);
    } else {
      const nameError = validatePackageName(rename);

      if (nameError !== undefined) {
        throw new ValidationError(`パッケージ（${kind}）の名前が不正です。${nameError}`);
      }

      const dir = dirForPackageName(rename);
      const problem = findPlanProblem(plans, context.existingNames, [], kind, rename, dir);

      if (problem !== undefined) {
        throw new ValidationError(problem);
      }

      if (existsSync(join(ROOT, dir))) {
        throw new ValidationError(`配置先 ${dir} は既に存在します。別の名前にしてください。`);
      }

      name = rename;
    }

    plans.push({
      dir: dirForPackageName(name),
      kind,
      name,
    });
  }

  return sortPlans(plans);
}

/**
 * 対話形式でパッケージを 1 つずつ追加し、配置計画を作ります。
 *
 * @param {import("../../lib/interactive-prompts.mjs").Ask} ask 質問関数です。
 * @param {CreateContext} context パッケージ追加の前提情報です。
 *
 * @returns {Promise<import("../../lib/template-constants.mjs").PackagePlan[]>} 配置計画です。
 */
async function askCreatePlans(ask, context) {
  const plans = [];

  for (;;) {
    const kind = await askPackageKind(ask, context.availablePackages);

    for (;;) {
      const name = await askText(ask, `パッケージ（${kind}）の名前`, {
        validate: validatePackageName,
      });
      const dir = dirForPackageName(name);
      const problem = findPlanProblem(plans, context.existingNames, [], kind, name, dir);

      if (problem !== undefined || existsSync(join(ROOT, dir))) {
        console.log(problem ?? `配置先 ${dir} は既に存在します。別の名前にしてください。`);
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

  return sortPlans(plans);
}

/**
 * 追加するパッケージの計画を決定します。引数指定があれば検証して使い、なければ対話で尋ねます。
 *
 * @param {Map<string, string | boolean>} args 解析済みの引数です。
 * @param {import("../../lib/interactive-prompts.mjs").Ask} ask 質問関数です。
 * @param {CreateContext} context パッケージ追加の前提情報です。
 *
 * @returns {Promise<import("../../lib/template-constants.mjs").PackagePlan[]>} 配置計画です。
 */
async function resolveCreatePlans(args, ask, context) {
  const raw = args.get("packages");

  if (typeof raw === "string") {
    return buildCreatePlans(parsePackagesArg(raw), context);
  }

  if (raw === true) {
    throw new ValidationError(
      "--packages には値が必要です。--packages=<選択> の形式で指定してください。",
    );
  }

  return askCreatePlans(ask, context);
}

/**
 * pnpm install の実行有無を決定します。
 *
 * `--skip-install` が指定されていれば実行せず、なければ対話で尋ねます。
 *
 * @param {Map<string, string | boolean>} args 解析済みの引数です。
 * @param {import("../../lib/interactive-prompts.mjs").Ask} ask 質問関数です。
 *
 * @returns {Promise<boolean>} 実行する場合は true、省略する場合は false です。
 */
async function resolveRunInstall(args, ask) {
  if (args.has("skip-install")) {
    return false;
  }

  return askYesNo(ask, "最後に pnpm install を実行しますか", true);
}

/**
 * パッケージ追加の設定を収集します。引数で指定済みの項目は質問を省略します。
 *
 * @param {import("../../lib/interactive-prompts.mjs").Ask} ask 質問関数です。
 * @param {Map<string, string | boolean>} args 解析済みの引数です。
 * @param {CreateContext} context パッケージ追加の前提情報です。
 *
 * @returns {Promise<CreateConfig>} 収集した設定です。
 */
async function collectCreateConfig(ask, args, context) {
  const packages = await resolveCreatePlans(args, ask, context);
  const runInstall = await resolveRunInstall(args, ask);

  return {
    owner: context.owner,
    homepage: context.homepage,
    packages,
    runInstall,
    existingNames: context.existingNames,
    repositoryUrl: context.repositoryUrl,
    workspacePath: context.workspacePath,
  };
}

/** `mise create` で値を受け付ける文字列オプションです。 */
const CREATE_STRING_OPTIONS = ["packages"];

/** `mise create` で値なしで指定する真偽値の引数です。 */
const CREATE_BOOLEAN_FLAGS = ["skip-install", "help"];

/** `mise create` で受け付ける引数名の一覧です。 */
const CREATE_KNOWN_ARGS = [...CREATE_STRING_OPTIONS, ...CREATE_BOOLEAN_FLAGS];

/**
 * `mise create` のコマンドライン引数を検証します。
 *
 * `parseArgs` で検出できない未知の引数・値の有無を検証し、すべて ValidationError で投げます。
 *
 * @param {Map<string, string | boolean>} args 解析済みの引数です。
 */
function validateCreateCliArgs(args) {
  for (const key of args.keys()) {
    if (!CREATE_KNOWN_ARGS.includes(key)) {
      throw new ValidationError(
        `不明な引数です: --${key}。利用可能な引数は ${CREATE_KNOWN_ARGS.map(
          (name) => `--${name}`,
        ).join("、")} です。--help で使い方を確認してください。`,
      );
    }
  }

  for (const key of CREATE_STRING_OPTIONS) {
    if (args.get(key) === true) {
      throw new ValidationError(
        `--${key} には値が必要です。--${key}=<値> の形式で指定してください。値なしでは対話に切り替えません。`,
      );
    }
  }

  for (const key of CREATE_BOOLEAN_FLAGS) {
    if (typeof args.get(key) === "string") {
      throw new ValidationError(
        `--${key} に値を付けないでください。指定あり・なしで切り替えます（例: --${key}=false は受け付けません）。`,
      );
    }
  }

  const packagesRaw = args.get("packages");

  if (typeof packagesRaw === "string") {
    for (const { kind, rename } of parsePackagesArg(packagesRaw)) {
      if (rename === undefined) {
        continue;
      }

      const renameError = validatePackageName(rename);

      if (renameError !== undefined) {
        throw new ValidationError(
          `パッケージ（${kind}）の変更後名が不正です（${rename}）。${renameError}`,
        );
      }
    }
  }
}

/** `mise create` の使用方法を表示します。 */
function printCreateHelp() {
  console.log(`使い方: mise create [options]（または node scripts/create/run.mjs [options]）

scripts/templates/ に保持したテンプレートから packages/ にパッケージを追加します。
mise init で初期化したリポジトリーで使用してください。
指定されなかった項目は対話形式で尋ねます。--packages を指定した場合も最後の実行確認に 1 行（y/n）が必要です。

例:
  mise create --packages=server-client=@acme/shared,client-react=@acme/ui --skip-install

options:
  --packages=<選択>  追加するパッケージ（カンマ区切り。候補は scripts/templates に実在する種類。空要素なし）
                     同じ種類を複数回指定できます。2 件目以降は kind=名前 形式で重複しない名前を指定してください。
                     名前を変更する場合は kind=名前 形式（例: server=@acme/api）。
                     名前を省略した場合、既存と衝突するときは -2、-3 … を自動で付けます。
  --skip-install     最後の pnpm install を省略します（値を付けないこと）
  --help             この表示を出します（値を付けないこと。他の引数より優先します）

注意:
  位置引数・単一ダッシュ・-- 単体・引数の重複・文字列オプションの値なし指定・未知の引数・--packages の空要素や不明な種類はエラーになります。
  検証に失敗した場合は何も変更しません。
  実行確認は --packages 指定時も必要です（標準入力がパイプの場合は y/n を 1 行追加してください）。`);
}

export {
  askCreatePlans,
  printCreateHelp,
  buildCreatePlans,
  loadCreateContext,
  collectCreateConfig,
  validateCreateCliArgs,
};
