import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { defaultItemToStringLabel } from "../../../src/_item.js";
import { ComboboxInputDisplay } from "../../../src/combobox/input-display/combobox.input-display.jsx";
import {
  type ComboboxContext,
  ComboboxContext as ComboboxContextValue,
} from "../../../src/combobox/root/combobox.root.context.js";

const fruits = ["りんご", "ばなな"];

function Provider(props: {
  children: React.ReactNode;
  itemToStringLabel?: (item: string) => string;
}) {
  const ctx: ComboboxContext<string> = {
    size: "md",
    color: "grey",
    items: fruits,
    itemToStringLabel: props.itemToStringLabel ?? defaultItemToStringLabel,
    multiple: false,
    outlined: false,
    radius: "md",
    variant: "liquid",
  };
  return <ComboboxContextValue value={ctx}>{props.children}</ComboboxContextValue>;
}

describe("ComboboxInputDisplay", () => {
  test("値を表示ラベルに変換する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Provider>
        <ComboboxInputDisplay value="りんご" placeholder="選択" />
      </Provider>,
    );

    // 検証
    const display = screen.getByText("りんご").query();
    expect(display?.textContent).toBe("りんご");
  });

  test("値が空のときは代替文字列を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Provider>
        <ComboboxInputDisplay placeholder="選択" />
      </Provider>,
    );

    // 検証
    const display = screen.getByText("選択").query();
    expect(display?.textContent).toBe("選択");
  });

  test("変換関数を指定できる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Provider itemToStringLabel={(item) => `果物:${item}`}>
        <ComboboxInputDisplay value="りんご" />
      </Provider>,
    );

    // 検証
    expect(screen.getByText("果物:りんご").query()?.textContent).toBe("果物:りんご");
  });
});
