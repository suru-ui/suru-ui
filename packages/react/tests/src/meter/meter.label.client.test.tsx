import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/meter/meter.parts.js";
import { MeterLabel } from "../../../src/meter/meter.label.jsx";
import { MeterRoot } from "../../../src/meter/meter.root.jsx";
import "../_locators.js";

describe("MeterLabel", () => {
  test("ラベルを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <MeterRoot value={25}>
        <MeterLabel>使用量</MeterLabel>
      </MeterRoot>,
    );

    // 検証
    const label = screen.getByText("使用量").element();
    expect(label.tagName).toBe("SPAN");
    expect(label.textContent).toBe("使用量");
    expect(label.classList.contains("sui_meter_label")).toBe(true);
  });

  test("ルートから参照される識別子を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <MeterRoot value={25}>
        <MeterLabel>使用量</MeterLabel>
      </MeterRoot>,
    );

    // 検証
    const label = screen.getByText("使用量").element();
    expect(label.id).not.toBe("");
    expect(screen.getByClassName("sui_meter").element().getAttribute("aria-labelledby")).toBe(
      label.id,
    );
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <MeterRoot value={25}>
        <MeterLabel className="custom">使用量</MeterLabel>
      </MeterRoot>,
    );

    // 検証
    const label = screen.getByText("使用量").element();
    expect(label.classList.contains("custom")).toBe(true);
    expect(label.classList.contains("sui_meter_label")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <MeterRoot value={25}>
        <MeterLabel render={<strong />}>使用量</MeterLabel>
      </MeterRoot>,
    );

    // 検証
    expect(screen.getByText("使用量").element().tagName).toBe("STRONG");
  });
});
