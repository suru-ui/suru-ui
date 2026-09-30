import "@suru-ui/theme/suru.css";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/slider/slider.parts.js";
import { SliderControl } from "../../../src/slider/slider.control.jsx";
import { SliderRoot } from "../../../src/slider/slider.root.jsx";
import { SliderThumb } from "../../../src/slider/slider.thumb.jsx";
import { SliderTrack } from "../../../src/slider/slider.track.jsx";
import "../_locators.js";

describe("SliderThumb", () => {
  test("つまみを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SliderRoot defaultValue={25}>
        <SliderControl>
          <SliderTrack>
            <SliderThumb />
          </SliderTrack>
        </SliderControl>
      </SliderRoot>,
    );

    // 検証
    const thumb = screen.getByClassName("sui_slider_thumb").element();
    expect(thumb.tagName).toBe("DIV");
    expect(thumb.classList.contains("sui_slider_thumb")).toBe(true);
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SliderRoot defaultValue={25}>
        <SliderControl>
          <SliderTrack>
            <SliderThumb className="custom" />
          </SliderTrack>
        </SliderControl>
      </SliderRoot>,
    );

    // 検証
    const thumb = screen.getByClassName("sui_slider_thumb").element();
    expect(thumb.classList.contains("custom")).toBe(true);
    expect(thumb.classList.contains("sui_slider_thumb")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SliderRoot defaultValue={25}>
        <SliderControl>
          <SliderTrack>
            <SliderThumb render={<span />} />
          </SliderTrack>
        </SliderControl>
      </SliderRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_slider_thumb").element().tagName).toBe("SPAN");
  });
});
