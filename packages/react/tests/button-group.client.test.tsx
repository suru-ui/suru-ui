import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";

import { ButtonGroup } from "../src/buttons/button-group/index.js";
import { Button } from "../src/buttons/button/index.js";

describe("ButtonGroup", () => {
  test("グループ div をレンダリングする", async () => {
    // 実行
    const screen = await render(
      <ButtonGroup>
        <Button>A</Button>
      </ButtonGroup>,
    );

    // 検証
    const group = screen.getByRole("group");

    await expect.element(group).toHaveClass("sui_button_group");
    await expect.element(group).toHaveClass("sui_button_group-orientation_horizontal");
    await expect.element(group).toHaveAttribute("aria-orientation", "horizontal");
  });

  test("orientation を指定するとクラスと属性が切り替わる", async () => {
    // 実行
    const screen = await render(
      <ButtonGroup orientation="vertical">
        <Button>A</Button>
      </ButtonGroup>,
    );

    // 検証
    const group = screen.getByRole("group");

    await expect.element(group).toHaveClass("sui_button_group-orientation_vertical");
    await expect.element(group).toHaveAttribute("aria-orientation", "vertical");
  });

  test("グループのスタイルを子要素に伝播する", async () => {
    // 実行
    const screen = await render(
      <ButtonGroup variant="liquid" color="blue" size="sm" radius="full" outlined>
        <Button>A</Button>
        <Button>B</Button>
      </ButtonGroup>,
    );

    // 検証
    for (const name of ["A", "B"]) {
      const button = screen.getByRole("button", { name });

      await expect.element(button).toHaveClass("sui_button-variant_liquid");
      await expect.element(button).toHaveClass("sui_button-color_blue");
      await expect.element(button).toHaveClass("sui_button-size_sm");
      await expect.element(button).toHaveClass("sui_button-radius_full");
      await expect.element(button).toHaveClass("sui_button-outlined");
    }
  });

  test("グループは子要素が指定したスタイルより優先される", async () => {
    // 実行
    const screen = await render(
      <ButtonGroup color="blue">
        <Button color="red">A</Button>
      </ButtonGroup>,
    );

    // 検証
    const button = screen.getByRole("button");

    await expect.element(button).toHaveClass("sui_button-color_blue");
  });
});
