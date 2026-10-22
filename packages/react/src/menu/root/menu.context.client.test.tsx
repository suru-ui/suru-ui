import * as React from "react";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { ContextMissingError } from "../../errors.js";
import { MenuSubmenuRoot } from "../submenu-root/menu.submenu-root.jsx";
import { MenuContext, useMenuContext } from "./menu.root.context.js";
import { MenuRoot } from "./menu.root.jsx";

describe("useMenuContext", () => {
  test("提供された値を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useMenuContext();
      return (
        <span>
          {[ctx.size, ctx.radius, ctx.variant, ctx.depth, String(ctx.outlined)].join(",")}
        </span>
      );
    }

    // 実行
    const screen = await render(
      <MenuRoot size="lg" radius="sm" variant="liquid" outlined>
        <Probe />
      </MenuRoot>,
    );

    // 検証
    expect(screen.getByText("lg,sm,liquid,1,true").query()?.textContent).toBe(
      "lg,sm,liquid,1,true",
    );
  });

  test("既定値を補完する", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useMenuContext();
      return <span>{[ctx.size, ctx.radius, ctx.variant, String(ctx.outlined)].join(",")}</span>;
    }

    // 実行
    const screen = await render(
      <MenuRoot>
        <Probe />
      </MenuRoot>,
    );

    // 検証
    expect(screen.getByText("md,md,naked,true").query()?.textContent).toBe("md,md,naked,true");
  });

  test("サブメニューでは深さを増やす", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useMenuContext();
      return <span>{String(ctx.depth)}</span>;
    }

    // 実行
    const screen = await render(
      <MenuRoot>
        <MenuSubmenuRoot>
          <Probe />
        </MenuSubmenuRoot>
      </MenuRoot>,
    );

    // 検証
    expect(screen.getByText("2").query()?.textContent).toBe("2");
  });

  test("提供がないときはエラーを投げる", async ({ expect }) => {
    // 準備
    function Probe() {
      useMenuContext();
      return null;
    }

    // 実行と検証
    await expect(render(<Probe />)).rejects.toThrow(ContextMissingError);
  });

  test("任意指定では提供がないときに null を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useMenuContext(true);
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
      radius: "sm",
      variant: "naked",
      outlined: false,
    } as const;
    function Probe() {
      const ctx = useMenuContext();
      return <span>{ctx === provided ? "同一" : "別物"}</span>;
    }

    // 実行
    const screen = await render(
      <MenuContext value={provided}>
        <Probe />
      </MenuContext>,
    );

    // 検証
    expect(screen.getByText("同一").query()?.textContent).toBe("同一");
  });
});
