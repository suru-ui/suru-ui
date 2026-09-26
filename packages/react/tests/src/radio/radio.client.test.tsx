import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/radio/radio.parts.js";
import { RadioGroupRoot } from "../../../src/radio-group/radio-group.root.jsx";
import { Radio, RadioAPI, useRadioAPI } from "../../../src/radio/radio.jsx";
import "../_locators.js";

describe("RadioAPI", () => {
  test("getRootProps はルートの props を返す", ({ expect }) => {
    // 準備と実行
    const api = new RadioAPI({ value: "a", color: "blue", size: "lg" });

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
      const api = useRadioAPI({ value: "a", size: "lg" });
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
    expect(root.getAttribute("role")).toBe("radio");
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
        <Radio slotProps={{ indicator: { id: "indicator", keepMounted: true } }} value="a" />
      </RadioGroupRoot>,
    );

    // 検証
    expect(screen.container.querySelector("#indicator")).not.toBe(null);
  });

  test("クリックで状態を変更する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <RadioGroupRoot>
        <Radio aria-label="オプション" value="a" />
      </RadioGroupRoot>,
    );
    await screen.getByRole("radio", { name: "オプション" }).click();

    // 検証
    expect(
      screen.getByRole("radio", { name: "オプション" }).element().getAttribute("aria-checked"),
    ).toBe("true");
  });

  test("制御された状態に追従する", async ({ expect }) => {
    // 準備
    function Controlled() {
      const [value, setValue] = React.useState("a");

      return (
        <RadioGroupRoot
          value={value}
          onValueChange={(next) => {
            setValue(String(next));
          }}
        >
          <Radio aria-label="A" value="a" />
          <Radio aria-label="B" value="b" />
        </RadioGroupRoot>
      );
    }

    // 実行
    const screen = await render(<Controlled />);
    await screen.getByRole("radio", { name: "B" }).click();

    // 検証
    expect(screen.getByRole("radio", { name: "B" }).element().getAttribute("aria-checked")).toBe(
      "true",
    );
    expect(screen.getByRole("radio", { name: "A" }).element().getAttribute("aria-checked")).toBe(
      "false",
    );
  });

  test("追加の props をルートへ渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <RadioGroupRoot>
        <Radio aria-label="選択肢" data-testid="radio" value="a" />
      </RadioGroupRoot>,
    );

    // 検証
    expect(screen.getByRole("radio", { name: "選択肢" }).query()).not.toBe(null);
    expect(screen.getByTestId("radio").query()).not.toBe(null);
  });

  test("フォームへ値を送信する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <form>
        <RadioGroupRoot defaultValue="a" name="choice">
          <Radio value="a" />
          <Radio value="b" />
        </RadioGroupRoot>
      </form>,
    );

    // 検証
    const form = screen.container.querySelector("form")!;
    expect(new FormData(form).get("choice")).toBe("a");
  });
});
