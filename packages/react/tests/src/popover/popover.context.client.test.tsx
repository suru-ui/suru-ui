import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { ContextMissingError } from "../../../src/errors.js";
import { Popover } from "../../../src/popover/popover.jsx";
import {
  PopoverContext,
  usePopoverContext,
} from "../../../src/popover/root/popover.root.context.js";
import { PopoverRoot } from "../../../src/popover/root/popover.root.jsx";

describe("usePopoverContext", () => {
  test("提供された値を返す", async ({ expect }) => {
    // 準備
    const provided = { size: "lg", radius: "sm", outlined: true } as const;
    function Probe() {
      const ctx = usePopoverContext();

      return <span>{`${ctx.size}/${ctx.radius}/${ctx.outlined}`}</span>;
    }

    // 実行
    const screen = await render(
      <PopoverContext value={provided}>
        <Probe />
      </PopoverContext>,
    );

    // 検証
    expect(screen.getByText("lg/sm/true").query()?.textContent).toBe("lg/sm/true");
  });

  test("ルートの状態を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = usePopoverContext();

      return <span>{`${ctx.size}/${ctx.radius}/${ctx.outlined}`}</span>;
    }

    // 実行
    const screen = await render(
      <PopoverRoot size="lg" radius="none" outlined>
        <Probe />
      </PopoverRoot>,
    );

    // 検証
    expect(screen.getByText("lg/none/true").query()?.textContent).toBe("lg/none/true");
  });

  test("提供がないときはエラーを投げる", async ({ expect }) => {
    // 準備
    function Probe() {
      usePopoverContext();

      return null;
    }

    // 実行と検証
    await expect(render(<Probe />)).rejects.toThrow(ContextMissingError);
  });

  test("任意指定では提供がないときに null を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = usePopoverContext(true);

      return <span>{ctx === null ? "なし" : "あり"}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("なし").query()?.textContent).toBe("なし");
  });

  test("合成コンポーネントからも読み取れる", ({ expect }) => {
    // 検証
    expect(Popover.useContext).toBe(usePopoverContext);
  });
});
