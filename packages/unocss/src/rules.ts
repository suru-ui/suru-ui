import { isSize, isFontFamily } from "@suru-ui/theme";
import { escapeRegExp } from "@unocss/core";
import type { Rule, CSSEntry } from "@unocss/core";

import {
  type Properties,
  ANY_VALUE,
  COLOR_VALUE,
  MAX_OPACITY,
  LEVEL_CAPTURE,
  LEVEL_PATTERN,
  GAP_PROPERTIES,
  FONT_PROPERTIES,
  SIZE_PROPERTIES,
  COLOR_PROPERTIES,
  INSET_PROPERTIES,
  RADIUS_PROPERTIES,
  SPACE_PROPERTIES,
  TEXT_STYLE_VALUE,
  DEFAULT_NAMESPACE,
  CORNER_SHAPE_VALUE,
  OUTLINE_PROPERTIES,
  NAMESPACED_SEPARATOR,
  DEFAULT_RADIUS_LEVEL,
  CORNER_SHAPE_PROPERTY,
  TEXT_STYLE_PROPERTIES,
  UNNAMESPACED_SEPARATOR,
  BORDER_WIDTH_PROPERTIES,
} from "./constants.js";
import { isTextStyle, isColorToken, textStyleVar, colorTokenVar } from "./tokens.js";

/**
 * ルール生成のオプションです。
 */
export interface CreateRulesOptions {
  /**
   * ユーティリティー名に `sui` の名前空間を付けるかどうかです。
   *
   * `false` にすると `p-sui-2` ではなく `p-2` を生成し、既存のルールを上書きできます。
   *
   * @default true
   */
  namespace?: boolean;
}

/**
 * 正規表現がキャプチャーした値を CSS エントリーに変換する関数です。
 *
 * @param properties ユーティリティーが設定する CSS プロパティーです。
 * @param values 正規表現がキャプチャーした値です。
 * @returns 生成する CSS エントリーです。`undefined` を返すとユーティリティーは生成されません。
 */
type Resolver = (
  properties: readonly string[],
  ...values: (string | undefined)[]
) => CSSEntry[] | undefined;

/**
 * 動的ルールの作成オプションです。
 */
interface PropertyRuleOptions {
  /**
   * 先頭に `-` を付けた負の値を受け付けるかどうかです。
   *
   * 関数を渡すと、受け付けるかどうかをプロパティーごとに判定します。
   */
  negative?: boolean | ((property: string) => boolean);

  /**
   * 値を省略できるかどうかです。
   *
   * `true` にすると区切り文字も含めて値を省略でき、省略した場合は値が `undefined` としてリゾルバーに渡されます。
   */
  optional?: boolean;
}

/**
 * プリセットが提供する UnoCSS ルールの一覧を生成します。
 *
 * @param options 名前空間の有無です。
 * @returns ルールの一覧です。
 */
export function createRules(options: CreateRulesOptions = {}): Rule[] {
  const { namespace = DEFAULT_NAMESPACE } = options;
  const separator = namespace ? NAMESPACED_SEPARATOR : UNNAMESPACED_SEPARATOR;

  return [
    createColorRule(separator),
    createSpaceRule(separator),
    createGapRule(separator),
    createSizeRule(separator),
    createInsetRule(separator),
    createBorderWidthRule(separator),
    createOutlineWidthRule(separator),
    createRadiusRule(separator),
    createFontFamilyRule(separator),
    createTextStyleRule(separator),
  ];
}

function createColorRule(separator: string): Rule {
  return createPropertyRule(
    COLOR_PROPERTIES,
    separator,
    COLOR_VALUE,
    (properties, token, opacity) => {
      if (token === undefined || !isColorToken(token)) return;

      const color = colorTokenVar(token);

      if (opacity === undefined) {
        return toEntries(properties, color);
      }

      if (Number(opacity) > MAX_OPACITY) return;

      return toEntries(properties, `color-mix(in oklab, ${color} ${opacity}%, transparent)`);
    },
  );
}

function createSpaceRule(separator: string): Rule {
  return createPropertyRule(
    SPACE_PROPERTIES,
    separator,
    LEVEL_CAPTURE,
    signedScale("--sui-space"),
    { negative: (property) => property.startsWith("m") },
  );
}

function createGapRule(separator: string): Rule {
  return createPropertyRule(GAP_PROPERTIES, separator, LEVEL_CAPTURE, scale("--sui-gap"));
}

function createSizeRule(separator: string): Rule {
  return createPropertyRule(SIZE_PROPERTIES, separator, ANY_VALUE, (properties, value) => {
    if (value === undefined) return;

    if (isSize(value)) {
      return toEntries(properties, `var(--sui-size-${value})`);
    }

    if (LEVEL_PATTERN.test(value)) {
      return toEntries(properties, `--sui-space(${value})`);
    }

    return;
  });
}

function createInsetRule(separator: string): Rule {
  return createPropertyRule(
    INSET_PROPERTIES,
    separator,
    LEVEL_CAPTURE,
    signedScale("--sui-space"),
    { negative: true },
  );
}

function createBorderWidthRule(separator: string): Rule {
  return createPropertyRule(
    BORDER_WIDTH_PROPERTIES,
    separator,
    LEVEL_CAPTURE,
    scale("--sui-border_width"),
  );
}

function createOutlineWidthRule(separator: string): Rule {
  return createPropertyRule(
    OUTLINE_PROPERTIES,
    separator,
    LEVEL_CAPTURE,
    scale("--sui-border_width"),
  );
}

function createRadiusRule(separator: string): Rule {
  return createPropertyRule(
    RADIUS_PROPERTIES,
    separator,
    LEVEL_CAPTURE,
    (properties, level) => [
      ...toEntries(properties, `--sui-corner_radius(${level ?? DEFAULT_RADIUS_LEVEL})`),
      [CORNER_SHAPE_PROPERTY, CORNER_SHAPE_VALUE],
    ],
    { optional: true },
  );
}

function createFontFamilyRule(separator: string): Rule {
  return createPropertyRule(FONT_PROPERTIES, separator, ANY_VALUE, (properties, family) => {
    if (family === undefined || !isFontFamily(family)) return;

    return toEntries(properties, `var(--sui-font-${family})`);
  });
}

function createTextStyleRule(separator: string): Rule {
  return [
    new RegExp(`^text${separator}${TEXT_STYLE_VALUE}$`),
    (match) => {
      const style = match[1];

      if (style === undefined || !isTextStyle(style)) return;

      return textStyleEntries(style);
    },
  ];
}

/**
 * ユーティリティー名の接頭辞から CSS プロパティーへの対応表をもとに動的ルールを作成します。
 *
 * @param properties ユーティリティー名の接頭辞から CSS プロパティーへの対応表です。
 * @param separator 接頭辞と値の区切り文字です。
 * @param value 値をキャプチャーするグループを含む正規表現のソースです。
 * @param resolve キャプチャーした値を CSS エントリーに変換する関数です。
 * @param options 値の受け付けに関するオプションです。
 * @returns 動的ルールです。
 */
function createPropertyRule(
  properties: Properties,
  separator: string,
  value: string,
  resolve: Resolver,
  options: PropertyRuleOptions = {},
): Rule {
  const { negative = false, optional = false } = options;
  const signed = negative !== false;
  const names = Object.keys(properties).map(escapeRegExp).join("|");
  // 値を省略できる場合は、区切り文字の末尾の `-` も値と一緒に省略できるようにします。
  const scope = optional ? separator.slice(0, -1) : separator;
  const suffix = optional ? `(?:-${value})?` : value;
  const pattern = new RegExp(
    signed ? `^(-?)(${names})${scope}${suffix}$` : `^(${names})${scope}${suffix}$`,
  );
  const canBeNegative = typeof negative === "function" ? negative : () => true;

  return [
    pattern,
    (match) => {
      // 符号付きの場合は `match[1]` が符号になるため、以降のキャプチャーは 1 つ後ろにずれます。
      const offset = signed ? 1 : 0;
      const sign = signed ? (match[1] ?? "") : undefined;
      const name = match[1 + offset];

      if (name === undefined) return;

      if (sign === "-" && !canBeNegative(name)) return;

      const cssProperties = properties[name];

      if (cssProperties === undefined) return;

      const values = signed ? [sign, ...match.slice(2 + offset)] : match.slice(2 + offset);

      return resolve(cssProperties, ...values);
    },
  ];
}

/**
 * 段階の数値を引数にした CSS 関数呼び出しを生成するリゾルバーを作成します。
 *
 * @param reference 呼び出す CSS 関数です。
 * @returns 段階の数値を `reference` の引数にした CSS 関数呼び出しを生成するリゾルバーです。
 */
function scale(reference: string): Resolver {
  return (properties, level) => {
    if (level === undefined) return;

    return toEntries(properties, `${reference}(${level})`);
  };
}

/**
 * 符号を保持したまま段階の数値を引数にした CSS 関数呼び出しを生成するリゾルバーを作成します。
 *
 * @param reference 呼び出す CSS 関数です。
 * @returns 符号付きの段階の数値を `reference` の引数にした CSS 関数呼び出しを生成するリゾルバーです。
 */
function signedScale(reference: string): Resolver {
  return (properties, sign, level) => {
    if (level === undefined) return;

    return toEntries(properties, `${reference}(${sign ?? ""}${level})`);
  };
}

function toEntries(properties: readonly string[], value: string): CSSEntry[] {
  return properties.map((property): CSSEntry => [property, value]);
}

function textStyleEntries(style: string): CSSEntry[] {
  return TEXT_STYLE_PROPERTIES.map((property): CSSEntry => [
    property.replaceAll("_", "-"),
    textStyleVar(style, property),
  ]);
}
