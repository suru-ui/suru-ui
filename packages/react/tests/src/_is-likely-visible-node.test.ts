import * as React from "react";
import { test, expect, describe } from "vite-plus/test";

import isLikelyVisibleNode from "../../src/_is-likely-visible-node.js";

describe("isLikelyVisibleNode", () => {
  test.each([[null], [undefined], [true], [false]])("非表示値を拒否する (%s)", (value) => {
    // 準備と実行。
    const result = isLikelyVisibleNode(value);

    // 検証。
    expect(result).toBe(false);
  });

  test.each([[""], ["りんご"], [0], [42]])("空や偽値でも表示対象にする (%s)", (value) => {
    // 準備と実行。
    const result = isLikelyVisibleNode(value);

    // 検証。
    expect(result).toBe(true);
  });

  test("要素を表示対象にする", () => {
    // 準備と実行。
    const result = isLikelyVisibleNode(React.createElement("span", null, "りんご"));

    // 検証。
    expect(result).toBe(true);
  });

  test("非ノードを拒否する", () => {
    // 準備と実行。
    const result = isLikelyVisibleNode({ label: "りんご" });

    // 検証。
    expect(result).toBe(false);
  });
});
