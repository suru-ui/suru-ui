import * as fs from "node:fs";
import * as path from "node:path";

import { parse } from "@babel/parser";
import type { Node, Statement, TSModuleBlock } from "@babel/types";

/** 対象ファイルのディレクトリー。 */
const TARGET_DIRS = ["src", "stories"];

/**
 * 名前順より先に固定で並べる型エクスポートの名前。
 *
 * 文字列は完全一致、正規表現はパターン一致で判定する。
 * 配列の順序がそのまま並び順になる。ここにない名前は名前順になる。
 */
const FIXED_ORDER_NAMES: readonly (string | RegExp)[] = [
  "State",
  "Props",
  "SlotProps",
  "Context",
  /[a-z]Context$/,
];

/** 名前順の型エクスポートの分類グループ。 */
const NAMED_GROUP = FIXED_ORDER_NAMES.length;

/** ネストした名前空間の分類グループ。 */
const NAMESPACE_GROUP = NAMED_GROUP + 1;

/** 名前空間の本体 (`{ ... }` の部分)。 */
type Block = TSModuleBlock;

/**
 * 固定順の指定に名前が一致するかを返す。
 *
 * 文字列は完全一致、正規表現はパターン一致で判定する。
 * `g` フラグ付き正規表現の `lastIndex` の影響を受けないようにする。
 */
function matchesFixedName(pattern: string | RegExp, name: string): boolean {
  if (typeof pattern === "string") return pattern === name;
  pattern.lastIndex = 0;
  return pattern.test(name);
}

/**
 * 型名前空間のメンバーの分類グループ。
 *
 * {@linkcode FIXED_ORDER_NAMES} にある名前はその位置をグループとし、
 * 残りの型エクスポートとネストした名前空間は名前順にする。
 * グループ番号がそのまま並び順になる。
 */
function getGroup(name: string): number {
  const index = FIXED_ORDER_NAMES.findIndex((pattern) => matchesFixedName(pattern, name));
  return index === -1 ? NAMED_GROUP : index;
}

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

/** AST を走査して名前空間の本体を収集する。 */
function collectBlocks(root: Node, result: Block[] = []): Block[] {
  if (
    root.type === "TSModuleDeclaration" &&
    root.kind === "namespace" &&
    root.body?.type === "TSModuleBlock"
  ) {
    result.push(root.body);
  }
  for (const key of Object.keys(root) as (keyof Node)[]) {
    const value = root[key];
    if (isNode(value)) {
      collectBlocks(value, result);
    } else if (Array.isArray(value)) {
      for (const item of value) {
        if (isNode(item)) {
          collectBlocks(item, result);
        }
      }
    }
  }
  return result;
}

/**
 * メンバーの名前と分類グループを返す。
 *
 * 型エクスポート (`export type X = ...`) は名前を持ち、ネストした名前空間
 * (`export namespace X { ... }`) も名前を持つ。それ以外の文は名前を持たない
 * ため `null` を返す。
 */
function getMemberInfo(member: Statement): { name: string | null; group: number } {
  if (member.type !== "ExportNamedDeclaration") {
    return { name: null, group: -1 };
  }

  const declaration = member.declaration;

  if (declaration?.type === "TSModuleDeclaration" && declaration.id.type === "Identifier") {
    return { name: declaration.id.name, group: NAMESPACE_GROUP };
  }

  if (
    declaration !== null &&
    declaration !== undefined &&
    "type" in declaration &&
    "id" in declaration &&
    (declaration as { id?: { name?: string } }).id?.name !== undefined
  ) {
    // インターフェース名が「I + 大文字」で始まる場合は、先頭の「I」を並び順の
    // 対象から除く (`IFoo` → `Foo` として扱う)。
    const name = (declaration as { id: { name: string } }).id.name;
    if (declaration.type === "TSInterfaceDeclaration" && /^I[A-Z]/u.test(name)) {
      return { name: name.slice(1), group: getGroup(name) };
    }

    return { name, group: getGroup(name) };
  }

  return { name: null, group: -1 };
}

/**
 * 2 つのメンバーの比較関数。
 *
 * グループ順で並べ、グループ内は名前の辞書順にする。名前空間同士もグループが
 * 等しいため名前順になる。
 */
function compareItems(
  a: { name: string; group: number },
  b: { name: string; group: number },
): number {
  if (a.group !== b.group) return a.group - b.group;
  return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
}

/**
 * メンバーの開始位置を返す。
 *
 * メンバーに付随する JSDoc などのコメントはメンバーと一緒に移動するため、
 * 先頭のコメントの開始位置まで範囲を広げる。Babel 8 はコメントを次の
 * メンバーの leading コメントとしても付与するため、trailing コメントは
 * ここで扱わない (重複してしまう)。
 */
function extendedStart(member: Statement): number {
  const memberStart = member.start!;
  const firstComment = member.leadingComments?.[0];
  if (
    firstComment !== undefined &&
    typeof firstComment.start === "number" &&
    firstComment.start < memberStart
  ) {
    return firstComment.start;
  }
  return memberStart;
}

/**
 * 名前空間の本体のメンバーを並べ替えた結果を返す。
 *
 * 名前を持たない文は位置を維持し、型エクスポートとネストした名前空間を
 * 「{@linkcode FIXED_ORDER_NAMES} の順 → 名前順」の順に並べ替える。
 * ネストした名前空間はその後に続き、やはり名前順になる。
 *
 * @returns 変更が必要な場合は計画、不要な場合は `null`。
 */
function planReplacement(block: Block): {
  start: number;
  end: number;
  members: Statement[];
  /** 新しい位置 `i` に置くメンバーの元インデックス。 */
  newOrder: number[];
} | null {
  const members = block.body;
  const items = members.map((member) => ({ member, ...getMemberInfo(member) }));

  const sortable = items.filter(
    (item): item is { member: Statement; name: string; group: number } => item.name !== null,
  );
  if (sortable.length < 2) return null;

  const sorted = sortable.toSorted(compareItems);

  // 名前を持たない文が元の位置に残るように、並べ替えの要否を判定する。
  const isSameOrder = sorted.every((item, i) => item === sortable[i]);
  if (isSameOrder) return null;

  const newOrder: number[] = members.map(() => 0);
  let cursor = 0;
  for (let i = 0; i < members.length; i++) {
    if (items[i]!.name === null) {
      newOrder[i] = i;
    } else {
      newOrder[i] = members.indexOf(sorted[cursor++]!.member);
    }
  }

  return {
    start: extendedStart(members[0]!),
    end: members[members.length - 1]!.end!,
    members,
    newOrder,
  };
}

/** 名前空間の並べ替え計画を、ネストを考慮してテキストへ変換するための置換ノード。 */
type ReplacementNode = {
  start: number;
  end: number;
  members: Statement[];
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
 * 名前空間の本体のメンバー領域を並べ替えたテキストを返す。
 *
 * メンバーのテキストは元のソースから切り出し (付随するコメントを含む)、
 * メンバー間のセパレーター (改行やインデント) は元の順序のまま維持する。
 * ネストした名前空間の並べ替えは、子の置換ノードを適用して反映する。
 */
function renderBody(
  source: string,
  node: ReplacementNode,
  rendered: Map<ReplacementNode, string>,
): string {
  const members = node.members;

  // メンバー間のセパレーター (改行やインデント) を元の順序のまま維持する。
  // 次のメンバーの先頭コメントは範囲外に残す。
  const separators: string[] = [];
  for (let i = 0; i < members.length - 1; i++) {
    separators.push(source.slice(members[i]!.end!, extendedStart(members[i + 1]!)));
  }

  const parts: string[] = [];
  for (let i = 0; i < node.newOrder.length; i++) {
    const member = members[node.newOrder[i]!]!;
    // メンバーの中にネストした名前空間の本体があれば、その並べ替え結果を反映する。
    const text = renderRange(source, extendedStart(member), member.end!, node.children, rendered);
    parts.push(text);
    if (i < separators.length) {
      parts.push(separators[i]!);
    }
  }
  return parts.join("");
}

/**
 * ソース内の型名前空間のメンバーを並べ替える。
 *
 * 名前空間 (`namespace X { ... }`) の型エクスポートとネストした名前空間を
 * 「{@linkcode FIXED_ORDER_NAMES} の順 → 名前順」の順に並べ替える。
 * パースできない場合は変更しない。
 */
export function sortNamespaceExports(source: string): string {
  const result = parse(source, {
    sourceType: "module",
    plugins: ["typescript", "jsx"],
  });

  const blocks = collectBlocks(result.program);
  const plans = blocks
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
    rendered.set(node, renderBody(source, node, rendered));
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
    fs.globSync("**/*.tsx", { cwd: dir }).map((fullpath) => path.join(dir, fullpath)),
  );

  const changedFiles: string[] = [];

  for (const filePath of files) {
    const source = fs.readFileSync(filePath, "utf-8");
    const formatted = sortNamespaceExports(source);
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
