import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { ContextMissingError } from "../../../src/errors.js";
import {
  CircularProgressContext,
  ToggleButtonCircularProgressContext,
  useCircularProgressContext,
  useToggleButtonCircularProgressContext,
} from "../../../src/toggle-button/toggle-button.circular-progress.context.js";
import { ToggleButtonCircularProgress } from "../../../src/toggle-button/toggle-button.circular-progress.jsx";
import {
  Context,
  ToggleButtonContext,
  useContext,
  useToggleButtonContext,
} from "../../../src/toggle-button/toggle-button.context.js";

describe("useToggleButtonContext", () => {
  test("提供された値を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useToggleButtonContext();
      return <span>{[String(ctx.pending), ctx.size, ctx.color].join(",")}</span>;
    }

    const provided: ToggleButtonContext = {
      color: "blue",
      disabled: false,
      outlined: true,
      pending: true,
      pressed: false,
      radius: "full",
      size: "lg",
      squared: false,
      variant: "naked",
    };

    // 実行
    const screen = await render(
      <ToggleButtonContext value={provided}>
        <Probe />
      </ToggleButtonContext>,
    );

    // 検証
    expect(screen.getByText("true,lg,blue").query()?.textContent).toBe("true,lg,blue");
  });

  test("提供がないときはプロバイダー名を含むエラーを投げる", async ({ expect }) => {
    // 準備
    function Probe() {
      useToggleButtonContext();
      return null;
    }

    // 実行と検証
    await expect(render(<Probe />)).rejects.toThrow(ContextMissingError);
    await expect(render(<Probe />)).rejects.toThrow(/ToggleButtonRoot/);
  });

  test("任意指定では提供がないときに null を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useToggleButtonContext(true);
      return <span>{ctx === null ? "なし" : "あり"}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("なし").query()?.textContent).toBe("なし");
  });

  test("短名が本体と同じものを指す", ({ expect }) => {
    // 検証
    expect(Context).toBe(ToggleButtonContext);
    expect(useContext).toBe(useToggleButtonContext);
  });
});

describe("useToggleButtonCircularProgressContext", () => {
  test("円形プログレスバーの状態を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useToggleButtonCircularProgressContext();
      return <span>{[String(ctx.indeterminate), ctx.percentage].join(",")}</span>;
    }

    // 実行
    const screen = await render(
      <ToggleButtonCircularProgress percentage={40}>
        <Probe />
      </ToggleButtonCircularProgress>,
    );

    // 検証
    expect(screen.getByText("false,40").query()?.textContent).toBe("false,40");
  });

  test("提供がないときはエラーを投げる", async ({ expect }) => {
    // 準備
    function Probe() {
      useToggleButtonCircularProgressContext();
      return null;
    }

    // 実行と検証
    await expect(render(<Probe />)).rejects.toThrow(ContextMissingError);
  });

  test("短名が本体と同じものを指す", ({ expect }) => {
    // 検証
    expect(CircularProgressContext).toBe(ToggleButtonCircularProgressContext);
    expect(useCircularProgressContext).toBe(useToggleButtonCircularProgressContext);
  });
});
