import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { Combobox } from "../../../src/combobox/combobox.jsx";

const grouped = [
  { label: "果物", items: ["りんご", "ばなな"] },
  { label: "野菜", items: ["にんじん"] },
];

describe("ComboboxGroupLabel", () => {
  test("グループの見出しを表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Combobox items={grouped} defaultOpen />);

    // 検証
    const labels = [
      screen.getByText("果物").query()?.textContent,
      screen.getByText("野菜").query()?.textContent,
    ];
    expect(labels).toStrictEqual(["果物", "野菜"]);
  });
});
