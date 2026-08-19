import { describe, expect, it } from "vitest";

import { sortImportExports } from "../../scripts/sort-import-exports.js";

describe("sortImportExports", () => {
  it("import の値を長さ順（優先）かつ名前順に並べ替える", () => {
    const source = `import { veryLongValue, a, bbb } from "./module";`;
    const expected = `import { a, bbb, veryLongValue } from "./module";`;
    expect(sortImportExports(source)).toBe(expected);
  });

  it("型を値より先に並べ替える", () => {
    const source = `import { a, type B, type C, d } from "./module";`;
    const expected = `import { type B, type C, a, d } from "./module";`;
    expect(sortImportExports(source)).toBe(expected);
  });

  it("型どうしも長さ順（優先）かつ名前順に並べ替える", () => {
    const source = `import type { TypeName, A, BCC } from "./module";`;
    const expected = `import type { A, BCC, TypeName } from "./module";`;
    expect(sortImportExports(source)).toBe(expected);
  });

  it("値どうしも長さ順（優先）かつ名前順に並べ替える", () => {
    const source = `import { state, use, useState } from "react";`;
    const expected = `import { use, state, useState } from "react";`;
    expect(sortImportExports(source)).toBe(expected);
  });

  it("エイリアス (`as`) は元の名前で並べ替える", () => {
    const source = `import { a as alpha, c, b } from "./module";`;
    const expected = `import { a as alpha, b, c } from "./module";`;
    expect(sortImportExports(source)).toBe(expected);
  });

  it("既定や全体の import は位置を維持する", () => {
    const source = `import Default, { c, b, a } from "./module";`;
    const expected = `import Default, { a, b, c } from "./module";`;
    expect(sortImportExports(source)).toBe(expected);
  });

  it("export { ... } from の再出力も並べ替える", () => {
    const source = `export { c, type T, b, a } from "./module";`;
    const expected = `export { type T, a, b, c } from "./module";`;
    expect(sortImportExports(source)).toBe(expected);
  });

  it("ローカルの export { ... } も並べ替える", () => {
    const source = `const a = 1, b = 2, c = 3;\nexport { c, b, a };`;
    const expected = `const a = 1, b = 2, c = 3;\nexport { a, b, c };`;
    expect(sortImportExports(source)).toBe(expected);
  });

  it("export type { ... } も並べ替える", () => {
    const source = `export type { B, A } from "./module";`;
    const expected = `export type { A, B } from "./module";`;
    expect(sortImportExports(source)).toBe(expected);
  });

  it("複数行の specifier は改行とインデントを維持して並べ替える", () => {
    const source = ["import {", "  c,", "  veryLong,", "  a,", '} from "./module";', ""].join("\n");
    const expected = ["import {", "  a,", "  c,", "  veryLong,", '} from "./module";', ""].join(
      "\n",
    );
    expect(sortImportExports(source)).toBe(expected);
  });

  it("既に並べ替え済みなら変更しない", () => {
    const source = `import { type T, a, box, state } from "./module";`;
    expect(sortImportExports(source)).toBe(source);
  });

  it("specifier が 1 つだけなら変更しない", () => {
    const source = `import { b } from "./module";`;
    expect(sortImportExports(source)).toBe(source);
  });

  it("型以外の specifier がないなら変更しない", () => {
    const source = `import Default from "./module";`;
    expect(sortImportExports(source)).toBe(source);
  });

  it("コメントが付随する specifier がある宣言は変更しない", () => {
    const source = ["import {", "  a,", "  // コメント", "  b,", '} from "./module";', ""].join(
      "\n",
    );
    expect(sortImportExports(source)).toBe(source);
  });

  it("複数の宣言をまとめて並べ替える", () => {
    const source = [
      `import { c, b, a } from "./a";`,
      `import { y, x } from "./b";`,
      `export { q, p } from "./c";`,
      "",
    ].join("\n");
    const expected = [
      `import { a, b, c } from "./a";`,
      `import { x, y } from "./b";`,
      `export { p, q } from "./c";`,
      "",
    ].join("\n");
    expect(sortImportExports(source)).toBe(expected);
  });
});
