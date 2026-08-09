import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import "@suru-ui/theme/suru.css";
import { ContextMenu } from "../../src/overlays/context-menu/index.js";
import * as ContextMenuParts from "../../src/overlays/context-menu/index.js";

const openContextMenu = (element: HTMLElement): void => {
  element.dispatchEvent(
    new MouseEvent("contextmenu", {
      bubbles: true,
      button: 2,
      clientX: 120,
      clientY: 80,
    }),
  );
};

describe("ContextMenu", () => {
  test("対象を右クリックするとメニューが開く", async () => {
    // 準備
    const screen = await render(
      <ContextMenu trigger="ファイル">
        <ContextMenuParts.Item>開く</ContextMenuParts.Item>
        <ContextMenuParts.Item>保存</ContextMenuParts.Item>
      </ContextMenu>,
    );
    const trigger = screen.getByText("ファイル");

    // 検証
    await expect.element(trigger).toHaveClass("sui_context_menu_trigger");
    await expect.element(screen.getByRole("menu")).not.toBeInTheDocument();

    // 実行
    openContextMenu(trigger.element() as HTMLElement);

    // 検証
    const menu = screen.getByRole("menu");
    await expect.element(menu).toHaveClass("sui_context_menu_popup");
    await expect.element(screen.getByRole("menuitem", { name: "開く" })).toBeVisible();
    await expect.element(screen.getByRole("menuitem", { name: "保存" })).toBeVisible();
  });

  test("項目をクリックするとメニューが閉じる", async () => {
    // 準備
    const screen = await render(
      <ContextMenu defaultOpen trigger="操作">
        <ContextMenuParts.Item>編集</ContextMenuParts.Item>
      </ContextMenu>,
    );
    const menu = screen.getByRole("menu");

    // 実行
    await userEvent.click(screen.getByRole("menuitem", { name: "編集" }));

    // 検証
    await expect.element(menu).not.toBeInTheDocument();
  });

  test("チェック項目の状態を切り替える", async () => {
    // 準備
    const screen = await render(
      <ContextMenu defaultOpen trigger="表示">
        <ContextMenuParts.CheckboxItem defaultChecked>
          <ContextMenuParts.CheckboxItemIndicator>✓</ContextMenuParts.CheckboxItemIndicator>
          サイドバー
        </ContextMenuParts.CheckboxItem>
      </ContextMenu>,
    );
    const item = screen.getByRole("menuitemcheckbox", { name: "サイドバー" });

    // 検証
    await expect.element(item).toHaveAttribute("aria-checked", "true");

    // 実行
    await userEvent.click(item);

    // 検証
    await expect.element(item).toHaveAttribute("aria-checked", "false");
    await expect.element(screen.getByRole("menu")).toBeInTheDocument();
  });

  test("slotProps でポップアップと対象にクラスを追加できる", async () => {
    // 準備
    const screen = await render(
      <ContextMenu
        trigger="操作"
        slotProps={{
          trigger: { className: "custom-trigger" },
          popup: { className: "custom-popup" },
          positioner: { className: "custom-positioner" },
        }}
      >
        <ContextMenuParts.Item>編集</ContextMenuParts.Item>
      </ContextMenu>,
    );

    // 検証
    await expect.element(screen.getByText("操作")).toHaveClass("custom-trigger");

    // 実行
    openContextMenu(screen.getByText("操作").element() as HTMLElement);

    // 検証
    await expect.element(screen.getByRole("menu")).toHaveClass("custom-popup");
    await expect
      .element(screen.getByRole("menu").element().parentElement as HTMLElement)
      .toHaveClass("custom-positioner");
  });

  test("disabled を指定するとメニューが開かない", async () => {
    // 準備
    const screen = await render(
      <ContextMenu disabled trigger="操作">
        <ContextMenuParts.Item>編集</ContextMenuParts.Item>
      </ContextMenu>,
    );
    const trigger = screen.getByText("操作");

    // 実行
    openContextMenu(trigger.element() as HTMLElement);

    // 検証
    await expect.element(screen.getByRole("menu")).not.toBeInTheDocument();
  });
});

describe("ContextMenuParts", () => {
  test("Root と Trigger を組み合わせて開ける", async () => {
    // 準備
    const screen = await render(
      <ContextMenuParts.Root>
        <ContextMenuParts.Trigger>開く</ContextMenuParts.Trigger>
        <ContextMenuParts.Portal>
          <ContextMenuParts.Positioner>
            <ContextMenuParts.Popup>
              <ContextMenuParts.Item>編集</ContextMenuParts.Item>
            </ContextMenuParts.Popup>
          </ContextMenuParts.Positioner>
        </ContextMenuParts.Portal>
      </ContextMenuParts.Root>,
    );

    // 実行
    openContextMenu(screen.getByText("開く").element() as HTMLElement);

    // 検証
    await expect.element(screen.getByRole("menu")).toBeInTheDocument();
    await expect.element(screen.getByRole("menuitem", { name: "編集" })).toBeVisible();
  });
});
