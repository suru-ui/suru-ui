import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import { Slider } from "../src/forms/slider/index.js";

describe("Slider", () => {
  test("スライダーをレンダリングする", async () => {
    // 実行
    const screen = await render(<Slider defaultValue={25} />);

    // 検証
    const slider = screen.getByRole("slider");

    await expect.element(slider).toHaveAttribute("aria-valuenow", "25");
    await expect.element(slider).toHaveAttribute("min", "0");
    await expect.element(slider).toHaveAttribute("max", "100");
  });

  test("既定のスタイルクラスを適用する", async () => {
    // 実行
    const screen = await render(<Slider />);

    // 検証
    const slider = screen.container.querySelector<HTMLElement>(".sui_slider");

    expect(slider).not.toBeNull();
    await expect.element(slider).toHaveClass("sui_slider-size_md");
    await expect.element(slider).toHaveClass("sui_slider-color_grey");
    await expect.element(slider).toHaveClass("sui_slider-radius_full");
    await expect.element(slider).toHaveClass("sui_slider-variant_liquid");
  });

  test("size・color・variant・radius・outlined のクラスを適用する", async () => {
    // 実行
    const screen = await render(
      <Slider size="lg" color="red" variant="naked" radius="rounded" outlined={true} />,
    );

    // 検証
    const slider = screen.container.querySelector<HTMLElement>(".sui_slider");

    await expect.element(slider).toHaveClass("sui_slider-size_lg");
    await expect.element(slider).toHaveClass("sui_slider-color_red");
    await expect.element(slider).toHaveClass("sui_slider-variant_naked");
    await expect.element(slider).toHaveClass("sui_slider-radius_rounded");
    await expect.element(slider).toHaveClass("sui_slider-outlined");
  });

  test("矢印キーで値を変更できる", async () => {
    // 実行
    const screen = await render(<Slider defaultValue={25} />);
    const slider = screen.getByRole("slider");

    (slider.element() as HTMLElement).focus();
    await userEvent.keyboard("{ArrowRight}");

    // 検証
    await expect.element(slider).toHaveAttribute("aria-valuenow", "26");
  });

  test("Home キーで最小値に移動する", async () => {
    // 実行
    const screen = await render(<Slider defaultValue={25} />);
    const slider = screen.getByRole("slider");

    (slider.element() as HTMLElement).focus();
    await userEvent.keyboard("{Home}");

    // 検証
    await expect.element(slider).toHaveAttribute("aria-valuenow", "0");
  });

  test("min・max・step を反映する", async () => {
    // 実行
    const screen = await render(<Slider min={5} max={60} step={5} defaultValue={20} />);
    const slider = screen.getByRole("slider");

    // 検証
    await expect.element(slider).toHaveAttribute("min", "5");
    await expect.element(slider).toHaveAttribute("max", "60");
    await expect.element(slider).toHaveAttribute("step", "5");

    // 実行
    (slider.element() as HTMLElement).focus();
    await userEvent.keyboard("{ArrowRight}");

    // 検証
    await expect.element(slider).toHaveAttribute("aria-valuenow", "25");
  });

  test("onValueChange が変更後の値を通知する", async () => {
    // 準備
    let value: number | readonly number[] | undefined;

    // 実行
    const screen = await render(
      <Slider
        defaultValue={25}
        onValueChange={(nextValue) => {
          value = nextValue;
        }}
      />,
    );
    const slider = screen.getByRole("slider");

    (slider.element() as HTMLElement).focus();
    await userEvent.keyboard("{ArrowRight}");

    // 検証
    expect(value).toBe(26);
  });

  test("レンジスライダーで Thumb を複数表示する", async () => {
    // 実行
    const screen = await render(<Slider defaultValue={[25, 75]} />);

    // 検証
    const sliders = screen.container.querySelectorAll<HTMLInputElement>('input[type="range"]');

    expect(sliders.length).toBe(2);
    await expect.element(sliders[0]!).toHaveAttribute("aria-valuenow", "25");
    await expect.element(sliders[1]!).toHaveAttribute("aria-valuenow", "75");
  });

  test("disabled を指定すると無効化される", async () => {
    // 実行
    const screen = await render(<Slider disabled />);

    // 検証
    const slider = screen.getByRole("slider");

    await expect.element(slider).toBeDisabled();
    await expect
      .element(screen.container.querySelector<HTMLElement>(".sui_slider"))
      .toHaveClass("sui_slider-disabled");
  });

  test("slotProps でラベルと現在値を表示する", async () => {
    // 実行
    const screen = await render(
      <Slider
        defaultValue={25}
        slotProps={{
          label: { children: "音量" },
          value: {},
        }}
      />,
    );

    // 検証
    await expect
      .element(screen.container.querySelector<HTMLElement>(".sui_slider_label"))
      .toHaveTextContent("音量");
    await expect
      .element(screen.container.querySelector<HTMLElement>(".sui_slider_value"))
      .toHaveTextContent("25");
  });
});
