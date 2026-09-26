import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/slider/slider.parts.js";
import { SliderControl } from "../../../src/slider/slider.control.jsx";
import { SliderRoot } from "../../../src/slider/slider.root.jsx";
import "../_locators.js";

describe("SliderControl", () => {
  test("操作領域を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SliderRoot defaultValue={25}>
        <SliderControl />
      </SliderRoot>,
    );

    // 検証
    const control = screen.getByClassName("sui_slider_control").element();
    expect(control.tagName).toBe("DIV");
    expect(control.classList.contains("sui_slider_control")).toBe(true);
  });

  test("スタイル起点ではないため data-scope を持たない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SliderRoot defaultValue={25}>
        <SliderControl />
      </SliderRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_slider_control").element().getAttribute("data-scope")).toBe(
      null,
    );
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SliderRoot defaultValue={25}>
        <SliderControl className="custom" />
      </SliderRoot>,
    );

    // 検証
    const control = screen.getByClassName("sui_slider_control").element();
    expect(control.classList.contains("custom")).toBe(true);
    expect(control.classList.contains("sui_slider_control")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SliderRoot defaultValue={25}>
        <SliderControl render={<section />} />
      </SliderRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_slider_control").element().tagName).toBe("SECTION");
  });
});
