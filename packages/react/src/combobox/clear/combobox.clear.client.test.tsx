import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { Combobox } from "../combobox.jsx";

const fruits = ["りんご", "ばなな"];
describe("ComboboxClear", () => {
  test("消去ボタンを表示する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Combobox items={fruits} defaultValue="りんご" />);

    // 検証。
    const clear = screen.getByRole("button", { name: "選択値を消去" }).query();
    expect(clear?.tagName).toBe("BUTTON");
    expect(clear?.getAttribute("aria-label")).toBe("選択値を消去");
    expect(clear?.innerHTML).toContain("<svg");
  });

  test("指定した表示ラベルを使う", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Combobox
        items={fruits}
        slotProps={{ clear: { "aria-label": "取り消す" } }}
        defaultValue="りんご"
      />,
    );

    // 検証。
    const clear = screen.getByRole("button", { name: "取り消す" }).query();
    expect(clear?.getAttribute("aria-label")).toBe("取り消す");
  });
});
