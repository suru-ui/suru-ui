import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { NumberFieldAddon } from "../../../src/number-field/number-field.addon.jsx";
import { NumberFieldGroup } from "../../../src/number-field/number-field.group.jsx";
import { NumberFieldInput } from "../../../src/number-field/number-field.input.jsx";
import { NumberFieldRoot } from "../../../src/number-field/number-field.root.jsx";
import "../_locators.js";

describe("NumberFieldGroup", () => {
  test("グループ要素に修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <NumberFieldRoot>
        <NumberFieldGroup />
      </NumberFieldRoot>,
    );

    // 検証
    const group = screen.getByRole("group").element();
    expect(group.classList.contains("sui_number_field_group")).toBe(true);
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <NumberFieldRoot>
        <NumberFieldGroup className="custom" />
      </NumberFieldRoot>,
    );

    // 検証
    const group = screen.getByRole("group").element();
    expect(group.classList.contains("custom")).toBe(true);
    expect(group.classList.contains("sui_number_field_group")).toBe(true);
  });

  test("補助表示のクリックで入力欄へ焦点を移す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <NumberFieldRoot>
        <NumberFieldGroup>
          <NumberFieldAddon>¥</NumberFieldAddon>
          <NumberFieldInput />
        </NumberFieldGroup>
      </NumberFieldRoot>,
    );

    // 実行
    await screen.getByText("¥").click();

    // 検証
    expect(document.activeElement).toBe(screen.getByRole("textbox").element());
  });

  test("自動フォーカスを無効にした補助表示では焦点を移さない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <NumberFieldRoot>
        <NumberFieldGroup>
          <NumberFieldAddon disableFocusOnClick>¥</NumberFieldAddon>
          <NumberFieldInput />
        </NumberFieldGroup>
      </NumberFieldRoot>,
    );

    // 実行
    await screen.getByText("¥").click();

    // 検証
    expect(document.activeElement).not.toBe(screen.getByRole("textbox").element());
  });

  test("無効な入力欄には焦点を移さない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <NumberFieldRoot disabled>
        <NumberFieldGroup>
          <NumberFieldAddon>¥</NumberFieldAddon>
          <NumberFieldInput />
        </NumberFieldGroup>
      </NumberFieldRoot>,
    );

    // 実行
    await screen.getByText("¥").click();

    // 検証
    expect(document.activeElement).not.toBe(
      screen.getByClassName("sui_number_field_input").element(),
    );
  });

  test("利用者のクリックハンドラーを先に呼ぶ", async ({ expect }) => {
    // 準備
    let called = false;
    const screen = await render(
      <NumberFieldRoot>
        <NumberFieldGroup
          onClick={() => {
            called = true;
          }}
        >
          <NumberFieldInput />
        </NumberFieldGroup>
      </NumberFieldRoot>,
    );

    // 実行
    await screen.getByRole("group").click({ position: { x: 2, y: 2 } });

    // 検証
    expect(called).toBe(true);
  });
});
