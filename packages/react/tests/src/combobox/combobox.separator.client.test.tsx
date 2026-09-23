import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { Combobox } from "../../../src/combobox/combobox.jsx";
import "../_locators.js";

const grouped = [
  { label: "果物", items: ["りんご", "ばなな"] },
  { label: "野菜", items: ["にんじん"] },
];

describe("ComboboxSeparator", () => {
  test("区切りにクラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Combobox items={grouped} defaultOpen separator />);

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
