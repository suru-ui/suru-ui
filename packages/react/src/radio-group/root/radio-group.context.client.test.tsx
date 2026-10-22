import * as React from "react";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { ContextMissingError } from "../../errors.js";
import { RadioGroupContext, useRadioGroupContext } from "./radio-group.root.context.js";
import { RadioGroupRoot } from "./radio-group.root.jsx";

describe("useRadioGroupContext", () => {
  test("提供された値を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useRadioGroupContext();
      return (
        <span>
          {[ctx.size, ctx.color, ctx.variant, String(ctx.outlined), String(ctx.disabled)].join(",")}
        </span>
      );
    }

    // 実行
    const screen = await render(
      <RadioGroupRoot size="lg" color="blue" variant="naked" disabled outlined>
        <Probe />
      </RadioGroupRoot>,
    );

    // 検証
    expect(screen.getByText("lg,blue,naked,true,true").query()?.textContent).toBe(
      "lg,blue,naked,true,true",
    );
  });

  test("既定値を補完する", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useRadioGroupContext();
      return <span>{[ctx.size, ctx.color, ctx.radius, ctx.variant].join(",")}</span>;
    }

    // 実行
    const screen = await render(
      <RadioGroupRoot>
        <Probe />
      </RadioGroupRoot>,
    );

    // 検証
    expect(screen.getByText("md,grey,full,naked").query()?.textContent).toBe("md,grey,full,naked");
  });

  test("角丸の指定を優先する", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useRadioGroupContext();
      return <span>{ctx.radius}</span>;
    }

    // 実行
    const screen = await render(
      <RadioGroupRoot size="lg" radius="sm">
        <Probe />
      </RadioGroupRoot>,
    );

    // 検証
    expect(screen.getByText("sm").query()?.textContent).toBe("sm");
  });

  test("無効の指定を伝える", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useRadioGroupContext();
      return <span>{ctx.disabled ? "無効" : "有効"}</span>;
    }

    // 実行
    const screen = await render(
      <RadioGroupRoot disabled>
        <Probe />
      </RadioGroupRoot>,
    );

    // 検証
    expect(screen.getByText("無効").query()?.textContent).toBe("無効");
  });

  test("提供がないときはエラーを投げる", async ({ expect }) => {
    // 準備
    function Probe() {
      useRadioGroupContext();
      return null;
    }

    // 実行と検証
    await expect(render(<Probe />)).rejects.toThrow(ContextMissingError);
  });

  test("任意指定では提供がないときに null を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useRadioGroupContext(true);
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
      disabled: false,
      outlined: true,
      orientation: "horizontal",
    } as const;
    function Probe() {
      const ctx = useRadioGroupContext();
      return <span>{ctx === provided ? "同一" : "別物"}</span>;
    }

    // 実行
    const screen = await render(
      <RadioGroupContext value={provided}>
        <Probe />
      </RadioGroupContext>,
    );

    // 検証
    expect(screen.getByText("同一").query()?.textContent).toBe("同一");
  });
});
