import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { Combobox } from "../combobox.jsx";

const fruits = ["りんご", "ばなな"];
describe("ComboboxList", () => {
  test("候補リストを表示する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Combobox items={fruits} defaultOpen />);

    // 検証。
    const list = screen.getByRole("listbox").query();
    expect(list?.textContent).toContain("りんご");
    expect(list?.textContent).toContain("ばなな");
  });
});
