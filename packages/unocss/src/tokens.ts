import { COLORS, COLOR_TEMPLATES } from "@suru-ui/theme";

/**
 * 配色テンプレートが持つ部分の一覧です。
 *
 * - `canvas`: 背景色
 * - `border`: 枠線色
 * - `canvas_text`: 背景上の文字色
 */
export const TEMPLATE_PARTS = ["canvas", "border", "canvas_text"] as const;

/**
 * 配色テンプレートが持つ部分です。
 */
export type TemplatePart = (typeof TEMPLATE_PARTS)[number];

/**
 * 配色テンプレートの強調度の一覧です。
 *
 * `normal` が基準で、`subtle` と `strong` はそれぞれ `hover` と `active` の状態に対応します。
 */
export const PROMINENCES = ["normal", "subtle", "strong"] as const;

/**
 * 配色テンプレートの強調度です。
 */
export type Prominence = (typeof PROMINENCES)[number];

/**
 * 色スケールが持つ段階の一覧です。
 *
 * 数値が小さいほどテーマの背景色に近く、大きいほどコントラストが強くなります。
 *
 * グレーだけは両端の `0` と `100` を追加で持ちます。詳しくは {@link GREY_COLOR_STEPS} を参照してください。
 */
export const COLOR_STEPS = [5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 85, 90, 95] as const;

/**
 * グレーの色スケールが持つ段階の一覧です。
 *
 * 他の色より広い両端の `0` と `100` を持ちます。
 */
export const GREY_COLOR_STEPS = [0, ...COLOR_STEPS, 100] as const;

/**
 * 文字スタイルが持つ書体の一覧です。
 *
 * `dns` は太さ `m` を持たないため、`dns` の `m` を含む文字スタイルは生成されません。
 */
export const TEXT_FAMILIES = ["dns", "oln", "std"] as const;

/**
 * 文字スタイルが持つ書体です。
 */
export type TextFamily = (typeof TEXT_FAMILIES)[number];

/**
 * 文字スタイルが持つ大きさの一覧です。
 */
export const TEXT_SIZES = ["sm", "md", "lg", "xl", "2xl", "3xl", "4xl"] as const;

/**
 * 文字スタイルが持つ大きさです。
 */
export type TextSize = (typeof TEXT_SIZES)[number];

/**
 * 文字スタイルが持つ太さの一覧です。
 *
 * - `n`: 標準 (400)
 * - `m`: 中太 (500)
 * - `b`: 太字 (700)
 */
export const TEXT_WEIGHTS = ["n", "m", "b"] as const;

/**
 * 文字スタイルが持つ太さです。
 */
export type TextWeight = (typeof TEXT_WEIGHTS)[number];

/**
 * 色トークンであるかを判定するための集合です。`sui-` を含まない名前を持ちます。
 */
export const COLOR_TOKENS: ReadonlySet<string> = createColorTokens();

/**
 * 文字スタイルであるかを判定するための集合です。`text-sui-` を含まない名前を持ちます。
 */
export const TEXT_STYLES: ReadonlySet<string> = createTextStyles();

/**
 * 色トークンの名から、その値を参照する CSS カスタムプロパティーの式を返します。
 *
 * @param token 色トークンの名前です。`sui-` を含みません。
 * @returns `var()` による参照式です。
 */
export function colorTokenVar(token: string): string {
  return `var(--sui-${token})`;
}

/**
 * 色トークンの名前であるかを判定します。
 *
 * @param token 色トークンの名前です。`sui-` を含みません。
 */
export function isColorToken(token: string): boolean {
  return COLOR_TOKENS.has(token);
}

/**
 * 文字スタイルの名前であるかを判定します。
 *
 * @param style 文字スタイルの名前です。`text-sui-` を含みません。
 */
export function isTextStyle(style: string): boolean {
  return TEXT_STYLES.has(style);
}

/**
 * 文字スタイルの名から、指定したプロパティーの値を参照する CSS カスタムプロパティーの式を返します。
 *
 * @param style 文字スタイルの名前です。`text-sui-` を含みません。
 * @param property 参照するプロパティーです。
 * @returns `var()` による参照式です。
 */
export function textStyleVar(
  style: string,
  property: "font_size" | "font_weight" | "letter_spacing" | "line_height",
): string {
  return `var(--sui-text-${style}-${property})`;
}

function createColorTokens(): ReadonlySet<string> {
  const tokens = new Set<string>([
    "canvas-1",
    "canvas-2",
    "canvas_text-1",
    "canvas_text-2",
    "canvas_text-3",
    "disabled-canvas-1",
    "disabled-canvas-2",
    "disabled-canvas_text-1",
    "disabled-canvas_text-2",
    "tooltip-canvas",
    "tooltip-canvas_text",
    "border-1",
    "border-2",
    "border-3",
    "backdrop-color",
    "focusring_color",
  ]);

  for (const color of COLORS) {
    const steps = color === "grey" ? GREY_COLOR_STEPS : COLOR_STEPS;

    for (const step of steps) {
      tokens.add(`${color}-${step}`);
      tokens.add(`${color}-alpha-${step}`);
    }

    for (const template of COLOR_TEMPLATES) {
      for (const part of TEMPLATE_PARTS) {
        for (const prominence of PROMINENCES) {
          tokens.add(`${color}-${template}-${part}-${prominence}`);
        }

        tokens.add(`disabled-${template}-${part}`);
      }
    }
  }

  return tokens;
}

function createTextStyles(): ReadonlySet<string> {
  const styles = new Set<string>();

  for (const family of TEXT_FAMILIES) {
    for (const size of TEXT_SIZES) {
      for (const weight of textWeights(family)) {
        styles.add(`${family}-${size}-${weight}`);
      }
    }
  }

  return styles;
}

function textWeights(family: TextFamily): readonly TextWeight[] {
  return family === "dns" ? ["n", "b"] : TEXT_WEIGHTS;
}
