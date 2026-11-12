import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { ContextMissingError } from "../../errors.js";
import { HoverCardContext, useHoverCardContext } from "./hover-card.root.context.js";
import { HoverCardRoot } from "./hover-card.root.jsx";

describe("useHoverCardContext", () => {
  test("提供された値を返す", async ({ expect }) => {
    // 準備。
    const provided = {
      size: "lg",
      radius: "sm",
      outlined: true,
    } as const;

    function Probe() {
      const ctx = useHoverCardContext();

      return <span>{`${ctx.size}/${ctx.radius}/${ctx.outlined}`}</span>;
    }

    // 実行。
    const screen = await render(
      <HoverCardContext value={provided}>
        <Probe />
      </HoverCardContext>,
    );

    // 検証。
    expect(screen.getByText("lg/sm/true").query()?.textContent).toBe("lg/sm/true");
  });

  test("ルートの状態を返す", async ({ expect }) => {
    // 準備。
    function Probe() {
      const ctx = useHoverCardContext();

      return <span>{`${ctx.size}/${ctx.radius}/${ctx.outlined}`}</span>;
    }

    // 実行。
    const screen = await render(
      <HoverCardRoot size="lg" radius="none" outlined>
        <Probe />
      </HoverCardRoot>,
    );

    // 検証。
    expect(screen.getByText("lg/none/true").query()?.textContent).toBe("lg/none/true");
  });

  test("提供がないときはエラーを投げる", async ({ expect }) => {
    // 準備。
    function Probe() {
      useHoverCardContext();

      return null;
    }

    // 実行と検証。
    await expect(render(<Probe />)).rejects.toThrow(ContextMissingError);
  });

  test("任意指定では提供がないときに null を返す", async ({ expect }) => {
    // 準備。
    function Probe() {
      const ctx = useHoverCardContext(true);

      return <span>{ctx === null ? "なし" : "あり"}</span>;
    }

    // 実行。
    const screen = await render(<Probe />);

    // 検証。
    expect(screen.getByText("なし").query()?.textContent).toBe("なし");
  });
});
