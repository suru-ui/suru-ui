import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { Combobox } from "../../../src/combobox/combobox.jsx";

const fruits = ["りんご", "ばなな"];

describe("ComboboxItemIndicator", () => {
  test("選択項目に既定の目印を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Combobox items={fruits} defaultOpen defaultValue="りんご" />);

    // 検証
    const item = screen.getByRole("option", { name: "りんご" }).query();
    expect(item?.innerHTML).toContain("<svg");
  });

  test("指定した内容を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Combobox
        items={fruits}
        defaultOpen
        defaultValue="りんご"
        slotProps={{ itemIndicator: { children: <span>選択中</span> } }}
      />,
    );

    // 検証
    const indicator = screen.getByText("選択中").query();
    expect(indicator?.textContent).toBe("選択中");
  });
});
