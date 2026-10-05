import * as React from "react";
import { vi, test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { MenubarRoot } from "./menubar.root.jsx";
import "../../../tests/src/_locators.js";

/** トリガーとメニュー項目を持つメニューバーの項目です。 */
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

describe("MenubarRoot", () => {
  test("メニューバーとして描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<MenubarRoot items={items} />);

    // 検証
    const menubar = screen.getByRole("menubar").element();
    expect(menubar.tagName).toBe("DIV");
    expect(menubar.classList.contains("sui_menubar")).toBe(true);
    expect(menubar.getAttribute("data-scope")).toBe("");
  });

  test("項目ごとにトリガーとメニューを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<MenubarRoot items={items} />);

    // 検証
    expect(screen.getByRole("menubar").query()).not.toBe(null);
    expect(screen.getByText("ファイル").query()).not.toBe(null);
    expect(screen.getByText("編集").query()).not.toBe(null);
  });

  test("サブメニューが開くとクラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <MenubarRoot
        items={[
          {
            items: [
              {
                type: "submenu",
                items: [{ label: "リンクをコピー" }],
                label: "共有",
                defaultOpen: true,
              },
            ],
            trigger: <button>ファイル</button>,
            defaultOpen: true,
          },
        ]}
      />,
    );

    // 検証
    await vi.waitFor(() => {
      expect(
        screen.getByRole("menubar").element().classList.contains("sui_menubar-has_submenu_open"),
      ).toBe(true);
    });
  });

  test("縦向きをクラスに反映する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<MenubarRoot items={items} orientation="vertical" />);

    // 検証
    const menubar = screen.getByRole("menubar").element();
    expect(menubar.classList.contains("sui_menubar-orientation_vertical")).toBe(true);
    expect(menubar.classList.contains("sui_menubar-orientation_horizontal")).toBe(false);
  });

  test("無効状態をクラスに反映する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<MenubarRoot items={items} disabled />);

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
      <MenubarRoot items={[{ items: [], trigger: <button>ファイル</button> }]}>
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
