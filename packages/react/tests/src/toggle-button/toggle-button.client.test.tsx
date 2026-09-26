import * as React from "react";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import {
  ToggleButton,
  ToggleButtonAPI,
  useToggleButtonAPI,
} from "../../../src/toggle-button/toggle-button.jsx";
import "../_locators.js";

describe("ToggleButtonAPI", () => {
  test("getRootProps はトグルボタン固有の props を除いたルートの props を返す", ({ expect }) => {
    // 準備と実行
    const api = new ToggleButtonAPI({
      children: "切り替え",
      color: "blue",
      indeterminate: true,
      percentage: 50,
      size: "lg",
    });
    const rootProps = api.getRootProps();

    // 検証
    expect(rootProps).toStrictEqual({ color: "blue", size: "lg" });
  });

  test("getContentProps は内容を子要素にして slotProps を重ねる", ({ expect }) => {
    // 準備と実行
    const api = new ToggleButtonAPI({
      children: "切り替え",
      slotProps: { content: { id: "content" } },
    });

    // 検証
    expect(api.getContentProps()).toStrictEqual({ id: "content", children: "切り替え" });
  });

  test("getPendingProps は既定でオーバーレイ表示にする", ({ expect }) => {
    // 準備と実行
    const api = new ToggleButtonAPI({});

    // 検証
    expect(api.getPendingProps()).toStrictEqual({ overlay: true });
  });

  test("getPendingProps は slotProps の指定を重ねる", ({ expect }) => {
    // 準備と実行
    const api = new ToggleButtonAPI({
      slotProps: { pending: { overlay: false, keepMounted: true } },
    });

    // 検証
    expect(api.getPendingProps()).toStrictEqual({ overlay: false, keepMounted: true });
  });

  test("getCircularProgressProps は進捗率と不定モードを返す", ({ expect }) => {
    // 準備と実行
    const api = new ToggleButtonAPI({
      indeterminate: true,
      percentage: 40,
      slotProps: { circularProgress: { id: "progress" } },
    });
    const progressProps = api.getCircularProgressProps();

    // 検証
    expect(progressProps.id).toBe("progress");
    expect(progressProps.percentage).toBe(40);
    expect(progressProps.indeterminate).toBe(true);
  });

  test("getCircularProgressFillProps は slotProps の指定を返す", ({ expect }) => {
    // 準備と実行
    const api = new ToggleButtonAPI({
      slotProps: { circularProgressFill: { strokeWidth: 2 } },
    });

    // 検証
    expect(api.getCircularProgressFillProps()).toStrictEqual({ strokeWidth: 2 });
  });

  test("getCircularProgressTrackProps は slotProps の指定を返す", ({ expect }) => {
    // 準備と実行
    const api = new ToggleButtonAPI({
      slotProps: { circularProgressTrack: { id: "track" } },
    });

    // 検証
    expect(api.getCircularProgressTrackProps()).toStrictEqual({ id: "track" });
  });

  test("getCircularProgressFillRotationProps は slotProps の指定を返す", ({ expect }) => {
    // 準備と実行
    const api = new ToggleButtonAPI({
      slotProps: { circularProgressFillRotation: { dur: "1s" } },
    });

    // 検証
    expect(api.getCircularProgressFillRotationProps()).toStrictEqual({ dur: "1s" });
  });
});

describe("useToggleButtonAPI", () => {
  test("API を作成する", async ({ expect }) => {
    // 準備
    function Probe() {
      const api = useToggleButtonAPI({ children: "切り替え" });
      return <span>{api.getContentProps().children}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("切り替え").query()?.textContent).toBe("切り替え");
  });
});

describe("ToggleButton", () => {
  test("トグルボタン要素として描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ToggleButton color="blue" size="lg">
        切り替え
      </ToggleButton>,
    );

    // 検証
    const button = screen.getByRole("button").element();
    expect(button.tagName).toBe("BUTTON");
    expect(button.getAttribute("type")).toBe("button");
    expect(button.getAttribute("aria-pressed")).toBe("false");
    expect(button.classList.contains("sui_button-size_lg")).toBe(true);
    expect(button.classList.contains("sui_button-color_grey")).toBe(true);
    expect(button.classList.contains("sui_button-variant_liquid")).toBe(true);
    expect(screen.getByClassName("sui_button_content").element().textContent).toBe("切り替え");
  });

  test("押すと押下状態と外観を切り替える", async ({ expect }) => {
    // 準備
    const screen = await render(<ToggleButton color="blue">切り替え</ToggleButton>);
    const button = screen.getByRole("button");

    // 実行
    await button.click();

    // 検証
    expect(button.element().getAttribute("aria-pressed")).toBe("true");
    expect(button.element().classList.contains("sui_button-color_blue")).toBe(true);
    expect(button.element().classList.contains("sui_button-variant_solid")).toBe(true);
  });

  test("制御された押下状態に追従する", async ({ expect }) => {
    // 準備
    function Controlled() {
      const [pressed, setPressed] = React.useState(false);
      return (
        <ToggleButton
          pressed={pressed}
          onPressedChange={(next) => {
            setPressed(next);
          }}
        >
          {pressed ? "ON" : "OFF"}
        </ToggleButton>
      );
    }

    // 実行
    const screen = await render(<Controlled />);
    await screen.getByRole("button").click();

    // 検証
    expect(screen.getByRole("button").element().getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByText("ON").query()).not.toBe(null);
  });

  test("押下状態の変更を通知する", async ({ expect }) => {
    // 準備
    const onPressedChange = vi.fn<(pressed: boolean) => void>();
    const screen = await render(
      <ToggleButton onPressedChange={onPressedChange}>切り替え</ToggleButton>,
    );

    // 実行
    await screen.getByRole("button").click();

    // 検証
    expect(onPressedChange).toHaveBeenCalledTimes(1);
    expect(onPressedChange).toHaveBeenCalledWith(true, expect.anything());
  });

  test("保留中は内容を隠してスピナーを表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<ToggleButton pending>切り替え</ToggleButton>);

    // 検証
    const button = screen.getByClassName("sui_button").element();
    expect(button.classList.contains("sui_button-pending")).toBe(true);
    expect(button.classList.contains("sui_button-disabled")).toBe(false);
    expect(button.getAttribute("aria-disabled")).toBe("true");
    expect(button.hasAttribute("disabled")).toBe(false);
    expect(screen.getByClassName("sui_button_pending-overlay").query()).not.toBe(null);
    expect(screen.getByClassName("sui_button_circular_progress").query()).not.toBe(null);
    const content = screen.getByClassName("sui_button_content").element();
    expect(getComputedStyle(content).visibility).toBe("hidden");
  });

  test("進捗率を円弧のずれへ反映する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ToggleButton pending percentage={40}>
        切り替え
      </ToggleButton>,
    );

    // 検証
    const fill = screen.container.querySelector(".sui_button_circular_progress_fill");
    expect(fill?.getAttribute("stroke-dashoffset")).toBe("60");
    expect(screen.container.querySelector("animateTransform")).toBe(null);
  });

  test("slotProps を各パーツへ渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ToggleButton
        pending
        slotProps={{
          circularProgressFill: { id: "fill", strokeWidth: 2 },
          content: { id: "content" },
          pending: { id: "pending" },
        }}
      >
        切り替え
      </ToggleButton>,
    );

    // 検証
    expect(screen.getByClassName("sui_button_content").element().id).toBe("content");
    expect(screen.getByClassName("sui_button_pending").element().id).toBe("pending");
    const fill = screen.container.querySelector(".sui_button_circular_progress_fill");
    expect(fill?.id).toBe("fill");
    expect(fill?.getAttribute("stroke-width")).toBe("2px");
  });

  test("keepMounted を指定すると保留中でなくてもスピナーを保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ToggleButton slotProps={{ pending: { keepMounted: true } }}>切り替え</ToggleButton>,
    );

    // 検証
    expect(screen.getByClassName("sui_button_pending").query()).not.toBe(null);
    expect(screen.getByClassName("sui_button_pending-visibility_hidden").query()).not.toBe(null);
  });

  test("無効時は押下状態を変更しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<ToggleButton disabled>切り替え</ToggleButton>);
    screen.container.querySelector<HTMLButtonElement>(".sui_button")!.click();

    // 検証
    const button = screen.getByClassName("sui_button").element() as HTMLButtonElement;
    expect(button.getAttribute("aria-pressed")).toBe("false");
    expect(button.classList.contains("sui_button-disabled")).toBe(true);
    expect(button.disabled).toBe(true);
  });
});
