import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";

import "@suru-ui/theme/suru.css";
import { AspectRatio, Root as AspectRatioPartsRoot } from "../../src/layout/aspect-ratio/index.js";

function getRoot(screen: { container: HTMLElement }): HTMLElement | null {
  return screen.container.querySelector<HTMLElement>("div.sui_aspect_ratio");
}

describe("AspectRatio", () => {
  test("div 要素を描画する", async () => {
    // 実行
    const screen = await render(<AspectRatio />);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    expect(root!.tagName).toBe("DIV");
  });

  test("既定のスタイルクラスを適用する", async () => {
    // 実行
    const screen = await render(<AspectRatio />);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root!).toHaveClass("sui_aspect_ratio");
  });

  test("既定では比率の CSS 変数をインラインスタイルへ設定しない", async () => {
    // 実行
    const screen = await render(<AspectRatio />);

    // 検証
    const root = getRoot(screen);

    expect(root!.style.getPropertyValue("--sui_aspect_ratio-ratio")).toBe("");
  });

  test("ratio プロパティーを CSS 変数として設定できる", async () => {
    // 実行
    const screen = await render(<AspectRatio ratio={16 / 9} />);

    // 検証
    const root = getRoot(screen);

    expect(root!.style.getPropertyValue("--sui_aspect_ratio-ratio")).toBe(String(16 / 9));
  });

  test("ratio プロパティーに文字列を指定できる", async () => {
    // 実行
    const screen = await render(<AspectRatio ratio="16 / 9" />);

    // 検証
    const root = getRoot(screen);

    expect(root!.style.getPropertyValue("--sui_aspect_ratio-ratio")).toBe("16 / 9");
  });

  test("利用者のクラス名を合成する", async () => {
    // 実行
    const screen = await render(<AspectRatio className="my-aspect-ratio" />);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root!).toHaveClass("my-aspect-ratio");
    await expect.element(root!).toHaveClass("sui_aspect_ratio");
  });
});

describe("AspectRatioParts.Root", () => {
  test("div 要素へ既定のスタイルクラスを適用する", async () => {
    // 実行
    const screen = await render(<AspectRatioPartsRoot />);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root!).toHaveClass("sui_aspect_ratio");
  });
});
