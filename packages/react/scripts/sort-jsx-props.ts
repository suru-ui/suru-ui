import * as fs from "node:fs";
import * as path from "node:path";

import { parse } from "@babel/parser";
import type { JSXAttribute, JSXOpeningElement, JSXSpreadAttribute, Node } from "@babel/types";

/** 対象ファイルのディレクトリー。 */
const TARGET_DIRS = ["src"];

/** JSX の property を並べ替える。 */
type Prop = JSXAttribute | JSXSpreadAttribute;

/**
 * 属性名を取得する。
 *
 * `xlink:href` のような名前空間付きの名前は `xlink:href` の形で返す。
 */
function getName(attr: JSXAttribute): string {
  const attrName = attr.name;
  if (attrName.type === "JSXNamespacedName") {
    return `${attrName.namespace.name}:${attrName.name.name}`;
  }
  return attrName.name;
}

/**
 * 属性の分類グループを返す。
 *
 * 一般 → `aria-*` → `data-*` の順に並べる。グループ番号がそのまま並び順になる。
 */
function getGroup(name: string): number {
  if (name.startsWith("aria-")) {
    return 1;
  }
  if (name.startsWith("data-")) {
    return 2;
  }
  return 0;
}

/**
 * 2 つの属性の比較関数。
 *
 * セクション内は「長さ順（優先）かつ名前順」で、属性名が短い方を先にし、
 * 同じ長さの場合は辞書順にする。
 */
function compareProps(a: JSXAttribute, b: JSXAttribute): number {
  const nameA = getName(a);
  const nameB = getName(b);
  const groupA = getGroup(nameA);
  const groupB = getGroup(nameB);
  if (groupA !== groupB) {
    return groupA - groupB;
  }
  if (nameA.length !== nameB.length) {
    return nameA.length - nameB.length;
  }
  return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
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

/** AST を走査して JSX 開始要素を収集する。 */
function collectOpeningElements(root: Node, result: JSXOpeningElement[] = []): JSXOpeningElement[] {
  if (root.type === "JSXOpeningElement") {
    result.push(root);
  }
  for (const key of Object.keys(root) as (keyof Node)[]) {
    const value = root[key];
    if (isNode(value)) {
      collectOpeningElements(value, result);
    } else if (Array.isArray(value)) {
      for (const item of value) {
        if (isNode(item)) {
          collectOpeningElements(item, result);
        }
      }
    }
  }
  return result;
}

/** 属性にコメントが付随しているかを返す。並べ替えでコメントの位置が崩れるため、対象外にする。 */
function hasComment(attr: JSXAttribute): boolean {
  return (
    !!attr.leadingComments?.length ||
    !!attr.trailingComments?.length ||
    !!attr.innerComments?.length
  );
}

/**
 * 開きタグの属性の並べ替え計画を作る。
 *
 * スプレッド演算子によるプロパティーの展開は位置を維持し、それ以外の属性を
 * 「一般 → `aria-*` → `data-*`」の順で並べ替える。
 *
 * @returns 変更が必要な場合は計画、不要な場合は `null`。
 */
function planReplacement(element: JSXOpeningElement): {
  start: number;
  end: number;
  attrs: Prop[];
  /** 新しい位置 `i` に置く属性の元インデックス。 */
  newOrder: number[];
} | null {
  const attrs = element.attributes;

  if (attrs.length < 2) {
    return null;
  }
  if (attrs.some((attr) => attr.type === "JSXAttribute" && hasComment(attr))) {
    return null;
  }

  const normalAttrs: JSXAttribute[] = [];
  const spreadIndexes: number[] = [];
  for (let i = 0; i < attrs.length; i++) {
    const attr = attrs[i]!;
    if (attr.type === "JSXAttribute") {
      normalAttrs.push(attr);
    } else {
      spreadIndexes.push(i);
    }
  }

  if (normalAttrs.length < 2) {
    return null;
  }

  const sorted = normalAttrs.toSorted(compareProps);
  const isSameOrder = sorted.every((attr, i) => attr === normalAttrs[i]);
  if (isSameOrder) {
    return null;
  }

  // スプレッド属性を元の位置に残し、それ以外の属性にソート結果を割り当てる。
  const newOrder: number[] = attrs.map(() => 0);
  let cursor = 0;
  for (let i = 0; i < attrs.length; i++) {
    if (spreadIndexes.includes(i)) {
      newOrder[i] = i;
    } else {
      newOrder[i] = attrs.indexOf(sorted[cursor++]!);
    }
  }

  const first = attrs[0]!;
  const last = attrs[attrs.length - 1]!;
  return { start: first.start!, end: last.end!, attrs, newOrder };
}

/** 属性の並べ替え計画を、ネストを考慮してテキストへ変換するための置換ノード。 */
type ReplacementNode = {
  start: number;
  end: number;
  attrs: Prop[];
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
      if (parent.start <= node.start && node.end <= parent.end) {
        break;
      }
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
    if (node.end <= start || node.start >= end) {
      continue;
    }
    text += source.slice(cursor, node.start);
    text += rendered.get(node)!;
    cursor = node.end;
  }
  return text + source.slice(cursor, end);
}

/**
 * 置換ノードの属性領域を並べ替えたテキストを返す。
 *
 * 属性テキストは元のソースから切り出し、属性間のセパレーター (空白や改行) は
 * 元の順序のまま維持する。属性の値に含まれるネストした JSX 要素の並べ替えは、
 * 子の置換ノードを適用して反映する。
 */
function renderNode(
  source: string,
  node: ReplacementNode,
  rendered: Map<ReplacementNode, string>,
): string {
  // 属性間のセパレーター (空白や改行) を元の順序のまま維持する。
  const separators: string[] = [];
  for (let i = 0; i < node.attrs.length - 1; i++) {
    separators.push(source.slice(node.attrs[i]!.end!, node.attrs[i + 1]!.start!));
  }

  const parts: string[] = [];
  for (let i = 0; i < node.newOrder.length; i++) {
    const attr = node.attrs[node.newOrder[i]!]!;
    // 属性の値にネストした JSX 要素があれば、その並べ替え結果を反映する。
    parts.push(renderRange(source, attr.start!, attr.end!, node.children, rendered));
    if (i < separators.length) {
      parts.push(separators[i]!);
    }
  }
  return parts.join("");
}

/**
 * ソース内の JSX 属性を並べ替える。
 *
 * パースできない場合や、属性にコメントが付随する要素は変更しない。
 */
export function sortJsxProps(source: string): string {
  const result = parse(source, {
    sourceType: "module",
    plugins: ["typescript", "jsx"],
  });

  const elements = collectOpeningElements(result.program);
  const plans = elements
    .map(planReplacement)
    .filter((plan): plan is NonNullable<typeof plan> => plan !== null);
  if (plans.length === 0) {
    return source;
  }

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
    rendered.set(node, renderNode(source, node, rendered));
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
    fs
      .globSync("**/*.tsx", { cwd: dir, exclude: ["**/__screenshots__/**"] })
      .map((fullpath) => path.join(dir, fullpath)),
  );

  const changedFiles: string[] = [];

  for (const filePath of files) {
    const source = fs.readFileSync(filePath, "utf-8");
    const formatted = sortJsxProps(source);
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
