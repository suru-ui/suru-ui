import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { FieldRoot } from "../../field/root/field.root.jsx";
import { NumberFieldGroup } from "../group/number-field.group.jsx";
import { NumberFieldRoot } from "../root/number-field.root.jsx";
import { NumberFieldInput } from "./number-field.input.jsx";
import "../../../tests/src/_locators.js";

describe("NumberFieldInput", () => {
  test("入力欄に修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <NumberFieldRoot defaultValue={1}>
        <NumberFieldGroup>
          <NumberFieldInput />
        </NumberFieldGroup>
      </NumberFieldRoot>,
    );

    // 検証
    const input = screen.getByRole("textbox").element();
    expect(input.tagName).toBe("INPUT");
    expect(input.classList.contains("sui_number_field_input")).toBe(true);
    expect(input.classList.contains("sui_number_field_input-unverified")).toBe(true);
  });

  test("利用者の props を入力欄へ渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <NumberFieldRoot>
        <NumberFieldGroup>
          <NumberFieldInput name="quantity" required placeholder="数量" autoComplete="off" />
        </NumberFieldGroup>
      </NumberFieldRoot>,
    );

    // 検証
    const input = screen.getByRole("textbox").element() as HTMLInputElement;
    expect(input.name).toBe("quantity");
    expect(input.placeholder).toBe("数量");
    expect(input.getAttribute("autocomplete")).toBe("off");
    expect(input.required).toBe(true);
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <NumberFieldRoot>
        <NumberFieldGroup>
          <NumberFieldInput className="custom" />
        </NumberFieldGroup>
      </NumberFieldRoot>,
    );

    // 検証
    const input = screen.getByRole("textbox").element();
    expect(input.classList.contains("custom")).toBe(true);
    expect(input.classList.contains("sui_number_field_input")).toBe(true);
  });

  test("Field の検証状態をクラスへ反映する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <FieldRoot invalid>
          <NumberFieldRoot>
            <NumberFieldGroup>
              <NumberFieldInput />
            </NumberFieldGroup>
          </NumberFieldRoot>
        </FieldRoot>
        <FieldRoot>
          <NumberFieldRoot>
            <NumberFieldGroup>
              <NumberFieldInput />
            </NumberFieldGroup>
          </NumberFieldRoot>
        </FieldRoot>
      </>,
    );

    // 検証
    const inputs = screen.container.querySelectorAll<HTMLElement>(".sui_number_field_input");
    expect(inputs[0]?.classList.contains("sui_number_field_input-invalid")).toBe(true);
    expect(inputs[1]?.classList.contains("sui_number_field_input-unverified")).toBe(true);
  });

  test("render で要素を置き換える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <NumberFieldRoot>
        <NumberFieldGroup>
          <NumberFieldInput render={<textarea />} />
        </NumberFieldGroup>
      </NumberFieldRoot>,
    );

    // 検証
    const input = screen.getByRole("textbox").element();
    expect(input.tagName).toBe("TEXTAREA");
    expect(input.classList.contains("sui_number_field_input")).toBe(true);
  });

  test("render の関数へスタイル情報と入力欄の状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <NumberFieldRoot size="lg" color="blue" outlined>
        <NumberFieldGroup>
          <NumberFieldInput
            render={(props, state) => (
              <input
                {...props}
                data-probe={`${state.size}/${state.color}/${String(state.outlined)}/${String(state.valid === null)}`}
              />
            )}
          />
        </NumberFieldGroup>
      </NumberFieldRoot>,
    );

    // 検証
    expect(
      screen.getByClassName("sui_number_field_input").element().getAttribute("data-probe"),
    ).toBe("lg/blue/true/true");
  });
});
