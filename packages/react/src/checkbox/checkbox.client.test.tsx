import "@suru-ui/theme/suru.css";
import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import "./checkbox.parts.js";
import { Checkbox, CheckboxAPI, useCheckboxAPI } from "./checkbox.jsx";
import "../../tests/src/_locators.js";

describe("CheckboxAPI", () => {
  test("getRootProps はルートの props を返す", ({ expect }) => {
    // 準備と実行。
    const api = new CheckboxAPI({
      size: "lg",
      color: "blue",
    });

    // 検証。
    const rootProps = api.getRootProps();
    expect(rootProps.color).toBe("blue");
    expect(rootProps.size).toBe("lg");
  });

  test("getRootProps はパーツ固有の props を含めない", ({ expect }) => {
    // 準備と実行。
    const api = new CheckboxAPI({
      children: "✓",
      slotProps: { indicator: {} },
    });

    // 検証。
    const rootProps = api.getRootProps();
    expect(rootProps).not.toHaveProperty("children");
    expect(rootProps).not.toHaveProperty("slotProps");
  });

  test("getIndicatorProps は子要素を渡す", ({ expect }) => {
    // 準備と実行。
    const api = new CheckboxAPI({ children: "✓" });

    // 検証。
    expect(api.getIndicatorProps()).toStrictEqual({ children: "✓" });
  });

  test("getIndicatorProps は slotProps と子要素を結合する", ({ expect }) => {
    // 準備と実行。
    const api = new CheckboxAPI({
      children: "✓",
      slotProps: { indicator: { keepMounted: true } },
    });

    // 検証。
    const props = api.getIndicatorProps();
    expect(props.keepMounted).toBe(true);
    expect(props.children).toBe("✓");
  });
});

describe("useCheckboxAPI", () => {
  test("API を作成する", async ({ expect }) => {
    // 準備。
    function Probe() {
      const api = useCheckboxAPI({ size: "lg" });

      return <span>{api.getRootProps().size}</span>;
    }

    // 実行。
    const screen = await render(<Probe />);

    // 検証。
    expect(screen.getByText("lg").query()?.textContent).toBe("lg");
  });
});

describe("Checkbox", () => {
  test("既定のチェックボックスを描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Checkbox />);

    // 検証。
    const root = screen.getByClassName("sui_checkbox").element();
    expect(root.tagName).toBe("SPAN");
    expect(screen.getByClassName("sui_checkbox_indicator").query()).toBe(null);
  });

  test("チェック状態ではインジケーターを描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Checkbox defaultChecked />);

    // 検証。
    expect(screen.getByClassName("sui_checkbox_indicator").query()).not.toBe(null);
  });

  test("子要素をインジケーターの内容にする", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Checkbox defaultChecked>✓</Checkbox>);

    // 検証。
    const indicator = screen.getByClassName("sui_checkbox_indicator").element();
    expect(indicator.querySelector("svg")).toBe(null);
    expect(indicator.textContent).toBe("✓");
  });

  test("slotProps でインジケーターを変更する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Checkbox
        slotProps={{
          indicator: {
            id: "indicator",
            keepMounted: true,
          },
        }}
      />,
    );

    // 検証。
    expect(screen.container.querySelector("#indicator")).not.toBe(null);
  });

  test("追加の props をルートへ渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Checkbox aria-label="利用規約に同意" data-testid="checkbox" />);

    // 検証。
    const root = screen.getByTestId("checkbox").element();
    expect(root.getAttribute("aria-label")).toBe("利用規約に同意");
  });
});
