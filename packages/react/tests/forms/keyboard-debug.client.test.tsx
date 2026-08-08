import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import "@suru-ui/theme/suru.css";
import { Autocomplete } from "../../src/forms/autocomplete/index.js";

const items = ["りんご", "バナナ", "ぶどう", "みかん", "いちご", "もも"];

describe("Autocomplete debug", () => {
  test("keydown の到達先とハンドラーの有無を検査する", async () => {
    // 実行
    const screen = await render(<Autocomplete items={items} />);
    const input = screen.getByRole("combobox");
    await userEvent.click(input);

    const log: string[] = [];
    const inputEl = input.element() as HTMLInputElement;
    log.push(`activeElement=${document.activeElement?.tagName ?? "none"}`);
    log.push(`inputHasEvent=${Object.keys((inputEl as any).dataset ?? {}).join(",")}`);
    const onCaptureInput: EventListener = (e) =>
      log.push(
        `input-capture key=${(e as KeyboardEvent).key} target=${(e.target as Element)?.className ?? "?"} defaultPrevented=${e.defaultPrevented}`,
      );
    inputEl.addEventListener("keydown", onCaptureInput);
    const onBubbleWindow: EventListener = (e) =>
      log.push(
        `window-bubble key=${(e as KeyboardEvent).key} defaultPrevented=${e.defaultPrevented} props=${(e as KeyboardEvent).getModifierState("Shift")}`,
      );
    window.addEventListener("keydown", onBubbleWindow);

    await userEvent.keyboard("{ArrowDown}");

    log.push(
      `after-press highlighted=${document.querySelectorAll("[data-highlighted]").length} aria=${inputEl.getAttribute("aria-activedescendant")}`,
    );

    inputEl.removeEventListener("keydown", onCaptureInput);
    window.removeEventListener("keydown", onBubbleWindow);

    // 検証
    const lines = log.join(" | ");
    expect(lines).toBe("INVALID");
  });
});
