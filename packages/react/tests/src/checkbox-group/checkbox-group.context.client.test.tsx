import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import {
  CheckboxGroupContext,
  useCheckboxGroupContext,
} from "../../../src/checkbox-group/checkbox-group.context.js";
import { CheckboxGroupRoot } from "../../../src/checkbox-group/checkbox-group.root.jsx";
import { ContextMissingError } from "../../../src/errors.js";

describe("useCheckboxGroupContext", () => {
  test("提供された値を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useCheckboxGroupContext();
      return (
        <span>
          {[ctx.size, ctx.color, ctx.variant, String(ctx.outlined), String(ctx.disabled)].join(",")}
        </span>
      );
    }

    // 実行
    const screen = await render(
      <CheckboxGroupRoot size="lg" color="blue" variant="naked" outlined disabled>
        <Probe />
      </CheckboxGroupRoot>,
    );

    // 検証
    expect(screen.getByText("lg,blue,naked,true,true").query()?.textContent).toBe(
      "lg,blue,naked,true,true",
    );
  });

  test("既定値を補完する", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useCheckboxGroupContext();
      return <span>{[ctx.size, ctx.color, ctx.radius, ctx.variant].join(",")}</span>;
    }

    // 実行
    const screen = await render(
      <CheckboxGroupRoot>
        <Probe />
      </CheckboxGroupRoot>,
    );

    // 検証
    expect(screen.getByText("md,grey,md,liquid").query()?.textContent).toBe("md,grey,md,liquid");
  });

  test("角丸の指定を優先する", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useCheckboxGroupContext();
      return <span>{ctx.radius}</span>;
    }

    // 実行
    const screen = await render(
      <CheckboxGroupRoot size="lg" radius="full">
        <Probe />
      </CheckboxGroupRoot>,
    );

    // 検証
    expect(screen.getByText("full").query()?.textContent).toBe("full");
  });

  test("無効の指定を伝える", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useCheckboxGroupContext();
      return <span>{ctx.disabled ? "無効" : "有効"}</span>;
    }

    // 実行
    const screen = await render(
      <CheckboxGroupRoot disabled>
        <Probe />
      </CheckboxGroupRoot>,
    );

    // 検証
    expect(screen.getByText("無効").query()?.textContent).toBe("無効");
  });

  test("提供がないときはエラーを投げる", async ({ expect }) => {
    // 準備
    function Probe() {
      useCheckboxGroupContext();
      return null;
    }

    // 実行と検証
    await expect(render(<Probe />)).rejects.toThrow(ContextMissingError);
  });

  test("任意指定では提供がないときに null を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useCheckboxGroupContext(true);
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
      color: "red",
      disabled: false,
      outlined: true,
      radius: "sm",
      size: "sm",
      variant: "liquid",
    } as const;
    function Probe() {
      const ctx = useCheckboxGroupContext();
      return <span>{ctx === provided ? "同一" : "別物"}</span>;
    }

    // 実行
    const screen = await render(
      <CheckboxGroupContext value={provided}>
        <Probe />
      </CheckboxGroupContext>,
    );

    // 検証
    expect(screen.getByText("同一").query()?.textContent).toBe("同一");
  });
});
