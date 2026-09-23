import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { Combobox } from "../../../src/combobox/combobox.jsx";

const fruits = ["りんご", "ばなな"];

describe("ComboboxInput", () => {
  test("テキスト入力欄を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Combobox items={fruits} placeholder="選択" />);

    // 検証
    const input = screen.getByPlaceholder("選択").query();
    expect(input?.tagName).toBe("INPUT");
    expect(input?.getAttribute("placeholder")).toBe("選択");
  });
});
