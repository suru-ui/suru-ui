import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/checkbox-group/checkbox-group.parts.js";
import "../../../src/checkbox/checkbox.parts.js";
import { CheckboxGroupRoot } from "../../../src/checkbox-group/root/checkbox-group.root.jsx";
import { CheckboxRoot } from "../../../src/checkbox/root/checkbox.root.jsx";
import "../_locators.js";

describe("CheckboxGroupRoot", () => {
  test("既定の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<CheckboxGroupRoot />);

    // 検証
    const root = screen.getByClassName("sui_checkbox_group").element();
    expect(root.classList.contains("sui_checkbox_group")).toBe(true);
    expect(root.classList.contains("sui_checkbox_group-orientation_vertical")).toBe(true);
  });

  test("指定した向きの修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<CheckboxGroupRoot orientation="horizontal" />);

    // 検証
    const root = screen.getByClassName("sui_checkbox_group").element();
    expect(root.classList.contains("sui_checkbox_group-orientation_horizontal")).toBe(true);
    expect(root.classList.contains("sui_checkbox_group-orientation_vertical")).toBe(false);
  });

  test("スコープの始点になる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<CheckboxGroupRoot />);

    // 検証
    expect(screen.getByClassName("sui_checkbox_group").element().getAttribute("data-scope")).toBe(
      "",
    );
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<CheckboxGroupRoot className="custom" />);

    // 検証
    const root = screen.getByClassName("sui_checkbox_group").element();
    expect(root.classList.contains("custom")).toBe(true);
    expect(root.classList.contains("sui_checkbox_group")).toBe(true);
  });

  test("無効時に状態クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<CheckboxGroupRoot disabled />);

    // 検証
    expect(
      screen
        .getByClassName("sui_checkbox_group")
        .element()
        .classList.contains("sui_checkbox_group-disabled"),
    ).toBe(true);
  });

  test("render で要素を置き換える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<CheckboxGroupRoot render={<section />} />);

    // 検証
    const root = screen.getByClassName("sui_checkbox_group").element();
    expect(root.tagName).toBe("SECTION");
    expect(root.getAttribute("data-scope")).toBe("");
  });

  test("render の関数へ状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CheckboxGroupRoot
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
    const root = screen.getByClassName("sui_checkbox_group").element();
    expect(root.tagName).toBe("SECTION");
    expect(root.getAttribute("data-probe")).toBe("lg/blue/naked/true/horizontal");
  });

  test("既定値の選択状態を子の状態クラスへ伝える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CheckboxGroupRoot defaultValue={["option-a"]}>
        <CheckboxRoot aria-label="オプション A" value="option-a" />
        <CheckboxRoot aria-label="オプション B" value="option-b" />
      </CheckboxGroupRoot>,
    );

    // 検証
    const checkboxes = screen.container.querySelectorAll<HTMLElement>(".sui_checkbox");
    expect(checkboxes[0]?.classList.contains("sui_checkbox-checked")).toBe(true);
    expect(checkboxes[1]?.classList.contains("sui_checkbox-checked")).toBe(false);
  });
});
