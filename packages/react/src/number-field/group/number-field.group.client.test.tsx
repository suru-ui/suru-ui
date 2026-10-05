import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { NumberFieldInput } from "../input/number-field.input.jsx";
import { NumberFieldRoot } from "../root/number-field.root.jsx";
import { NumberFieldGroup } from "./number-field.group.jsx";
import "../../../tests/src/_locators.js";

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

  test("render の関数へスタイル情報とグループの状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <NumberFieldRoot size="lg" color="blue">
        <NumberFieldGroup
          render={(props, state) => (
            <div {...props} data-probe={`${state.size}/${state.color}/${String(state.disabled)}`} />
          )}
        />
      </NumberFieldRoot>,
    );

    // 検証
    expect(screen.getByRole("group").element().getAttribute("data-probe")).toBe("lg/blue/false");
  });
});
