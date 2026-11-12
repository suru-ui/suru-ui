import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { SegmentsList } from "../list/segments.list.jsx";
import { SegmentsRoot } from "../root/segments.root.jsx";
import { SegmentsItem } from "./segments.item.jsx";
import "../../../tests/src/_locators.js";

describe("SegmentsItem", () => {
  test("タブとして描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <SegmentsRoot>
        <SegmentsList>
          <SegmentsItem value="day">日</SegmentsItem>
        </SegmentsList>
      </SegmentsRoot>,
    );

    // 検証。
    const item = screen.getByRole("tab").element();
    expect(item.tagName).toBe("BUTTON");
    expect(item.classList.contains("sui_segments_item")).toBe(true);
  });

  test("選択中の項目に状態クラスを付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <SegmentsRoot defaultValue="week">
        <SegmentsList>
          <SegmentsItem value="day">日</SegmentsItem>
          <SegmentsItem value="week">週</SegmentsItem>
        </SegmentsList>
      </SegmentsRoot>,
    );

    // 検証。
    const active = screen.getByRole("tab", { name: "週" }).element();
    expect(active.classList.contains("sui_segments_item-active")).toBe(true);
    expect(
      screen
        .getByRole("tab", { name: "日" })
        .element()
        .classList.contains("sui_segments_item-active"),
    ).toBe(false);
  });

  test("無効な項目に状態クラスを付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <SegmentsRoot>
        <SegmentsList>
          <SegmentsItem value="day" disabled>
            日
          </SegmentsItem>
        </SegmentsList>
      </SegmentsRoot>,
    );

    // 検証。
    const item = screen.getByRole("tab", { name: "日" }).element();
    expect(item.classList.contains("sui_segments_item-disabled")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <SegmentsRoot>
        <SegmentsList>
          <SegmentsItem value="day" render={<span />} nativeButton={false}>
            日
          </SegmentsItem>
        </SegmentsList>
      </SegmentsRoot>,
    );

    // 検証。
    expect(screen.getByRole("tab").element().tagName).toBe("SPAN");
  });

  test("render と className の関数へスタイル情報と項目の状態を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <SegmentsRoot size="lg" defaultValue="day">
        <SegmentsList>
          <SegmentsItem
            value="day"
            render={(props, state) => (
              <span {...props} data-probe={`${state.size}/${state.active}/${state.disabled}`} />
            )}
            className={(state) => (state.active ? "probe-active" : undefined)}
            nativeButton={false}
          >
            日
          </SegmentsItem>
        </SegmentsList>
      </SegmentsRoot>,
    );

    // 検証。
    const item = screen.getByRole("tab").element();
    expect(item.tagName).toBe("SPAN");
    expect(item.getAttribute("data-probe")).toBe("lg/true/false");
    expect(item.classList.contains("probe-active")).toBe(true);
  });
});
