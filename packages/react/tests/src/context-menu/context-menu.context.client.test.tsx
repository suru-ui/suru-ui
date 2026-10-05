import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import {
  ContextMenuContext,
  useContextMenuContext,
} from "../../../src/context-menu/root/context-menu.root.context.js";
import { ContextMenuRoot } from "../../../src/context-menu/root/context-menu.root.jsx";
import { ContextMenuSubmenuRoot } from "../../../src/context-menu/submenu-root/context-menu.submenu-root.jsx";
import { ContextMissingError } from "../../../src/errors.js";

describe("useContextMenuContext", () => {
  test("提供された値を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useContextMenuContext();
      return (
        <span>
          {[ctx.size, ctx.radius, ctx.variant, ctx.depth, String(ctx.outlined)].join(",")}
        </span>
      );
    }

    // 実行
    const screen = await render(
      <ContextMenuRoot size="lg" radius="sm" variant="liquid" outlined>
        <Probe />
      </ContextMenuRoot>,
    );

    // 検証
    expect(screen.getByText("lg,sm,liquid,1,true").query()?.textContent).toBe(
      "lg,sm,liquid,1,true",
    );
  });

  test("既定値を補完する", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useContextMenuContext();
      return <span>{[ctx.size, ctx.radius, ctx.variant, String(ctx.outlined)].join(",")}</span>;
    }

    // 実行
    const screen = await render(
      <ContextMenuRoot>
        <Probe />
      </ContextMenuRoot>,
    );

    // 検証
    expect(screen.getByText("md,md,naked,false").query()?.textContent).toBe("md,md,naked,false");
  });

  test("サブメニューでは深さを増やす", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useContextMenuContext();
      return <span>{String(ctx.depth)}</span>;
    }

    // 実行
    const screen = await render(
      <ContextMenuRoot>
        <ContextMenuSubmenuRoot>
          <Probe />
        </ContextMenuSubmenuRoot>
      </ContextMenuRoot>,
    );

    // 検証
    expect(screen.getByText("2").query()?.textContent).toBe("2");
  });

  test("提供がないときはエラーを投げる", async ({ expect }) => {
    // 準備
    function Probe() {
      useContextMenuContext();
      return null;
    }

    // 実行と検証
    await expect(render(<Probe />)).rejects.toThrow(ContextMissingError);
  });

  test("任意指定では提供がないときに null を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useContextMenuContext(true);
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
      size: "sm",
      depth: 2,
      items: [],
      outlined: false,
      radius: "sm",
      variant: "naked",
    } as const;
    function Probe() {
      const ctx = useContextMenuContext();
      return <span>{ctx === provided ? "同一" : "別物"}</span>;
    }

    // 実行
    const screen = await render(
      <ContextMenuContext value={provided}>
        <Probe />
      </ContextMenuContext>,
    );

    // 検証
    expect(screen.getByText("同一").query()?.textContent).toBe("同一");
  });
});
