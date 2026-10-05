import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import "../slider.parts.js";
import { SliderRoot } from "../root/slider.root.jsx";
import { SliderTrack } from "./slider.track.jsx";
import "../../../tests/src/_locators.js";

describe("SliderTrack", () => {
  test("トラックを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SliderRoot defaultValue={25}>
        <SliderTrack />
      </SliderRoot>,
    );

    // 検証
    const track = screen.getByClassName("sui_slider_track").element();
    expect(track.tagName).toBe("DIV");
    expect(track.classList.contains("sui_slider_track")).toBe(true);
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SliderRoot defaultValue={25}>
        <SliderTrack className="custom" />
      </SliderRoot>,
    );

    // 検証
    const track = screen.getByClassName("sui_slider_track").element();
    expect(track.classList.contains("custom")).toBe(true);
    expect(track.classList.contains("sui_slider_track")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SliderRoot defaultValue={25}>
        <SliderTrack render={<section />} />
      </SliderRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_slider_track").element().tagName).toBe("SECTION");
  });
});
