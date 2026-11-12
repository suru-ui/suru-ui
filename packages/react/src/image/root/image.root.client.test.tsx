import { vi, test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import "../image.parts.js";
import { type ImageRootProps, ImageRoot } from "./image.root.jsx";
import "../../../tests/src/_locators.js";

const imageSrc = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
describe("ImageRoot", () => {
  test("img を既定の要素にして既定の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<ImageRoot alt="風景" src={imageSrc} />);

    // 検証。
    const root = screen.getByAltText("風景").element();
    expect(root.tagName).toBe("IMG");
    expect(root.classList.contains("sui_image")).toBe(true);
    expect(root.classList.contains("sui_image-radius_none")).toBe(true);
    expect(root.classList.contains("sui_image-fit_cover")).toBe(false);
  });

  test("指定した表示方法の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <ImageRoot alt="cover" fit="cover" src={imageSrc} />
        <ImageRoot alt="contain" fit="contain" src={imageSrc} />
        <ImageRoot alt="fill" fit="fill" src={imageSrc} />
        <ImageRoot alt="none" fit="none" src={imageSrc} />
        <ImageRoot alt="scale-down" fit="scale-down" src={imageSrc} />
      </>,
    );

    // 検証。
    expect(screen.getByClassName("sui_image-fit_cover").query()).not.toBe(null);
    expect(screen.getByClassName("sui_image-fit_contain").query()).not.toBe(null);
    expect(screen.getByClassName("sui_image-fit_fill").query()).not.toBe(null);
    expect(screen.getByClassName("sui_image-fit_none").query()).not.toBe(null);
    expect(screen.getByClassName("sui_image-fit_scale-down").query()).not.toBe(null);
  });

  test("指定した角丸の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <ImageRoot alt="none" src={imageSrc} radius="none" />
        <ImageRoot alt="sm" src={imageSrc} radius="sm" />
        <ImageRoot alt="md" src={imageSrc} radius="md" />
        <ImageRoot alt="lg" src={imageSrc} radius="lg" />
        <ImageRoot alt="full" src={imageSrc} radius="full" />
      </>,
    );

    // 検証。
    expect(screen.getByClassName("sui_image-radius_none").query()).not.toBe(null);
    expect(screen.getByClassName("sui_image-radius_sm").query()).not.toBe(null);
    expect(screen.getByClassName("sui_image-radius_md").query()).not.toBe(null);
    expect(screen.getByClassName("sui_image-radius_lg").query()).not.toBe(null);
    expect(screen.getByClassName("sui_image-radius_full").query()).not.toBe(null);
  });

  test("スタイル起点として data-scope を付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<ImageRoot alt="風景" src={imageSrc} />);

    // 検証。
    expect(screen.getByClassName("sui_image").element().getAttribute("data-scope")).toBe("");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<ImageRoot alt="風景" src={imageSrc} className="custom" />);

    // 検証。
    const root = screen.getByClassName("sui_image").element();
    expect(root.classList.contains("custom")).toBe(true);
    expect(root.classList.contains("sui_image")).toBe(true);
  });

  test("利用者の props を img へ渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <ImageRoot
        alt="風景"
        src={imageSrc}
        width={320}
        height={180}
        loading="lazy"
        decoding="async"
      />,
    );

    // 検証。
    const root = screen.getByAltText("風景").element();
    expect(root.getAttribute("width")).toBe("320");
    expect(root.getAttribute("height")).toBe("180");
    expect(root.getAttribute("loading")).toBe("lazy");
    expect(root.getAttribute("decoding")).toBe("async");
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<ImageRoot render={<span />} />);

    // 検証。
    expect(screen.getByClassName("sui_image").element().tagName).toBe("SPAN");
  });

  test("画像の読み込み完了を通知する", async ({ expect }) => {
    // 準備。
    const onLoad = vi.fn<NonNullable<ImageRootProps["onLoad"]>>();

    // 実行。
    const screen = await render(<ImageRoot alt="風景" src={imageSrc} onLoad={onLoad} />);

    // 検証。
    await vi.waitFor(() => {
      expect(onLoad).toHaveBeenCalled();
    });
    expect(screen.getByAltText("風景").element()).toHaveProperty("naturalWidth", 1);
  });

  test("画像の読み込み失敗を通知する", async ({ expect }) => {
    // 準備。
    const onError = vi.fn<NonNullable<ImageRootProps["onError"]>>();

    // 実行。
    const screen = await render(
      <ImageRoot alt="壊れた画像" src="data:image/png;base64,invalid" onError={onError} />,
    );

    // 検証。
    await vi.waitFor(() => {
      expect(onError).toHaveBeenCalled();
    });
    expect(screen.getByAltText("壊れた画像").element()).toHaveProperty("naturalWidth", 0);
  });
});
