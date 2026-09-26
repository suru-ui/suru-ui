import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import {
  ScrollArea,
  ScrollAreaAPI,
  useScrollAreaAPI,
} from "../../../src/scroll-area/scroll-area.jsx";
import "../_locators.js";

describe("ScrollAreaAPI", () => {
  test("getRootProps はスクロール領域の props だけを返す", ({ expect }) => {
    // 準備と実行
    const api = new ScrollAreaAPI({
      "aria-label": "スクロール",
      horizontal: true,
      slotProps: { viewport: { id: "viewport" } },
    });

    // 検証
    expect(api.getRootProps()).toStrictEqual({ "aria-label": "スクロール" });
  });

  test("getContentProps は内容と slotProps をまとめる", ({ expect }) => {
    // 準備と実行
    const api = new ScrollAreaAPI({
      children: "内容",
      slotProps: { content: { id: "content" } },
    });

    // 検証
    expect(api.getContentProps()).toStrictEqual({ id: "content", children: "内容" });
  });

  test("getViewportProps は slotProps を返す", ({ expect }) => {
    // 準備と実行
    const api = new ScrollAreaAPI({ slotProps: { viewport: { id: "viewport" } } });

    // 検証
    expect(api.getViewportProps()).toStrictEqual({ id: "viewport" });
  });

  test("getScrollbarProps は垂直方向を指定する", ({ expect }) => {
    // 準備と実行
    const api = new ScrollAreaAPI({ slotProps: { scrollbar: { keepMounted: true } } });

    // 検証
    expect(api.getScrollbarProps()).toStrictEqual({
      keepMounted: true,
      orientation: "vertical",
    });
  });

  test("getThumbProps と getCornerProps は slotProps を返す", ({ expect }) => {
    // 準備と実行
    const api = new ScrollAreaAPI({
      slotProps: { thumb: { id: "thumb" }, corner: { id: "corner" } },
    });

    // 検証
    expect(api.getThumbProps()).toStrictEqual({ id: "thumb" });
    expect(api.getCornerProps()).toStrictEqual({ id: "corner" });
  });

  test("getHorizontalScrollbarProps は既定で表示しない", ({ expect }) => {
    // 準備と実行
    const api = new ScrollAreaAPI({});

    // 検証
    expect(api.getHorizontalScrollbarProps()).toBe(null);
  });

  test("horizontal を有効にすると水平方向を指定する", ({ expect }) => {
    // 準備と実行
    const api = new ScrollAreaAPI({
      horizontal: true,
      slotProps: { horizontalScrollbar: { keepMounted: true } },
    });

    // 検証
    expect(api.getHorizontalScrollbarProps()).toStrictEqual({
      keepMounted: true,
      orientation: "horizontal",
    });
  });

  test("getHorizontalThumbProps は既定で表示しない", ({ expect }) => {
    // 準備と実行
    const api = new ScrollAreaAPI({});

    // 検証
    expect(api.getHorizontalThumbProps()).toBe(null);
  });

  test("horizontal を有効にすると水平方向のつまみを返す", ({ expect }) => {
    // 準備と実行
    const api = new ScrollAreaAPI({
      horizontal: true,
      slotProps: { horizontalThumb: { id: "thumb" } },
    });

    // 検証
    expect(api.getHorizontalThumbProps()).toStrictEqual({ id: "thumb" });
  });
});

describe("useScrollAreaAPI", () => {
  test("API を作成する", async ({ expect }) => {
    // 準備
    function Probe() {
      const api = useScrollAreaAPI({});

      return <span>{api.getScrollbarProps().orientation}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("vertical").query()?.textContent).toBe("vertical");
  });
});

describe("ScrollArea", () => {
  test("公開パーツをすべて描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ScrollArea
        horizontal
        style={{ height: "120px", width: "160px" }}
        slotProps={{
          content: { id: "content" },
          corner: { id: "corner" },
          horizontalScrollbar: { keepMounted: true },
          horizontalThumb: { id: "horizontal-thumb" },
          scrollbar: { keepMounted: true },
          thumb: { id: "thumb" },
          viewport: { id: "viewport" },
        }}
      >
        <div style={{ height: "400px", width: "400px" }}>内容</div>
      </ScrollArea>,
    );
    await vi.waitFor(() => {
      expect(screen.container.querySelector(".sui_scroll_area_corner")).not.toBe(null);
    });

    // 検証
    for (const id of ["content", "corner", "horizontal-thumb", "thumb", "viewport"]) {
      expect(screen.container.querySelector(`#${id}`)).not.toBe(null);
    }
    expect(screen.container.querySelectorAll(".sui_scroll_area_scrollbar").length).toBe(2);
  });

  test("data-scope をルートだけに付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<ScrollArea>内容</ScrollArea>);

    // 検証
    const root = screen.getByClassName("sui_scroll_area").element();
    expect(root.hasAttribute("data-scope")).toBe(true);
    const viewport = screen.getByClassName("sui_scroll_area_viewport").element();
    expect(viewport.hasAttribute("data-scope")).toBe(false);
  });

  test("horizontal で水平方向のスクロールバーを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ScrollArea
        horizontal
        slotProps={{
          horizontalScrollbar: { keepMounted: true },
          scrollbar: { keepMounted: true },
        }}
      >
        内容
      </ScrollArea>,
    );

    // 検証
    expect(screen.container.querySelectorAll(".sui_scroll_area_scrollbar").length).toBe(2);
    expect(
      screen.container.querySelector(".sui_scroll_area_scrollbar-orientation_vertical"),
    ).not.toBe(null);
    expect(
      screen.container.querySelector(".sui_scroll_area_scrollbar-orientation_horizontal"),
    ).not.toBe(null);
  });

  test("スクロールバーを常に表示する状態を反映する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<ScrollArea alwaysShowScrollbar>内容</ScrollArea>);

    // 検証
    expect(screen.container.querySelector(".sui_scroll_area-always_show_scrollbar")).not.toBe(null);
  });

  test("slotProps の render で描画要素を差し替える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ScrollArea slotProps={{ viewport: { render: <section data-testid="viewport" /> } }}>
        内容
      </ScrollArea>,
    );

    // 検証
    expect(screen.getByTestId("viewport").query()).not.toBe(null);
  });
});
