import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/progress/progress.parts.js";
import { ProgressIndicator } from "../../../src/progress/progress.indicator.jsx";
import { ProgressRoot } from "../../../src/progress/progress.root.jsx";
import "../_locators.js";

describe("ProgressIndicator", () => {
  test("インジケーターを描画する", async ({ expect }) => {
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
  });

  test("不確定状態ではアニメーションを当てる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ProgressRoot value={null}>
        <ProgressIndicator />
      </ProgressRoot>,
    );

    // 検証
    const indicator = screen.getByClassName("sui_progress_indicator").element();
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
