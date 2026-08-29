import * as fs from "node:fs";
import { createRequire } from "node:module";
import * as path from "node:path";

/** 対象ファイルのディレクトリー。 */
const TARGET_DIR = "src";

/**
 * ソート対象の CSS 変数名の接頭辞。
 *
 * 例: `--sui_button-`、`--_sui_chip-`
 */
const TARGET_PREFIX_RE = /^--(?:_)?sui_/;

/** ソート対象の CSS 変数名。 */
const TARGET_VARIABLE_RE = /^--(?:_)?sui_[a-z_]+-/;

/**
 * 独自のトークンを CSS プロパティーへ割り当てる設定。
 *
 * キーは変数名から判定したトークン名、値はそのトークンが同等とみなす
 * CSS プロパティー名のリスト。並び順の解決では、リスト内で最初に
 * stylelint の並び順が存在するプロパティーの位置を採用する。
 *
 * 例: `size` は `width` / `height` と同じグループとして扱う。
 */
const PROPERTY_ALIASES: Readonly<Record<string, readonly string[]>> = {
  size: ["width", "height"],
};

/** stylelint-order の `order/properties-order` に渡すプロパティーグループ。 */
interface PropertyGroup {
  properties: readonly string[];
}

/** postcss のノードで使われるソース位置。 */
interface CssSource {
  start: { offset: number };
  end: { offset: number };
}

/** 実装で使う postcss のノードに必要なフィールドのみを定義したもの。 */
interface CssNode {
  type: string;
  prop?: string | undefined;
  nodes?: CssNode[] | undefined;
  source?: CssSource | undefined;
}

const nodeRequire = createRequire(import.meta.url);

// stylelint (モノレポの devDependency) が依存する postcss を解決してパースに使う。
// postcss 自体はどのパッケージの直接の依存関係でもないため、
// stylelint の依存関係グラフ経由で解決する。
const stylelintRequire = createRequire(nodeRequire.resolve("stylelint"));
const postcss = stylelintRequire("postcss") as {
  parse(css: string, options?: { from?: string }): CssNode;
};

/**
 * stylelint-config-recess-order (`.config/.stylelintrc.json` が継承する設定) が
 * 定義するプロパティーのグループ。stylelint の並び順の情報源としてそのまま使う。
 */
const propertyGroups = (
  nodeRequire("stylelint-config-recess-order/groups") as {
    default: readonly PropertyGroup[];
  }
).default;

/** プロパティー名を stylelint の並び順の位置へ解決するテーブル。 */
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
 * プロパティー名の stylelint の並び順での位置を返す。不明な場合は `null` を返す。
 *
 * `PROPERTY_ALIASES` に登録されたトークンは、割り当てられた CSS プロパティーの位置へ解決する。
 */
function lookupOrder(name: string): number | null {
  const order = PROPERTY_ORDERS.get(name);
  if (order !== undefined) return order;
  const aliases = PROPERTY_ALIASES[name];
  if (aliases === undefined) return null;
  for (const alias of aliases) {
    const aliasOrder = PROPERTY_ORDERS.get(alias);
    if (aliasOrder !== undefined) return aliasOrder;
  }
  return null;
}

/** CSS 変数から判定した CSS プロパティーの情報。 */
interface DeterminedProperty {
  /** `_` を `-` に置き換えた正規化済みのプロパティー名。 */
  name: string;
  /** stylelint の並び順での位置。 */
  order: number;
}

/**
 * CSS 変数名から CSS プロパティーを判定する。
 *
 * 変数名は接頭辞 (`--sui_button-` など) 以降を `-` で分割し、後方の部分列を
 * アンダースコアをハイフンに置き換えて CSS プロパティーと照合する。最も長い
 * 候補を優先し、末尾のセグメントはバリアント (`normal` など) として除外した
 * 候補もその次に試す。どの候補も CSS プロパティーと一致しない場合は
 * `null` を返す。
 *
 * 例:
 * - `--sui_button-border_radius` → `border-radius`
 * - `--sui_button-background_color-normal` → `background-color` (バリアント `normal`)
 * - `--sui_button_content_svg-size` → `size` (`PROPERTY_ALIASES` により `width` / `height` と同一視)
 */
function determineProperty(prop: string): DeterminedProperty | null {
  if (!TARGET_VARIABLE_RE.test(prop)) return null;
  const segments = prop.replace(TARGET_PREFIX_RE, "").split("-");
  for (const excludeVariant of [false, true]) {
    const limit = segments.length - (excludeVariant ? 1 : 0);
    // バリアントを除外すると候補が空になる場合はスキップする。
    for (let start = 0; start < limit; start++) {
      const name = segments
        .slice(start, limit)
        .map((segment) => segment.replaceAll("_", "-"))
        .join("-");
      const order = lookupOrder(name);
      if (order !== null) return { name, order };
    }
  }
  return null;
}

/** ブロック内の各宣言の情報。 */
interface DeclItem {
  /** 元の宣言列におけるインデックス。 */
  index: number;
  /** CSS 変数名。 */
  name: string;
  /**
   * 判定した CSS プロパティーの正規化済みの名前。
   * 判定できない場合は CSS 変数名そのもの。
   */
  propertyName: string;
  /**
   * stylelint の並び順での位置。CSS プロパティーを判定できない場合は `null`。
   */
  order: number | null;
}

/**
 * 同一 CSS プロパティー内では元の順序を維持する比較関数。
 *
 * `Array.prototype.toSorted` は安定ソートであるため、同じ `order` を持つ項目
 * (バリアント違いの変数群) の相対的な順序は変更されない。
 * CSS プロパティーを判定できない変数はブロックの末尾へ移動し、変数名順に並べる。
 */
function compareItems(a: DeclItem, b: DeclItem): number {
  if (a.order === null && b.order === null) {
    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
  }
  if (a.order === null) return 1;
  if (b.order === null) return -1;
  return a.order - b.order;
}

/** ブロック内の連続した宣言領域の並べ替え計画。 */
interface SortPlan {
  /** 宣言領域の開始位置 (先頭の宣言の開始オフセット)。 */
  start: number;
  /** 宣言領域の終了位置 (最後の宣言の終了オフセット)。 */
  end: number;
  /** 元の宣言列。 */
  decls: CssNode[];
  /** 新しい位置 `i` に置く宣言の元インデックス。 */
  newOrder: number[];
}

function offsetStart(node: CssNode): number {
  return node.source!.start.offset;
}

function offsetEnd(node: CssNode): number {
  return node.source!.end.offset;
}

/**
 * 連続する CSS 変数の宣言列の並べ替え計画を作る。
 *
 * `decls` は同じブロック内でネストしたルールなどの節点を挟まずに並んでいる
 * CSS 変数の宣言のみとする。コメントは対象外だが宣言列を分断しないため、
 * `renderRule` が宣言間の区切りとして元の位置に維持する。
 * 宣言が 1 つ以下の場合や並べ替えが必要ない場合は `null` を返す。
 */
function planDecls(decls: CssNode[]): SortPlan | null {
  if (decls.length < 2) return null;

  const items: DeclItem[] = decls.map((decl, index) => {
    const name = decl.prop!;
    const determined = determineProperty(name);
    return {
      index,
      name,
      propertyName: determined?.name ?? name,
      order: determined?.order ?? null,
    };
  });
  const newOrder = items.toSorted(compareItems).map((item) => item.index);
  const isSameOrder = newOrder.every((value, i) => value === i);
  if (isSameOrder) return null;

  return {
    start: offsetStart(decls[0]!),
    end: offsetEnd(decls[decls.length - 1]!),
    decls,
    newOrder,
  };
}

/**
 * AST を走査して並べ替え計画を収集する。ネストしたルールも対象にする。
 *
 * ブロック内の宣言は、ネストしたルールなどの節点を境界に分割された
 * 連続した宣言列ごとに並べ替える。宣言を節点の前後へ移動すると
 * 宣言同士のカスケードの結果が変わる可能性があるため、
 * 宣言列をまたいだ移動は行わない。
 */
function collectPlans(root: CssNode): SortPlan[] {
  const plans: SortPlan[] = [];
  (function visit(nodes: CssNode[] | undefined): void {
    if (nodes === undefined) return;
    let run: CssNode[] = [];
    const flush = (): void => {
      const plan = planDecls(run);
      if (plan !== null) plans.push(plan);
      run = [];
    };
    for (const node of nodes) {
      if (node.type === "comment") continue;
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
 * 計画に従ってルール内の宣言領域を並べ替えたテキストを返す。
 *
 * 宣言のテキストは元のソースから切り出す (複数行の値も含む)。宣言間の
 * セパレーター (改行・インデント・コメント) は元の順序のまま維持する。
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
 * ソース内の CSS 変数の定義ブロックを、CSS プロパティーの stylelint の
 * 並び順に従って並べ替える。
 *
 * 対象はブロック内に連続して並んでいる CSS 変数の定義で、さらに変数名が
 * `--sui_<コンポーネント>-<プロパティー>` の形式を持つものに限られる。
 * 宣言はネストしたルールなどの節点をまたいで移動しないため、
 * 対象外の CSS や CSS 変数は内容・順序ともに変更しない。
 *
 * @returns 変更が必要な場合は並べ替え後のテキスト、不要な場合は元の文字列。
 */
export function sortCssVariables(source: string): string {
  const root = postcss.parse(source, {});
  const plans = collectPlans(root);
  if (plans.length === 0) return source;

  let text = "";
  let cursor = 0;
  for (const plan of plans) {
    text += source.slice(cursor, plan.start);
    text += renderRule(source, plan);
    cursor = plan.end;
  }
  const output = text + source.slice(cursor);

  return output === source ? source : output;
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
