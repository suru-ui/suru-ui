import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";

import { ScrollArea } from "../../src/navigation/scroll-area/index.js";

describe("ScrollArea", () => {
  test("既定の縦スクロール領域をレンダリングする", async () => {
    const screen = await render(
      <ScrollArea style={{ height: "100px", width: "100px" }}>
        <div style={{ height: "300px" }} data-testid="content">
          コンテンツ
        </div>
      </ScrollArea>,
    );

    await expect.element(screen.getByText("コンテンツ")).toBeVisible();
    await expect
      .element(screen.container.querySelector<HTMLElement>(".sui_scroll_area_content"))
      .toHaveClass("sui_scroll_area_content");
    await expect
      .element(screen.container.querySelector<HTMLElement>(".sui_scroll_area_viewport"))
      .toHaveClass("sui_scroll_area_viewport");
    await expect
      .element(screen.container.querySelector<HTMLElement>(".sui_scroll_area"))
      .toHaveClass("sui_scroll_area");
  });

  test("垂直スクロールバーをスクロール領域内に収める", async () => {
    const screen = await render(
      <ScrollArea
        data-testid="root"
        style={{ height: "100px", padding: "16px", width: "100px" }}
        slotProps={{
          scrollbar: { "data-testid": "vertical-scrollbar" },
          thumb: { "data-testid": "vertical-thumb" },
        }}
      >
        <div style={{ height: "300px" }}>コンテンツ</div>
      </ScrollArea>,
    );

    const root = screen.getByTestId("root").element().getBoundingClientRect();
    const scrollbar = screen.getByTestId("vertical-scrollbar").element().getBoundingClientRect();
    const thumb = screen.getByTestId("vertical-thumb").element().getBoundingClientRect();

    expect(scrollbar.top).toBeGreaterThanOrEqual(root.top);
    expect(scrollbar.bottom).toBeLessThanOrEqual(root.bottom);
    expect(scrollbar.right).toBeLessThanOrEqual(root.right);
    expect(thumb.top).toBeGreaterThanOrEqual(scrollbar.top);
    expect(thumb.bottom).toBeLessThanOrEqual(scrollbar.bottom);
  });

  test("horizontal で横スクロールバーを追加する", async () => {
    const screen = await render(
      <ScrollArea
        horizontal
        style={{ height: "100px", width: "100px" }}
        slotProps={{
          scrollbar: { "data-testid": "vertical-scrollbar" },
          horizontalScrollbar: { "data-testid": "horizontal-scrollbar" },
        }}
      >
        <div style={{ height: "300px", width: "300px" }}>横長コンテンツ</div>
      </ScrollArea>,
    );

    await expect
      .element(screen.getByTestId("vertical-scrollbar"))
      .toHaveAttribute("data-orientation", "vertical");
    await expect
      .element(screen.getByTestId("horizontal-scrollbar"))
      .toHaveAttribute("data-orientation", "horizontal");
  });

  test("slotProps を各パーツに適用する", async () => {
    const screen = await render(
      <ScrollArea
        style={{ height: "100px", width: "100px" }}
        slotProps={{
          viewport: { "aria-label": "スクロール領域" },
          thumb: { "data-testid": "thumb" },
        }}
      >
        <div style={{ height: "300px" }}>コンテンツ</div>
      </ScrollArea>,
    );

    await expect.element(screen.getByLabelText("スクロール領域")).toBeVisible();
    await expect.element(screen.getByTestId("thumb")).toBeVisible();
  });
});
