import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import "./meter.parts.js";
import { Meter } from "./meter.jsx";
import "../../tests/src/_locators.js";

describe("Meter", () => {
  test("ラベルと値とトラックとインジケーターを描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Meter label="使用量" value={25} />);

    // 検証。
    expect(screen.getByText("使用量").query()).not.toBe(null);
    expect(screen.getByText("25%").query()).not.toBe(null);
    expect(screen.getByClassName("sui_meter_track").query()).not.toBe(null);
    expect(screen.getByClassName("sui_meter_indicator").query()).not.toBe(null);
  });

  test("ラベルを省略すると値も表示しない", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Meter value={25} />);

    // 検証。
    expect(screen.getByClassName("sui_meter_label").query()).toBe(null);
    expect(screen.getByClassName("sui_meter_value").query()).toBe(null);
    expect(screen.getByClassName("sui_meter_track").query()).not.toBe(null);
  });

  test("現在値の既定値を 0 にする", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Meter label="使用量" />);

    // 検証。
    expect(screen.getByText("0%").query()).not.toBe(null);
  });

  test("slotProps を各パーツへ渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Meter
        label="使用量"
        value={25}
        slotProps={{
          label: { id: "label" },
          track: { id: "track" },
          value: { id: "value" },
          indicator: { id: "indicator" },
        }}
      />,
    );

    // 検証。
    expect(screen.container.querySelector("#label")?.textContent).toBe("使用量");
    expect(screen.container.querySelector("#value")?.textContent).toBe("25%");
    expect(screen.container.querySelector("#track")).not.toBe(null);
    expect(screen.container.querySelector("#indicator")).not.toBe(null);
  });

  test("slotProps の描画関数で値を差し替える", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Meter
        label="使用量"
        value={25}
        slotProps={{ value: { children: (formattedValue) => `${formattedValue} 使用` } }}
      />,
    );

    // 検証。
    expect(screen.getByText("25% 使用").query()).not.toBe(null);
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Meter label="使用量" value={25} className="custom" />);

    // 検証。
    const root = screen.getByClassName("sui_meter").element();
    expect(root.classList.contains("custom")).toBe(true);
    expect(root.classList.contains("sui_meter")).toBe(true);
  });
});
