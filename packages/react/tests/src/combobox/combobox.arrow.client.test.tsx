import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { Combobox } from "../../../src/combobox/combobox.jsx";
import "../_locators.js";

const fruits = ["りんご", "ばなな"];

describe("ComboboxArrow", () => {
  test("指定しないときは表示しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Combobox items={fruits} defaultOpen />);

    // 検証
    expect(screen.getByClassName("sui_combobox_arrow").query()).toBe(null);
  });
});
