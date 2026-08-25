import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";

import "@suru-ui/theme/suru.css";
import { Badge, Root as BadgePartsRoot } from "../src/badge/index.js";

function getRoot(screen: { container: HTMLElement }): HTMLElement | null {
  return screen.container.querySelector<HTMLElement>("span.sui_badge");
}

describe("Badge", () => {
  test("span 要素を描画する", async () => {
    // 実行
    const screen = await render(<Badge>新着</Badge>);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    expect(root!.tagName).toBe("SPAN");
    expect(root!.textContent).toBe("新着");
  });

  test("既定のスタイルクラスを適用する", async () => {
    // 実行
    const screen = await render(<Badge>新着</Badge>);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root!).toHaveClass("sui_badge");
    await expect.element(root!).toHaveClass("sui_badge-size_sm");
    await expect.element(root!).toHaveClass("sui_badge-color_grey");
    await expect.element(root!).toHaveClass("sui_badge-radius_full");
    await expect.element(root!).toHaveClass("sui_badge-variant_liquid");
  });

  test("スタイル系プロパティーでクラスを上書きできる", async () => {
    // 実行
    const screen = await render(
      <Badge size="lg" color="red" radius="none" variant="solid">
        新着
      </Badge>,
    );

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root!).toHaveClass("sui_badge-size_lg");
    await expect.element(root!).toHaveClass("sui_badge-color_red");
    await expect.element(root!).toHaveClass("sui_badge-radius_none");
    await expect.element(root!).toHaveClass("sui_badge-variant_solid");
  });

  test("outlined を有効にすると枠線クラスを付ける", async () => {
    // 実行
    const screen = await render(<Badge outlined>新着</Badge>);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root!).toHaveClass("sui_badge-outlined");
  });

  test("利用者のクラス名を合成する", async () => {
    // 実行
    const screen = await render(<Badge className="my-badge">新着</Badge>);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root!).toHaveClass("my-badge");
    await expect.element(root!).toHaveClass("sui_badge");
  });

  test("render プロパティーで要素を切り替えられる", async () => {
    // 実行
    const screen = await render(<Badge render={<a href="#top" />}>新着</Badge>);

    // 検証
    const root = screen.container.querySelector<HTMLElement>("a.sui_badge");

    expect(root).not.toBeNull();
    expect(root!.tagName).toBe("A");
  });
});

describe("BadgeParts.Root", () => {
  test("span 要素へ既定のスタイルクラスを適用する", async () => {
    // 実行
    const screen = await render(<BadgePartsRoot>新着</BadgePartsRoot>);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root!).toHaveClass("sui_badge");
    await expect.element(root!).toHaveClass("sui_badge-size_sm");
    await expect.element(root!).toHaveClass("sui_badge-variant_liquid");
  });
});
