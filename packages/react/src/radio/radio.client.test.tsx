import "@suru-ui/theme/suru.css";
import * as React from "react";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import "./radio.parts.js";
import { RadioGroupRoot } from "../radio-group/root/radio-group.root.jsx";
import { Radio, RadioAPI, useRadioAPI } from "./radio.jsx";
import "../../tests/src/_locators.js";

describe("RadioAPI", () => {
  test("getRootProps はルートの props を返す", ({ expect }) => {
    // 準備と実行
    const api = new RadioAPI({ size: "lg", color: "blue", value: "a" });

    // 検証
    const rootProps = api.getRootProps();
    expect(rootProps.value).toBe("a");
    expect(rootProps.color).toBe("blue");
    expect(rootProps.size).toBe("lg");
  });

  test("getRootProps はパーツ固有の props を含めない", ({ expect }) => {
    // 準備と実行
    const api = new RadioAPI({ value: "a", children: "✓", slotProps: { indicator: {} } });

    // 検証
    const rootProps = api.getRootProps();
    expect(rootProps).not.toHaveProperty("children");
    expect(rootProps).not.toHaveProperty("slotProps");
  });

  test("getIndicatorProps は子要素を渡す", ({ expect }) => {
    // 準備と実行
    const api = new RadioAPI({ value: "a", children: "✓" });

    // 検証
    expect(api.getIndicatorProps()).toStrictEqual({ children: "✓" });
  });

  test("getIndicatorProps は slotProps と子要素を結合する", ({ expect }) => {
    // 準備と実行
    const api = new RadioAPI({
      value: "a",
      children: "✓",
      slotProps: { indicator: { keepMounted: true } },
    });

    // 検証
    const props = api.getIndicatorProps();
    expect(props.keepMounted).toBe(true);
    expect(props.children).toBe("✓");
  });
});

describe("useRadioAPI", () => {
  test("API を作成する", async ({ expect }) => {
    // 準備
    function Probe() {
      const api = useRadioAPI({ size: "lg", value: "a" });
      return <span>{api.getRootProps().size}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("lg").query()?.textContent).toBe("lg");
  });
});

describe("Radio", () => {
  test("既定のラジオボタンを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <RadioGroupRoot>
        <Radio value="a" />
      </RadioGroupRoot>,
    );

    // 検証
    const root = screen.getByClassName("sui_radio").element();
    expect(root.tagName).toBe("SPAN");
    expect(screen.getByClassName("sui_radio_indicator").query()).toBe(null);
  });

  test("選択状態ではインジケーターを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <RadioGroupRoot defaultValue="a">
        <Radio value="a" />
      </RadioGroupRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_radio_indicator").query()).not.toBe(null);
  });

  test("子要素をインジケーターの内容にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <RadioGroupRoot defaultValue="a">
        <Radio value="a">✓</Radio>
      </RadioGroupRoot>,
    );

    // 検証
    const indicator = screen.getByClassName("sui_radio_indicator").element();
    expect(indicator.querySelector("svg")).toBe(null);
    expect(indicator.textContent).toBe("✓");
  });

  test("slotProps でインジケーターを変更する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <RadioGroupRoot>
        <Radio value="a" slotProps={{ indicator: { id: "indicator", keepMounted: true } }} />
      </RadioGroupRoot>,
    );

    // 検証
    expect(screen.container.querySelector("#indicator")).not.toBe(null);
  });

  test("追加の props をルートへ渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <RadioGroupRoot>
        <Radio value="a" aria-label="選択肢" data-testid="radio" />
      </RadioGroupRoot>,
    );

    // 検証
    const root = screen.getByTestId("radio").element();
    expect(root.getAttribute("aria-label")).toBe("選択肢");
  });
});
