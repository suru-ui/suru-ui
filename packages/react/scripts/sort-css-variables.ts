import * as fs from "node:fs";
import { createRequire } from "node:module";
import * as path from "node:path";

/**
 * 対象ファイルのディレクトリーです。
 */
const TARGET_DIR = "src";

/**
 * ソート対象の CSS 変数名の接頭辞です。
 *
 * 例: `--sui_button-`、`--_sui_chip-`
 */
const TARGET_PREFIX_RE = /^--(?:_)?sui_/;

/**
 * ソート対象の CSS 変数名です。
 */
const TARGET_VARIABLE_RE = /^--(?:_)?sui_[a-z_]+-/;

/**
 * 独自のトークンを CSS プロパティーへ割り当てる設定です。
 *
 * キーは変数名から判定したトークン名、値はそのトークンが同等とみなす CSS プロパティー名のリストです。
 * 並び順の解決では、リスト内で最初に stylelint の並び順が存在するプロパティーの位置を採用します。
 *
 * 例: `size` は `width` / `height` と同じグループとして扱います。
 */
const PROPERTY_ALIASES: Readonly<Record<string, readonly string[]>> = {
  "focusring-color": ["outline-color"],
  "focusring-width": ["outline-width"],
  "focusring-offset": ["outline-offset"],

  size: ["width", "height"],
  "max-size": ["max-width", "max-height"],
  "min-size": ["min-width", "min-height"],
};

/**
 * セグメントから取り除いて CSS プロパティーの照合に使う正規表現の設定です。
 *
 * セグメント内の一致で判定し、一致した部分を取り除きます。
 * 配列の順序で照合し、最初に一致した指定だけを適用します。
 *
 * 例: `/^virtual_/` は `virtual_size` から `virtual_` を取り除き、`size` として扱います。
 */
const SEGMENT_PATTERNS: readonly RegExp[] = [/^virtual_/];

/**
 * CSS プロパティーを判定できない変数のうち、名前順より先に固定で並べるセグメント名です。
 *
 * セグメントは CSS 変数名を `-` で分割した各部分とします。
 * 文字列は完全一致、正規表現はパターン一致で判定します。
 * 配列の順序がそのまま並び順になり、一致するセグメントを持たない変数は名前順になります。
 *
 * 例: 状態を表すセグメントを `idle` → `hover` → `active` → `checked` の順にします。
 */
const FIXED_ORDER_SEGMENTS: readonly (string | RegExp)[] = ["idle", "hover", "active", "checked"];

// -------------------------------------------------------------------------------------------------

/**
 * stylelint-order の `order/properties-order` に渡すプロパティーグループです。
 */
interface PropertyGroup {
  properties: readonly string[];
}

/**
 * postcss のノードで使われるソース位置です。
 */
interface CssSource {
  start: { offset: number };
  end: { offset: number };
}

/**
 * 実装で使う postcss のノードに必要なフィールドのみを定義したものです。
 */
interface CssNode {
  type: string;
  prop?: string | undefined;
  nodes?: CssNode[] | undefined;
  source?: CssSource | undefined;
}

const nodeRequire = createRequire(import.meta.url);

// stylelint が依存する postcss を解決してパースに使います。
// postcss 自体はどのパッケージの直接の依存関係でもないため、stylelint の依存関係グラフ経由で解決します。
const stylelintRequire = createRequire(nodeRequire.resolve("stylelint"));
const postcss = stylelintRequire("postcss") as {
  parse(css: string, options?: { from?: string }): CssNode;
};

/**
 * stylelint-config-recess-order (`.config/.stylelintrc.json` が継承する設定) が定義するプロパティーのグループです。
 * stylelint の並び順の情報源としてそのまま使います。
 */
const propertyGroups = (
  nodeRequire("stylelint-config-recess-order/groups") as {
    default: readonly PropertyGroup[];
  }
).default;

/**
 * プロパティー名を stylelint の並び順の位置へ解決するテーブルです。
 */
const PROPERTY_ORDERS: ReadonlyMap<string, number> = (() => {
  const orders = new Map<string, number>();
  let order = 0;
  for (const group of propertyGroups) {
    for (const property of group.properties) {
      if (!orders.has(property)) {
        orders.set(property, order);
        order++;
      }
    }
  }

  return orders;
})();

/**
 * プロパティー名の stylelint の並び順での位置を返します。
 *
 * `PROPERTY_ALIASES` に一致するトークンは、割り当てられた CSS プロパティーの位置にします。
 */
function lookupOrder(name: string): number | null {
  const order = PROPERTY_ORDERS.get(name);
  if (order !== undefined) {
    return order;
  }

  const aliases = PROPERTY_ALIASES[name];
  if (aliases === undefined) {
    return null;
  }

  for (const alias of aliases) {
    const aliasOrder = PROPERTY_ORDERS.get(alias);
    if (aliasOrder !== undefined) {
      return aliasOrder;
    }
  }

  return null;
}

/**
 * セグメントが指定に一致するかを返します。
 *
 * 文字列は完全一致、正規表現はパターン一致で判定します。
 * `g` フラグ付き正規表現の `lastIndex` の影響を受けないようにします。
 */
function matchesSegment(pattern: string | RegExp, segment: string): boolean {
  if (typeof pattern === "string") {
    return pattern === segment;
  }

  pattern.lastIndex = 0;
  return pattern.test(segment);
}

/**
 * CSS 変数名に一致する固定順のセグメントの位置を返します。
 *
 * 変数名を `-` で分割し、`FIXED_ORDER_SEGMENTS` の順に照合して最初に一致したものを返します。
 */
function lookupFixedOrder(name: string): number | null {
  const segments = name.replace(TARGET_PREFIX_RE, "").split("-");
  for (let i = 0; i < FIXED_ORDER_SEGMENTS.length; i++) {
    const pattern = FIXED_ORDER_SEGMENTS[i]!;
    if (segments.some((segment) => matchesSegment(pattern, segment))) {
      return i;
    }
  }

  return null;
}

/**
 * セグメントから `SEGMENT_PATTERNS` に一致する部分を取り除きます。
 */
function removeSegmentPattern(segment: string): string {
  for (const pattern of SEGMENT_PATTERNS) {
    if (!matchesSegment(pattern, segment)) {
      continue;
    }

    return segment.replace(pattern, "");
  }

  return segment;
}

/**
 * CSS 変数から判定した CSS プロパティーの情報です。
 */
interface DeterminedProperty {
  /**
   * `_` を `-` に置き換えた正規化済みのプロパティー名です。
   */
  name: string;
  /**
   * stylelint の並び順での位置です。
   */
  order: number;
}

/**
 * CSS 変数名から CSS プロパティーを判定します。
 *
 * 変数名を `-` で分割した後方の部分列を CSS プロパティーと照合します。
 * 各セグメントから `SEGMENT_PATTERNS` に一致する部分を取り除き、`_` は `-` に置き換えます。
 * 末尾のセグメントはバリアントとして除外した候補も試し、最も長い候補を優先します。
 *
 * 例:
 * - `--sui_button-border_radius` → `border-radius`
 * - `--sui_button-background_color-normal` → `background-color` (バリアント `normal`)
 * - `--sui_button_content_svg-size` → `size` (`PROPERTY_ALIASES` により `width` / `height` と同一視)
 * - `--sui_alert_dialog_content-virtual_margin_block` → `margin-block` (`SEGMENT_PATTERNS` を取り除いて判定)
 */
function determineProperty(prop: string): DeterminedProperty | null {
  if (!TARGET_VARIABLE_RE.test(prop)) {
    return null;
  }

  const segments = prop.replace(TARGET_PREFIX_RE, "").split("-");
  for (const excludeVariant of [false, true]) {
    const limit = segments.length - (excludeVariant ? 1 : 0);
    // バリアントを除外すると候補が空になる場合はスキップします。
    for (let start = 0; start < limit; start++) {
      const name = segments
        .slice(start, limit)
        .map((segment) => removeSegmentPattern(segment).replaceAll("_", "-"))
        .join("-");
      const order = lookupOrder(name);
      if (order !== null) {
        return { name, order };
      }
    }
  }

  return null;
}

/**
 * CSS 変数名からコンポーネント名部分のネストの深さを求めます。
 *
 * コンポーネント名 (`--` 以降の最初の `-` まで) を `_` で区切ったときの要素数を深さとします。
 * 先頭の `_` (非公開変数の接頭辞) は数えません。
 */
function componentDepth(prop: string): number {
  const component = prop.slice(2).split("-", 1)[0] ?? "";
  return component.split(/_+/).filter((part) => part !== "").length;
}

/**
 * ブロック内の各宣言の情報です。
 */
interface DeclItem {
  /**
   * 元の宣言列におけるインデックスです。
   */
  index: number;
  /**
   * CSS 変数名です。
   */
  name: string;
  /**
   * 判定した CSS プロパティーの正規化済みの名前です。
   * 判定できない場合は CSS 変数名そのものになります。
   */
  propertyName: string;
  /**
   * stylelint の並び順での位置です。
   * CSS プロパティーを判定できない場合は `null` です。
   */
  order: number | null;
  /**
   * `FIXED_ORDER_SEGMENTS` での固定順の位置です。
   * CSS プロパティーを判定できた場合や固定順のセグメントを持たない場合は `null` です。
   */
  fixedOrder: number | null;
  /**
   * コンポーネント名部分のネストの深さです。
   */
  depth: number;
}

/**
 * 宣言の並べ替えに使う比較関数です。
 *
 * コンポーネントのネストが浅い順に並べ、同じ深さでは CSS プロパティーを判定できた変数を stylelint の並び順に従って先に置きます。
 * 判定できない変数は `FIXED_ORDER_SEGMENTS` に一致するセグメントを持つものをその順序で先に、残りを変数名順に並べます。
 * 深さと並び順がともに同じ項目 (バリアント違いの変数群) は安定ソートにより元の順序を維持します。
 */
function compareItems(a: DeclItem, b: DeclItem): number {
  if (a.depth !== b.depth) {
    return a.depth - b.depth;
  }

  if (a.order === null && b.order === null) {
    const aFixed = a.fixedOrder ?? FIXED_ORDER_SEGMENTS.length;
    const bFixed = b.fixedOrder ?? FIXED_ORDER_SEGMENTS.length;
    if (aFixed !== bFixed) {
      return aFixed - bFixed;
    }

    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
  }

  if (a.order === null) {
    return 1;
  }

  if (b.order === null) {
    return -1;
  }

  return a.order - b.order;
}

/**
 * ブロック内の連続した宣言領域の並べ替え計画です。
 */
interface SortPlan {
  /**
   * 宣言領域の開始位置 (先頭の宣言の開始オフセット) です。
   */
  start: number;
  /**
   * 宣言領域の終了位置 (最後の宣言の終了オフセット) です。
   */
  end: number;
  /**
   * 元の宣言列です。
   */
  decls: CssNode[];
  /**
   * 新しい位置 `i` に置く宣言の元インデックスです。
   */
  newOrder: number[];
}

function offsetStart(node: CssNode): number {
  return node.source!.start.offset;
}

function offsetEnd(node: CssNode): number {
  return node.source!.end.offset;
}

/**
 * 連続する CSS 変数の宣言列の並べ替え計画を作ります。
 *
 * `decls` は同じブロック内でネストしたルールなどの節点を挟まずに並んでいる CSS 変数の宣言のみとします。
 * コメントは対象外ですが宣言列を分断しないため、`renderRule` が宣言間の区切りとして元の位置に維持します。
 * 宣言が 1 つ以下の場合や並べ替えが必要ない場合は `null` を返します。
 */
function planDecls(decls: CssNode[]): SortPlan | null {
  if (decls.length < 2) {
    return null;
  }

  const items: DeclItem[] = decls.map((decl, index) => {
    const name = decl.prop!;
    const determined = determineProperty(name);

    return {
      index,
      name,
      propertyName: determined?.name ?? name,
      order: determined?.order ?? null,
      fixedOrder: determined === null ? lookupFixedOrder(name) : null,
      depth: componentDepth(name),
    };
  });

  const newOrder = items.toSorted(compareItems).map((item) => item.index);
  const isSameOrder = newOrder.every((value, i) => value === i);
  if (isSameOrder) {
    return null;
  }

  return {
    start: offsetStart(decls[0]!),
    end: offsetEnd(decls[decls.length - 1]!),
    decls,
    newOrder,
  };
}

/**
 * AST を走査して並べ替え計画を収集します。
 *
 * ブロック内の宣言は、ネストしたルールなどの節点を境界に分割された連続した宣言列ごとに並べ替えます。
 * 宣言を節点の前後へ移動すると宣言同士のカスケードの結果が変わる可能性があるため、宣言列をまたいだ移動は行いません。
 */
function collectPlans(root: CssNode): SortPlan[] {
  const plans: SortPlan[] = [];
  (function visit(nodes: CssNode[] | undefined): void {
    if (nodes === undefined) {
      return;
    }

    let run: CssNode[] = [];
    const flush = (): void => {
      const plan = planDecls(run);
      if (plan !== null) {
        plans.push(plan);
      }

      run = [];
    };

    for (const node of nodes) {
      if (node.type === "comment") {
        continue;
      }

      if (
        node.type === "decl" &&
        typeof node.prop === "string" &&
        TARGET_VARIABLE_RE.test(node.prop)
      ) {
        run.push(node);
        continue;
      }

      flush();
      visit(node.nodes);
    }

    flush();
  })(root.nodes);

  return plans.toSorted((a, b) => a.start - b.start);
}

/**
 * 計画に従ってルール内の宣言領域を並べ替えたテキストを返します。
 *
 * 宣言のテキストは元のソースから切り出します (複数行の値も含む)。
 * 宣言間のセパレーター (改行・インデント・コメント) は元の順序のまま維持します。
 */
function renderRule(source: string, plan: SortPlan): string {
  const { decls, newOrder } = plan;
  const separators: string[] = [];
  for (let i = 0; i < decls.length - 1; i++) {
    separators.push(source.slice(offsetEnd(decls[i]!), offsetStart(decls[i + 1]!)));
  }

  let text = "";
  for (let i = 0; i < newOrder.length; i++) {
    const decl = decls[newOrder[i]!]!;
    text += source.slice(offsetStart(decl), offsetEnd(decl));
    if (i < separators.length) {
      text += separators[i]!;
    }
  }

  return text;
}

/**
 * ソース内の CSS 変数の定義ブロックを、コンポーネントのネストの深さと CSS プロパティーの stylelint の並び順に従って並べ替えます。
 *
 * 対象はブロック内に連続して並んでいる CSS 変数の定義で、変数名が `--sui_<コンポーネント>-<プロパティー>` の形式を持つものに限られます。
 * CSS プロパティーを判定できない変数は、`FIXED_ORDER_SEGMENTS` の固定順と変数名順で並べ替えます。
 * 宣言はネストしたルールなどの節点をまたいで移動しないため、対象外の CSS や CSS 変数は内容・順序ともに変更しません。
 *
 * @returns 変更が必要な場合は並べ替え後のテキスト、不要な場合は元の文字列です。
 */
export function sortCssVariables(source: string): string {
  const root = postcss.parse(source, {});
  const plans = collectPlans(root);
  if (plans.length === 0) {
    return source;
  }

  let text = "";
  let cursor = 0;
  for (const plan of plans) {
    text += source.slice(cursor, plan.start);
    text += renderRule(source, plan);
    cursor = plan.end;
  }

  return text + source.slice(cursor);
}

async function main(): Promise<void> {
  const isCheck = process.argv.includes("--check");
  const files = fs
    .globSync("**/*.css", { cwd: TARGET_DIR })
    .map((filePath) => path.join(TARGET_DIR, filePath));

  const changedFiles: string[] = [];

  for (const filePath of files) {
    const source = fs.readFileSync(filePath, "utf-8");
    const formatted = sortCssVariables(source);
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
