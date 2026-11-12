import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

import { readJsonFile, readPackageReadmeTitle } from "../../lib/file-io.mjs";
import {
  ROOT,
  TEMPLATE_HOMEPAGE,
  TEMPLATE_PACKAGES,
  TEMPLATE_REPO_URL,
  TEMPLATE_SITE_URL,
  TEMPLATE_COPYRIGHT,
  TEMPLATE_PACKAGE_DIRS,
  PACKAGE_KIND_CANDIDATES,
  TEMPLATE_EXPECTED_WORKSPACES,
  TEMPLATE_WORKSPACE_FILE_NAME,
} from "../../lib/template-constants.mjs";
import { assertReplacementCount } from "../../lib/text-replacements.mjs";
import { ValidationError } from "../../lib/validation-error.mjs";
import {
  sameStringSet,
  ensureInsideRoot,
  readWorkspacePackageNames,
  parsePnpmWorkspacePackages,
} from "../../lib/workspace-checks.mjs";
import { assertScriptsTestGitignore } from "./gitignore.mjs";
import { resolveBlumeProjectFrom, collectStaticReplacements } from "./static-replacements.mjs";
import { assertTemplateOnlySection } from "./template-docs.mjs";
import { validateCodeWorkspaceEntry } from "./vscode-workspace.mjs";

/**
 * 配置計画の空検査・重複検査・複製元と配置先の確認を行います。一切書き込みません。
 *
 * @param {import("./collect-config.mjs").InitConfig} config 初期化内容です。
 */
function assertPackagePlans(config) {
  if (config.packages.length === 0) {
    throw new ValidationError(
      `--packages には1つ以上の種類を指定してください。候補は ${PACKAGE_KIND_CANDIDATES} です。`,
    );
  }

  const removableDirs = TEMPLATE_PACKAGE_DIRS;

  // plan 間の名前・配置先重複を再検査します（収集時以降の改変に備える二重防御）。
  const seenNames = new Set();
  const seenDirs = new Set();

  for (const plan of config.packages) {
    if (seenNames.has(plan.name)) {
      throw new ValidationError(
        `パッケージ名 ${plan.name} が重複しています。別の名前にしてください。`,
      );
    }

    seenNames.add(plan.name);
    if (seenDirs.has(plan.dir)) {
      throw new ValidationError(`配置先 ${plan.dir} が重複しています。別の名前にしてください。`);
    }

    seenDirs.add(plan.dir);
  }

  // 既存ワークスペースとの名前衝突を再検査します（収集時以降の追加に備えます）。
  const existingNames = readWorkspacePackageNames({ excludeTemplateDirs: true });

  for (const plan of config.packages) {
    if (existingNames.includes(plan.name)) {
      throw new ValidationError(
        `パッケージ名 ${plan.name} は既存のワークスペースと重複しています。別の名前にしてください。`,
      );
    }
  }

  for (const plan of config.packages) {
    ensureInsideRoot(plan.dir);
    const from = join(ROOT, "packages", plan.kind);

    if (!existsSync(from)) {
      throw new ValidationError(
        `${from}: 複製元のテンプレートが見つかりません。既に初期化済みか、構成が変わっている可能性があります。`,
      );
    }

    const to = join(ROOT, plan.dir);

    if (existsSync(to) && resolve(to) !== resolve(from) && !removableDirs.includes(plan.dir)) {
      throw new ValidationError(`${plan.dir}: 配置先は既に存在します。別の名前にしてください。`);
    }
  }
}

/**
 * code-workspace の複製元と新しいファイル名の前提を確認します。一切書き込みません。
 *
 * @param {import("./collect-config.mjs").InitConfig} config 初期化内容です。
 */
function assertWorkspaceFile(config) {
  ensureInsideRoot(`${config.slug}.code-workspace`);
  const oldWorkspacePath = join(ROOT, TEMPLATE_WORKSPACE_FILE_NAME);

  if (!existsSync(oldWorkspacePath)) {
    throw new ValidationError(
      `${oldWorkspacePath}: ワークスペース定義が見つかりません。既に初期化済みの可能性があります。`,
    );
  }

  const newWorkspacePath = join(ROOT, `${config.slug}.code-workspace`);

  if (existsSync(newWorkspacePath) && resolve(newWorkspacePath) !== resolve(oldWorkspacePath)) {
    throw new ValidationError(`${newWorkspacePath} は既に存在します。別のスラグ名にしてください。`);
  }
}

/**
 * ルートの workspaces と pnpm-workspace.yaml の packages がテンプレート初期値と集合一致することを確認します。一切書き込みません。
 *
 * extra の黙殺を防ぐため、順序は問わず集合として比較します。
 */
function assertWorkspaceDefinitions() {
  const rootPkg = readJsonFile(join(ROOT, "package.json"));

  if (!Array.isArray(rootPkg.workspaces)) {
    throw new ValidationError(`${join(ROOT, "package.json")}: workspaces が配列ではありません。`);
  }

  for (const entry of rootPkg.workspaces) {
    if (typeof entry !== "string") {
      throw new ValidationError(
        `${join(ROOT, "package.json")}: workspaces に文字列でない要素があります。明示的なディレクトリーを指定してください（glob 非対応）。`,
      );
    }

    if (/[*?[\]{}!]/u.test(entry)) {
      throw new ValidationError(
        `${join(ROOT, "package.json")}: workspaces の glob パターン ${JSON.stringify(entry)} には対応していません。明示的なディレクトリーを指定してください。`,
      );
    }
  }

  if (!sameStringSet(rootPkg.workspaces, TEMPLATE_EXPECTED_WORKSPACES)) {
    throw new ValidationError(
      `${join(ROOT, "package.json")}: workspaces がテンプレート初期値と一致しません（現在: ${JSON.stringify(rootPkg.workspaces)}、期待値: ${JSON.stringify([...TEMPLATE_EXPECTED_WORKSPACES])} 順序不問）。extra は黙って削除されるため、事前に手動で整理してください。`,
    );
  }

  const workspaceYamlPath = join(ROOT, "pnpm-workspace.yaml");
  let workspaceYaml = "";

  try {
    workspaceYaml = readFileSync(workspaceYamlPath, "utf8");
  } catch (error) {
    throw new ValidationError(
      `${workspaceYamlPath}: ファイルを読み取れません。${error instanceof Error ? error.message : String(error)}`,
    );
  }

  const workspaceYamlBody = workspaceYaml.replace(/^\uFEFF/u, "");

  if (!/^packages:[ \t\r\n]*\[/mu.test(workspaceYamlBody)) {
    throw new ValidationError(
      `${workspaceYamlPath}: packages の一覧が見つかりません（期待値: "packages:" に続くフロー配列）。`,
    );
  }

  const yamlEntries = parsePnpmWorkspacePackages(workspaceYamlBody);

  if (!sameStringSet(yamlEntries, TEMPLATE_EXPECTED_WORKSPACES)) {
    throw new ValidationError(
      `${workspaceYamlPath}: packages の一覧がテンプレート初期値と一致しません（現在: ${JSON.stringify(yamlEntries)}、期待値: ${JSON.stringify([...TEMPLATE_EXPECTED_WORKSPACES])} 順序不問）。extra は黙って上書きされるため、事前に手動で整理してください。`,
    );
  }
}

/**
 * 固定前提の文字列置換が期待件数だけ存在することを確認します。一切書き込みません。
 *
 * @param {import("./collect-config.mjs").InitConfig} config 初期化内容です。
 */
function assertStaticReplacements(config) {
  for (const item of collectStaticReplacements(config)) {
    assertReplacementCount(item);
  }

  resolveBlumeProjectFrom();
  assertTemplateOnlySection(join(ROOT, "README.md"));
  assertScriptsTestGitignore(join(ROOT, ".gitignore"));
}

/**
 * 選択されたテンプレートの package.json と README・LICENSE の前提を確認します。一切書き込みません。
 *
 * @param {import("../../lib/template-constants.mjs").PackagePlan[]} plans パッケージの配置計画です。
 */
function assertSelectedPackageTemplates(plans) {
  for (const plan of plans) {
    const sourcePkgPath = join(ROOT, "packages", plan.kind, "package.json");
    const data = readJsonFile(sourcePkgPath);
    const homepage = data.homepage;

    if (homepage !== TEMPLATE_HOMEPAGE) {
      throw new ValidationError(
        `${sourcePkgPath}: homepage が ${JSON.stringify(homepage)} です（期待値: ${JSON.stringify(TEMPLATE_HOMEPAGE)}）。テンプレート構成が変わっている可能性があります。`,
      );
    }

    const repository = data.repository;

    if (typeof repository !== "object" || repository === null || Array.isArray(repository)) {
      throw new ValidationError(
        `${sourcePkgPath}: repository がオブジェクトではありません。テンプレート構成が変わっている可能性があります。`,
      );
    }

    if (repository.url !== TEMPLATE_REPO_URL) {
      throw new ValidationError(
        `${sourcePkgPath}: repository.url が ${JSON.stringify(repository.url)} です（期待値: ${JSON.stringify(TEMPLATE_REPO_URL)}）。テンプレート構成が変わっている可能性があります。`,
      );
    }

    if (repository.directory !== `packages/${plan.kind}`) {
      throw new ValidationError(
        `${sourcePkgPath}: repository.directory が ${JSON.stringify(repository.directory)} です（期待値: ${JSON.stringify(`packages/${plan.kind}`)}）。テンプレート構成が変わっている可能性があります。`,
      );
    }

    const readmeTitle = readPackageReadmeTitle(`packages/${plan.kind}`);
    assertReplacementCount({
      from: readmeTitle,
      path: join(ROOT, "packages", plan.kind, "README.md"),
      expected: 1,
    });

    assertReplacementCount({
      from: TEMPLATE_SITE_URL,
      path: join(ROOT, "packages", plan.kind, "README.md"),
      expected: 1,
    });
    assertReplacementCount({
      from: TEMPLATE_COPYRIGHT,
      path: join(ROOT, "packages", plan.kind, "LICENSE"),
      expected: 1,
    });
  }
}

/**
 * テンプレートの保持先がまだ存在しないことを確認します。一切書き込みません。
 *
 * 既に初期化済みのリポジトリーで再実行すると、選択済みパッケージをテンプレートと誤認して上書きする恐れがあるため、早期に拒否します。
 */
function assertTemplateDestination() {
  const destination = join(ROOT, "scripts", "templates");

  if (existsSync(destination)) {
    throw new ValidationError(
      `${destination}: テンプレートの保持先が既に存在します。既に初期化済みか、別の用途で使用されています。`,
    );
  }
}

/**
 * 初期化内容の適用前提をすべて検証します。一切書き込みません。
 *
 * 移動・配置より前に、packages 空検査・plan 間の名前・配置先重複の再検査・複製元の存在・配置先の空き・JSON の形状・全置換の件数・正規表現の一致・新ワークスペース名の未使用を確認します。
 * ルート workspaces と pnpm-workspace.yaml の packages はテンプレート初期値と集合一致が必要で、不一致（extra 追加等）は黙って上書きされるのを防ぐため ValidationError とします。
 * 各パッケージの package.json の homepage・repository.url・repository.directory はテンプレート前提と一致することを確認し、実行フェーズの無条件上書きが前提どおりであることを保証します。
 * code-workspace の項目は選択・未選択にかかわらず全テンプレート分がちょうど 1 件ずつあることを検証し、未選択の欠落・重複による実行フェーズの部分状態を防ぎます。
 * パッケージ README のタイトル行（1 行目）がちょうど 1 件であることも検証し、実行フェーズの replaceOrThrow(expected=1) が部分状態なく成功することを保証します。
 * 同じ種類が複数選択されていても、種類ごとの複製元は 1 つであるため各検証は種類単位で足ります。
 * 失敗時は ValidationError を投げ、再実行可能な状態を保ちます。
 *
 * @param {import("./collect-config.mjs").InitConfig} config 初期化内容です。
 */
function validateApplyConfig(config) {
  assertTemplateDestination();
  assertPackagePlans(config);

  assertWorkspaceFile(config);
  assertWorkspaceDefinitions();
  assertStaticReplacements(config);
  assertSelectedPackageTemplates(config.packages);
  for (const pkg of TEMPLATE_PACKAGES) {
    validateCodeWorkspaceEntry(pkg.kind);
  }
}

export { validateApplyConfig };
