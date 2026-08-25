import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";

import "@suru-ui/theme/suru.css";
import { Skeleton, Root as SkeletonPartsRoot } from "../src/skeleton/index.js";

function getRoot(screen: { container: HTMLElement }): HTMLElement | null {
  return screen.container.querySelector<HTMLElement>("span.sui_skeleton");
}

describe("Skeleton", () => {
  test("span 要素を描画する", async () => {
    // 実行
    const screen = await render(<Skeleton />);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    expect(root!.tagName).toBe("SPAN");
  });

  test("既定のスタイルクラスを適用する", async () => {
    // 実行
    const screen = await render(<Skeleton />);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root!).toHaveClass("sui_skeleton");
    await expect.element(root!).toHaveClass("sui_skeleton-radius_md");
    await expect.element(root!).toHaveClass("sui_skeleton-animated");
  });

  test("radius プロパティーでクラスを上書きできる", async () => {
    // 実行
    const screen = await render(<Skeleton radius="full" />);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root!).toHaveClass("sui_skeleton-radius_full");
  });

  test("animated を無効にするとアニメーションクラスを外す", async () => {
    // 実行
    const screen = await render(<Skeleton animated={false} />);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root!).not.toHaveClass("sui_skeleton-animated");
  });

  test("利用者のクラス名を合成する", async () => {
    // 実行
    const screen = await render(<Skeleton className="my-skeleton" />);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root!).toHaveClass("my-skeleton");
    await expect.element(root!).toHaveClass("sui_skeleton");
  });
});

describe("SkeletonParts.Root", () => {
  test("span 要素へ既定のスタイルクラスを適用する", async () => {
    // 実行
    const screen = await render(<SkeletonPartsRoot />);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root!).toHaveClass("sui_skeleton");
    await expect.element(root!).toHaveClass("sui_skeleton-radius_md");
    await expect.element(root!).toHaveClass("sui_skeleton-animated");
  });
});
