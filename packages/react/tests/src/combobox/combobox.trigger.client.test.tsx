import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { ComboboxRoot } from "../../../src/combobox/combobox.root.jsx";
import { ComboboxTrigger } from "../../../src/combobox/combobox.trigger.jsx";

const fruits = ["りんご", "ばなな"];

describe("ComboboxTrigger", () => {
  test("描画関数で内容を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ComboboxRoot items={fruits}>
        <ComboboxTrigger>{(props) => <span {...props} />}</ComboboxTrigger>
      </ComboboxRoot>,
    );

    // 検証
    const trigger = screen.getByRole("combobox", { name: "候補リストを開閉" }).query();
    expect(trigger?.getAttribute("aria-label")).toBe("候補リストを開閉");
  });

  test("指定した表示ラベルを使う", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ComboboxRoot items={fruits}>
        <ComboboxTrigger aria-label="果物を選ぶ">
          {(props) => <span {...props}>開く</span>}
        </ComboboxTrigger>
      </ComboboxRoot>,
    );

    // 検証
    const trigger = screen.getByRole("combobox", { name: "果物を選ぶ" }).query();
    expect(trigger?.textContent).toBe("開く");
    expect(trigger?.getAttribute("aria-label")).toBe("果物を選ぶ");
  });
});
