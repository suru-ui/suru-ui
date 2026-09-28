import { isFontFamily, isSize } from "@suru-ui/theme";
import type { CSSEntry, Rule } from "@unocss/core";

import { colorTokenVar, isColorToken, isTextStyle, textStyleVar } from "./tokens.js";

const COLOR_PROPERTIES = {
  bg: ["background-color"],
  text: ["color"],
  border: ["border-color"],
  outline: ["outline-color"],
  fill: ["fill"],
  stroke: ["stroke"],
  caret: ["caret-color"],
  accent: ["accent-color"],
  decoration: ["text-decoration-color"],
} as const satisfies Record<string, readonly string[]>;

const SPACE_PROPERTIES = {
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
} as const satisfies Record<string, readonly string[]>;

const GAP_PROPERTIES = {
  gap: ["gap"],
  "gap-x": ["column-gap"],
  "gap-y": ["row-gap"],
} as const satisfies Record<string, readonly string[]>;

const SIZE_PROPERTIES = {
  w: ["width"],
  h: ["height"],
  size: ["width", "height"],
  "min-w": ["min-width"],
  "max-w": ["max-width"],
  "min-h": ["min-height"],
  "max-h": ["max-height"],
} as const satisfies Record<string, readonly string[]>;

const INSET_PROPERTIES = {
  inset: ["inset"],
  "inset-x": ["inset-inline"],
  "inset-y": ["inset-block"],
  top: ["top"],
  right: ["right"],
  bottom: ["bottom"],
  left: ["left"],
  start: ["inset-inline-start"],
  end: ["inset-inline-end"],
} as const satisfies Record<string, readonly string[]>;

const BORDER_WIDTH_PROPERTIES = {
  border: ["border-width"],
  "border-x": ["border-inline-width"],
  "border-y": ["border-block-width"],
  "border-t": ["border-top-width"],
  "border-r": ["border-right-width"],
  "border-b": ["border-bottom-width"],
  "border-l": ["border-left-width"],
  "border-s": ["border-inline-start-width"],
  "border-e": ["border-inline-end-width"],
} as const satisfies Record<string, readonly string[]>;

const RADIUS_PROPERTIES = {
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
} as const satisfies Record<string, readonly string[]>;

const LEVEL_PATTERN = /^\d+(?:\.\d+)?$/;

const colorRule: Rule = [
  new RegExp(`^(${Object.keys(COLOR_PROPERTIES).join("|")})-sui-(.+?)(?:/(\\d{1,3}))?$`),
  (match) => {
    const property = match[1];
    const token = match[2];
    const opacity = match[3];

    if (property === undefined || token === undefined) return;
    if (!isKeyOf(COLOR_PROPERTIES, property) || !isColorToken(token)) return;

    const color = colorTokenVar(token);

    if (opacity === undefined) {
      return toEntries(COLOR_PROPERTIES[property], color);
    }

    if (Number(opacity) > 100) return;

    return toEntries(
      COLOR_PROPERTIES[property],
      `color-mix(in oklab, ${color} ${opacity}%, transparent)`,
    );
  },
];

const spaceRule: Rule = [
  new RegExp(`^(-?)(${Object.keys(SPACE_PROPERTIES).join("|")})-sui-(\\d+(?:\\.\\d+)?)$`),
  (match) => {
    const sign = match[1];
    const property = match[2];
    const level = match[3];

    if (sign === undefined || property === undefined || level === undefined) return;
    if (!isKeyOf(SPACE_PROPERTIES, property)) return;
    if (sign === "-" && !property.startsWith("m")) return;

    return toEntries(SPACE_PROPERTIES[property], `--sui-space(${sign}${level})`);
  },
];

const gapRule: Rule = [
  new RegExp(`^(${Object.keys(GAP_PROPERTIES).join("|")})-sui-(\\d+(?:\\.\\d+)?)$`),
  (match) => {
    const property = match[1];
    const level = match[2];

    if (property === undefined || level === undefined) return;
    if (!isKeyOf(GAP_PROPERTIES, property)) return;

    return toEntries(GAP_PROPERTIES[property], `--sui-gap(${level})`);
  },
];

const sizeRule: Rule = [
  new RegExp(`^(${Object.keys(SIZE_PROPERTIES).join("|")})-sui-(.+)$`),
  (match) => {
    const property = match[1];
    const value = match[2];

    if (property === undefined || value === undefined) return;
    if (!isKeyOf(SIZE_PROPERTIES, property)) return;

    if (isSize(value)) {
      return toEntries(SIZE_PROPERTIES[property], `var(--sui-size-${value})`);
    }

    if (LEVEL_PATTERN.test(value)) {
      return toEntries(SIZE_PROPERTIES[property], `--sui-space(${value})`);
    }

    return;
  },
];

const insetRule: Rule = [
  new RegExp(`^(-?)(${Object.keys(INSET_PROPERTIES).join("|")})-sui-(\\d+(?:\\.\\d+)?)$`),
  (match) => {
    const sign = match[1];
    const property = match[2];
    const level = match[3];

    if (sign === undefined || property === undefined || level === undefined) return;
    if (!isKeyOf(INSET_PROPERTIES, property)) return;

    return toEntries(INSET_PROPERTIES[property], `--sui-space(${sign}${level})`);
  },
];

const borderWidthRule: Rule = [
  new RegExp(`^(${Object.keys(BORDER_WIDTH_PROPERTIES).join("|")})-sui-(\\d+(?:\\.\\d+)?)$`),
  (match) => {
    const property = match[1];
    const level = match[2];

    if (property === undefined || level === undefined) return;
    if (!isKeyOf(BORDER_WIDTH_PROPERTIES, property)) return;

    return toEntries(BORDER_WIDTH_PROPERTIES[property], `--sui-border_width(${level})`);
  },
];

const outlineWidthRule: Rule = [
  /^outline-sui-(\d+(?:\.\d+)?)$/,
  (match) => {
    const level = match[1];

    if (level === undefined) return;

    return { "outline-width": `--sui-border_width(${level})` };
  },
];

const radiusRule: Rule = [
  new RegExp(`^(${Object.keys(RADIUS_PROPERTIES).join("|")})-sui-(\\d+(?:\\.\\d+)?)$`),
  (match) => {
    const property = match[1];
    const level = match[2];

    if (property === undefined || level === undefined) return;
    if (!isKeyOf(RADIUS_PROPERTIES, property)) return;

    return toEntries(RADIUS_PROPERTIES[property], `--sui-corner_radius(${level})`);
  },
];

const fontFamilyRule: Rule = [
  /^font-sui-(.+)$/,
  (match) => {
    const family = match[1];

    if (family === undefined || !isFontFamily(family)) return;

    return { "font-family": `var(--sui-font-${family})` };
  },
];

const textStyleRule: Rule = [
  /^text-sui-((?:dns|oln|std)-.+)$/,
  (match) => {
    const style = match[1];

    if (style === undefined || !isTextStyle(style)) return;

    return textStyleEntries(style);
  },
];

function toEntries(properties: readonly string[], value: string): CSSEntry[] {
  return properties.map((property): CSSEntry => [property, value]);
}

function textStyleEntries(style: string): CSSEntry[] {
  return [
    ["font-size", textStyleVar(style, "font_size")],
    ["font-weight", textStyleVar(style, "font_weight")],
    ["letter-spacing", textStyleVar(style, "letter_spacing")],
    ["line-height", textStyleVar(style, "line_height")],
  ];
}

function isKeyOf<T extends object>(object: T, key: string): key is Extract<keyof T, string> {
  return Object.hasOwn(object, key);
}

/**
 * プリセットが提供する UnoCSS ルールの一覧です。
 */
export const rules: Rule[] = [
  colorRule,
  spaceRule,
  gapRule,
  sizeRule,
  insetRule,
  borderWidthRule,
  outlineWidthRule,
  radiusRule,
  fontFamilyRule,
  textStyleRule,
];
