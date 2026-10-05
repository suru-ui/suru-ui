import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/slider/slider.parts.js";
import { SliderIndicator } from "../../../src/slider/indicator/slider.indicator.jsx";
import { SliderRoot } from "../../../src/slider/root/slider.root.jsx";
import "../_locators.js";

describe("SliderIndicator", () => {
  test("インジケーターを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SliderRoot defaultValue={25}>
        <SliderIndicator />
      </SliderRoot>,
    );

    // 検証
    const indicator = screen.getByClassName("sui_slider_indicator").element();
    expect(indicator.tagName).toBe("DIV");
    expect(indicator.classList.contains("sui_slider_indicator")).toBe(true);
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SliderRoot defaultValue={25}>
        <SliderIndicator className="custom" />
      </SliderRoot>,
    );

    // 検証
    const indicator = screen.getByClassName("sui_slider_indicator").element();
    expect(indicator.classList.contains("custom")).toBe(true);
    expect(indicator.classList.contains("sui_slider_indicator")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SliderRoot defaultValue={25}>
        <SliderIndicator render={<section />} />
      </SliderRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_slider_indicator").element().tagName).toBe("SECTION");
  });
});
