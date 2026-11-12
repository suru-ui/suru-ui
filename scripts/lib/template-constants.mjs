import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * このスクリプトが配置されているリポジトリーのルートディレクトリーです。
 *
 * `scripts/lib/template-constants.mjs` から 2 階層上を指します。
 */
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");

/** 初期化後もパッケージ追加用に保持するテンプレートの配置先です。 */
const TEMPLATE_SOURCE_ROOT = "scripts/templates";

/**
 * テンプレートに同梱されているパッケージの種類です。
 *
 * @typedef {"server-client" | "server-client-react" | "client" | "client-react" | "server"} TemplateKind
 */

/**
 * テンプレートパッケージの案内情報です。
 *
 * @typedef {object} TemplatePackage
 *
 * @property {TemplateKind} kind パッケージの種類です。
 * @property {string} title 選択肢に表示する名前です。
 * @property {string} description 選択肢に表示する説明です。
 */

/**
 * 追加するパッケージ 1 件分の計画です。
 *
 * @typedef {object} PackagePlan
 *
 * @property {TemplateKind} kind 元になったテンプレートの種類です。
 * @property {string} name 新しいパッケージ名です。
 * @property {string} dir リポジトリールートからの新しい配置先です。
 */

/**
 * テンプレートに同梱されているパッケージの一覧です。
 *
 * @type {TemplatePackage[]}
 */
const TEMPLATE_PACKAGES = [
  {
    kind: "server-client",
    title: "両対応",
    description: "サーバーとクライアントの両方で動作するパッケージです。",
  },
  {
    kind: "server-client-react",
    title: "両対応（React）",
    description: "React を使い、サーバーとクライアントの両方で動作するパッケージです。",
  },
  {
    kind: "client",
    title: "クライアントのみ",
    description: "ブラウザーでのみ動作するパッケージです。",
  },
  {
    kind: "client-react",
    title: "クライアントのみ（React）",
    description: "React を使い、ブラウザーでのみ動作するパッケージです。",
  },
  {
    kind: "server",
    title: "サーバーのみ",
    description: "Node.js でのみ動作するパッケージです。",
  },
];

/** テンプレート固有の置換前提です。実ファイルの内容と一致させ、テンプレート構成が変わったら件数検証で検出できるよう定数化しています。 */
const TEMPLATE_PROJECT_NAME = "ts-template";
const TEMPLATE_OWNER_NAME = "tai-kun";
const TEMPLATE_SITE_URL = `https://${TEMPLATE_OWNER_NAME}.github.io/${TEMPLATE_PROJECT_NAME}/`;

/**
 * テンプレート初期状態の各パッケージの homepage 前提です。
 * 実ファイルの値と一致させ、検証フェーズで無条件上書きの前提を確認します。
 */
const TEMPLATE_HOMEPAGE = `https://${TEMPLATE_OWNER_NAME}.github.io/${TEMPLATE_PROJECT_NAME}/`;

/**
 * テンプレート初期状態の各パッケージの repository.url 前提です。
 * homepage と同様に検証フェーズで確認し、実行フェーズで無条件に上書きします。
 */
const TEMPLATE_REPO_URL = `https://github.com/${TEMPLATE_OWNER_NAME}/${TEMPLATE_PROJECT_NAME}`;
const TEMPLATE_COPYRIGHT = `Copyright (c) 2026-present, ${TEMPLATE_OWNER_NAME}`;
const TEMPLATE_WORKSPACE_FILE_NAME = `${TEMPLATE_PROJECT_NAME}.code-workspace`;

/** テンプレート初期状態のパッケージディレクトリーです。TEMPLATE_PACKAGES と同順です。 */
const TEMPLATE_PACKAGE_DIRS = TEMPLATE_PACKAGES.map((pkg) => `packages/${pkg.kind}`);

/**
 * テンプレート初期状態の workspaces 前提です。順序は問いませんが集合として一致が必要です。
 * extra の黙殺（黙って削除）を防ぐため、検証フェーズで package.json と pnpm-workspace.yaml の両方がこの集合と一致することを確認します。テンプレート構成が変わったら更新が必要です。
 */
const TEMPLATE_EXPECTED_WORKSPACES = [...TEMPLATE_PACKAGE_DIRS, "website"];

/** テンプレートの複製時に除外する生成物ディレクトリーです。 */
const TEMPLATE_PACKAGE_GENERATED_DIRS = [".history", "coverage", "dist", "node_modules"];

/** blume.config.ts のプロジェクト名定義の前提です。`PROJET` はテンプレート由来の綴りであり、将来 `PROJECT` に修正されても両対応できるよう 2 件定義しています。 */
const BLUME_PROJECT_KEY_TYPO = `const PROJET_NAME = "${TEMPLATE_PROJECT_NAME}";`;
const BLUME_PROJECT_KEY_FIXED = `const PROJECT_NAME = "${TEMPLATE_PROJECT_NAME}";`;
const BLUME_REPO_KEY = `const GITHUB_REPO = "${TEMPLATE_PROJECT_NAME}";`;
const BLUME_OWNER_KEY = `const GITHUB_OWNER = "${TEMPLATE_OWNER_NAME}";`;

/** `--packages` の候補表示用です。 */
const PACKAGE_KIND_CANDIDATES = TEMPLATE_PACKAGES.map((pkg) => pkg.kind).join("、");

/**
 * パッケージ名から配置ディレクトリーを求めます。
 *
 * スコープ付き名（`@scope/name`）の場合はスコープ部分を除き、名前部分だけを使います。
 *
 * @param {string} name パッケージ名です。
 *
 * @returns {string} `packages/<名前>` 形式の配置先です。
 */
function dirForPackageName(name) {
  const base = name.includes("/") ? name.slice(name.lastIndexOf("/") + 1) : name;

  return `packages/${base}`;
}

/**
 * pnpm-workspace.yaml の packages 項目を整形します。
 *
 * 1 行が printWidth（100 文字）に収まる場合は 1 行のフロー配列にし、収まらない場合はテンプレート初期値と同じ複数行のフロー配列にします。
 * oxfmt の出力と一致させ、初期化直後に `vp check` が成功するようにします。
 *
 * @param {string[]} dirs packages に設定するディレクトリーです。
 *
 * @returns {string} 整形済みの packages 項目です。
 */
function formatPnpmWorkspacePackages(dirs) {
  const single = `packages: [${dirs.map((dir) => JSON.stringify(dir)).join(", ")}]`;

  if (single.length <= 100) {
    return single;
  }

  return `packages:\n  [\n${dirs.map((dir) => `    ${JSON.stringify(dir)},`).join("\n")}\n  ]`;
}

/**
 * テンプレートの種類から保持用の配置先を求めます。
 *
 * @param {TemplateKind} kind テンプレートの種類です。
 *
 * @returns {string} `scripts/templates/<kind>` 形式の配置先です。
 */
function templateSourceDir(kind) {
  return `${TEMPLATE_SOURCE_ROOT}/${kind}`;
}

/**
 * 種類とスコープから既定のパッケージ名を作ります。
 *
 * @param {TemplateKind} kind テンプレートの種類です。
 * @param {string} scope `@` 付きのスコープ、またはスコープなしの場合は空文字列です。
 *
 * @returns {string} 既定のパッケージ名です。
 */
function defaultPackageName(kind, scope) {
  return scope === "" ? kind : `${scope}/${kind}`;
}

export {
  ROOT,
  BLUME_REPO_KEY,
  BLUME_OWNER_KEY,
  dirForPackageName,
  TEMPLATE_HOMEPAGE,
  TEMPLATE_PACKAGES,
  TEMPLATE_REPO_URL,
  TEMPLATE_SITE_URL,
  templateSourceDir,
  defaultPackageName,
  TEMPLATE_COPYRIGHT,
  TEMPLATE_SOURCE_ROOT,
  TEMPLATE_PACKAGE_DIRS,
  TEMPLATE_PROJECT_NAME,
  BLUME_PROJECT_KEY_TYPO,
  BLUME_PROJECT_KEY_FIXED,
  PACKAGE_KIND_CANDIDATES,
  formatPnpmWorkspacePackages,
  TEMPLATE_EXPECTED_WORKSPACES,
  TEMPLATE_WORKSPACE_FILE_NAME,
  TEMPLATE_PACKAGE_GENERATED_DIRS,
};
