import "@suru-ui/theme/suru.css";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/avatar/avatar.parts.js";
import { AvatarFallback } from "../../../src/avatar/avatar.fallback.jsx";
import { AvatarImage } from "../../../src/avatar/avatar.image.jsx";
import { AvatarRoot } from "../../../src/avatar/avatar.root.jsx";
import "../_locators.js";

const imageSrc = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

describe("AvatarRoot の配置", () => {
  test("指定した大きさの正方形にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <AvatarRoot id="sm" size="sm" />
        <AvatarRoot id="md" size="md" />
        <AvatarRoot id="lg" size="lg" />
      </>,
    );

    // 検証
    const sm = screen.container.querySelector<HTMLElement>("#sm")?.getBoundingClientRect();
    expect(sm?.width).toBeCloseTo(22.4, 1);
    expect(sm?.height).toBeCloseTo(22.4, 1);
    const md = screen.container.querySelector<HTMLElement>("#md")?.getBoundingClientRect();
    expect(md?.width).toBeCloseTo(28, 1);
    expect(md?.height).toBeCloseTo(28, 1);
    const lg = screen.container.querySelector<HTMLElement>("#lg")?.getBoundingClientRect();
    expect(lg?.width).toBeCloseTo(33.6, 1);
    expect(lg?.height).toBeCloseTo(33.6, 1);
  });

  test("内容を中央に配置する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AvatarRoot>
        <span>名</span>
      </AvatarRoot>,
    );

    // 検証
    const root = screen.getByClassName("sui_avatar").element();
    const style = getComputedStyle(root);
    expect(style.display).toBe("inline-flex");
    expect(style.alignItems).toBe("center");
    expect(style.justifyContent).toBe("center");
    const rootRect = root.getBoundingClientRect();
    const textRect = screen.getByText("名").element().getBoundingClientRect();
    expect(textRect.left + textRect.width / 2).toBeCloseTo(rootRect.left + rootRect.width / 2, 1);
    expect(textRect.top + textRect.height / 2).toBeCloseTo(rootRect.top + rootRect.height / 2, 1);
  });

  test("活字を大きさに追従させる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <AvatarRoot id="sm" size="sm">
          名
        </AvatarRoot>
        <AvatarRoot id="md" size="md">
          名
        </AvatarRoot>
        <AvatarRoot id="lg" size="lg">
          名
        </AvatarRoot>
      </>,
    );

    // 検証
    const sm = getComputedStyle(screen.container.querySelector<HTMLElement>("#sm")!);
    expect(sm.fontSize).toBe("12px");
    expect(sm.fontWeight).toBe("700");
    expect(sm.fontFamily).toContain("Noto Sans JP");
    const md = getComputedStyle(screen.container.querySelector<HTMLElement>("#md")!);
    expect(md.fontSize).toBe("14px");
    expect(md.fontWeight).toBe("700");
    const lg = getComputedStyle(screen.container.querySelector<HTMLElement>("#lg")!);
    expect(lg.fontSize).toBe("17px");
    expect(lg.fontWeight).toBe("700");
  });

  test("指定した角丸で切り抜く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <AvatarRoot id="none" radius="none" />
        <AvatarRoot id="sm" radius="sm" />
        <AvatarRoot id="lg" radius="lg" />
        <AvatarRoot id="full" radius="full" />
        <AvatarRoot id="fullLg" radius="full" size="lg" />
      </>,
    );

    // 検証
    const none = getComputedStyle(screen.container.querySelector<HTMLElement>("#none")!);
    expect(none.borderTopLeftRadius).toBe("0px");
    const sm = getComputedStyle(screen.container.querySelector<HTMLElement>("#sm")!);
    expect(sm.borderTopLeftRadius).toBe("4px");
    const lg = getComputedStyle(screen.container.querySelector<HTMLElement>("#lg")!);
    expect(lg.borderTopLeftRadius).toBe("12px");
    const full = getComputedStyle(screen.container.querySelector<HTMLElement>("#full")!);
    expect(full.borderTopLeftRadius).toBe("14px");
    const fullLg = getComputedStyle(screen.container.querySelector<HTMLElement>("#fullLg")!);
    expect(fullLg.borderTopLeftRadius).toBe("16.8px");
  });

  test("配色を背景と文字へ適用する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span
          style={{
            color: "var(--sui-blue-solid-canvas_text-normal)",
            backgroundColor: "var(--sui-blue-solid-canvas-normal)",
          }}
        >
          色の基準
        </span>
        <AvatarRoot color="blue">
          <AvatarFallback>名</AvatarFallback>
        </AvatarRoot>
      </>,
    );

    // 検証
    const expected = getComputedStyle(screen.getByText("色の基準").element());
    const root = getComputedStyle(screen.getByClassName("sui_avatar").element());
    expect(root.color).toBe(expected.color);
    expect(root.backgroundColor).toBe(expected.backgroundColor);
    const fallback = getComputedStyle(screen.getByClassName("sui_avatar_fallback").element());
    expect(fallback.color).toBe(expected.color);
  });

  test("余白を持たない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<AvatarRoot />);

    // 検証
    const style = getComputedStyle(screen.getByClassName("sui_avatar").element());
    expect(style.marginTop).toBe("0px");
    expect(style.marginInlineStart).toBe("0px");
    expect(style.paddingTop).toBe("0px");
    expect(style.paddingInlineStart).toBe("0px");
  });

  test("公開変数で大きさを上書きできる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<AvatarRoot id="custom" />);
    const root = screen.container.querySelector<HTMLElement>("#custom")!;
    root.style.setProperty("--sui_avatar-size", "48px");

    // 検証
    expect(root.getBoundingClientRect().width).toBeCloseTo(48, 1);
    expect(root.getBoundingClientRect().height).toBeCloseTo(48, 1);
  });

  test("画像をアバター全体へ広げる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AvatarRoot>
        <AvatarImage alt="プロフィール画像" src={imageSrc} />
      </AvatarRoot>,
    );

    // 検証
    await vi.waitFor(() => {
      expect(screen.getByAltText("プロフィール画像").query()).not.toBe(null);
    });
    const root = screen.getByClassName("sui_avatar").element().getBoundingClientRect();
    const image = screen.getByAltText("プロフィール画像").element();
    const imageRect = image.getBoundingClientRect();
    expect(imageRect.width).toBeCloseTo(root.width, 1);
    expect(imageRect.height).toBeCloseTo(root.height, 1);
    expect(getComputedStyle(image).objectFit).toBe("cover");
  });

  test("画像の角丸をアバターに合わせる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AvatarRoot radius="full">
        <AvatarImage alt="プロフィール画像" src={imageSrc} />
      </AvatarRoot>,
    );

    // 検証
    await vi.waitFor(() => {
      expect(screen.getByAltText("プロフィール画像").query()).not.toBe(null);
    });
    const root = getComputedStyle(screen.getByClassName("sui_avatar").element());
    const image = getComputedStyle(screen.getByAltText("プロフィール画像").element());
    expect(image.borderTopLeftRadius).toBe(root.borderTopLeftRadius);
  });

  test("フォールバックをアバター全体へ広げる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AvatarRoot>
        <AvatarFallback>名</AvatarFallback>
      </AvatarRoot>,
    );

    // 検証
    const root = screen.getByClassName("sui_avatar").element().getBoundingClientRect();
    const fallback = screen.getByClassName("sui_avatar_fallback").element();
    const fallbackRect = fallback.getBoundingClientRect();
    expect(fallbackRect.width).toBeCloseTo(root.width, 1);
    expect(fallbackRect.height).toBeCloseTo(root.height, 1);
    const style = getComputedStyle(fallback);
    expect(style.borderTopLeftRadius).toBe("14px");
    expect(style.fontSize).toBe("14px");
    expect(style.fontWeight).toBe("700");
  });
});
