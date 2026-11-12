import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import "../progress.parts.js";
import { ProgressRoot } from "../root/progress.root.jsx";
import { ProgressTrack } from "./progress.track.jsx";
import "../../../tests/src/_locators.js";

describe("ProgressTrack", () => {
  test("トラックを描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <ProgressRoot value={25}>
        <ProgressTrack />
      </ProgressRoot>,
    );

    // 検証。
    const track = screen.getByClassName("sui_progress_track").element();
    expect(track.tagName).toBe("DIV");
    expect(track.classList.contains("sui_progress_track")).toBe(true);
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <ProgressRoot value={25}>
        <ProgressTrack className="custom" />
      </ProgressRoot>,
    );

    // 検証。
    const track = screen.getByClassName("sui_progress_track").element();
    expect(track.classList.contains("custom")).toBe(true);
    expect(track.classList.contains("sui_progress_track")).toBe(true);
  });
});
