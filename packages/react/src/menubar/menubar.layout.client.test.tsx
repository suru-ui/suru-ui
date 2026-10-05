import "@suru-ui/theme/suru.css";
import * as React from "react";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import supportsCustomFunctions from "./_supports-custom-functions.js";
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

  test.skipIf(!supportsCustomFunctions())("水平方向の間隔を空ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<MenubarRoot items={items} />);

    // 検証
    const style = getComputedStyle(screen.getByRole("menubar").element());
    expect(Number.parseFloat(style.columnGap)).toBeCloseTo(4, 1);
  });

  test.skipIf(!supportsCustomFunctions())("縦方向の間隔を空ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<MenubarRoot items={items} orientation="vertical" />);

    // 検証
    const style = getComputedStyle(screen.getByRole("menubar").element());
    expect(Number.parseFloat(style.rowGap)).toBeCloseTo(4, 1);
  });
});
