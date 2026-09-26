import * as React from "react";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import { MenuItem } from "../../../src/menu/menu.item.jsx";
import { Menubar, MenubarAPI } from "../../../src/menubar/menubar.jsx";
import "../_locators.js";

/** メニューバーの項目です。 */
const items = [
  {
    trigger: <button>ファイル</button>,
    items: [{ label: "新規作成" }],
  },
  {
    trigger: <button>編集</button>,
    items: [{ label: "コピー" }],
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

  test("クリックでメニューを開く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Menubar items={items} />);
    await screen.getByText("ファイル").click();

    // 検証
    await vi.waitFor(() => {
      expect(screen.getByRole("menuitem", { name: "新規作成" }).query()).not.toBe(null);
    });
  });

  test("無効のときは開かない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Menubar disabled items={items} />);
    await screen.getByText("ファイル").click({ force: true });

    // 検証
    await vi.waitFor(() => {
      expect(screen.getByRole("menu").query()).toBe(null);
    });
  });

  test("矢印キーで次のトリガーへ焦点を移す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Menubar items={items} />);
    screen.getByText("ファイル").element().focus();
    await userEvent.keyboard("{ArrowRight}");

    // 検証
    await vi.waitFor(() => {
      expect(document.activeElement).toBe(screen.getByText("編集").element());
    });
  });

  test("slotProps.menu の指定をすべてのメニューへ渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Menubar items={items} slotProps={{ menu: { variant: "liquid" } }} />,
    );
    await screen.getByText("ファイル").click();

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
      <Menubar items={items} slotProps={{ menu: { children: <MenuItem>独自項目</MenuItem> } }} />,
    );
    await screen.getByText("ファイル").click();

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
