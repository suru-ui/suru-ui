import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import "@suru-ui/theme/suru.css";
import { Field } from "../../src/forms/field/index.js";
import { Textarea, Root as TextareaPartsRoot } from "../../src/forms/textarea/index.js";

function getRoot(screen: { container: HTMLElement }): HTMLTextAreaElement | null {
  return screen.container.querySelector<HTMLTextAreaElement>("textarea.sui_textarea");
}

describe("Textarea", () => {
  test("テキストエリアを描画する", async () => {
    // 実行
    const screen = await render(<Textarea />);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    expect(root!.tagName).toBe("TEXTAREA");
  });

  test("既定のスタイルクラスを適用する", async () => {
    // 実行
    const screen = await render(<Textarea />);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root).toHaveClass("sui_textarea-size_md");
    await expect.element(root).toHaveClass("sui_textarea-color_grey");
    await expect.element(root).toHaveClass("sui_textarea-radius_md");
    await expect.element(root).toHaveClass("sui_textarea-variant_liquid");
    expect(root!.classList.contains("sui_textarea-outlined")).toBe(false);
  });

  test("スタイルプロパティーでクラスを上書きできる", async () => {
    // 実行
    const screen = await render(
      <Textarea size="lg" color="red" radius="full" variant="naked" outlined />,
    );

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root).toHaveClass("sui_textarea-size_lg");
    await expect.element(root).toHaveClass("sui_textarea-color_red");
    await expect.element(root).toHaveClass("sui_textarea-radius_full");
    await expect.element(root).toHaveClass("sui_textarea-variant_naked");
    await expect.element(root).toHaveClass("sui_textarea-outlined");
  });

  test("利用者のクラス名を合成する", async () => {
    // 実行
    const screen = await render(<Textarea className="my-textarea" />);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root).toHaveClass("my-textarea");
    await expect.element(root).toHaveClass("sui_textarea");
  });

  test("テキストを入力できる", async () => {
    // 準備
    const screen = await render(<Textarea placeholder="本文" />);

    // 実行
    await userEvent.click(screen.getByPlaceholder("本文"));
    await userEvent.keyboard("こんにちは");

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    expect(root!.value).toBe("こんにちは");
  });

  test("rows プロパティーを行数へ反映する", async () => {
    // 実行
    const screen = await render(<Textarea rows={5} />);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    expect(root!.rows).toBe(5);
  });

  test("無効状態で入力できない", async () => {
    // 準備
    const screen = await render(<Textarea disabled />);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root).toBeDisabled();
    await expect.element(root).toHaveClass("sui_textarea-disabled");
  });

  test("Field の invalid 状態でスタイルクラスを適用する", async () => {
    // 実行
    const screen = await render(
      <Field invalid>
        <Textarea />
      </Field>,
    );

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root).toHaveClass("sui_textarea-invalid");
  });
});

describe("TextareaParts.Root", () => {
  test("textarea 要素へ既定のスタイルクラスを適用する", async () => {
    // 実行
    const screen = await render(<TextareaPartsRoot />);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root).toHaveClass("sui_textarea");
    await expect.element(root).toHaveClass("sui_textarea-size_md");
  });
});
