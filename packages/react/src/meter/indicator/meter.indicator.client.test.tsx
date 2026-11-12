import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import "../meter.parts.js";
import { MeterRoot } from "../root/meter.root.jsx";
import { MeterTrack } from "../track/meter.track.jsx";
import { MeterIndicator } from "./meter.indicator.jsx";
import "../../../tests/src/_locators.js";

describe("MeterIndicator", () => {
  test("インジケーターを描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <MeterRoot value={25}>
        <MeterTrack>
          <MeterIndicator />
        </MeterTrack>
      </MeterRoot>,
    );

    // 検証。
    const indicator = screen.getByClassName("sui_meter_indicator").element();
    expect(indicator.tagName).toBe("DIV");
    expect(indicator.classList.contains("sui_meter_indicator")).toBe(true);
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <MeterRoot value={25}>
        <MeterTrack>
          <MeterIndicator className="custom" />
        </MeterTrack>
      </MeterRoot>,
    );

    // 検証。
    const indicator = screen.getByClassName("sui_meter_indicator").element();
    expect(indicator.classList.contains("custom")).toBe(true);
    expect(indicator.classList.contains("sui_meter_indicator")).toBe(true);
  });
});
