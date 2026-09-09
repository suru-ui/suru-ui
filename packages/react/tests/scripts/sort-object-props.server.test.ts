import { describe, expect, it } from "vitest";

import { sortObjectProps } from "../../scripts/sort-object-props.js";

describe("sortObjectProps", () => {
  it("一般プロパティーを長さ順（優先）かつ名前順に並べ替える", () => {
    const source = `const x = { className: "a", id: "b", type: "c" };`;
    const expected = `const x = { id: "b", type: "c", className: "a" };`;
    expect(sortObjectProps(source)).toBe(expected);
  });

  it("同じ長さのプロパティーを名前順に並べ替える", () => {
    const source = `const x = { zebra: 1, apple: 2 };`;
    const expected = `const x = { apple: 2, zebra: 1 };`;
    expect(sortObjectProps(source)).toBe(expected);
  });

  it("一般プロパティーを一般 → aria-* → data-* の順に並べ替える", () => {
    const source = `const x = { "data-testid": "a", "aria-label": "b", id: "c" };`;
    const expected = `const x = { id: "c", "aria-label": "b", "data-testid": "a" };`;
    expect(sortObjectProps(source)).toBe(expected);
  });

  it("aria-* 同士も長さ順（優先）かつ名前順に並べ替える", () => {
    const source = `const x = { "aria-current": "a", "aria-hidden": "b", "aria-label": "c" };`;
    const expected = `const x = { "aria-label": "c", "aria-hidden": "b", "aria-current": "a" };`;
    expect(sortObjectProps(source)).toBe(expected);
  });

  it("スプレッド演算子の位置を維持して並べ替える", () => {
    const source = `const x = { b: 2, ...props, a: 1 };`;
    const expected = `const x = { a: 1, ...props, b: 2 };`;
    expect(sortObjectProps(source)).toBe(expected);
  });

  it("先頭のスプレッド演算子も位置を維持する", () => {
    const source = `const x = { ...props, b: 2, a: 1 };`;
    const expected = `const x = { ...props, a: 1, b: 2 };`;
    expect(sortObjectProps(source)).toBe(expected);
  });

  it("計算されたキーの位置を維持して並べ替える", () => {
    const source = `const x = { b: 1, [key]: 2, a: 3 };`;
    const expected = `const x = { a: 3, [key]: 2, b: 1 };`;
    expect(sortObjectProps(source)).toBe(expected);
  });

  it("メソッドも名前で並べ替える", () => {
    const source = `const x = { onClick() {}, id: 1 };`;
    const expected = `const x = { id: 1, onClick() {} };`;
    expect(sortObjectProps(source)).toBe(expected);
  });

  it("ネストしたオブジェクトも再帰的に並べ替える", () => {
    const source = `const x = { outer: { b: 1, a: 2 }, id: 1 };`;
    const expected = `const x = { id: 1, outer: { a: 2, b: 1 } };`;
    expect(sortObjectProps(source)).toBe(expected);
  });

  it("複数行のオブジェクトも改行とインデントを維持して並べ替える", () => {
    const source = [
      "const element = useRender({",
      '  defaultTagName: "div",',
      "  props: [],",
      "});",
      "",
    ].join("\n");
    const expected = [
      "const element = useRender({",
      "  props: [],",
      '  defaultTagName: "div",',
      "});",
      "",
    ].join("\n");
    expect(sortObjectProps(source)).toBe(expected);
  });

  it("プロパティーに付随するコメントも一緒に移動する", () => {
    const source = ["const x = {", "  // b のコメント", "  b: 1,", "  a: 2,", "};", ""].join("\n");
    const expected = ["const x = {", "  a: 2,", "  // b のコメント", "  b: 1,", "};", ""].join(
      "\n",
    );
    expect(sortObjectProps(source)).toBe(expected);
  });

  it("分割代入のパターンも並べ替える", () => {
    const source = `const { variant, size, color } = props;`;
    const expected = `const { size, color, variant } = props;`;
    expect(sortObjectProps(source)).toBe(expected);
  });

  it("分割代入の別名はキーで並べ替える", () => {
    const source = `const { bb: x, aa: y } = props;`;
    const expected = `const { aa: y, bb: x } = props;`;
    expect(sortObjectProps(source)).toBe(expected);
  });

  it("分割代入のリテラルの既定値は並べ替える", () => {
    const source = `const { variant = "solid", size = "md" } = props;`;
    const expected = `const { size = "md", variant = "solid" } = props;`;
    expect(sortObjectProps(source)).toBe(expected);
  });

  it("分割代入のレストの位置を維持して並べ替える", () => {
    const source = `const { c, b, ...rest } = props;`;
    const expected = `const { b, c, ...rest } = props;`;
    expect(sortObjectProps(source)).toBe(expected);
  });

  it("既定値が兄弟の束縛を参照する場合でも並べ替える", () => {
    const source = `const { start = 2, end = start } = props;`;
    const expected = `const { end = start, start = 2 } = props;`;
    expect(sortObjectProps(source)).toBe(expected);
  });

  it("既定値が後の兄弟を参照する場合でも並べ替える", () => {
    const source = `const { radius = size, size = "md" } = props;`;
    const expected = `const { size = "md", radius = size } = props;`;
    expect(sortObjectProps(source)).toBe(expected);
  });

  it("既に並べ替え済みなら変更しない", () => {
    const source = `const x = { id: "a", type: "b", "aria-label": "c" };`;
    expect(sortObjectProps(source)).toBe(source);
  });

  it("プロパティーが 1 つだけなら変更しない", () => {
    const source = `const x = { id: "a" };`;
    expect(sortObjectProps(source)).toBe(source);
  });

  it("空のオブジェクトは変更しない", () => {
    const source = `const x = {};`;
    expect(sortObjectProps(source)).toBe(source);
  });
});
