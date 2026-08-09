import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";

import { Meter } from "../../src/data-display/meter/index.js";

describe("Meter", () => {
  test("メーターをレンダリングする", async () => {
    // 実行
    const screen = await render(<Meter value={24} />);

    // 検証
    const meter = screen.getByRole("meter");

    await expect.element(meter).toHaveAttribute("aria-valuenow", "24");
    await expect.element(meter).toHaveAttribute("aria-valuemin", "0");
    await expect.element(meter).toHaveAttribute("aria-valuemax", "100");
    await expect.element(meter).toHaveClass("sui_meter");
    await expect.element(meter).toHaveClass("sui_meter-size_md");
    await expect.element(meter).toHaveClass("sui_meter-color_grey");
    await expect.element(meter).toHaveClass("sui_meter-radius_full");
    await expect.element(meter).toHaveClass("sui_meter-variant_liquid");
  });

  test("min・max を反映し、値を範囲内に収める", async () => {
    // 実行
    const screen = await render(<Meter min={10} max={50} value={80} />);

    // 検証
    const meter = screen.getByRole("meter");

    await expect.element(meter).toHaveAttribute("aria-valuemin", "10");
    await expect.element(meter).toHaveAttribute("aria-valuemax", "50");
    await expect.element(meter).toHaveAttribute("aria-valuenow", "50");
  });

  test("size・color・variant・radius・outlined のクラスを適用する", async () => {
    // 実行
    const screen = await render(
      <Meter value={50} size="lg" color="red" variant="naked" radius="rounded" outlined={true} />,
    );

    // 検証
    const meter = screen.getByRole("meter");

    await expect.element(meter).toHaveClass("sui_meter-size_lg");
    await expect.element(meter).toHaveClass("sui_meter-color_red");
    await expect.element(meter).toHaveClass("sui_meter-variant_naked");
    await expect.element(meter).toHaveClass("sui_meter-radius_rounded");
    await expect.element(meter).toHaveClass("sui_meter-outlined");
  });

  test("Indicator に現在値の割合を反映する", async () => {
    // 実行
    const screen = await render(<Meter value={24} />);

    // 検証
    const indicator = screen.container.querySelector<HTMLElement>(".sui_meter_indicator");

    await expect.element(indicator).toHaveStyle({ width: "24%" });
  });

  test("slotProps でラベル、現在値、Track、Indicator を設定する", async () => {
    // 実行
    const screen = await render(
      <Meter
        value={24}
        slotProps={{
          label: { children: "ストレージ使用量", className: "custom-label" },
          value: { className: "custom-value" },
          track: { className: "custom-track" },
          indicator: { className: "custom-indicator" },
        }}
      />,
    );

    // 検証
    await expect
      .element(screen.container.querySelector<HTMLElement>(".sui_meter_label"))
      .toHaveClass("custom-label");
    await expect
      .element(screen.container.querySelector<HTMLElement>(".sui_meter_value"))
      .toHaveTextContent("24%");
    await expect
      .element(screen.container.querySelector<HTMLElement>(".sui_meter_value"))
      .toHaveClass("custom-value");
    await expect
      .element(screen.container.querySelector<HTMLElement>(".sui_meter_track"))
      .toHaveClass("custom-track");
    await expect
      .element(screen.container.querySelector<HTMLElement>(".sui_meter_indicator"))
      .toHaveClass("custom-indicator");
  });
});
