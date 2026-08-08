import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";

import "@suru-ui/theme/suru.css";
import { Autocomplete } from "../../src/forms/autocomplete/index.js";
import { Input } from "../../src/forms/input/index.js";

describe("CSS デバッグ", () => {
  test("Input と Autocomplete の CSS 適用を検査する", async () => {
    // 実行
    const screen = await render(
      <div>
        <Input placeholder="テキスト" />
        <Autocomplete items={["りんご"]} placeholder="検索" defaultValue="りんご" />
      </div>,
    );
    const inputEl = screen.getByPlaceholder("テキスト").element() as HTMLElement;
    const acEl = screen.getByPlaceholder("検索").element() as HTMLElement;
    const acGroup = (acEl.parentElement ?? acEl) as HTMLElement;

    const dump = (label: string, el: HTMLElement) => {
      const cs = getComputedStyle(el);
      const group = el.closest(".sui_autocomplete_input_group") as HTMLElement | null;
      const gcs = group !== null ? getComputedStyle(group) : null;
      return `${label}: display=${cs.display} padding-inline=${cs.paddingInline} sheets=${[...document.styleSheets].map((s) => s.cssRules.length)} groupDisplay=${gcs?.display} groupClass=${group?.className ?? "なし"}`;
    };

    // 検証 (意図的に失敗させて dump を見せる)
    expect([dump("input", inputEl), dump("ac-input", acEl)].join("\n")).toBe("INVALID");
  });
});
