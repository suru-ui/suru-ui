import * as React from "react";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { Combobox } from "../combobox.jsx";
import "../../../tests/src/_locators.js";

const grouped = [
  { items: ["りんご", "ばなな"], label: "果物" },
  { items: ["にんじん"], label: "野菜" },
];

describe("ComboboxSeparator", () => {
  test("区切りにクラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Combobox items={grouped} separator defaultOpen />);

    // 検証
    const separator = screen.getByClassName("sui_combobox_separator").first().query();
    expect(separator).not.toBe(null);
  });

  test("区切りなしでは表示しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Combobox items={grouped} defaultOpen />);

    // 検証
    expect(screen.getByClassName("sui_combobox_separator").query()).toBe(null);
  });
});
