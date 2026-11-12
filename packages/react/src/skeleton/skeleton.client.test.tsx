import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { Skeleton, SkeletonAPI, useSkeletonAPI } from "./skeleton.jsx";
import "../../tests/src/_locators.js";

describe("SkeletonAPI", () => {
  test("getRootProps は渡した props を返す", ({ expect }) => {
    // 準備と実行。
    const api = new SkeletonAPI({
      radius: "lg",
      animation: "shine",
    });

    // 検証。
    expect(api.getRootProps()).toStrictEqual({
      radius: "lg",
      animation: "shine",
    });
  });
});

describe("useSkeletonAPI", () => {
  test("API を作成する", async ({ expect }) => {
    // 準備。
    function Probe() {
      const api = useSkeletonAPI({ animation: "none" });

      return <span>{api.getRootProps().animation}</span>;
    }

    // 実行。
    const screen = await render(<Probe />);

    // 検証。
    expect(screen.getByText("none").query()?.textContent).toBe("none");
  });
});

describe("Skeleton", () => {
  test("既定のスケルトンを描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Skeleton />);

    // 検証。
    const root = screen.getByClassName("sui_skeleton").element();
    expect(root.tagName).toBe("SPAN");
    expect(root.classList.contains("sui_skeleton-radius_md")).toBe(true);
    expect(root.classList.contains("sui_skeleton-animation_pulse")).toBe(true);
  });

  test("指定した角丸の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <Skeleton radius="none" />
        <Skeleton radius="sm" />
        <Skeleton radius="md" />
        <Skeleton radius="lg" />
      </>,
    );

    // 検証。
    expect(screen.getByClassName("sui_skeleton-radius_none").query()).not.toBe(null);
    expect(screen.getByClassName("sui_skeleton-radius_sm").query()).not.toBe(null);
    expect(screen.getByClassName("sui_skeleton-radius_md").query()).not.toBe(null);
    expect(screen.getByClassName("sui_skeleton-radius_lg").query()).not.toBe(null);
  });

  test("指定したアニメーションの修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <Skeleton animation="pulse" />
        <Skeleton animation="shine" />
        <Skeleton animation="none" />
      </>,
    );

    // 検証。
    expect(screen.getByClassName("sui_skeleton-animation_pulse").query()).not.toBe(null);
    expect(screen.getByClassName("sui_skeleton-animation_shine").query()).not.toBe(null);
    expect(screen.getByClassName("sui_skeleton-animation_none").query()).not.toBe(null);
  });

  test("overlay の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Skeleton overlay />);

    // 検証。
    expect(
      screen.getByClassName("sui_skeleton").element().classList.contains("sui_skeleton-overlay"),
    ).toBe(true);
  });

  test("利用者の props をルートへ渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Skeleton aria-label="読み込み中" data-testid="skeleton" />);

    // 検証。
    const root = screen.getByClassName("sui_skeleton").element();
    expect(root.getAttribute("aria-label")).toBe("読み込み中");
    expect(root.getAttribute("data-testid")).toBe("skeleton");
  });
});
