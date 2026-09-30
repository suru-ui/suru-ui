import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/radio/radio.parts.js";
import { RadioGroupRoot } from "../../../src/radio-group/radio-group.root.jsx";
import { RadioRoot } from "../../../src/radio/radio.root.jsx";
import "../_locators.js";

describe("RadioGroupRoot", () => {
  test("既定の修飾クラスと役割を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<RadioGroupRoot />);

    // 検証
    const root = screen.getByClassName("sui_radio_group").element();
    expect(root.classList.contains("sui_radio_group")).toBe(true);
    expect(root.classList.contains("sui_radio_group-orientation_vertical")).toBe(true);
    expect(root.getAttribute("role")).toBe("radiogroup");
  });

  test("指定した向きの修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<RadioGroupRoot orientation="horizontal" />);

    // 検証
    const root = screen.getByClassName("sui_radio_group").element();
    expect(root.classList.contains("sui_radio_group-orientation_horizontal")).toBe(true);
    expect(root.classList.contains("sui_radio_group-orientation_vertical")).toBe(false);
  });

  test("スコープの始点になる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<RadioGroupRoot />);

    // 検証
    expect(screen.getByClassName("sui_radio_group").element().getAttribute("data-scope")).toBe("");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<RadioGroupRoot className="custom" />);

    // 検証
    const root = screen.getByClassName("sui_radio_group").element();
    expect(root.classList.contains("custom")).toBe(true);
    expect(root.classList.contains("sui_radio_group")).toBe(true);
  });

  test("無効時に状態クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<RadioGroupRoot disabled />);

    // 検証
    expect(
      screen
        .getByClassName("sui_radio_group")
        .element()
        .classList.contains("sui_radio_group-disabled"),
    ).toBe(true);
  });

  test("読み取り専用と必須を aria 属性へ反映する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<RadioGroupRoot readOnly required />);

    // 検証
    const root = screen.getByClassName("sui_radio_group").element();
    expect(root.getAttribute("aria-readonly")).toBe("true");
    expect(root.getAttribute("aria-required")).toBe("true");
  });

  test("render で要素を置き換える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<RadioGroupRoot render={<section />} />);

    // 検証
    const root = screen.getByClassName("sui_radio_group").element();
    expect(root.tagName).toBe("SECTION");
    expect(root.getAttribute("data-scope")).toBe("");
  });

  test("render の関数へ状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <RadioGroupRoot
        color="blue"
        orientation="horizontal"
        outlined
        render={(props, state) => (
          <section
            {...props}
            data-probe={`${state.size}/${state.color}/${state.variant}/${String(state.outlined)}/${state.orientation}`}
          />
        )}
        size="lg"
        variant="naked"
      />,
    );

    // 検証
    const root = screen.getByClassName("sui_radio_group").element();
    expect(root.tagName).toBe("SECTION");
    expect(root.getAttribute("data-probe")).toBe("lg/blue/naked/true/horizontal");
  });

  test("既定値の選択状態を子へ伝える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <RadioGroupRoot defaultValue="option-a">
        <RadioRoot aria-label="オプション A" value="option-a" />
        <RadioRoot aria-label="オプション B" value="option-b" />
      </RadioGroupRoot>,
    );

    // 検証
    expect(
      screen.getByRole("radio", { name: "オプション A" }).element().getAttribute("aria-checked"),
    ).toBe("true");
    expect(
      screen.getByRole("radio", { name: "オプション B" }).element().getAttribute("aria-checked"),
    ).toBe("false");
  });

  test("子の操作で onValueChange を受け取る", async ({ expect }) => {
    // 準備
    const onValueChange = vi.fn<(value: string) => void>();
    const screen = await render(
      <RadioGroupRoot onValueChange={onValueChange}>
        <RadioRoot aria-label="オプション A" value="option-a" />
      </RadioGroupRoot>,
    );

    // 実行
    await screen.getByRole("radio", { name: "オプション A" }).click();

    // 検証
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith("option-a", expect.anything());
  });
});
