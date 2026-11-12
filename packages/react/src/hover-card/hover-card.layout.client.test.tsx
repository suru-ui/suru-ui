import "@suru-ui/theme/suru.css";
import { vi, test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import "../../tests/src/_locators.js";
import { HoverCard } from "./hover-card.jsx";

const trigger = <a href="#terms">利用規約</a>;

/** data-testid で指定した内容要素の computed style を取得します。 */
function computedStyle(testId: string): CSSStyleDeclaration {
  return getComputedStyle(document.querySelector<HTMLElement>(`[data-testid="${testId}"]`)!);
}

describe("HoverCard の余白と配置", () => {
  test("大きさに応じて幅と余白を変える", async ({ expect }) => {
    // 準備と実行。
    await render(
      <>
        <HoverCard size="sm" trigger={trigger} defaultOpen data-testid="sm">
          小さい
        </HoverCard>
        <HoverCard size="md" trigger={trigger} defaultOpen data-testid="md">
          中くらい
        </HoverCard>
        <HoverCard size="lg" trigger={trigger} defaultOpen data-testid="lg">
          大きい
        </HoverCard>
      </>,
    );

    // 検証。
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

  test("内容を縦に並べて子の間隔を空ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <HoverCard trigger={trigger} defaultOpen data-testid="stack">
        <span>見出し</span>
        <span>本文</span>
      </HoverCard>,
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
    await render(
      <>
        <HoverCard radius="none" trigger={trigger} defaultOpen data-testid="none">
          直角
        </HoverCard>
        <HoverCard radius="lg" trigger={trigger} defaultOpen data-testid="lg">
          大きい
        </HoverCard>
      </>,
    );

    // 検証。
    expect(computedStyle("none").borderRadius).toBe("0px");
    expect(Number.parseFloat(computedStyle("lg").borderRadius)).toBeGreaterThan(0);
  });

  test("枠線を内側に引く", async ({ expect }) => {
    // 準備と実行。
    await render(
      <>
        <HoverCard trigger={trigger} outlined={false} defaultOpen data-testid="plain">
          枠なし
        </HoverCard>
        <HoverCard trigger={trigger} outlined defaultOpen data-testid="outlined">
          枠あり
        </HoverCard>
      </>,
    );

    // 検証。
    expect(Number.parseFloat(computedStyle("plain").borderTopWidth)).toBe(0);
    expect(Number.parseFloat(computedStyle("outlined").borderTopWidth)).toBeGreaterThan(0.5);
  });

  test("矢印を内容の縁へ付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <div style={{ paddingBlockStart: "300px" }}>
        <HoverCard arrow trigger={trigger} defaultOpen>
          内容
        </HoverCard>
      </div>,
    );

    // 検証。
    const arrow = screen.getByClassName("sui_hover_card_arrow").element().getBoundingClientRect();
    const content = screen.getByClassName("sui_hover_card_popup").element().getBoundingClientRect();
    expect(arrow.width).toBeCloseTo(12, 0);
    expect(arrow.height).toBeCloseTo(6, 0);
    expect(Math.abs(arrow.bottom - content.top)).toBeLessThanOrEqual(7);
  });

  test("矢印を有効にするとトリガーから矢印の分だけ離す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <div style={{ paddingBlockStart: "300px" }}>
        <HoverCard
          arrow
          trigger={trigger}
          slotProps={{ positioner: { side: "bottom" } }}
          defaultOpen
        >
          内容
        </HoverCard>
      </div>,
    );

    // 検証。
    await vi.waitFor(() => {
      const content = screen
        .getByClassName("sui_hover_card_popup")
        .element()
        .getBoundingClientRect();
      const anchor = screen
        .getByRole("link", { name: "利用規約" })
        .element()
        .getBoundingClientRect();
      expect(Math.abs(content.top - anchor.bottom - 6)).toBeLessThanOrEqual(1);
    });
  });

  test("枠線の色を Menu や ContextMenu と同じにする", async ({ expect }) => {
    // 準備と実行。
    await render(
      <>
        <span
          style={{
            borderColor: "var(--sui-border-1)",
            borderStyle: "solid",
          }}
          data-testid="border-color"
        />
        <HoverCard trigger={trigger} outlined defaultOpen data-testid="outlined">
          枠あり
        </HoverCard>
      </>,
    );

    // 検証。
    expect(computedStyle("outlined").borderTopColor).toBe(
      computedStyle("border-color").borderTopColor,
    );
  });

  test("オーバーレイを画面全体に広げる", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <HoverCard trigger={trigger} backdrop defaultOpen>
        内容
      </HoverCard>,
    );

    // 検証。
    const backdrop = screen
      .getByClassName("sui_hover_card_backdrop")
      .element()
      .getBoundingClientRect();
    expect(backdrop.width).toBe(window.innerWidth);
    expect(backdrop.height).toBe(window.innerHeight);
  });
});
