import * as React from "react";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import { MenubarRoot } from "../../../src/menubar/menubar.root.jsx";
import "../_locators.js";

/** トリガーとメニュー項目を持つメニューバーの項目です。 */
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

describe("MenubarRoot", () => {
  test("メニューバーとして描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<MenubarRoot items={items} />);

    // 検証
    const menubar = screen.getByRole("menubar").element();
    expect(menubar.tagName).toBe("DIV");
    expect(menubar.classList.contains("sui_menubar")).toBe(true);
    expect(menubar.getAttribute("data-scope")).toBe("");
    expect(menubar.getAttribute("aria-orientation")).toBe("horizontal");
  });

  test("項目ごとにトリガーとメニューを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<MenubarRoot items={items} />);

    // 検証
    expect(screen.getByRole("menubar").query()).not.toBe(null);
    expect(screen.getByText("ファイル").query()).not.toBe(null);
    expect(screen.getByText("編集").query()).not.toBe(null);
  });

  test("トリガーからメニューを開く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<MenubarRoot items={items} />);
    await screen.getByText("ファイル").click();

    // 検証
    await vi.waitFor(() => {
      expect(screen.getByRole("menuitem", { name: "新規作成" }).query()).not.toBe(null);
    });
  });

  test("矢印キーでメニューを開く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<MenubarRoot items={items} />);
    screen.getByText("ファイル").element().focus();
    await userEvent.keyboard("{ArrowDown}");

    // 検証
    await vi.waitFor(() => {
      expect(screen.getByRole("menuitem", { name: "新規作成" }).query()).not.toBe(null);
    });
  });

  test("サブメニューが開くとクラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <MenubarRoot
        items={[
          {
            trigger: <button>ファイル</button>,
            items: [{ type: "submenu", label: "共有", items: [{ label: "リンクをコピー" }] }],
          },
        ]}
      />,
    );
    await screen.getByText("ファイル").click();
    await screen.getByRole("menuitem", { name: "共有" }).hover();

    // 検証
    await vi.waitFor(() => {
      expect(
        screen.getByRole("menubar").element().classList.contains("sui_menubar-has_submenu_open"),
      ).toBe(true);
    });
  });

  test("縦向きをクラスと属性に反映する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<MenubarRoot items={items} orientation="vertical" />);

    // 検証
    const menubar = screen.getByRole("menubar").element();
    expect(menubar.classList.contains("sui_menubar-orientation_vertical")).toBe(true);
    expect(menubar.classList.contains("sui_menubar-orientation_horizontal")).toBe(false);
    expect(menubar.getAttribute("aria-orientation")).toBe("vertical");
  });

  test("無効状態をクラスに反映する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<MenubarRoot disabled items={items} />);

    // 検証
    const menubar = screen.getByRole("menubar").element();
    expect(menubar.classList.contains("sui_menubar-disabled")).toBe(true);
  });

  test("関数で各項目を描画する", async ({ expect }) => {
    // 準備
    const received: [unknown, number, number][] = [];

    // 実行
    const screen = await render(
      <MenubarRoot items={["ファイル", "編集"]}>
        {(item, index, allItems) => {
          received.push([item, index, allItems.length]);

          return <span key={index}>{item}</span>;
        }}
      </MenubarRoot>,
    );

    // 検証
    expect(screen.getByText("ファイル").query()).not.toBe(null);
    expect(received).toStrictEqual([
      ["ファイル", 0, 2],
      ["編集", 1, 2],
    ]);
  });

  test("関数以外の内容をそのまま描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <MenubarRoot items={[{ trigger: <button>ファイル</button>, items: [] }]}>
        <span>独自の内容</span>
      </MenubarRoot>,
    );

    // 検証
    expect(screen.getByText("独自の内容").query()).not.toBe(null);
    expect(screen.getByText("ファイル").query()).toBe(null);
  });

  test("既定ではメニューをモーダルにする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<MenubarRoot items={items} />);

    // 検証
    expect(screen.getByRole("menubar").element().classList.contains("sui_menubar-modal")).toBe(
      true,
    );
  });

  test("modal を無効にするとクラスを外す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<MenubarRoot items={items} modal={false} />);

    // 検証
    expect(screen.getByRole("menubar").element().classList.contains("sui_menubar-modal")).toBe(
      false,
    );
  });
});
