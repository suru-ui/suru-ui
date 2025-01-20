import { createContext, digest, update } from "@suru-ui/hash";
import type { BuildResult } from "./build";
import createCssFunction from "./create-css-function";
import stringify from "./stringify";
import type { CssValue, CssValueFactory } from "./types";

export interface CompileResult {
  hash: string;
  cssText: string;
}

export default function compile(
  css: {} | undefined,
  template: BuildResult["template"],
  factories: BuildResult["factories"],
): CompileResult {
  let i = 0,
    ctx = createContext(),
    cssText = template[i++]!,
    cssFuntion = createCssFunction(css);

  for (
    let n = template.length,
      f: CssValueFactory,
      v: CssValue,
      s: string;
    i < n;
    i++
  ) {
    f = factories[i - 1]!;
    v = f(cssFuntion);
    s = stringify(v);
    update(ctx, s);
    cssText += s + template[i]!;
  }

  return {
    hash: digest(ctx).toString(36),
    cssText,
  };
}
