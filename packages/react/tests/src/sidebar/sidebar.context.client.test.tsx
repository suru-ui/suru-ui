import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { ContextMissingError } from "../../../src/errors.js";
import { SidebarContext, useSidebarContext } from "../../../src/sidebar/sidebar.context.js";
import { SidebarProvider } from "../../../src/sidebar/sidebar.provider.jsx";
import { SidebarRoot } from "../../../src/sidebar/sidebar.root.jsx";

describe("useSidebarContext", () => {
  test("提供された値を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useSidebarContext();

      return <span>{[String(ctx.open), ctx.state, ctx.collapsible ?? "なし"].join(",")}</span>;
    }

    // 実行
    const screen = await render(
      <SidebarProvider defaultOpen>
        <Probe />
      </SidebarProvider>,
    );

    // 検証
    expect(screen.getByText("true,expanded,なし").query()?.textContent).toBe("true,expanded,なし");
  });

  test("折りたたみの方法をルートから引き継ぐ", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useSidebarContext();

      return <span>{ctx.collapsible ?? "なし"}</span>;
    }

    // 実行
    const screen = await render(
      <SidebarProvider>
        <SidebarRoot collapsible="icon">
          <Probe />
        </SidebarRoot>
      </SidebarProvider>,
    );

    // 検証
    expect(screen.getByText("icon").query()?.textContent).toBe("icon");
  });

  test("toggle と setOpen で状態を更新する", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useSidebarContext();

      return (
        <>
          <button onClick={ctx.toggle}>切り替え</button>
          <button onClick={() => ctx.setOpen(true)}>開く</button>
          <span>{ctx.state}</span>
        </>
      );
    }
    const screen = await render(
      <SidebarProvider defaultOpen>
        <Probe />
      </SidebarProvider>,
    );

    // 実行
    await screen.getByText("切り替え").click();

    // 検証
    await vi.waitFor(() => {
      expect(screen.getByText("collapsed").query()?.textContent).toBe("collapsed");
    });

    // 実行
    await screen.getByText("開く").click();

    // 検証
    await vi.waitFor(() => {
      expect(screen.getByText("expanded").query()?.textContent).toBe("expanded");
    });
  });

  test("提供がないときはエラーを投げる", async ({ expect }) => {
    // 準備
    function Probe() {
      useSidebarContext();

      return null;
    }

    // 実行と検証
    await expect(render(<Probe />)).rejects.toThrow(ContextMissingError);
  });

  test("任意指定では提供がないときに null を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useSidebarContext(true);

      return <span>{ctx === null ? "なし" : "あり"}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("なし").query()?.textContent).toBe("なし");
  });

  test("直接提供した値を返す", async ({ expect }) => {
    // 準備
    const provided = {
      open: true,
      state: "expanded",
      setOpen() {},
      toggle() {},
      collapsible: "icon",
    } as const;

    function Probe() {
      const ctx = useSidebarContext();

      return <span>{ctx === provided ? "同一" : "別物"}</span>;
    }

    // 実行
    const screen = await render(
      <SidebarContext value={provided}>
        <Probe />
      </SidebarContext>,
    );

    // 検証
    expect(screen.getByText("同一").query()?.textContent).toBe("同一");
  });
});
