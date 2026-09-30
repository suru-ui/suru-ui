import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { CardContext, useCardContext } from "../../../src/card/card.context.js";
import { CardRoot } from "../../../src/card/card.root.jsx";
import { ContextMissingError } from "../../../src/errors.js";

describe("useCardContext", () => {
  test("提供された値を返す", async ({ expect }) => {
    // 準備
    const provided = { size: "lg", radius: "sm", outlined: true } as const;
    function Probe() {
      const ctx = useCardContext();

      return <span>{`${ctx.size}/${ctx.radius}/${ctx.outlined}`}</span>;
    }

    // 実行
    const screen = await render(
      <CardContext value={provided}>
        <Probe />
      </CardContext>,
    );

    // 検証
    expect(screen.getByText("lg/sm/true").query()?.textContent).toBe("lg/sm/true");
  });

  test("ルートの状態を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useCardContext();

      return <span>{`${ctx.size}/${ctx.radius}/${ctx.outlined}`}</span>;
    }

    // 実行
    const screen = await render(
      <CardRoot size="lg" radius="none" outlined>
        <Probe />
      </CardRoot>,
    );

    // 検証
    expect(screen.getByText("lg/none/true").query()?.textContent).toBe("lg/none/true");
  });

  test("提供がないときはエラーを投げる", async ({ expect }) => {
    // 準備
    function Probe() {
      useCardContext();

      return null;
    }

    // 実行と検証
    await expect(render(<Probe />)).rejects.toThrow(ContextMissingError);
  });

  test("任意指定では提供がないときに null を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useCardContext(true);

      return <span>{ctx === null ? "なし" : "あり"}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("なし").query()?.textContent).toBe("なし");
  });
});
