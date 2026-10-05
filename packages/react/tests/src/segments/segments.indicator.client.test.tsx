import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { SegmentsIndicator } from "../../../src/segments/indicator/segments.indicator.jsx";
import { SegmentsItem } from "../../../src/segments/item/segments.item.jsx";
import { SegmentsList } from "../../../src/segments/list/segments.list.jsx";
import { SegmentsRoot } from "../../../src/segments/root/segments.root.jsx";
import "../_locators.js";

describe("SegmentsIndicator", () => {
  test("インジケーターとして描画する", async ({ expect }) => {
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
