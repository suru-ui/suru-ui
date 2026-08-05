import { describe, expect, test } from "vitest";

import "../src/layers.css";

const EXPECTED_LAYERS = [
  "sui",
  "sui.source",
  "sui.tokens",
  "sui.utilities",
  "sui.component",
  "sui.important",
];

describe("layers.css", () => {
  test("すべてのレイヤーを宣言している", () => {
    // 実行
    const names = Array.from(document.styleSheets)
      .flatMap((sheet) => Array.from(sheet.cssRules))
      .flatMap((rule) => {
        const match = rule.cssText.match(/^@layer\s+([\w.]+)/);

        return match ? [match[1]!] : [];
      });

    // 検証
    for (const layer of EXPECTED_LAYERS) {
      expect(names).toContain(layer);
    }
  });
});
