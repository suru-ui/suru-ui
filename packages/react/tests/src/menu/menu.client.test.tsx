import * as React from "react";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { Menu, MenuAPI, useMenuAPI } from "../../../src/menu/menu.jsx";
import { useMenuContext } from "../../../src/menu/root/menu.root.context.js";
import { MenuRoot } from "../../../src/menu/root/menu.root.jsx";
import { MenuTrigger } from "../../../src/menu/trigger/menu.trigger.jsx";
import "../_locators.js";

const trigger = <button>メニューを開く</button>;

describe("Menu の状態クラス", () => {
  test("開状態をクラスに反映する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Menu defaultOpen items={[{ label: "編集" }]} trigger={trigger} />);

    // 検証
    await vi.waitFor(() => {
      expect(
        screen.getByText("メニューを開く").element().classList.contains("sui_menu_trigger-open"),
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
});
