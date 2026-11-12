import * as fs from "node:fs";
import * as path from "node:path";

import { parse } from "@babel/parser";
import type { Node, Statement, TSModuleBlock, TSModuleDeclaration } from "@babel/types";

/** 対象ファイルのディレクトリー。 */
const TARGET_DIRS = ["src"];

/**
 * 名前順より先に固定で並べる型エクスポートの名前。
 *
 * 文字列は完全一致、正規表現はパターン一致で判定する。
 * 配列の順序がそのまま並び順になる。ここにない名前は名前順になる。
 * 特定の名前空間に限った固定順は {@linkcode NAMESPACE_FIXED_ORDERS} で指定する。
 */
const FIXED_ORDER_NAMES: readonly (string | RegExp)[] = [
  "State",
  "Props",
  "SlotProps",
  "Context",
  /[a-z]Context$/u,
];

/** 特定の名前空間に限って名前順より先に固定で並べる型エクスポートの名前。 */
export type NamespaceFixedOrder = {
  /**
   * 名前順より先に固定で並べる型エクスポートの名前。
   *
   * 文字列は完全一致、正規表現はパターン一致で判定します。
   * 配列の順序がそのまま並び順になります。
   * 一致した指定は設定順に結合し、{@linkcode FIXED_ORDER_NAMES} より先に並べます。
   */
  names: readonly (string | RegExp)[];

  /**
   * 対象の名前空間。
   *
   * 文字列は完全一致、正規表現はパターン一致で判定する。
   * ネストした名前空間は直近の名前で判定する。
   */
  namespace: string | RegExp;
};

/**
 * 特定の名前空間に限って適用する固定順の指定。
 *
 * 空の場合はすべての名前空間で {@linkcode FIXED_ORDER_NAMES} のみに従う。
 */
const NAMESPACE_FIXED_ORDERS: readonly NamespaceFixedOrder[] = [
  // Props 系の名前空間は結合順 (`Render & SuruUI & BaseUI & HTML`) に合わせる。
  {
    names: ["Render", "SuruUI", "BaseUI", "HTML"],
    namespace: /Props$/u,
  },
];

/** 並べ替えのオプション。 */
export type SortOptions = {
  /**
   * 特定の名前空間に限って適用する固定順の指定。
   *
   * 省略した場合は {@linkcode NAMESPACE_FIXED_ORDERS} を使う。
   */
  namespaceFixedOrders?: readonly NamespaceFixedOrder[] | undefined;
};

/** 名前空間の本体 (`{ ... }` の部分)。 */
type Block = TSModuleBlock;

/** 名前空間ごとの並べ替え順序。 */
type SortOrder = {
  /** この名前空間で有効な固定順の名前 (名前空間固有の指定と全体の指定)。 */
  fixedNames: readonly (string | RegExp)[];

  /** 名前順の型エクスポートの分類グループ。 */
  namedGroup: number;

  /** ネストした名前空間の分類グループ。 */
  namespaceGroup: number;
};

/**
 * 指定に名前が一致するかを返す。
 *
 * 文字列は完全一致、正規表現はパターン一致で判定する。
 * `g` フラグ付き正規表現の `lastIndex` の影響を受けないようにする。
 */
function matchesName(pattern: string | RegExp, name: string): boolean {
  if (typeof pattern === "string") {
    return pattern === name;
  }

  pattern.lastIndex = 0;

  return pattern.test(name);
}

/**
 * 名前空間に有効な並べ替え順序を返す。
 *
 * 名前に一致した固有の指定を {@linkcode FIXED_ORDER_NAMES} より先に置く。
 */
function getSortOrder(
  namespaceName: string,
  namespaceFixedOrders: readonly NamespaceFixedOrder[],
): SortOrder {
  const fixedNames = [
    ...namespaceFixedOrders
      .filter((entry) => matchesName(entry.namespace, namespaceName))
      .flatMap((entry) => entry.names),
    ...FIXED_ORDER_NAMES,
  ];

  return {
    fixedNames,
    namedGroup: fixedNames.length,
    namespaceGroup: fixedNames.length + 1,
  };
}

/**
 * 型名前空間のメンバーの分類グループ。
 *
 * 固定順の名前はその位置をグループとし、残りは名前順にする。
 * グループ番号がそのまま並び順になる。
 */
function getGroup(fixedNames: readonly (string | RegExp)[], name: string): number {
  const index = fixedNames.findIndex((pattern) => matchesName(pattern, name));

  return index === -1 ? fixedNames.length : index;
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

/** 並べ替え対象の名前空間。 */
type NamespaceBlock = {
  /** 名前空間の本体 (`{ ... }` の部分)。 */
  body: Block;

  /** 名前空間の名前 (`namespace A.B` は `"A.B"`)。 */
  name: string;
};

/** 名前空間の宣言名をドット区切りで返す。 */
function getNamespaceName(id: TSModuleDeclaration["id"]): string {
  if (id.type === "TSQualifiedName") {
    return `${getNamespaceName(id.left)}.${id.right.name}`;
  }

  if (id.type === "ThisExpression") {
    return "this";
  }

  return id.type === "Identifier" ? id.name : id.value;
}

/** AST を走査して名前空間を収集する。 */
function collectBlocks(root: Node, result: NamespaceBlock[] = []): NamespaceBlock[] {
  if (
    root.type === "TSModuleDeclaration" &&
    root.kind === "namespace" &&
    root.body?.type === "TSModuleBlock"
  ) {
    result.push({
      body: root.body,
      name: getNamespaceName(root.id),
    });
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
 * 型エクスポート (`export type X = ...`) は名前を持ち、ネストした名前空間 (`export namespace X { ... }`) も名前を持つ。それ以外の文は名前を持たないため `null` を返す。
 */
function getMemberInfo(
  member: Statement,
  sort: SortOrder,
): {
  name: string | null;
  group: number;
  isNamespace: boolean;
} {
  if (member.type !== "ExportNamedDeclaration") {
    return {
      name: null,
      group: -1,
      isNamespace: false,
    };
  }

  const declaration = member.declaration;

  if (declaration?.type === "TSModuleDeclaration" && declaration.id.type === "Identifier") {
    return {
      name: declaration.id.name,
      group: sort.namespaceGroup,
      isNamespace: true,
    };
  }

  if (
    declaration !== null &&
    declaration !== undefined &&
    "type" in declaration &&
    "id" in declaration &&
    (declaration as { id?: { name?: string } }).id?.name !== undefined
  ) {
    // インターフェース名が「I + 大文字」で始まる場合は、先頭の「I」を並び順の対象から除く (`IFoo` → `Foo` として扱う)。
    const name = (declaration as { id: { name: string } }).id.name;

    if (declaration.type === "TSInterfaceDeclaration" && /^I[A-Z]/u.test(name)) {
      return {
        name: name.slice(1),
        group: getGroup(sort.fixedNames, name),
        isNamespace: false,
      };
    }

    return {
      name,
      group: getGroup(sort.fixedNames, name),
      isNamespace: false,
    };
  }

  return {
    name: null,
    group: -1,
    isNamespace: false,
  };
}

/**
 * 2 つのメンバーの比較関数。
 *
 * グループ順で並べ、グループ内は名前の辞書順にする。同名の型と名前空間は型を先にする。名前空間同士もグループが等しいため名前順になる。
 */
function compareItems(
  a: {
    name: string;
    group: number;
    isNamespace: boolean;
  },
  b: {
    name: string;
    group: number;
    isNamespace: boolean;
  },
): number {
  if (a.group !== b.group) {
    return a.group - b.group;
  }

  if (a.name !== b.name) {
    return a.name < b.name ? -1 : 1;
  }

  if (a.isNamespace !== b.isNamespace) {
    return a.isNamespace ? 1 : -1;
  }

  return 0;
}

/**
 * メンバーの開始位置を返す。
 *
 * メンバーに付随する JSDoc などのコメントはメンバーと一緒に移動するため、先頭のコメントの開始位置まで範囲を広げる。Babel 8 はコメントを次のメンバーの leading コメントとしても付与するため、trailing コメントはここで扱わない (重複してしまう)。
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
 * 名前を持たない文は位置を維持し、型エクスポートとネストした名前空間を「名前空間固有の指定 → {@linkcode FIXED_ORDER_NAMES} の順 → 名前順」の順に並べ替える。
 * 固定名で同名の型と名前空間がある場合は、名前空間を型の直後に置く。
 * それ以外のネストした名前空間は末尾に続き、やはり名前順になる。
 *
 * @returns 変更が必要な場合は計画、不要な場合は `null`。
 */
function planReplacement(
  block: Block,
  namespaceName: string,
  namespaceFixedOrders: readonly NamespaceFixedOrder[],
): {
  end: number;
  start: number;
  members: Statement[];

  /** 新しい位置 `i` に置くメンバーの元インデックス。 */
  newOrder: number[];
} | null {
  const members = block.body;
  const sort = getSortOrder(namespaceName, namespaceFixedOrders);
  const items = members.map((member) => ({
    member,
    ...getMemberInfo(member, sort),
  }));

  const sortable = items.filter(
    (
      item,
    ): item is {
      name: string;
      group: number;
      member: Statement;
      isNamespace: boolean;
    } => item.name !== null,
  );

  if (sortable.length < 2) {
    return null;
  }

  // 固定名で同名の型と名前空間がある名前を集める。
  const names = new Set(sortable.map((item) => item.name));
  const pairedFixedNames = new Set(
    [...names].filter((name) => {
      if (getGroup(sort.fixedNames, name) === sort.namedGroup) {
        return false;
      }

      const kinds = sortable.filter((item) => item.name === name);

      return kinds.some((item) => item.isNamespace) && kinds.some((item) => !item.isNamespace);
    }),
  );

  const effective = sortable.map((item) => ({
    ...item,
    group:
      item.isNamespace && pairedFixedNames.has(item.name)
        ? getGroup(sort.fixedNames, item.name)
        : item.group,
  }));

  const sorted = effective.toSorted(compareItems);

  // 名前を持たない文が元の位置に残るように、並べ替えの要否を判定する。
  const isSameOrder = sorted.every((item, i) => item.member === sortable[i]!.member);

  if (isSameOrder) {
    return null;
  }

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
    end: members.at(-1)!.end!,
    start: extendedStart(members[0]!),
    members,
    newOrder,
  };
}

/** 名前空間の並べ替え計画を、ネストを考慮してテキストへ変換するための置換ノード。 */
type ReplacementNode = {
  end: number;
  start: number;
  members: Statement[];

  /** この範囲の内側にある置換ノード (`start` 昇順)。 */
  children: ReplacementNode[];
  newOrder: number[];
};

/** 置換ノードの入れ子関係 (`children`) を構築し、ルートのノードを返す。 */
function buildTree(plans: NonNullable<ReturnType<typeof planReplacement>>[]): ReplacementNode[] {
  const nodes = plans
    .map((plan) => ({
      ...plan,
      children: [] as ReplacementNode[],
    }))
    .toSorted((a, b) => a.start - b.start);

  const roots: ReplacementNode[] = [];
  const stack: ReplacementNode[] = [];

  for (const node of nodes) {
    // 自身を包含する直近のノードを親にする。
    while (stack.length > 0) {
      const parent = stack.at(-1)!;

      if (parent.start <= node.start && node.end <= parent.end) {
        break;
      }

      stack.pop();
    }

    if (stack.length > 0) {
      stack.at(-1)!.children.push(node);
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
 * 名前空間の本体のメンバー領域を並べ替えたテキストを返す。
 *
 * メンバーのテキストは元のソースから切り出し (付随するコメントを含む)、メンバー間のセパレーター (改行やインデント) は元の順序のまま維持する。
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
 * 名前空間 (`namespace X { ... }`) の型エクスポートとネストした名前空間を「名前空間固有の指定 → {@linkcode FIXED_ORDER_NAMES} の順 → 名前順」の順に並べ替える。
 * パースできない場合は変更しない。
 *
 * @param options 並べ替えのオプションです。
 */
export function sortNamespaceExports(source: string, options?: SortOptions): string {
  const result = parse(source, {
    plugins: ["typescript", "jsx"],
    sourceType: "module",
  });

  const namespaceFixedOrders = options?.namespaceFixedOrders ?? NAMESPACE_FIXED_ORDERS;
  const blocks = collectBlocks(result.program);
  const plans = blocks
    .map(({ body, name }) => planReplacement(body, name, namespaceFixedOrders))
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
    fs
      .globSync("**/*.tsx", {
        cwd: dir,
        exclude: ["**/__screenshots__/**"],
      })
      .map((fullpath) => path.join(dir, fullpath)),
  );

  const changedFiles: string[] = [];

  for (const filePath of files) {
    const source = fs.readFileSync(filePath, "utf-8");
    const formatted = sortNamespaceExports(source);

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
