import { existsSync } from "node:fs";
import { sep, join, resolve } from "node:path";

import { readJsonFile } from "./file-io.mjs";
import { ROOT, TEMPLATE_PACKAGE_DIRS } from "./template-constants.mjs";
import { ValidationError } from "./validation-error.mjs";

/**
 * テンプレート以外の既存ワークスペースのパッケージ名を読み取ります。
 *
 * 既定ではすべてのワークスペースを読み取ります。初期化前の検査では `excludeTemplateDirs` を指定し、テンプレート由来の配置先（TEMPLATE_PACKAGE_DIRS）に一致するものだけを除外します。
 * ルートの package.json が読めない・解析できない場合はパス付きの例外を投げます。
 * workspaces の非文字列要素や glob パターン（`*?[]{}!` を含む）は対応していないため明示的に ValidationError を投げます（黙って無視しません）。
 * 各ワークスペースの package.json が存在しない場合のみ無視し、それ以外の失敗は readJsonFile のパス付き例外で投げます。
 * glob 形式（例 : `packages/*`）は existsSync では検出できないため、検出時は明示的なディレクトリー指定を求めます。
 *
 * @param {{ excludeTemplateDirs?: boolean }} [options] 読み取りオプションです。
 *
 * @returns {string[]} パッケージ名の一覧です。
 */
function readWorkspacePackageNames(options = {}) {
  const names = [];
  const rootPkg = readJsonFile(join(ROOT, "package.json"));
  const workspaces = Array.isArray(rootPkg.workspaces) ? rootPkg.workspaces : [];

  for (const workspace of workspaces) {
    if (typeof workspace !== "string") {
      throw new ValidationError(
        `${join(ROOT, "package.json")}: workspaces に文字列でない要素があります。明示的なディレクトリーを指定してください（glob 非対応）。`,
      );
    }

    if (/[*?[\]{}!]/u.test(workspace)) {
      throw new ValidationError(
        `${join(ROOT, "package.json")}: workspaces の glob パターン ${JSON.stringify(workspace)} には対応していません。明示的なディレクトリーを指定してください。`,
      );
    }

    if (options.excludeTemplateDirs === true && TEMPLATE_PACKAGE_DIRS.includes(workspace)) {
      continue;
    }

    const pkgPath = join(ROOT, workspace, "package.json");

    if (!existsSync(pkgPath)) {
      continue;
    }

    const pkg = readJsonFile(pkgPath);

    if (typeof pkg.name === "string") {
      names.push(pkg.name);
    }
  }

  return names;
}

/**
 * 配置計画の問題点を確認します。
 *
 * @param {import("./template-constants.mjs").PackagePlan[]} plans これまでに作成した配置計画です。
 * @param {string[]} existingNames 既存ワークスペースのパッケージ名です。
 * @param {string[]} removableDirs 削除されるテンプレートの配置先です。
 * @param {import("./template-constants.mjs").TemplateKind} kind 複製元のテンプレートの種類です。
 * @param {string} name 追加するパッケージ名です。
 * @param {string} dir 追加する配置先です。
 *
 * @returns {string | undefined} 問題がなければ undefined、問題があれば理由です。
 */
function findPlanProblem(plans, existingNames, removableDirs, kind, name, dir) {
  if (plans.some((plan) => plan.name === name)) {
    return `パッケージ名 ${name} が重複しています。別の名前にしてください。`;
  }

  if (existingNames.includes(name)) {
    return `パッケージ名 ${name} は既存のワークスペースと重複しています。別の名前にしてください。`;
  }

  if (plans.some((plan) => plan.dir === dir)) {
    return `配置先 ${dir} が重複しています。別の名前にしてください。`;
  }

  const target = join(ROOT, dir);

  if (
    existsSync(target) &&
    resolve(target) !== resolve(join(ROOT, "packages", kind)) &&
    !removableDirs.includes(dir)
  ) {
    return `配置先 ${dir} は既に存在します。別の名前にしてください。`;
  }
}

/**
 * 2 つの文字列配列が順序を無視して一致するかどうかを判定します。
 *
 * workspaces 定義の順序ゆれを許容しつつ extra の黙殺を検出するために使います。
 *
 * @param {string[]} a 比較する配列です。
 * @param {string[]} b 比較する配列です。
 *
 * @returns {boolean} 集合として一致する場合は true です。
 */
function sameStringSet(a, b) {
  if (a.length !== b.length) {
    return false;
  }

  const sortedA = a.toSorted();
  const sortedB = b.toSorted();

  return sortedA.every((value, index) => value === sortedB[index]);
}

/**
 * pnpm-workspace.yaml から packages の項目を抽出します。
 *
 * テンプレートは `packages: ["a", "b"]` の 1 行形式ですが、フォーマッターによって複数行のフロー形式に整形される場合にも対応します。
 * 二重引用符・単一引用符のどちらで囲まれた項目も抽出します。
 *
 * @param {string} content pnpm-workspace.yaml の内容です。
 *
 * @returns {string[]} 抽出したディレクトリーの一覧です。形式が異なる場合は空配列を返します。
 */
function parsePnpmWorkspacePackages(content) {
  const normalized = content.replace(/^\uFEFF/u, "");
  const match = /^packages:[ \t]*/mu.exec(normalized);

  if (match === null) {
    return [];
  }

  const rest = normalized.slice(match.index + match[0].length);
  const flowStart = rest.search(/[^ \t\r\n]/u);

  if (flowStart < 0 || rest[flowStart] !== "[") {
    return [];
  }

  const flowEnd = rest.indexOf("]", flowStart);

  if (flowEnd < 0) {
    return [];
  }

  const entries = [];
  const pattern = /"(?<double>[^"]*)"|'(?<single>[^']*)'/gu;
  const flow = rest.slice(flowStart, flowEnd + 1);
  let entry;

  while ((entry = pattern.exec(flow)) !== null) {
    entries.push(entry.groups?.double ?? entry.groups?.single ?? "");
  }

  return entries;
}

/**
 * 相対パスがリポジトリールート配下に収まることを確認します。
 *
 * バリデーションで `/` 等を拒否している前提に加えた二重防御です。
 *
 * @param {string} relativePath リポジトリールートからの相対パスです。
 */
function ensureInsideRoot(relativePath) {
  const resolved = resolve(ROOT, relativePath);

  if (resolved !== ROOT && !resolved.startsWith(`${ROOT}${sep}`)) {
    throw new ValidationError(
      `${relativePath}: リポジトリー外を指しています。別の名前にしてください。`,
    );
  }
}

export {
  sameStringSet,
  findPlanProblem,
  ensureInsideRoot,
  readWorkspacePackageNames,
  parsePnpmWorkspacePackages,
};
