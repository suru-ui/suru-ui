import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { ContextMissingError } from "../../errors.js";
import {
  ButtonCircularProgressContext,
  useButtonCircularProgressContext,
} from "../circular-progress/button.circular-progress.context.js";
import { ButtonContext, useButtonContext } from "./button.root.context.js";
import { ButtonRoot } from "./button.root.jsx";

describe("useButtonContext", () => {
  test("提供された値を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useButtonContext();
      return (
        <span>{[String(ctx.pending), String(ctx.disabled), ctx.size, ctx.color].join(",")}</span>
      );
    }

    // 実行
    const screen = await render(
      <ButtonRoot size="lg" color="blue" pending>
        <Probe />
      </ButtonRoot>,
    );

    // 検証
    expect(screen.getByText("true,true,lg,blue").query()?.textContent).toBe("true,true,lg,blue");
  });

  test("提供がないときはエラーを投げる", async ({ expect }) => {
    // 準備
    function Probe() {
      useButtonContext();
      return null;
    }

    // 実行と検証
    await expect(render(<Probe />)).rejects.toThrow(ContextMissingError);
  });

  test("任意指定では提供がないときに null を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useButtonContext(true);
      return <span>{ctx === null ? "なし" : "あり"}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("なし").query()?.textContent).toBe("なし");
  });

  test("直接提供した値を返す", async ({ expect }) => {
    // 準備
    const provided: ButtonContext = {
      item: false,
      size: "lg",
      color: "blue",
      muted: false,
      radius: "full",
      pending: false,
      squared: false,
      variant: "naked",
      disabled: false,
      outlined: true,
    };
    function Probe() {
      const ctx = useButtonContext();
      return <span>{ctx === provided ? "同一" : "別物"}</span>;
    }

    // 実行
    const screen = await render(
      <ButtonContext value={provided}>
        <Probe />
      </ButtonContext>,
    );

    // 検証
    expect(screen.getByText("同一").query()?.textContent).toBe("同一");
  });
});

describe("useButtonCircularProgressContext", () => {
  test("提供された値を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useButtonCircularProgressContext();
      return <span>{[String(ctx.indeterminate), ctx.percentage].join(",")}</span>;
    }

    // 実行
    const screen = await render(
      <ButtonCircularProgressContext value={{ percentage: 40, indeterminate: false }}>
        <Probe />
      </ButtonCircularProgressContext>,
    );

    // 検証
    expect(screen.getByText("false,40").query()?.textContent).toBe("false,40");
  });

  test("進捗率がないときは不定モードを返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useButtonCircularProgressContext();
      return <span>{[String(ctx.indeterminate), String(ctx.percentage)].join(",")}</span>;
    }

    // 実行
    const screen = await render(
      <ButtonCircularProgressContext value={{ percentage: undefined, indeterminate: true }}>
        <Probe />
      </ButtonCircularProgressContext>,
    );

    // 検証
    expect(screen.getByText("true,undefined").query()?.textContent).toBe("true,undefined");
  });

  test("提供がないときはエラーを投げる", async ({ expect }) => {
    // 準備
    function Probe() {
      useButtonCircularProgressContext();
      return null;
    }

    // 実行と検証
    await expect(render(<Probe />)).rejects.toThrow(ContextMissingError);
  });

  test("任意指定では提供がないときに null を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useButtonCircularProgressContext(true);
      return <span>{ctx === null ? "なし" : "あり"}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("なし").query()?.textContent).toBe("なし");
  });
});
