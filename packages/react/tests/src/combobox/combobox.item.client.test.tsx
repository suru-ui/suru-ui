import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { Combobox } from "../../../src/combobox/combobox.jsx";

const fruits = ["りんご", "ばなな"];

describe("ComboboxItem", () => {
  test("項目を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Combobox items={fruits} defaultOpen />);

    // 検証
    const items = screen
      .getByRole("option")
      .elements()
      .map((element) => element.textContent);
    expect(items).toStrictEqual(["りんご", "ばなな"]);
  });

  test("選択項目を選択状態にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Combobox items={fruits} defaultOpen defaultValue="りんご" />);

    // 検証
    expect(screen.getByRole("option", { name: "りんご", selected: true }).query()).not.toBe(null);
    expect(screen.getByRole("option", { name: "ばなな", selected: false }).query()).not.toBe(null);
  });
});
