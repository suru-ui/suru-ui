import "@suru-ui/theme/suru.css";
import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import "./switch.parts.js";
import { Switch, SwitchAPI, useSwitchAPI } from "./switch.jsx";
import "../../tests/src/_locators.js";

describe("SwitchAPI", () => {
  test("getRootProps はルートの props を返す", ({ expect }) => {
    // 準備と実行。
    const api = new SwitchAPI({
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
    const api = new SwitchAPI({
      children: "✓",
      slotProps: { thumb: {} },
    });

    // 検証。
    const rootProps = api.getRootProps();
    expect(rootProps).not.toHaveProperty("children");
    expect(rootProps).not.toHaveProperty("slotProps");
  });

  test("getThumbProps は子要素を渡す", ({ expect }) => {
    // 準備と実行。
    const api = new SwitchAPI({ children: "✓" });

    // 検証。
    expect(api.getThumbProps()).toStrictEqual({ children: "✓" });
  });

  test("getThumbProps は slotProps と子要素を結合する", ({ expect }) => {
    // 準備と実行。
    const api = new SwitchAPI({
      children: "✓",
      slotProps: { thumb: { id: "thumb" } },
    });

    // 検証。
    const props = api.getThumbProps();
    expect(props.id).toBe("thumb");
    expect(props.children).toBe("✓");
  });
});

describe("useSwitchAPI", () => {
  test("API を作成する", async ({ expect }) => {
    // 準備。
    function Probe() {
      const api = useSwitchAPI({ size: "lg" });

      return <span>{api.getRootProps().size}</span>;
    }

    // 実行。
    const screen = await render(<Probe />);

    // 検証。
    expect(screen.getByText("lg").query()?.textContent).toBe("lg");
  });
});

describe("Switch", () => {
  test("既定のスイッチを描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Switch />);

    // 検証。
    const root = screen.getByClassName("sui_switch").element();
    expect(root.tagName).toBe("SPAN");
    expect(screen.getByClassName("sui_switch_thumb").query()).not.toBe(null);
  });

  test("子要素をつまみの内容にする", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Switch defaultChecked>✓</Switch>);

    // 検証。
    expect(screen.getByClassName("sui_switch_thumb").element().textContent).toBe("✓");
  });

  test("slotProps でつまみを変更する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Switch slotProps={{ thumb: { id: "thumb" } }} />);

    // 検証。
    expect(screen.container.querySelector("#thumb")).not.toBe(null);
  });

  test("追加の props をルートへ渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Switch aria-label="通知を受け取る" data-testid="switch" />);

    // 検証。
    expect(screen.getByRole("switch", { name: "通知を受け取る" }).query()).not.toBe(null);
    expect(screen.getByTestId("switch").query()).not.toBe(null);
  });
});
