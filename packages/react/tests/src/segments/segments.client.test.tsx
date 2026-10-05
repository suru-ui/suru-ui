import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { SegmentsItem } from "../../../src/segments/item/segments.item.jsx";
import { Segments, SegmentsAPI, useSegmentsAPI } from "../../../src/segments/segments.jsx";
import "../_locators.js";

const items = [
  { label: "日", value: "day" },
  { label: "週", value: "week" },
  { label: "月", value: "month" },
] as const;

describe("Segments", () => {
  test("項目を並べて既定の選択を反映する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Segments defaultValue="week" items={[...items]} />);

    // 検証
    expect(screen.getByRole("tablist").element().getAttribute("aria-label")).toBe("セグメント");
    const tabs = screen.getByRole("tab").elements();
    expect(tabs.map((tab) => tab.textContent)).toStrictEqual(["日", "週", "月"]);
    expect(
      screen
        .getByRole("tab", { name: "週" })
        .element()
        .classList.contains("sui_segments_item-active"),
    ).toBe(true);
    expect(screen.getByClassName("sui_segments_indicator").query()).not.toBe(null);
  });

  test("slotProps を各パーツへ渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Segments
        defaultValue="day"
        items={[...items]}
        slotProps={{
          indicator: { className: "custom-indicator" },
          item: { className: "custom-item" },
          list: { "aria-label": "期間", id: "period" },
        }}
      />,
    );

    // 検証
    expect(screen.getByRole("tablist", { name: "期間" }).element().id).toBe("period");
    expect(screen.container.querySelectorAll(".custom-item").length).toBe(3);
    expect(
      screen
        .getByClassName("sui_segments_indicator")
        .element()
        .classList.contains("custom-indicator"),
    ).toBe(true);
  });

  test("関数の children で項目を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Segments defaultValue="week" items={[...items]}>
        {(item, index) => (
          <SegmentsItem key={index} value={item.value}>
            「{item.label}」
          </SegmentsItem>
        )}
      </Segments>,
    );

    // 検証
    expect(screen.getByRole("tab", { name: "「週」" }).query()).not.toBe(null);
    expect(screen.getByClassName("sui_segments_indicator").query()).not.toBe(null);
  });

  test("項目ごとの disabled を項目へ渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Segments
        items={[
          { label: "日", value: "day" },
          { disabled: true, label: "週", value: "week" },
        ]}
      />,
    );

    // 検証
    expect(
      screen
        .getByRole("tab", { name: "週" })
        .element()
        .classList.contains("sui_segments_item-disabled"),
    ).toBe(true);
  });

  test("項目がないときはタブを描画しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Segments items={[]} />);

    // 検証
    expect(screen.getByRole("tab").query()).toBe(null);
    expect(screen.getByRole("tablist").query()).not.toBe(null);
  });
});

describe("SegmentsAPI", () => {
  test("getRootProps は items を引き継ぎ slotProps を含めない", ({ expect }) => {
    // 準備と実行
    const api = new SegmentsAPI({ items: [...items], slotProps: { list: { id: "list" } } });
    const rootProps = api.getRootProps();

    // 検証
    expect(rootProps.items).toStrictEqual([...items]);
    expect(rootProps).not.toHaveProperty("slotProps");
  });

  test("getItemProps は slotProps と項目の props を統合する", ({ expect }) => {
    // 準備と実行
    const api = new SegmentsAPI({
      items: [...items],
      slotProps: { item: { className: "custom", id: "item" } },
    });
    const props = api.getItemProps(items[0]);

    // 検証
    expect(props.value).toBe("day");
    expect(props.id).toBe("item");
    expect(props).not.toHaveProperty("label");
  });

  test("getItemProps はプリミティブを値にする", ({ expect }) => {
    // 準備と実行
    const api = new SegmentsAPI({});

    // 検証
    expect(api.getItemProps("day")).toStrictEqual({ value: "day" });
  });

  test("getLabel は項目のラベルを返す", ({ expect }) => {
    // 準備と実行
    const api = new SegmentsAPI({ items: [...items] });

    // 検証
    expect(api.getLabel(items[2])).toBe("月");
  });

  test("getListProps は slotProps と既定の children を返す", ({ expect }) => {
    // 準備と実行
    const api = new SegmentsAPI({ items: [...items], slotProps: { list: { id: "list" } } });
    const listProps = api.getListProps();

    // 検証
    expect(listProps.id).toBe("list");
    expect(React.isValidElement(listProps.children)).toBe(true);
  });

  test("getIndicatorProps は slotProps を返す", ({ expect }) => {
    // 準備と実行
    const api = new SegmentsAPI({
      items: [...items],
      slotProps: { indicator: { id: "indicator" } },
    });

    // 検証
    expect(api.getIndicatorProps()).toStrictEqual({ id: "indicator" });
  });
});

describe("useSegmentsAPI", () => {
  test("API を作成する", async ({ expect }) => {
    // 準備
    function Probe() {
      const api = useSegmentsAPI({ items: [...items] });
      return <span>{String(api.getRootProps().items?.length)}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("3").query()?.textContent).toBe("3");
  });
});
