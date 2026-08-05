import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";

import { ToggleButtonGroup } from "../src/buttons/toggle-button-group/index.js";
import { ToggleButton } from "../src/buttons/toggle-button/index.js";

describe("ToggleButtonGroup", () => {
  test("グループ div をレンダリングする", async () => {
    // 実行
    const screen = await render(
      <ToggleButtonGroup selectionMode="single">
        <ToggleButton value="a">A</ToggleButton>
        <ToggleButton value="b">B</ToggleButton>
      </ToggleButtonGroup>,
    );

    // 検証
    const group = screen.getByRole("radiogroup");

    await expect.element(group).toHaveClass("sui_toggle_button_group");
    await expect.element(group).toHaveClass("sui_toggle_button_group-orientation_horizontal");
    await expect.element(group).toHaveClass("sui_toggle_button_group-radiogroup");
    await expect.element(group).toHaveAttribute("aria-orientation", "horizontal");
  });

  test("選択状態を子要素に伝播する", async () => {
    // 実行
    const screen = await render(
      <ToggleButtonGroup selectionMode="single">
        <ToggleButton value="a">A</ToggleButton>
        <ToggleButton value="b">B</ToggleButton>
      </ToggleButtonGroup>,
    );

    // 検証
    const a = screen.getByRole("button", { name: "A" });
    const b = screen.getByRole("button", { name: "B" });

    await expect.element(a).toHaveAttribute("aria-pressed", "false");
    await expect.element(b).toHaveAttribute("aria-pressed", "false");
  });

  test("defaultSelectedValues で初期選択を指定できる", async () => {
    // 実行
    const screen = await render(
      <ToggleButtonGroup selectionMode="single" defaultSelectedValues={["a"]}>
        <ToggleButton value="a">A</ToggleButton>
        <ToggleButton value="b">B</ToggleButton>
      </ToggleButtonGroup>,
    );

    // 検証
    await expect
      .element(screen.getByRole("button", { name: "A" }))
      .toHaveAttribute("aria-pressed", "true");
  });

  test("単一選択では 1 つだけアクティブになる", async () => {
    // 実行
    const screen = await render(
      <ToggleButtonGroup selectionMode="single">
        <ToggleButton value="a">A</ToggleButton>
        <ToggleButton value="b">B</ToggleButton>
      </ToggleButtonGroup>,
    );

    // 実行
    await screen.getByRole("button", { name: "A" }).click();
    await screen.getByRole("button", { name: "B" }).click();

    // 検証
    await expect
      .element(screen.getByRole("button", { name: "A" }))
      .toHaveAttribute("aria-pressed", "false");
    await expect
      .element(screen.getByRole("button", { name: "B" }))
      .toHaveAttribute("aria-pressed", "true");
  });

  test("複数選択では複数のボタンをアクティブにできる", async () => {
    // 実行
    const screen = await render(
      <ToggleButtonGroup selectionMode="multiple">
        <ToggleButton value="a">A</ToggleButton>
        <ToggleButton value="b">B</ToggleButton>
      </ToggleButtonGroup>,
    );

    // 実行
    await screen.getByRole("button", { name: "A" }).click();
    await screen.getByRole("button", { name: "B" }).click();

    // 検証
    await expect
      .element(screen.getByRole("button", { name: "A" }))
      .toHaveAttribute("aria-pressed", "true");
    await expect
      .element(screen.getByRole("button", { name: "B" }))
      .toHaveAttribute("aria-pressed", "true");
  });

  test("選択中のボタンをクリックすると解除される", async () => {
    // 実行
    const screen = await render(
      <ToggleButtonGroup selectionMode="multiple" defaultSelectedValues={["a"]}>
        <ToggleButton value="a">A</ToggleButton>
        <ToggleButton value="b">B</ToggleButton>
      </ToggleButtonGroup>,
    );

    // 実行
    await screen.getByRole("button", { name: "A" }).click();

    // 検証
    await expect
      .element(screen.getByRole("button", { name: "A" }))
      .toHaveAttribute("aria-pressed", "false");
  });

  test("disallowEmptySelection を指定すると最後の選択を解除できない", async () => {
    // 実行
    const screen = await render(
      <ToggleButtonGroup
        selectionMode="single"
        disallowEmptySelection
        defaultSelectedValues={["a"]}
      >
        <ToggleButton value="a">A</ToggleButton>
        <ToggleButton value="b">B</ToggleButton>
      </ToggleButtonGroup>,
    );

    // 実行
    await screen.getByRole("button", { name: "A" }).click();

    // 検証
    await expect
      .element(screen.getByRole("button", { name: "A" }))
      .toHaveAttribute("aria-pressed", "true");
  });

  test("onSelectionChange が選択値を通知する", async () => {
    // 準備
    let selected: ReadonlySet<string> = new Set();

    // 実行
    const screen = await render(
      <ToggleButtonGroup
        selectionMode="multiple"
        onSelectionChange={(values: Set<string>) => {
          selected = new Set(values);
        }}
      >
        <ToggleButton value="a">A</ToggleButton>
        <ToggleButton value="b">B</ToggleButton>
      </ToggleButtonGroup>,
    );
    await screen.getByRole("button", { name: "B" }).click();

    // 検証
    expect([...selected]).toStrictEqual(["b"]);

    // 実行
    await screen.getByRole("button", { name: "A" }).click();

    // 検証
    expect([...selected].sort()).toStrictEqual(["a", "b"]);
  });

  test("グループのスタイルを子要素に伝播する", async () => {
    // 実行
    const screen = await render(
      <ToggleButtonGroup color="blue" size="sm" radius="full">
        <ToggleButton value="a">A</ToggleButton>
      </ToggleButtonGroup>,
    );

    // 検証
    const button = screen.getByRole("button");

    await expect.element(button).toHaveClass("sui_button-color_blue");
    await expect.element(button).toHaveClass("sui_button-size_sm");
    await expect.element(button).toHaveClass("sui_button-radius_full");
  });

  test("orientation と detached に対応する", async () => {
    // 実行
    const screen = await render(
      <ToggleButtonGroup orientation="vertical" detached>
        <ToggleButton value="a">A</ToggleButton>
      </ToggleButtonGroup>,
    );

    // 検証
    const group = screen.getByRole("radiogroup");

    await expect.element(group).toHaveClass("sui_toggle_button_group-orientation_vertical");
    await expect.element(group).toHaveClass("sui_toggle_button_group-detached");
    await expect.element(group).toHaveAttribute("aria-orientation", "vertical");
  });
});
