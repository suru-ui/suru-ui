import "@suru-ui/theme/suru.css";
import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import "../aspect-ratio/aspect-ratio.parts.js";
import { AspectRatioRoot } from "../aspect-ratio/root/aspect-ratio.root.jsx";
import "./image.parts.js";
import { Image } from "./image.jsx";
import { ImageRoot } from "./root/image.root.jsx";
import "../../tests/src/_locators.js";

const imageSrc = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
describe("ImageRoot の配置", () => {
  test("外部の余白を持たない", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<ImageRoot alt="風景" src={imageSrc} />);

    // 検証。
    const style = getComputedStyle(screen.getByAltText("風景").element());
    expect(style.marginTop).toBe("0px");
    expect(style.marginInlineStart).toBe("0px");
    expect(style.paddingTop).toBe("0px");
    expect(style.paddingInlineStart).toBe("0px");
  });

  test("ブロックとして幅の上限をコンテナーに合わせる", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<ImageRoot alt="風景" src={imageSrc} />);

    // 検証。
    const style = getComputedStyle(screen.getByAltText("風景").element());
    expect(style.display).toBe("block");
    expect(style.maxWidth).toBe("100%");
  });

  test("コンテナーからはみ出さない", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <div style={{ width: "160px" }}>
        <ImageRoot alt="風景" src={imageSrc} width={320} />
      </div>,
    );

    // 検証。
    const rect = screen.getByAltText("風景").element().getBoundingClientRect();
    expect(rect.width).toBeCloseTo(160, 1);
    expect(rect.height).toBeCloseTo(160, 1);
  });

  test("指定した表示方法でコンテナーに収める", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <ImageRoot alt="cover" fit="cover" src={imageSrc} width={80} height={80} />
        <ImageRoot alt="contain" fit="contain" src={imageSrc} width={80} height={80} />
        <ImageRoot alt="fill" fit="fill" src={imageSrc} width={80} height={80} />
        <ImageRoot alt="none" fit="none" src={imageSrc} width={80} height={80} />
        <ImageRoot alt="scale-down" fit="scale-down" src={imageSrc} width={80} height={80} />
      </>,
    );

    // 検証。
    expect(getComputedStyle(screen.getByAltText("cover").element()).objectFit).toBe("cover");
    expect(getComputedStyle(screen.getByAltText("contain").element()).objectFit).toBe("contain");
    expect(getComputedStyle(screen.getByAltText("fill").element()).objectFit).toBe("fill");
    expect(getComputedStyle(screen.getByAltText("none").element()).objectFit).toBe("none");
    expect(getComputedStyle(screen.getByAltText("scale-down").element()).objectFit).toBe(
      "scale-down",
    );
  });

  test("既定では表示方法を指定しない", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<ImageRoot alt="風景" src={imageSrc} />);

    // 検証。
    expect(getComputedStyle(screen.getByAltText("風景").element()).objectFit).toBe("fill");
    expect(screen.getByAltText("風景").element().className).not.toContain("sui_image-fit_");
  });

  test("指定した角丸で切り抜く", async ({ expect }) => {
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
    const none = getComputedStyle(screen.getByAltText("none").element());
    expect(none.borderTopLeftRadius).toBe("0px");

    const sm = getComputedStyle(screen.getByAltText("sm").element());
    expect(sm.borderTopLeftRadius).toBe("4px");

    const md = getComputedStyle(screen.getByAltText("md").element());
    expect(md.borderTopLeftRadius).toBe("8px");

    const lg = getComputedStyle(screen.getByAltText("lg").element());
    expect(lg.borderTopLeftRadius).toBe("12px");

    const full = getComputedStyle(screen.getByAltText("full").element());
    expect(full.borderTopLeftRadius).toBe("9999px");
  });

  test("公開変数で表示方法と角丸を上書きできる", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<ImageRoot id="custom" alt="風景" src={imageSrc} />);
    const root = screen.container.querySelector<HTMLElement>("#custom")!;
    root.style.setProperty("--sui_image-object_fit", "contain");
    root.style.setProperty("--sui_image-border_radius", "12px");

    // 検証。
    const style = getComputedStyle(root);
    expect(style.objectFit).toBe("contain");
    expect(style.borderTopLeftRadius).toBe("12px");
  });

  test("アスペクト比コンテナーいっぱいに広がる", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <div style={{ width: "320px" }}>
        <AspectRatioRoot ratio={16 / 9}>
          <Image alt="風景" fit="cover" src={imageSrc} />
        </AspectRatioRoot>
      </div>,
    );

    // 検証。
    const container = screen.getByClassName("sui_aspect_ratio").element().getBoundingClientRect();
    const image = screen.getByAltText("風景").element().getBoundingClientRect();
    expect(image.width).toBeCloseTo(container.width, 1);
    expect(image.height).toBeCloseTo(container.height, 1);
    expect(image.width).toBeCloseTo(320, 1);
    expect(image.height).toBeCloseTo(180, 1);
  });
});
