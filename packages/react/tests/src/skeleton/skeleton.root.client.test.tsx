import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/skeleton/skeleton.parts.js";
import { SkeletonRoot } from "../../../src/skeleton/root/skeleton.root.jsx";
import "../_locators.js";

describe("SkeletonRoot", () => {
  test("既定の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<SkeletonRoot />);

    // 検証
    const root = screen.getByClassName("sui_skeleton").element();
    expect(root.classList.contains("sui_skeleton")).toBe(true);
    expect(root.classList.contains("sui_skeleton-radius_md")).toBe(true);
    expect(root.classList.contains("sui_skeleton-animation_pulse")).toBe(true);
  });

  test("指定した角丸の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <SkeletonRoot radius="none" />
        <SkeletonRoot radius="sm" />
        <SkeletonRoot radius="md" />
        <SkeletonRoot radius="lg" />
      </>,
    );

    // 検証
    expect(screen.getByClassName("sui_skeleton-radius_none").query()).not.toBe(null);
    expect(screen.getByClassName("sui_skeleton-radius_sm").query()).not.toBe(null);
    expect(screen.getByClassName("sui_skeleton-radius_md").query()).not.toBe(null);
    expect(screen.getByClassName("sui_skeleton-radius_lg").query()).not.toBe(null);
  });

  test("指定したアニメーションの修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <SkeletonRoot animation="pulse" />
        <SkeletonRoot animation="shine" />
        <SkeletonRoot animation="none" />
      </>,
    );

    // 検証
    expect(screen.getByClassName("sui_skeleton-animation_pulse").query()).not.toBe(null);
    expect(screen.getByClassName("sui_skeleton-animation_shine").query()).not.toBe(null);
    expect(screen.getByClassName("sui_skeleton-animation_none").query()).not.toBe(null);
  });

  test("overlay の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<SkeletonRoot overlay />);

    // 検証
    expect(
      screen.getByClassName("sui_skeleton").element().classList.contains("sui_skeleton-overlay"),
    ).toBe(true);
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<SkeletonRoot className="custom" />);

    // 検証
    const root = screen.getByClassName("sui_skeleton").element();
    expect(root.classList.contains("custom")).toBe(true);
    expect(root.classList.contains("sui_skeleton")).toBe(true);
  });

  test("利用者の style を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<SkeletonRoot style={{ marginTop: "10px" }} />);

    // 検証
    expect(screen.getByClassName("sui_skeleton").element().style.marginTop).toBe("10px");
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<SkeletonRoot render={<section />} />);

    // 検証
    expect(screen.getByClassName("sui_skeleton").element().tagName).toBe("SECTION");
  });

  test("スタイル起点として data-scope を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<SkeletonRoot />);

    // 検証
    expect(screen.getByClassName("sui_skeleton").element().getAttribute("data-scope")).toBe("");
  });

  test("子要素を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SkeletonRoot>
        <span>内容</span>
      </SkeletonRoot>,
    );

    // 検証
    expect(screen.getByText("内容").query()).not.toBe(null);
  });
});
