import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import "../progress.parts.js";
import { ProgressRoot } from "../root/progress.root.jsx";
import { ProgressTrack } from "../track/progress.track.jsx";
import { ProgressIndicator } from "./progress.indicator.jsx";
import "../../../tests/src/_locators.js";

describe("ProgressIndicator", () => {
  test("インジケーターを描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <ProgressRoot value={25}>
        <ProgressTrack>
          <ProgressIndicator />
        </ProgressTrack>
      </ProgressRoot>,
    );

    // 検証。
    const indicator = screen.getByClassName("sui_progress_indicator").element();
    expect(indicator.tagName).toBe("DIV");
    expect(indicator.classList.contains("sui_progress_indicator")).toBe(true);
  });

  test("不確定状態ではアニメーションを当てる", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <ProgressRoot value={null}>
        <ProgressTrack>
          <ProgressIndicator />
        </ProgressTrack>
      </ProgressRoot>,
    );

    // 検証。
    const indicator = screen.getByClassName("sui_progress_indicator").element();
    expect(getComputedStyle(indicator).animationName).toBe("sui_progress-indeterminate");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <ProgressRoot value={25}>
        <ProgressTrack>
          <ProgressIndicator className="custom" />
        </ProgressTrack>
      </ProgressRoot>,
    );

    // 検証。
    const indicator = screen.getByClassName("sui_progress_indicator").element();
    expect(indicator.classList.contains("custom")).toBe(true);
    expect(indicator.classList.contains("sui_progress_indicator")).toBe(true);
  });
});
