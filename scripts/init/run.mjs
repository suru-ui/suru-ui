/**
 * テンプレートの初期化スクリプトです。
 *
 * このテンプレートを使い始める際に最初に実行します。プロジェクト名や GitHub リポジトリー名、パッケージのスコープなどを対話形式で尋ね、テンプレートを scripts/templates/ に保持したうえで、選択したパッケージを packages/ に複製します。
 *
 * 実行方法は `mise init` です（直接実行する場合は `node scripts/init/run.mjs`）。
 * 実行には Node.js 22.18 以降または 24.11 以降が必要です（Node.js 24 を推奨します）。
 * 標準入力がパイプやリダイレクトの場合は、回答を 1 行ずつ読み取って非対話で実行できます。
 * すべての引数を指定した場合も、最後の実行確認だけは 1 行（y/n）の回答が必要です。
 */
import { existsSync } from "node:fs";
import { join } from "node:path";

import { parseArgs } from "../lib/cli-arguments.mjs";
import { runPnpmInstall } from "../lib/commands.mjs";
import { askYesNo, createAsker } from "../lib/interactive-prompts.mjs";
import {
  ROOT,
  TEMPLATE_PACKAGES,
  TEMPLATE_SOURCE_ROOT,
  TEMPLATE_WORKSPACE_FILE_NAME,
} from "../lib/template-constants.mjs";
import { ValidationError } from "../lib/validation-error.mjs";
import { applyConfig } from "./lib/apply-changes.mjs";
import { printHelp, validateCliArgs } from "./lib/cli-options.mjs";
import { collectConfig } from "./lib/collect-config.mjs";
import { runMiseUpdate, runSkillsInstall } from "./lib/post-init-tasks.mjs";

/**
 * 実行内容の概要を表示し、実行の可否を確認します。
 *
 * release.yml の外部アクション参照と skills-lock.json の取得元は外部リポジトリーの参照のため更新しません。その旨も表示します。
 * テンプレートは削除せず scripts/templates/ に保持し、選択した種類だけを packages/ に複製する旨を表示します。
 *
 * @param {import("../lib/interactive-prompts.mjs").Ask} ask 質問関数です。
 * @param {import("./lib/collect-config.mjs").InitConfig} config 初期化内容です。
 *
 * @returns {Promise<boolean>} 実行する場合は true、中止する場合は false です。
 */
async function confirmPlan(ask, config) {
  const dirs = config.packages.map((plan) => plan.dir);
  const workspaces = [...dirs, "website"];
  const oldWorkspace = TEMPLATE_WORKSPACE_FILE_NAME;
  const newWorkspace = `${config.slug}.code-workspace`;
  const workspaceChange =
    oldWorkspace === newWorkspace
      ? `${oldWorkspace} → ${newWorkspace}（上書き）`
      : `${oldWorkspace} → ${newWorkspace}（新規作成・旧ファイル削除）`;

  console.log("");
  console.log("以下の内容で初期化を実行します。");
  console.log(`  プロジェクト名: ${config.project}`);
  console.log(`  スラグ名: ${config.slug}`);
  console.log(`  GitHub: ${config.owner}/${config.repo}`);
  console.log(`  スコープ: ${config.scope === "" ? "なし" : config.scope}`);
  console.log(`  テンプレートの保持先: ${TEMPLATE_SOURCE_ROOT}/（全種類を保持）`);
  console.log("  パッケージ:");
  for (const plan of config.packages) {
    console.log(
      `    - ${plan.kind}: ${plan.name} → ${plan.dir}（${TEMPLATE_SOURCE_ROOT}/${plan.kind} から複製）`,
    );
  }

  console.log(`  ワークスペース定義: ${workspaceChange}`);
  console.log(`  workspaces: [${workspaces.map((dir) => JSON.stringify(dir)).join(", ")}]`);
  console.log(
    `  pnpm-workspace.yaml packages: [${workspaces.map((dir) => JSON.stringify(dir)).join(", ")}]`,
  );
  console.log(
    `  pnpm install / pnpm exec skills experimental_install: ${config.runInstall ? "実行する" : "実行しない"}`,
  );
  console.log(`  mise update: ${config.runMiseUpdate ? "実行する" : "実行しない"}`);
  console.log(
    "  scripts/init/・scripts/create/・scripts/lib/・scripts/templates/ は Git の管理対象に含める（fresh clone でも mise create を利用可能）",
  );
  console.log(
    "  更新しないもの: release.yml の外部アクション参照・skills-lock.json の取得元（外部リポジトリーの参照のため）",
  );

  return askYesNo(ask, "実行しますか", true);
}

/** テンプレートの残骸が残っていることを確認します。 */
function assertFreshTemplate() {
  const remaining = TEMPLATE_PACKAGES.map((pkg) => pkg.kind).filter((kind) =>
    existsSync(join(ROOT, "packages", kind, "package.json")),
  );

  if (remaining.length === 0) {
    throw new ValidationError(
      "テンプレートのパッケージが見つかりません。既に初期化済みの可能性があります。",
    );
  }
}

/**
 * スクリプトの入口です。
 *
 * `--help` は他の検証より優先し、未知の引数や不正な組合せがあっても表示します。
 * ただし `--help` に値を付けた場合（`--help=x`・`--help <値>`）は表示せず ValidationError とします。
 */
async function main() {
  const [majorText, minorText] = process.versions.node.split(".");
  const major = Number(majorText);
  const minor = Number(minorText);

  const supported = (major === 22 && minor >= 18) || (major === 24 && minor >= 11) || major >= 26;

  if (!Number.isInteger(major) || !Number.isInteger(minor) || !supported) {
    throw new Error("Node.js 22.18 以降または 24.11 以降が必要です。Node.js 24 を推奨します。");
  }

  const rawArgv = process.argv.slice(2);
  let args;

  try {
    args = parseArgs(rawArgv);
  } catch (error) {
    if (rawArgv.includes("--help")) {
      printHelp();

      return;
    }

    throw error;
  }

  if (args.has("help")) {
    if (typeof args.get("help") === "string") {
      throw new ValidationError(
        "--help に値を付けないでください。指定あり・なしで切り替えます（例: --help=x は受け付けません）。",
      );
    }

    printHelp();

    return;
  }

  validateCliArgs(args);
  assertFreshTemplate();
  const asker = createAsker();

  try {
    const config = await collectConfig(asker.ask, args);
    const confirmed = await confirmPlan(asker.ask, config);

    if (!confirmed) {
      console.log("中止しました。何も変更していません。");

      return;
    }

    try {
      applyConfig(config);
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      }

      const detail = error instanceof Error ? error.message : String(error);

      throw new Error(
        `${detail}（部分的に変更されている可能性があります。git status で確認してください。）`,
        { cause: error },
      );
    }

    let installOk = true;

    if (config.runInstall) {
      console.log("pnpm install を実行します。");
      installOk = runPnpmInstall();
      if (installOk) {
        console.log("pnpm exec skills experimental_install を実行します。");
        installOk = runSkillsInstall();
      }

      if (!installOk) {
        console.log(
          "pnpm install または pnpm exec skills experimental_install に失敗しました。手動で実行してください。",
        );
      }
    } else {
      console.log(
        "pnpm install と pnpm exec skills experimental_install を省略しました。必要に応じて手動で実行してください。",
      );
    }

    let miseOk = true;

    if (config.runMiseUpdate) {
      console.log("mise update を実行します。");
      miseOk = runMiseUpdate();
      if (!miseOk) {
        console.log("mise update に失敗しました。手動で mise update を実行してください。");
      }
    }

    const postInitOk = installOk && miseOk;

    console.log("");
    if (!postInitOk) {
      console.log(
        "初期化のファイル変更は完了しましたが、最後のコマンドに失敗しました。手動で再実行してください。",
      );
      if (!installOk) {
        console.log(
          "  pnpm install と pnpm exec skills experimental_install を手動で実行してください。",
        );
      }

      if (!miseOk) {
        console.log("  mise update を手動で実行してください。");
      }
    } else {
      console.log("初期化が完了しました。");
    }

    console.log(`  プロジェクト: ${config.project}（${config.owner}/${config.repo}）`);
    console.log(`  スラグ: ${config.slug}`);
    for (const plan of config.packages) {
      console.log(`  パッケージ: ${plan.name}（${plan.dir}）`);
    }

    console.log(`  テンプレート: ${TEMPLATE_SOURCE_ROOT}/（mise create で追加できます）`);
  } finally {
    asker.close();
  }
}

try {
  await main();
} catch (error) {
  if (error instanceof ValidationError) {
    console.error(`検証に失敗しました。何も変更していません。${error.message}`);
  } else {
    console.error(error instanceof Error ? error.message : error);
  }

  process.exitCode = 1;
}
