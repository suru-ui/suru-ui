import "@suru-ui/theme/suru.css";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import "./badge.parts.js";
import "../../tests/src/_locators.js";
import { BadgeRoot } from "./root/badge.root.jsx";

describe("BadgeRoot の配置", () => {
  test("大きさごとの最小寸法を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <BadgeRoot id="sm" size="sm">
          42
        </BadgeRoot>
        <BadgeRoot id="md" size="md">
          42
        </BadgeRoot>
        <BadgeRoot id="lg" size="lg">
          42
        </BadgeRoot>
      </>,
    );

    // 検証
    const sm = screen.container.querySelector<HTMLElement>("#sm")?.getBoundingClientRect();
    expect(sm?.height).toBeCloseTo(26, 1);
    const md = screen.container.querySelector<HTMLElement>("#md")?.getBoundingClientRect();
    expect(md?.height).toBeCloseTo(32, 1);
    const lg = screen.container.querySelector<HTMLElement>("#lg")?.getBoundingClientRect();
    expect(lg?.height).toBeCloseTo(36, 1);
  });

  test("dot では大きさの半分の正方形にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <BadgeRoot id="sm" size="sm" variant="dot" />
        <BadgeRoot id="md" size="md" variant="dot" />
        <BadgeRoot id="lg" size="lg" variant="dot" />
      </>,
    );

    // 検証
    const sm = screen.container.querySelector<HTMLElement>("#sm")?.getBoundingClientRect();
    expect(sm?.width).toBeCloseTo(13, 1);
    expect(sm?.height).toBeCloseTo(13, 1);
    const md = screen.container.querySelector<HTMLElement>("#md")?.getBoundingClientRect();
    expect(md?.width).toBeCloseTo(16, 1);
    expect(md?.height).toBeCloseTo(16, 1);
    const lg = screen.container.querySelector<HTMLElement>("#lg")?.getBoundingClientRect();
    expect(lg?.width).toBeCloseTo(18, 1);
    expect(lg?.height).toBeCloseTo(18, 1);
  });

  test("内容を中央に配置する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<BadgeRoot>42</BadgeRoot>);

    // 検証
    const root = screen.getByClassName("sui_badge").element();
    const style = getComputedStyle(root);
    expect(style.display).toBe("inline-flex");
    expect(style.alignItems).toBe("center");
    expect(style.justifyContent).toBe("center");
    const rootRect = root.getBoundingClientRect();
    const textRect = screen.getByText("42").element().getBoundingClientRect();
    expect(textRect.left + textRect.width / 2).toBeCloseTo(rootRect.left + rootRect.width / 2, 1);
    expect(textRect.top + textRect.height / 2).toBeCloseTo(rootRect.top + rootRect.height / 2, 1);
  });

  test("大きさごとの内側の余白を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <BadgeRoot id="sm" size="sm">
          42
        </BadgeRoot>
        <BadgeRoot id="md" size="md">
          42
        </BadgeRoot>
        <BadgeRoot id="lg" size="lg">
          42
        </BadgeRoot>
      </>,
    );

    // 検証
    const sm = getComputedStyle(screen.container.querySelector<HTMLElement>("#sm")!);
    expect(sm.paddingInlineStart).toBe("6px");
    const md = getComputedStyle(screen.container.querySelector<HTMLElement>("#md")!);
    expect(md.paddingInlineStart).toBe("10px");
    const lg = getComputedStyle(screen.container.querySelector<HTMLElement>("#lg")!);
    expect(Number.parseFloat(lg.paddingInlineStart)).toBeCloseTo(14, 1);
  });

  test("大きさごとの間隔を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <BadgeRoot id="sm" size="sm">
          <span>前</span>
          <span>後</span>
        </BadgeRoot>
        <BadgeRoot id="md" size="md">
          <span>前</span>
          <span>後</span>
        </BadgeRoot>
        <BadgeRoot id="lg" size="lg">
          <span>前</span>
          <span>後</span>
        </BadgeRoot>
      </>,
    );

    // 検証
    const sm = getComputedStyle(screen.container.querySelector<HTMLElement>("#sm")!);
    expect(sm.columnGap).toBe("2px");
    const md = getComputedStyle(screen.container.querySelector<HTMLElement>("#md")!);
    expect(md.columnGap).toBe("4px");
    const lg = getComputedStyle(screen.container.querySelector<HTMLElement>("#lg")!);
    expect(lg.columnGap).toBe("6px");
  });

  test("指定した角丸で切り抜く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <BadgeRoot id="none" radius="none" />
        <BadgeRoot id="sm" radius="sm" />
        <BadgeRoot id="md" radius="md" />
        <BadgeRoot id="lg" radius="lg" />
        <BadgeRoot id="full" radius="full" />
        <BadgeRoot id="fullLg" size="lg" radius="full" />
      </>,
    );

    // 検証
    const none = getComputedStyle(screen.container.querySelector<HTMLElement>("#none")!);
    expect(none.borderTopLeftRadius).toBe("0px");
    const sm = getComputedStyle(screen.container.querySelector<HTMLElement>("#sm")!);
    expect(sm.borderTopLeftRadius).toBe("4px");
    const md = getComputedStyle(screen.container.querySelector<HTMLElement>("#md")!);
    expect(md.borderTopLeftRadius).toBe("8px");
    const lg = getComputedStyle(screen.container.querySelector<HTMLElement>("#lg")!);
    expect(lg.borderTopLeftRadius).toBe("12px");
    const full = getComputedStyle(screen.container.querySelector<HTMLElement>("#full")!);
    expect(full.borderTopLeftRadius).toBe("13px");
    const fullLg = getComputedStyle(screen.container.querySelector<HTMLElement>("#fullLg")!);
    expect(fullLg.borderTopLeftRadius).toBe("18px");
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
        <BadgeRoot color="blue">42</BadgeRoot>
      </>,
    );

    // 検証
    const expected = getComputedStyle(screen.getByText("色の基準").element());
    const root = getComputedStyle(screen.getByClassName("sui_badge").element());
    expect(root.color).toBe(expected.color);
    expect(root.backgroundColor).toBe(expected.backgroundColor);
  });

  test("枠線を疑似要素で描く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span
          style={{
            borderColor: "var(--sui-blue-solid-border-normal)",
            borderStyle: "solid",
          }}
        >
          枠線の基準
        </span>
        <BadgeRoot id="plain">42</BadgeRoot>
        <BadgeRoot id="outlined" color="blue" outlined>
          42
        </BadgeRoot>
      </>,
    );

    // 検証
    const expected = getComputedStyle(screen.getByText("枠線の基準").element());
    const plain = getComputedStyle(
      screen.container.querySelector<HTMLElement>("#plain")!,
      "::after",
    );
    expect(plain.borderTopWidth).toBe("0px");
    const outlined = getComputedStyle(
      screen.container.querySelector<HTMLElement>("#outlined")!,
      "::after",
    );
    expect(Number.parseFloat(outlined.borderTopWidth)).toBeGreaterThan(0.5);
    expect(Number.parseFloat(outlined.borderTopWidth)).toBeLessThan(1.5);
    expect(outlined.borderTopColor).toBe(expected.borderTopColor);
  });

  test("リングを影で描く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <BadgeRoot id="plain">42</BadgeRoot>
        <BadgeRoot id="ring" ring>
          42
        </BadgeRoot>
      </>,
    );

    // 検証
    const plain = getComputedStyle(screen.container.querySelector<HTMLElement>("#plain")!);
    const ring = getComputedStyle(screen.container.querySelector<HTMLElement>("#ring")!);
    expect(plain.boxShadow).not.toBe(ring.boxShadow);
    expect(plain.boxShadow).toContain("0px 0px 0px 0px");
    expect(ring.boxShadow).not.toContain("0px 0px 0px 0px");
  });

  test("配置を祖先の四隅に合わせる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <div id="container" style={{ width: "100px", height: "100px", position: "relative" }}>
        <BadgeRoot id="badge" position="top-right">
          42
        </BadgeRoot>
      </div>,
    );

    // 検証
    const container = screen.container
      .querySelector<HTMLElement>("#container")!
      .getBoundingClientRect();
    const badge = screen.container.querySelector<HTMLElement>("#badge")!.getBoundingClientRect();
    expect(getComputedStyle(screen.container.querySelector<HTMLElement>("#badge")!).position).toBe(
      "absolute",
    );
    expect(badge.left + badge.width / 2).toBeCloseTo(container.right, 1);
    expect(badge.top + badge.height / 2).toBeCloseTo(container.top, 1);
  });

  test("円形の重なりでは内側へ寄せる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <div id="container" style={{ width: "100px", height: "100px", position: "relative" }}>
        <BadgeRoot id="badge" overlap="circular" position="top-right">
          42
        </BadgeRoot>
      </div>,
    );

    // 検証
    const container = screen.container
      .querySelector<HTMLElement>("#container")!
      .getBoundingClientRect();
    const badge = screen.container.querySelector<HTMLElement>("#badge")!.getBoundingClientRect();
    expect(badge.left + badge.width / 2).toBeCloseTo(container.right - 14, 1);
    expect(badge.top + badge.height / 2).toBeCloseTo(container.top + 14, 1);
  });

  test("活字を大きさに追従させる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <BadgeRoot id="sm" size="sm">
          42
        </BadgeRoot>
        <BadgeRoot id="md" size="md">
          42
        </BadgeRoot>
        <BadgeRoot id="lg" size="lg">
          42
        </BadgeRoot>
      </>,
    );

    // 検証
    const sm = getComputedStyle(screen.container.querySelector<HTMLElement>("#sm")!);
    expect(sm.fontSize).toBe("12px");
    expect(sm.fontWeight).toBe("500");
    expect(sm.fontFamily).toContain("Noto Sans JP");
    const md = getComputedStyle(screen.container.querySelector<HTMLElement>("#md")!);
    expect(md.fontSize).toBe("14px");
    expect(md.fontWeight).toBe("500");
    const lg = getComputedStyle(screen.container.querySelector<HTMLElement>("#lg")!);
    expect(lg.fontSize).toBe("17px");
    expect(lg.fontWeight).toBe("500");
  });

  test("外部の余白を持たない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<BadgeRoot />);

    // 検証
    const style = getComputedStyle(screen.getByClassName("sui_badge").element());
    expect(style.marginTop).toBe("0px");
    expect(style.marginInlineStart).toBe("0px");
    expect(style.paddingBlockStart).toBe("0px");
  });

  test("公開変数で大きさを上書きできる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<BadgeRoot id="custom" />);
    const root = screen.container.querySelector<HTMLElement>("#custom")!;
    root.style.setProperty("--sui_badge-min_size", "48px");

    // 検証
    expect(root.getBoundingClientRect().height).toBeCloseTo(48, 1);
  });
});
