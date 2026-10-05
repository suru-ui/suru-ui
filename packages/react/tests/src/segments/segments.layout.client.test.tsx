import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/segments/segments.parts.js";
import { SegmentsIndicator } from "../../../src/segments/indicator/segments.indicator.jsx";
import { SegmentsItem } from "../../../src/segments/item/segments.item.jsx";
import { SegmentsList } from "../../../src/segments/list/segments.list.jsx";
import { SegmentsRoot } from "../../../src/segments/root/segments.root.jsx";
import { Segments } from "../../../src/segments/segments.jsx";
import "../_locators.js";
import supportsCustomFunctions from "../button/_supports-custom-functions.js";

const items = [
  { label: "日", value: "day" },
  { label: "週", value: "week" },
  { label: "月", value: "month" },
] as const;

describe("Segments の配置", () => {
  test("公開パーツをすべて描画して余白を持たない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SegmentsRoot defaultValue="day">
        <SegmentsList>
          <SegmentsItem value="day">日</SegmentsItem>
          <SegmentsItem value="week">週</SegmentsItem>
          <SegmentsIndicator />
        </SegmentsList>
      </SegmentsRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_segments").query()).not.toBe(null);
    expect(screen.getByRole("tablist").element().classList.contains("sui_segments_list")).toBe(
      true,
    );
    expect(screen.getByRole("tab").elements().length).toBe(2);
    expect(screen.getByClassName("sui_segments_indicator").query()).not.toBe(null);

    const elements = screen.container.querySelectorAll<HTMLElement>(
      ".sui_segments, .sui_segments *",
    );
    for (const element of elements) {
      const style = getComputedStyle(element);
      expect(style.marginTop).toBe("0px");
      expect(style.marginInlineStart).toBe("0px");
    }
  });

  test("項目を間隔を空けて横一列に並べる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Segments defaultValue="day" items={[...items]} />);

    // 検証
    const list = getComputedStyle(screen.getByRole("tablist").element());
    expect(list.display).toBe("flex");
    expect(list.flexDirection).toBe("row");
    const day = screen.getByRole("tab", { name: "日" }).element().getBoundingClientRect();
    const week = screen.getByRole("tab", { name: "週" }).element().getBoundingClientRect();
    const month = screen.getByRole("tab", { name: "月" }).element().getBoundingClientRect();
    expect(week.left).toBeGreaterThanOrEqual(day.right);
    expect(month.left).toBeGreaterThanOrEqual(week.right);
    expect(day.top).toBeCloseTo(week.top, 1);
  });

  test("縦方向では列に並べる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Segments defaultValue="day" items={[...items]} orientation="vertical" />,
    );

    // 検証
    const list = getComputedStyle(screen.getByRole("tablist").element());
    expect(list.flexDirection).toBe("column");
    const day = screen.getByRole("tab", { name: "日" }).element().getBoundingClientRect();
    const week = screen.getByRole("tab", { name: "週" }).element().getBoundingClientRect();
    expect(week.top).toBeGreaterThanOrEqual(day.bottom);
    expect(day.left).toBeCloseTo(week.left, 1);
  });

  test.skipIf(!supportsCustomFunctions())("大きさごとの間隔と余白を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <Segments defaultValue="day" id="sm" items={[...items]} size="sm" />
        <Segments defaultValue="day" id="md" items={[...items]} size="md" />
        <Segments defaultValue="day" id="lg" items={[...items]} size="lg" />
      </>,
    );

    // 検証
    const sm = getComputedStyle(screen.container.querySelector<HTMLElement>("#sm [role=tablist]")!);
    expect(sm.columnGap).toBe("2px");
    expect(sm.paddingInlineStart).toBe("6px");
    const md = getComputedStyle(screen.container.querySelector<HTMLElement>("#md [role=tablist]")!);
    expect(md.columnGap).toBe("4px");
    expect(md.paddingInlineStart).toBe("6px");
    const lg = getComputedStyle(screen.container.querySelector<HTMLElement>("#lg [role=tablist]")!);
    expect(lg.columnGap).toBe("6px");
    expect(lg.paddingInlineStart).toBe("8px");
  });

  test("大きさごとの活字と最小高さを反映する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <Segments defaultValue="day" id="sm" items={[...items]} size="sm" />
        <Segments defaultValue="day" id="md" items={[...items]} size="md" />
        <Segments defaultValue="day" id="lg" items={[...items]} size="lg" />
      </>,
    );

    // 検証
    const sm = getComputedStyle(screen.container.querySelector<HTMLElement>("#sm [role=tab]")!);
    expect(sm.fontSize).toBe("12px");
    expect(sm.minHeight).toBe("26px");
    const md = getComputedStyle(screen.container.querySelector<HTMLElement>("#md [role=tab]")!);
    expect(md.fontSize).toBe("14px");
    expect(md.minHeight).toBe("32px");
    const lg = getComputedStyle(screen.container.querySelector<HTMLElement>("#lg [role=tab]")!);
    expect(lg.fontSize).toBe("17px");
    expect(lg.minHeight).toBe("36px");
  });

  test.skipIf(!supportsCustomFunctions())(
    "項目の左右の余白を大きさに合わせる",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(
        <>
          <Segments defaultValue="day" id="sm" items={[...items]} size="sm" />
          <Segments defaultValue="day" id="md" items={[...items]} size="md" />
          <Segments defaultValue="day" id="lg" items={[...items]} size="lg" />
        </>,
      );

      // 検証
      const sm = getComputedStyle(screen.container.querySelector<HTMLElement>("#sm [role=tab]")!);
      expect(Number.parseFloat(sm.paddingInlineStart)).toBeCloseTo(6, 1);
      const md = getComputedStyle(screen.container.querySelector<HTMLElement>("#md [role=tab]")!);
      expect(Number.parseFloat(md.paddingInlineStart)).toBeCloseTo(10, 1);
      const lg = getComputedStyle(screen.container.querySelector<HTMLElement>("#lg [role=tab]")!);
      expect(Number.parseFloat(lg.paddingInlineStart)).toBeCloseTo(14, 1);
    },
  );

  test("角丸を大きさに合わせる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <Segments defaultValue="day" id="sm" items={[...items]} size="sm" />
        <Segments defaultValue="day" id="md" items={[...items]} size="md" />
        <Segments defaultValue="day" id="lg" items={[...items]} size="lg" />
      </>,
    );

    // 検証
    const sm = getComputedStyle(screen.container.querySelector<HTMLElement>("#sm [role=tab]")!);
    expect(sm.borderTopLeftRadius).toBe("4px");
    const md = getComputedStyle(screen.container.querySelector<HTMLElement>("#md [role=tab]")!);
    expect(md.borderTopLeftRadius).toBe("8px");
    const lg = getComputedStyle(screen.container.querySelector<HTMLElement>("#lg [role=tab]")!);
    expect(lg.borderTopLeftRadius).toBe("12px");
  });

  test("角丸 full では丸くする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Segments defaultValue="day" items={[...items]} radius="full" />);

    // 検証
    const item = getComputedStyle(screen.getByRole("tab", { name: "日" }).element());
    expect(Number.parseFloat(item.borderTopLeftRadius)).toBeGreaterThanOrEqual(100);
  });

  test("選択中の項目の文字色を強調する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span style={{ color: "var(--sui-grey-solid-canvas_text-normal)" }}>基準</span>
        <Segments defaultValue="week" items={[...items]} />
      </>,
    );

    // 検証
    const expected = getComputedStyle(screen.getByText("基準").element());
    const active = getComputedStyle(screen.getByRole("tab", { name: "週" }).element());
    expect(active.color).toBe(expected.color);
    const idle = getComputedStyle(screen.getByRole("tab", { name: "日" }).element());
    expect(idle.color).not.toBe(expected.color);
  });

  test("選択中の背景をインジケーターで描く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span style={{ backgroundColor: "var(--sui-grey-solid-canvas-normal)" }}>基準</span>
        <Segments defaultValue="week" items={[...items]} />
      </>,
    );

    // 検証
    const expected = getComputedStyle(screen.getByText("基準").element());
    const indicator = getComputedStyle(screen.getByClassName("sui_segments_indicator").element());
    expect(indicator.backgroundColor).toBe(expected.backgroundColor);
  });

  test("無効な項目を淡色にして操作不能にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span style={{ color: "var(--sui-disabled-naked-canvas_text)" }}>基準</span>
        <Segments
          items={[
            { label: "日", value: "day" },
            { disabled: true, label: "週", value: "week" },
          ]}
        />
      </>,
    );

    // 検証
    const expected = getComputedStyle(screen.getByText("基準").element());
    const disabled = getComputedStyle(screen.getByRole("tab", { name: "週" }).element());
    expect(disabled.color).toBe(expected.color);
    expect(disabled.cursor).toBe("not-allowed");
  });

  test("通常の項目は hover で色を変える", async ({ expect }) => {
    // 準備
    const screen = await render(
      <>
        <Segments defaultValue="day" items={[...items]} />
        <span style={{ display: "block", marginBlockStart: "48px" }}>待避</span>
      </>,
    );
    const tab = screen.getByRole("tab", { name: "月" });
    await screen.getByText("待避").hover();
    const before = getComputedStyle(tab.element()).color;

    // 実行
    await tab.hover();

    // 検証
    expect(getComputedStyle(tab.element()).color).not.toBe(before);
  });
});
