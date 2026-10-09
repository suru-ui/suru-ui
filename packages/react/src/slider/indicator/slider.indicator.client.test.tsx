import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import "../slider.parts.js";
import { SliderControl } from "../control/slider.control.jsx";
import { SliderRoot } from "../root/slider.root.jsx";
import { SliderTrack } from "../track/slider.track.jsx";
import { SliderIndicator } from "./slider.indicator.jsx";
import "../../../tests/src/_locators.js";

describe("SliderIndicator", () => {
  test("インジケーターを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SliderRoot defaultValue={25}>
        <SliderControl>
          <SliderTrack>
            <SliderIndicator />
          </SliderTrack>
        </SliderControl>
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
        <SliderControl>
          <SliderTrack>
            <SliderIndicator className="custom" />
          </SliderTrack>
        </SliderControl>
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
        <SliderControl>
          <SliderTrack>
            <SliderIndicator render={<section />} />
          </SliderTrack>
        </SliderControl>
      </SliderRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_slider_indicator").element().tagName).toBe("SECTION");
  });
});
