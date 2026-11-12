import { spawnSync } from "node:child_process";
import { cpSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, basename } from "node:path";

import { readJsonFile, updateJsonFile } from "../../lib/file-io.mjs";
import {
  ROOT,
  TEMPLATE_SITE_URL,
  TEMPLATE_COPYRIGHT,
  TEMPLATE_SOURCE_ROOT,
  formatPnpmWorkspacePackages,
  TEMPLATE_PACKAGE_GENERATED_DIRS,
} from "../../lib/template-constants.mjs";
import { replaceOrThrow } from "../../lib/text-replacements.mjs";
import { updateCodeWorkspaceEntries } from "./code-workspace-entries.mjs";
import { validateCreateConfig } from "./create-preflight-validation.mjs";

/**
 * pnpm-workspace.yaml の内容です。
 *
 * @typedef {object} PnpmWorkspace
 *
 * @property {string} path ファイルのパスです。
 * @property {string} bom BOM（存在する場合）です。
 * @property {string} body BOM を除いた内容です。
 */

/**
 * pnpm-workspace.yaml を読み取ります。
 *
 * @returns {PnpmWorkspace} BOM と本文です。
 */
function readPnpmWorkspace() {
  const path = join(ROOT, "pnpm-workspace.yaml");
  const raw = readFileSync(path, "utf8");
  const bom = raw.startsWith("\uFEFF") ? "\uFEFF" : "";

  return {
    bom,
    body: bom === "" ? raw : raw.slice(1),
    path,
  };
}

/**
 * pnpm-workspace.yaml の packages フロー配列を置き換えます。
 *
 * BOM と既存の改行コードは維持し、init と同じ oxfmt 準拠の整形に揃えます。
 *
 * @param {string[]} dirs packages に設定するディレクトリーです。
 */
function writePnpmWorkspacePackages(dirs) {
  const workspace = readPnpmWorkspace();
  const pattern = /^packages:[ \t\r\n]*\[[\s\S]*?\]/mu;

  if (!pattern.test(workspace.body)) {
    throw new Error(
      `${workspace.path}: packages の一覧が見つかりません（期待値: "packages:" に続くフロー配列）。`,
    );
  }

  const packages = formatPnpmWorkspacePackages(dirs);
  writeFileSync(workspace.path, workspace.bom + workspace.body.replace(pattern, () => packages));
}

/**
 * 選択されたテンプレートを scripts/templates から packages に複製します。
 *
 * 生成物ディレクトリーは複製対象から除外します。
 * 検証済みですが、実行順序に備えて複製元・配置先の存在を再検査します。
 *
 * @param {import("../../lib/template-constants.mjs").PackagePlan[]} plans パッケージの配置計画です。
 */
function copyTemplates(plans) {
  for (const plan of plans) {
    const from = join(ROOT, TEMPLATE_SOURCE_ROOT, plan.kind);

    if (!existsSync(join(from, "package.json"))) {
      throw new Error(
        `${from}: 複製元のテンプレートが見つかりません。mise init を先に実行してください。`,
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
 * 新しいパッケージの package.json・README・LICENSE を既存プロジェクトに合わせます。
 *
 * @param {import("./collect-create-config.mjs").CreateConfig} config パッケージ追加の設定です。
 */
function customizePackages(config) {
  for (const plan of config.packages) {
    const pkgDir = join(ROOT, plan.dir);
    const pkgPath = join(pkgDir, "package.json");
    updateJsonFile(pkgPath, (data) => {
      data.name = plan.name;
      data.homepage = config.homepage;
      const repository = data.repository;

      if (typeof repository !== "object" || repository === null || Array.isArray(repository)) {
        throw new Error(`${pkgPath}: repository がオブジェクトではありません。`);
      }

      repository.url = config.repositoryUrl;
      repository.directory = plan.dir;
    });

    const readmePath = join(pkgDir, "README.md");
    const currentTitle = readFileSync(readmePath, "utf8").split(/\r?\n/u)[0];

    if (currentTitle === undefined || currentTitle.trim() === "") {
      throw new Error(`${readmePath}: 1行目が空のためタイトルを置換できません。`);
    }

    replaceOrThrow(readmePath, currentTitle, `# ${plan.name}`);
    replaceOrThrow(readmePath, TEMPLATE_SITE_URL, config.homepage);
    replaceOrThrow(
      join(pkgDir, "LICENSE"),
      TEMPLATE_COPYRIGHT,
      `Copyright (c) 2026-present, ${config.owner}`,
    );
  }
}

/**
 * ルート package.json の workspaces に新しいパッケージを追加します。
 *
 * 既存の順序を保ち、新しいディレクトリーを website の直前に挿入します。
 *
 * @param {string[]} dirs 追加するディレクトリーです。
 *
 * @returns {string[]} 更新後の workspaces です。
 */
function updateRootWorkspaces(dirs) {
  const rootPkg = readJsonFile(join(ROOT, "package.json"));

  if (!Array.isArray(rootPkg.workspaces)) {
    throw new TypeError(`${join(ROOT, "package.json")}: workspaces が配列ではありません。`);
  }

  const hadWebsite = rootPkg.workspaces.includes("website");
  const next = [
    ...rootPkg.workspaces.filter((workspace) => workspace !== "website"),
    ...dirs,
    ...(hadWebsite ? ["website"] : []),
  ];
  updateJsonFile(join(ROOT, "package.json"), (data) => {
    data.workspaces = next;
  });

  return next;
}

/**
 * `scripts/sort-workspaces.mjs --fix` を実行して workspaces をトポロジカル順に並べます。
 *
 * 失敗した場合は警告だけ出し、パッケージ追加そのものは成功扱いにします。
 *
 * @returns {boolean} 並べ替えに成功した場合は true です。
 */
function sortRootWorkspaces() {
  const script = join(ROOT, "scripts", "sort-workspaces.mjs");

  if (!existsSync(script)) {
    console.warn(
      `${script}: ワークスペースの並べ替えスクリプトが見つかりません。workspaces は現在の順序のままにします。`,
    );

    return false;
  }

  const result = spawnSync(process.execPath, [script, "--fix"], {
    cwd: ROOT,
    stdio: "inherit",
  });

  if (result.error !== undefined) {
    console.warn(`workspaces の並べ替えを実行できませんでした。${result.error.message}`);

    return false;
  }

  if (result.status !== 0) {
    console.warn(
      `workspaces の並べ替えが失敗しました（終了コード: ${result.status ?? "不明"}）。workspaces は現在の順序のままにします。`,
    );

    return false;
  }

  return true;
}

/** 並べ替え後のルート workspaces を pnpm-workspace.yaml に反映します。 */
function syncPnpmWorkspaceWithRoot() {
  const rootPkg = readJsonFile(join(ROOT, "package.json"));

  if (!Array.isArray(rootPkg.workspaces)) {
    throw new TypeError(`${join(ROOT, "package.json")}: workspaces が配列ではありません。`);
  }

  writePnpmWorkspacePackages(rootPkg.workspaces);
}

/**
 * パッケージ追加の内容をファイルに反映します。
 *
 * 先にすべての前提を検証し、検証失敗時は一切書き込みません。
 * テンプレートの複製・パッケージ設定の書き換え・workspaces・VS Code ワークスペースを更新します。
 * CI のテスト matrix は package.json から動的に生成するため、ここでは更新しません。
 *
 * @param {import("./collect-create-config.mjs").CreateConfig} config パッケージ追加の設定です。
 */
function applyCreate(config) {
  validateCreateConfig(config);

  const dirs = config.packages.map((plan) => plan.dir);

  copyTemplates(config.packages);
  customizePackages(config);

  const workspaces = updateRootWorkspaces(dirs);
  writePnpmWorkspacePackages(workspaces);

  if (sortRootWorkspaces()) {
    syncPnpmWorkspaceWithRoot();
  }

  updateCodeWorkspaceEntries(
    join(ROOT, config.workspacePath),
    config.packages.map((plan) => ({
      name: plan.dir.slice(plan.dir.lastIndexOf("/") + 1),
      path: plan.dir,
    })),
  );
}

export { applyCreate };
