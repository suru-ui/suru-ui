import "@suru-ui/theme/suru.css";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/skeleton/skeleton.parts.js";
import { SkeletonRoot } from "../../../src/skeleton/root/skeleton.root.jsx";
import "../_locators.js";

describe("SkeletonRoot の配置", () => {
  test("親要素いっぱいに広がる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <div style={{ width: "200px", height: "80px" }}>
        <SkeletonRoot />
      </div>,
    );

    // 検証
    const rect = screen.getByClassName("sui_skeleton").element().getBoundingClientRect();
    expect(rect.width).toBeCloseTo(200, 1);
    expect(rect.height).toBeCloseTo(80, 1);
  });

  test("ブロックとしてポインター操作を無効にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<SkeletonRoot />);

    // 検証
    const style = getComputedStyle(screen.getByClassName("sui_skeleton").element());
    expect(style.display).toBe("block");
    expect(style.pointerEvents).toBe("none");
  });

  test("指定した角丸で切り抜く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <SkeletonRoot id="none" radius="none" />
        <SkeletonRoot id="sm" radius="sm" />
        <SkeletonRoot id="md" radius="md" />
        <SkeletonRoot id="lg" radius="lg" />
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
  });

  test("アニメーションを適用する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <SkeletonRoot id="pulse" animation="pulse" />
        <SkeletonRoot id="shine" animation="shine" />
        <SkeletonRoot id="none" animation="none" />
      </>,
    );

    // 検証
    const pulse = getComputedStyle(screen.container.querySelector<HTMLElement>("#pulse")!);
    expect(pulse.animationName).toBe("sui_skeleton-pulse");
    expect(pulse.animationDuration).toBe("1.2s");
    expect(pulse.animationIterationCount).toBe("infinite");
    const shine = getComputedStyle(screen.container.querySelector<HTMLElement>("#shine")!);
    expect(shine.animationName).toBe("sui_skeleton-shine");
    expect(shine.animationDuration).toBe("5s");
    expect(shine.animationIterationCount).toBe("infinite");
    expect(shine.backgroundImage).toContain("linear-gradient");
    expect(shine.backgroundColor).toBe("rgba(0, 0, 0, 0)");
    const none = getComputedStyle(screen.container.querySelector<HTMLElement>("#none")!);
    expect(none.animationName).toBe("none");
    expect(none.animationDuration).toBe("0s");
    expect(none.backgroundImage).toBe("none");
  });

  test("背景色をグレーの薄い塗りつぶしにする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span style={{ backgroundColor: "var(--sui-grey-liquid-canvas-subtle)" }}>基準</span>
        <SkeletonRoot />
      </>,
    );

    // 検証
    const expected = getComputedStyle(screen.getByText("基準").element());
    const root = getComputedStyle(screen.getByClassName("sui_skeleton").element());
    expect(root.backgroundColor).toBe(expected.backgroundColor);
  });

  test("オーバーレイでは親要素に重ねる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <div id="container" style={{ position: "relative", width: "200px", height: "100px" }}>
        <SkeletonRoot id="skeleton" overlay />
      </div>,
    );

    // 検証
    const container = screen.container
      .querySelector<HTMLElement>("#container")!
      .getBoundingClientRect();
    const skeleton = screen.container.querySelector<HTMLElement>("#skeleton")!;
    const style = getComputedStyle(skeleton);
    expect(style.position).toBe("absolute");
    expect(style.zIndex).not.toBe("auto");
    const rect = skeleton.getBoundingClientRect();
    expect(rect.left).toBeCloseTo(container.left, 1);
    expect(rect.top).toBeCloseTo(container.top, 1);
    expect(rect.width).toBeCloseTo(container.width, 1);
    expect(rect.height).toBeCloseTo(container.height, 1);
  });

  test("既定では重ねずに配置する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<SkeletonRoot />);

    // 検証
    const style = getComputedStyle(screen.getByClassName("sui_skeleton").element());
    expect(style.position).toBe("static");
    expect(style.zIndex).toBe("auto");
  });

  test("公開変数で大きさと背景色を上書きできる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<SkeletonRoot id="custom" />);
    const root = screen.container.querySelector<HTMLElement>("#custom")!;
    root.style.setProperty("--sui_skeleton-height", "24px");
    root.style.setProperty("--sui_skeleton-background_color", "rgb(255, 0, 0)");

    // 検証
    const style = getComputedStyle(root);
    expect(style.height).toBe("24px");
    expect(style.backgroundColor).toBe("rgb(255, 0, 0)");
  });

  test("外部と内側の余白を持たない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<SkeletonRoot />);

    // 検証
    const style = getComputedStyle(screen.getByClassName("sui_skeleton").element());
    expect(style.marginTop).toBe("0px");
    expect(style.marginInlineStart).toBe("0px");
    expect(style.paddingTop).toBe("0px");
    expect(style.paddingInlineStart).toBe("0px");
  });
});
