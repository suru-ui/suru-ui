import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/progress/progress.parts.js";
import { ProgressIndicator } from "../../../src/progress/progress.indicator.jsx";
import { ProgressRoot } from "../../../src/progress/progress.root.jsx";
import "../_locators.js";

describe("ProgressIndicator", () => {
  test("現在値の割合を幅にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ProgressRoot value={25}>
        <ProgressIndicator />
      </ProgressRoot>,
    );

    // 検証
    const indicator = screen.getByClassName("sui_progress_indicator").element();
    expect(indicator.tagName).toBe("DIV");
    expect(indicator.classList.contains("sui_progress_indicator")).toBe(true);
    expect(indicator.style.width).toBe("25%");
  });

  test.for([
    [120, "100%"],
    [-20, "0%"],
  ] as const)("範囲外の値 %i を %s に収める", async ([value, width], { expect }) => {
    // 準備と実行
    const screen = await render(
      <ProgressRoot value={value} min={0} max={100}>
        <ProgressIndicator />
      </ProgressRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_progress_indicator").element().style.width).toBe(width);
  });

  test("不確定状態ではアニメーションに任せる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ProgressRoot value={null}>
        <ProgressIndicator />
      </ProgressRoot>,
    );

    // 検証
    const indicator = screen.getByClassName("sui_progress_indicator").element();
    expect(indicator.style.width).toBe("");
    expect(getComputedStyle(indicator).animationName).toBe("sui_progress-indeterminate");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ProgressRoot value={25}>
        <ProgressIndicator className="custom" />
      </ProgressRoot>,
    );

    // 検証
    const indicator = screen.getByClassName("sui_progress_indicator").element();
    expect(indicator.classList.contains("custom")).toBe(true);
    expect(indicator.classList.contains("sui_progress_indicator")).toBe(true);
  });
});
