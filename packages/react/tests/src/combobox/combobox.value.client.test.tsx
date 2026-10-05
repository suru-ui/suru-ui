import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { ComboboxRoot } from "../../../src/combobox/root/combobox.root.jsx";
import { ComboboxValue } from "../../../src/combobox/value/combobox.value.jsx";

const fruits = ["りんご", "ばなな"];

describe("ComboboxValue", () => {
  test("選択値とコンテキストを描画関数へ渡す", async ({ expect }) => {
    // 準備
    let receivedValue: unknown = null;
    let receivedMultiple: unknown = null;

    // 実行
    await render(
      <ComboboxRoot items={fruits} defaultValue="りんご">
        <ComboboxValue>
          {(value, ctx) => {
            receivedValue = value;
            receivedMultiple = ctx.multiple;
            return null;
          }}
        </ComboboxValue>
      </ComboboxRoot>,
    );

    // 検証
    expect(receivedValue).toBe("りんご");
    expect(receivedMultiple).toBe(false);
  });

  test("複数選択では配列を描画関数へ渡す", async ({ expect }) => {
    // 準備
    let receivedValue: unknown = null;
    let receivedMultiple: unknown = null;

    // 実行
    await render(
      <ComboboxRoot items={fruits} multiple defaultValue={["りんご", "ばなな"]}>
        <ComboboxValue>
          {(value, ctx) => {
            receivedValue = value;
            receivedMultiple = ctx.multiple;
            return null;
          }}
        </ComboboxValue>
      </ComboboxRoot>,
    );

    // 検証
    expect(receivedValue).toStrictEqual(["りんご", "ばなな"]);
    expect(receivedMultiple).toBe(true);
  });

  test("固定内容をそのまま表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ComboboxRoot items={fruits} defaultValue="りんご">
        <ComboboxValue>
          <span>固定表示</span>
        </ComboboxValue>
      </ComboboxRoot>,
    );

    // 検証
    expect(screen.getByText("固定表示").query()?.textContent).toBe("固定表示");
  });
});
