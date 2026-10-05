import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/checkbox-group/checkbox-group.parts.js";
import "../../../src/checkbox/checkbox.parts.js";
import { CheckboxGroup } from "../../../src/checkbox-group/checkbox-group.jsx";
import { CheckboxGroupRoot } from "../../../src/checkbox-group/root/checkbox-group.root.jsx";
import { CheckboxRoot } from "../../../src/checkbox/root/checkbox.root.jsx";
import "../_locators.js";

describe("CheckboxGroup の配置", () => {
  test("公開パーツをすべて描画して余白を持たない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CheckboxGroup defaultValue={["option-a"]}>
        <CheckboxRoot aria-label="オプション A" value="option-a" />
        <CheckboxRoot aria-label="オプション B" value="option-b" />
      </CheckboxGroup>,
    );

    // 検証
    const root = screen.getByClassName("sui_checkbox_group").element();
    expect(root).not.toBe(null);
    // Base UI が描画する非表示の input は見た目を持たないため、余白の検証から除外します。
    for (const element of screen.container.querySelectorAll<HTMLElement>(
      ".sui_checkbox_group, .sui_checkbox_group *:not(input)",
    )) {
      const style = getComputedStyle(element);
      expect(style.marginTop).toBe("0px");
      expect(style.marginRight).toBe("0px");
      expect(style.marginBottom).toBe("0px");
      expect(style.marginLeft).toBe("0px");
    }
    const rootStyle = getComputedStyle(root);
    expect(rootStyle.paddingTop).toBe("0px");
    expect(rootStyle.paddingRight).toBe("0px");
    expect(rootStyle.paddingBottom).toBe("0px");
    expect(rootStyle.paddingLeft).toBe("0px");
  });

  test("縦並びでは項目を隙間なく縦に並べる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CheckboxGroupRoot>
        <CheckboxRoot aria-label="1" />
        <CheckboxRoot aria-label="2" />
      </CheckboxGroupRoot>,
    );

    // 検証
    const root = getComputedStyle(screen.getByClassName("sui_checkbox_group").element());
    expect(root.display).toBe("flex");
    expect(root.flexDirection).toBe("column");
    const first = screen.getByRole("checkbox", { name: "1" }).element().getBoundingClientRect();
    const second = screen.getByRole("checkbox", { name: "2" }).element().getBoundingClientRect();
    expect(second.top).toBeCloseTo(first.bottom, 1);
    expect(second.left).toBeCloseTo(first.left, 1);
  });

  test("横並びでは項目を隙間なく横に並べる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CheckboxGroupRoot orientation="horizontal">
        <CheckboxRoot aria-label="1" />
        <CheckboxRoot aria-label="2" />
      </CheckboxGroupRoot>,
    );

    // 検証
    const root = getComputedStyle(screen.getByClassName("sui_checkbox_group").element());
    expect(root.flexDirection).toBe("row");
    const first = screen.getByRole("checkbox", { name: "1" }).element().getBoundingClientRect();
    const second = screen.getByRole("checkbox", { name: "2" }).element().getBoundingClientRect();
    expect(second.left).toBeCloseTo(first.right, 1);
    expect(second.top).toBeCloseTo(first.top, 1);
  });

  test("修飾を子のチェックボックスへ伝える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <CheckboxRoot aria-label="基準" color="blue" variant="naked" size="lg" />
        <CheckboxGroupRoot color="blue" variant="naked" size="lg">
          <CheckboxRoot aria-label="項目" />
        </CheckboxGroupRoot>
      </>,
    );

    // 検証
    const expected = getComputedStyle(screen.getByRole("checkbox", { name: "基準" }).element());
    const actual = getComputedStyle(screen.getByRole("checkbox", { name: "項目" }).element());
    expect(actual.color).toBe(expected.color);
    expect(actual.width).toBe(expected.width);
    expect(actual.height).toBe(expected.height);
    expect(actual.borderTopLeftRadius).toBe(expected.borderTopLeftRadius);
  });

  test("枠線を子のチェックボックスへ伝える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <CheckboxRoot aria-label="基準" outlined />
        <CheckboxGroupRoot aria-label="グループ" outlined>
          <CheckboxRoot aria-label="項目" />
        </CheckboxGroupRoot>
      </>,
    );

    // 検証
    const expected = getComputedStyle(screen.getByRole("checkbox", { name: "基準" }).element());
    const actual = getComputedStyle(screen.getByRole("checkbox", { name: "項目" }).element());
    expect(actual.borderTopWidth).toBe(expected.borderTopWidth);
    expect(actual.borderTopColor).toBe(expected.borderTopColor);
  });

  test("無効時は操作不能な表示にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CheckboxGroupRoot disabled>
        <CheckboxRoot aria-label="項目" />
      </CheckboxGroupRoot>,
    );

    // 検証
    const root = screen.getByClassName("sui_checkbox_group").element();
    expect(root.classList.contains("sui_checkbox_group-disabled")).toBe(true);
    expect(getComputedStyle(root).cursor).toBe("not-allowed");
  });
});
