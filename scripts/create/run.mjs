/**
 * パッケージ追加スクリプトです。
 *
 * `mise init` で scripts/templates/ に保持したテンプレートから、選択したパッケージを packages/ に複製し、ルートの workspaces・pnpm-workspace.yaml・VS Code ワークスペースに追加します。
 *
 * 実行方法は `mise create` です（直接実行する場合は `node scripts/create/run.mjs`）。
 * 標準入力がパイプやリダイレクトの場合は、回答を 1 行ずつ読み取って非対話で実行できます。
 * `--packages` を指定した場合も、最後の実行確認だけは 1 行（y/n）の回答が必要です。
 */
import { parseArgs } from "../lib/cli-arguments.mjs";
import { runPnpmInstall } from "../lib/commands.mjs";
import { askYesNo, createAsker } from "../lib/interactive-prompts.mjs";
import { ValidationError } from "../lib/validation-error.mjs";
import { applyCreate } from "./lib/apply-create.mjs";
import {
  printCreateHelp,
  loadCreateContext,
  collectCreateConfig,
  validateCreateCliArgs,
} from "./lib/collect-create-config.mjs";

/**
 * 実行内容の概要を表示し、実行の可否を確認します。
 *
 * @param {import("../lib/interactive-prompts.mjs").Ask} ask 質問関数です。
 * @param {import("./lib/collect-create-config.mjs").CreateConfig} config パッケージ追加の設定です。
 *
 * @returns {Promise<boolean>} 実行する場合は true、中止する場合は false です。
 */
async function confirmCreate(ask, config) {
  console.log("");
  console.log("以下の内容でパッケージを追加します。");
  console.log(`  GitHub: ${config.owner}`);
  console.log(`  homepage: ${config.homepage}`);
  console.log(`  repository.url: ${config.repositoryUrl}`);
  console.log(`  VS Code ワークスペース: ${config.workspacePath}`);
  console.log("  パッケージ:");
  for (const plan of config.packages) {
    console.log(`    - ${plan.kind}: ${plan.name} → ${plan.dir}`);
  }

  console.log(`  pnpm install: ${config.runInstall ? "実行する" : "実行しない"}`);

  return askYesNo(ask, "実行しますか", true);
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
      printCreateHelp();

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

    printCreateHelp();

    return;
  }

  validateCreateCliArgs(args);
  const context = loadCreateContext();
  const asker = createAsker();

  try {
    const config = await collectCreateConfig(asker.ask, args, context);
    const confirmed = await confirmCreate(asker.ask, config);

    if (!confirmed) {
      console.log("中止しました。何も変更していません。");

      return;
    }

    try {
      applyCreate(config);
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

      if (!installOk) {
        console.log("pnpm install に失敗しました。手動で実行してください。");
      }
    } else {
      console.log("pnpm install を省略しました。必要に応じて手動で実行してください。");
    }

    console.log("");
    if (installOk) {
      console.log("パッケージの追加が完了しました。");
    } else {
      console.log(
        "パッケージのファイル変更は完了しましたが、pnpm install に失敗しました。手動で再実行してください。",
      );
    }

    for (const plan of config.packages) {
      console.log(`  パッケージ: ${plan.name}（${plan.dir}）`);
    }

    console.log("  mise create を再度実行すると、さらにパッケージを追加できます。");
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
