import {
  validateRepoName,
  validateSlugName,
  validateOwnerName,
  validateScopeName,
  validateProjectName,
} from "../../lib/input-validators.mjs";
import { askText, askYesNo } from "../../lib/interactive-prompts.mjs";
import { ValidationError } from "../../lib/validation-error.mjs";
import { resolvePackagePlans } from "./package-plans.mjs";

/**
 * 対話で収集する初期化内容です。
 *
 * @typedef {object} InitConfig
 *
 * @property {string} project プロジェクト名です。website の設定・トップページのタイトル・README に使います。
 * @property {string} slug スラグ名です。ルートパッケージ名（`*-monorepo`）と VS Code ワークスペースのファイル名（`*.code-workspace`）に使います。
 * @property {string} owner GitHub オーナー名です。
 * @property {string} repo GitHub リポジトリー名です。
 * @property {string} scope パッケージスコープです。スコープなしの場合は空文字列です。
 * @property {import("../../lib/template-constants.mjs").PackagePlan[]} packages 追加するパッケージの計画です。
 * @property {boolean} runInstall 最後に pnpm install と pnpm exec skills experimental_install を実行するかどうかです。
 * @property {boolean} runMiseUpdate 最後に mise update を実行するかどうかです。
 */

/**
 * 文字列オプションの値を取得します。引数指定があれば前後空白を除去して検証し、なければ対話で尋ねます。
 *
 * @param {Map<string, string | boolean>} args 解析済みの引数です。
 * @param {import("../../lib/interactive-prompts.mjs").Ask} ask 質問関数です。
 * @param {string} key 引数名です。
 * @param {string} message 質問文です。
 * @param {{ defaultValue?: string, validate: function(string): (string | undefined) }} options 既定値と検証関数です。
 *
 * @returns {Promise<string>} 検証済みの値です。
 */
async function stringArgOrAsk(args, ask, key, message, options) {
  const raw = args.get(key);

  if (typeof raw === "string") {
    const value = raw.trim();

    if (value === "") {
      throw new ValidationError(
        `--${key} が空です。値を指定するか、引数を省略して対話で入力してください。`,
      );
    }

    const error = options.validate(value);

    if (error !== undefined) {
      throw new ValidationError(`--${key} が不正です（${value}）。${error}`);
    }

    return value;
  }

  if (raw === true) {
    // validateCliArgs で事前に弾く想定ですが、直接呼ばれた場合にも備えます。
    throw new ValidationError(
      `--${key} には値が必要です。--${key}=<値> の形式で指定してください。`,
    );
  }

  return askText(ask, message, options);
}

/**
 * パッケージスコープを決定します。引数指定があれば検証して使い、なければ対話で尋ねます。
 *
 * `--scope=` の空文字はスコープなしを意味します。
 * 対話の既定値はオーナー名の小文字ですが、スコープとして無効な場合（予約語等）は既定値なしの必須入力に切り替え、パイプずれの大文字エラーを防ぎます。
 *
 * @param {Map<string, string | boolean>} args 解析済みの引数です。
 * @param {import("../../lib/interactive-prompts.mjs").Ask} ask 質問関数です。
 * @param {string} owner GitHub オーナー名です。
 *
 * @returns {Promise<string>} `@` 付きのスコープ、またはスコープなしの場合は空文字列です。
 */
async function resolveScope(args, ask, owner) {
  const raw = args.get("scope");

  if (typeof raw === "string") {
    const name = raw.trim();

    if (name === "") {
      return "";
    }

    const error = validateScopeName(name);

    if (error !== undefined) {
      throw new ValidationError(`--scope が不正です（${name}）。${error}`);
    }

    return `@${name}`;
  }

  if (raw === true) {
    throw new ValidationError(
      "--scope には値が必要です。--scope=<名前> の形式で指定してください。スコープなしの場合は --scope= と指定します。",
    );
  }

  const scoped = await askYesNo(ask, "パッケージ名にスコープ（@scope）を付けますか", false);

  if (!scoped) {
    return "";
  }

  const lowerOwner = owner.toLowerCase();
  const scopeDefault = validateScopeName(lowerOwner) === undefined ? lowerOwner : undefined;
  const scopeName = await askText(ask, "スコープ名（@ を除く）", {
    validate: validateScopeName,
    defaultValue: scopeDefault,
  });

  return `@${scopeName}`;
}

/**
 * pnpm install と pnpm exec skills experimental_install の実行有無を決定します。
 * 引数指定があればそれに従い、なければ対話で尋ねます。
 *
 * @param {Map<string, string | boolean>} args 解析済みの引数です。
 * @param {import("../../lib/interactive-prompts.mjs").Ask} ask 質問関数です。
 *
 * @returns {Promise<boolean>} 実行する場合は true、省略する場合は false です。
 */
async function resolveRunInstall(args, ask) {
  // validateCliArgs で = 値付きを弾いているため、has の有無だけで判定します。
  if (args.has("skip-install")) {
    return false;
  }

  return askYesNo(
    ask,
    "最後に pnpm install と pnpm exec skills experimental_install を実行しますか（ロックファイルの更新とスキルの復元）",
    true,
  );
}

/**
 * mise update の実行有無を決定します。
 *
 * pnpm install とは異なり、--mise-update を指定した場合だけ実行します。
 *
 * @param {Map<string, string | boolean>} args 解析済みの引数です。
 *
 * @returns {boolean} 実行する場合は true、省略する場合は false です。
 */
function resolveRunMiseUpdate(args) {
  return args.has("mise-update");
}

/**
 * 対話形式で初期化内容を収集します。引数で指定済みの項目は質問を省略します。
 *
 * すべての引数を指定した場合は、最後の実行確認を除き質問しません。
 * CI やワークスペース定義が空になるのを避けるため、パッケージは 1 つ以上必要です。
 * スラグの既定値はリポジトリー名の小文字ですが、スラグとして無効な場合（`_` 始まり等）は既定値なしの必須入力に切り替え、repo の大文字許容と slug の大文字拒否の不整合によるパイプずれを防ぎます。
 *
 * @param {import("../../lib/interactive-prompts.mjs").Ask} ask 質問関数です。
 * @param {Map<string, string | boolean>} args 解析済みの引数です。
 *
 * @returns {Promise<InitConfig>} 収集した初期化内容です。
 */
async function collectConfig(ask, args) {
  const project = await stringArgOrAsk(args, ask, "project", "プロジェクト名", {
    validate: validateProjectName,
  });
  const owner = await stringArgOrAsk(args, ask, "owner", "GitHub オーナー名", {
    validate: validateOwnerName,
  });
  const repo = await stringArgOrAsk(args, ask, "repo", "GitHub リポジトリー名", {
    validate: validateRepoName,
  });
  const slugLower = repo.toLowerCase();
  const slugDefault = validateSlugName(slugLower) === undefined ? slugLower : undefined;
  const slug = await stringArgOrAsk(args, ask, "slug", "スラグ名", {
    validate: validateSlugName,
    defaultValue: slugDefault,
  });
  const scope = await resolveScope(args, ask, owner);
  const packages = await resolvePackagePlans(args, ask, scope);
  const runInstall = await resolveRunInstall(args, ask);
  const shouldRunMiseUpdate = resolveRunMiseUpdate(args);

  return {
    repo,
    slug,
    owner,
    scope,
    project,
    packages,
    runInstall,
    runMiseUpdate: shouldRunMiseUpdate,
  };
}

export { collectConfig };
