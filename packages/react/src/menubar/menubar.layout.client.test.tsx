import "@suru-ui/theme/suru.css";
import * as React from "react";
import { vi, test, describe } from "vitest";
import { render } from "vitest-browser-react";

import "./menubar.parts.js";
import "../../tests/src/_locators.js";
import { MenubarRoot } from "./root/menubar.root.jsx";

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

describe("MenubarRoot の配置", () => {
  test("水平方向ではトリガーを横に並べる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<MenubarRoot items={items} />);

    // 検証
    const menubar = screen.getByRole("menubar").element();
    const style = getComputedStyle(menubar);
    expect(style.display).toBe("flex");
    expect(style.flexDirection).toBe("row");
    expect(style.alignItems).toBe("center");
    const first = screen.getByText("ファイル").element().getBoundingClientRect();
    const second = screen.getByText("編集").element().getBoundingClientRect();
    expect(second.left).toBeGreaterThanOrEqual(first.right);
  });

  test("縦方向ではトリガーを縦に並べる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<MenubarRoot items={items} orientation="vertical" />);

    // 検証
    const menubar = screen.getByRole("menubar").element();
    const style = getComputedStyle(menubar);
    expect(style.flexDirection).toBe("column");
    expect(style.alignItems).toBe("stretch");
    const first = screen.getByText("ファイル").element().getBoundingClientRect();
    const second = screen.getByText("編集").element().getBoundingClientRect();
    expect(second.top).toBeGreaterThanOrEqual(first.bottom);
  });

  test("水平方向の間隔を空ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<MenubarRoot items={items} />);

    // 検証
    const style = getComputedStyle(screen.getByRole("menubar").element());
    expect(Number.parseFloat(style.columnGap)).toBeCloseTo(4, 1);
  });

  test("縦方向の間隔を空ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<MenubarRoot items={items} orientation="vertical" />);

    // 検証
    const style = getComputedStyle(screen.getByRole("menubar").element());
    expect(Number.parseFloat(style.rowGap)).toBeCloseTo(4, 1);
  });

  test("メニューのポップアップに Menu のスタイルを適用する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<MenubarRoot items={items} />);
    await screen.getByText("ファイル").click();
    await vi.waitFor(() => {
      expect(screen.getByRole("menu").elements().length).toBe(1);
    });

    // 検証
    const popup = screen.getByRole("menu").element();
    const popupStyle = getComputedStyle(popup);
    expect(Number.parseFloat(popupStyle.paddingBlockStart)).toBeCloseTo(0, 1);
    expect(Number.parseFloat(popupStyle.paddingInlineStart)).toBeCloseTo(0, 1);
    expect(popupStyle.backgroundColor).toBe("rgb(255, 252, 240)");

    const item = screen.getByRole("menuitem", { name: "新規作成" }).element();
    const itemStyle = getComputedStyle(item);
    expect(Number.parseFloat(itemStyle.marginBlockStart)).toBeCloseTo(5, 1);
    expect(Number.parseFloat(itemStyle.marginInlineStart)).toBeCloseTo(5, 1);
  });
});
