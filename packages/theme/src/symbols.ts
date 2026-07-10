export type Size = "sm" | "md" | "lg";

export const SIZES: readonly Size[] = ["sm", "md", "lg"];

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

export type ColorTemplate = "solid" | "naked" | "liquid";

export const COLOR_TEMPLATES: readonly ColorTemplate[] = ["solid", "naked", "liquid"];

export type FontFamily = "sans" | "mono";

export const FONT_FAMILIES: readonly FontFamily[] = ["sans", "mono"];
