import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";

import { CheckboxGroup } from "../../src/forms/checkbox-group/index.js";
import { Checkbox } from "../../src/forms/checkbox/index.js";
import { clickElement } from "../_click.js";

describe("CheckboxGroup", () => {
  test("グループ div をレンダリングする", async () => {
    // 実行
    const screen = await render(
      <CheckboxGroup>
        <Checkbox value="a" />
        <Checkbox value="b" />
      </CheckboxGroup>,
    );

    // 検証
    const group = screen.getByRole("group");

    await expect.element(group).toHaveClass("sui_checkbox_group");
    await expect.element(group).toHaveClass("sui_checkbox_group-orientation_vertical");
  });

  test("defaultValue で初期選択を指定できる", async () => {
    // 実行
    const screen = await render(
      <CheckboxGroup defaultValue={["a"]}>
        <Checkbox value="a" />
        <Checkbox value="b" />
      </CheckboxGroup>,
    );

    // 検証
    await expect
      .element(screen.getByRole("group").getByRole("checkbox").nth(0))
      .toHaveAttribute("aria-checked", "true");
    await expect
      .element(screen.getByRole("group").getByRole("checkbox").nth(1))
      .toHaveAttribute("aria-checked", "false");
  });

  test("クリックで選択状態が切り替わる", async () => {
    // 実行
    const screen = await render(
      <CheckboxGroup>
        <Checkbox value="a" />
        <Checkbox value="b" />
      </CheckboxGroup>,
    );

    // 実行
    clickElement(screen.getByRole("group").getByRole("checkbox").nth(1));

    // 検証
    await expect
      .element(screen.getByRole("group").getByRole("checkbox").nth(1))
      .toHaveAttribute("aria-checked", "true");
  });

  test("onValueChange が選択値を通知する", async () => {
    // 準備
    let values: readonly string[] = [];

    // 実行
    const screen = await render(
      <CheckboxGroup
        onValueChange={(nextValues) => {
          values = nextValues;
        }}
      >
        <Checkbox value="a" />
        <Checkbox value="b" />
      </CheckboxGroup>,
    );
    clickElement(screen.getByRole("group").getByRole("checkbox").nth(0));

    // 検証
    expect(values).toStrictEqual(["a"]);

    // 実行
    clickElement(screen.getByRole("group").getByRole("checkbox").nth(1));

    // 検証
    expect(values).toStrictEqual(["a", "b"]);
  });

  test("disabled を指定すると全てのチェックボックスが無効化される", async () => {
    // 実行
    const screen = await render(
      <CheckboxGroup disabled>
        <Checkbox value="a" />
        <Checkbox value="b" />
      </CheckboxGroup>,
    );

    // 検証
    await expect.element(screen.getByRole("group").getByRole("checkbox").nth(0)).toBeDisabled();
  });

  test("グループのスタイルを子要素に伝播する", async () => {
    // 実行
    const screen = await render(
      <CheckboxGroup color="green" size="lg" variant="liquid">
        <Checkbox value="a" />
      </CheckboxGroup>,
    );

    // 検証
    const checkbox = screen.getByRole("group").getByRole("checkbox");

    await expect.element(checkbox).toHaveClass("sui_checkbox-color_green");
    await expect.element(checkbox).toHaveClass("sui_checkbox-size_lg");
    await expect.element(checkbox).toHaveClass("sui_checkbox-variant_liquid");
  });
});
