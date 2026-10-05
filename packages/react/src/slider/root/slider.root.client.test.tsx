import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import "../slider.parts.js";
import { SliderRoot } from "./slider.root.jsx";
import "../../../tests/src/_locators.js";

describe("SliderRoot", () => {
  test("既定の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<SliderRoot defaultValue={25} />);

    // 検証
    const root = screen.getByClassName("sui_slider").element();
    expect(root.classList.contains("sui_slider")).toBe(true);
    expect(root.classList.contains("sui_slider-size_md")).toBe(true);
    expect(root.classList.contains("sui_slider-color_grey")).toBe(true);
    expect(root.classList.contains("sui_slider-radius_full")).toBe(true);
    expect(root.classList.contains("sui_slider-variant_liquid")).toBe(true);
    expect(root.classList.contains("sui_slider-orientation_horizontal")).toBe(true);
    expect(root.classList.contains("sui_slider-outlined")).toBe(false);
    expect(root.classList.contains("sui_slider-disabled")).toBe(false);
  });

  test("指定した大きさの修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <SliderRoot id="sm" size="sm" defaultValue={0} />
        <SliderRoot id="md" size="md" defaultValue={0} />
        <SliderRoot id="lg" size="lg" defaultValue={0} />
      </>,
    );

    // 検証
    expect(screen.container.querySelector("#sm")?.classList.contains("sui_slider-size_sm")).toBe(
      true,
    );
    expect(screen.container.querySelector("#md")?.classList.contains("sui_slider-size_md")).toBe(
      true,
    );
    expect(screen.container.querySelector("#lg")?.classList.contains("sui_slider-size_lg")).toBe(
      true,
    );
  });

  test("指定した配色の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <SliderRoot id="blue" color="blue" defaultValue={0} />
        <SliderRoot id="purple" color="purple" defaultValue={0} />
        <SliderRoot id="magenta" color="magenta" defaultValue={0} />
        <SliderRoot id="red" color="red" defaultValue={0} />
        <SliderRoot id="orange" color="orange" defaultValue={0} />
        <SliderRoot id="yellow" color="yellow" defaultValue={0} />
        <SliderRoot id="green" color="green" defaultValue={0} />
      </>,
    );

    // 検証
    expect(
      screen.container.querySelector("#blue")?.classList.contains("sui_slider-color_blue"),
    ).toBe(true);
    expect(
      screen.container.querySelector("#purple")?.classList.contains("sui_slider-color_purple"),
    ).toBe(true);
    expect(
      screen.container.querySelector("#magenta")?.classList.contains("sui_slider-color_magenta"),
    ).toBe(true);
    expect(screen.container.querySelector("#red")?.classList.contains("sui_slider-color_red")).toBe(
      true,
    );
    expect(
      screen.container.querySelector("#orange")?.classList.contains("sui_slider-color_orange"),
    ).toBe(true);
    expect(
      screen.container.querySelector("#yellow")?.classList.contains("sui_slider-color_yellow"),
    ).toBe(true);
    expect(
      screen.container.querySelector("#green")?.classList.contains("sui_slider-color_green"),
    ).toBe(true);
  });

  test("指定した角丸の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <SliderRoot id="none" radius="none" defaultValue={0} />
        <SliderRoot id="sm" radius="sm" defaultValue={0} />
        <SliderRoot id="md" radius="md" defaultValue={0} />
        <SliderRoot id="lg" radius="lg" defaultValue={0} />
        <SliderRoot id="full" radius="full" defaultValue={0} />
      </>,
    );

    // 検証
    expect(
      screen.container.querySelector("#none")?.classList.contains("sui_slider-radius_none"),
    ).toBe(true);
    expect(screen.container.querySelector("#sm")?.classList.contains("sui_slider-radius_sm")).toBe(
      true,
    );
    expect(screen.container.querySelector("#md")?.classList.contains("sui_slider-radius_md")).toBe(
      true,
    );
    expect(screen.container.querySelector("#lg")?.classList.contains("sui_slider-radius_lg")).toBe(
      true,
    );
    expect(
      screen.container.querySelector("#full")?.classList.contains("sui_slider-radius_full"),
    ).toBe(true);
  });

  test("指定した外観と枠線の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <SliderRoot id="naked" variant="naked" defaultValue={0} />
        <SliderRoot id="liquid" variant="liquid" defaultValue={0} />
        <SliderRoot id="outlined" outlined defaultValue={0} />
      </>,
    );

    // 検証
    expect(
      screen.container.querySelector("#naked")?.classList.contains("sui_slider-variant_naked"),
    ).toBe(true);
    expect(
      screen.container.querySelector("#liquid")?.classList.contains("sui_slider-variant_liquid"),
    ).toBe(true);
    expect(
      screen.container.querySelector("#outlined")?.classList.contains("sui_slider-outlined"),
    ).toBe(true);
  });

  test("縦方向では方向の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<SliderRoot orientation="vertical" defaultValue={25} />);

    // 検証
    const root = screen.getByClassName("sui_slider").element();
    expect(root.classList.contains("sui_slider-orientation_vertical")).toBe(true);
  });

  test("無効では無効状態の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<SliderRoot disabled defaultValue={25} />);

    // 検証
    const root = screen.getByClassName("sui_slider").element();
    expect(root.classList.contains("sui_slider-disabled")).toBe(true);
  });

  test("スタイル起点として data-scope を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<SliderRoot defaultValue={25} />);

    // 検証
    expect(screen.getByClassName("sui_slider").element().getAttribute("data-scope")).toBe("");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<SliderRoot className="custom" defaultValue={25} />);

    // 検証
    const root = screen.getByClassName("sui_slider").element();
    expect(root.classList.contains("custom")).toBe(true);
    expect(root.classList.contains("sui_slider")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<SliderRoot render={<section />} defaultValue={25} />);

    // 検証
    expect(screen.getByClassName("sui_slider").element().tagName).toBe("SECTION");
  });
});
