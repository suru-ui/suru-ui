import "@suru-ui/theme/suru.css";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import "./collapsible.parts.js";
import supportsCustomFunctions from "./_supports-custom-functions.js";
import { CollapsibleContent } from "./content/collapsible.content.jsx";
import { CollapsibleIndicator } from "./indicator/collapsible.indicator.jsx";
import { CollapsibleRoot } from "./root/collapsible.root.jsx";
import "../../tests/src/_locators.js";
import { CollapsibleTrigger } from "./trigger/collapsible.trigger.jsx";

/**
 * トリガーを Suru UI のコンポーネントと同じ `data-scope` 付きのボタンで描画し、
 * スコープの境界を跨いだインジケーターのスタイルを検証するために使用します。
 */
function TriggerWithIndicator() {
  return (
    <CollapsibleTrigger>
      {(props) => (
        <button type="button" data-scope="" {...props}>
          開閉
          <CollapsibleIndicator data-testid="indicator" />
        </button>
      )}
    </CollapsibleTrigger>
  );
}

describe("Collapsible の配置", () => {
  test("data-scope を持つトリガー内のインジケーターにもスタイルを適用する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CollapsibleRoot defaultOpen>
        <TriggerWithIndicator />
      </CollapsibleRoot>,
    );

    // 検証
    const indicator = screen.getByTestId("indicator").element();
    const style = getComputedStyle(indicator);
    const svg = indicator.querySelector("svg")!;
    expect(Number.parseFloat(style.width)).toBeGreaterThan(0);
    expect(Number.parseFloat(style.width)).toBeCloseTo(Number.parseFloat(style.lineHeight), 1);
    expect(Number.parseFloat(getComputedStyle(svg).width)).toBeCloseTo(
      Number.parseFloat(style.lineHeight),
      1,
    );
  });

  test("開いた状態ではインジケーターを回転する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <CollapsibleRoot id="closed">
          <TriggerWithIndicator />
        </CollapsibleRoot>
        <CollapsibleRoot id="open" defaultOpen>
          <TriggerWithIndicator />
        </CollapsibleRoot>
      </>,
    );

    // 検証
    const closed = screen.container.querySelector<HTMLElement>("#closed [data-testid=indicator]")!;
    const open = screen.container.querySelector<HTMLElement>("#open [data-testid=indicator]")!;
    expect(getComputedStyle(closed).rotate).not.toBe(getComputedStyle(open).rotate);
    expect(getComputedStyle(open).rotate).toBe("90deg");
  });

  test("大きさごとにインジケーターとコンテンツの活字サイズを変える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <CollapsibleRoot size="sm" defaultOpen>
          <TriggerWithIndicator />
          <CollapsibleContent id="content-sm">内容</CollapsibleContent>
        </CollapsibleRoot>
        <CollapsibleRoot size="md" defaultOpen>
          <TriggerWithIndicator />
          <CollapsibleContent id="content-md">内容</CollapsibleContent>
        </CollapsibleRoot>
        <CollapsibleRoot size="lg" defaultOpen>
          <TriggerWithIndicator />
          <CollapsibleContent id="content-lg">内容</CollapsibleContent>
        </CollapsibleRoot>
      </>,
    );

    // 検証
    const [sm, md, lg] = screen.container.querySelectorAll<HTMLElement>(
      ".sui_collapsible_indicator",
    );
    expect(Number.parseFloat(getComputedStyle(sm!).width)).toBeLessThan(
      Number.parseFloat(getComputedStyle(md!).width),
    );
    expect(Number.parseFloat(getComputedStyle(md!).width)).toBeLessThan(
      Number.parseFloat(getComputedStyle(lg!).width),
    );
    const contentSm = screen.container.querySelector<HTMLElement>("#content-sm")!;
    const contentMd = screen.container.querySelector<HTMLElement>("#content-md")!;
    const contentLg = screen.container.querySelector<HTMLElement>("#content-lg")!;
    expect(Number.parseFloat(getComputedStyle(contentSm).fontSize)).toBeLessThan(
      Number.parseFloat(getComputedStyle(contentMd).fontSize),
    );
    expect(Number.parseFloat(getComputedStyle(contentMd).fontSize)).toBeLessThan(
      Number.parseFloat(getComputedStyle(contentLg).fontSize),
    );
  });

  test("余分な外部余白や内側の余白を持たない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CollapsibleRoot defaultOpen>
        <CollapsibleTrigger>
          {(props) => (
            <button type="button" {...props}>
              開閉
            </button>
          )}
        </CollapsibleTrigger>
        <CollapsibleContent id="content">内容</CollapsibleContent>
      </CollapsibleRoot>,
    );

    // 検証
    const root = screen.getByClassName("sui_collapsible").element();
    const content = screen.container.querySelector<HTMLElement>("#content")!;
    for (const element of [root, content]) {
      const style = getComputedStyle(element);
      expect(style.marginTop).toBe("0px");
      expect(style.marginBottom).toBe("0px");
      expect(style.marginInlineStart).toBe("0px");
      expect(style.paddingTop).toBe("0px");
      expect(style.paddingInlineStart).toBe("0px");
    }
  });

  test("コンテンツをトリガーの下に配置する", async ({ expect }) => {
    // 準備
    const screen = await render(
      <CollapsibleRoot defaultOpen>
        <CollapsibleTrigger>
          {(props) => (
            <button type="button" {...props}>
              開閉
            </button>
          )}
        </CollapsibleTrigger>
        <CollapsibleContent id="content">内容</CollapsibleContent>
      </CollapsibleRoot>,
    );
    const root = screen.getByClassName("sui_collapsible").element();
    const trigger = screen.getByRole("button", { name: "開閉" }).element();
    const content = screen.container.querySelector<HTMLElement>("#content")!;

    // 実行
    const rootRect = root.getBoundingClientRect();
    const triggerRect = trigger.getBoundingClientRect();
    const contentRect = content.getBoundingClientRect();

    // 検証
    expect(contentRect.left).toBeCloseTo(rootRect.left, 1);
    expect(contentRect.width).toBeCloseTo(rootRect.width, 1);
    expect(contentRect.top).toBeGreaterThanOrEqual(triggerRect.bottom - 0.5);
  });

  test("インジケーターの内容を中央に配置する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CollapsibleRoot defaultOpen>
        <TriggerWithIndicator />
      </CollapsibleRoot>,
    );

    // 検証
    const indicator = screen.getByTestId("indicator").element();
    const style = getComputedStyle(indicator);
    expect(style.display).toBe("inline-flex");
    expect(style.alignItems).toBe("center");
    expect(style.justifyContent).toBe("center");
    const indicatorRect = indicator.getBoundingClientRect();
    const svgRect = indicator.querySelector("svg")!.getBoundingClientRect();
    expect(svgRect.left + svgRect.width / 2).toBeCloseTo(
      indicatorRect.left + indicatorRect.width / 2,
      1,
    );
    expect(svgRect.top + svgRect.height / 2).toBeCloseTo(
      indicatorRect.top + indicatorRect.height / 2,
      1,
    );
  });

  test("無効なインジケーターの配色を変える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span style={{ color: "var(--sui-disabled-naked-canvas_text)" }}>基準</span>
        <CollapsibleRoot disabled>
          <TriggerWithIndicator />
        </CollapsibleRoot>
      </>,
    );

    // 検証
    const indicator = screen.getByTestId("indicator").element();
    const expected = getComputedStyle(screen.getByText("基準").element()).color;
    expect(getComputedStyle(indicator).color).toBe(expected);
    expect(getComputedStyle(indicator.querySelector("svg")!).color).toBe(expected);
  });

  test.skipIf(!supportsCustomFunctions())(
    "インジケーターの配色をアイコンへ適用する",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(
        <>
          <span
            style={{
              color:
                "--sui-icon_color(var(--sui-grey-solid-canvas_text-normal), var(--sui-canvas-1))",
            }}
          >
            基準
          </span>
          <CollapsibleRoot defaultOpen>
            <TriggerWithIndicator />
          </CollapsibleRoot>
        </>,
      );

      // 検証
      const expected = getComputedStyle(screen.getByText("基準").element()).color;
      const indicator = screen.getByTestId("indicator").element();
      expect(getComputedStyle(indicator).color).toBe(expected);
      expect(getComputedStyle(indicator.querySelector("svg")!).color).toBe(expected);
    },
  );
});
