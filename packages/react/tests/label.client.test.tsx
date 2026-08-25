import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import "@suru-ui/theme/suru.css";
import { Input } from "../src/input/index.js";
import { Label, Root as LabelPartsRoot } from "../src/label/index.js";

function getRoot(screen: { container: HTMLElement }): HTMLLabelElement | null {
  return screen.container.querySelector<HTMLLabelElement>("label.sui_label");
}

describe("Label", () => {
  test("label 要素を描画する", async () => {
    // 実行
    const screen = await render(<Label>ラベル</Label>);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    expect(root!.tagName).toBe("LABEL");
    expect(root!.textContent).toBe("ラベル");
  });

  test("既定のスタイルクラスを適用する", async () => {
    // 実行
    const screen = await render(<Label>ラベル</Label>);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root).toHaveClass("sui_label-size_md");
  });

  test("スタイルプロパティーでクラスを上書きできる", async () => {
    // 実行
    const screen = await render(<Label size="lg">ラベル</Label>);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root).toHaveClass("sui_label-size_lg");
  });

  test("利用者のクラス名を合成する", async () => {
    // 実行
    const screen = await render(<Label className="my-label">ラベル</Label>);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root).toHaveClass("my-label");
    await expect.element(root).toHaveClass("sui_label");
  });

  test("htmlFor プロパティーでコントロールと紐付く", async () => {
    // 実行
    const screen = await render(
      <>
        <Label htmlFor="label-htmlfor-input">メールアドレス</Label>
        <Input id="label-htmlfor-input" />
      </>,
    );

    // 検証
    const input = screen.getByRole("textbox").element();

    // 実行
    await userEvent.click(screen.getByText("メールアドレス"));

    // 検証
    expect(document.activeElement).toBe(input);
  });
});

describe("LabelParts.Root", () => {
  test("label 要素へ既定のスタイルクラスを適用する", async () => {
    // 実行
    const screen = await render(<LabelPartsRoot>ラベル</LabelPartsRoot>);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root).toHaveClass("sui_label");
    await expect.element(root).toHaveClass("sui_label-size_md");
  });
});
