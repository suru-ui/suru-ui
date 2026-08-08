import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import "@suru-ui/theme/suru.css";
import { Autocomplete } from "../../src/forms/autocomplete/index.js";

const items = ["りんご", "バナナ", "ぶどう", "みかん", "いちご", "もも"];

describe("Autocomplete debug", () => {
  test("ホバーとクリックでハイライトを検査する", async () => {
    // 実行
    const screen = await render(<Autocomplete items={items} />);
    const input = screen.getByRole("combobox");
    await userEvent.click(input);
    const options = document.querySelectorAll("[role='option']");
    const events: string[] = [];
    if (options.length > 0) {
      const opt = options[1] as HTMLElement;
      opt.addEventListener("pointerenter", () => events.push("pointerenter"));
      opt.addEventListener("mousemove", () => events.push("mousemove"));
      await userEvent.hover(opt);
    }
    const highlightedEls = [...document.querySelectorAll("[data-highlighted]")].map(
      (el) => el.textContent,
    );

    // 検証 (意図的に失敗させて状態を見せる)
    expect(
      JSON.stringify({
        events,
        highlightedEls,
        optionCount: document.querySelectorAll("[role='option']").length,
      }),
    ).toBe("INVALID");
  });
});
