import "@suru-ui/theme/suru.css";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import "../resizable.parts.js";
import supportsCustomFunctions from "../_supports-custom-functions.js";
import { ResizablePanel } from "../panel/resizable.panel.jsx";
import { ResizableRoot } from "../root/resizable.root.jsx";
import "../../../tests/src/_locators.js";
import { ResizableHandle } from "./resizable.handle.jsx";

describe("ResizableHandle", () => {
  test("水平方向のパネル群では縦向きにする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ResizableRoot orientation="horizontal">
        <ResizablePanel defaultSize={50}>左</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>右</ResizablePanel>
      </ResizableRoot>,
    );

    // 検証
    const handle = screen.getByRole("separator").element();
    expect(handle.classList.contains("sui_resizable_handle")).toBe(true);
    expect(handle.classList.contains("sui_resizable_handle-direction_vertical")).toBe(true);
    expect(handle.getAttribute("aria-orientation")).toBe("vertical");
  });

  test("垂直方向のパネル群では横向きにする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ResizableRoot orientation="vertical">
        <ResizablePanel defaultSize={50}>上</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>下</ResizablePanel>
      </ResizableRoot>,
    );

    // 検証
    const handle = screen.getByRole("separator").element();
    expect(handle.classList.contains("sui_resizable_handle-direction_horizontal")).toBe(true);
    expect(handle.getAttribute("aria-orientation")).toBe("horizontal");
  });

  test("非表示では太さを 0 にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ResizableRoot>
        <ResizablePanel defaultSize={50}>左</ResizablePanel>
        <ResizableHandle invisible />
        <ResizablePanel defaultSize={50}>右</ResizablePanel>
      </ResizableRoot>,
    );

    // 検証
    const handle = screen.getByRole("separator").element();
    expect(handle.classList.contains("sui_resizable_handle-invisible")).toBe(true);
    expect(getComputedStyle(handle).width).toBe("0px");
  });

  test("無効では無効状態のクラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ResizableRoot>
        <ResizablePanel defaultSize={50}>左</ResizablePanel>
        <ResizableHandle disabled />
        <ResizablePanel defaultSize={50}>右</ResizablePanel>
      </ResizableRoot>,
    );

    // 検証
    const handle = screen.getByRole("separator").element();
    expect(handle.classList.contains("sui_resizable_handle-disabled")).toBe(true);
  });

  test.skipIf(!supportsCustomFunctions())("ホバーで配色を変える", async ({ expect }) => {
    // 準備
    const screen = await render(
      <ResizableRoot>
        <ResizablePanel defaultSize={50}>左</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>右</ResizablePanel>
      </ResizableRoot>,
    );
    const handle = screen.getByRole("separator").element();
    const idle = getComputedStyle(handle).backgroundColor;

    // 実行
    await screen.getByRole("separator").hover();

    // 検証
    expect(getComputedStyle(handle).backgroundColor).not.toBe(idle);
  });

  test("フォーカスリングを表示する", async ({ expect }) => {
    // 準備
    const screen = await render(
      <ResizableRoot>
        <ResizablePanel defaultSize={50}>左</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>右</ResizablePanel>
      </ResizableRoot>,
    );
    const handle = screen.getByRole("separator").element();

    // 実行
    handle.focus();

    // 検証
    const style = getComputedStyle(handle);
    expect(style.outlineStyle).toBe("solid");
    expect(style.outlineWidth).toBe("3px");
  });

  test("className と style を状態に応じて解決する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ResizableRoot>
        <ResizablePanel defaultSize={50}>左</ResizablePanel>
        <ResizableHandle
          style={(state) => ({ opacity: state.direction === "vertical" ? "0.5" : "1" })}
          className={(state) => `custom-${state.direction}`}
        />
        <ResizablePanel defaultSize={50}>右</ResizablePanel>
      </ResizableRoot>,
    );

    // 検証
    const handle = screen.getByRole("separator").element();
    expect(handle.classList.contains("custom-vertical")).toBe(true);
    expect(handle.style.opacity).toBe("0.5");
  });

  test("render の関数へ状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ResizableRoot orientation="vertical">
        <ResizablePanel defaultSize={50}>上</ResizablePanel>
        <ResizableHandle
          render={(props, state) => (
            <div
              {...props}
              data-probe={`${state.orientation}/${state.direction}/${String(state.disabled)}/${String(state.invisible)}`}
            />
          )}
          invisible
        />
        <ResizablePanel defaultSize={50}>下</ResizablePanel>
      </ResizableRoot>,
    );

    // 検証
    const handle = screen.getByClassName("sui_resizable_handle").element();
    expect(handle.tagName).toBe("DIV");
    expect(handle.getAttribute("data-probe")).toBe("vertical/horizontal/false/true");
  });
});
