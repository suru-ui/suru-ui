import stringify from "./stringify";
import type { CssFunction, CssValue } from "./types";

export default function createCssFunction(css: {} | undefined): CssFunction {
  function cssFunction(pieces: TemplateStringsArray, ...values: readonly CssValue[]): string {
    let s = pieces[0]!;

    for (let i = 1, n = pieces.length; i < n; i++) {
      s += stringify(values[i - 1]) + pieces[i];
    }

    return s;
  }

  if (!css) {
    return cssFunction;
  }

  if (__DEV__) {
    const keys = Object.keys(css).filter(k => k in cssFunction);

    if (keys.length) {
      console.error("suru-ui(cssinjs): CSS の値に関数のプロパティが含まれています:", keys);

      css = { ...css };

      for (const key of keys) {
        // @ts-expect-error
        delete css[key];
      }
    }
  }

  return Object.assign(cssFunction, css);
}
