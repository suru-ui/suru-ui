import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";

describe("Autocomplete debug", () => {
  test("CSS のロードを検査する", async () => {
    // 検証 (意図的に失敗させて dump を見せる)
    const sheets = [...document.styleSheets].map((s) => ({
      href: s.href,
      rules: (() => {
        try {
          return s.cssRules.length;
        } catch {
          return -1;
        }
      })(),
    }));
    expect(JSON.stringify(sheets, null, 2)).toBe("INVALID");
  });

  test("input.client 参照用", () => {
    expect(false).toBe(true);
  });
});
