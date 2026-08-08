import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";

import { Autocomplete } from "../../src/forms/autocomplete/index.js";

const items = ["りんご", "バナナ", "ぶどう"];

describe("Autocomplete debug", () => {
  test("computed style をダンプする", async () => {
    // 実行
    const screen = await render(
      <Autocomplete items={items} placeholder="検索" defaultValue="りんご" />,
    );
    const input = screen.getByPlaceholder("検索");
    const group = (input.element().closest(".sui_autocomplete_input_group") ??
      input.element().closest(".sui_autocomplete")) as HTMLElement;
    const trigger = group.querySelector(".sui_autocomplete_trigger") as HTMLElement;
    const clear = group.querySelector(".sui_autocomplete_clear") as HTMLElement;

    const dump = (label: string, el: HTMLElement | null): string => {
      if (!el) {
        return label + " (not found)";
      }
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return `${label} display=${cs.display} w=${cs.width} h=${cs.height} vis=${cs.visibility} op=${cs.opacity} rect=[${r.x},${r.y},${r.width},${r.height}] ariaHidden=${el.getAttribute("aria-hidden")}`;
    };

    // 検証 (意図的に失敗させてダンプを見せる)
    expect(
      [
        dump("input", group.querySelector("input")),
        dump("trigger", trigger),
        dump("clear", clear),
        `min_height=${group.style.getPropertyValue("--sui_autocomplete-min_height")}`,
        `button-width=${getComputedStyle(group).getPropertyValue("--sui_autocomplete_button-width")}`,
        `size-md=${getComputedStyle(group).getPropertyValue("--sui-size-md")}`,
        `sui-set-content=${document.styleSheets.length}`,
      ].join("\n"),
    ).toBe("INVALID_DUMP");
  });
});
