export type Size = "sm" | "md" | "lg";

export const SIZES: readonly Size[] = ["sm", "md", "lg"];

export const sizeSet: ReadonlySet<Size> = /*#__PURE__*/ new Set(SIZES);

export function isSize(size: any): size is Size {
  return sizeSet.has(size);
}

export type Color = "blue" | "green" | "grey" | "magenta" | "orange" | "purple" | "red" | "yellow";

export const COLORS: readonly Color[] = [
  "grey",
  "blue",
  "purple",
  "magenta",
  "red",
  "orange",
  "yellow",
  "green",
];

export const colorSet: ReadonlySet<Color> = /*#__PURE__*/ new Set(COLORS);

export function isColor(color: any): color is Color {
  return colorSet.has(color);
}

export type ColorTemplate = "solid" | "naked" | "liquid";

export const COLOR_TEMPLATES: readonly ColorTemplate[] = ["solid", "naked", "liquid"];

export const colorTemplateSet: ReadonlySet<ColorTemplate> = /*#__PURE__*/ new Set(COLOR_TEMPLATES);

export function isColorTemplate(colorTemplate: any): colorTemplate is ColorTemplate {
  return colorTemplateSet.has(colorTemplate);
}

export type FontFamily = "sans" | "mono";

export const FONT_FAMILIES: readonly FontFamily[] = ["sans", "mono"];

export const fontFamilySet: ReadonlySet<FontFamily> = /*#__PURE__*/ new Set(FONT_FAMILIES);

export function isFontFamily(fontFamily: any): fontFamily is FontFamily {
  return fontFamilySet.has(fontFamily);
}
