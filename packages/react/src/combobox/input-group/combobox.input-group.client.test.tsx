import * as React from "react";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { ContextMissingError } from "../../errors.js";
import { ComboboxRoot } from "../root/combobox.root.jsx";
import { useComboboxInputGroupContext } from "./combobox.input-group.context.jsx";
import { ComboboxInputGroup } from "./combobox.input-group.jsx";

const fruits = ["りんご", "ばなな"];

describe("ComboboxInputGroup", () => {
  test("指定した値を子孫へ伝える", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useComboboxInputGroupContext();
      return <span>{ctx.size}</span>;
    }

    // 実行
    const screen = await render(
      <ComboboxRoot size="lg" items={fruits}>
        <ComboboxInputGroup size="sm">
          <Probe />
        </ComboboxInputGroup>
      </ComboboxRoot>,
    );

    // 検証
    expect(screen.getByText("sm").query()?.textContent).toBe("sm");
  });

  test("入力グループの状態を子孫へ伝える", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useComboboxInputGroupContext();
      return <span>{`${ctx.size}/${String(ctx.outlined)}/${String(ctx.open)}`}</span>;
    }

    // 実行
    const screen = await render(
      <ComboboxRoot open size="lg" items={fruits}>
        <ComboboxInputGroup size="sm" outlined>
          <Probe />
        </ComboboxInputGroup>
      </ComboboxRoot>,
    );

    // 検証
    expect(screen.getByText("sm/true/true").query()?.textContent).toBe("sm/true/true");
  });

  test("提供がないときはエラーを投げる", async ({ expect }) => {
    // 準備
    function Probe() {
      useComboboxInputGroupContext();
      return null;
    }

    // 実行と検証
    await expect(render(<Probe />)).rejects.toThrow(ContextMissingError);
  });

  test("任意指定では提供がないときに null を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useComboboxInputGroupContext(true);
      return <span>{ctx === null ? "なし" : "あり"}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("なし").query()?.textContent).toBe("なし");
  });
});
