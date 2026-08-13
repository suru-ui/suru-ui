import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

/**
 * `src` の CSS ファイルから、テーマモードごとの配布用 CSS を `dist` に生成します。
 */

// ---------------------------------------------------------------------------
// パス
// ---------------------------------------------------------------------------

const ROOT = resolve(import.meta.dirname, "..");
const SRC = resolve(ROOT, "src");
const DIST = resolve(ROOT, "dist");

// ---------------------------------------------------------------------------
// 設定
// ---------------------------------------------------------------------------

/**
 * テーマモードの一覧です。
 *
 * この並び順が結合ファイルのセクション順になります。モードを追加するときは
 * THEMES にも同じ名前のエントリーを追加してください。
 */
const THEME_MODES = ["dark", "light"] as const;

/** テーマモードです。 */
type ThemeMode = (typeof THEME_MODES)[number];

/**
 * モードごとのセレクター定義です。
 *
 * - `media`: システム設定に追従するためのメディアクエリーです。
 * - `attr`: 手動設定に使う属性セレクターです。
 */
const THEMES = {
  dark: {
    media: "(prefers-color-scheme: dark)",
    attr: '[data-theme="dark"]',
  },
  light: {
    media: "(prefers-color-scheme: light)",
    attr: '[data-theme="light"]',
  },
} satisfies Record<ThemeMode, { media: string; attr: string }>;

/** すべての出力ファイルにそのまま含まれる共通ファイルです。 */
const COMMON_FILES = new Set(["layers.css", "reset.css", "source.css", "utilities.css"]);

/** トークンファイル名からファミリーとモードを取り出します (例: `tokens.suru.dark.css` → `["suru", "dark"]`)。 */
const TOKEN_FILE_RE = /^tokens\.(.+)\.(.+)\.css$/;

/** アルファカラーソースのファイル名からモードを取り出します (例: `source.alpha.dark.css` → `["dark"]`)。 */
const ALPHA_SOURCE_FILE_RE = /^source\.alpha\.(.+)\.css$/;

/** 宣言を包むレイヤーです。 */
type Layer = "sui.source" | "sui.tokens";

// ---------------------------------------------------------------------------
// CSS 生成ヘルパー
// ---------------------------------------------------------------------------

function indent(text: string, level: number): string {
  const pad = "  ".repeat(level);
  return text
    .split("\n")
    .map((line) => (line.length > 0 ? `${pad}${line}` : line))
    .join("\n");
}

/**
 * `{ … }` ブロックの内側から生の宣言を取り出します。
 *
 * `marker` を含む行で始まる最初のブロックを対象に、開き括弧の直後から対応する
 * 閉じ括弧の直前までを返します。行頭・行末の空白を取り除き、空行を除外します。
 *
 * @param content 対象の CSS テキストです。
 * @param marker ブロックの開始行に含まれる文字列です。
 * @returns 宣言の行を改行で連結した文字列です。
 */
function extractDeclarations(content: string, marker: string): string {
  const lines = content.split("\n");
  const startIdx = lines.findIndex((line) => line.includes(marker));

  if (startIdx === -1) {
    throw new Error(
      `Could not find a valid \`${marker} { … }\` block in:\n${content.slice(0, 200)}`,
    );
  }

  let depth = 0;

  for (let i = startIdx; i < lines.length; i++) {
    const line = lines[i]!;
    depth += (line.match(/\{/g) ?? []).length - (line.match(/\}/g) ?? []).length;

    if (depth === 0) {
      return lines
        .slice(startIdx + 1, i)
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .join("\n");
    }
  }

  throw new Error(
    `Could not find the closing brace of the \`${marker} { … }\` block in:\n${content.slice(0, 200)}`,
  );
}

/** トークンファイルの `.layer__sui_tokens { … }` ブロックから宣言を抽出します。 */
function extractTokenDeclarations(content: string): string {
  return extractDeclarations(content, ".layer__sui_tokens");
}

/** アルファカラーソースの `:root { … }` ブロックから宣言を抽出します。 */
function extractSourceDeclarations(content: string): string {
  return extractDeclarations(content, ":root");
}

/**
 * 宣言をセレクター付きのレイヤーブロックに包みます。
 *
 * @param selector 宣言を包むセレクターです。
 * @param declarations ブロックの内側に書く宣言です。
 * @param layer 宣言を包むレイヤーです。
 *
 * @example
 * ```
 * @layer sui.tokens {
 *   :root {
 *     <declarations>
 *   }
 * }
 * ```
 */
function buildLayerBlock(selector: string, declarations: string, layer: Layer): string {
  return [
    `@layer ${layer} {`,
    indent(`${selector} {`, 1),
    indent(declarations, 2),
    indent(`}`, 1),
    `}`,
  ].join("\n");
}

/**
 * 宣言を `:root` のレイヤーブロックに包みます。
 *
 * @param declarations ブロックの内側に書く宣言です。
 * @param layer 宣言を包むレイヤーです。
 * @default "sui.tokens"
 */
function buildRootBlock(declarations: string, layer: Layer = "sui.tokens"): string {
  return buildLayerBlock(":root", declarations, layer);
}

/**
 * 宣言を属性セレクターのレイヤーブロックに包みます。
 *
 * @param mode セレクターを決めるテーマモードです。
 * @param declarations ブロックの内側に書く宣言です。
 * @param layer 宣言を包むレイヤーです。
 * @default "sui.tokens"
 */
function buildAttrBlock(
  mode: ThemeMode,
  declarations: string,
  layer: Layer = "sui.tokens",
): string {
  return buildLayerBlock(THEMES[mode].attr, declarations, layer);
}

/**
 * 宣言をメディアクエリーとレイヤーで包みます。
 *
 * システム設定 (prefers-color-scheme) に追従させるときに使います。
 *
 * @param mode メディアクエリーを決めるテーマモードです。
 * @param declarations ブロックの内側に書く宣言です。
 * @param layer 宣言を包むレイヤーです。
 * @default "sui.tokens"
 */
function buildMediaBlock(
  mode: ThemeMode,
  declarations: string,
  layer: Layer = "sui.tokens",
): string {
  return [
    `@media ${THEMES[mode].media} {`,
    indent(buildLayerBlock(":root", declarations, layer), 1),
    `}`,
  ].join("\n");
}

// ---------------------------------------------------------------------------
// ソースの読み込み
// ---------------------------------------------------------------------------

/** `loadSources` の戻り値です。 */
interface ParsedSources {
  /** 共通ファイルの内容です。 */
  common: string[];
  /** ファミリーごとのモード別トークン宣言です。 */
  tokens: Map<string, Partial<Record<ThemeMode, string>>>;
  /** モード別のアルファカラーソース宣言です。 */
  alpha: Partial<Record<ThemeMode, string>>;
}

/**
 * `src` ディレクトリーの CSS ファイルを読み込み、役割ごとに分類します。
 *
 * - 共通ファイル: 内容をそのまま共通部分に集めます。
 * - `source.alpha.<mode>.css`: `:root` ブロックの中身をモード別に集めます。
 * - `tokens.<family>.<mode>.css`: トークンブロックの中身をファミリーとモードの組に集めます。
 * - 上記のどれにも該当しない CSS ファイル: 無視します。
 */
async function loadSources(): Promise<ParsedSources> {
  const common: string[] = [];
  const tokens = new Map<string, Partial<Record<ThemeMode, string>>>();
  const alpha: Partial<Record<ThemeMode, string>> = {};

  const files = (await readdir(SRC)).filter((name) => name.endsWith(".css"));

  for (const name of files) {
    const content = await readFile(resolve(SRC, name), "utf-8");

    if (COMMON_FILES.has(name)) {
      common.push(content);
      continue;
    }

    const alphaMatch = name.match(ALPHA_SOURCE_FILE_RE);

    if (alphaMatch) {
      const declarations = extractSourceDeclarations(content);
      alpha[parseMode(alphaMatch[1]!, name)] = declarations;
      continue;
    }

    const tokenMatch = name.match(TOKEN_FILE_RE);

    if (tokenMatch) {
      const family = tokenMatch[1]!;
      const declarations = extractTokenDeclarations(content);
      const mode = parseMode(tokenMatch[2]!, name);
      let modes = tokens.get(family);

      if (!modes) {
        modes = {};
        tokens.set(family, modes);
      }

      modes[mode] = declarations;
    }
  }

  return { common, tokens, alpha };
}

/**
 * ファイル名から取り出したモード文字列を検証し、`ThemeMode` として返します。
 *
 * `THEME_MODES` にないモードはエラーにします。
 *
 * @param value ファイル名から取り出したモード文字列です。
 * @param filename エラーメッセージに含めるファイル名です。
 * @returns 検証済みのテーマモードです。
 */
function parseMode(value: string, filename: string): ThemeMode {
  if (!isThemeMode(value)) {
    throw new Error(
      `Unknown theme mode "${value}" in "${filename}". The build cannot generate CSS for unsupported modes. Add "${value}" to THEME_MODES and THEMES in scripts/build-css.ts.`,
    );
  }

  return value;
}

function isThemeMode(value: string): value is ThemeMode {
  return (THEME_MODES as readonly string[]).includes(value);
}

// ---------------------------------------------------------------------------
// 出力の生成
// ---------------------------------------------------------------------------

/**
 * モードごとのトークン宣言がすべて揃っている場合に `true` を返します。
 *
 * 結合ファイルは dark と light の両方が揃っているときだけ生成するため、
 * 判定に使います。
 */
function isComplete(
  modes: Readonly<Partial<Record<ThemeMode, string>>>,
): modes is Readonly<Record<ThemeMode, string>> {
  return THEME_MODES.every((mode) => modes[mode] !== undefined);
}

/**
 * 各モードの宣言を同じ包み方でセクションに変換します。
 *
 * モードの並び順に、アルファカラーソース (存在する場合のみ) とトークンの
 * ブロックを並べます。
 *
 * @param wrap 宣言を 1 つのブロックに包む関数です。
 * @param alpha モード別のアルファカラーソース宣言です。
 * @param tokens モード別のトークン宣言です。
 * @returns ブロックの配列です。
 */
function buildModeSections(
  wrap: (mode: ThemeMode, declarations: string, layer: Layer) => string,
  alpha: Readonly<Partial<Record<ThemeMode, string>>>,
  tokens: Readonly<Record<ThemeMode, string>>,
): string[] {
  return THEME_MODES.flatMap((mode) => {
    const source = alpha[mode];
    const token = tokens[mode];

    return [...(source ? [wrap(mode, source, "sui.source")] : []), wrap(mode, token, "sui.tokens")];
  });
}

/**
 * 1 つのファミリーの CSS ファイルを生成して `dist` に書き出します。
 *
 * - `<family>-<mode>.css`: `:root` と属性セレクターの両方にトークンを書き出します。
 * - `<family>.css`: メディアクエリー (システム設定) のブロックを先に、属性セレクター
 *   (手動設定) のブロックを後に並べます。後勝ちの CSS 規則により、手動設定が
 *   システム設定に優先します。dark と light の両方のモードが揃っている場合のみ
 *   生成します。
 *
 * @param family ファミリー名です。
 * @param tokens モード別のトークン宣言です。
 * @param alpha モード別のアルファカラーソース宣言です。
 * @param commonBlock すべての出力に含まれる共通部分です。
 */
async function buildFamily(
  family: string,
  tokens: Readonly<Partial<Record<ThemeMode, string>>>,
  alpha: Readonly<Partial<Record<ThemeMode, string>>>,
  commonBlock: string,
): Promise<void> {
  for (const mode of THEME_MODES) {
    const token = tokens[mode];

    if (!token) {
      continue;
    }

    const source = alpha[mode];
    const sections = [
      ...(source ? [buildRootBlock(source, "sui.source")] : []),
      buildRootBlock(token),
      buildAttrBlock(mode, token),
    ];

    await writeOutput(`${family}-${mode}.css`, [commonBlock, ...sections]);
  }

  if (isComplete(tokens)) {
    const sections = [
      ...buildModeSections(buildMediaBlock, alpha, tokens),
      ...buildModeSections(buildAttrBlock, alpha, tokens),
    ];

    await writeOutput(`${family}.css`, [commonBlock, ...sections]);
  }
}

/**
 * セクションを空行で連結して `dist` に書き出します。
 *
 * @param filename 出力ファイル名です。
 * @param sections 出力に含めるセクションの配列です。
 */
async function writeOutput(filename: string, sections: string[]): Promise<void> {
  const content = `${sections.join("\n\n")}\n`;
  await writeFile(resolve(DIST, filename), content);
}

// ---------------------------------------------------------------------------
// メイン
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  const { common, tokens, alpha } = await loadSources();
  const commonBlock = common.join("\n\n");

  await mkdir(DIST, { recursive: true });

  for (const [family, modes] of tokens) {
    await buildFamily(family, modes, alpha, commonBlock);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
