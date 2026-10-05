import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { MenuContent } from "../../../src/menu/content/menu.content.jsx";
import { MenuItem } from "../../../src/menu/item/menu.item.jsx";
import { Menu } from "../../../src/menu/menu.jsx";
import { MenuPortal } from "../../../src/menu/portal/menu.portal.jsx";
import { MenuPositioner } from "../../../src/menu/positioner/menu.positioner.jsx";
import { MenuRoot } from "../../../src/menu/root/menu.root.jsx";
import { MenuSubmenuRoot } from "../../../src/menu/submenu-root/menu.submenu-root.jsx";
import { MenuSubmenuTrigger } from "../../../src/menu/submenu-trigger/menu.submenu-trigger.jsx";
import "../_locators.js";
import supportsCustomFunctions from "./_supports-custom-functions.js";

const items = [
  { label: "編集" },
  { label: "果物", items: [{ label: "りんご" }] },
  { items: [{ label: "ログアウト" }] },
];

describe("Menu の配置", () => {
  test.skipIf(!supportsCustomFunctions())(
    "ポップアップに余白と角丸を付ける",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(<Menu defaultOpen items={items} />);

      // 検証
      const content = screen.getByRole("menu").element();
      const style = getComputedStyle(content);
      expect(Number.parseFloat(style.paddingBlockStart)).toBeCloseTo(12, 1);
      expect(Number.parseFloat(style.paddingInlineStart)).toBeCloseTo(12, 1);
      expect(Number.parseFloat(style.rowGap)).toBeCloseTo(4, 1);
      expect(style.borderRadius).toBe("12px");
      expect(style.minWidth).toBe("192px");
      expect(style.backgroundColor).toBe("rgb(242, 240, 229)");
    },
  );

  test.skipIf(!supportsCustomFunctions())(
    "大きさに応じて余白と文字を変える",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(<Menu defaultOpen size="lg" items={items} />);

      // 検証
      const style = getComputedStyle(screen.getByRole("menu").element());
      expect(Number.parseFloat(style.paddingBlockStart)).toBeGreaterThan(12);
      expect(Number.parseFloat(style.fontSize)).toBeGreaterThan(14);
    },
  );

  test.skipIf(!supportsCustomFunctions())("枠線を内側に引く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Menu defaultOpen outlined items={items} />);

    // 検証
    const style = getComputedStyle(screen.getByRole("menu").element());
    expect(style.borderTopStyle).toBe("solid");
    expect(Number.parseFloat(style.borderTopWidth)).toBeCloseTo(1, 0);
  });

  test.skipIf(!supportsCustomFunctions())("角丸なしでは直角にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Menu defaultOpen radius="none" items={items} />);

    // 検証
    expect(getComputedStyle(screen.getByRole("menu").element()).borderRadius).toBe("0px");
  });

  test.skipIf(!supportsCustomFunctions())("グループに間隔を空ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Menu defaultOpen items={items} />);

    // 検証
    const group = screen.getByClassName("sui_menu_group").first().element();
    expect(Number.parseFloat(getComputedStyle(group).gap)).toBeCloseTo(4, 1);
  });

  test.skipIf(!supportsCustomFunctions())("グループのラベルを項目に揃える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Menu defaultOpen items={items} />);

    // 検証
    const label = screen.getByText("果物").element();
    const labelStyle = getComputedStyle(label);
    expect(Number.parseFloat(labelStyle.paddingBlockStart)).toBeCloseTo(4, 1);
    expect(Number.parseFloat(labelStyle.paddingInlineStart)).toBeCloseTo(8, 1);
    expect(labelStyle.fontSize).toBe("12px");
  });

  test.skipIf(!supportsCustomFunctions())(
    "項目を全幅に広げて内容を両端へ分ける",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(<Menu defaultOpen items={[{ label: "編集" }]} />);

      // 検証
      const item = screen.getByRole("menuitem", { name: "編集" }).element();
      const content = screen.getByRole("menu").element();
      const style = getComputedStyle(item);
      expect(style.justifyContent).toBe("space-between");
      expect(Number.parseFloat(style.minHeight)).toBeCloseTo(32, 0);
      expect(Number.parseFloat(style.paddingInlineStart)).toBeCloseTo(8, 1);
      expect(item.getBoundingClientRect().width).toBeCloseTo(
        content.getBoundingClientRect().width - 12 * 2,
        0,
      );
    },
  );

  test.skipIf(!supportsCustomFunctions())("区切り線に余白を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Menu defaultOpen items={items} />);

    // 検証
    const separator = screen.getByRole("separator").element();
    const style = getComputedStyle(separator);
    expect(Number.parseFloat(style.height)).toBeCloseTo(1, 1);
    expect(Number.parseFloat(style.marginBlockStart)).toBeCloseTo(12, 1);
  });

  test.skipIf(!supportsCustomFunctions())("サブメニューを親項目の右へ開く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Menu
        defaultOpen
        items={[
          { label: "編集" },
          { type: "submenu", label: "共有", items: [{ label: "リンクをコピー" }] },
        ]}
      />,
    );
    await screen.getByRole("menuitem", { name: "共有" }).hover();

    // 検証
    await vi.waitFor(() => {
      expect(screen.getByRole("menu").elements().length).toBe(2);
    });
    const menus = screen.getByRole("menu").elements();
    const nested = menus.find((element) => element.textContent?.includes("リンクをコピー"));
    expect(nested?.dataset["side"]).toBe("right");
    const parentRect = menus[0]!.getBoundingClientRect();
    const nestedRect = nested!.getBoundingClientRect();
    expect(nestedRect.left).toBeGreaterThan(parentRect.left + parentRect.width / 2);
  });

  test("項目を渡さないサブメニューも右側の配置にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <MenuRoot defaultOpen>
        <MenuPortal>
          <MenuPositioner>
            <MenuContent>
              <MenuSubmenuRoot>
                <MenuSubmenuTrigger>共有</MenuSubmenuTrigger>
                <MenuPortal>
                  <MenuPositioner>
                    <MenuContent>
                      <MenuItem>リンクをコピー</MenuItem>
                    </MenuContent>
                  </MenuPositioner>
                </MenuPortal>
              </MenuSubmenuRoot>
            </MenuContent>
          </MenuPositioner>
        </MenuPortal>
      </MenuRoot>,
    );
    await screen.getByRole("menuitem", { name: "共有" }).hover();
    await vi.waitFor(() => {
      expect(screen.getByRole("menu").elements().length).toBe(2);
    });

    // 検証
    const nested = screen
      .getByRole("menu")
      .elements()
      .find((element) => element.textContent?.includes("リンクをコピー"));
    expect(nested?.dataset["side"]).toBe("right");
  });
});
