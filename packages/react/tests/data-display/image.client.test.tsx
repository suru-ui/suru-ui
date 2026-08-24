import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";

import "@suru-ui/theme/suru.css";
import { Image, Root as ImagePartsRoot } from "../../src/data-display/image/index.js";

function getRoot(screen: { container: HTMLElement }): HTMLElement | null {
  return screen.container.querySelector<HTMLElement>("img.sui_image");
}

describe("Image", () => {
  test("img 要素を描画する", async () => {
    // 実行
    const screen = await render(<Image src="https://example.com/a.png" alt="画像" />);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    expect(root!.tagName).toBe("IMG");
  });

  test("既定のスタイルクラスを適用する", async () => {
    // 実行
    const screen = await render(<Image src="https://example.com/a.png" alt="画像" />);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root!).toHaveClass("sui_image");
    await expect.element(root!).toHaveClass("sui_image-radius_none");
  });

  test("radius プロパティーでクラスを上書きできる", async () => {
    // 実行
    const screen = await render(<Image src="https://example.com/a.png" alt="画像" radius="full" />);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root!).toHaveClass("sui_image-radius_full");
  });

  test("fit プロパティーを指定すると表示方法のクラスを適用する", async () => {
    // 実行
    const screen = await render(<Image src="https://example.com/a.png" alt="画像" fit="cover" />);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root!).toHaveClass("sui_image-fit_cover");
  });

  test("fit プロパティーを指定しない場合は表示方法のクラスを適用しない", async () => {
    // 実行
    const screen = await render(<Image src="https://example.com/a.png" alt="画像" />);

    // 検証
    const root = getRoot(screen);
    const fitClasses = [...root!.classList].filter((className) =>
      className.startsWith("sui_image-fit_"),
    );

    expect(fitClasses).toStrictEqual([]);
  });

  test("利用者のクラス名を合成する", async () => {
    // 実行
    const screen = await render(
      <Image src="https://example.com/a.png" alt="画像" className="my-image" />,
    );

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root!).toHaveClass("my-image");
    await expect.element(root!).toHaveClass("sui_image");
  });
});

describe("ImageParts.Root", () => {
  test("img 要素へ既定のスタイルクラスを適用する", async () => {
    // 実行
    const screen = await render(<ImagePartsRoot src="https://example.com/a.png" alt="画像" />);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root!).toHaveClass("sui_image");
    await expect.element(root!).toHaveClass("sui_image-radius_none");
  });
});
