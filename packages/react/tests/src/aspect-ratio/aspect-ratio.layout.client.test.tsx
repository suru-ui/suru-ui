import "@suru-ui/theme/suru.css";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/aspect-ratio/aspect-ratio.parts.js";
import { AspectRatioRoot } from "../../../src/aspect-ratio/aspect-ratio.root.jsx";
import "../../../src/image/image.parts.js";
import { ImageRoot } from "../../../src/image/image.root.jsx";
import "../_locators.js";

describe("AspectRatioRoot の配置", () => {
  test("指定した比率で幅と高さを保つ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <div style={{ width: "320px" }}>
        <AspectRatioRoot ratio={16 / 9}>
          <div>内容</div>
        </AspectRatioRoot>
      </div>,
    );

    // 検証
    const rect = screen.getByClassName("sui_aspect_ratio").element().getBoundingClientRect();
    expect(rect.width).toBeCloseTo(320, 1);
    expect(rect.height).toBeCloseTo(180, 1);
  });

  test("文字列で指定した比率を使う", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <div style={{ width: "320px" }}>
        <AspectRatioRoot ratio="16 / 9">
          <div>内容</div>
        </AspectRatioRoot>
      </div>,
    );

    // 検証
    const rect = screen.getByClassName("sui_aspect_ratio").element().getBoundingClientRect();
    expect(rect.width).toBeCloseTo(320, 1);
    expect(rect.height).toBeCloseTo(180, 1);
  });

  test("既定では正方形にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <div style={{ width: "320px" }}>
        <AspectRatioRoot>
          <div>内容</div>
        </AspectRatioRoot>
      </div>,
    );

    // 検証
    const rect = screen.getByClassName("sui_aspect_ratio").element().getBoundingClientRect();
    expect(rect.width).toBeCloseTo(320, 1);
    expect(rect.height).toBeCloseTo(320, 1);
  });

  test("子要素をコンテナー全体へ広げる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <div style={{ width: "320px" }}>
        <AspectRatioRoot ratio={1}>
          <div>内容</div>
        </AspectRatioRoot>
      </div>,
    );

    // 検証
    const root = screen.getByClassName("sui_aspect_ratio").element().getBoundingClientRect();
    const content = screen.getByText("内容").element().getBoundingClientRect();
    expect(content.width).toBeCloseTo(root.width, 1);
    expect(content.height).toBeCloseTo(root.height, 1);
  });

  test("画像をコンテナー全体へ広げる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <div style={{ width: "320px" }}>
        <AspectRatioRoot ratio={16 / 9}>
          <img
            alt="風景"
            src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
          />
        </AspectRatioRoot>
      </div>,
    );

    // 検証
    const root = screen.getByClassName("sui_aspect_ratio").element().getBoundingClientRect();
    const image = screen.getByAltText("風景").element().getBoundingClientRect();
    expect(image.width).toBeCloseTo(root.width, 1);
    expect(image.height).toBeCloseTo(root.height, 1);
  });

  test("data-scope を持つ子要素をコンテナー全体へ広げる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <div style={{ width: "320px" }}>
        <AspectRatioRoot ratio={16 / 9}>
          <ImageRoot
            alt="風景"
            src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
          />
        </AspectRatioRoot>
      </div>,
    );

    // 検証
    const root = screen.getByClassName("sui_aspect_ratio").element().getBoundingClientRect();
    const image = screen.getByAltText("風景").element().getBoundingClientRect();
    expect(image.width).toBeCloseTo(root.width, 1);
    expect(image.height).toBeCloseTo(root.height, 1);
  });

  test("指定した角丸で切り抜く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <AspectRatioRoot radius="none" />
        <AspectRatioRoot radius="md" />
        <AspectRatioRoot radius="lg" />
      </>,
    );

    // 検証
    const none = getComputedStyle(screen.getByClassName("sui_aspect_ratio-radius_none").element());
    expect(none.borderTopLeftRadius).toBe("0px");
    expect(none.overflow).toBe("hidden");
    const md = getComputedStyle(screen.getByClassName("sui_aspect_ratio-radius_md").element());
    expect(md.borderTopLeftRadius).toBe("8px");
    const lg = getComputedStyle(screen.getByClassName("sui_aspect_ratio-radius_lg").element());
    expect(lg.borderTopLeftRadius).toBe("12px");
  });

  test("余白を持たない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<AspectRatioRoot />);

    // 検証
    const style = getComputedStyle(screen.getByClassName("sui_aspect_ratio").element());
    expect(style.marginTop).toBe("0px");
    expect(style.marginInlineStart).toBe("0px");
    expect(style.paddingTop).toBe("0px");
    expect(style.paddingInlineStart).toBe("0px");
  });
});
