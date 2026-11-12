import "@suru-ui/theme/suru.css";
import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import "../radio/radio.parts.js";
import "./radio-group.parts.js";
import { RadioRoot } from "../radio/root/radio.root.jsx";
import { RadioGroupRoot } from "./root/radio-group.root.jsx";
import "../../tests/src/_locators.js";

describe("RadioGroup の配置", () => {
  test("公開パーツをすべて描画して余白を持たない", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <RadioGroupRoot defaultValue="option-a">
        <RadioRoot value="option-a" aria-label="オプション A" />
        <RadioRoot value="option-b" aria-label="オプション B" />
      </RadioGroupRoot>,
    );

    // 検証。
    const root = screen.getByClassName("sui_radio_group").element();
    expect(root).not.toBe(null);
    // Base UI が描画する非表示の input は見た目を持たないため、余白の検証から除外します。
    for (const element of screen.container.querySelectorAll<HTMLElement>(
      ".sui_radio_group, .sui_radio_group *:not(input)",
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
    // 準備と実行。
    const screen = await render(
      <RadioGroupRoot>
        <RadioRoot value="1" aria-label="1" />
        <RadioRoot value="2" aria-label="2" />
      </RadioGroupRoot>,
    );

    // 検証。
    const root = getComputedStyle(screen.getByClassName("sui_radio_group").element());
    expect(root.display).toBe("flex");
    expect(root.flexDirection).toBe("column");

    const first = screen.getByRole("radio", { name: "1" }).element().getBoundingClientRect();
    const second = screen.getByRole("radio", { name: "2" }).element().getBoundingClientRect();
    expect(second.top).toBeCloseTo(first.bottom, 1);
    expect(second.left).toBeCloseTo(first.left, 1);
  });

  test("横並びでは項目を隙間なく横に並べる", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <RadioGroupRoot orientation="horizontal">
        <RadioRoot value="1" aria-label="1" />
        <RadioRoot value="2" aria-label="2" />
      </RadioGroupRoot>,
    );

    // 検証。
    const root = getComputedStyle(screen.getByClassName("sui_radio_group").element());
    expect(root.flexDirection).toBe("row");

    const first = screen.getByRole("radio", { name: "1" }).element().getBoundingClientRect();
    const second = screen.getByRole("radio", { name: "2" }).element().getBoundingClientRect();
    expect(second.left).toBeCloseTo(first.right, 1);
    expect(second.top).toBeCloseTo(first.top, 1);
  });

  test("修飾を子のラジオボタンへ伝える", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <RadioRoot
          size="lg"
          color="blue"
          value="x"
          radius="lg"
          variant="naked"
          outlined
          aria-label="基準"
        />
        <RadioGroupRoot size="lg" color="blue" radius="lg" variant="naked" outlined>
          <RadioRoot value="x" aria-label="項目" />
        </RadioGroupRoot>
      </>,
    );

    // 検証。
    const expected = getComputedStyle(screen.getByRole("radio", { name: "基準" }).element());
    const actual = getComputedStyle(screen.getByRole("radio", { name: "項目" }).element());
    expect(actual.backgroundColor).toBe(expected.backgroundColor);
    expect(actual.width).toBe(expected.width);
    expect(actual.height).toBe(expected.height);
    expect(actual.borderTopLeftRadius).toBe(expected.borderTopLeftRadius);
    expect(actual.borderTopWidth).toBe(expected.borderTopWidth);
    expect(actual.borderTopColor).toBe(expected.borderTopColor);
  });

  test("枠線を子のラジオボタンへ伝える", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <RadioRoot value="x" outlined aria-label="基準" />
        <RadioGroupRoot outlined aria-label="グループ">
          <RadioRoot value="x" aria-label="項目" />
        </RadioGroupRoot>
      </>,
    );

    // 検証。
    const expected = getComputedStyle(screen.getByRole("radio", { name: "基準" }).element());
    const actual = getComputedStyle(screen.getByRole("radio", { name: "項目" }).element());
    expect(actual.borderTopWidth).toBe(expected.borderTopWidth);
    expect(actual.borderTopColor).toBe(expected.borderTopColor);
  });

  test("無効時は操作不能な表示にする", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <RadioGroupRoot disabled>
        <RadioRoot value="a" aria-label="項目" />
      </RadioGroupRoot>,
    );

    // 検証。
    const root = screen.getByClassName("sui_radio_group").element();
    expect(root.classList.contains("sui_radio_group-disabled")).toBe(true);
    expect(getComputedStyle(root).cursor).toBe("not-allowed");
  });
});
