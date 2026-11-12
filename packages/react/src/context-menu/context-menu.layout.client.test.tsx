import "@suru-ui/theme/suru.css";
import { vi, test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import "../../tests/src/_locators.js";
import { ContextMenu } from "./context-menu.jsx";

const items = [
  { label: "編集" },
  { label: "複製" },
  {
    items: [{ label: "りんご" }],
    label: "果物",
  },
  { items: [{ label: "ログアウト" }] },
];
describe("ContextMenu の配置", () => {
  test("ポップアップに角丸と項目の余白を付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<ContextMenu items={items} defaultOpen />);

    // 検証。
    const content = screen.getByRole("menu").element();
    const style = getComputedStyle(content);
    expect(Number.parseFloat(style.paddingBlockStart)).toBeCloseTo(0, 1);
    expect(Number.parseFloat(style.paddingInlineStart)).toBeCloseTo(0, 1);
    expect(style.borderRadius).toBe("12px");
    expect(style.minWidth).toBe("192px");
    expect(style.backgroundColor).toBe("rgb(255, 252, 240)");

    // 項目の当たり判定は、ポップアップの縁から少しだけ内側に置きます。
    const firstItem = screen.getByRole("menuitem", { name: "編集" }).element();
    const secondItem = screen.getByRole("menuitem", { name: "複製" }).element();
    const firstItemStyle = getComputedStyle(firstItem);
    expect(Number.parseFloat(firstItemStyle.marginBlockStart)).toBeCloseTo(5, 1);
    expect(Number.parseFloat(firstItemStyle.marginInlineStart)).toBeCloseTo(5, 1);

    // 隣り合う項目は、Combobox と同じく隙間を空けずに並べます。
    expect(
      secondItem.getBoundingClientRect().top - firstItem.getBoundingClientRect().bottom,
    ).toBeCloseTo(0, 1);
  });

  test("大きさに応じて項目の余白と文字を変える", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<ContextMenu size="lg" items={items} defaultOpen />);

    // 検証。
    const style = getComputedStyle(screen.getByRole("menu").element());
    expect(Number.parseFloat(style.fontSize)).toBeGreaterThan(14);

    const item = screen.getByRole("menuitem", { name: "編集" }).element();
    const itemStyle = getComputedStyle(item);
    expect(Number.parseFloat(itemStyle.marginBlockStart)).toBeCloseTo(7, 1);
    expect(Number.parseFloat(itemStyle.marginInlineStart)).toBeCloseTo(7, 1);
  });

  test("枠線を内側に引く", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<ContextMenu items={items} outlined defaultOpen />);

    // 検証。
    const style = getComputedStyle(screen.getByRole("menu").element(), "::after");
    expect(style.borderTopStyle).toBe("solid");
    expect(Number.parseFloat(style.borderTopWidth)).toBeCloseTo(1, 0);
  });

  test("角丸なしでは直角にする", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<ContextMenu items={items} radius="none" defaultOpen />);

    // 検証。
    expect(getComputedStyle(screen.getByRole("menu").element()).borderRadius).toBe("0px");
  });

  test("グループの項目を隙間なく並べる", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<ContextMenu items={items} defaultOpen />);

    // 検証。
    const group = screen.getByClassName("sui_context_menu_group").first().element();
    expect(Number.parseFloat(getComputedStyle(group).gap)).toBeCloseTo(0, 1);
  });

  test("グループのラベルを項目に揃える", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<ContextMenu items={items} defaultOpen />);

    // 検証。
    const label = screen.getByText("果物").element();
    const labelStyle = getComputedStyle(label);
    expect(Number.parseFloat(labelStyle.paddingBlockStart)).toBeCloseTo(4, 1);
    // 項目の余白 (5px) と項目内の文字の余白 (5px) を合わせた位置に揃えます。
    expect(Number.parseFloat(labelStyle.paddingInlineStart)).toBeCloseTo(10, 1);
    expect(labelStyle.fontSize).toBe("12px");
  });

  test("項目を全幅に広げて内容を両端へ分ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<ContextMenu items={[{ label: "編集" }]} defaultOpen />);

    // 検証。
    const item = screen.getByRole("menuitem", { name: "編集" }).element();
    const content = screen.getByRole("menu").element();
    const style = getComputedStyle(item);
    expect(style.justifyContent).toBe("space-between");
    expect(Number.parseFloat(style.minHeight)).toBeCloseTo(32, 0);
    // 項目ボタンは一覧向けに狭い余白 (`--sui-space(2.5 / 2)` = 5px) を持ちます。
    expect(Number.parseFloat(style.paddingInlineStart)).toBeCloseTo(5, 1);
    expect(item.getBoundingClientRect().width).toBeCloseTo(
      content.getBoundingClientRect().width - 5 * 2,
      0,
    );
  });

  test("区切り線に余白を付けない", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<ContextMenu items={items} defaultOpen />);

    // 検証。
    const separator = screen.getByRole("separator").element();
    const style = getComputedStyle(separator);
    expect(Number.parseFloat(style.height)).toBeCloseTo(1, 1);
    expect(Number.parseFloat(style.marginBlockStart)).toBeCloseTo(0, 1);
  });

  test("サブメニューを親項目の右へ開く", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <ContextMenu
        items={[
          { label: "編集" },
          {
            type: "submenu",
            items: [{ label: "リンクをコピー" }],
            label: "共有",
            defaultOpen: true,
          },
        ]}
        defaultOpen
      />,
    );

    // 検証。
    await vi.waitFor(() => {
      expect(screen.getByRole("menu").elements().length).toBe(2);
    });

    const menus = screen.getByRole("menu").elements();
    const nested = menus.find(
      (element) => element.textContent?.includes("リンクをコピー") ?? false,
    );
    expect(nested?.dataset["side"]).toBe("right");

    const parentRect = menus[0]!.getBoundingClientRect();
    const nestedRect = nested!.getBoundingClientRect();
    expect(nestedRect.left).toBeGreaterThan(parentRect.left + parentRect.width / 2);

    // サブメニュー展開時はフォーカスガードが末尾に追加されるため、親メニューの末尾項目にも下余白が残ることを確認します。
    const trigger = screen.getByRole("menuitem", { name: "共有" }).element();
    expect(getComputedStyle(trigger).marginBlockEnd).toBe("5px");
    expect(parentRect.bottom - trigger.getBoundingClientRect().bottom).toBeCloseTo(5, 1);
  });
});
