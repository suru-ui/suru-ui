import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import {
  ButtonCircularProgressContext,
  useButtonCircularProgressContext,
} from "../../../src/button/button.circular-progress.context.js";
import { ButtonContext, useButtonContext } from "../../../src/button/button.context.js";
import { ButtonRoot } from "../../../src/button/button.root.jsx";
import { ContextMissingError } from "../../../src/errors.js";

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
      <ButtonRoot color="blue" pending size="lg">
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
      color: "blue",
      disabled: false,
      item: false,
      muted: false,
      outlined: true,
      pending: false,
      radius: "full",
      size: "lg",
      squared: false,
      variant: "naked",
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
      <ButtonCircularProgressContext value={{ indeterminate: false, percentage: 40 }}>
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
      <ButtonCircularProgressContext value={{ indeterminate: true, percentage: undefined }}>
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
