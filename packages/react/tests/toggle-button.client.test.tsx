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

  test("クリックするとアクティブ状態が切り替わる", async () => {
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

  test("defaultActive を指定すると初期状態でアクティブになる", async () => {
    // 実行
    const screen = await render(<ToggleButton defaultActive>切り替え</ToggleButton>);

    // 検証
    await expect.element(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });

  test("アクティブ時は既定で color が blue になる", async () => {
    // 実行
    const screen = await render(<ToggleButton defaultActive>切り替え</ToggleButton>);

    // 検証
    await expect.element(screen.getByRole("button")).toHaveClass("sui_button-color_blue");
  });

  test("activeProps でアクティブ時のクラスを指定できる", async () => {
    // 実行
    const screen = await render(
      <ToggleButton activeProps={{ className: "active-button" }}>切り替え</ToggleButton>,
    );
    await userEvent.click(screen.getByRole("button"));

    // 検証
    await expect.element(screen.getByRole("button")).toHaveClass("active-button");
  });

  test("制御モードでは active プロパティーが状態を決定する", async () => {
    // 実行
    const screen = await render(<ToggleButton active>切り替え</ToggleButton>);

    // 検証
    await expect.element(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");

    // 実行
    await screen.rerender(<ToggleButton active={false}>切り替え</ToggleButton>);

    // 検証
    await expect.element(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
  });
});
