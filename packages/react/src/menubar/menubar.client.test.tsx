import * as React from "react";
import { vi, test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { MenuItem } from "../menu/item/menu.item.jsx";
import { Menubar, MenubarAPI } from "./menubar.jsx";
import "../../tests/src/_locators.js";

/** メニューバーの項目です。 */
const items = [
  {
    items: [{ label: "新規作成" }],
    trigger: <button>ファイル</button>,
  },
  {
    items: [{ label: "コピー" }],
    trigger: <button>編集</button>,
  },
];

describe("Menubar", () => {
  test("トリガーを並べて表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Menubar items={items} />);

    // 検証
    expect(screen.getByRole("menubar").query()).not.toBe(null);
    expect(screen.getByText("ファイル").query()).not.toBe(null);
    expect(screen.getByText("編集").query()).not.toBe(null);
  });

  test("slotProps.menu の指定をすべてのメニューへ渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Menubar items={items} slotProps={{ menu: { variant: "liquid", defaultOpen: true } }} />,
    );

    // 検証
    await vi.waitFor(() => {
      expect(
        screen
          .getByRole("menuitem", { name: "新規作成" })
          .element()
          .classList.contains("sui_button-variant_liquid"),
      ).toBe(true);
    });
  });

  test("slotProps.menu の内容でメニューを置き換える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Menubar
        items={items}
        slotProps={{
          menu: { children: <MenuItem>独自項目</MenuItem>, defaultOpen: true },
        }}
      />,
    );

    // 検証
    await vi.waitFor(() => {
      expect(screen.getByRole("menuitem", { name: "独自項目" }).query()).not.toBe(null);
    });
  });

  test("API をインスタンスとして公開する", ({ expect }) => {
    // 準備と実行
    const api = new MenubarAPI({});

    // 検証
    expect(api).toBeInstanceOf(MenubarAPI);
  });
});
