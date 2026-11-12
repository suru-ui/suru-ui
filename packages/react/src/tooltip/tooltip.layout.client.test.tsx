import "@suru-ui/theme/suru.css";
import * as React from "react";
import { vi, test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import "../../tests/src/_locators.js";
import { Tooltip } from "./tooltip.jsx";

/** data-testid で指定した内容要素の computed style を取得します。 */
function computedStyle(testId: string): CSSStyleDeclaration {
  return getComputedStyle(document.querySelector<HTMLElement>(`[data-testid="${testId}"]`)!);
}

/** トリガーの上に十分な空間を作り、上側への配置を検証できるようにします。 */
function renderPlaced(tooltip: React.ReactNode) {
  return render(<div style={{ paddingBlockStart: "300px" }}>{tooltip}</div>);
}

describe("Tooltip の余白と配置", () => {
  test("大きさに応じて幅と余白を変える", async ({ expect }) => {
    // 準備と実行。
    const renderTooltip = (size: "sm" | "md" | "lg") => (
      <Tooltip size={size} trigger={<button>{size}</button>} defaultOpen data-testid="tooltip">
        内容
      </Tooltip>
    );
    const screen = await render(renderTooltip("sm"));
    const smMaxWidth = Number.parseFloat(computedStyle("tooltip").maxWidth);
    const smPaddingBlockStart = Number.parseFloat(computedStyle("tooltip").paddingBlockStart);
    await screen.rerender(renderTooltip("md"));

    const mdMaxWidth = Number.parseFloat(computedStyle("tooltip").maxWidth);
    const mdPaddingBlockStart = Number.parseFloat(computedStyle("tooltip").paddingBlockStart);
    const mdPaddingInlineStart = Number.parseFloat(computedStyle("tooltip").paddingInlineStart);

    await screen.rerender(renderTooltip("lg"));
    const lgMaxWidth = Number.parseFloat(computedStyle("tooltip").maxWidth);
    const lgPaddingBlockStart = Number.parseFloat(computedStyle("tooltip").paddingBlockStart);

    // 検証。
    expect(smMaxWidth).toBeLessThan(mdMaxWidth);
    expect(mdMaxWidth).toBeLessThan(lgMaxWidth);
    expect(smPaddingBlockStart).toBeLessThan(mdPaddingBlockStart);
    expect(mdPaddingBlockStart).toBeLessThan(lgPaddingBlockStart);
    expect(mdPaddingInlineStart).toBeGreaterThan(mdPaddingBlockStart);
  });

  test("内容を縦に並べて子の間隔を空ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Tooltip trigger={<button>開く</button>} defaultOpen data-testid="stack">
        <span>見出し</span>
        <span>本文</span>
      </Tooltip>,
    );

    // 検証。
    const style = computedStyle("stack");
    expect(style.display).toBe("flex");
    expect(style.flexDirection).toBe("column");

    const gap = Number.parseFloat(style.rowGap);
    expect(gap).toBeGreaterThan(0);

    const title = screen.getByText("見出し").element().getBoundingClientRect();
    const body = screen.getByText("本文").element().getBoundingClientRect();
    expect(body.top - title.bottom).toBeCloseTo(gap, 1);
  });

  test("角丸を指定どおりにする", async ({ expect }) => {
    // 準備と実行。
    const renderTooltip = (radius: "none" | "lg") => (
      <Tooltip
        radius={radius}
        trigger={<button>{radius}</button>}
        defaultOpen
        data-testid="tooltip"
      >
        内容
      </Tooltip>
    );
    const screen = await render(renderTooltip("none"));
    const noneRadius = computedStyle("tooltip").borderRadius;
    await screen.rerender(renderTooltip("lg"));

    const lgRadius = computedStyle("tooltip").borderRadius;

    // 検証。
    expect(noneRadius).toBe("0px");
    expect(Number.parseFloat(lgRadius)).toBeGreaterThan(0);
  });

  test("枠線を内側に引く", async ({ expect }) => {
    // 準備と実行。
    const renderTooltip = (outlined: boolean) => (
      <Tooltip
        trigger={<button>{outlined ? "枠あり" : "枠なし"}</button>}
        outlined={outlined}
        defaultOpen
        data-testid="tooltip"
      >
        内容
      </Tooltip>
    );
    const screen = await render(renderTooltip(false));
    const plainWidth = Number.parseFloat(computedStyle("tooltip").borderTopWidth);
    await screen.rerender(renderTooltip(true));

    const outlinedWidth = Number.parseFloat(computedStyle("tooltip").borderTopWidth);

    // 検証。
    expect(plainWidth).toBe(0);
    expect(outlinedWidth).toBeGreaterThan(0.5);
  });

  test("矢印を内容の縁へ付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await renderPlaced(
      <Tooltip trigger={<button>開く</button>} showArrow defaultOpen>
        内容
      </Tooltip>,
    );

    // 検証。
    const arrow = screen.getByClassName("sui_tooltip_arrow").element().getBoundingClientRect();
    const content = screen.getByClassName("sui_tooltip_popup").element().getBoundingClientRect();
    expect(arrow.width).toBeCloseTo(12, 0);
    expect(arrow.height).toBeCloseTo(6, 0);
    expect(Math.abs(arrow.top - content.bottom)).toBeLessThanOrEqual(7);
  });

  test("既定ではトリガーの上へ余白を空けて配置する", async ({ expect }) => {
    // 準備と実行。
    const screen = await renderPlaced(
      <Tooltip trigger={<button>開く</button>} defaultOpen>
        内容
      </Tooltip>,
    );

    // 検証。
    await vi.waitFor(() => {
      const content = screen.getByClassName("sui_tooltip_popup").element().getBoundingClientRect();
      const anchor = screen.getByRole("button", { name: "開く" }).element().getBoundingClientRect();
      expect(Math.abs(anchor.top - content.bottom - 8)).toBeLessThanOrEqual(1);
    });
    expect(screen.getByClassName("sui_tooltip_positioner").element().dataset["side"]).toBe("top");
  });
});
