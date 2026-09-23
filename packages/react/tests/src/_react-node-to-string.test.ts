import * as React from "react";
import { describe, expect, test } from "vitest";

import reactNodeToString from "../../src/_react-node-to-string.js";

describe("reactNodeToString", () => {
  test("文字列をそのまま返す", () => {
    // 準備と実行
    const result = reactNodeToString("りんご");

    // 検証
    expect(result).toBe("りんご");
  });

  test.each([
    [42, "42"],
    [10n, "10"],
  ])("数値を文字列にする (%s)", (value, expected) => {
    // 準備と実行
    const result = reactNodeToString(value);

    // 検証
    expect(result).toBe(expected);
  });

  test.each([[true], [false], [undefined], [null]])(
    "表示に寄与しない値は空文字にする (%s)",
    (value) => {
      // 準備と実行
      const result = reactNodeToString(value);

      // 検証
      expect(result).toBe("");
    },
  );

  test("要素の子孫テキストを連結する", () => {
    // 準備と実行
    const result = reactNodeToString(
      React.createElement("div", null, React.createElement("span", null, "りん"), "ご"),
    );

    // 検証
    expect(result).toBe("りんご");
  });

  test("配列の各要素を連結する", () => {
    // 準備と実行
    const result = reactNodeToString(["りん", ["ご", 2]]);

    // 検証
    expect(result).toBe("りんご2");
  });

  test("解決できない値は空文字にする", () => {
    // 準備と実行
    const result = reactNodeToString(new Promise(() => {}));

    // 検証
    expect(result).toBe("");
  });

  test("非ノードのオブジェクトは空文字にする", () => {
    // 準備と実行
    const result = reactNodeToString({ label: "りんご" });

    // 検証
    expect(result).toBe("");
  });
});
