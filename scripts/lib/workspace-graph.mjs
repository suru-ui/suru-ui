import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * ワークスペース間の依存として扱う package.json のフィールドです。
 *
 * ビルド順の検証では devDependencies も含めます。テスト用の内部パッケージを devDependencies に置く構成でも、依存先を先にビルドできるようにするためです。
 */
const DEPENDENCY_KEYS = Object.freeze([
  "dependencies",
  "devDependencies",
  "peerDependencies",
  "optionalDependencies",
]);

/**
 * JSON ファイルを読み取ります。
 *
 * @param {string} path 読み取るファイルのパスです。
 *
 * @returns {unknown} 解析した JSON です。
 */
function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    throw new Error(
      `${path}: JSON を読み取れません。${error instanceof Error ? error.message : String(error)}`,
      { cause: error },
    );
  }
}

/**
 * ワークスペースのディレクトリー表記を揃えます。
 *
 * @param {string} dir ワークスペースのディレクトリーです。
 *
 * @returns {string} スラッシュ区切りで末尾スラッシュのないディレクトリーです。
 */
function normalizeWorkspaceDir(dir) {
  return dir
    .replaceAll("\\", "/")
    .replace(/^\.\/+/u, "")
    .replace(/\/+$/u, "");
}

/**
 * 正規表現のメタ文字をエスケープします。
 *
 * @param {string} value エスケープする文字列です。
 *
 * @returns {string} エスケープ済みの文字列です。
 */
function escapeRegExp(value) {
  return value.replaceAll(/[.+^${}()|[\]\\]/gu, "\\$&");
}

/**
 * `packages/*` のようなワークスペースの glob を展開します。
 *
 * 複数階層の `*` にも対応しますが、`**` は 1 階層の `*` として扱います。
 * 一致するディレクトリーがない場合は空配列を返します。
 *
 * @param {string} root リポジトリーのルートです。
 * @param {string} pattern ワークスペースのパターンです。
 *
 * @returns {string[]} 展開したディレクトリーです。
 */
function expandWorkspacePattern(root, pattern) {
  const normalized = normalizeWorkspaceDir(pattern);

  if (!normalized.includes("*")) {
    return [normalized];
  }

  const segments = normalized.split("/");
  const starIndex = segments.findIndex((segment) => segment.includes("*"));

  if (starIndex < 0) {
    return [normalized];
  }

  const base = join(root, ...segments.slice(0, starIndex));

  if (!existsSync(base)) {
    return [];
  }

  const starSegment = segments[starIndex] ?? "";
  const rest = segments.slice(starIndex + 1);
  const matcher = new RegExp(`^${escapeRegExp(starSegment).replaceAll("*", "[^/]*")}$`, "u");
  const results = [];

  for (const entry of readdirSync(base, { withFileTypes: true })) {
    if (!entry.isDirectory() || !matcher.test(entry.name)) {
      continue;
    }

    const next = [...segments.slice(0, starIndex), entry.name, ...rest].join("/");

    if (rest.length === 0) {
      results.push(next);
    } else {
      results.push(...expandWorkspacePattern(root, next));
    }
  }

  return results.toSorted();
}

/**
 * ルートの package.json とワークスペースの package.json を読み取ります。
 *
 * package.json がないワークスペースも `missing: true` として返します。
 * 定義の不整合を検出する側で、黙って無視するかエラーにするかを決められるようにするためです。
 *
 * @param {string} root リポジトリーのルートです。
 *
 * @returns {{
 *   rootPackage: Record<string, unknown>,
 *   entries: Array<{
 *     dir: string,
 *     pattern: string,
 *     path: string,
 *     data?: Record<string, unknown>,
 *     name?: string,
 *     missing: boolean,
 *   }>,
 * }} ルート設定とワークスペースの一覧です。
 */
function readWorkspaceEntries(root) {
  const rootPackagePath = join(root, "package.json");
  const rootPackage = readJson(rootPackagePath);

  if (
    typeof rootPackage !== "object" ||
    rootPackage === null ||
    Array.isArray(rootPackage) ||
    !Array.isArray(rootPackage.workspaces)
  ) {
    throw new Error(`${rootPackagePath}: workspaces が配列ではありません。`);
  }

  const entries = [];

  for (const pattern of rootPackage.workspaces) {
    if (typeof pattern !== "string") {
      throw new TypeError(
        `${rootPackagePath}: workspaces に文字列でない要素があります。明示的なディレクトリーを指定してください。`,
      );
    }

    const dirs = expandWorkspacePattern(root, pattern);

    if (dirs.length === 0) {
      const dir = normalizeWorkspaceDir(pattern);
      entries.push({
        dir,
        path: join(root, dir, "package.json"),
        missing: true,
        pattern,
      });

      continue;
    }

    for (const dir of dirs) {
      const path = join(root, dir, "package.json");

      if (!existsSync(path)) {
        entries.push({
          dir,
          path,
          missing: true,
          pattern,
        });
        continue;
      }

      const data = readJson(path);

      if (typeof data !== "object" || data === null || Array.isArray(data)) {
        throw new Error(`${path}: package.json の内容がオブジェクトではありません。`);
      }

      entries.push({
        dir,
        data,
        name: typeof data.name === "string" ? data.name : undefined,
        path,
        missing: false,
        pattern,
      });
    }
  }

  return {
    entries,
    rootPackage,
  };
}

/**
 * パッケージが依存している内部ワークスペースの名前を返します。
 *
 * @param {{ data?: Record<string, unknown> }} entry 対象のワークスペースです。
 * @param {Map<string, { dir: string }>} byName 内部ワークスペースの名前とエントリーの対応です。
 *
 * @returns {string[]} 内部依存の名前です。
 */
function internalDependencyNames(entry, byName) {
  const names = new Set();
  const data = entry.data;

  if (data === undefined) {
    return [];
  }

  for (const key of DEPENDENCY_KEYS) {
    const deps = data[key];

    if (typeof deps !== "object" || deps === null || Array.isArray(deps)) {
      continue;
    }

    for (const name of Object.keys(deps)) {
      if (byName.has(name)) {
        names.add(name);
      }
    }
  }

  return [...names].toSorted((a, b) => a.localeCompare(b));
}

/**
 * 指定したワークスペースの推移的な内部依存を、依存先が先になる順で返します。
 *
 * 対象自身は結果に含めません。循環依存や名前の重複はエラーにします。
 *
 * @param {Array<{ dir: string, name?: string, data?: Record<string, unknown>, missing: boolean }>} entries ワークスペースの一覧です。
 * @param {string} targetDir 対象のワークスペースディレクトリーです。
 *
 * @returns {Array<{ dir: string, name?: string }>} 依存先から順に並べたワークスペースです。
 */
function collectTransitiveDependencies(entries, targetDir) {
  const byName = new Map();
  const byDir = new Map();

  for (const entry of entries) {
    if (entry.missing || entry.name === undefined) {
      continue;
    }

    if (byName.has(entry.name)) {
      throw new Error(`ワークスペース名 ${entry.name} が重複しています。`);
    }

    byName.set(entry.name, entry);
    byDir.set(normalizeWorkspaceDir(entry.dir), entry);
  }

  const normalizedTarget = normalizeWorkspaceDir(targetDir);
  const target = byDir.get(normalizedTarget);

  if (target === undefined) {
    throw new Error(`ワークスペース ${targetDir} が見つかりません。`);
  }

  const order = [];
  const visiting = new Set();
  const visited = new Set();

  /**
   * 依存先を先に訪問します。
   *
   * @param {{ dir: string, name?: string, data?: Record<string, unknown> }} entry 対象です。
   */
  function visit(entry) {
    const name = entry.name;

    if (name === undefined || visited.has(name)) {
      return;
    }

    if (visiting.has(name)) {
      throw new Error(`ワークスペースの循環依存を検出しました: ${name}`);
    }

    visiting.add(name);

    for (const dependencyName of internalDependencyNames(entry, byName)) {
      const dependency = byName.get(dependencyName);

      if (dependency !== undefined) {
        visit(dependency);
      }
    }

    visiting.delete(name);
    visited.add(name);
    order.push(entry);
  }

  visit(target);
  order.pop();

  return order;
}

export {
  readJson,
  DEPENDENCY_KEYS,
  readWorkspaceEntries,
  normalizeWorkspaceDir,
  expandWorkspacePattern,
  internalDependencyNames,
  collectTransitiveDependencies,
};
