import "@suru-ui/theme/suru.css";
import { vi, test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { ScrollArea } from "./scroll-area.jsx";
import "./scroll-area.parts.js";
import "../../tests/src/_locators.js";

const tallContent = <div style={{ height: "600px" }}>内容</div>;

describe("ScrollArea の配置", () => {
  test("ルートいっぱいにビューポートを重ねる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ScrollArea style={{ width: "300px", height: "200px" }}>{tallContent}</ScrollArea>,
    );

    // 検証
    const root = screen.getByClassName("sui_scroll_area").element();
    const viewport = screen.getByClassName("sui_scroll_area_viewport").element();
    const content = screen.getByClassName("sui_scroll_area_content").element();
    const rootRect = root.getBoundingClientRect();
    const viewportRect = viewport.getBoundingClientRect();
    expect(rootRect.width).toBeCloseTo(300, 0);
    expect(rootRect.height).toBeCloseTo(200, 0);
    expect(viewportRect.width).toBeCloseTo(rootRect.width, 0);
    expect(viewportRect.height).toBeCloseTo(rootRect.height, 0);
    expect(getComputedStyle(root).overflow).toBe("hidden");
    expect(viewport.scrollHeight).toBeGreaterThan(viewport.clientHeight);
    expect(getComputedStyle(content).display).toBe("block");
  });

  test("スクロール領域の各要素は外側の余白を持たない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ScrollArea
        style={{ width: "300px", height: "200px" }}
        slotProps={{ scrollbar: { keepMounted: true } }}
      >
        {tallContent}
      </ScrollArea>,
    );

    // 検証
    const elements = screen.container.querySelectorAll<HTMLElement>(
      ".sui_scroll_area, .sui_scroll_area_viewport, .sui_scroll_area_content, .sui_scroll_area_scrollbar, .sui_scroll_area_thumb",
    );
    expect(elements.length).toBe(5);
    for (const element of elements) {
      const style = getComputedStyle(element);
      expect(style.marginTop).toBe("0px");
      expect(style.marginRight).toBe("0px");
      expect(style.marginBottom).toBe("0px");
      expect(style.marginLeft).toBe("0px");
    }
  });

  test("スクロールバーだけが内側の余白を持つ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ScrollArea
        style={{ width: "300px", height: "200px" }}
        slotProps={{ scrollbar: { keepMounted: true } }}
      >
        {tallContent}
      </ScrollArea>,
    );

    // 検証
    const scrollbar = screen
      .getByClassName("sui_scroll_area_scrollbar-orientation_vertical")
      .element();
    const scrollbarStyle = getComputedStyle(scrollbar);
    expect(scrollbarStyle.paddingTop).toBe("2px");
    expect(scrollbarStyle.paddingRight).toBe("2px");
    expect(scrollbarStyle.paddingBottom).toBe("2px");
    expect(scrollbarStyle.paddingLeft).toBe("2px");

    for (const className of [
      "sui_scroll_area",
      "sui_scroll_area_viewport",
      "sui_scroll_area_content",
      "sui_scroll_area_thumb",
    ]) {
      const style = getComputedStyle(screen.getByClassName(className).element());
      expect(style.paddingTop).toBe("0px");
      expect(style.paddingLeft).toBe("0px");
    }
  });

  test("縦方向のスクロールバーを右端に配置する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ScrollArea
        style={{ width: "300px", height: "200px" }}
        slotProps={{ scrollbar: { keepMounted: true } }}
      >
        {tallContent}
      </ScrollArea>,
    );
    await vi.waitFor(() => {
      expect(screen.container.querySelector(".sui_scroll_area-has_overflow_y")).not.toBe(null);
    });

    // 検証
    const rootRect = screen.getByClassName("sui_scroll_area").element().getBoundingClientRect();
    const scrollbar = screen
      .getByClassName("sui_scroll_area_scrollbar-orientation_vertical")
      .element();
    const scrollbarRect = scrollbar.getBoundingClientRect();
    expect(getComputedStyle(scrollbar).position).toBe("absolute");
    expect(getComputedStyle(scrollbar).flexDirection).toBe("column");
    expect(scrollbarRect.width).toBeCloseTo(10, 0);
    expect(scrollbarRect.top).toBeCloseTo(rootRect.top, 0);
    expect(scrollbarRect.right).toBeCloseTo(rootRect.right, 0);
    expect(scrollbarRect.bottom).toBeCloseTo(rootRect.bottom, 1);
  });

  test("縦方向のつまみをバーの幅いっぱいに広げる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ScrollArea
        style={{ width: "300px", height: "200px" }}
        slotProps={{ scrollbar: { keepMounted: true } }}
      >
        {tallContent}
      </ScrollArea>,
    );
    const thumb = screen.getByClassName("sui_scroll_area_thumb-orientation_vertical").element();
    await vi.waitFor(() => {
      expect(screen.container.querySelector(".sui_scroll_area-has_overflow_y")).not.toBe(null);
      expect(thumb.getBoundingClientRect().height).toBeGreaterThan(0);
    });

    // 検証
    const scrollbar = screen
      .getByClassName("sui_scroll_area_scrollbar-orientation_vertical")
      .element();
    const scrollbarStyle = getComputedStyle(scrollbar);
    const trackWidth =
      scrollbar.clientWidth -
      Number.parseFloat(scrollbarStyle.paddingLeft) -
      Number.parseFloat(scrollbarStyle.paddingRight);
    const thumbRect = thumb.getBoundingClientRect();
    expect(thumbRect.width).toBeCloseTo(trackWidth, 0);
    expect(thumbRect.height).toBeLessThan(scrollbar.getBoundingClientRect().height);
    expect(getComputedStyle(thumb).borderTopLeftRadius).toBe("999px");
    expect(getComputedStyle(thumb).backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
  });

  test("水平方向のスクロールバーを下端に配置する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ScrollArea
        style={{ width: "300px", height: "200px" }}
        slotProps={{
          scrollbar: { keepMounted: true },
          horizontalScrollbar: { keepMounted: true },
        }}
        horizontal
      >
        <div style={{ width: "900px", height: "600px" }}>内容</div>
      </ScrollArea>,
    );
    await vi.waitFor(() => {
      expect(screen.container.querySelector(".sui_scroll_area-has_overflow_x")).not.toBe(null);
    });

    // 検証
    const rootRect = screen.getByClassName("sui_scroll_area").element().getBoundingClientRect();
    const horizontal = screen
      .getByClassName("sui_scroll_area_scrollbar-orientation_horizontal")
      .element();
    const horizontalRect = horizontal.getBoundingClientRect();
    expect(getComputedStyle(horizontal).flexDirection).toBe("row");
    expect(horizontalRect.height).toBeCloseTo(10, 0);
    expect(horizontalRect.left).toBeCloseTo(rootRect.left, 0);
    expect(horizontalRect.bottom).toBeCloseTo(rootRect.bottom, 0);
  });

  test("両方向にスクロールするとき交差部分を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ScrollArea
        style={{ width: "300px", height: "200px" }}
        slotProps={{
          scrollbar: { keepMounted: true },
          horizontalScrollbar: { keepMounted: true },
        }}
        horizontal
      >
        <div style={{ width: "900px", height: "600px" }}>内容</div>
      </ScrollArea>,
    );
    await vi.waitFor(() => {
      expect(screen.container.querySelector(".sui_scroll_area_corner")).not.toBe(null);
    });

    // 検証
    const rootRect = screen.getByClassName("sui_scroll_area").element().getBoundingClientRect();
    const corner = screen.getByClassName("sui_scroll_area_corner").element();
    const cornerRect = corner.getBoundingClientRect();
    expect(getComputedStyle(corner).position).toBe("absolute");
    expect(cornerRect.right).toBeCloseTo(rootRect.right, 0);
    expect(cornerRect.bottom).toBeCloseTo(rootRect.bottom, 0);
  });

  test("既定ではスクロールバーを透明にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ScrollArea
        style={{ width: "300px", height: "200px" }}
        slotProps={{ scrollbar: { keepMounted: true } }}
      >
        {tallContent}
      </ScrollArea>,
    );

    // 検証
    const scrollbar = screen
      .getByClassName("sui_scroll_area_scrollbar-orientation_vertical")
      .element();
    expect(Number.parseFloat(getComputedStyle(scrollbar).opacity)).toBe(0);
  });

  test("常に表示を指定するとスクロールバーを表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ScrollArea
        style={{ width: "300px", height: "200px" }}
        slotProps={{ scrollbar: { keepMounted: true } }}
        alwaysShowScrollbar
      >
        {tallContent}
      </ScrollArea>,
    );
    await vi.waitFor(() => {
      expect(screen.container.querySelector(".sui_scroll_area-has_overflow_y")).not.toBe(null);
    });

    // 検証
    const scrollbar = screen
      .getByClassName("sui_scroll_area_scrollbar-orientation_vertical")
      .element();
    await vi.waitFor(() => {
      expect(Number.parseFloat(getComputedStyle(scrollbar).opacity)).toBe(1);
    });
  });

  test("公開変数でスクロールバーの太さを上書きできる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ScrollArea
        id="scroll-area"
        style={{ width: "300px", height: "200px" }}
        slotProps={{ scrollbar: { keepMounted: true } }}
      >
        {tallContent}
      </ScrollArea>,
    );
    const root = screen.container.querySelector<HTMLElement>("#scroll-area")!;
    root.style.setProperty("--sui_scroll_area_scrollbar-size", "16px");

    // 検証
    const scrollbar = screen
      .getByClassName("sui_scroll_area_scrollbar-orientation_vertical")
      .element();
    expect(scrollbar.getBoundingClientRect().width).toBeCloseTo(16, 0);
  });
});
