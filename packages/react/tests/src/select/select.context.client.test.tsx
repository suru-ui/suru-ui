import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { ContextMissingError } from "../../../src/errors.js";
import { SelectContext, useSelectContext } from "../../../src/select/select.context.js";
import { SelectRoot } from "../../../src/select/select.root.jsx";

const fruits = ["りんご", "ばなな"];

describe("useSelectContext", () => {
  test("提供された値を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useSelectContext();
      return (
        <span>
          {[
            ctx.size,
            ctx.radius,
            ctx.variant,
            String(ctx.outlined),
            JSON.stringify(ctx.items),
          ].join(",")}
        </span>
      );
    }

    // 実行
    const screen = await render(
      <SelectRoot items={fruits} size="lg" variant="naked" outlined>
        <Probe />
      </SelectRoot>,
    );

    // 検証
    expect(screen.getByText('lg,lg,naked,true,["りんご","ばなな"]').query()?.textContent).toBe(
      'lg,lg,naked,true,["りんご","ばなな"]',
    );
  });

  test("既定値を補完する", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useSelectContext();
      return <span>{[ctx.size, ctx.radius, ctx.variant, String(ctx.outlined)].join(",")}</span>;
    }

    // 実行
    const screen = await render(
      <SelectRoot items={fruits} size="lg">
        <Probe />
      </SelectRoot>,
    );

    // 検証
    expect(screen.getByText("lg,lg,liquid,false").query()?.textContent).toBe("lg,lg,liquid,false");
  });

  test("角丸の指定を優先する", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useSelectContext();
      return <span>{ctx.radius}</span>;
    }

    // 実行
    const screen = await render(
      <SelectRoot items={fruits} size="lg" radius="full">
        <Probe />
      </SelectRoot>,
    );

    // 検証
    expect(screen.getByText("full").query()?.textContent).toBe("full");
  });

  test("提供がないときはエラーを投げる", async ({ expect }) => {
    // 準備
    function Probe() {
      useSelectContext();
      return null;
    }

    // 実行と検証
    await expect(render(<Probe />)).rejects.toThrow(ContextMissingError);
  });

  test("任意指定では提供がないときに null を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useSelectContext(true);
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
      items: fruits,
      outlined: false,
      radius: "sm",
      size: "sm",
      variant: "liquid",
    } as const;
    function Probe() {
      const ctx = useSelectContext();
      return <span>{ctx === provided ? "同一" : "別物"}</span>;
    }

    // 実行
    const screen = await render(
      <SelectContext value={provided}>
        <Probe />
      </SelectContext>,
    );

    // 検証
    expect(screen.getByText("同一").query()?.textContent).toBe("同一");
  });
});
