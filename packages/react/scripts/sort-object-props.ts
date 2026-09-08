import * as fs from "node:fs";
import * as path from "node:path";

import { parse } from "@babel/parser";
import type {
  Node,
  ObjectExpression,
  ObjectMethod,
  ObjectPattern,
  ObjectProperty,
  RestElement,
  SpreadElement,
} from "@babel/types";

/** 対象ファイルのディレクトリー。 */
const TARGET_DIRS = ["src"];

/** 並べ替え対象のオブジェクト (`{ ... }` の部分)。 */
type Container = ObjectExpression | ObjectPattern;

/** コンテナーのプロパティー。 */
type Prop = ObjectMethod | ObjectProperty | SpreadElement | RestElement;

/**
 * ノードとして走査できる値かを判定する。
 *
 * コメントのような並べ替えに影響しない節点は走査対象から除く。
 */
function isNode(value: unknown): value is Node {
  if (typeof value !== "object" || value === null || !("type" in value)) return false;
  const type = (value as { type?: unknown }).type;
  return typeof type === "string" && type !== "CommentLine" && type !== "CommentBlock";
}

/** AST を走査してオブジェクトと分割代入のパターンを収集する。 */
function collectContainers(root: Node, result: Container[] = []): Container[] {
  if (root.type === "ObjectExpression" || root.type === "ObjectPattern") {
    result.push(root);
  }
  for (const key of Object.keys(root) as (keyof Node)[]) {
    const value = root[key];
    if (isNode(value)) {
      collectContainers(value, result);
    } else if (Array.isArray(value)) {
      for (const item of value) {
        if (isNode(item)) {
          collectContainers(item, result);
        }
      }
    }
  }
  return result;
}

/**
 * 並べ替えのキーにするプロパティー名を返す。
 *
 * 計算されたキー (`[expr]`) は名前を抽出できないため `null` を返す。
 */
function getKeyName(prop: ObjectProperty | ObjectMethod): string | null {
  if (prop.computed) return null;
  const key = prop.key;
  if (key.type === "Identifier") return key.name;
  if (key.type === "StringLiteral" || key.type === "NumericLiteral") return String(key.value);
  return null;
}

/**
 * プロパティーの分類グループを返す。
 *
 * 一般 → `aria-*` → `data-*` の順に並べる。グループ番号がそのまま並び順になる。
 */
function getGroup(name: string): number {
  if (name.startsWith("aria-")) return 1;
  if (name.startsWith("data-")) return 2;
  return 0;
}

/**
 * 2 つのプロパティーの比較関数。
 *
 * グループ内は「長さ順（優先）かつ名前順」で、プロパティー名が短い方を先にし、
 * 同じ長さの場合は辞書順にする。
 */
function compareProps(a: { name: string }, b: { name: string }): number {
  const groupA = getGroup(a.name);
  const groupB = getGroup(b.name);
  if (groupA !== groupB) return groupA - groupB;
  if (a.name.length !== b.name.length) return a.name.length - b.name.length;
  return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
}

/**
 * 並べ替えのキーにするプロパティー名を返す。
 *
 * スプレッド (`...obj`) とレスト (`...rest`) は位置を維持するため `null` を返す。
 * 計算されたキー (`[expr]`) も名前を抽出できないため `null` を返す。
 */
function getSortName(prop: Prop): string | null {
  if (prop.type === "SpreadElement" || prop.type === "RestElement") return null;
  return getKeyName(prop);
}

/**
 * パターンが束縛する名前を収集する。
 */
function collectBoundNames(node: Node, names: Set<string>): void {
  if (node.type === "Identifier") {
    names.add(node.name);
    return;
  }
  if (node.type === "AssignmentPattern") {
    collectBoundNames(node.left, names);
    return;
  }
  if (node.type === "ObjectPattern") {
    for (const prop of node.properties) {
      if (prop.type === "ObjectProperty") {
        collectBoundNames(prop.value, names);
      } else {
        collectBoundNames(prop.argument, names);
      }
    }
    return;
  }
  if (node.type === "ArrayPattern") {
    for (const element of node.elements) {
      if (element !== null) {
        collectBoundNames(element, names);
      }
    }
    return;
  }
  if (node.type === "RestElement") {
    collectBoundNames(node.argument, names);
  }
}

/**
 * 式が参照する名前を収集する。
 *
 * メンバーアクセスのプロパティーやオブジェクトのキーなど、参照ではない位置の
 * 識別子は除く。判定できない位置は参照として扱い、安全側に倒す。
 */
function collectReferencedNames(node: Node, names: Set<string>): void {
  if (node.type === "Identifier") {
    names.add(node.name);
    return;
  }
  if (node.type === "MemberExpression" || node.type === "OptionalMemberExpression") {
    collectReferencedNames(node.object, names);
    if (node.computed) {
      collectReferencedNames(node.property, names);
    }
    return;
  }
  if (node.type === "ObjectProperty" || node.type === "ObjectMethod") {
    if (node.computed) {
      collectReferencedNames(node.key, names);
    }
    if (node.type === "ObjectProperty") {
      collectReferencedNames(node.value, names);
    } else {
      for (const param of node.params) {
        collectReferencedNames(param, names);
      }
      collectReferencedNames(node.body, names);
    }
    return;
  }
  for (const key of Object.keys(node) as (keyof Node)[]) {
    if (key === "leadingComments" || key === "trailingComments" || key === "innerComments") {
      continue;
    }
    const value = node[key];
    if (isNode(value)) {
      collectReferencedNames(value, names);
    } else if (Array.isArray(value)) {
      for (const item of value) {
        if (isNode(item)) {
          collectReferencedNames(item, names);
        }
      }
    }
  }
}

/**
 * パターン内の既定値 (`= ...`) と計算されたキーが参照する名前を収集する。
 */
function collectPatternRefs(node: Node, names: Set<string>): void {
  if (node.type === "AssignmentPattern") {
    collectReferencedNames(node.right, names);
    collectPatternRefs(node.left, names);
    return;
  }
  if (node.type === "ObjectProperty") {
    if (node.computed) {
      collectReferencedNames(node.key, names);
    }
    collectPatternRefs(node.value, names);
    return;
  }
  if (node.type === "ObjectPattern") {
    for (const prop of node.properties) {
      collectPatternRefs(prop, names);
    }
    return;
  }
  if (node.type === "ArrayPattern") {
    for (const element of node.elements) {
      if (element !== null) {
        collectPatternRefs(element, names);
      }
    }
    return;
  }
  if (node.type === "RestElement") {
    collectPatternRefs(node.argument, names);
  }
}

/**
 * 分割代入のパターンに初期化順の依存があるかを返す。
 *
 * 既定値 (`end = start`) や計算されたキー (`[prefix]`) がパターン内で束縛される
 * 名前を参照している場合、並べ替えると評価順が変わり、未初期化の変数を参照する
 * 可能性があるため、並べ替え対象から除く。
 */
function hasInitOrderDependency(pattern: ObjectPattern): boolean {
  const bound = new Set<string>();
  for (const prop of pattern.properties) {
    if (prop.type === "ObjectProperty") {
      collectBoundNames(prop.value, bound);
    } else {
      collectBoundNames(prop.argument, bound);
    }
  }
  if (bound.size === 0) return false;

  const referenced = new Set<string>();
  collectPatternRefs(pattern, referenced);
  for (const name of referenced) {
    if (bound.has(name)) return true;
  }
  return false;
}

/**
 * プロパティーの開始位置を返す。
 *
 * プロパティーに付随するコメントはプロパティーと一緒に移動するため、
 * 先頭のコメントの開始位置まで範囲を広げる。Babel 8 はコメントを次の
 * プロパティーの leading コメントとしても付与するため、trailing コメントは
 * ここで扱わない (重複してしまう)。
 */
function extendedStart(prop: Prop): number {
  const propStart = prop.start!;
  const firstComment = prop.leadingComments?.[0];
  if (
    firstComment !== undefined &&
    typeof firstComment.start === "number" &&
    firstComment.start < propStart
  ) {
    return firstComment.start;
  }
  return propStart;
}

/**
 * オブジェクトのプロパティーを並べ替えた結果を返す。
 *
 * 名前を持たないプロパティー (スプレッド・レスト・計算されたキー) は位置を維持し、
 * それ以外のプロパティーを「一般 → `aria-*` → `data-*`」の順で並べ替える。
 * ただし分割代入のパターンに初期化順の依存がある場合 (既定値が兄弟の束縛を
 * 参照している場合) は並べ替えない。
 *
 * @returns 変更が必要な場合は計画、不要な場合は `null`。
 */
function planReplacement(container: Container): {
  start: number;
  end: number;
  props: Prop[];
  /** 新しい位置 `i` に置くプロパティーの元インデックス。 */
  newOrder: number[];
} | null {
  if (container.type === "ObjectPattern" && hasInitOrderDependency(container)) return null;

  const props: Prop[] = [];
  for (const prop of container.properties) {
    props.push(prop);
  }
  const items = props.map((prop) => ({ prop, name: getSortName(prop) }));

  const sortable = items.filter((item): item is { prop: Prop; name: string } => item.name !== null);
  if (sortable.length < 2) return null;

  const sorted = sortable.toSorted(compareProps);

  // 名前を持たないプロパティーが元の位置に残るように、並べ替えの要否を判定する。
  const isSameOrder = sorted.every((item, i) => item === sortable[i]);
  if (isSameOrder) return null;

  const newOrder: number[] = props.map(() => 0);
  let cursor = 0;
  for (let i = 0; i < props.length; i++) {
    if (items[i]!.name === null) {
      newOrder[i] = i;
    } else {
      newOrder[i] = props.indexOf(sorted[cursor++]!.prop);
    }
  }

  return {
    start: extendedStart(props[0]!),
    end: props[props.length - 1]!.end!,
    props,
    newOrder,
  };
}

/** オブジェクトの並べ替え計画を、ネストを考慮してテキストへ変換するための置換ノード。 */
type ReplacementNode = {
  start: number;
  end: number;
  props: Prop[];
  newOrder: number[];
  /** この範囲の内側にある置換ノード (`start` 昇順)。 */
  children: ReplacementNode[];
};

/**
 * 置換ノードの入れ子関係 (`children`) を構築し、ルートのノードを返す。
 */
function buildTree(plans: NonNullable<ReturnType<typeof planReplacement>>[]): ReplacementNode[] {
  const nodes = plans
    .map((plan) => ({ ...plan, children: [] as ReplacementNode[] }))
    .toSorted((a, b) => a.start - b.start);

  const roots: ReplacementNode[] = [];
  const stack: ReplacementNode[] = [];

  for (const node of nodes) {
    // 自身を包含する直近のノードを親にする。
    while (stack.length > 0) {
      const parent = stack[stack.length - 1]!;
      if (parent.start <= node.start && node.end <= parent.end) break;
      stack.pop();
    }
    if (stack.length > 0) {
      stack[stack.length - 1]!.children.push(node);
    } else {
      roots.push(node);
    }
    stack.push(node);
  }

  return roots;
}

/**
 * `source[start..end]` を、その範囲内の置換ノードを適用しつつ文字列化する。
 *
 * 範囲外のノードは無視する。
 */
function renderRange(
  source: string,
  start: number,
  end: number,
  nodes: ReplacementNode[],
  rendered: Map<ReplacementNode, string>,
): string {
  let text = "";
  let cursor = start;
  for (const node of nodes) {
    if (node.end <= start || node.start >= end) continue;
    text += source.slice(cursor, node.start);
    text += rendered.get(node)!;
    cursor = node.end;
  }
  return text + source.slice(cursor, end);
}

/**
 * オブジェクトのプロパティー領域を並べ替えたテキストを返す。
 *
 * プロパティーのテキストは元のソースから切り出し (付随するコメントを含む)、
 * プロパティー間のセパレーター (コンマや改行) は元の順序のまま維持する。
 * プロパティーの値に含まれるネストしたオブジェクトの並べ替えは、子の置換ノードを
 * 適用して反映する。
 */
function renderProps(
  source: string,
  node: ReplacementNode,
  rendered: Map<ReplacementNode, string>,
): string {
  const props = node.props;

  // プロパティー間のセパレーター (コンマや改行) を元の順序のまま維持する。
  // 次のプロパティーの先頭コメントは範囲外に残す。
  const separators: string[] = [];
  for (let i = 0; i < props.length - 1; i++) {
    separators.push(source.slice(props[i]!.end!, extendedStart(props[i + 1]!)));
  }

  const parts: string[] = [];
  for (let i = 0; i < node.newOrder.length; i++) {
    const prop = props[node.newOrder[i]!]!;
    // プロパティーの値にネストしたオブジェクトがあれば、その並べ替え結果を反映する。
    parts.push(renderRange(source, extendedStart(prop), prop.end!, node.children, rendered));
    if (i < separators.length) {
      parts.push(separators[i]!);
    }
  }
  return parts.join("");
}

/**
 * ソース内のオブジェクトリテラルと分割代入のパターンのプロパティーを並べ替える。
 *
 * オブジェクトリテラル (`{ ... }`) と分割代入 (`const { ... } = ...`) の
 * プロパティーを対象に、「一般 → `aria-*` → `data-*`」の順で並べ替える。
 * グループ内はプロパティー名の長さ順にし、同じ長さの場合は辞書順にする。
 * パースできない場合は変更しない。
 */
export function sortObjectProps(source: string): string {
  const result = parse(source, {
    sourceType: "module",
    plugins: ["typescript", "jsx"],
  });

  const containers = collectContainers(result.program);
  const plans = containers
    .map(planReplacement)
    .filter((plan): plan is NonNullable<typeof plan> => plan !== null);
  if (plans.length === 0) return source;

  const roots = buildTree(plans);
  const rendered = new Map<ReplacementNode, string>();

  // 子を先に描画するため post-order で処理する。
  const order: ReplacementNode[] = [];
  (function postOrder(nodes: ReplacementNode[]): void {
    for (const node of nodes) {
      postOrder(node.children);
      order.push(node);
    }
  })(roots);

  for (const node of order) {
    rendered.set(node, renderProps(source, node, rendered));
  }

  // ルートのノード同士は重ならないため、ソース位置順に適用してよい。
  let text = "";
  let cursor = 0;
  for (const node of roots) {
    text += source.slice(cursor, node.start);
    text += rendered.get(node)!;
    cursor = node.end;
  }
  const output = text + source.slice(cursor);

  return output === source ? source : output;
}

async function main(): Promise<void> {
  const isCheck = process.argv.includes("--check");
  const files = TARGET_DIRS.flatMap((dir) =>
    fs.globSync("**/*.{ts,tsx}", { cwd: dir }).map((fullpath) => path.join(dir, fullpath)),
  );

  const changedFiles: string[] = [];

  for (const filePath of files) {
    const source = fs.readFileSync(filePath, "utf-8");
    const formatted = sortObjectProps(source);
    if (formatted === source) continue;
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
