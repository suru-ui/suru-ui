import * as React from "react";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { Combobox } from "../combobox.jsx";
import "../../../tests/src/_locators.js";

const grouped = [
  { items: ["りんご", "ばなな"], label: "果物" },
  { items: ["にんじん"], label: "野菜" },
];

describe("ComboboxCollection", () => {
  test("グループと項目を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Combobox items={grouped} defaultOpen />);

    // 検証
    const items = screen
      .getByRole("option")
      .elements()
      .map((element) => element.textContent);
    expect(items).toStrictEqual(["りんご", "ばなな", "にんじん"]);
  });

  test("ラベル付き項目を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Combobox
        items={[
          { label: "りんご", value: "apple" },
          { label: "ばなな", value: "banana" },
        ]}
        defaultOpen
      />,
    );

    // 検証
    const items = screen
      .getByRole("option")
      .elements()
      .map((element) => element.textContent);
    expect(items).toStrictEqual(["りんご", "ばなな"]);
  });

  test("項目の描画関数を指定できる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Combobox
        items={["りんご", "ばなな"]}
        defaultOpen
        itemLabelRenderer={(item: string) => `果物:${item}`}
      />,
    );

    // 検証
    const items = screen
      .getByRole("option")
      .elements()
      .map((element) => element.textContent);
    expect(items).toStrictEqual(["果物:りんご", "果物:ばなな"]);
  });

  test("区切りを指定すると表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Combobox items={grouped} separator defaultOpen />);

    // 検証
    expect(screen.getByClassName("sui_combobox_separator").elements().length).toBe(2);
  });

  test("区切りを無効にすると表示しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Combobox items={grouped} separator={false} defaultOpen />);

    // 検証
    expect(screen.getByClassName("sui_combobox_separator").query()).toBe(null);
  });
});
