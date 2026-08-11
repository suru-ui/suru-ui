import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";

import { ActionGroupRoot, ActionGroupSeparator } from "../../src/buttons/action-group/index.js";
import { Button } from "../../src/buttons/button/index.js";
import { Input } from "../../src/forms/input/index.js";
import { NumberField } from "../../src/forms/number-field/index.js";
import { Select } from "../../src/forms/select/index.js";

describe("ActionGroupRoot", () => {
  test("グループ要素と既定の向きをレンダリングする", async () => {
    // 実行
    const screen = await render(
      <ActionGroupRoot>
        <Button>A</Button>
        <Button>B</Button>
      </ActionGroupRoot>,
    );

    // 検証
    const group = screen.getByRole("group");

    await expect.element(group).toHaveClass("sui_action_group");
    await expect.element(group).toHaveClass("sui_action_group-orientation_horizontal");
    await expect.element(group).toHaveAttribute("aria-orientation", "horizontal");
  });

  test("グループのスタイルを対応するアイテムへ伝播する", async () => {
    // 実行
    const screen = await render(
      <ActionGroupRoot variant="liquid" color="blue" size="sm" radius="lg" outlined>
        <Button>A</Button>
        <Input aria-label="B" />
        <NumberField aria-label="C" />
        <Select aria-label="D" items={["D"]} />
      </ActionGroupRoot>,
    );

    // 検証
    const group = screen.container.querySelector<HTMLElement>(".sui_action_group");
    const items = group?.querySelectorAll(".sui_action_group_item");

    expect(items).toHaveLength(4);
    for (const item of items ?? []) {
      expect(item.classList.contains("sui_action_group_item")).toBe(true);
    }

    await expect
      .element(screen.getByRole("button", { name: "A", exact: true }))
      .toHaveClass("sui_button-size_sm");
    await expect
      .element(screen.getByRole("button", { name: "A", exact: true }))
      .toHaveClass("sui_button-color_blue");
    await expect
      .element(screen.getByRole("button", { name: "A", exact: true }))
      .toHaveClass("sui_button-radius_lg");
    await expect
      .element(screen.getByRole("textbox", { name: "B" }))
      .toHaveClass("sui_input-size_sm");
    await expect
      .element(screen.getByRole("textbox", { name: "B" }))
      .toHaveClass("sui_input-variant_liquid");
    expect(group?.querySelector(".sui_number_field.sui_action_group_item")).not.toBeNull();
    await expect.element(screen.getByRole("combobox")).toHaveClass("sui_select-radius_lg");
  });

  test("内側のグループがコンテキストを上書きする", async () => {
    // 実行
    const screen = await render(
      <ActionGroupRoot color="red">
        <ActionGroupRoot color="blue">
          <Button>A</Button>
        </ActionGroupRoot>
      </ActionGroupRoot>,
    );

    // 検証
    await expect
      .element(screen.getByRole("button", { name: "A" }))
      .toHaveClass("sui_button-color_blue");
  });
});

describe("ActionGroupSeparator", () => {
  test("親グループの向きを継承する", async () => {
    // 実行
    const screen = await render(
      <ActionGroupRoot orientation="vertical">
        <Button>A</Button>
        <ActionGroupSeparator />
        <Button>B</Button>
      </ActionGroupRoot>,
    );

    // 検証
    const separator = screen.getByRole("separator");

    await expect.element(separator).toHaveClass("sui_action_group_separator");
    await expect.element(separator).toHaveClass("sui_action_group_separator-orientation_vertical");
    await expect.element(separator).toHaveAttribute("aria-orientation", "vertical");
  });
});
