import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { Combobox } from "../combobox.jsx";

describe("ComboboxEmpty", () => {
  test("既定の文言を表示する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Combobox items={[]} defaultOpen />);

    // 検証。
    const empty = screen.getByText(/該当なし/u).query();
    expect(empty?.textContent).toContain("該当なし");
  });

  test("指定した文言を表示する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Combobox empty="見つかりません" items={[]} defaultOpen />);

    // 検証。
    const empty = screen.getByText(/見つかりません/u).query();
    expect(empty?.textContent).toContain("見つかりません");
  });
});
