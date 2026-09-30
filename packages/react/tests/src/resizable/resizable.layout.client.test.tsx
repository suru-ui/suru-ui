import "@suru-ui/theme/suru.css";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/resizable/resizable.parts.js";
import { ResizableHandle } from "../../../src/resizable/resizable.handle.jsx";
import { ResizablePanel } from "../../../src/resizable/resizable.panel.jsx";
import { ResizableRoot } from "../../../src/resizable/resizable.root.jsx";
import "../_locators.js";
import supportsCustomFunctions from "./_supports-custom-functions.js";

describe("Resizable の配置", () => {
  test("公開パーツをすべて描画して余白を持たない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <div style={{ height: 200, width: 400 }}>
        <ResizableRoot>
          <ResizablePanel defaultSize={50}>左</ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>右</ResizablePanel>
        </ResizableRoot>
      </div>,
    );

    // 検証
    const elements = screen.container.querySelectorAll<HTMLElement>(
      ".sui_resizable, .sui_resizable *",
    );
    expect(elements.length).toBeGreaterThanOrEqual(5);
    for (const element of elements) {
      const style = getComputedStyle(element);
      expect(style.marginTop).toBe("0px");
      expect(style.marginRight).toBe("0px");
      expect(style.marginBottom).toBe("0px");
      expect(style.marginLeft).toBe("0px");
      expect(style.paddingTop).toBe("0px");
      expect(style.paddingRight).toBe("0px");
      expect(style.paddingBottom).toBe("0px");
      expect(style.paddingLeft).toBe("0px");
    }
  });

  test("横方向ではパネルとハンドルを隙間なく並べる", async ({ expect }) => {
    // 準備
    const screen = await render(
      <div style={{ height: 200, width: 400 }}>
        <ResizableRoot>
          <ResizablePanel defaultSize={50}>左</ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>右</ResizablePanel>
        </ResizableRoot>
      </div>,
    );
    const wrapper = screen.container.firstElementChild as HTMLElement;
    const root = screen.getByClassName("sui_resizable").element();
    const [left, right] = screen.container.querySelectorAll<HTMLElement>(".sui_resizable_panel");
    const handle = screen.getByRole("separator").element();

    // 実行
    const wrapperRect = wrapper.getBoundingClientRect();
    const rootRect = root.getBoundingClientRect();
    const leftRect = left!.getBoundingClientRect();
    const handleRect = handle.getBoundingClientRect();
    const rightRect = right!.getBoundingClientRect();

    // 検証
    expect(rootRect.width).toBeCloseTo(wrapperRect.width, 0);
    expect(rootRect.height).toBeCloseTo(wrapperRect.height, 0);
    expect(getComputedStyle(root).flexDirection).toBe("row");
    expect(leftRect.left).toBeCloseTo(rootRect.left, 0);
    expect(leftRect.right).toBeLessThanOrEqual(handleRect.left + 0.5);
    expect(handleRect.right).toBeLessThanOrEqual(rightRect.left + 0.5);
    expect(rightRect.right).toBeCloseTo(rootRect.right, 0);
    expect(leftRect.height).toBeCloseTo(rootRect.height, 0);
    expect(handleRect.height).toBeCloseTo(rootRect.height, 0);
    expect(rightRect.height).toBeCloseTo(rootRect.height, 0);
  });

  test("縦方向ではパネルとハンドルを隙間なく並べる", async ({ expect }) => {
    // 準備
    const screen = await render(
      <div style={{ height: 200, width: 400 }}>
        <ResizableRoot orientation="vertical">
          <ResizablePanel defaultSize={50}>上</ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>下</ResizablePanel>
        </ResizableRoot>
      </div>,
    );
    const root = screen.getByClassName("sui_resizable").element();
    const [top, bottom] = screen.container.querySelectorAll<HTMLElement>(".sui_resizable_panel");
    const handle = screen.getByRole("separator").element();

    // 実行
    const rootRect = root.getBoundingClientRect();
    const topRect = top!.getBoundingClientRect();
    const handleRect = handle.getBoundingClientRect();
    const bottomRect = bottom!.getBoundingClientRect();

    // 検証
    expect(getComputedStyle(root).flexDirection).toBe("column");
    expect(topRect.top).toBeCloseTo(rootRect.top, 0);
    expect(topRect.bottom).toBeLessThanOrEqual(handleRect.top + 0.5);
    expect(handleRect.bottom).toBeLessThanOrEqual(bottomRect.top + 0.5);
    expect(bottomRect.bottom).toBeCloseTo(rootRect.bottom, 0);
    expect(topRect.width).toBeCloseTo(rootRect.width, 0);
    expect(handleRect.width).toBeCloseTo(rootRect.width, 0);
    expect(bottomRect.width).toBeCloseTo(rootRect.width, 0);
  });

  test("非表示のハンドルでもパネルを隙間なく並べる", async ({ expect }) => {
    // 準備
    const screen = await render(
      <div style={{ height: 200, width: 400 }}>
        <ResizableRoot>
          <ResizablePanel defaultSize={50}>左</ResizablePanel>
          <ResizableHandle invisible />
          <ResizablePanel defaultSize={50}>右</ResizablePanel>
        </ResizableRoot>
      </div>,
    );
    const [left, right] = screen.container.querySelectorAll<HTMLElement>(".sui_resizable_panel");

    // 実行
    const leftRect = left!.getBoundingClientRect();
    const rightRect = right!.getBoundingClientRect();

    // 検証
    expect(leftRect.right).toBeCloseTo(rightRect.left, 0);
  });

  test("defaultSize の割合を配置に反映する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <div style={{ height: 200, width: 400 }}>
        <ResizableRoot>
          <ResizablePanel defaultSize={30}>左</ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={70}>右</ResizablePanel>
        </ResizableRoot>
      </div>,
    );

    // 検証
    const root = screen.getByClassName("sui_resizable").element();
    const [left, right] = screen.container.querySelectorAll<HTMLElement>(".sui_resizable_panel");
    const rootWidth = root.getBoundingClientRect().width;
    expect(left!.getBoundingClientRect().width / rootWidth).toBeCloseTo(0.3, 1);
    expect(right!.getBoundingClientRect().width / rootWidth).toBeCloseTo(0.7, 1);
  });

  test("向きの変更を配置とクラスへ反映する", async ({ expect }) => {
    // 準備
    const renderGroup = (orientation: "horizontal" | "vertical") => (
      <div style={{ height: 200, width: 400 }}>
        <ResizableRoot orientation={orientation}>
          <ResizablePanel defaultSize={50}>左</ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>右</ResizablePanel>
        </ResizableRoot>
      </div>
    );
    const screen = await render(renderGroup("horizontal"));

    // 実行
    await screen.rerender(renderGroup("vertical"));

    // 検証
    const root = screen.getByClassName("sui_resizable").element();
    expect(getComputedStyle(root).flexDirection).toBe("column");
    expect(root.classList.contains("sui_resizable-orientation_vertical")).toBe(true);
  });

  test.skipIf(!supportsCustomFunctions())("ハンドルに太さを持たせる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <div style={{ height: 200, width: 400 }}>
        <ResizableRoot>
          <ResizablePanel defaultSize={50}>左</ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>右</ResizablePanel>
        </ResizableRoot>
      </div>,
    );

    // 検証
    const handle = screen.getByRole("separator").element();
    expect(handle.getBoundingClientRect().width).toBeGreaterThan(0);
  });
});
