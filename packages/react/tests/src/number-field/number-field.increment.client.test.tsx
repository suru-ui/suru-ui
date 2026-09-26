import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { NumberFieldGroup } from "../../../src/number-field/number-field.group.jsx";
import { NumberFieldIncrement } from "../../../src/number-field/number-field.increment.jsx";
import { NumberFieldInput } from "../../../src/number-field/number-field.input.jsx";
import { NumberFieldRoot } from "../../../src/number-field/number-field.root.jsx";
import "../_locators.js";

describe("NumberFieldIncrement", () => {
  test("既定のアイコン付きでボタンを表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <NumberFieldRoot defaultValue={5}>
        <NumberFieldGroup>
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberFieldRoot>,
    );

    // 検証
    const button = screen.getByRole("button", { name: "値を増やす" }).element();
    expect(button.tagName).toBe("BUTTON");
    expect(button.classList.contains("sui_number_field_stepper")).toBe(true);
    expect(button.classList.contains("sui_number_field_increment")).toBe(true);
    expect(button.querySelector("svg")).not.toBe(null);
  });

  test("押下で値を増やす", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <NumberFieldRoot defaultValue={5}>
        <NumberFieldGroup>
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberFieldRoot>,
    );

    // 実行
    await screen.getByRole("button", { name: "値を増やす" }).click();

    // 検証
    expect((screen.getByRole("textbox").element() as HTMLInputElement).value).toBe("6");
  });

  test("指定した内容を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <NumberFieldRoot>
        <NumberFieldIncrement>増</NumberFieldIncrement>
      </NumberFieldRoot>,
    );

    // 検証
    expect(screen.getByRole("button", { name: "値を増やす" }).element().textContent).toBe("増");
  });

  test("補助技術向けのラベルを上書きする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <NumberFieldRoot>
        <NumberFieldIncrement aria-label="数量を増やす" />
      </NumberFieldRoot>,
    );

    // 検証
    expect(screen.getByRole("button", { name: "数量を増やす" }).query()).not.toBe(null);
  });
});
