import * as React from "react";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { ContextMenu } from "../../../src/context-menu/context-menu.jsx";
import { useContextMenuContext } from "../../../src/context-menu/root/context-menu.root.context.js";
import { ContextMenuRoot } from "../../../src/context-menu/root/context-menu.root.jsx";
import { ContextMenuTrigger } from "../../../src/context-menu/trigger/context-menu.trigger.jsx";
import "../_locators.js";

const trigger = <div>右クリック領域</div>;

describe("ContextMenu の状態クラス", () => {
  test("開状態をクラスに反映する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ContextMenu defaultOpen items={[{ label: "編集" }]} trigger={trigger} />,
    );

    // 検証
    await vi.waitFor(() => {
      expect(
        screen
          .getByText("右クリック領域")
          .element()
          .classList.contains("sui_context_menu_trigger-open"),
      ).toBe(true);
    });
  });

  test("サブメニューの開状態をクラスに反映する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ContextMenu
        defaultOpen
        items={[
          { label: "編集" },
          {
            type: "submenu",
            label: "共有",
            defaultOpen: true,
            items: [{ label: "リンクをコピー" }],
          },
        ]}
      />,
    );

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
