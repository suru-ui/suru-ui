import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/meter/meter.parts.js";
import { MeterIndicator } from "../../../src/meter/meter.indicator.jsx";
import { MeterRoot } from "../../../src/meter/meter.root.jsx";
import "../_locators.js";

describe("MeterIndicator", () => {
  test("現在値の割合を幅にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <MeterRoot value={25}>
        <MeterIndicator />
      </MeterRoot>,
    );

    // 検証
    const indicator = screen.getByClassName("sui_meter_indicator").element();
    expect(indicator.tagName).toBe("DIV");
    expect(indicator.classList.contains("sui_meter_indicator")).toBe(true);
    expect(indicator.style.width).toBe("25%");
  });

  test.for([
    [120, "100%"],
    [-20, "0%"],
  ] as const)("範囲外の値 %i を %s に収める", async ([value, width], { expect }) => {
    // 準備と実行
    const screen = await render(
      <MeterRoot value={value} min={0} max={100}>
        <MeterIndicator />
      </MeterRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_meter_indicator").element().style.width).toBe(width);
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <MeterRoot value={25}>
        <MeterIndicator className="custom" />
      </MeterRoot>,
    );

    // 検証
    const indicator = screen.getByClassName("sui_meter_indicator").element();
    expect(indicator.classList.contains("custom")).toBe(true);
    expect(indicator.classList.contains("sui_meter_indicator")).toBe(true);
  });
});
