import * as React from "react";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import { MenuContent } from "../../../src/menu/menu.content.jsx";
import { useMenuContext } from "../../../src/menu/menu.context.js";
import { createMenuHandle } from "../../../src/menu/menu.handle.js";
import { MenuItem } from "../../../src/menu/menu.item.jsx";
import { Menu, MenuAPI, useMenuAPI } from "../../../src/menu/menu.jsx";
import { MenuPortal } from "../../../src/menu/menu.portal.jsx";
import { MenuPositioner } from "../../../src/menu/menu.positioner.jsx";
import { MenuRoot } from "../../../src/menu/menu.root.jsx";
import { MenuTrigger } from "../../../src/menu/menu.trigger.jsx";
import "../_locators.js";

const trigger = <button>メニューを開く</button>;

describe("Menu の開閉", () => {
  test("クリックで開き対象に開状態を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Menu items={[{ label: "編集" }]} trigger={trigger} />);
    await screen.getByText("メニューを開く").click();

    // 検証
    await vi.waitFor(() => {
      expect(screen.getByRole("menu").query()).not.toBe(null);
    });
    expect(
      screen.getByText("メニューを開く").element().classList.contains("sui_menu_trigger-open"),
    ).toBe(true);
  });

  test("Escape で閉じる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Menu items={[{ label: "編集" }]} trigger={trigger} />);
    await screen.getByText("メニューを開く").click();
    await vi.waitFor(() => {
      expect(screen.getByRole("menu").query()).not.toBe(null);
    });
    await userEvent.keyboard("{Escape}");

    // 検証
    await vi.waitFor(() => {
      expect(screen.getByRole("menu").query()).toBe(null);
    });
  });

  test("選択できないときは開かない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Menu disabled items={[{ label: "編集" }]} trigger={trigger} />);
    await screen.getByText("メニューを開く").click({ force: true });

    // 検証
    await vi.waitFor(() => {
      expect(screen.getByRole("menu").query()).toBe(null);
    });
  });

  test("項目を押すと閉じて処理する", async ({ expect }) => {
    // 準備
    const onClick = vi.fn<() => void>();
    const screen = await render(<Menu items={[{ label: "編集", onClick }]} trigger={trigger} />);
    await screen.getByText("メニューを開く").click();
    await vi.waitFor(() => {
      expect(screen.getByRole("menuitem", { name: "編集" }).query()).not.toBe(null);
    });

    // 実行
    await screen.getByRole("menuitem", { name: "編集" }).click();

    // 検証
    expect(onClick).toHaveBeenCalledTimes(1);
    await vi.waitFor(() => {
      expect(screen.getByRole("menu").query()).toBe(null);
    });
  });

  test("矢印キーで項目を強調する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Menu items={[{ label: "編集" }]} trigger={trigger} />);
    await screen.getByText("メニューを開く").click();
    await vi.waitFor(() => {
      expect(screen.getByRole("menu").element().contains(document.activeElement)).toBe(true);
    });
    await userEvent.keyboard("{ArrowDown}");

    // 検証
    await vi.waitFor(() => {
      expect(
        screen
          .getByRole("menuitem", { name: "編集" })
          .element()
          .classList.contains("sui_menu_item-highlighted"),
      ).toBe(true);
    });
  });
});

describe("Menu の選択項目", () => {
  test("チェック状態を切り替える", async ({ expect }) => {
    // 準備
    const onCheckedChange = vi.fn<(checked: boolean) => void>();
    const screen = await render(
      <Menu
        defaultOpen
        items={[
          {
            type: "checkbox",
            label: "サイドバー",
            checked: false,
            onCheckedChange,
          },
        ]}
      />,
    );

    // 実行
    await screen.getByRole("menuitemcheckbox", { name: "サイドバー" }).click();

    // 検証
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything());
  });

  test("ラジオ項目を選択する", async ({ expect }) => {
    // 準備
    const onValueChange = vi.fn<(value: unknown) => void>();
    const screen = await render(
      <Menu
        defaultOpen
        items={[
          {
            type: "radio-group",
            defaultValue: "name",
            onValueChange,
            items: [
              { type: "radio", label: "名前", value: "name" },
              { type: "radio", label: "日付", value: "date" },
            ],
          },
        ]}
      />,
    );

    // 実行
    await screen.getByRole("menuitemradio", { name: "日付" }).click();

    // 検証
    expect(onValueChange).toHaveBeenCalledWith("date", expect.anything());
  });

  test("サブメニューを開くと開状態を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Menu
        defaultOpen
        items={[
          { label: "編集" },
          { type: "submenu", label: "共有", delay: 0, items: [{ label: "リンクをコピー" }] },
        ]}
      />,
    );
    await screen.getByRole("menuitem", { name: "共有" }).hover();

    // 検証
    await vi.waitFor(() => {
      expect(
        screen
          .getByRole("menuitem", { name: "共有" })
          .element()
          .classList.contains("sui_menu_item-open"),
      ).toBe(true);
    });
  });
});

describe("Menu の提供", () => {
  test("コンテキストを読み取るフックを公開する", ({ expect }) => {
    // 準備と実行
    const hook = Menu.useContext;

    // 検証
    expect(hook).toBe(useMenuContext);
  });

  test("子孫へスタイルを伝播する", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useMenuContext();
      return <span>{[ctx.size, ctx.radius, ctx.variant].join(",")}</span>;
    }

    // 実行
    const screen = await render(
      <MenuRoot size="lg" radius="sm" variant="liquid">
        <Probe />
        <MenuTrigger>{trigger}</MenuTrigger>
      </MenuRoot>,
    );

    // 検証
    expect(screen.getByText("lg,sm,liquid").query()).not.toBe(null);
  });
});

describe("Menu の API", () => {
  test("フックで API を作成する", async ({ expect }) => {
    // 準備
    function Probe() {
      const api = useMenuAPI({ items: [{ label: "編集" }] });
      return <span>{api instanceof MenuAPI ? "API" : "別物"}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("API").query()?.textContent).toBe("API");
  });

  test("ハンドルでトリガーとルートを関連付ける", async ({ expect }) => {
    // 準備
    const handle = createMenuHandle();

    // 実行
    const screen = await render(
      <MenuRoot handle={handle}>
        <MenuTrigger handle={handle}>{trigger}</MenuTrigger>
        <MenuPortal>
          <MenuPositioner>
            <MenuContent>
              <MenuItem>項目</MenuItem>
            </MenuContent>
          </MenuPositioner>
        </MenuPortal>
      </MenuRoot>,
    );
    await screen.getByText("メニューを開く").click();

    // 検証
    await vi.waitFor(() => {
      expect(screen.getByRole("menuitem", { name: "項目" }).query()).not.toBe(null);
    });
  });
});
