import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import "../badge.parts.js";
import { BadgeRoot } from "./badge.root.jsx";
import "../../../tests/src/_locators.js";

describe("BadgeRoot", () => {
  test("既定の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<BadgeRoot />);

    // 検証
    const root = screen.getByClassName("sui_badge").element();
    expect(root.classList.contains("sui_badge")).toBe(true);
    expect(root.classList.contains("sui_badge-size_sm")).toBe(true);
    expect(root.classList.contains("sui_badge-color_grey")).toBe(true);
    expect(root.classList.contains("sui_badge-radius_full")).toBe(true);
    expect(root.classList.contains("sui_badge-overlap_rectangular")).toBe(true);
    expect(root.classList.contains("sui_badge-variant_standard")).toBe(true);
  });

  test("span を既定の要素にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<BadgeRoot />);

    // 検証
    expect(screen.getByClassName("sui_badge").element().tagName).toBe("SPAN");
  });

  test("指定した大きさの修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <BadgeRoot size="sm" />
        <BadgeRoot size="md" />
        <BadgeRoot size="lg" />
      </>,
    );

    // 検証
    expect(screen.getByClassName("sui_badge-size_sm").query()).not.toBe(null);
    expect(screen.getByClassName("sui_badge-size_md").query()).not.toBe(null);
    expect(screen.getByClassName("sui_badge-size_lg").query()).not.toBe(null);
  });

  test("指定した配色の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <BadgeRoot color="blue" />
        <BadgeRoot color="purple" />
        <BadgeRoot color="magenta" />
        <BadgeRoot color="red" />
        <BadgeRoot color="orange" />
        <BadgeRoot color="yellow" />
        <BadgeRoot color="green" />
      </>,
    );

    // 検証
    expect(screen.getByClassName("sui_badge-color_blue").query()).not.toBe(null);
    expect(screen.getByClassName("sui_badge-color_purple").query()).not.toBe(null);
    expect(screen.getByClassName("sui_badge-color_magenta").query()).not.toBe(null);
    expect(screen.getByClassName("sui_badge-color_red").query()).not.toBe(null);
    expect(screen.getByClassName("sui_badge-color_orange").query()).not.toBe(null);
    expect(screen.getByClassName("sui_badge-color_yellow").query()).not.toBe(null);
    expect(screen.getByClassName("sui_badge-color_green").query()).not.toBe(null);
  });

  test("指定した角丸の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <BadgeRoot radius="none" />
        <BadgeRoot radius="sm" />
        <BadgeRoot radius="md" />
        <BadgeRoot radius="lg" />
        <BadgeRoot radius="full" />
      </>,
    );

    // 検証
    expect(screen.getByClassName("sui_badge-radius_none").query()).not.toBe(null);
    expect(screen.getByClassName("sui_badge-radius_sm").query()).not.toBe(null);
    expect(screen.getByClassName("sui_badge-radius_md").query()).not.toBe(null);
    expect(screen.getByClassName("sui_badge-radius_lg").query()).not.toBe(null);
    expect(screen.getByClassName("sui_badge-radius_full").query()).not.toBe(null);
  });

  test("指定した重なり形状の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <BadgeRoot overlap="rectangular" />
        <BadgeRoot overlap="circular" />
      </>,
    );

    // 検証
    expect(screen.getByClassName("sui_badge-overlap_rectangular").query()).not.toBe(null);
    expect(screen.getByClassName("sui_badge-overlap_circular").query()).not.toBe(null);
  });

  test("指定した外観の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <BadgeRoot variant="standard" />
        <BadgeRoot variant="dot" />
      </>,
    );

    // 検証
    expect(screen.getByClassName("sui_badge-variant_standard").query()).not.toBe(null);
    expect(screen.getByClassName("sui_badge-variant_dot").query()).not.toBe(null);
  });

  test("指定した配置の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <BadgeRoot position="top-left" />
        <BadgeRoot position="top-right" />
        <BadgeRoot position="bottom-left" />
        <BadgeRoot position="bottom-right" />
      </>,
    );

    // 検証
    expect(screen.getByClassName("sui_badge-position_top_left").query()).not.toBe(null);
    expect(screen.getByClassName("sui_badge-position_top_right").query()).not.toBe(null);
    expect(screen.getByClassName("sui_badge-position_bottom_left").query()).not.toBe(null);
    expect(screen.getByClassName("sui_badge-position_bottom_right").query()).not.toBe(null);
  });

  test("リングと枠線の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <BadgeRoot outlined />
        <BadgeRoot ring />
      </>,
    );

    // 検証
    expect(screen.getByClassName("sui_badge-outlined").query()).not.toBe(null);
    expect(screen.getByClassName("sui_badge-ring").query()).not.toBe(null);
  });

  test("スタイル起点として data-scope を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<BadgeRoot />);

    // 検証
    expect(screen.getByClassName("sui_badge").element().getAttribute("data-scope")).toBe("");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<BadgeRoot className="custom" />);

    // 検証
    const root = screen.getByClassName("sui_badge").element();
    expect(root.classList.contains("custom")).toBe(true);
    expect(root.classList.contains("sui_badge")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<BadgeRoot render={<mark />} />);

    // 検証
    expect(screen.getByClassName("sui_badge").element().tagName).toBe("MARK");
  });

  test("子要素を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <BadgeRoot>
        <span>42</span>
      </BadgeRoot>,
    );

    // 検証
    expect(screen.getByText("42").query()).not.toBe(null);
  });

  test("dot では子要素を描画しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <BadgeRoot variant="dot">
        <span>42</span>
      </BadgeRoot>,
    );

    // 検証
    expect(screen.getByText("42").query()).toBe(null);
  });
});
