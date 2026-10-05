import "@suru-ui/theme/suru.css";
import * as React from "react";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import "../checkbox.parts.js";
import { CheckboxGroupRoot } from "../../checkbox-group/root/checkbox-group.root.jsx";
import { CheckboxRoot } from "./checkbox.root.jsx";
import "../../../tests/src/_locators.js";

describe("CheckboxRoot", () => {
  test("既定の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<CheckboxRoot />);

    // 検証
    const root = screen.getByClassName("sui_checkbox").element();
    expect(root.classList.contains("sui_checkbox")).toBe(true);
    expect(root.classList.contains("sui_checkbox-size_md")).toBe(true);
    expect(root.classList.contains("sui_checkbox-color_grey")).toBe(true);
    expect(root.classList.contains("sui_checkbox-radius_md")).toBe(true);
    expect(root.classList.contains("sui_checkbox-variant_liquid")).toBe(true);
    expect(root.classList.contains("sui_checkbox-outlined")).toBe(false);
  });

  test("指定した修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CheckboxRoot size="sm" color="blue" radius="lg" variant="naked" outlined />,
    );

    // 検証
    const root = screen.getByClassName("sui_checkbox").element();
    expect(root.classList.contains("sui_checkbox-size_sm")).toBe(true);
    expect(root.classList.contains("sui_checkbox-color_blue")).toBe(true);
    expect(root.classList.contains("sui_checkbox-radius_lg")).toBe(true);
    expect(root.classList.contains("sui_checkbox-variant_naked")).toBe(true);
    expect(root.classList.contains("sui_checkbox-outlined")).toBe(true);
  });

  test("角丸を指定しないときは大きさに追従させる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <CheckboxRoot size="sm" data-testid="sm" />
        <CheckboxRoot size="lg" radius="full" data-testid="full" />
      </>,
    );

    // 検証
    const sm = screen.getByTestId("sm").element();
    expect(sm.classList.contains("sui_checkbox-radius_sm")).toBe(true);
    const full = screen.getByTestId("full").element();
    expect(full.classList.contains("sui_checkbox-radius_full")).toBe(true);
  });

  test("スコープの始点になる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<CheckboxRoot />);

    // 検証
    expect(screen.getByClassName("sui_checkbox").element().getAttribute("data-scope")).toBe("");
  });

  test("チェック状態を状態クラスへ反映する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<CheckboxRoot defaultChecked />);

    // 検証
    const root = screen.getByClassName("sui_checkbox").element();
    expect(root.classList.contains("sui_checkbox-checked")).toBe(true);
  });

  test("中間状態を状態クラスへ反映する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<CheckboxRoot indeterminate />);

    // 検証
    const root = screen.getByClassName("sui_checkbox").element();
    expect(root.classList.contains("sui_checkbox-indeterminate")).toBe(true);
  });

  test("無効時は無効の状態クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<CheckboxRoot disabled />);

    // 検証
    const root = screen.getByClassName("sui_checkbox").element();
    expect(root.classList.contains("sui_checkbox-disabled")).toBe(true);
  });

  test("CheckboxGroup のスタイルを引き継ぐ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CheckboxGroupRoot size="lg" color="blue" variant="naked" outlined>
        <CheckboxRoot />
      </CheckboxGroupRoot>,
    );

    // 検証
    const root = screen.getByClassName("sui_checkbox").element();
    expect(root.classList.contains("sui_checkbox-size_lg")).toBe(true);
    expect(root.classList.contains("sui_checkbox-color_blue")).toBe(true);
    expect(root.classList.contains("sui_checkbox-radius_lg")).toBe(true);
    expect(root.classList.contains("sui_checkbox-variant_naked")).toBe(true);
    expect(root.classList.contains("sui_checkbox-outlined")).toBe(true);
  });

  test("個別の指定より CheckboxGroup の指定を優先する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CheckboxGroupRoot size="lg" color="blue" variant="naked">
        <CheckboxRoot size="sm" color="red" variant="liquid" />
      </CheckboxGroupRoot>,
    );

    // 検証
    const root = screen.getByClassName("sui_checkbox").element();
    expect(root.classList.contains("sui_checkbox-size_lg")).toBe(true);
    expect(root.classList.contains("sui_checkbox-color_blue")).toBe(true);
    expect(root.classList.contains("sui_checkbox-variant_naked")).toBe(true);
  });

  test("render の関数へグループと自身の状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CheckboxGroupRoot size="lg" color="blue" variant="naked" outlined orientation="horizontal">
        <CheckboxRoot
          render={(props, state) => (
            <span
              {...props}
              data-probe={`${state.size}/${String(state.color)}/${state.variant}/${String(state.outlined)}/${state.orientation}`}
            />
          )}
        />
      </CheckboxGroupRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_checkbox").element().getAttribute("data-probe")).toBe(
      "lg/blue/naked/true/horizontal",
    );
  });

  test("CheckboxGroup の無効を状態クラスへ引き継ぐ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CheckboxGroupRoot disabled>
        <CheckboxRoot />
      </CheckboxGroupRoot>,
    );

    // 検証
    expect(
      screen.getByClassName("sui_checkbox").element().classList.contains("sui_checkbox-disabled"),
    ).toBe(true);
  });

  test("render で要素を置き換える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<CheckboxRoot render={<div />} />);

    // 検証
    const root = screen.getByClassName("sui_checkbox").element();
    expect(root.tagName).toBe("DIV");
  });
});
