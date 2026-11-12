import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import "../progress.parts.js";
import { ProgressRoot } from "./progress.root.jsx";
import "../../../tests/src/_locators.js";

describe("ProgressRoot", () => {
  test("既定の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<ProgressRoot value={25} />);

    // 検証。
    const root = screen.getByClassName("sui_progress").element();
    expect(root.classList.contains("sui_progress")).toBe(true);
    expect(root.classList.contains("sui_progress-size_md")).toBe(true);
    expect(root.classList.contains("sui_progress-color_grey")).toBe(true);
    expect(root.classList.contains("sui_progress-radius_full")).toBe(true);
    expect(root.classList.contains("sui_progress-variant_liquid")).toBe(true);
    expect(root.classList.contains("sui_progress-outlined")).toBe(true);
  });

  test("指定した大きさの修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <ProgressRoot id="sm" size="sm" value={0} />
        <ProgressRoot id="md" size="md" value={0} />
        <ProgressRoot id="lg" size="lg" value={0} />
      </>,
    );

    // 検証。
    expect(screen.container.querySelector("#sm")?.classList.contains("sui_progress-size_sm")).toBe(
      true,
    );
    expect(screen.container.querySelector("#md")?.classList.contains("sui_progress-size_md")).toBe(
      true,
    );
    expect(screen.container.querySelector("#lg")?.classList.contains("sui_progress-size_lg")).toBe(
      true,
    );
  });

  test("指定した配色の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <ProgressRoot id="blue" color="blue" value={0} />
        <ProgressRoot id="purple" color="purple" value={0} />
        <ProgressRoot id="magenta" color="magenta" value={0} />
        <ProgressRoot id="red" color="red" value={0} />
        <ProgressRoot id="orange" color="orange" value={0} />
        <ProgressRoot id="yellow" color="yellow" value={0} />
        <ProgressRoot id="green" color="green" value={0} />
      </>,
    );

    // 検証。
    expect(
      screen.container.querySelector("#blue")?.classList.contains("sui_progress-color_blue"),
    ).toBe(true);
    expect(
      screen.container.querySelector("#purple")?.classList.contains("sui_progress-color_purple"),
    ).toBe(true);
    expect(
      screen.container.querySelector("#magenta")?.classList.contains("sui_progress-color_magenta"),
    ).toBe(true);
    expect(
      screen.container.querySelector("#red")?.classList.contains("sui_progress-color_red"),
    ).toBe(true);
    expect(
      screen.container.querySelector("#orange")?.classList.contains("sui_progress-color_orange"),
    ).toBe(true);
    expect(
      screen.container.querySelector("#yellow")?.classList.contains("sui_progress-color_yellow"),
    ).toBe(true);
    expect(
      screen.container.querySelector("#green")?.classList.contains("sui_progress-color_green"),
    ).toBe(true);
  });

  test("指定した角丸の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <ProgressRoot id="none" value={0} radius="none" />
        <ProgressRoot id="sm" value={0} radius="sm" />
        <ProgressRoot id="md" value={0} radius="md" />
        <ProgressRoot id="lg" value={0} radius="lg" />
        <ProgressRoot id="full" value={0} radius="full" />
      </>,
    );

    // 検証。
    expect(
      screen.container.querySelector("#none")?.classList.contains("sui_progress-radius_none"),
    ).toBe(true);
    expect(
      screen.container.querySelector("#sm")?.classList.contains("sui_progress-radius_sm"),
    ).toBe(true);
    expect(
      screen.container.querySelector("#md")?.classList.contains("sui_progress-radius_md"),
    ).toBe(true);
    expect(
      screen.container.querySelector("#lg")?.classList.contains("sui_progress-radius_lg"),
    ).toBe(true);
    expect(
      screen.container.querySelector("#full")?.classList.contains("sui_progress-radius_full"),
    ).toBe(true);
  });

  test("指定した外観と枠線の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <ProgressRoot id="naked" value={0} variant="naked" />
        <ProgressRoot id="liquid" value={0} variant="liquid" />
        <ProgressRoot id="outlined" value={0} outlined />
      </>,
    );

    // 検証。
    expect(
      screen.container.querySelector("#naked")?.classList.contains("sui_progress-variant_naked"),
    ).toBe(true);
    expect(
      screen.container.querySelector("#liquid")?.classList.contains("sui_progress-variant_liquid"),
    ).toBe(true);
    expect(
      screen.container.querySelector("#outlined")?.classList.contains("sui_progress-outlined"),
    ).toBe(true);
  });

  test.for([
    [25, "progressing"],
    [100, "complete"],
    [null, "indeterminate"],
  ] as const)("状態 %s に応じた状態クラスを付ける", async ([value, status], { expect }) => {
    // 準備と実行。
    const screen = await render(<ProgressRoot value={value} />);

    // 検証。
    expect(screen.getByClassName(`sui_progress-status_${status}`).query()).not.toBe(null);
  });

  test("スタイル起点として data-scope を付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<ProgressRoot value={25} />);

    // 検証。
    expect(screen.getByClassName("sui_progress").element().getAttribute("data-scope")).toBe("");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<ProgressRoot value={25} className="custom" />);

    // 検証。
    const root = screen.getByClassName("sui_progress").element();
    expect(root.classList.contains("custom")).toBe(true);
    expect(root.classList.contains("sui_progress")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<ProgressRoot value={25} render={<section />} />);

    // 検証。
    expect(screen.getByClassName("sui_progress").element().tagName).toBe("SECTION");
  });
});
