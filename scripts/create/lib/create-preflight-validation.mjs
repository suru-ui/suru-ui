import { constants, accessSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { readJsonFile, readPackageReadmeTitle } from "../../lib/file-io.mjs";
import { validatePackageName } from "../../lib/input-validators.mjs";
import {
  ROOT,
  TEMPLATE_SITE_URL,
  TEMPLATE_COPYRIGHT,
  TEMPLATE_SOURCE_ROOT,
} from "../../lib/template-constants.mjs";
import { assertReplacementCount } from "../../lib/text-replacements.mjs";
import { ValidationError } from "../../lib/validation-error.mjs";
import {
  sameStringSet,
  findPlanProblem,
  ensureInsideRoot,
  readWorkspacePackageNames,
  parsePnpmWorkspacePackages,
} from "../../lib/workspace-checks.mjs";
import {
  validateCodeWorkspaceFile,
  appendCodeWorkspaceEntries,
} from "./code-workspace-entries.mjs";

/**
 * ファイルに書き込めることを確認します。
 *
 * @param {string} path 対象ファイルのパスです。
 * @param {string} label 表示用の名前です。
 */
function assertWritable(path, label) {
  try {
    accessSync(path, constants.W_OK);
  } catch (error) {
    throw new ValidationError(
      `${path}: ${label}に書き込めません。${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

/**
 * 各パッケージの複製元と配置先の前提を確認します。一切書き込みません。
 *
 * @param {import("./collect-create-config.mjs").CreateConfig} config パッケージ追加の設定です。
 */
function assertPackagePlans(config) {
  if (config.packages.length === 0) {
    throw new ValidationError(
      "追加するパッケージがありません。--packages で 1 つ以上指定してください。",
    );
  }

  const existingNames = readWorkspacePackageNames();
  const accepted = [];

  for (const plan of config.packages) {
    const nameError = validatePackageName(plan.name);

    if (nameError !== undefined) {
      throw new ValidationError(`パッケージ（${plan.kind}）の名前が不正です。${nameError}`);
    }

    const problem = findPlanProblem(accepted, existingNames, [], plan.kind, plan.name, plan.dir);

    if (problem !== undefined) {
      throw new ValidationError(problem);
    }

    ensureInsideRoot(plan.dir);

    // findPlanProblem は init の移動元（packages/<kind>）を例外扱いするため、配置先の存在は別途確認します。
    if (existsSync(join(ROOT, plan.dir))) {
      throw new ValidationError(`配置先 ${plan.dir} は既に存在します。別の名前にしてください。`);
    }

    const sourceDir = join(ROOT, TEMPLATE_SOURCE_ROOT, plan.kind);
    const sourcePkgPath = join(sourceDir, "package.json");

    if (!existsSync(sourcePkgPath)) {
      throw new ValidationError(
        `${sourcePkgPath}: テンプレートの package.json が見つかりません。先に mise init を実行してください。`,
      );
    }

    const sourcePkg = readJsonFile(sourcePkgPath);
    const repository = sourcePkg.repository;

    if (typeof repository !== "object" || repository === null || Array.isArray(repository)) {
      throw new ValidationError(
        `${sourcePkgPath}: repository がオブジェクトではありません。テンプレート構成が変わっている可能性があります。`,
      );
    }

    const readmePath = join(sourceDir, "README.md");
    const readmeTitle = readPackageReadmeTitle(`${TEMPLATE_SOURCE_ROOT}/${plan.kind}`);
    assertReplacementCount({
      from: readmeTitle,
      path: readmePath,
      expected: 1,
    });
    assertReplacementCount({
      from: TEMPLATE_SITE_URL,
      path: readmePath,
      expected: 1,
    });

    assertReplacementCount({
      from: TEMPLATE_COPYRIGHT,
      path: join(sourceDir, "LICENSE"),
      expected: 1,
    });

    accepted.push(plan);
  }
}

/**
 * ルートの workspaces と pnpm-workspace.yaml を読み取れることを確認します。一切書き込みません。
 *
 * @param {import("./collect-create-config.mjs").CreateConfig} config パッケージ追加の設定です。
 */
function assertWorkspaceDefinitions(config) {
  const rootPkgPath = join(ROOT, "package.json");
  const rootPkg = readJsonFile(rootPkgPath);

  if (!Array.isArray(rootPkg.workspaces)) {
    throw new ValidationError(`${rootPkgPath}: workspaces が配列ではありません。`);
  }

  for (const workspace of rootPkg.workspaces) {
    if (typeof workspace !== "string") {
      throw new ValidationError(
        `${rootPkgPath}: workspaces に文字列でない要素があります。明示的なディレクトリーを指定してください（glob 非対応）。`,
      );
    }
  }

  assertWritable(rootPkgPath, "ルート package.json");

  const yamlPath = join(ROOT, "pnpm-workspace.yaml");
  let yaml;

  try {
    yaml = readFileSync(yamlPath, "utf8");
  } catch (error) {
    throw new ValidationError(
      `${yamlPath}: ファイルを読み取れません。${error instanceof Error ? error.message : String(error)}`,
    );
  }

  const yamlBody = yaml.replace(/^\uFEFF/u, "");

  if (!/^packages:[ \t\r\n]*\[/mu.test(yamlBody)) {
    throw new ValidationError(
      `${yamlPath}: packages の一覧が見つかりません（期待値: "packages:" に続くフロー配列）。`,
    );
  }

  const yamlPackages = parsePnpmWorkspacePackages(yamlBody);

  if (yamlPackages.length === 0) {
    throw new ValidationError(`${yamlPath}: packages の一覧を読み取れません。`);
  }

  if (!sameStringSet(rootPkg.workspaces, yamlPackages)) {
    throw new ValidationError(
      `${yamlPath}: packages の一覧がルート package.json の workspaces と一致しません（workspaces: ${JSON.stringify(rootPkg.workspaces)}、packages: ${JSON.stringify(yamlPackages)} 順序不問）。先に手動で揃えてください。`,
    );
  }

  assertWritable(yamlPath, "pnpm-workspace.yaml");

  if (typeof config.owner !== "string" || config.owner === "") {
    throw new ValidationError(
      "GitHub オーナー名を読み取れません。既存パッケージの設定を確認してください。",
    );
  }

  if (typeof config.homepage !== "string" || config.homepage === "") {
    throw new ValidationError(
      "homepage を読み取れません。既存パッケージの設定を確認してください。",
    );
  }

  if (typeof config.repositoryUrl !== "string" || config.repositoryUrl === "") {
    throw new ValidationError(
      "repository.url を読み取れません。既存パッケージの設定を確認してください。",
    );
  }
}

/**
 * code-workspace の folders 配列を確認します。一切書き込みません。
 *
 * @param {import("./collect-create-config.mjs").CreateConfig} config パッケージ追加の設定です。
 */
function assertUpdateTargets(config) {
  ensureInsideRoot(config.workspacePath);
  const workspaceFile = join(ROOT, config.workspacePath);

  if (!existsSync(workspaceFile)) {
    throw new ValidationError(
      `${workspaceFile}: VS Code ワークスペースのファイルが見つかりません。`,
    );
  }

  validateCodeWorkspaceFile(workspaceFile);
  // 追記処理を書き込みなしで実行し、構造の問題を事前に検出します。
  try {
    appendCodeWorkspaceEntries(
      readFileSync(workspaceFile, "utf8"),
      config.packages.map((plan) => ({
        name: plan.dir.slice(plan.dir.lastIndexOf("/") + 1),
        path: plan.dir,
      })),
    );
  } catch (error) {
    throw new ValidationError(
      `${workspaceFile}: ${error instanceof Error ? error.message : String(error)}`,
    );
  }

  assertWritable(workspaceFile, "VS Code ワークスペース");
}

/**
 * パッケージ追加の適用前提をすべて検証します。一切書き込みません。
 *
 * 失敗時は ValidationError を投げ、再実行可能な状態を保ちます。
 *
 * @param {import("./collect-create-config.mjs").CreateConfig} config パッケージ追加の設定です。
 */
function validateCreateConfig(config) {
  assertPackagePlans(config);
  assertWorkspaceDefinitions(config);
  assertUpdateTargets(config);
}

export { validateCreateConfig };
