import { spawnSync } from "node:child_process";
import { cpSync, rmSync, mkdirSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, basename } from "node:path";

import { readJsonFile, updateJsonFile } from "../../lib/file-io.mjs";
import {
  ROOT,
  TEMPLATE_PACKAGES,
  TEMPLATE_SITE_URL,
  TEMPLATE_COPYRIGHT,
  TEMPLATE_SOURCE_ROOT,
  BLUME_PROJECT_KEY_TYPO,
  formatPnpmWorkspacePackages,
  TEMPLATE_PACKAGE_GENERATED_DIRS,
} from "../../lib/template-constants.mjs";
import { replaceOrThrow } from "../../lib/text-replacements.mjs";
import { ensureScriptsTestGitignore } from "./gitignore.mjs";
import { validateApplyConfig } from "./preflight-validation.mjs";
import { resolveBlumeProjectFrom, collectStaticReplacements } from "./static-replacements.mjs";
import { removeTemplateOnlySection } from "./template-docs.mjs";
import { updateCodeWorkspace } from "./vscode-workspace.mjs";

/**
 * テンプレートを scripts/templates に移動します。
 *
 * 初期化後も mise create でパッケージを追加できるよう、選択・未選択にかかわらずすべてのテンプレートを保持します。
 * node_modules・coverage・dist・.history などの生成物は移動せず、複製元のディレクトリーごと削除します（再生成可能なため）。
 * validateApplyConfig で移動元・移動先の前提を検証済みですが、実行順序に備えて移動先の存在を再検査します。
 */
function moveTemplatesToScripts() {
  const destinationRoot = join(ROOT, TEMPLATE_SOURCE_ROOT);
  mkdirSync(destinationRoot, { recursive: true });

  for (const pkg of TEMPLATE_PACKAGES) {
    const from = join(ROOT, "packages", pkg.kind);

    if (!existsSync(from)) {
      continue;
    }

    const to = join(destinationRoot, pkg.kind);

    if (existsSync(to)) {
      throw new Error(`${to}: テンプレートの移動先が既に存在します。`);
    }

    cpSync(from, to, {
      filter: (src) => !TEMPLATE_PACKAGE_GENERATED_DIRS.includes(basename(src)),
      recursive: true,
    });
    rmSync(from, {
      force: true,
      recursive: true,
    });
    console.log(`移動しました: packages/${pkg.kind} → ${TEMPLATE_SOURCE_ROOT}/${pkg.kind}`);
  }
}

/**
 * 選択されたテンプレートを scripts/templates から packages に複製します。
 *
 * 同じ種類が複数選択された場合も、同じ複製元から必要な数だけ複製します。
 * 生成物ディレクトリーは複製対象から除外します。
 * validateApplyConfig で複製元・配置先の前提を検証済みですが、移動後の実行に備えて宛先の存在を再検査します。
 * この再検査は TOCTOU 競合の緩和であり、厳密な原子性を保証しません。
 *
 * @param {import("../../lib/template-constants.mjs").PackagePlan[]} plans パッケージの配置計画です。
 */
function copySelectedTemplates(plans) {
  for (const plan of plans) {
    const from = join(ROOT, TEMPLATE_SOURCE_ROOT, plan.kind);

    if (!existsSync(from)) {
      throw new Error(
        `${from}: 複製元のテンプレートが見つかりません。テンプレートの移動に失敗した可能性があります。`,
      );
    }

    const to = join(ROOT, plan.dir);

    if (existsSync(to)) {
      throw new Error(`${plan.dir}: 配置先は既に存在します。別の名前にしてください。`);
    }

    cpSync(from, to, {
      filter: (src) => !TEMPLATE_PACKAGE_GENERATED_DIRS.includes(basename(src)),
      recursive: true,
    });
    console.log(`作成しました: ${plan.dir}（${TEMPLATE_SOURCE_ROOT}/${plan.kind} から）`);
  }
}

/**
 * pnpm-workspace.yaml の packages を指定したディレクトリー一覧に置き換えます。
 *
 * フロー配列の書式と BOM・改行コードを維持します。
 *
 * @param {string[]} dirs ワークスペースのディレクトリー一覧です。
 */
function replacePnpmWorkspacePackages(dirs) {
  const workspacePath = join(ROOT, "pnpm-workspace.yaml");
  const workspaceRaw = readFileSync(workspacePath, "utf8");
  const workspaceBom = workspaceRaw.startsWith("\uFEFF") ? "\uFEFF" : "";
  const workspaceBody = workspaceBom === "" ? workspaceRaw : workspaceRaw.slice(1);
  const workspacePackagesPattern = /^packages:[ \t\r\n]*\[[\s\S]*?\]/mu;

  if (!workspacePackagesPattern.test(workspaceBody)) {
    throw new Error(
      `${workspacePath}: packages の一覧が見つかりません（期待値: "packages:" に続くフロー配列）。`,
    );
  }

  const workspacePackages = formatPnpmWorkspacePackages(dirs);
  writeFileSync(
    workspacePath,
    workspaceBom + workspaceBody.replace(workspacePackagesPattern, () => workspacePackages),
  );
}

/** workspaces をトポロジカル順に並べ替えます。 */
function sortWorkspaces() {
  const script = join(ROOT, "scripts", "sort-workspaces.mjs");

  if (!existsSync(script)) {
    throw new Error(`${script}: ワークスペースの並べ替えスクリプトが見つかりません。`);
  }

  const result = spawnSync(process.execPath, [script, "--fix"], {
    cwd: ROOT,
    stdio: "inherit",
  });

  if (result.error !== undefined) {
    throw new Error(`workspaces の並べ替えを実行できませんでした。${result.error.message}`, {
      cause: result.error,
    });
  }

  if (result.status !== 0) {
    throw new Error(
      `workspaces の並べ替えが失敗しました（終了コード: ${result.status ?? "不明"}）。`,
    );
  }
}

/**
 * 初期化内容をファイルに反映します。
 *
 * 前半の検証フェーズでは一切書き込まず、前提のすべてを確認します。
 * 検証失敗時は ValidationError を投げ、再実行可能な状態を保ちます。
 * 後半の実行フェーズでテンプレートの移動・パッケージの複製・書き換えを行います。
 * 各パッケージの homepage・repository.url・repository.directory は検証フェーズでテンプレート前提を確認済みのため、実行フェーズで無条件に上書きします。
 *
 * @param {import("./collect-config.mjs").InitConfig} config 初期化内容です。
 */
function applyConfig(config) {
  validateApplyConfig(config);

  const dirs = config.packages.map((plan) => plan.dir);
  const siteUrl = `https://${config.owner}.github.io/${config.repo}`;
  const siteUrlWithSlash = `${siteUrl}/`;
  const repoUrl = `https://github.com/${config.owner}/${config.repo}`;

  // テンプレートは初期化後も mise create で使えるよう、scripts/templates に残します。
  // scripts/init・scripts/create と同様に Git の管理対象へ含め、fresh clone でも追加できる状態にします。
  moveTemplatesToScripts();

  copySelectedTemplates(config.packages);

  updateJsonFile(join(ROOT, "package.json"), (data) => {
    data.name = `${config.slug}-monorepo`;
    data.workspaces = [...dirs, "website"];
  });

  // 検証フェーズと同一の判定（BOM・前方空白を許容）で再検査します。
  // packages のフロー配列は 1 行・複数行のどちらでも置換でき、CRLF・LF も維持します。
  replacePnpmWorkspacePackages([...dirs, "website"]);

  for (const item of collectStaticReplacements(config)) {
    replaceOrThrow(item.path, item.from, item.to, item.expected);
  }

  removeTemplateOnlySection(join(ROOT, "README.md"));
  ensureScriptsTestGitignore(join(ROOT, ".gitignore"));

  const blumePath = join(ROOT, "website", "blume.config.ts");
  let blumeProjectFrom;

  try {
    blumeProjectFrom = resolveBlumeProjectFrom();
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);

    throw new Error(detail, { cause: error });
  }

  const blumeVar = blumeProjectFrom === BLUME_PROJECT_KEY_TYPO ? "PROJET_NAME" : "PROJECT_NAME";
  replaceOrThrow(
    blumePath,
    blumeProjectFrom,
    `const ${blumeVar} = ${JSON.stringify(config.project)};`,
  );

  for (const plan of config.packages) {
    const pkgDir = join(ROOT, plan.dir);
    const pkgPath = join(pkgDir, "package.json");
    updateJsonFile(pkgPath, (data) => {
      data.name = plan.name;
      data.homepage = siteUrlWithSlash;
      const repository = data.repository;

      if (typeof repository !== "object" || repository === null || Array.isArray(repository)) {
        throw new Error(`${pkgPath}: repository がオブジェクトではありません。`);
      }

      repository.url = repoUrl;
      repository.directory = plan.dir;
    });

    const readmePath = join(pkgDir, "README.md");
    const currentTitle = readFileSync(readmePath, "utf8").split(/\r?\n/u)[0];

    if (currentTitle === undefined || currentTitle.trim() === "") {
      throw new Error(`${readmePath}: 1行目が空のためタイトルを置換できません。`);
    }

    replaceOrThrow(readmePath, currentTitle, `# ${plan.name}`);
    replaceOrThrow(readmePath, TEMPLATE_SITE_URL, siteUrlWithSlash);
    replaceOrThrow(
      join(pkgDir, "LICENSE"),
      TEMPLATE_COPYRIGHT,
      `Copyright (c) 2026-present, ${config.owner}`,
    );
  }

  sortWorkspaces();
  const sortedRootPackage = readJsonFile(join(ROOT, "package.json"));
  const sortedWorkspaces = sortedRootPackage.workspaces;

  if (!Array.isArray(sortedWorkspaces) || sortedWorkspaces.some((dir) => typeof dir !== "string")) {
    throw new Error(`${join(ROOT, "package.json")}: workspaces が文字列の配列ではありません。`);
  }

  replacePnpmWorkspacePackages(sortedWorkspaces);
  updateCodeWorkspace(config);
}

export { applyConfig };
