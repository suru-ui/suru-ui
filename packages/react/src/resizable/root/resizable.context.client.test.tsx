import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { ContextMissingError } from "../../errors.js";
import { ResizableContext, useResizableContext } from "./resizable.root.context.js";
import { ResizableRoot } from "./resizable.root.jsx";

describe("useResizableContext", () => {
  test("提供された向きを返す", async ({ expect }) => {
    // 準備。
    function Probe() {
      const ctx = useResizableContext();

      return <span>{ctx.orientation}</span>;
    }

    // 実行。
    const screen = await render(
      <ResizableRoot orientation="vertical">
        <Probe />
      </ResizableRoot>,
    );

    // 検証。
    expect(screen.getByText("vertical").query()?.textContent).toBe("vertical");
  });

  test("既定値は水平にする", async ({ expect }) => {
    // 準備。
    function Probe() {
      const ctx = useResizableContext();

      return <span>{ctx.orientation}</span>;
    }

    // 実行。
    const screen = await render(
      <ResizableRoot>
        <Probe />
      </ResizableRoot>,
    );

    // 検証。
    expect(screen.getByText("horizontal").query()?.textContent).toBe("horizontal");
  });

  test("提供がないときはエラーを投げる", async ({ expect }) => {
    // 準備。
    function Probe() {
      useResizableContext();

      return null;
    }

    // 実行と検証。
    await expect(render(<Probe />)).rejects.toThrow(ContextMissingError);
  });

  test("任意指定では提供がないときに null を返す", async ({ expect }) => {
    // 準備。
    function Probe() {
      const ctx = useResizableContext(true);

      return <span>{ctx === null ? "なし" : "あり"}</span>;
    }

    // 実行。
    const screen = await render(<Probe />);

    // 検証。
    expect(screen.getByText("なし").query()?.textContent).toBe("なし");
  });

  test("向きの変更を再提供する", async ({ expect }) => {
    // 準備。
    function Probe() {
      const ctx = useResizableContext();

      return <span>{ctx.orientation}</span>;
    }

    const screen = await render(
      <ResizableRoot orientation="horizontal">
        <Probe />
      </ResizableRoot>,
    );

    // 実行。
    await screen.rerender(
      <ResizableRoot orientation="vertical">
        <Probe />
      </ResizableRoot>,
    );

    // 検証。
    expect(screen.getByText("vertical").query()?.textContent).toBe("vertical");
  });

  test("直接提供した値を返す", async ({ expect }) => {
    // 準備。
    const provided = { orientation: "vertical" } as const;

    function Probe() {
      const ctx = useResizableContext();

      return <span>{ctx === provided ? "同一" : "別物"}</span>;
    }

    // 実行。
    const screen = await render(
      <ResizableContext value={provided}>
        <Probe />
      </ResizableContext>,
    );

    // 検証。
    expect(screen.getByText("同一").query()?.textContent).toBe("同一");
  });
});
