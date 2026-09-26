import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/radio/radio.parts.js";
import { RadioGroupRoot } from "../../../src/radio-group/radio-group.root.jsx";
import { RadioRoot } from "../../../src/radio/radio.root.jsx";
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

  test("選択状態を状態クラスと aria 属性へ反映する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <RadioGroupRoot defaultValue="a">
        <RadioRoot value="a" />
      </RadioGroupRoot>,
    );

    // 検証
    const root = screen.getByClassName("sui_radio").element();
    expect(root.classList.contains("sui_radio-checked")).toBe(true);
    expect(root.getAttribute("aria-checked")).toBe("true");
  });

  test("クリックで選択して onValueChange を受け取る", async ({ expect }) => {
    // 準備
    const onValueChange = vi.fn<(value: string) => void>();
    const screen = await render(
      <RadioGroupRoot onValueChange={onValueChange}>
        <RadioRoot aria-label="オプション" value="a" />
      </RadioGroupRoot>,
    );

    // 実行
    await screen.getByRole("radio", { name: "オプション" }).click();

    // 検証
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith("a", expect.anything());
    expect(
      screen.getByRole("radio", { name: "オプション" }).element().getAttribute("aria-checked"),
    ).toBe("true");
  });

  test("label のクリックで選択する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <RadioGroupRoot>
        <label>
          <RadioRoot value="a" />
          設定を有効にする
        </label>
      </RadioGroupRoot>,
    );
    await screen.getByText("設定を有効にする").click();

    // 検証
    expect(screen.getByRole("radio").element().getAttribute("aria-checked")).toBe("true");
  });

  test("無効時は状態クラスを付け操作を受け付けない", async ({ expect }) => {
    // 準備
    const onValueChange = vi.fn<(value: string) => void>();
    const screen = await render(
      <RadioGroupRoot onValueChange={onValueChange}>
        <RadioRoot aria-label="オプション" disabled value="a" />
      </RadioGroupRoot>,
    );

    // 実行
    await screen.getByRole("radio", { name: "オプション" }).click({ force: true });

    // 検証
    const root = screen.getByClassName("sui_radio").element();
    expect(root.classList.contains("sui_radio-disabled")).toBe(true);
    expect(root.getAttribute("aria-disabled")).toBe("true");
    expect(onValueChange).not.toHaveBeenCalled();
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
        <RadioRoot color="red" size="sm" value="a" variant="liquid" />
      </RadioGroupRoot>,
    );

    // 検証
    const root = screen.getByClassName("sui_radio").element();
    expect(root.classList.contains("sui_radio-size_lg")).toBe(true);
    expect(root.classList.contains("sui_radio-color_blue")).toBe(true);
    expect(root.classList.contains("sui_radio-variant_naked")).toBe(true);
  });

  test("RadioGroup の無効を引き継ぐ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <RadioGroupRoot disabled>
        <RadioRoot value="a" />
      </RadioGroupRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_radio").element().getAttribute("aria-disabled")).toBe("true");
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

  test("フォームへ値を送信する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <form>
        <RadioGroupRoot defaultValue="a" name="choice">
          <RadioRoot value="a" />
          <RadioRoot value="b" />
        </RadioGroupRoot>
      </form>,
    );

    // 検証
    const form = screen.container.querySelector("form")!;
    expect(new FormData(form).get("choice")).toBe("a");
  });

  test("未選択ではフォームへ値を送信しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <form>
        <RadioGroupRoot name="choice">
          <RadioRoot value="a" />
          <RadioRoot value="b" />
        </RadioGroupRoot>
      </form>,
    );

    // 検証
    const form = screen.container.querySelector("form")!;
    expect(new FormData(form).get("choice")).toBe(null);
  });
});
