/**
 * 生成したユーティリティーを出力する CSS カスケードレイヤーです。
 *
 * `@suru-ui/theme` が宣言するレイヤーのうち、コンポーネントのスタイルより前のレイヤーです。
 */
export const SUI_UTILITIES_LAYER = "sui.utilities";

/**
 * 名前空間を無効にしたときに生成したユーティリティーを出力する CSS カスケードレイヤーです。
 *
 * Tailwind CSS と同じ `utilities` レイヤーに出力し、他のプリセットのルールを上書きできるようにします。
 */
export const TW_UTILITIES_LAYER = "utilities";

/**
 * プリセットの名前です。
 */
export const PRESET_NAME = "@suru-ui/unocss";

/**
 * `namespace` オプションの既定値です。
 */
export const DEFAULT_NAMESPACE = true;

/**
 * 名前空間を有効にしたときの、ユーティリティー名の接頭辞と値の区切り文字です。
 */
export const NAMESPACED_SEPARATOR = "-sui-";

/**
 * 名前空間を無効にしたときの、ユーティリティー名の接頭辞と値の区切り文字です。
 */
export const UNNAMESPACED_SEPARATOR = "-";

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
 * `normal` を基準とし、`subtle` と `strong` はそれぞれ `hover` と `active` の状態に対応します。
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
 * グレーだけは両端に `0` と `100` を追加で持ちます。詳しくは {@link GREY_COLOR_STEPS} を参照してください。
 */
export const COLOR_STEPS = [5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 85, 90, 95] as const;

/**
 * グレーの色スケールが持つ段階の一覧です。
 *
 * 他の色と違い、両端に `0` と `100` を持ちます。
 */
export const GREY_COLOR_STEPS = [0, ...COLOR_STEPS, 100] as const;

/**
 * 色スケールや配色テンプレートに依存しない色トークンの名前の一覧です。
 */
export const BASE_COLOR_TOKENS = [
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
] as const;

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
 * - `n`: 標準
 * - `m`: 中太
 * - `b`: 太字
 */
export const TEXT_WEIGHTS = ["n", "m", "b"] as const;

/**
 * 文字スタイルが持つ太さです。
 */
export type TextWeight = (typeof TEXT_WEIGHTS)[number];

/**
 * 文字スタイルの書体ごとに、使用できる太さの一覧です。
 *
 * `dns` は太さ `m` を持ちません。
 */
export const TEXT_FAMILY_WEIGHTS = {
  dns: ["n", "b"] as const,
  oln: TEXT_WEIGHTS,
  std: TEXT_WEIGHTS,
} satisfies Record<TextFamily, readonly TextWeight[]>;

/**
 * 文字スタイルが参照するプロパティーの一覧です。
 *
 * CSS カスタムプロパティーの接尾辞であり、`_` を `-` に置き換えると CSS プロパティー名になります。
 */
export const TEXT_STYLE_PROPERTIES = [
  "font_size",
  "font_weight",
  "letter_spacing",
  "line_height",
] as const;

/**
 * 文字スタイルが参照するプロパティーです。
 */
export type TextStyleProperty = (typeof TEXT_STYLE_PROPERTIES)[number];

/**
 * ユーティリティー名の接頭辞から、設定する CSS プロパティーへの対応表です。
 */
export type Properties = Record<string, readonly string[]>;

/**
 * 色を設定するユーティリティーの対応表です。
 */
export const COLOR_PROPERTIES = {
  bg: ["background-color"],
  text: ["color"],
  border: ["border-color"],
  outline: ["outline-color"],
  fill: ["fill"],
  stroke: ["stroke"],
  caret: ["caret-color"],
  accent: ["accent-color"],
  decoration: ["text-decoration-color"],
} as const satisfies Properties;

/**
 * 余白を設定するユーティリティーの対応表です。
 */
export const SPACE_PROPERTIES = {
  p: ["padding"],
  px: ["padding-inline"],
  py: ["padding-block"],
  ps: ["padding-inline-start"],
  pe: ["padding-inline-end"],
  pt: ["padding-top"],
  pr: ["padding-right"],
  pb: ["padding-bottom"],
  pl: ["padding-left"],
  m: ["margin"],
  mx: ["margin-inline"],
  my: ["margin-block"],
  ms: ["margin-inline-start"],
  me: ["margin-inline-end"],
  mt: ["margin-top"],
  mr: ["margin-right"],
  mb: ["margin-bottom"],
  ml: ["margin-left"],
} as const satisfies Properties;

/**
 * ギャップを設定するユーティリティーの対応表です。
 */
export const GAP_PROPERTIES = {
  gap: ["gap"],
  "gap-x": ["column-gap"],
  "gap-y": ["row-gap"],
} as const satisfies Properties;

/**
 * 大きさを設定するユーティリティーの対応表です。
 */
export const SIZE_PROPERTIES = {
  w: ["width"],
  h: ["height"],
  size: ["width", "height"],
  "min-w": ["min-width"],
  "max-w": ["max-width"],
  "min-h": ["min-height"],
  "max-h": ["max-height"],
} as const satisfies Properties;

/**
 * 位置を設定するユーティリティーの対応表です。
 */
export const INSET_PROPERTIES = {
  inset: ["inset"],
  "inset-x": ["inset-inline"],
  "inset-y": ["inset-block"],
  top: ["top"],
  right: ["right"],
  bottom: ["bottom"],
  left: ["left"],
  start: ["inset-inline-start"],
  end: ["inset-inline-end"],
} as const satisfies Properties;

/**
 * 枠線の幅を設定するユーティリティーの対応表です。
 */
export const BORDER_WIDTH_PROPERTIES = {
  border: ["border-width"],
  "border-x": ["border-inline-width"],
  "border-y": ["border-block-width"],
  "border-t": ["border-top-width"],
  "border-r": ["border-right-width"],
  "border-b": ["border-bottom-width"],
  "border-l": ["border-left-width"],
  "border-s": ["border-inline-start-width"],
  "border-e": ["border-inline-end-width"],
} as const satisfies Properties;

/**
 * アウトラインの幅を設定するユーティリティーの対応表です。
 */
export const OUTLINE_PROPERTIES = {
  outline: ["outline-width"],
} as const satisfies Properties;

/**
 * 角丸を設定するユーティリティーの対応表です。
 */
export const RADIUS_PROPERTIES = {
  rounded: ["border-radius"],
  "rounded-t": ["border-top-left-radius", "border-top-right-radius"],
  "rounded-r": ["border-top-right-radius", "border-bottom-right-radius"],
  "rounded-b": ["border-bottom-right-radius", "border-bottom-left-radius"],
  "rounded-l": ["border-top-left-radius", "border-bottom-left-radius"],
  "rounded-s": ["border-start-start-radius", "border-end-start-radius"],
  "rounded-e": ["border-start-end-radius", "border-end-end-radius"],
  "rounded-tl": ["border-top-left-radius"],
  "rounded-tr": ["border-top-right-radius"],
  "rounded-br": ["border-bottom-right-radius"],
  "rounded-bl": ["border-bottom-left-radius"],
  "rounded-ss": ["border-start-start-radius"],
  "rounded-se": ["border-start-end-radius"],
  "rounded-ee": ["border-end-end-radius"],
  "rounded-es": ["border-end-start-radius"],
} as const satisfies Properties;

/**
 * フォントファミリーを設定するユーティリティーの対応表です。
 */
export const FONT_PROPERTIES = {
  font: ["font-family"],
} as const satisfies Properties;

/**
 * 段階の数値に一致する正規表現のソースです。
 */
export const LEVEL = String.raw`\d+(?:\.\d+)?`;

/**
 * 段階の数値をキャプチャーする正規表現のソースです。
 */
export const LEVEL_CAPTURE = `(${LEVEL})`;

/**
 * 段階の数値に完全一致するかどうかを判定する正規表現です。
 */
export const LEVEL_PATTERN = new RegExp(`^${LEVEL}$`);

/**
 * 値を任意の文字列としてキャプチャーする正規表現のソースです。
 */
export const ANY_VALUE = "(.+)";

/**
 * 色トークンと省略可能な不透明度をキャプチャーする正規表現のソースです。
 */
export const COLOR_VALUE = String.raw`(.+?)(?:/(\d{1,3}))?`;

/**
 * 不透明度の最大値です。
 */
export const MAX_OPACITY = 100;

/**
 * 文字スタイルの名前をキャプチャーする正規表現のソースです。
 */
export const TEXT_STYLE_VALUE = `((?:${TEXT_FAMILIES.join("|")})-.+)`;
