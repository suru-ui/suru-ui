import { describe, expect, test } from "vitest";

import { COLORS, COLOR_TEMPLATES, FONT_FAMILIES, SIZES } from "../src/index.js";

describe("SIZES", () => {
  test("サイズの一覧を定義順に返す", () => {
    // 検証
    expect(SIZES).toEqual(["sm", "md", "lg"]);
  });
});

describe("COLORS", () => {
  test("色の一覧を定義順に返す", () => {
    // 検証
    expect(COLORS).toEqual([
      "grey",
      "blue",
      "purple",
      "magenta",
      "red",
      "orange",
      "yellow",
      "green",
    ]);
  });
});

describe("COLOR_TEMPLATES", () => {
  test("色テンプレートの一覧を定義順に返す", () => {
    // 検証
    expect(COLOR_TEMPLATES).toEqual(["solid", "naked", "liquid"]);
  });
});

describe("FONT_FAMILIES", () => {
  test("フォントファミリーの一覧を定義順に返す", () => {
    // 検証
    expect(FONT_FAMILIES).toEqual(["sans", "mono"]);
  });
});
