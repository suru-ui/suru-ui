import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import "../stat.parts.js";
import { StatRoot } from "../root/stat.root.jsx";
import { StatTrend } from "./stat.trend.jsx";
import "../../../tests/src/_locators.js";

function getTrend(screen: Awaited<ReturnType<typeof render>>): HTMLElement {
  return screen.container.querySelector<HTMLElement>(".sui_stat_trend")!;
}

describe("StatTrend", () => {
  test("dd としてトレンドを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <StatRoot>
        <StatTrend>+200 (20 %)</StatTrend>
      </StatRoot>,
    );

    // 検証
    const trend = getTrend(screen);
    expect(trend.tagName).toBe("DD");
    expect(trend.textContent).toBe("+200 (20 %)");
    expect(trend.classList.contains("sui_stat_trend")).toBe(true);
  });

  test.for([
    ["+200 (20 %)", "up"],
    ["-200 (20 %)", "down"],
    ["−200", "down"],
    ["0", "flat"],
    ["1,200.5", "up"],
    ["変化なし", "flat"],
    ["▲ 12", "up"],
    ["減少 -3", "down"],
  ] as const)("文字列 %s から方向 %s を推測する", async ([content, direction], { expect }) => {
    // 準備と実行
    const screen = await render(
      <StatRoot>
        <StatTrend>{content}</StatTrend>
      </StatRoot>,
    );

    // 検証
    expect(getTrend(screen).classList.contains(`sui_stat_trend-direction_${direction}`)).toBe(true);
  });

  test.for([
    [-3, "down"],
    [0, "flat"],
    [4, "up"],
  ] as const)("数値 %i から方向 %s を推測する", async ([content, direction], { expect }) => {
    // 準備と実行
    const screen = await render(
      <StatRoot>
        <StatTrend>{content}</StatTrend>
      </StatRoot>,
    );

    // 検証
    expect(getTrend(screen).classList.contains(`sui_stat_trend-direction_${direction}`)).toBe(true);
  });

  test("指定した方向を優先する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <StatRoot>
        <StatTrend direction="down">+200 (20 %)</StatTrend>
      </StatRoot>,
    );

    // 検証
    const trend = getTrend(screen);
    expect(trend.classList.contains("sui_stat_trend-direction_down")).toBe(true);
    expect(trend.classList.contains("sui_stat_trend-direction_up")).toBe(false);
  });

  test.for([
    ["up", "▲"],
    ["flat", "—"],
    ["down", "▼"],
  ] as const)("方向 %s の矢印を表示する", async ([direction, arrow], { expect }) => {
    // 準備と実行
    const screen = await render(
      <StatRoot>
        <StatTrend direction={direction}>12</StatTrend>
      </StatRoot>,
    );

    // 検証
    expect(getComputedStyle(getTrend(screen), "::before").content).toContain(arrow);
  });

  test("svg を表示するときは矢印を表示しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <StatRoot>
        <StatTrend direction="up">
          <svg />
        </StatTrend>
      </StatRoot>,
    );

    // 検証
    expect(getComputedStyle(getTrend(screen), "::before").content).not.toContain("▲");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <StatRoot>
        <StatTrend className="custom">12</StatTrend>
      </StatRoot>,
    );

    // 検証
    const trend = getTrend(screen);
    expect(trend.classList.contains("custom")).toBe(true);
    expect(trend.classList.contains("sui_stat_trend")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <StatRoot>
        <StatTrend render={<span />}>12</StatTrend>
      </StatRoot>,
    );

    // 検証
    expect(getTrend(screen).tagName).toBe("SPAN");
  });
});
