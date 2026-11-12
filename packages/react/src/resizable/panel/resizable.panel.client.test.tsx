import "@suru-ui/theme/suru.css";
import * as React from "react";
import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import "../resizable.parts.js";
import { ResizableHandle } from "../handle/resizable.handle.jsx";
import { ResizableRoot } from "../root/resizable.root.jsx";
import { ResizablePanel } from "./resizable.panel.jsx";
import "../../../tests/src/_locators.js";

/**
 * パネルの割合を安定して測るための幅 400px の固定コンテナーです。
 * パネルの `defaultSize` の数値がパーセントとして扱われることの検証に使用します。
 */
function SizedGroup({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: 400,
        height: 100,
      }}
    >
      <ResizableRoot>{children}</ResizableRoot>
    </div>
  );
}

/** ルートの幅に対するパネルの幅の割合を返します。 */
function getPanelRatios(container: Element): number[] {
  const root = container.querySelector<HTMLElement>(".sui_resizable")!;
  const rootWidth = root.getBoundingClientRect().width;

  return [...container.querySelectorAll<HTMLElement>(".sui_resizable_panel")].map(
    (panel) => panel.getBoundingClientRect().width / rootWidth,
  );
}

describe("ResizablePanel", () => {
  test("修飾クラスを付け、利用者の className を保持する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <SizedGroup>
        <ResizablePanel className="custom" defaultSize={50}>
          内容
        </ResizablePanel>
      </SizedGroup>,
    );

    // 検証。
    const panel = screen.getByClassName("sui_resizable_panel").element();
    expect(panel.classList.contains("sui_resizable_panel")).toBe(true);
    expect(panel.classList.contains("custom")).toBe(true);
  });

  test("数値の defaultSize をパーセントとして扱う", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <SizedGroup>
        <ResizablePanel defaultSize={25}>左</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={75}>右</ResizablePanel>
      </SizedGroup>,
    );

    // 検証。
    const [left, right] = getPanelRatios(screen.container);
    expect(left).toBeCloseTo(0.25, 1);
    expect(right).toBeCloseTo(0.75, 1);
  });

  test("size の変更を描画に反映する", async ({ expect }) => {
    // 準備。
    const screen = await render(
      <SizedGroup>
        <ResizablePanel defaultSize={50}>左</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>右</ResizablePanel>
      </SizedGroup>,
    );

    // 実行。
    await screen.rerender(
      <SizedGroup>
        <ResizablePanel size={40}>左</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={60}>右</ResizablePanel>
      </SizedGroup>,
    );

    // 検証。
    const [left, right] = getPanelRatios(screen.container);
    expect(left).toBeCloseTo(0.4, 1);
    expect(right).toBeCloseTo(0.6, 1);
  });

  test("数値の minSize をパーセントとして扱う", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <SizedGroup>
        <ResizablePanel minSize={30} defaultSize={10}>
          左
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={90}>右</ResizablePanel>
      </SizedGroup>,
    );

    // 検証。
    const [left] = getPanelRatios(screen.container);
    expect(left).toBeGreaterThanOrEqual(0.29);
    expect(left).toBeCloseTo(0.3, 1);
  });

  test("数値の maxSize をパーセントとして扱う", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <SizedGroup>
        <ResizablePanel maxSize={40} defaultSize={80}>
          左
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={20}>右</ResizablePanel>
      </SizedGroup>,
    );

    // 検証。
    const [left] = getPanelRatios(screen.container);
    expect(left).toBeCloseTo(0.4, 1);
  });

  test("className と style を状態に応じて解決する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <div
        style={{
          width: 400,
          height: 100,
        }}
      >
        <ResizableRoot orientation="vertical">
          <ResizablePanel
            style={(state) => ({ opacity: state.orientation === "vertical" ? "0.5" : "1" })}
            className={(state) => `custom-${state.orientation}`}
          />
        </ResizableRoot>
      </div>,
    );

    // 検証。
    const panel = screen.getByClassName("sui_resizable_panel").element();
    expect(panel.classList.contains("custom-vertical")).toBe(true);
    expect(panel.style.opacity).toBe("0.5");
  });

  test("render の関数へ状態を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <div
        style={{
          width: 400,
          height: 100,
        }}
      >
        <ResizableRoot orientation="vertical">
          <ResizablePanel
            render={(props, state) => {
              const {
                maxSize: _maxSize,
                minSize: _minSize,
                onResize: _onResize,
                panelRef: _panelRef,
                defaultSize: _defaultSize,
                ...rest
              } = props as Record<string, unknown>;

              return <section {...rest} data-probe={state.orientation} />;
            }}
          />
        </ResizableRoot>
      </div>,
    );

    // 検証。
    const panel = screen.getByClassName("sui_resizable_panel").element();
    expect(panel.tagName).toBe("SECTION");
    expect(panel.getAttribute("data-probe")).toBe("vertical");
  });
});
