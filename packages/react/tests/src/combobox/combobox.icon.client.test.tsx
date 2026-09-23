import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { Combobox } from "../../../src/combobox/combobox.jsx";

const fruits = ["りんご", "ばなな"];

describe("ComboboxIcon", () => {
  test("既定のアイコンを表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Combobox items={fruits} />);

    // 検証
    const group = screen.getByRole("group").query();
    expect(group?.innerHTML).toContain("<svg");
  });

  test("指定した内容を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Combobox items={fruits} slotProps={{ icon: { children: <span>開閉</span> } }} />,
    );

    // 検証
    const icon = screen.getByText("開閉").query();
    expect(icon?.textContent).toBe("開閉");
  });
});
