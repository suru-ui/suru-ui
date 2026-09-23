import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { defaultItemToStringLabel } from "../../../src/_item.js";
import {
  type ComboboxContext,
  ComboboxContext as ComboboxContextValue,
} from "../../../src/combobox/combobox.context.js";
import { ComboboxItemLabel } from "../../../src/combobox/combobox.item-label.jsx";
import { ComboboxItemContext as ComboboxItemContextValue } from "../../../src/combobox/combobox.item.context.js";

function Provider(props: {
  children: React.ReactNode;
  value: string;
  itemToStringLabel?: (item: string) => string;
}) {
  const ctx: ComboboxContext<string> = {
    size: "md",
    color: "grey",
    items: ["りんご", "ばなな"],
    itemToStringLabel: props.itemToStringLabel ?? defaultItemToStringLabel,
    multiple: false,
    outlined: false,
    radius: "md",
    variant: "liquid",
  };
  return (
    <ComboboxContextValue value={ctx}>
      <ComboboxItemContextValue value={{ value: props.value }}>
        {props.children}
      </ComboboxItemContextValue>
    </ComboboxContextValue>
  );
}

describe("ComboboxItemLabel", () => {
  test("項目値を表示ラベルに変換する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Provider value="りんご">
        <ComboboxItemLabel />
      </Provider>,
    );

    // 検証
    expect(screen.getByText("りんご").query()?.textContent).toBe("りんご");
  });

  test("描画関数を指定できる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Provider value="りんご">
        <ComboboxItemLabel>{(item: string) => `果物:${item}`}</ComboboxItemLabel>
      </Provider>,
    );

    // 検証
    expect(screen.getByText("果物:りんご").query()?.textContent).toBe("果物:りんご");
  });

  test("変換関数を指定できる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Provider value="りんご" itemToStringLabel={(item) => `変換:${item}`}>
        <ComboboxItemLabel />
      </Provider>,
    );

    // 検証
    expect(screen.getByText("変換:りんご").query()?.textContent).toBe("変換:りんご");
  });
});
