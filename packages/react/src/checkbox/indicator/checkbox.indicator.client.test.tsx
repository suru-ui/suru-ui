import "@suru-ui/theme/suru.css";
import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import "../checkbox.parts.js";
import { CheckboxRoot } from "../root/checkbox.root.jsx";
import { CheckboxIndicator } from "./checkbox.indicator.jsx";
import "../../../tests/src/_locators.js";

describe("CheckboxIndicator", () => {
  test("チェック状態では既定のチェックアイコンを表示する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <CheckboxRoot defaultChecked>
        <CheckboxIndicator />
      </CheckboxRoot>,
    );

    // 検証。
    const indicator = screen.getByClassName("sui_checkbox_indicator").element();
    expect(indicator.querySelector("svg")).not.toBe(null);
    expect(indicator.querySelector(".sui_checkbox_icon-check")).not.toBe(null);
    expect(indicator.querySelector(".sui_checkbox_icon-dash")).not.toBe(null);
  });

  test("未チェックでは表示しない", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <CheckboxRoot>
        <CheckboxIndicator />
      </CheckboxRoot>,
    );

    // 検証。
    expect(screen.getByClassName("sui_checkbox_indicator").query()).toBe(null);
  });

  test("keepMounted では未チェックでも描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <CheckboxRoot>
        <CheckboxIndicator keepMounted />
      </CheckboxRoot>,
    );

    // 検証。
    expect(screen.getByClassName("sui_checkbox_indicator").query()).not.toBe(null);
  });

  test("中間状態ではインジケーターを表示する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <CheckboxRoot indeterminate>
        <CheckboxIndicator />
      </CheckboxRoot>,
    );

    // 検証。
    expect(screen.getByClassName("sui_checkbox_indicator").query()).not.toBe(null);
  });

  test("指定した内容を表示する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <CheckboxRoot defaultChecked>
        <CheckboxIndicator>
          <span>✓</span>
        </CheckboxIndicator>
      </CheckboxRoot>,
    );

    // 検証。
    const indicator = screen.getByClassName("sui_checkbox_indicator").element();
    expect(indicator.querySelector("svg")).toBe(null);
    expect(indicator.textContent).toBe("✓");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <CheckboxRoot defaultChecked>
        <CheckboxIndicator className="custom" />
      </CheckboxRoot>,
    );

    // 検証。
    const indicator = screen.getByClassName("sui_checkbox_indicator").element();
    expect(indicator.classList.contains("custom")).toBe(true);
    expect(indicator.classList.contains("sui_checkbox_indicator")).toBe(true);
  });
});
