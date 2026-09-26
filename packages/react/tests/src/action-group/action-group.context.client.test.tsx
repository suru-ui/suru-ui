import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import {
  ActionGroupContext,
  useActionGroupContext,
} from "../../../src/action-group/action-group.context.js";
import { ActionGroupRoot } from "../../../src/action-group/action-group.root.jsx";
import { ContextMissingError } from "../../../src/errors.js";

describe("useActionGroupContext", () => {
  test("提供された値を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useActionGroupContext();
      return (
        <span>
          {[ctx.size, ctx.color, ctx.variant, ctx.orientation, String(ctx.outlined)].join(",")}
        </span>
      );
    }

    // 実行
    const screen = await render(
      <ActionGroupRoot size="lg" color="blue" variant="naked" orientation="vertical" outlined>
        <Probe />
      </ActionGroupRoot>,
    );

    // 検証
    expect(screen.getByText("lg,blue,naked,vertical,true").query()?.textContent).toBe(
      "lg,blue,naked,vertical,true",
    );
  });

  test("既定値を補完する", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useActionGroupContext();
      return (
        <span>{[ctx.size, ctx.color, ctx.radius, ctx.variant, ctx.orientation].join(",")}</span>
      );
    }

    // 実行
    const screen = await render(
      <ActionGroupRoot>
        <Probe />
      </ActionGroupRoot>,
    );

    // 検証
    expect(screen.getByText("md,grey,md,solid,horizontal").query()?.textContent).toBe(
      "md,grey,md,solid,horizontal",
    );
  });

  test("角丸の指定を優先する", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useActionGroupContext();
      return <span>{ctx.radius}</span>;
    }

    // 実行
    const screen = await render(
      <ActionGroupRoot size="lg" radius="full">
        <Probe />
      </ActionGroupRoot>,
    );

    // 検証
    expect(screen.getByText("full").query()?.textContent).toBe("full");
  });

  test("提供がないときはエラーを投げる", async ({ expect }) => {
    // 準備
    function Probe() {
      useActionGroupContext();
      return null;
    }

    // 実行と検証
    await expect(render(<Probe />)).rejects.toThrow(ContextMissingError);
  });

  test("任意指定では提供がないときに null を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useActionGroupContext(true);
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
      color: "red",
      radius: "sm",
      variant: "liquid",
      outlined: false,
      orientation: "horizontal",
    } as const;
    function Probe() {
      const ctx = useActionGroupContext();
      return <span>{ctx === provided ? "同一" : "別物"}</span>;
    }

    // 実行
    const screen = await render(
      <ActionGroupContext value={provided}>
        <Probe />
      </ActionGroupContext>,
    );

    // 検証
    expect(screen.getByText("同一").query()?.textContent).toBe("同一");
  });
});
