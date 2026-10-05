import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/radio/radio.parts.js";
import { RadioGroupRoot } from "../../../src/radio-group/root/radio-group.root.jsx";
import { RadioRoot } from "../../../src/radio/root/radio.root.jsx";
import "../_locators.js";

describe("RadioRoot", () => {
  test("既定の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <RadioGroupRoot>
        <RadioRoot value="a" />
      </RadioGroupRoot>,
    );

    // 検証
    const root = screen.getByClassName("sui_radio").element();
    expect(root.classList.contains("sui_radio")).toBe(true);
    expect(root.classList.contains("sui_radio-size_md")).toBe(true);
    expect(root.classList.contains("sui_radio-color_grey")).toBe(true);
    expect(root.classList.contains("sui_radio-radius_full")).toBe(true);
    expect(root.classList.contains("sui_radio-variant_liquid")).toBe(true);
    expect(root.classList.contains("sui_radio-outlined")).toBe(false);
  });

  test("指定した修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <RadioRoot outlined color="blue" radius="lg" size="sm" value="a" variant="naked" />,
    );

    // 検証
    const root = screen.getByClassName("sui_radio").element();
    expect(root.classList.contains("sui_radio-size_sm")).toBe(true);
    expect(root.classList.contains("sui_radio-color_blue")).toBe(true);
    expect(root.classList.contains("sui_radio-radius_lg")).toBe(true);
    expect(root.classList.contains("sui_radio-variant_naked")).toBe(true);
    expect(root.classList.contains("sui_radio-outlined")).toBe(true);
  });

  test("スコープの始点になる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <RadioGroupRoot>
        <RadioRoot value="a" />
      </RadioGroupRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_radio").element().getAttribute("data-scope")).toBe("");
  });

  test("選択状態を状態クラスへ反映する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <RadioGroupRoot defaultValue="a">
        <RadioRoot value="a" />
      </RadioGroupRoot>,
    );

    // 検証
    const root = screen.getByClassName("sui_radio").element();
    expect(root.classList.contains("sui_radio-checked")).toBe(true);
  });

  test("無効時は無効の状態クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <RadioGroupRoot>
        <RadioRoot value="a" disabled />
      </RadioGroupRoot>,
    );

    // 検証
    const root = screen.getByClassName("sui_radio").element();
    expect(root.classList.contains("sui_radio-disabled")).toBe(true);
  });

  test("RadioGroup のスタイルを引き継ぐ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <RadioGroupRoot color="blue" outlined size="lg" variant="naked">
        <RadioRoot value="a" />
      </RadioGroupRoot>,
    );

    // 検証
    const root = screen.getByClassName("sui_radio").element();
    expect(root.classList.contains("sui_radio-size_lg")).toBe(true);
    expect(root.classList.contains("sui_radio-color_blue")).toBe(true);
    expect(root.classList.contains("sui_radio-radius_full")).toBe(true);
    expect(root.classList.contains("sui_radio-variant_naked")).toBe(true);
    expect(root.classList.contains("sui_radio-outlined")).toBe(true);
  });

  test("個別の指定より RadioGroup の指定を優先する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <RadioGroupRoot color="blue" size="lg" variant="naked">
        <RadioRoot color="red" size="sm" variant="liquid" value="a" />
      </RadioGroupRoot>,
    );

    // 検証
    const root = screen.getByClassName("sui_radio").element();
    expect(root.classList.contains("sui_radio-size_lg")).toBe(true);
    expect(root.classList.contains("sui_radio-color_blue")).toBe(true);
    expect(root.classList.contains("sui_radio-variant_naked")).toBe(true);
  });

  test("render の関数へグループと自身の状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <RadioGroupRoot color="blue" size="lg" variant="naked" outlined orientation="horizontal">
        <RadioRoot
          value="a"
          render={(props, state) => (
            <span
              {...props}
              data-probe={`${state.size}/${String(state.color)}/${state.variant}/${String(state.outlined)}/${state.orientation}`}
            />
          )}
        />
      </RadioGroupRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_radio").element().getAttribute("data-probe")).toBe(
      "lg/blue/naked/true/horizontal",
    );
  });

  test("RadioGroup の無効を状態クラスへ引き継ぐ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <RadioGroupRoot disabled>
        <RadioRoot value="a" />
      </RadioGroupRoot>,
    );

    // 検証
    expect(
      screen.getByClassName("sui_radio").element().classList.contains("sui_radio-disabled"),
    ).toBe(true);
  });

  test("render で要素を置き換える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <RadioGroupRoot>
        <RadioRoot render={<div />} value="a" />
      </RadioGroupRoot>,
    );

    // 検証
    const root = screen.getByClassName("sui_radio").element();
    expect(root.tagName).toBe("DIV");
  });
});
