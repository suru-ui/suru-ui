import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { ContextMissingError } from "../../errors.js";
import { ComboboxItemContext, useComboboxItemContext } from "./combobox.item.context.js";

describe("useComboboxItemContext", () => {
  test("提供された値を返す", async ({ expect }) => {
    // 準備。
    function Probe() {
      const ctx = useComboboxItemContext();

      return <span>{ctx.value}</span>;
    }

    // 実行。
    const screen = await render(
      <ComboboxItemContext value={{ value: "りんご" } as ComboboxItemContext}>
        <Probe />
      </ComboboxItemContext>,
    );

    // 検証。
    expect(screen.getByText("りんご").query()?.textContent).toBe("りんご");
  });

  test("提供がないときはエラーを投げる", async ({ expect }) => {
    // 準備。
    function Probe() {
      useComboboxItemContext();

      return null;
    }

    // 実行と検証。
    await expect(render(<Probe />)).rejects.toThrow(ContextMissingError);
  });

  test("任意指定では提供がないときに null を返す", async ({ expect }) => {
    // 準備。
    function Probe() {
      const ctx = useComboboxItemContext(true);

      return <span>{ctx === null ? "なし" : "あり"}</span>;
    }

    // 実行。
    const screen = await render(<Probe />);

    // 検証。
    expect(screen.getByText("なし").query()?.textContent).toBe("なし");
  });
});
