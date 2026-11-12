import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { ContextMissingError } from "../../errors.js";
import { CollapsibleContext, useCollapsibleContext } from "./collapsible.root.context.js";
import { CollapsibleRoot } from "./collapsible.root.jsx";

describe("useCollapsibleContext", () => {
  test("提供された値を返す", async ({ expect }) => {
    // 準備。
    const provided: CollapsibleContext = {
      open: true,
      size: "lg",
      disabled: false,
      transitionStatus: undefined,
    };

    function Probe() {
      const ctx = useCollapsibleContext();

      return <span>{`${ctx.size}/${String(ctx.open)}`}</span>;
    }

    // 実行。
    const screen = await render(
      <CollapsibleContext value={provided}>
        <Probe />
      </CollapsibleContext>,
    );

    // 検証。
    expect(screen.getByText("lg/true").query()?.textContent).toBe("lg/true");
  });

  test("ルートの状態を返す", async ({ expect }) => {
    // 準備。
    function Probe() {
      const ctx = useCollapsibleContext();

      return <span>{`${ctx.size}/${String(ctx.open)}`}</span>;
    }

    // 実行。
    const screen = await render(
      <CollapsibleRoot size="lg" defaultOpen>
        <Probe />
      </CollapsibleRoot>,
    );

    // 検証。
    expect(screen.getByText("lg/true").query()?.textContent).toBe("lg/true");
  });

  test("提供がないときはエラーを投げる", async ({ expect }) => {
    // 準備。
    function Probe() {
      useCollapsibleContext();

      return null;
    }

    // 実行と検証。
    await expect(render(<Probe />)).rejects.toThrow(ContextMissingError);
  });

  test("任意指定では提供がないときに null を返す", async ({ expect }) => {
    // 準備。
    function Probe() {
      const ctx = useCollapsibleContext(true);

      return <span>{ctx === null ? "なし" : "あり"}</span>;
    }

    // 実行。
    const screen = await render(<Probe />);

    // 検証。
    expect(screen.getByText("なし").query()?.textContent).toBe("なし");
  });
});
