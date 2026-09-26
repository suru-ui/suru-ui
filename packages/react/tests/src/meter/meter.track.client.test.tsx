import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/meter/meter.parts.js";
import { MeterRoot } from "../../../src/meter/meter.root.jsx";
import { MeterTrack } from "../../../src/meter/meter.track.jsx";
import "../_locators.js";

describe("MeterTrack", () => {
  test("トラックを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <MeterRoot value={25}>
        <MeterTrack />
      </MeterRoot>,
    );

    // 検証
    const track = screen.getByClassName("sui_meter_track").element();
    expect(track.tagName).toBe("DIV");
    expect(track.classList.contains("sui_meter_track")).toBe(true);
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <MeterRoot value={25}>
        <MeterTrack className="custom" />
      </MeterRoot>,
    );

    // 検証
    const track = screen.getByClassName("sui_meter_track").element();
    expect(track.classList.contains("custom")).toBe(true);
    expect(track.classList.contains("sui_meter_track")).toBe(true);
  });
});
