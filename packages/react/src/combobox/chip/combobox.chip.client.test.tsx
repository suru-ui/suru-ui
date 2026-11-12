import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { Combobox } from "../combobox.jsx";
import "../../../tests/src/_locators.js";

const fruits = ["りんご", "ばなな"];
describe("ComboboxChips", () => {
  test("チップ列を表示する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Combobox items={fruits} multiple defaultValue={["りんご"]} />);

    // 検証。
    const chips = screen.getByClassName("sui_combobox_chips").query();
    expect(chips?.textContent).toContain("りんご");
  });
});
describe("ComboboxChipRemove", () => {
  test("項目名入りの表示ラベルを付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Combobox items={fruits} multiple defaultValue={["りんご"]} />);

    // 検証。
    const remove = screen.getByRole("button", { name: "りんごを削除" }).query();
    expect(remove?.getAttribute("aria-label")).toBe("りんごを削除");
    expect(remove?.innerHTML).toContain("<svg");
  });

  test("表示ラベルが空のときは汎用文言を付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Combobox items={fruits} multiple defaultValue={["りんご"]} itemToStringLabel={() => ""} />,
    );

    // 検証。
    const remove = screen.getByRole("button", { name: "選択値を削除" }).query();
    expect(remove?.getAttribute("aria-label")).toBe("選択値を削除");
  });

  test("指定した表示ラベルを使う", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Combobox
        items={fruits}
        multiple
        slotProps={{ chipRemove: { "aria-label": "外す" } }}
        defaultValue={["りんご"]}
      />,
    );

    // 検証。
    const remove = screen.getByRole("button", { name: "外す" }).query();
    expect(remove?.getAttribute("aria-label")).toBe("外す");
  });
});
