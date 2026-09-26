import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import "../../../src/resizable/resizable.parts.js";
import { ResizableHandle } from "../../../src/resizable/resizable.handle.jsx";
import { ResizablePanel } from "../../../src/resizable/resizable.panel.jsx";
import { ResizableRoot } from "../../../src/resizable/resizable.root.jsx";
import "../_locators.js";
import supportsCustomFunctions from "./_supports-custom-functions.js";

/**
 * パネルの割合を安定して測るための幅 400px の固定コンテナーです。
 * パネルの `defaultSize` の数値がパーセントとして扱われることの検証に使用します。
 */
function SizedGroup({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ height: 100, width: 400 }}>
      <ResizableRoot>{children}</ResizableRoot>
    </div>
  );
}

/**
 * ルートの幅に対するパネルの幅の割合を返します。
 */
function getPanelRatios(container: Element): number[] {
  const root = container.querySelector<HTMLElement>(".sui_resizable")!;
  const rootWidth = root.getBoundingClientRect().width;

  return [...container.querySelectorAll<HTMLElement>(".sui_resizable_panel")].map(
    (panel) => panel.getBoundingClientRect().width / rootWidth,
  );
}

describe("ResizablePanel", () => {
  test("修飾クラスを付け、利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SizedGroup>
        <ResizablePanel className="custom" defaultSize={50}>
          内容
        </ResizablePanel>
      </SizedGroup>,
    );

    // 検証
    const panel = screen.getByClassName("sui_resizable_panel").element();
    expect(panel.classList.contains("sui_resizable_panel")).toBe(true);
    expect(panel.classList.contains("custom")).toBe(true);
  });

  test("数値の defaultSize をパーセントとして扱う", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SizedGroup>
        <ResizablePanel defaultSize={25}>左</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={75}>右</ResizablePanel>
      </SizedGroup>,
    );

    // 検証
    const [left, right] = getPanelRatios(screen.container);
    expect(left).toBeCloseTo(0.25, 1);
    expect(right).toBeCloseTo(0.75, 1);
  });

  test("size の変更を描画に反映する", async ({ expect }) => {
    // 準備
    const screen = await render(
      <SizedGroup>
        <ResizablePanel defaultSize={50}>左</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>右</ResizablePanel>
      </SizedGroup>,
    );

    // 実行
    await screen.rerender(
      <SizedGroup>
        <ResizablePanel size={40}>左</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={60}>右</ResizablePanel>
      </SizedGroup>,
    );

    // 検証
    const [left, right] = getPanelRatios(screen.container);
    expect(left).toBeCloseTo(0.4, 1);
    expect(right).toBeCloseTo(0.6, 1);
  });

  test("数値の minSize をパーセントとして扱う", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SizedGroup>
        <ResizablePanel defaultSize={10} minSize={30}>
          左
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={90}>右</ResizablePanel>
      </SizedGroup>,
    );

    // 検証
    const [left] = getPanelRatios(screen.container);
    expect(left).toBeGreaterThanOrEqual(0.29);
    expect(left).toBeCloseTo(0.3, 1);
  });

  test("数値の maxSize をパーセントとして扱う", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SizedGroup>
        <ResizablePanel defaultSize={80} maxSize={40}>
          左
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={20}>右</ResizablePanel>
      </SizedGroup>,
    );

    // 検証
    const [left] = getPanelRatios(screen.container);
    expect(left).toBeCloseTo(0.4, 1);
  });

  test("onSizeChange にパーセント値を渡す", async ({ expect }) => {
    // 準備
    const sizes: number[] = [];

    // 実行
    await render(
      <SizedGroup>
        <ResizablePanel defaultSize={25} onSizeChange={(size) => sizes.push(size)}>
          左
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={75}>右</ResizablePanel>
      </SizedGroup>,
    );

    // 検証
    await vi.waitFor(() => {
      expect(sizes[0]).toBeCloseTo(25, 0);
    });
  });

  test.skipIf(!supportsCustomFunctions())(
    "ハンドルのドラッグでパネルのサイズを変更する",
    async ({ expect }) => {
      // 準備
      const screen = await render(
        <SizedGroup>
          <ResizablePanel defaultSize={50}>左</ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>右</ResizablePanel>
        </SizedGroup>,
      );
      const before = getPanelRatios(screen.container)[0]!;
      const handle = screen.getByRole("separator");
      const right = screen.getByClassName("sui_resizable_panel").all().at(-1)!;

      // 実行
      await userEvent.dragAndDrop(handle, right);

      // 検証
      const after = getPanelRatios(screen.container)[0]!;
      expect(after).toBeGreaterThan(before);
    },
  );

  test("className を状態に応じて解決する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <div style={{ height: 100, width: 400 }}>
        <ResizableRoot orientation="vertical">
          <ResizablePanel className={(state) => `custom-${state.orientation}`} />
        </ResizableRoot>
      </div>,
    );

    // 検証
    expect(
      screen.getByClassName("sui_resizable_panel").element().classList.contains("custom-vertical"),
    ).toBe(true);
  });
});
