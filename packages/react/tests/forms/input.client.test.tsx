import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import { Input } from "../../src/forms/input/index.js";

describe("Input", () => {
  test("テキスト入力欄をレンダリングする", async () => {
    // 実行
    const screen = await render(<Input placeholder="例: 田中 太郎" />);

    // 検証
    const input = screen.getByPlaceholder("例: 田中 太郎");

    await expect.element(input).toHaveClass("sui_input");
  });

  test("既定のスタイルクラスを適用する", async () => {
    // 実行
    const screen = await render(<Input />);

    // 検証
    const input = screen.getByRole("textbox");

    await expect.element(input).toHaveClass("sui_input-size_md");
    await expect.element(input).toHaveClass("sui_input-variant_naked");
    await expect.element(input).toHaveClass("sui_input-radius_rounded");
    await expect.element(input).toHaveClass("sui_input-accent_color_grey");
    await expect.element(input).toHaveClass("sui_input-outlined");
  });

  test("variant・size・radius・outlined を指定できる", async () => {
    // 実行
    const screen = await render(
      <Input variant="liquid" size="lg" radius="full" outlined={false} />,
    );

    // 検証
    const input = screen.getByRole("textbox");

    await expect.element(input).toHaveClass("sui_input-variant_liquid");
    await expect.element(input).toHaveClass("sui_input-size_lg");
    await expect.element(input).toHaveClass("sui_input-radius_full");
  });

  test("outlined は variant による既定値より優先される", async () => {
    // 実行
    const screen = await render(
      <>
        <Input variant="liquid" aria-label="既定" />
        <Input variant="liquid" outlined aria-label="明示" />
      </>,
    );

    // 検証
    await expect
      .element(screen.getByRole("textbox", { name: "既定" }))
      .not.toHaveClass("sui_input-outlined");
    await expect
      .element(screen.getByRole("textbox", { name: "明示" }))
      .toHaveClass("sui_input-outlined");
  });

  test("accentColor に応じたクラスを適用する", async () => {
    // 実行
    const screen = await render(<Input accentColor="blue" />);

    // 検証
    const input = screen.getByRole("textbox");

    await expect.element(input).toHaveClass("sui_input-accent_color_blue");
  });

  test("ポインターでフォーカスすると data-focus-type が pointer になる", async () => {
    // 実行
    const screen = await render(<Input />);
    const input = screen.getByRole("textbox");
    const inputElement = input.element() as HTMLInputElement;
    inputElement.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
    inputElement.focus();

    // 検証
    await expect.element(input).toHaveAttribute("data-focus-type", "pointer");
  });

  test("キーボードでフォーカスすると data-focus-type が keyboard になる", async () => {
    // 実行
    const screen = await render(<Input />);
    const input = screen.getByRole("textbox");
    (input.element() as HTMLElement).focus();

    // 検証
    await expect.element(input).toHaveAttribute("data-focus-type", "keyboard");
  });

  test("フォーカスが外れると data-focus-type が外れる", async () => {
    // 実行
    const screen = await render(<Input />);
    const input = screen.getByRole("textbox");
    const inputElement = input.element() as HTMLInputElement;
    inputElement.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
    inputElement.focus();
    inputElement.blur();

    // 検証
    await expect.element(input).not.toHaveAttribute("data-focus-type");
  });

  test("文字を入力すると onValueChange が呼ばれる", async () => {
    // 準備
    let value = "";

    // 実行
    const screen = await render(
      <Input
        onValueChange={(nextValue) => {
          value = nextValue;
        }}
      />,
    );
    await userEvent.type(screen.getByRole("textbox"), "山田太郎");

    // 検証
    expect(value).toBe("山田太郎");
  });

  test("制御モードで value を表示する", async () => {
    // 実行
    const screen = await render(<Input value="初期値" />);

    // 検証
    await expect.element(screen.getByRole("textbox")).toHaveValue("初期値");
  });

  test("disabled を指定すると無効化される", async () => {
    // 実行
    const screen = await render(<Input disabled />);

    // 検証
    const input = screen.getByRole("textbox");

    await expect.element(input).toBeDisabled();
    await expect.element(input).toHaveClass("sui_input-disabled");
  });
});
