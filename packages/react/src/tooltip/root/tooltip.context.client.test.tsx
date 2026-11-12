import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { ContextMissingError } from "../../errors.js";
import { TooltipContext, useTooltipContext } from "./tooltip.root.context.js";
import { TooltipRoot } from "./tooltip.root.jsx";

describe("useTooltipContext", () => {
  test("提供された値を返す", async ({ expect }) => {
    // 準備。
    const provided = {
      size: "lg",
      radius: "sm",
      outlined: true,
    } as const;

    function Probe() {
      const ctx = useTooltipContext();

      return <span>{`${ctx.size}/${ctx.radius}/${ctx.outlined}`}</span>;
    }

    // 実行。
    const screen = await render(
      <TooltipContext value={provided}>
        <Probe />
      </TooltipContext>,
    );

    // 検証。
    expect(screen.getByText("lg/sm/true").query()?.textContent).toBe("lg/sm/true");
  });

  test("ルートの状態を返す", async ({ expect }) => {
    // 準備。
    function Probe() {
      const ctx = useTooltipContext();

      return <span>{`${ctx.size}/${ctx.radius}/${ctx.outlined}`}</span>;
    }

    // 実行。
    const screen = await render(
      <TooltipRoot size="lg" radius="none" outlined>
        <Probe />
      </TooltipRoot>,
    );

    // 検証。
    expect(screen.getByText("lg/none/true").query()?.textContent).toBe("lg/none/true");
  });

  test("提供がないときはエラーを投げる", async ({ expect }) => {
    // 準備。
    function Probe() {
      useTooltipContext();

      return null;
    }

    // 実行と検証。
    await expect(render(<Probe />)).rejects.toThrow(ContextMissingError);
  });

  test("任意指定では提供がないときに null を返す", async ({ expect }) => {
    // 準備。
    function Probe() {
      const ctx = useTooltipContext(true);

      return <span>{ctx === null ? "なし" : "あり"}</span>;
    }

    // 実行。
    const screen = await render(<Probe />);

    // 検証。
    expect(screen.getByText("なし").query()?.textContent).toBe("なし");
  });
});
