import { COLORS, COLOR_TEMPLATES } from "@suru-ui/theme";

import {
  type TextStyleProperty,
  TEXT_SIZES,
  COLOR_STEPS,
  PROMINENCES,
  TEXT_FAMILIES,
  TEMPLATE_PARTS,
  CONTAINER_SIZES,
  GREY_COLOR_STEPS,
  BASE_COLOR_TOKENS,
  TEXT_FAMILY_WEIGHTS,
} from "./constants.js";

/**
 * 色トークンかどうかを判定するための集合です。要素は `sui-` を含まない名前です。
 */
export const COLOR_TOKENS: ReadonlySet<string> = createColorTokens();

/**
 * 文字スタイルかどうかを判定するための集合です。要素は `text-sui-` を含まない名前です。
 */
export const TEXT_STYLES: ReadonlySet<string> = createTextStyles();

/**
 * コンテナーの大きさかどうかを判定するための集合です。要素は `container-` を含まない名前です。
 */
export const CONTAINER_TOKENS: ReadonlySet<string> = new Set(CONTAINER_SIZES);

/**
 * 色トークンの名前から、その値を参照する CSS カスタムプロパティーの式を返します。
 *
 * @param token 色トークンの名前です。`sui-` を含みません。
 * @returns `var()` による参照式です。
 */
export function colorTokenVar(token: string): string {
  return `var(--sui-${token})`;
}

/**
 * 色トークンの名前かどうかを判定します。
 *
 * @param token 色トークンの名前です。`sui-` を含みません。
 */
export function isColorToken(token: string): boolean {
  return COLOR_TOKENS.has(token);
}

/**
 * 文字スタイルの名前かどうかを判定します。
 *
 * @param style 文字スタイルの名前です。`text-sui-` を含みません。
 */
export function isTextStyle(style: string): boolean {
  return TEXT_STYLES.has(style);
}

/**
 * 文字スタイルの名前から、指定したプロパティーの値を参照する CSS カスタムプロパティーの式を返します。
 *
 * @param style 文字スタイルの名前です。`text-sui-` を含みません。
 * @param property 参照するプロパティーです。
 * @returns `var()` による参照式です。
 */
export function textStyleVar(style: string, property: TextStyleProperty): string {
  return `var(--sui-text-${style}-${property})`;
}

/**
 * コンテナーの大きさかどうかを判定します。
 *
 * @param size コンテナーの大きさです。`container-` を含みません。
 */
export function isContainerSize(size: string): boolean {
  return CONTAINER_TOKENS.has(size);
}

function createColorTokens(): ReadonlySet<string> {
  const tokens = new Set<string>(BASE_COLOR_TOKENS);

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
      }
    }
  }

  for (const template of COLOR_TEMPLATES) {
    for (const part of TEMPLATE_PARTS) {
      tokens.add(`disabled-${template}-${part}`);
    }
  }

  return tokens;
}

function createTextStyles(): ReadonlySet<string> {
  const styles = new Set<string>();

  for (const family of TEXT_FAMILIES) {
    for (const size of TEXT_SIZES) {
      for (const weight of TEXT_FAMILY_WEIGHTS[family]) {
        styles.add(`${family}-${size}-${weight}`);
      }
    }
  }

  return styles;
}
