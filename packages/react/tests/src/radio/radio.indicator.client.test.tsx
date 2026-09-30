import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/radio/radio.parts.js";
import { RadioGroupRoot } from "../../../src/radio-group/radio-group.root.jsx";
import { RadioIndicator } from "../../../src/radio/radio.indicator.jsx";
import { RadioRoot } from "../../../src/radio/radio.root.jsx";
import "../_locators.js";

describe("RadioIndicator", () => {
  test("選択状態ではインジケーターを表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <RadioGroupRoot defaultValue="a">
        <RadioRoot value="a">
          <RadioIndicator />
        </RadioRoot>
      </RadioGroupRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_radio_indicator").query()).not.toBe(null);
  });

  test("未選択では表示しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <RadioGroupRoot>
        <RadioRoot value="a">
          <RadioIndicator />
        </RadioRoot>
      </RadioGroupRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_radio_indicator").query()).toBe(null);
  });

  test("keepMounted では未選択でも描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <RadioGroupRoot>
        <RadioRoot value="a">
          <RadioIndicator keepMounted />
        </RadioRoot>
      </RadioGroupRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_radio_indicator").query()).not.toBe(null);
  });

  test("keepMounted の未選択では表示しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <RadioGroupRoot>
        <RadioRoot value="a">
          <RadioIndicator keepMounted />
        </RadioRoot>
      </RadioGroupRoot>,
    );

    // 検証
    const indicator = screen.getByClassName("sui_radio_indicator").element();
    expect(getComputedStyle(indicator).display).toBe("none");
  });

  test("指定した内容を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <RadioGroupRoot defaultValue="a">
        <RadioRoot value="a">
          <RadioIndicator>
            <span>●</span>
          </RadioIndicator>
        </RadioRoot>
      </RadioGroupRoot>,
    );

    // 検証
    const indicator = screen.getByClassName("sui_radio_indicator").element();
    expect(indicator.querySelector("svg")).toBe(null);
    expect(indicator.textContent).toBe("●");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <RadioGroupRoot defaultValue="a">
        <RadioRoot value="a">
          <RadioIndicator className="custom" />
        </RadioRoot>
      </RadioGroupRoot>,
    );

    // 検証
    const indicator = screen.getByClassName("sui_radio_indicator").element();
    expect(indicator.classList.contains("custom")).toBe(true);
    expect(indicator.classList.contains("sui_radio_indicator")).toBe(true);
  });
});
