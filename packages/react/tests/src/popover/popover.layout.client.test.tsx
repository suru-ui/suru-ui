import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { Popover } from "../../../src/popover/popover.jsx";
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
function renderPlaced(popover: React.ReactNode) {
  return render(<div style={{ paddingBlockStart: "300px" }}>{popover}</div>);
}

describe("Popover の余白と配置", () => {
  test.skipIf(!supportsCustomFunctions())("大きさに応じて幅と余白を変える", async ({ expect }) => {
    // 準備と実行
    await render(
      <>
        <Popover defaultOpen size="sm" trigger={<button>sm</button>} data-testid="sm">
          小さい
        </Popover>
        <Popover defaultOpen size="md" trigger={<button>md</button>} data-testid="md">
          中くらい
        </Popover>
        <Popover defaultOpen size="lg" trigger={<button>lg</button>} data-testid="lg">
          大きい
        </Popover>
      </>,
    );

    // 検証
    const sm = computedStyle("sm");
    const md = computedStyle("md");
    const lg = computedStyle("lg");
    expect(Number.parseFloat(sm.width)).toBeLessThan(Number.parseFloat(md.width));
    expect(Number.parseFloat(md.width)).toBeLessThan(Number.parseFloat(lg.width));
    expect(Number.parseFloat(sm.paddingBlockStart)).toBeLessThan(
      Number.parseFloat(md.paddingBlockStart),
    );
    expect(Number.parseFloat(md.paddingBlockStart)).toBeLessThan(
      Number.parseFloat(lg.paddingBlockStart),
    );
    expect(Number.parseFloat(md.paddingInlineStart)).toBe(Number.parseFloat(md.paddingBlockStart));
  });

  test.skipIf(!supportsCustomFunctions())(
    "内容を縦に並べて子の間隔を空ける",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(
        <Popover defaultOpen trigger={<button>開く</button>} data-testid="stack">
          <span>見出し</span>
          <span>本文</span>
        </Popover>,
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
        <Popover defaultOpen radius="none" trigger={<button>none</button>} data-testid="none">
          直角
        </Popover>
        <Popover defaultOpen radius="lg" trigger={<button>lg</button>} data-testid="lg">
          大きい
        </Popover>
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
        <Popover defaultOpen trigger={<button>枠なし</button>} data-testid="plain">
          枠なし
        </Popover>
        <Popover defaultOpen outlined trigger={<button>枠あり</button>} data-testid="outlined">
          枠あり
        </Popover>
      </>,
    );

    // 検証
    expect(Number.parseFloat(computedStyle("plain").borderTopWidth)).toBe(0);
    expect(Number.parseFloat(computedStyle("outlined").borderTopWidth)).toBeGreaterThan(0.5);
  });

  test("矢印を内容の縁へ付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await renderPlaced(
      <Popover defaultOpen arrow trigger={<button>開く</button>}>
        内容
      </Popover>,
    );

    // 検証
    const arrow = screen.getByClassName("sui_popover_arrow").element().getBoundingClientRect();
    const content = screen.getByClassName("sui_popover_content").element().getBoundingClientRect();
    expect(arrow.width).toBeCloseTo(12, 0);
    expect(arrow.height).toBeCloseTo(6, 0);
    expect(Math.abs(arrow.bottom - content.top)).toBeLessThanOrEqual(7);
  });

  test("オーバーレイを画面全体に広げる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Popover defaultOpen backdrop trigger={<button>開く</button>}>
        内容
      </Popover>,
    );

    // 検証
    const backdrop = screen
      .getByClassName("sui_popover_backdrop")
      .element()
      .getBoundingClientRect();
    expect(backdrop.width).toBe(window.innerWidth);
    expect(backdrop.height).toBe(window.innerHeight);
  });

  test("既定ではトリガーの下へ余白を空けて配置する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderPlaced(
      <Popover defaultOpen trigger={<button>開く</button>}>
        内容
      </Popover>,
    );

    // 検証
    await vi.waitFor(() => {
      const content = screen
        .getByClassName("sui_popover_content")
        .element()
        .getBoundingClientRect();
      const anchor = screen.getByRole("button", { name: "開く" }).element().getBoundingClientRect();
      expect(Math.abs(content.top - anchor.bottom - 8)).toBeLessThanOrEqual(1);
    });
  });

  test("指定した側へ配置する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderPlaced(
      <Popover
        defaultOpen
        trigger={<button>開く</button>}
        slotProps={{ positioner: { side: "top", sideOffset: 8 } }}
      >
        内容
      </Popover>,
    );

    // 検証
    await vi.waitFor(() => {
      const content = screen
        .getByClassName("sui_popover_content")
        .element()
        .getBoundingClientRect();
      const anchor = screen.getByRole("button", { name: "開く" }).element().getBoundingClientRect();
      expect(Math.abs(anchor.top - content.bottom - 8)).toBeLessThanOrEqual(1);
    });
    expect(screen.getByClassName("sui_popover_positioner").element().dataset["side"]).toBe("top");
  });
});
