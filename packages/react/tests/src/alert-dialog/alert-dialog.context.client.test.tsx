import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import {
  AlertDialogContentContext,
  useAlertDialogContentContext,
} from "../../../src/alert-dialog/alert-dialog.content.context.js";
import { ContextMissingError } from "../../../src/errors.js";

describe("useAlertDialogContentContext", () => {
  test("提供された値を返す", async ({ expect }) => {
    // 準備
    const provided = { radius: "lg" } as const;
    function Probe() {
      const ctx = useAlertDialogContentContext();

      return <span>{ctx.radius}</span>;
    }

    // 実行
    const screen = await render(
      <AlertDialogContentContext value={provided}>
        <Probe />
      </AlertDialogContentContext>,
    );

    // 検証
    expect(screen.getByText("lg").query()?.textContent).toBe("lg");
  });

  test("提供がないときはエラーを投げる", async ({ expect }) => {
    // 準備
    function Probe() {
      useAlertDialogContentContext();

      return null;
    }

    // 実行と検証
    await expect(render(<Probe />)).rejects.toThrow(ContextMissingError);
  });

  test("任意指定では提供がないときに null を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useAlertDialogContentContext(true);

      return <span>{ctx === null ? "なし" : "あり"}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("なし").query()?.textContent).toBe("なし");
  });
});
