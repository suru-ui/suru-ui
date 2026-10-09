import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { NumberFieldGroup } from "../group/number-field.group.jsx";
import { NumberFieldInput } from "../input/number-field.input.jsx";
import { NumberFieldRoot } from "../root/number-field.root.jsx";
import { NumberFieldDecrement } from "./number-field.decrement.jsx";
import "../../../tests/src/_locators.js";

describe("NumberFieldDecrement", () => {
  test("既定のアイコン付きでボタンを表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <NumberFieldRoot defaultValue={5}>
        <NumberFieldGroup>
          <NumberFieldInput />
          <NumberFieldDecrement />
        </NumberFieldGroup>
      </NumberFieldRoot>,
    );

    // 検証
    const button = screen.getByRole("button", { name: "値を減らす" }).element();
    expect(button.tagName).toBe("BUTTON");
    expect(button.classList.contains("sui_number_field_stepper")).toBe(true);
    expect(button.classList.contains("sui_number_field_decrement")).toBe(true);
    expect(button.querySelector("svg")).not.toBe(null);
  });

  test("指定した内容を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <NumberFieldRoot>
        <NumberFieldGroup>
          <NumberFieldInput />
          <NumberFieldDecrement>減</NumberFieldDecrement>
        </NumberFieldGroup>
      </NumberFieldRoot>,
    );

    // 検証
    expect(screen.getByRole("button", { name: "値を減らす" }).element().textContent).toBe("減");
  });

  test("補助技術向けのラベルを上書きする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <NumberFieldRoot>
        <NumberFieldGroup>
          <NumberFieldInput />
          <NumberFieldDecrement aria-label="数量を減らす" />
        </NumberFieldGroup>
      </NumberFieldRoot>,
    );

    // 検証
    expect(screen.getByRole("button", { name: "数量を減らす" }).query()).not.toBe(null);
  });

  test("render の関数へスタイル情報とボタンの状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <NumberFieldRoot size="lg" color="blue">
        <NumberFieldGroup>
          <NumberFieldInput />
          <NumberFieldDecrement
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

    // 検証
    expect(
      screen.getByClassName("sui_number_field_decrement").element().getAttribute("data-probe"),
    ).toBe("lg/blue/false");
  });
});
