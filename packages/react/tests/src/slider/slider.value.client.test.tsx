import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/slider/slider.parts.js";
import { SliderRoot } from "../../../src/slider/root/slider.root.jsx";
import { SliderValue } from "../../../src/slider/value/slider.value.jsx";
import "../_locators.js";

describe("SliderValue", () => {
  test("既定の書式で現在値を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SliderRoot defaultValue={25}>
        <SliderValue />
      </SliderRoot>,
    );

    // 検証
    const value = screen.getByText("25").element();
    expect(value.tagName).toBe("OUTPUT");
    expect(value.textContent).toBe("25");
    expect(value.classList.contains("sui_slider_value")).toBe(true);
  });

  test("書式化された値と現在値を描画関数へ渡す", async ({ expect }) => {
    // 準備
    let receivedFormattedValues: readonly string[] = [];
    let receivedValues: readonly number[] = [];

    // 実行
    await render(
      <SliderRoot defaultValue={25}>
        <SliderValue>
          {(formattedValues, values) => {
            receivedFormattedValues = formattedValues;
            receivedValues = values;
            return null;
          }}
        </SliderValue>
      </SliderRoot>,
    );

    // 検証
    expect(receivedFormattedValues).toStrictEqual(["25"]);
    expect(receivedValues).toStrictEqual([25]);
  });

  test("固定内容をそのまま表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SliderRoot defaultValue={25}>
        <SliderValue>
          <span>固定表示</span>
        </SliderValue>
      </SliderRoot>,
    );

    // 検証
    expect(screen.getByText("固定表示").element().textContent).toBe("固定表示");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SliderRoot defaultValue={25}>
        <SliderValue className="custom" />
      </SliderRoot>,
    );

    // 検証
    const value = screen.getByText("25").element();
    expect(value.classList.contains("custom")).toBe(true);
    expect(value.classList.contains("sui_slider_value")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SliderRoot defaultValue={25}>
        <SliderValue render={<span />} />
      </SliderRoot>,
    );

    // 検証
    expect(screen.getByText("25").element().tagName).toBe("SPAN");
  });
});
