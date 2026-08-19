import { describe, expect, it } from "vitest";

import { sortJsxProps } from "../../scripts/sort-jsx-props.js";

describe("sortJsxProps", () => {
  it("一般プロパティーを長さ順（優先）かつ名前順に並べ替える", () => {
    const source = `<Button className="a" id="b" type="submit" />`;
    const expected = `<Button id="b" type="submit" className="a" />`;
    expect(sortJsxProps(source)).toBe(expected);
  });

  it("一般プロパティーを一般 → aria-* → data-* の順に並べ替える", () => {
    const source = `<Input data-testid="a" aria-label="b" id="c" />`;
    const expected = `<Input id="c" aria-label="b" data-testid="a" />`;
    expect(sortJsxProps(source)).toBe(expected);
  });

  it("aria-* 同士も長さ順（優先）かつ名前順に並べ替える", () => {
    const source = `<div aria-current="page" aria-hidden="true" aria-label="a" />`;
    const expected = `<div aria-label="a" aria-hidden="true" aria-current="page" />`;
    expect(sortJsxProps(source)).toBe(expected);
  });

  it("data-* 同士も長さ順（優先）かつ名前順に並べ替える", () => {
    const source = `<div data-foo="1" data-b="2" data-bar="3" />`;
    const expected = `<div data-b="2" data-bar="3" data-foo="1" />`;
    expect(sortJsxProps(source)).toBe(expected);
  });

  it("スプレッド演算子によるプロパティーの展開の位置を維持する", () => {
    const source = `<Button b="2" {...props} a="1" />`;
    const expected = `<Button a="1" {...props} b="2" />`;
    expect(sortJsxProps(source)).toBe(expected);
  });

  it("先頭のスプレッド演算子も位置を維持する", () => {
    const source = `<Button {...props} b="2" a="1" />`;
    const expected = `<Button {...props} a="1" b="2" />`;
    expect(sortJsxProps(source)).toBe(expected);
  });

  it("末尾のスプレッド演算子も位置を維持する", () => {
    const source = `<Button b="2" a="1" {...props} />`;
    const expected = `<Button a="1" b="2" {...props} />`;
    expect(sortJsxProps(source)).toBe(expected);
  });

  it("複数行の属性も改行とインデントを維持して並べ替える", () => {
    const source = [
      "<Dialog>",
      "  <DialogTrigger",
      '    className="a"',
      '    aria-label="b"',
      '    id="c"',
      '    data-x="d"',
      "    handle={handle}",
      "  />",
      "</Dialog>",
      "",
    ].join("\n");
    const expected = [
      "<Dialog>",
      "  <DialogTrigger",
      '    id="c"',
      "    handle={handle}",
      '    className="a"',
      '    aria-label="b"',
      '    data-x="d"',
      "  />",
      "</Dialog>",
      "",
    ].join("\n");
    expect(sortJsxProps(source)).toBe(expected);
  });

  it("既に並べ替え済みなら変更しない", () => {
    const source = `<Input id="a" aria-label="b" data-testid="c" />`;
    expect(sortJsxProps(source)).toBe(source);
  });

  it("属性が 1 つだけなら変更しない", () => {
    const source = `<Button id="a" />`;
    expect(sortJsxProps(source)).toBe(source);
  });

  it("コメントが付随する属性がある要素は変更しない", () => {
    const source = ["<Button", "  // コメント", '  b="2"', '  a="1"', "/>", ""].join("\n");
    expect(sortJsxProps(source)).toBe(source);
  });

  it("複数要素をまとめて並べ替える", () => {
    const source = `<div><Button b="2" a="1" /><Input y="1" x="2" /></div>`;
    const expected = `<div><Button a="1" b="2" /><Input x="2" y="1" /></div>`;
    expect(sortJsxProps(source)).toBe(expected);
  });

  it("名前空間付きの属性も並べ替える", () => {
    const source = `<svg><use aria-label="b" xlink:href="#a" id="c" /></svg>`;
    const expected = `<svg><use id="c" xlink:href="#a" aria-label="b" /></svg>`;
    expect(sortJsxProps(source)).toBe(expected);
  });

  it("値に JSX を含む属性も並べ替える", () => {
    const source = `<Tooltip content={<span b="2" a="1" />} id="a" />`;
    const expected = `<Tooltip id="a" content={<span a="1" b="2" />} />`;
    expect(sortJsxProps(source)).toBe(expected);
  });
});
