import * as React from "react";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { Combobox } from "../combobox.jsx";

const fruits = ["りんご", "ばなな"];

describe("ComboboxStatus", () => {
  test("指定した内容を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Combobox items={fruits} status="検索中" defaultOpen />);

    // 検証
    const status = screen.getByText("検索中").query();
    expect(status?.textContent).toContain("検索中");
  });
});
