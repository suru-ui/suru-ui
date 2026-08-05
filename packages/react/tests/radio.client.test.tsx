import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";

import { RadioGroup } from "../src/forms/radio-group/index.js";
import { Radio } from "../src/forms/radio/index.js";
import { clickElement } from "./_click.js";

describe("Radio", () => {
  test("ラジオボタンをレンダリングする", async () => {
    // 実行
    const screen = await render(
      <RadioGroup defaultValue="a">
        <Radio value="a" aria-label="A" />
      </RadioGroup>,
    );

    // 検証
    const radio = screen.getByRole("radio", { name: "A" });

    await expect.element(radio).toHaveClass("sui_radio");
    await expect.element(radio).toHaveAttribute("aria-checked", "true");
  });

  test("選択状態を切り替えられる", async () => {
    // 実行
    const screen = await render(
      <RadioGroup defaultValue="a">
        <Radio value="a" aria-label="A" />
        <Radio value="b" aria-label="B" />
      </RadioGroup>,
    );

    // 実行
    clickElement(screen.getByRole("radio", { name: "B" }));

    // 検証
    await expect
      .element(screen.getByRole("radio", { name: "A" }))
      .toHaveAttribute("aria-checked", "false");
    await expect
      .element(screen.getByRole("radio", { name: "B" }))
      .toHaveAttribute("aria-checked", "true");
  });

  test("size・color・variant・radius のクラスを適用する", async () => {
    // 実行
    const screen = await render(
      <Radio value="a" aria-label="A" size="lg" color="red" variant="liquid" radius="rounded" />,
    );

    // 検証
    const radio = screen.getByRole("radio", { name: "A" });

    await expect.element(radio).toHaveClass("sui_radio-size_lg");
    await expect.element(radio).toHaveClass("sui_radio-color_red");
    await expect.element(radio).toHaveClass("sui_radio-variant_liquid");
    await expect.element(radio).toHaveClass("sui_radio-radius_rounded");
  });

  test("選択すると Indicator のコンテンツが表示される", async () => {
    // 実行
    const screen = await render(
      <RadioGroup>
        <Radio value="a" aria-label="A">
          ●
        </Radio>
      </RadioGroup>,
    );

    // 検証
    expect(screen.container.querySelector<HTMLElement>(".sui_radio_indicator")).toBeNull();

    // 実行
    clickElement(screen.getByRole("radio", { name: "A" }));

    // 検証
    const indicator = screen.container.querySelector<HTMLElement>(".sui_radio_indicator");

    await expect.element(indicator).toBeInTheDocument();
    await expect.element(indicator).toHaveClass("sui_radio_indicator");
    await expect.element(indicator).toHaveTextContent("●");
  });
});
