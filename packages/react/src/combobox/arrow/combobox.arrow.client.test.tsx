import * as React from "react";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { Combobox } from "../combobox.jsx";
import "../../../tests/src/_locators.js";

const fruits = ["りんご", "ばなな"];

describe("ComboboxArrow", () => {
  test("指定しないときは表示しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Combobox items={fruits} defaultOpen />);

    // 検証
    expect(screen.getByClassName("sui_combobox_arrow").query()).toBe(null);
  });
});
