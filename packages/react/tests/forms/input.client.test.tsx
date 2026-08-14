import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";

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
    await expect.element(input).toHaveClass("sui_input-variant_liquid");
    await expect.element(input).toHaveClass("sui_input-radius_md");
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
