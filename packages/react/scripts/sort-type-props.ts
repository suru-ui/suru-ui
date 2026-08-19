import * as fs from "node:fs";
import * as path from "node:path";

import { parse } from "@babel/parser";
import type { Expression, Node, TSInterfaceBody, TSTypeElement, TSTypeLiteral } from "@babel/types";

/** 対象ファイルのディレクトリー。 */
const TARGET_DIRS = ["src", "stories"];

/** 型の本体 (`{ ... }` の部分)。 */
type TypeBody = TSTypeLiteral | TSInterfaceBody;

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

/** AST を走査して型の本体を収集する。 */
function collectTypeBodies(root: Node, result: TypeBody[] = []): TypeBody[] {
  if (root.type === "TSTypeLiteral" || root.type === "TSInterfaceBody") {
    result.push(root);
  }
  for (const key of Object.keys(root) as (keyof Node)[]) {
    const value = root[key];
    if (isNode(value)) {
      collectTypeBodies(value, result);
    } else if (Array.isArray(value)) {
      for (const item of value) {
        if (isNode(item)) {
          collectTypeBodies(item, result);
        }
      }
    }
  }
  return result;
}

/** 型の本体のメンバー一覧を返す。 */
function getMembers(body: TypeBody): TSTypeElement[] {
  return body.type === "TSTypeLiteral" ? body.members : body.body;
}

/**
 * 並べ替えのキーにするプロパティー名を返す。
 *
 * プロパティー署名とメソッド署名だけが対象で、呼び出し・構築・インデックス
 * 署名 (`(...) => ...`、`new (...)`、`[key: string]: ...`) は名前を持たないため
 * `null` を返す。計算されたキー (`[expr]`) は名前を抽出できないため `null` を返す。
 */
function getMemberName(member: TSTypeElement): string | null {
  let key: Expression | null = null;
  if (member.type === "TSPropertySignature" || member.type === "TSMethodSignature") {
    key = member.key;
  }
  if (key === null) return null;
  if (key.type === "Identifier") return key.name;
  if (key.type === "StringLiteral" || key.type === "NumericLiteral") return String(key.value);
  return null;
}

/**
 * 2 つのメンバーの比較関数。プロパティー名の辞書順で並べる。
 */
function compareItems(a: { name: string }, b: { name: string }): number {
  return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
}

/**
 * メンバーの開始位置を返す。
 *
 * プロパティーに付随する JSDoc などのコメントはメンバーと一緒に移動するため、
 * 先頭のコメントの開始位置まで範囲を広げる。Babel 8 はコメントを次の
 * メンバーの leading コメントとしても付与するため、trailing コメントは
 * ここで扱わない (重複してしまう)。
 */
function extendedStart(member: TSTypeElement): number {
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
 * 型の本体のメンバーを並べ替えた結果を返す。
 *
 * 名前を持たないメンバー (呼び出し・構築・インデックス署名) は位置を維持し、
 * それ以外のプロパティーとメソッドを名前順に並べ替える。
 *
 * @returns 変更が必要な場合は計画、不要な場合は `null`。
 */
function planReplacement(body: TypeBody): {
  start: number;
  end: number;
  members: TSTypeElement[];
  /** 新しい位置 `i` に置くメンバーの元インデックス。 */
  newOrder: number[];
} | null {
  const members = getMembers(body);
  const items = members.map((member) => ({ member, name: getMemberName(member) }));

  const sortable = items.filter(
    (item): item is { member: TSTypeElement; name: string } => item.name !== null,
  );
  if (sortable.length < 2) return null;

  const sorted = sortable.toSorted(compareItems);

  // 名前を持たないメンバーが元の位置に残るように、並べ替えの要否を判定する。
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

/** 型の本体の並べ替え計画を、ネストを考慮してテキストへ変換するための置換ノード。 */
type ReplacementNode = {
  start: number;
  end: number;
  members: TSTypeElement[];
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
 * 型の本体のメンバー領域を並べ替えたテキストを返す。
 *
 * メンバーのテキストは元のソースから切り出し (付随するコメントを含む)、
 * メンバー間のセパレーター (改行やインデント) は元の順序のまま維持する。
 * メンバーの型注釈に含まれるネストした型の並べ替えは、子の置換ノードを
 * 適用して反映する。
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

  // 元の最後のメンバーが末尾にセミコロンを持つ場合 (複数行の書き方) は、
  // 並べ替え後も最後のメンバーにセミコロンを残す。持たない場合
  // (1 行の書き方 `{ a: 1, ... }`) は、最後のメンバーからセミコロンを除く。
  const lastText = source.slice(
    extendedStart(members[members.length - 1]!),
    members[members.length - 1]!.end!,
  );
  const retainsLastSemicolon = lastText.endsWith(";");

  const parts: string[] = [];
  for (let i = 0; i < node.newOrder.length; i++) {
    const member = members[node.newOrder[i]!]!;
    const isLast = i === node.newOrder.length - 1;
    // メンバーの型注釈にネストした型の本体があれば、その並べ替え結果を反映する。
    let text = renderRange(source, extendedStart(member), member.end!, node.children, rendered);
    if (isLast) {
      // 末尾のセミコロンを Babel の範囲から外して揃える。
      if (!retainsLastSemicolon && text.endsWith(";")) {
        text = text.slice(0, -1);
      }
    } else if (!text.endsWith(";")) {
      text = `${text};`;
    }
    parts.push(text);
    if (i < separators.length) {
      parts.push(separators[i]!);
    }
  }
  return parts.join("");
}

/**
 * ソース内の型定義のプロパティーを名前順に並べ替える。
 *
 * 型リテラル (`type X = { ... }`) とインターフェースの本体 (`interface X { ... }`)
 * のプロパティーとメソッドを対象に、プロパティー名の辞書順で並べ替える。
 * パースできない場合は変更しない。
 */
export function sortTypeProps(source: string): string {
  const result = parse(source, {
    sourceType: "module",
    plugins: ["typescript", "jsx"],
  });

  const bodies = collectTypeBodies(result.program);
  const plans = bodies
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
    const formatted = sortTypeProps(source);
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
