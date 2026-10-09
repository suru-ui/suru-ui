import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { NumberFieldGroup } from "../group/number-field.group.jsx";
import { NumberFieldRoot } from "../root/number-field.root.jsx";
import { NumberFieldAddon } from "./number-field.addon.jsx";
import "../../../tests/src/_locators.js";

describe("NumberFieldAddon", () => {
  test("span で表示して修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <NumberFieldRoot>
        <NumberFieldGroup>
          <NumberFieldAddon>¥</NumberFieldAddon>
        </NumberFieldGroup>
      </NumberFieldRoot>,
    );

    // 検証
    const addon = screen.getByText("¥").element();
    expect(addon.tagName).toBe("SPAN");
    expect(addon.classList.contains("sui_number_field_addon")).toBe(true);
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <NumberFieldRoot>
        <NumberFieldGroup>
          <NumberFieldAddon className="custom">¥</NumberFieldAddon>
        </NumberFieldGroup>
      </NumberFieldRoot>,
    );

    // 検証
    const addon = screen.getByText("¥").element();
    expect(addon.classList.contains("custom")).toBe(true);
    expect(addon.classList.contains("sui_number_field_addon")).toBe(true);
  });

  test("render で要素を置き換える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <NumberFieldRoot>
        <NumberFieldGroup>
          <NumberFieldAddon render={<b />}>¥</NumberFieldAddon>
        </NumberFieldGroup>
      </NumberFieldRoot>,
    );

    // 検証
    const addon = screen.getByText("¥").element();
    expect(addon.tagName).toBe("B");
    expect(addon.classList.contains("sui_number_field_addon")).toBe(true);
  });

  test("render の関数へスタイル情報を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <NumberFieldRoot size="lg" color="blue">
        <NumberFieldGroup>
          <NumberFieldAddon
            render={(props, state) => (
              <span {...props} data-probe={`${state.size}/${state.color}`} />
            )}
          >
            ¥
          </NumberFieldAddon>
        </NumberFieldGroup>
      </NumberFieldRoot>,
    );

    // 検証
    expect(
      screen.getByClassName("sui_number_field_addon").element().getAttribute("data-probe"),
    ).toBe("lg/blue");
  });
});
