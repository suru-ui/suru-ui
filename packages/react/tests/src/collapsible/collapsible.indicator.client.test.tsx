import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { CollapsibleIndicator } from "../../../src/collapsible/collapsible.indicator.jsx";
import "../_locators.js";

describe("CollapsibleIndicator", () => {
  test("span と既定のアイコンを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<CollapsibleIndicator />);

    // 検証
    const indicator = screen.getByClassName("sui_collapsible_indicator").element();
    expect(indicator.tagName).toBe("SPAN");
    expect(indicator.querySelector("svg")).not.toBe(null);
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<CollapsibleIndicator className="custom" />);

    // 検証
    const indicator = screen.getByClassName("sui_collapsible_indicator").element();
    expect(indicator.classList.contains("custom")).toBe(true);
    expect(indicator.classList.contains("sui_collapsible_indicator")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<CollapsibleIndicator render={<i />} />);

    // 検証
    const indicator = screen.getByClassName("sui_collapsible_indicator").element();
    expect(indicator.tagName).toBe("I");
  });

  test("既定のアイコンを差し替える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CollapsibleIndicator>
        <svg data-testid="icon" viewBox="0 0 24 24" />
      </CollapsibleIndicator>,
    );

    // 検証
    const indicator = screen.getByClassName("sui_collapsible_indicator").element();
    expect(indicator.querySelectorAll("svg").length).toBe(1);
    expect(screen.getByTestId("icon").query()).not.toBe(null);
  });
});
