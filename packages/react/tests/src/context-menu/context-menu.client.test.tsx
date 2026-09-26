import * as React from "react";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import { useContextMenuContext } from "../../../src/context-menu/context-menu.context.js";
import { ContextMenu } from "../../../src/context-menu/context-menu.jsx";
import { ContextMenuRoot } from "../../../src/context-menu/context-menu.root.jsx";
import { ContextMenuTrigger } from "../../../src/context-menu/context-menu.trigger.jsx";
import "../_locators.js";

const trigger = <div>右クリック領域</div>;

describe("ContextMenu の開閉", () => {
  test("右クリックで開き対象に開状態を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<ContextMenu items={[{ label: "編集" }]} trigger={trigger} />);
    await screen.getByText("右クリック領域").click({ button: "right" });

    // 検証
    await vi.waitFor(() => {
      expect(screen.getByRole("menu").query()).not.toBe(null);
    });
    expect(
      screen
        .getByText("右クリック領域")
        .element()
        .classList.contains("sui_context_menu_trigger-open"),
    ).toBe(true);
  });

  test("Escape で閉じる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<ContextMenu items={[{ label: "編集" }]} trigger={trigger} />);
    await screen.getByText("右クリック領域").click({ button: "right" });
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
    const screen = await render(
      <ContextMenu disabled items={[{ label: "編集" }]} trigger={trigger} />,
    );
    await screen.getByText("右クリック領域").click({ button: "right" });

    // 検証
    await vi.waitFor(() => {
      expect(screen.getByRole("menu").query()).toBe(null);
    });
  });

  test("項目を押すと閉じて処理する", async ({ expect }) => {
    // 準備
    const onClick = vi.fn<() => void>();
    const screen = await render(
      <ContextMenu items={[{ label: "編集", onClick }]} trigger={trigger} />,
    );
    await screen.getByText("右クリック領域").click({ button: "right" });
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
    const screen = await render(<ContextMenu items={[{ label: "編集" }]} trigger={trigger} />);
    await screen.getByText("右クリック領域").click({ button: "right" });
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
          .classList.contains("sui_context_menu_item-highlighted"),
      ).toBe(true);
    });
  });
});

describe("ContextMenu の選択項目", () => {
  test("チェック状態を切り替える", async ({ expect }) => {
    // 準備
    const onCheckedChange = vi.fn<(checked: boolean) => void>();
    const screen = await render(
      <ContextMenu
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
      <ContextMenu
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
      <ContextMenu
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
          .classList.contains("sui_context_menu_item-open"),
      ).toBe(true);
    });
  });
});

describe("ContextMenu の提供", () => {
  test("コンテキストを読み取るフックを公開する", ({ expect }) => {
    // 準備と実行
    const hook = ContextMenu.useContext;

    // 検証
    expect(hook).toBe(useContextMenuContext);
  });

  test("子孫へスタイルを伝播する", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useContextMenuContext();
      return <span>{[ctx.size, ctx.radius, ctx.variant].join(",")}</span>;
    }

    // 実行
    const screen = await render(
      <ContextMenuRoot size="lg" radius="sm" variant="liquid">
        <Probe />
        <ContextMenuTrigger>{trigger}</ContextMenuTrigger>
      </ContextMenuRoot>,
    );

    // 検証
    expect(screen.getByText("lg,sm,liquid").query()).not.toBe(null);
  });
});
