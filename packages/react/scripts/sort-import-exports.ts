import * as fs from "node:fs";
import * as path from "node:path";

import { parse } from "@babel/parser";
import type {
  ExportNamedDeclaration,
  ExportSpecifier,
  ImportDeclaration,
  ImportSpecifier,
  Node,
} from "@babel/types";

/** 対象ファイルのディレクトリー。 */
const TARGET_DIRS = ["src"];

type Decl = ImportDeclaration | ExportNamedDeclaration;

/**
 * 並べ替えのキーにする名前を返す。
 *
 * エイリアス (`as`) の有無にかかわらず、ソースに書かれている元の名前を使う。
 */
function getName(spec: ImportSpecifier | ExportSpecifier): string {
  const name = spec.type === "ImportSpecifier" ? spec.imported : spec.exported;
  if (name.type === "Identifier") {
    return name.name;
  }
  if (name.type === "StringLiteral") {
    return name.value;
  }
  return "";
}

/**
 * specifier が「型」かどうかを返す。
 *
 * 型は値より先に並べる。文全体が型 (`import type { ... }`) の場合は
 * すべての specifier を型として扱う。`typeof` は値として扱う。
 */
function isTypeKind(spec: ImportSpecifier | ExportSpecifier, statementIsType: boolean): boolean {
  const kind = spec.type === "ImportSpecifier" ? spec.importKind : spec.exportKind;
  return kind === "type" || statementIsType;
}

/**
 * 2 つの specifier の比較関数。
 *
 * 「型 → 値」の順で、セクション内は「長さ順（優先）かつ名前順」で、
 * 名前が短い方を先にし、同じ長さの場合は辞書順にする。
 */
function compareSpecs(
  a: { name: string; isType: boolean },
  b: { name: string; isType: boolean },
): number {
  if (a.isType !== b.isType) {
    return a.isType ? -1 : 1;
  }
  if (a.name.length !== b.name.length) {
    return a.name.length - b.name.length;
  }
  return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
}

/**
 * ノードとして走査できる値かを判定する。
 *
 * コメントのような並べ替えに影響しない節点は走査対象から除く。
 */
function isNode(value: unknown): value is Node {
  if (typeof value !== "object" || value === null || !("type" in value)) {
    return false;
  }
  const type = (value as { type?: unknown }).type;
  return typeof type === "string" && type !== "CommentLine" && type !== "CommentBlock";
}

/** AST を走査して import/export 宣言を収集する。 */
function collectDeclarations(root: Node, result: Decl[] = []): Decl[] {
  if (root.type === "ImportDeclaration" || root.type === "ExportNamedDeclaration") {
    result.push(root);
  }
  for (const key of Object.keys(root) as (keyof Node)[]) {
    const value = root[key];
    if (isNode(value)) {
      collectDeclarations(value, result);
    } else if (Array.isArray(value)) {
      for (const item of value) {
        if (isNode(item)) {
          collectDeclarations(item, result);
        }
      }
    }
  }
  return result;
}

/** specifier にコメントが付随しているかを返す。並べ替えでコメントの位置が崩れるため、対象外にする。 */
function hasComment(spec: ImportSpecifier | ExportSpecifier): boolean {
  return (
    !!spec.leadingComments?.length ||
    !!spec.trailingComments?.length ||
    !!spec.innerComments?.length
  );
}

/**
 * 宣言の具名 specifier を並べ替えた結果を返す。
 *
 * 既定 (default) や全体 (`*`) の specifier は位置を維持し、具名 (
 * `{ name }`) の specifier だけを「型 → 値」の順で並べ替える。
 *
 * @returns 変更が必要な場合は計画、不要な場合は `null`。
 */
function planReplacement(decl: Decl): {
  start: number;
  end: number;
  specs: ImportSpecifier[] | ExportSpecifier[];
  /** 新しい位置 `i` に置く specifier の元インデックス。 */
  newOrder: number[];
} | null {
  // 既定 (default) や全体 (`*`) の specifier は対象外にして、具名だけを並べ替える。
  let specs: ImportSpecifier[] | ExportSpecifier[];
  if (decl.type === "ImportDeclaration") {
    specs = decl.specifiers.filter(
      (spec): spec is ImportSpecifier => spec.type === "ImportSpecifier",
    );
  } else {
    specs = decl.specifiers.filter(
      (spec): spec is ExportSpecifier => spec.type === "ExportSpecifier",
    );
  }

  if (specs.length < 2) {
    return null;
  }
  if (specs.some(hasComment)) {
    return null;
  }

  const statementIsType =
    decl.type === "ImportDeclaration" ? decl.importKind === "type" : decl.exportKind === "type";

  const items = specs.map((node) => ({
    node,
    name: getName(node),
    isType: isTypeKind(node, statementIsType),
  }));

  const sorted = items.toSorted(compareSpecs);
  const isSameOrder = sorted.every((item, i) => item === items[i]);
  if (isSameOrder) {
    return null;
  }

  const first = specs[0]!;
  const last = specs[specs.length - 1]!;
  const newOrder = sorted.map((item) => items.indexOf(item));
  return { start: first.start!, end: last.end!, specs, newOrder };
}

/**
 * 並べ替え計画に基づいて、specifier の領域の新しいテキストを組み立てる。
 *
 * セパレーター (コンマや改行) は元の順序のまま維持し、最後の specifier の
 * 後ろに付いていたセパレーター (末尾のコンマなど) も新しい最後の位置に残す。
 */
function renderPlan(source: string, plan: NonNullable<ReturnType<typeof planReplacement>>): string {
  const separators: string[] = [];
  for (let i = 0; i < plan.specs.length - 1; i++) {
    separators.push(source.slice(plan.specs[i]!.end!, plan.specs[i + 1]!.start!));
  }

  const parts: string[] = [];
  for (let i = 0; i < plan.newOrder.length; i++) {
    const spec = plan.specs[plan.newOrder[i]!]!;
    parts.push(source.slice(spec.start!, spec.end!));
    if (i < separators.length) {
      parts.push(separators[i]!);
    }
  }
  return parts.join("");
}

/**
 * ソース内の import/export 宣言の具名 specifier を並べ替える。
 *
 * パースできない場合や、コメントが付随する specifier がある宣言は変更しない。
 */
export function sortImportExports(source: string): string {
  const result = parse(source, {
    sourceType: "module",
    plugins: ["typescript", "jsx"],
  });

  const decls = collectDeclarations(result.program);
  const plans = decls
    .map(planReplacement)
    .filter((plan): plan is NonNullable<typeof plan> => plan !== null);
  if (plans.length === 0) {
    return source;
  }

  // 置換は重ならないため、後ろの位置から適用してよい。並べ替えは同じ
  // トークンの並べ替えなので長さが変わらず、位置は元のまま使える。
  let output = source;
  for (const plan of plans.toSorted((a, b) => b.start - a.start)) {
    output = output.slice(0, plan.start) + renderPlan(source, plan) + output.slice(plan.end);
  }

  return output;
}

async function main(): Promise<void> {
  const isCheck = process.argv.includes("--check");
  const files = TARGET_DIRS.flatMap((dir) =>
    fs
      .globSync("**/*.{ts,tsx}", { cwd: dir, exclude: ["**/__screenshots__/**"] })
      .map((fullpath) => path.join(dir, fullpath)),
  );

  const changedFiles: string[] = [];

  for (const filePath of files) {
    const source = fs.readFileSync(filePath, "utf-8");
    const formatted = sortImportExports(source);
    if (formatted === source) {
      continue;
    }
    changedFiles.push(filePath);
    if (!isCheck) {
      fs.writeFileSync(filePath, formatted, "utf-8");
    }
  }

  if (isCheck && changedFiles.length > 0) {
    console.error("並べ替えが必要なファイル:");
    for (const filePath of changedFiles) {
      console.error(`  ${filePath}`);
    }
    process.exit(1);
  }
}

if (import.meta.main) {
  void main();
}
