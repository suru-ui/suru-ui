import { describe, expect, it } from "vitest";

import { sortTypeProps } from "../../scripts/sort-type-props.js";

describe("sortTypeProps", () => {
  it("型リテラルのプロパティーを名前順に並べ替える", () => {
    const source = `type T = { b: 1; a: 2; c: 3 };`;
    const expected = `type T = { a: 2; b: 1; c: 3 };`;
    expect(sortTypeProps(source)).toBe(expected);
  });

  it("JSDoc コメントもプロパティーと一緒に移動する", () => {
    const source = [
      "type SlotProps = {",
      "  /**",
      "   * trigger の説明",
      "   */",
      "  trigger?: string | undefined;",
      "",
      "  /**",
      "   * popup の説明",
      "   */",
      "  popup?: string | undefined;",
      "",
      "  /**",
      "   * arrow の説明",
      "   */",
      "  arrow?: string | undefined;",
      "};",
      "",
    ].join("\n");
    const expected = [
      "type SlotProps = {",
      "  /**",
      "   * arrow の説明",
      "   */",
      "  arrow?: string | undefined;",
      "",
      "  /**",
      "   * popup の説明",
      "   */",
      "  popup?: string | undefined;",
      "",
      "  /**",
      "   * trigger の説明",
      "   */",
      "  trigger?: string | undefined;",
      "};",
      "",
    ].join("\n");
    expect(sortTypeProps(source)).toBe(expected);
  });

  it("必須プロパティーを省略可能プロパティーより先に並べ替える", () => {
    const source = `type T = { b?: 1; z?: 2; a: 3; m: 4 };`;
    const expected = `type T = { a: 3; m: 4; b?: 1; z?: 2 };`;
    expect(sortTypeProps(source)).toBe(expected);
  });

  it("必須メソッドを省略可能メソッドより先に並べ替える", () => {
    const source = `type T = { zeta?(): void; alpha(): number };`;
    const expected = `type T = { alpha(): number; zeta?(): void };`;
    expect(sortTypeProps(source)).toBe(expected);
  });

  it("readonly と optional を維持して並べ替える", () => {
    const source = `type T = { readonly z?: string | undefined; readonly a?: string | undefined };`;
    const expected = `type T = { readonly a?: string | undefined; readonly z?: string | undefined };`;
    expect(sortTypeProps(source)).toBe(expected);
  });

  it("インターフェースのプロパティーも並べ替える", () => {
    const source = ["interface I {", "  b: number;", "  a: number;", "}", ""].join("\n");
    const expected = ["interface I {", "  a: number;", "  b: number;", "}", ""].join("\n");
    expect(sortTypeProps(source)).toBe(expected);
  });

  it("呼び出し署名は位置を維持する", () => {
    const source = [
      "interface I {",
      "  (props: { x: 1 }): void;",
      "  z: number;",
      "  a: number;",
      "}",
      "",
    ].join("\n");
    const expected = [
      "interface I {",
      "  (props: { x: 1 }): void;",
      "  a: number;",
      "  z: number;",
      "}",
      "",
    ].join("\n");
    expect(sortTypeProps(source)).toBe(expected);
  });

  it("インデックス署名は位置を維持する", () => {
    const source = `type T = { z: 1; [key: string]: unknown; a: 2 };`;
    const expected = `type T = { a: 2; [key: string]: unknown; z: 1 };`;
    expect(sortTypeProps(source)).toBe(expected);
  });

  it("メソッド署名も並べ替える", () => {
    const source = `type T = { zeta(p: string): void; alpha(): number };`;
    const expected = `type T = { alpha(): number; zeta(p: string): void };`;
    expect(sortTypeProps(source)).toBe(expected);
  });

  it("ネストした型リテラルも並べ替える", () => {
    const source = `type T = { p?: { z: 1; b: 2; a: 3 } };`;
    const expected = `type T = { p?: { a: 3; b: 2; z: 1 } };`;
    expect(sortTypeProps(source)).toBe(expected);
  });

  it("ジェネリック引数内のオブジェクト型も並べ替える", () => {
    const source = `type C = IComponent<{ z: 1; a: 2 }>;`;
    const expected = `type C = IComponent<{ a: 2; z: 1 }>;`;
    expect(sortTypeProps(source)).toBe(expected);
  });

  it("複数の型定義をまとめて並べ替える", () => {
    const source = [
      "type A = { b: 1; a: 2 };",
      "interface I {",
      "  z: number;",
      "  y: number;",
      "}",
      "",
    ].join("\n");
    const expected = [
      "type A = { a: 2; b: 1 };",
      "interface I {",
      "  y: number;",
      "  z: number;",
      "}",
      "",
    ].join("\n");
    expect(sortTypeProps(source)).toBe(expected);
  });

  it("既に並べ替え済みなら変更しない", () => {
    const source = `type T = { a: 1; b: 2; c: 3 };`;
    expect(sortTypeProps(source)).toBe(source);
  });

  it("並べ替え対象のメンバーが 1 つだけなら変更しない", () => {
    const source = `type T = { (x: 1): void; b: 2 };`;
    expect(sortTypeProps(source)).toBe(source);
  });
});
