import { test, expect, describe } from "vite-plus/test";

import { SIZES, COLORS, BUTTON_SIZES, FONT_FAMILIES, COLOR_TEMPLATES } from "../src/index.js";

describe("SIZES", () => {
  test("サイズの一覧を定義順に返す", () => {
    // 検証：
    expect(SIZES).toStrictEqual(["sm", "md", "lg"]);
  });
});

describe("BUTTON_SIZES", () => {
  test("ボタン系のサイズの一覧を定義順に返す", () => {
    // 検証：
    expect(BUTTON_SIZES).toStrictEqual(["xs", "sm", "md", "lg"]);
  });
});

describe("COLORS", () => {
  test("色の一覧を定義順に返す", () => {
    // 検証：
    expect(COLORS).toStrictEqual([
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
    // 検証：
    expect(COLOR_TEMPLATES).toStrictEqual(["solid", "naked", "liquid"]);
  });
});

describe("FONT_FAMILIES", () => {
  test("フォントファミリーの一覧を定義順に返す", () => {
    // 検証：
    expect(FONT_FAMILIES).toStrictEqual(["sans", "mono"]);
  });
});
