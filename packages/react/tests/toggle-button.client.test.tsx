import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import { ToggleButton } from "../src/buttons/toggle-button/index.js";

describe("ToggleButton", () => {
  test("ボタン要素をレンダリングする", async () => {
    // 実行
    const screen = await render(<ToggleButton>切り替え</ToggleButton>);

    // 検証
    const button = screen.getByRole("button", { name: "切り替え" });

    await expect.element(button).toHaveClass("sui_button");
    await expect.element(button).toHaveClass("sui_button-variant_liquid");
  });

  test("クリックすると押下状態が切り替わる", async () => {
    // 実行
    const screen = await render(<ToggleButton>切り替え</ToggleButton>);

    // 実行
    const button = screen.getByRole("button");
    await userEvent.click(button);

    // 検証
    await expect.element(button).toHaveAttribute("aria-pressed", "true");

    // 実行
    await userEvent.click(button);

    // 検証
    await expect.element(button).toHaveAttribute("aria-pressed", "false");
  });

  test("defaultPressed を指定すると初期状態で押下状態になる", async () => {
    // 実行
    const screen = await render(<ToggleButton defaultPressed>切り替え</ToggleButton>);

    // 検証
    await expect.element(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });

  test("押下時は既定で color が blue になる", async () => {
    // 実行
    const screen = await render(<ToggleButton defaultPressed>切り替え</ToggleButton>);

    // 検証
    await expect.element(screen.getByRole("button")).toHaveClass("sui_button-color_blue");
  });

  test("押下時は variant を問わず solid のスタイルになる", async () => {
    // 実行
    const screen = await render(
      <ToggleButton variant="naked" defaultPressed>
        切り替え
      </ToggleButton>,
    );

    // 検証
    const button = screen.getByRole("button");

    await expect.element(button).toHaveClass("sui_button-variant_solid");
    await expect.element(button).not.toHaveClass("sui_button-variant_naked");
  });

  test("押下時は data-pressed 属性が付与される", async () => {
    // 実行
    const screen = await render(<ToggleButton defaultPressed>切り替え</ToggleButton>);

    // 検証
    await expect.element(screen.getByRole("button")).toHaveAttribute("data-pressed", "");
  });

  test("制御モードでは pressed プロパティーが状態を決定する", async () => {
    // 実行
    const screen = await render(<ToggleButton pressed>切り替え</ToggleButton>);

    // 検証
    await expect.element(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");

    // 実行
    await screen.rerender(<ToggleButton pressed={false}>切り替え</ToggleButton>);

    // 検証
    await expect.element(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
  });

  test("onPressedChange が押下状態を通知する", async () => {
    // 準備
    let pressed: boolean | undefined;

    // 実行
    const screen = await render(
      <ToggleButton
        onPressedChange={(nextPressed) => {
          pressed = nextPressed;
        }}
      >
        切り替え
      </ToggleButton>,
    );
    await userEvent.click(screen.getByRole("button"));

    // 検証
    expect(pressed).toBe(true);
  });
});
