import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { SegmentsRoot } from "../root/segments.root.jsx";
import { SegmentsList } from "./segments.list.jsx";
import "../../../tests/src/_locators.js";

const items = [
  {
    label: "日",
    value: "day",
  },
  {
    label: "週",
    value: "week",
  },
  {
    label: "月",
    value: "month",
  },
] as const;
describe("SegmentsList", () => {
  test("項目をタブとして並べる", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <SegmentsRoot items={[...items]}>
        <SegmentsList />
      </SegmentsRoot>,
    );

    // 検証。
    const list = screen.getByRole("tablist").element();
    expect(list.classList.contains("sui_segments_list")).toBe(true);
    expect(list.getAttribute("aria-label")).toBe("セグメント");

    const tabs = screen.getByRole("tab").elements();
    expect(tabs.map((tab) => tab.textContent)).toStrictEqual(["日", "週", "月"]);
  });

  test("プリミティブな項目もタブにする", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <SegmentsRoot items={["day", "week"]}>
        <SegmentsList />
      </SegmentsRoot>,
    );

    // 検証。
    const tabs = screen.getByRole("tab").elements();
    expect(tabs.map((tab) => tab.textContent)).toStrictEqual(["day", "week"]);
    expect(
      screen.getByRole("tab", { name: "day" }).element().classList.contains("sui_segments_item"),
    ).toBe(true);
  });

  test("項目ごとの props を項目へ渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <SegmentsRoot
        items={[
          {
            label: "週",
            value: "week",
            disabled: true,
          },
        ]}
      >
        <SegmentsList />
      </SegmentsRoot>,
    );

    // 検証。
    const tab = screen.getByRole("tab", { name: "週" }).element();
    expect(tab.classList.contains("sui_segments_item-disabled")).toBe(true);
  });

  test("利用者の aria-label を優先する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <SegmentsRoot items={[...items]}>
        <SegmentsList aria-label="表示期間" />
      </SegmentsRoot>,
    );

    // 検証。
    expect(screen.getByRole("tablist", { name: "表示期間" }).query()).not.toBe(null);
  });

  test("render と className の関数へスタイル情報と項目を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <SegmentsRoot size="lg" items={[...items]}>
        <SegmentsList
          render={(props, state) => (
            <div {...props} data-probe={`${state.size}/${state.items.length}`} />
          )}
          className={(state) => `probe-size_${state.size}`}
        />
      </SegmentsRoot>,
    );

    // 検証。
    const list = screen.getByRole("tablist").element();
    expect(list.tagName).toBe("DIV");
    expect(list.getAttribute("data-probe")).toBe("lg/3");
    expect(list.classList.contains("probe-size_lg")).toBe(true);
  });

  test("関数の children に項目とインデックスと項目一覧を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <SegmentsRoot items={[...items]}>
        <SegmentsList>
          {(item, index, allItems) => (
            <span key={index}>
              {index}:{item.label}:{allItems.length}
            </span>
          )}
        </SegmentsList>
      </SegmentsRoot>,
    );

    // 検証。
    expect(screen.getByText("0:日:3").query()).not.toBe(null);
    expect(screen.getByText("2:月:3").query()).not.toBe(null);
  });

  test("項目を渡さず children を渡すと children だけを描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <SegmentsRoot items={[...items]}>
        <SegmentsList>
          <span>単独</span>
        </SegmentsList>
      </SegmentsRoot>,
    );

    // 検証。
    expect(screen.getByText("単独").query()).not.toBe(null);
    expect(screen.getByRole("tab").query()).toBe(null);
  });

  test("項目がないときは空のリストにする", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <SegmentsRoot>
        <SegmentsList />
      </SegmentsRoot>,
    );

    // 検証。
    expect(screen.getByRole("tablist").element().childElementCount).toBe(0);
  });
});
