import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/checkbox-group/checkbox-group.parts.js";
import "../../../src/checkbox/checkbox.parts.js";
import { CheckboxGroupRoot } from "../../../src/checkbox-group/checkbox-group.root.jsx";
import { CheckboxRoot } from "../../../src/checkbox/checkbox.root.jsx";
import "../_locators.js";

describe("CheckboxGroupRoot", () => {
  test("既定の修飾クラスと役割を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<CheckboxGroupRoot />);

    // 検証
    const root = screen.getByClassName("sui_checkbox_group").element();
    expect(root.classList.contains("sui_checkbox_group")).toBe(true);
    expect(root.classList.contains("sui_checkbox_group-orientation_vertical")).toBe(true);
    expect(root.getAttribute("role")).toBe("group");
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

  test("既定値の選択状態を子へ伝える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CheckboxGroupRoot defaultValue={["option-a"]}>
        <CheckboxRoot aria-label="オプション A" value="option-a" />
        <CheckboxRoot aria-label="オプション B" value="option-b" />
      </CheckboxGroupRoot>,
    );

    // 検証
    expect(
      screen.getByRole("checkbox", { name: "オプション A" }).element().getAttribute("aria-checked"),
    ).toBe("true");
    expect(
      screen.getByRole("checkbox", { name: "オプション B" }).element().getAttribute("aria-checked"),
    ).toBe("false");
  });

  test("子の操作で onValueChange を受け取る", async ({ expect }) => {
    // 準備
    const onValueChange = vi.fn<(value: string[]) => void>();
    const screen = await render(
      <CheckboxGroupRoot onValueChange={onValueChange}>
        <CheckboxRoot aria-label="オプション A" value="option-a" />
      </CheckboxGroupRoot>,
    );

    // 実行
    await screen.getByRole("checkbox", { name: "オプション A" }).click();

    // 検証
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith(["option-a"], expect.anything());
  });

  test("親チェックボックスですべて選択する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CheckboxGroupRoot allValues={["option-a", "option-b"]}>
        <CheckboxRoot aria-label="すべて選択" parent />
        <CheckboxRoot aria-label="オプション A" value="option-a" />
        <CheckboxRoot aria-label="オプション B" value="option-b" />
      </CheckboxGroupRoot>,
    );
    await screen.getByRole("checkbox", { name: "すべて選択" }).click();

    // 検証
    expect(
      screen.getByRole("checkbox", { name: "オプション A" }).element().getAttribute("aria-checked"),
    ).toBe("true");
    expect(
      screen.getByRole("checkbox", { name: "オプション B" }).element().getAttribute("aria-checked"),
    ).toBe("true");
  });
});
