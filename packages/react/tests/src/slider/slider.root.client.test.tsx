import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/slider/slider.parts.js";
import { SliderRoot } from "../../../src/slider/slider.root.jsx";
import "../_locators.js";

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
        <SliderRoot id="sm" defaultValue={0} size="sm" />
        <SliderRoot id="md" defaultValue={0} size="md" />
        <SliderRoot id="lg" defaultValue={0} size="lg" />
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
        <SliderRoot id="blue" defaultValue={0} color="blue" />
        <SliderRoot id="purple" defaultValue={0} color="purple" />
        <SliderRoot id="magenta" defaultValue={0} color="magenta" />
        <SliderRoot id="red" defaultValue={0} color="red" />
        <SliderRoot id="orange" defaultValue={0} color="orange" />
        <SliderRoot id="yellow" defaultValue={0} color="yellow" />
        <SliderRoot id="green" defaultValue={0} color="green" />
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
        <SliderRoot id="none" defaultValue={0} radius="none" />
        <SliderRoot id="sm" defaultValue={0} radius="sm" />
        <SliderRoot id="md" defaultValue={0} radius="md" />
        <SliderRoot id="lg" defaultValue={0} radius="lg" />
        <SliderRoot id="full" defaultValue={0} radius="full" />
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
        <SliderRoot id="naked" defaultValue={0} variant="naked" />
        <SliderRoot id="liquid" defaultValue={0} variant="liquid" />
        <SliderRoot id="outlined" defaultValue={0} outlined />
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
    const screen = await render(<SliderRoot defaultValue={25} orientation="vertical" />);

    // 検証
    const root = screen.getByClassName("sui_slider").element();
    expect(root.classList.contains("sui_slider-orientation_vertical")).toBe(true);
    expect(root.getAttribute("data-orientation")).toBe("vertical");
  });

  test("無効では無効状態の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<SliderRoot defaultValue={25} disabled />);

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
    const screen = await render(<SliderRoot defaultValue={25} className="custom" />);

    // 検証
    const root = screen.getByClassName("sui_slider").element();
    expect(root.classList.contains("custom")).toBe(true);
    expect(root.classList.contains("sui_slider")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<SliderRoot defaultValue={25} render={<section />} />);

    // 検証
    expect(screen.getByClassName("sui_slider").element().tagName).toBe("SECTION");
  });
});
