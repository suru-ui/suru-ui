import type common from "../../theme/common";
import type theme from "../../theme/light";
import type { Ref } from "../../theme/utils";
import type { CssCustomProperties } from "./types";

type Keyof<Entries, Where> = {
  [P in keyof Entries]: Entries[P] extends Where ? P : never;
}[keyof Entries];

// dprint-ignore
type Indexes<Tuple>
  = Extract<keyof Tuple, `${number}`> extends `${infer I extends number}`
  ? I
  : never;

type C = typeof common;
type T = typeof theme;

export type Sizing = Keyof<C["sui"]["sizing"], string>;

type ColorOrign = Keyof<T["color"], object>;
type ColorAlias = Keyof<T["sui"], Ref<`$.sui.${ColorOrign}`>>;

export type Color = ColorOrign | ColorAlias;

export type ColorScale = Keyof<T["sui"][ColorOrign], symbol>;

export type ColorVariant = Exclude<keyof T["sui"][ColorOrign], ColorScale | "alpha">;

export type ShadowElevation = Indexes<T["sui"]["shadow"]>;

export type TypographyVariant = keyof C["typography"];

export const SIZING_LIST: readonly Sizing[] = [
  "sm",
  "md",
  "lg",
];

export const COLOR_LIST: readonly Color[] = [
  "blue",
  "lightBlue",
  "cyan",
  "green",
  "lime",
  "yellow",
  "orange",
  "red",
  "magenta",
  "purple",
  "grey",
  "info",
  "warn",
  "error",
  "success",
];

export const COLOR_SCALE_LIST: readonly ColorScale[] = [
  50,
  100,
  200,
  300,
  400,
  500,
  600,
  700,
  800,
  900,
  1000,
  1100,
  1200,
];

export const COLOR_VARIANT_LIST: readonly ColorVariant[] = [
  "solid",
  "liquid",
  "naked",
];

export const SHADOW_ELEVATION_LIST: readonly ShadowElevation[] = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
];

export const sizingSet: ReadonlySet<Sizing> = new Set(SIZING_LIST);

export const colorSet: ReadonlySet<Color> = new Set(COLOR_LIST);

export const colorScaleSet: ReadonlySet<ColorScale> = new Set(COLOR_SCALE_LIST);

export const colorVariantSet: ReadonlySet<ColorVariant> = new Set(
  COLOR_VARIANT_LIST,
);

export const shadowElevationSet: ReadonlySet<ShadowElevation> = new Set(
  SHADOW_ELEVATION_LIST,
);

export function isSizing(value: any): value is Sizing {
  return sizingSet.has(value);
}

export function isColor(value: any): value is Color {
  return colorSet.has(value);
}

export function isColorScale(value: any): value is ColorScale {
  return colorScaleSet.has(value);
}

export function isColorVariant(value: any): value is ColorVariant {
  return colorVariantSet.has(value);
}

export function isShadowElevation(value: any): value is ShadowElevation {
  return shadowElevationSet.has(value);
}

let proxy: () => void;

function createRecursiveProxy(
  get: (method: string, path: string[]) => any,
  stack: string[] = [],
): any {
  if (!proxy) {
    proxy = () => {};
    const OWN_KEYS = ["toString", "valueOf", "$name", "$keys"];

    for (const k of OWN_KEYS) {
      // @ts-expect-error
      proxy[k] = null;
    }
  }

  return new Proxy(proxy, {
    get(target, prop, receiver) {
      switch (prop) {
        case "toString":
        case "valueOf":
          return createRecursiveProxy(get, [...stack, prop]);

        case "$name":
          return get("name", stack);

        case "$keys":
          return get("keys", stack);

        default:
          return typeof prop === "string"
            ? createRecursiveProxy(get, [...stack, prop])
            : Reflect.get(target, prop, receiver);
      }
    },
    apply() {
      const method = stack.pop();

      if (__DEV__) {
        if (method !== "toString" && method !== "valueOf") {
          console.error(
            "suru-ui(suru/theme): .toString() と .valueOf() 以外を呼び出すことはできません:",
            stack,
          );

          return "";
        }
      }

      return get(method as "toString", stack);
    },
  });
}

export const $ = createRecursiveProxy(
  function toReturnValue(method, path): any {
    switch (method) {
      case "toString":
      case "valueOf":
        return "var(" + toReturnValue("name", path) + ")";

      case "name":
        return "--" + path.join("-");

      case "keys":
        return path;
    }
  },
) as CssCustomProperties;
