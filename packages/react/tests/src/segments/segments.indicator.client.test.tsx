import * as React from "react";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { SegmentsIndicator } from "../../../src/segments/segments.indicator.jsx";
import { SegmentsItem } from "../../../src/segments/segments.item.jsx";
import { SegmentsList } from "../../../src/segments/segments.list.jsx";
import { SegmentsRoot } from "../../../src/segments/segments.root.jsx";
import "../_locators.js";

describe("SegmentsIndicator", () => {
  test("選択中の項目の位置に追従する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SegmentsRoot defaultValue="week">
        <SegmentsList>
          <SegmentsItem value="day">日</SegmentsItem>
          <SegmentsItem value="week">週</SegmentsItem>
          <SegmentsIndicator />
        </SegmentsList>
      </SegmentsRoot>,
    );

    // 検証
    const indicator = screen.getByRole("presentation").element();
    expect(indicator.tagName).toBe("SPAN");
    expect(indicator.classList.contains("sui_segments_indicator")).toBe(true);
    await vi.waitFor(() => {
      expect(indicator.hasAttribute("hidden")).toBe(false);
    });
    const active = screen.getByRole("tab", { name: "週" }).element();
    expect(Number.parseFloat(indicator.style.getPropertyValue("--active-tab-width"))).toBeCloseTo(
      active.getBoundingClientRect().width,
      1,
    );
  });

  test("選択を変えると位置を移す", async ({ expect }) => {
    // 準備
    const screen = await render(
      <SegmentsRoot defaultValue="day">
        <SegmentsList>
          <SegmentsItem value="day">日</SegmentsItem>
          <SegmentsItem value="week">週</SegmentsItem>
          <SegmentsIndicator />
        </SegmentsList>
      </SegmentsRoot>,
    );
    const indicator = screen.getByRole("presentation").element();

    // 実行
    await screen.getByRole("tab", { name: "週" }).click();

    // 検証
    const active = screen.getByRole("tab", { name: "週" }).element();
    await vi.waitFor(() => {
      expect(Number.parseFloat(indicator.style.getPropertyValue("--active-tab-width"))).toBeCloseTo(
        active.getBoundingClientRect().width,
        1,
      );
    });
    expect(active.classList.contains("sui_segments_item-active")).toBe(true);
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SegmentsRoot defaultValue="day">
        <SegmentsList>
          <SegmentsItem value="day">日</SegmentsItem>
          <SegmentsIndicator className="custom" />
        </SegmentsList>
      </SegmentsRoot>,
    );

    // 検証
    expect(
      screen.getByClassName("sui_segments_indicator").element().classList.contains("custom"),
    ).toBe(true);
  });

  test("render の関数へスタイル情報を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SegmentsRoot defaultValue="day" size="lg">
        <SegmentsList>
          <SegmentsItem value="day">日</SegmentsItem>
          <SegmentsIndicator
            render={(props, state) => (
              <span {...props} data-probe={`${state.size}/${state.orientation}`} />
            )}
          />
        </SegmentsList>
      </SegmentsRoot>,
    );

    // 検証
    expect(
      screen.getByClassName("sui_segments_indicator").element().getAttribute("data-probe"),
    ).toBe("lg/horizontal");
  });
});
