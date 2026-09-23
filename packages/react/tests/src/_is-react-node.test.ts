import * as React from "react";
import { describe, expect, test } from "vitest";

import isReactNode from "../../src/_is-react-node.js";

describe("isReactNode", () => {
  test.each([["文字"], [42], [10n], [true], [false], [undefined], [null]])(
    "プリミティブを受け入れる (%s)",
    (value) => {
      // 準備と実行
      const result = isReactNode(value);

      // 検証
      expect(result).toBe(true);
    },
  );

  test("要素を受け入れる", () => {
    // 準備と実行
    const result = isReactNode(React.createElement("span", null, "りんご"));

    // 検証
    expect(result).toBe(true);
  });

  test("反復可能を受け入れる", () => {
    // 準備と実行
    const result = isReactNode(["りんご", "ばなな"]);

    // 検証
    expect(result).toBe(true);
  });

  test("Promise を受け入れる", () => {
    // 準備と実行
    const result = isReactNode(new Promise(() => {}));

    // 検証
    expect(result).toBe(true);
  });

  test.each([[{}], [Symbol("記号")]])("非ノードを拒否する (%s)", (value) => {
    // 準備と実行
    const result = isReactNode(value);

    // 検証
    expect(result).toBe(false);
  });

  test("関数を拒否する", () => {
    // 準備と実行
    const result = isReactNode(() => {});

    // 検証
    expect(result).toBe(false);
  });
});
