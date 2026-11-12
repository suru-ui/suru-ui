import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import "../slider.parts.js";
import { SliderRoot } from "../root/slider.root.jsx";
import { SliderLabel } from "./slider.label.jsx";
import "../../../tests/src/_locators.js";

describe("SliderLabel", () => {
  test("ラベルを描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <SliderRoot defaultValue={25}>
        <SliderLabel>音量</SliderLabel>
      </SliderRoot>,
    );

    // 検証。
    const label = screen.getByText("音量").element();
    expect(label.tagName).toBe("DIV");
    expect(label.textContent).toBe("音量");
    expect(label.classList.contains("sui_slider_label")).toBe(true);
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <SliderRoot defaultValue={25}>
        <SliderLabel className="custom">音量</SliderLabel>
      </SliderRoot>,
    );

    // 検証。
    const label = screen.getByText("音量").element();
    expect(label.classList.contains("custom")).toBe(true);
    expect(label.classList.contains("sui_slider_label")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <SliderRoot defaultValue={25}>
        <SliderLabel render={<strong />}>音量</SliderLabel>
      </SliderRoot>,
    );

    // 検証。
    expect(screen.getByText("音量").element().tagName).toBe("STRONG");
  });
});
