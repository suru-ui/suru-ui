import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/chip/chip.parts.js";
import { ChipRoot } from "../../../src/chip/chip.root.jsx";
import "../_locators.js";

describe("ChipRoot", () => {
  test("既定の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<ChipRoot />);

    // 検証
    const root = screen.getByClassName("sui_chip").element();
    expect(root.classList.contains("sui_chip")).toBe(true);
    expect(root.classList.contains("sui_chip-size_sm")).toBe(true);
    expect(root.classList.contains("sui_chip-color_grey")).toBe(true);
    expect(root.classList.contains("sui_chip-radius_full")).toBe(true);
    expect(root.classList.contains("sui_chip-variant_liquid")).toBe(true);
  });

  test("span を既定の要素にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<ChipRoot />);

    // 検証
    expect(screen.getByClassName("sui_chip").element().tagName).toBe("SPAN");
  });

  test("指定した大きさの修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <ChipRoot size="sm" />
        <ChipRoot size="md" />
        <ChipRoot size="lg" />
      </>,
    );

    // 検証
    expect(screen.getByClassName("sui_chip-size_sm").query()).not.toBe(null);
    expect(screen.getByClassName("sui_chip-size_md").query()).not.toBe(null);
    expect(screen.getByClassName("sui_chip-size_lg").query()).not.toBe(null);
  });

  test("指定した配色の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <ChipRoot color="blue" />
        <ChipRoot color="purple" />
        <ChipRoot color="magenta" />
        <ChipRoot color="red" />
        <ChipRoot color="orange" />
        <ChipRoot color="yellow" />
        <ChipRoot color="green" />
      </>,
    );

    // 検証
    expect(screen.getByClassName("sui_chip-color_blue").query()).not.toBe(null);
    expect(screen.getByClassName("sui_chip-color_purple").query()).not.toBe(null);
    expect(screen.getByClassName("sui_chip-color_magenta").query()).not.toBe(null);
    expect(screen.getByClassName("sui_chip-color_red").query()).not.toBe(null);
    expect(screen.getByClassName("sui_chip-color_orange").query()).not.toBe(null);
    expect(screen.getByClassName("sui_chip-color_yellow").query()).not.toBe(null);
    expect(screen.getByClassName("sui_chip-color_green").query()).not.toBe(null);
  });

  test("指定した角丸の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <ChipRoot radius="none" />
        <ChipRoot radius="sm" />
        <ChipRoot radius="md" />
        <ChipRoot radius="lg" />
        <ChipRoot radius="full" />
      </>,
    );

    // 検証
    expect(screen.getByClassName("sui_chip-radius_none").query()).not.toBe(null);
    expect(screen.getByClassName("sui_chip-radius_sm").query()).not.toBe(null);
    expect(screen.getByClassName("sui_chip-radius_md").query()).not.toBe(null);
    expect(screen.getByClassName("sui_chip-radius_lg").query()).not.toBe(null);
    expect(screen.getByClassName("sui_chip-radius_full").query()).not.toBe(null);
  });

  test("指定した外観の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <ChipRoot variant="solid" />
        <ChipRoot variant="naked" />
        <ChipRoot variant="liquid" />
      </>,
    );

    // 検証
    expect(screen.getByClassName("sui_chip-variant_solid").query()).not.toBe(null);
    expect(screen.getByClassName("sui_chip-variant_naked").query()).not.toBe(null);
    expect(screen.getByClassName("sui_chip-variant_liquid").query()).not.toBe(null);
  });

  test("枠線の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <ChipRoot id="plain" />
        <ChipRoot outlined />
      </>,
    );

    // 検証
    expect(screen.container.querySelector("#plain")?.classList.contains("sui_chip-outlined")).toBe(
      false,
    );
    expect(screen.getByClassName("sui_chip-outlined").query()).not.toBe(null);
  });

  test("スタイル起点として data-scope を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<ChipRoot />);

    // 検証
    expect(screen.getByClassName("sui_chip").element().getAttribute("data-scope")).toBe("");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<ChipRoot className="custom" />);

    // 検証
    const root = screen.getByClassName("sui_chip").element();
    expect(root.classList.contains("custom")).toBe(true);
    expect(root.classList.contains("sui_chip")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<ChipRoot render={<mark />} />);

    // 検証
    expect(screen.getByClassName("sui_chip").element().tagName).toBe("MARK");
  });

  test("button として描画できる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<ChipRoot render={<button aria-label="チップ" type="button" />} />);

    // 検証
    const root = screen.getByClassName("sui_chip").element();
    expect(root.tagName).toBe("BUTTON");
    expect(root.getAttribute("type")).toBe("button");
    expect(root.getAttribute("aria-label")).toBe("チップ");
  });

  test("子要素を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ChipRoot>
        <span>新着</span>
      </ChipRoot>,
    );

    // 検証
    expect(screen.getByText("新着").query()).not.toBe(null);
  });
});
