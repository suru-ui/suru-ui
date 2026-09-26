import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { Tooltip } from "../../../src/tooltip/tooltip.jsx";
import "../_locators.js";
import supportsCustomFunctions from "./_supports-custom-functions.js";

/**
 * data-testid で指定した内容要素の computed style を取得します。
 */
function computedStyle(testId: string): CSSStyleDeclaration {
  return getComputedStyle(document.querySelector<HTMLElement>(`[data-testid="${testId}"]`)!);
}

/**
 * トリガーの上に十分な空間を作り、上側への配置を検証できるようにします。
 */
function renderPlaced(tooltip: React.ReactNode) {
  return render(<div style={{ paddingBlockStart: "300px" }}>{tooltip}</div>);
}

describe("Tooltip の余白と配置", () => {
  test.skipIf(!supportsCustomFunctions())("大きさに応じて幅と余白を変える", async ({ expect }) => {
    // 準備と実行
    await render(
      <>
        <Tooltip defaultOpen size="sm" trigger={<button>sm</button>} data-testid="sm">
          小さい
        </Tooltip>
        <Tooltip defaultOpen size="md" trigger={<button>md</button>} data-testid="md">
          中くらい
        </Tooltip>
        <Tooltip defaultOpen size="lg" trigger={<button>lg</button>} data-testid="lg">
          大きい
        </Tooltip>
      </>,
    );

    // 検証
    const sm = computedStyle("sm");
    const md = computedStyle("md");
    const lg = computedStyle("lg");
    expect(Number.parseFloat(sm.maxWidth)).toBeLessThan(Number.parseFloat(md.maxWidth));
    expect(Number.parseFloat(md.maxWidth)).toBeLessThan(Number.parseFloat(lg.maxWidth));
    expect(Number.parseFloat(sm.paddingBlockStart)).toBeLessThan(
      Number.parseFloat(md.paddingBlockStart),
    );
    expect(Number.parseFloat(md.paddingBlockStart)).toBeLessThan(
      Number.parseFloat(lg.paddingBlockStart),
    );
    expect(Number.parseFloat(md.paddingInlineStart)).toBeGreaterThan(
      Number.parseFloat(md.paddingBlockStart),
    );
  });

  test.skipIf(!supportsCustomFunctions())(
    "内容を縦に並べて子の間隔を空ける",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(
        <Tooltip defaultOpen trigger={<button>開く</button>} data-testid="stack">
          <span>見出し</span>
          <span>本文</span>
        </Tooltip>,
      );

      // 検証
      const style = computedStyle("stack");
      expect(style.display).toBe("flex");
      expect(style.flexDirection).toBe("column");
      const gap = Number.parseFloat(style.rowGap);
      expect(gap).toBeGreaterThan(0);
      const title = screen.getByText("見出し").element().getBoundingClientRect();
      const body = screen.getByText("本文").element().getBoundingClientRect();
      expect(body.top - title.bottom).toBeCloseTo(gap, 1);
    },
  );

  test("角丸を指定どおりにする", async ({ expect }) => {
    // 準備と実行
    await render(
      <>
        <Tooltip defaultOpen radius="none" trigger={<button>none</button>} data-testid="none">
          直角
        </Tooltip>
        <Tooltip defaultOpen radius="lg" trigger={<button>lg</button>} data-testid="lg">
          大きい
        </Tooltip>
      </>,
    );

    // 検証
    expect(computedStyle("none").borderRadius).toBe("0px");
    expect(Number.parseFloat(computedStyle("lg").borderRadius)).toBeGreaterThan(0);
  });

  test.skipIf(!supportsCustomFunctions())("枠線を内側に引く", async ({ expect }) => {
    // 準備と実行
    await render(
      <>
        <Tooltip defaultOpen trigger={<button>枠なし</button>} data-testid="plain">
          枠なし
        </Tooltip>
        <Tooltip defaultOpen outlined trigger={<button>枠あり</button>} data-testid="outlined">
          枠あり
        </Tooltip>
      </>,
    );

    // 検証
    expect(Number.parseFloat(computedStyle("plain").borderTopWidth)).toBe(0);
    expect(Number.parseFloat(computedStyle("outlined").borderTopWidth)).toBeGreaterThan(0.5);
  });

  test("矢印を内容の縁へ付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await renderPlaced(
      <Tooltip defaultOpen showArrow trigger={<button>開く</button>}>
        内容
      </Tooltip>,
    );

    // 検証
    const arrow = screen.getByClassName("sui_tooltip_arrow").element().getBoundingClientRect();
    const content = screen.getByClassName("sui_tooltip_content").element().getBoundingClientRect();
    expect(arrow.width).toBeCloseTo(12, 0);
    expect(arrow.height).toBeCloseTo(6, 0);
    expect(Math.abs(arrow.top - content.bottom)).toBeLessThanOrEqual(7);
  });

  test("既定ではトリガーの上へ余白を空けて配置する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderPlaced(
      <Tooltip defaultOpen trigger={<button>開く</button>}>
        内容
      </Tooltip>,
    );

    // 検証
    await vi.waitFor(() => {
      const content = screen
        .getByClassName("sui_tooltip_content")
        .element()
        .getBoundingClientRect();
      const anchor = screen.getByRole("button", { name: "開く" }).element().getBoundingClientRect();
      expect(Math.abs(anchor.top - content.bottom - 8)).toBeLessThanOrEqual(1);
    });
    expect(screen.getByClassName("sui_tooltip_positioner").element().dataset["side"]).toBe("top");
  });
});
