import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { SegmentsItem } from "../../../src/segments/segments.item.jsx";
import { SegmentsList } from "../../../src/segments/segments.list.jsx";
import { SegmentsRoot } from "../../../src/segments/segments.root.jsx";
import "../_locators.js";

describe("SegmentsItem", () => {
  test("タブとして描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SegmentsRoot>
        <SegmentsList>
          <SegmentsItem value="day">日</SegmentsItem>
        </SegmentsList>
      </SegmentsRoot>,
    );

    // 検証
    const item = screen.getByRole("tab").element();
    expect(item.tagName).toBe("BUTTON");
    expect(item.classList.contains("sui_segments_item")).toBe(true);
  });

  test("選択中の項目に状態クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SegmentsRoot defaultValue="week">
        <SegmentsList>
          <SegmentsItem value="day">日</SegmentsItem>
          <SegmentsItem value="week">週</SegmentsItem>
        </SegmentsList>
      </SegmentsRoot>,
    );

    // 検証
    const active = screen.getByRole("tab", { name: "週" }).element();
    expect(active.classList.contains("sui_segments_item-active")).toBe(true);
    expect(active.getAttribute("aria-selected")).toBe("true");
    expect(
      screen
        .getByRole("tab", { name: "日" })
        .element()
        .classList.contains("sui_segments_item-active"),
    ).toBe(false);
  });

  test("無効な項目に状態クラスと無効属性を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SegmentsRoot>
        <SegmentsList>
          <SegmentsItem disabled value="day">
            日
          </SegmentsItem>
        </SegmentsList>
      </SegmentsRoot>,
    );

    // 検証
    const item = screen.getByRole("tab", { name: "日" }).element();
    expect(item.classList.contains("sui_segments_item-disabled")).toBe(true);
    expect(item.getAttribute("aria-disabled")).toBe("true");
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SegmentsRoot>
        <SegmentsList>
          <SegmentsItem nativeButton={false} render={<span />} value="day">
            日
          </SegmentsItem>
        </SegmentsList>
      </SegmentsRoot>,
    );

    // 検証
    expect(screen.getByRole("tab").element().tagName).toBe("SPAN");
  });
});
