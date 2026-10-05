import "@suru-ui/theme/suru.css";
import * as React from "react";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import "../../radio/radio.parts.js";
import { RadioRoot } from "../../radio/root/radio.root.jsx";
import { RadioGroupRoot } from "./radio-group.root.jsx";
import "../../../tests/src/_locators.js";

describe("RadioGroupRoot", () => {
  test("既定の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<RadioGroupRoot />);

    // 検証
    const root = screen.getByClassName("sui_radio_group").element();
    expect(root.classList.contains("sui_radio_group")).toBe(true);
    expect(root.classList.contains("sui_radio_group-orientation_vertical")).toBe(true);
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
        size="lg"
        color="blue"
        render={(props, state) => (
          <section
            {...props}
            data-probe={`${state.size}/${state.color}/${state.variant}/${String(state.outlined)}/${state.orientation}`}
          />
        )}
        variant="naked"
        outlined
        orientation="horizontal"
      />,
    );

    // 検証
    const root = screen.getByClassName("sui_radio_group").element();
    expect(root.tagName).toBe("SECTION");
    expect(root.getAttribute("data-probe")).toBe("lg/blue/naked/true/horizontal");
  });

  test("既定値の選択状態を子の状態クラスへ伝える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <RadioGroupRoot defaultValue="option-a">
        <RadioRoot value="option-a" aria-label="オプション A" />
        <RadioRoot value="option-b" aria-label="オプション B" />
      </RadioGroupRoot>,
    );

    // 検証
    const radios = screen.container.querySelectorAll<HTMLElement>(".sui_radio");
    expect(radios[0]?.classList.contains("sui_radio-checked")).toBe(true);
    expect(radios[1]?.classList.contains("sui_radio-checked")).toBe(false);
  });
});
