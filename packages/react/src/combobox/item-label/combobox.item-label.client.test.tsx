import * as React from "react";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { defaultItemToStringLabel } from "../../_item.js";
import { ComboboxItemContext as ComboboxItemContextValue } from "../item/combobox.item.context.js";
import {
  type ComboboxContext,
  ComboboxContext as ComboboxContextValue,
} from "../root/combobox.root.context.js";
import { ComboboxItemLabel } from "./combobox.item-label.jsx";

function Provider(props: {
  children: React.ReactNode;
  value: string;
  itemToStringLabel?: (item: string) => string;
}) {
  const itemToStringLabel = props.itemToStringLabel ?? defaultItemToStringLabel;
  const ctx: ComboboxContext<string> = {
    size: "md",
    color: "grey",
    items: ["りんご", "ばなな"],
    radius: "md",
    variant: "liquid",
    multiple: false,
    outlined: false,
    itemToStringLabel,
  };
  return (
    <ComboboxContextValue value={ctx}>
      <ComboboxItemContextValue
        value={{ value: props.value, itemToStringLabel } as ComboboxItemContextValue}
      >
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
