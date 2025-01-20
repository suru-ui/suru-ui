import { hash } from "@suru-ui/hash";
import stringify from "./stringify";
import type { CssValue, CssValueFactory } from "./types";

export interface BuildResult {
  hash: string;
  template: readonly [string, ...string[]];
  factories: readonly CssValueFactory[];
}

export default function build(
  pieces: TemplateStringsArray,
  values: readonly (CssValue | CssValueFactory)[],
): BuildResult {
  let source = pieces[0]!,
    template: [string, ...string[]] = [source],
    factories: CssValueFactory[] = [];

  for (
    let i = 0,
      n = values.length,
      j = 0,
      v: CssValue | CssValueFactory;
    i < n;
    i++
  ) {
    v = values[i];

    if (typeof v === "function") {
      // 独自の .toString() を持つ場合、スタイル付きコンポーネントのように、その関数が CSS の値を
      // 返すことを期待するので、CssValueFactory として扱わない。
      if (Object.hasOwn(v, "toString")) {
        template[j] += v.toString() + pieces[i + 1];
      } else {
        j += 1;
        template[j] = pieces[i + 1]!;
        factories.push(v as CssValueFactory);
      }
    } else {
      template[j] += stringify(v) + pieces[i + 1];
    }

    source += template[j];
  }

  return {
    hash: hash(source),
    template,
    factories,
  };
}
