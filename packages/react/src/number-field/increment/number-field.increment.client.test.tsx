import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { NumberFieldGroup } from "../group/number-field.group.jsx";
import { NumberFieldInput } from "../input/number-field.input.jsx";
import { NumberFieldRoot } from "../root/number-field.root.jsx";
import { NumberFieldIncrement } from "./number-field.increment.jsx";
import "../../../tests/src/_locators.js";

describe("NumberFieldIncrement", () => {
  test("既定のアイコン付きでボタンを表示する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <NumberFieldRoot defaultValue={5}>
        <NumberFieldGroup>
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberFieldRoot>,
    );

    // 検証。
    const button = screen.getByRole("button", { name: "値を増やす" }).element();
    expect(button.tagName).toBe("BUTTON");
    expect(button.classList.contains("sui_number_field_stepper")).toBe(true);
    expect(button.classList.contains("sui_number_field_increment")).toBe(true);
    expect(button.querySelector("svg")).not.toBe(null);
  });

  test("指定した内容を表示する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <NumberFieldRoot>
        <NumberFieldGroup>
          <NumberFieldInput />
          <NumberFieldIncrement>増</NumberFieldIncrement>
        </NumberFieldGroup>
      </NumberFieldRoot>,
    );

    // 検証。
    expect(screen.getByRole("button", { name: "値を増やす" }).element().textContent).toBe("増");
  });

  test("補助技術向けのラベルを上書きする", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <NumberFieldRoot>
        <NumberFieldGroup>
          <NumberFieldInput />
          <NumberFieldIncrement aria-label="数量を増やす" />
        </NumberFieldGroup>
      </NumberFieldRoot>,
    );

    // 検証。
    expect(screen.getByRole("button", { name: "数量を増やす" }).query()).not.toBe(null);
  });

  test("render の関数へスタイル情報とボタンの状態を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <NumberFieldRoot size="lg" color="blue">
        <NumberFieldGroup>
          <NumberFieldInput />
          <NumberFieldIncrement
            render={(props, state) => (
              <button
                {...props}
                data-probe={`${state.size}/${state.color}/${String(state.disabled)}`}
              />
            )}
          />
        </NumberFieldGroup>
      </NumberFieldRoot>,
    );

    // 検証。
    expect(
      screen.getByClassName("sui_number_field_increment").element().getAttribute("data-probe"),
    ).toBe("lg/blue/false");
  });
});
