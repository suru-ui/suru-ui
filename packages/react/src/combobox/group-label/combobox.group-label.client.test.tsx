import * as React from "react";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { Combobox } from "../combobox.jsx";

const grouped = [
  { items: ["りんご", "ばなな"], label: "果物" },
  { items: ["にんじん"], label: "野菜" },
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
