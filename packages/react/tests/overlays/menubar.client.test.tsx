import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import "@suru-ui/theme/suru.css";
import { Button } from "../../src/buttons/button/index.js";
import { Menu } from "../../src/overlays/menu/index.js";
import * as MenuParts from "../../src/overlays/menu/index.js";
import { Menubar } from "../../src/overlays/menubar/index.js";
import * as MenubarParts from "../../src/overlays/menubar/index.js";
import { clickElement } from "../_click.js";

function menubarMenus() {
  return (
    <>
      <Menu trigger={<Button variant="naked">ファイル</Button>}>
        <MenuParts.Item>新規作成</MenuParts.Item>
        <MenuParts.Item>開く</MenuParts.Item>
      </Menu>
      <Menu trigger={<Button variant="naked">編集</Button>}>
        <MenuParts.Item>コピー</MenuParts.Item>
      </Menu>
    </>
  );
}

describe("Menubar", () => {
  test("メニューをまとめてレンダリングする", async () => {
    // 実行
    const screen = await render(<Menubar>{menubarMenus()}</Menubar>);

    // 検証
    await expect.element(screen.getByRole("menubar")).toBeInTheDocument();
    await expect.element(screen.getByRole("menuitem", { name: "ファイル" })).toBeInTheDocument();
    await expect.element(screen.getByRole("menuitem", { name: "編集" })).toBeInTheDocument();
  });

  test("既定のスタイルクラスを適用する", async () => {
    // 実行
    const screen = await render(<Menubar>{menubarMenus()}</Menubar>);
    const root = screen.getByRole("menubar");

    // 検証
    await expect.element(root).toHaveClass("sui_menubar");
    await expect.element(root).toHaveClass("sui_menubar-orientation_horizontal");
    await expect.element(root).toHaveAttribute("data-orientation", "horizontal");
  });

  test("orientation を指定すると垂直方向のクラスを適用する", async () => {
    // 実行
    const screen = await render(<Menubar orientation="vertical">{menubarMenus()}</Menubar>);
    const root = screen.getByRole("menubar");

    // 検証
    await expect.element(root).toHaveClass("sui_menubar-orientation_vertical");
    await expect.element(root).toHaveAttribute("data-orientation", "vertical");
  });

  test("トリガーをクリックするとメニューを開く", async () => {
    // 実行
    const screen = await render(<Menubar>{menubarMenus()}</Menubar>);
    const trigger = screen.getByRole("menuitem", { name: "ファイル" });
    clickElement(trigger);

    // 検証
    await expect.element(screen.getByRole("menu")).toBeInTheDocument();
    await expect.element(screen.getByRole("menuitem", { name: "新規作成" })).toBeVisible();
  });

  test("開いているときに別のトリガーをホバーするとメニューを切り替える", async () => {
    // 準備
    const screen = await render(<Menubar>{menubarMenus()}</Menubar>);
    const fileTrigger = screen.getByRole("menuitem", { name: "ファイル" });
    const editTrigger = screen.getByRole("menuitem", { name: "編集" });

    // 実行
    await userEvent.click(fileTrigger);
    await expect.element(screen.getByRole("menuitem", { name: "新規作成" })).toBeVisible();

    // 実行
    await userEvent.hover(editTrigger);

    // 検証
    const switchedItem = screen.getByRole("menuitem", { name: "コピー" });
    await expect.element(switchedItem).toBeVisible();
    const switchedPopup = switchedItem.element().closest<HTMLElement>('[role="menu"]');

    if (switchedPopup === null) {
      throw new Error("Switched menu popup was not rendered.");
    }

    expect(switchedPopup.getAttribute("data-instant")).toBe("group");
    expect(getComputedStyle(switchedPopup).transitionDuration).toBe("0s");
    await expect
      .element(screen.getByRole("menuitem", { name: "新規作成" }))
      .not.toBeInTheDocument();
  });

  test("メニューをトリガーの下に配置する", async () => {
    // 実行
    const screen = await render(<Menubar>{menubarMenus()}</Menubar>);
    const trigger = screen.getByRole("menuitem", { name: "ファイル" });
    clickElement(trigger);
    const menu = screen.getByRole("menu");
    await expect.element(menu).toBeInTheDocument();
    await expect.element(menu).not.toHaveAttribute("data-starting-style");

    // 検証
    const triggerRect = trigger.element().getBoundingClientRect();
    const menuRect = menu.element().getBoundingClientRect();

    expect(menuRect.top).toBeGreaterThan(triggerRect.bottom);
    expect(menuRect.left).toBeGreaterThanOrEqual(triggerRect.left);
    expect(menuRect.left).toBeLessThanOrEqual(triggerRect.right);
  });

  test("Backdrop を透明にする", async () => {
    // 実行
    const screen = await render(<Menubar>{menubarMenus()}</Menubar>);
    clickElement(screen.getByRole("menuitem", { name: "ファイル" }));
    await expect.element(screen.getByRole("menu")).toBeInTheDocument();

    // 検証
    const backdrop = document.querySelector<HTMLElement>(".sui_menu_backdrop");

    if (backdrop === null) {
      throw new Error("Menubar backdrop was not rendered.");
    }

    expect(getComputedStyle(backdrop).backgroundColor).toBe("rgba(0, 0, 0, 0)");
  });

  test("disabled を指定するとメニューバー内のトリガーが無効になる", async () => {
    // 実行
    const screen = await render(<Menubar disabled>{menubarMenus()}</Menubar>);
    const trigger = screen.getByRole("menuitem", { name: "ファイル" });

    // 検証
    await expect.element(trigger).toBeDisabled();

    // 実行
    clickElement(trigger);

    // 検証
    await expect.element(screen.getByRole("menu")).not.toBeInTheDocument();
  });
});

describe("MenubarParts.Root", () => {
  test("Root 単体でメニューバーをレンダリングする", async () => {
    // 実行
    const screen = await render(
      <MenubarParts.Root>
        <Menu trigger={<Button variant="naked">操作</Button>}>
          <MenuParts.Item>編集</MenuParts.Item>
        </Menu>
      </MenubarParts.Root>,
    );

    // 検証
    await expect.element(screen.getByRole("menubar")).toHaveClass("sui_menubar");
  });
});
