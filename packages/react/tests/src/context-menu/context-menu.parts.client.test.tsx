import * as React from "react";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { ContextMenuArrow } from "../../../src/context-menu/context-menu.arrow.jsx";
import { ContextMenuBackdrop } from "../../../src/context-menu/context-menu.backdrop.jsx";
import { ContextMenuCheckboxItemIndicator } from "../../../src/context-menu/context-menu.checkbox-item-indicator.jsx";
import { ContextMenuCheckboxItem } from "../../../src/context-menu/context-menu.checkbox-item.jsx";
import { ContextMenuContent } from "../../../src/context-menu/context-menu.content.jsx";
import { ContextMenuGroupLabel } from "../../../src/context-menu/context-menu.group-label.jsx";
import { ContextMenuGroup } from "../../../src/context-menu/context-menu.group.jsx";
import { ContextMenuItem } from "../../../src/context-menu/context-menu.item.jsx";
import { ContextMenu } from "../../../src/context-menu/context-menu.jsx";
import { ContextMenuLinkItem } from "../../../src/context-menu/context-menu.link-item.jsx";
import { ContextMenuPortal } from "../../../src/context-menu/context-menu.portal.jsx";
import { ContextMenuPositioner } from "../../../src/context-menu/context-menu.positioner.jsx";
import { ContextMenuRadioGroup } from "../../../src/context-menu/context-menu.radio-group.jsx";
import { ContextMenuRadioItemIndicator } from "../../../src/context-menu/context-menu.radio-item-indicator.jsx";
import { ContextMenuRadioItem } from "../../../src/context-menu/context-menu.radio-item.jsx";
import { ContextMenuRoot } from "../../../src/context-menu/context-menu.root.jsx";
import { ContextMenuSeparator } from "../../../src/context-menu/context-menu.separator.jsx";
import { ContextMenuSubmenuRoot } from "../../../src/context-menu/context-menu.submenu-root.jsx";
import { ContextMenuSubmenuTrigger } from "../../../src/context-menu/context-menu.submenu-trigger.jsx";
import { ContextMenuTrigger } from "../../../src/context-menu/context-menu.trigger.jsx";
import "../../../src/context-menu/context-menu.parts.js";
import "../_locators.js";

/**
 * 開いた状態のコンテキストメニューを組み立てます。
 * ポップアップ系のパーツは Base UI のルートコンテキストを必要とするため、単体では描画できません。
 */
function renderMenu(children: React.ReactNode) {
  return render(
    <ContextMenuRoot defaultOpen>
      <ContextMenuPortal>
        <ContextMenuBackdrop />
        <ContextMenuPositioner>
          <ContextMenuContent>{children}</ContextMenuContent>
        </ContextMenuPositioner>
      </ContextMenuPortal>
    </ContextMenuRoot>,
  );
}

describe("ContextMenuPortal", () => {
  test("ポップアップを別の場所へ配置する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderMenu(<ContextMenuItem>項目</ContextMenuItem>);

    // 検証
    const portal = screen.getByClassName("sui_context_menu_portal").element();
    expect(portal.tagName).toBe("DIV");
    expect(portal.getAttribute("data-scope")).toBe("");
  });

  test("大きさと角丸と枠線を引き継ぐ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ContextMenuRoot defaultOpen size="lg" radius="sm" outlined>
        <ContextMenuPortal>
          <ContextMenuPositioner>
            <ContextMenuContent>
              <ContextMenuItem>項目</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenuPositioner>
        </ContextMenuPortal>
      </ContextMenuRoot>,
    );

    // 検証
    const portal = screen.getByClassName("sui_context_menu_portal").element();
    expect(portal.classList.contains("sui_context_menu_portal-size_lg")).toBe(true);
    expect(portal.classList.contains("sui_context_menu_portal-radius_sm")).toBe(true);
    expect(portal.classList.contains("sui_context_menu_portal-outlined")).toBe(true);
  });
});

describe("ContextMenuBackdrop", () => {
  test("オーバーレイを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderMenu(<ContextMenuItem>項目</ContextMenuItem>);

    // 検証
    const backdrop = screen.getByClassName("sui_context_menu_backdrop").element();
    expect(backdrop.tagName).toBe("DIV");
  });
});

describe("ContextMenuPositioner", () => {
  test("ポップアップの位置を決める", async ({ expect }) => {
    // 準備と実行
    const screen = await renderMenu(<ContextMenuItem>項目</ContextMenuItem>);

    // 検証
    const positioner = screen.getByClassName("sui_context_menu_positioner").element();
    expect(positioner.tagName).toBe("DIV");
    expect(positioner.style.position).toBe("fixed");
  });

  test("既定では下端の先頭へ寄せる", async ({ expect }) => {
    // 準備と実行
    const screen = await renderMenu(<ContextMenuItem>項目</ContextMenuItem>);
    await vi.waitFor(() => {
      expect(screen.getByClassName("sui_context_menu_positioner").element().dataset["side"]).toBe(
        "bottom",
      );
    });

    // 検証
    const content = screen.getByRole("menu").element();
    expect(content.dataset["align"]).toBe("start");
    expect(content.dataset["side"]).toBe("bottom");
  });
});

describe("ContextMenuContent", () => {
  test("内容を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderMenu(<ContextMenuItem>編集</ContextMenuItem>);

    // 検証
    const content = screen.getByRole("menu").element();
    expect(content.classList.contains("sui_context_menu_content")).toBe(true);
    expect(content.textContent).toBe("編集");
  });
});

describe("ContextMenuItem", () => {
  test("項目として描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderMenu(<ContextMenuItem>編集</ContextMenuItem>);

    // 検証
    const item = screen.getByRole("menuitem", { name: "編集" }).element();
    expect(item.classList.contains("sui_context_menu_item")).toBe(true);
    expect(item.classList.contains("sui_button-item")).toBe(true);
  });

  test("無効状態をクラスに反映する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderMenu(<ContextMenuItem disabled>編集</ContextMenuItem>);

    // 検証
    const item = screen.getByRole("menuitem", { name: "編集" }).element();
    expect(item.classList.contains("sui_context_menu_item-disabled")).toBe(true);
    expect(item.getAttribute("aria-disabled")).toBe("true");
  });

  test("配色と大きさと角丸を反映する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderMenu(
      <ContextMenuItem color="red" radius="sm">
        削除
      </ContextMenuItem>,
    );

    // 検証
    const item = screen.getByRole("menuitem", { name: "削除" }).element();
    expect(item.classList.contains("sui_button-color_red")).toBe(true);
    expect(item.classList.contains("sui_button-size_md")).toBe(true);
    expect(item.classList.contains("sui_button-radius_sm")).toBe(true);
  });
});

describe("ContextMenuLinkItem", () => {
  test("リンクとして描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderMenu(
      <ContextMenuLinkItem href="https://example.com">ドキュメント</ContextMenuLinkItem>,
    );

    // 検証
    const link = screen.getByRole("menuitem", { name: "ドキュメント" }).element();
    expect(link.tagName).toBe("A");
    expect(link.getAttribute("href")).toBe("https://example.com");
    expect(link.classList.contains("sui_context_menu_link_item")).toBe(true);
  });
});

describe("ContextMenuSeparator", () => {
  test("区切りとして描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderMenu(
      <>
        <ContextMenuItem>編集</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>複製</ContextMenuItem>
      </>,
    );

    // 検証
    const separator = screen.getByRole("separator").element();
    expect(separator.classList.contains("sui_context_menu_separator")).toBe(true);
  });
});

describe("ContextMenuGroup", () => {
  test("ラベルと項目をまとめる", async ({ expect }) => {
    // 準備と実行
    const screen = await renderMenu(
      <ContextMenuGroup>
        <ContextMenuGroupLabel>果物</ContextMenuGroupLabel>
        <ContextMenuItem>りんご</ContextMenuItem>
      </ContextMenuGroup>,
    );

    // 検証
    const group = screen.getByRole("group").element();
    expect(group.classList.contains("sui_context_menu_group")).toBe(true);
    expect(
      screen.getByText("果物").element().classList.contains("sui_context_menu_group_label"),
    ).toBe(true);
  });
});

describe("ContextMenuRadioGroup", () => {
  test("ラジオ項目と選択状態を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderMenu(
      <ContextMenuRadioGroup defaultValue="name">
        <ContextMenuRadioItem value="name">
          名前
          <ContextMenuRadioItemIndicator keepMounted />
        </ContextMenuRadioItem>
        <ContextMenuRadioItem value="date">
          日付
          <ContextMenuRadioItemIndicator keepMounted />
        </ContextMenuRadioItem>
      </ContextMenuRadioGroup>,
    );

    // 検証
    const group = screen.getByRole("group").element();
    expect(group.classList.contains("sui_context_menu_radio_group")).toBe(true);
    const selected = screen.getByRole("menuitemradio", { name: "名前" }).element();
    expect(selected.getAttribute("aria-checked")).toBe("true");
    expect(selected.classList.contains("sui_context_menu_radio_item")).toBe(true);
    expect(selected.classList.contains("sui_context_menu_item-checked")).toBe(true);
    const indicator = screen
      .getByClassName("sui_context_menu_radio_item_indicator")
      .first()
      .element();
    expect(indicator.classList.contains("sui_context_menu_item_indicator")).toBe(true);
  });

  test("未選択の表示を隠す", async ({ expect }) => {
    // 準備と実行
    const screen = await renderMenu(
      <ContextMenuRadioGroup defaultValue="name">
        <ContextMenuRadioItem value="name">
          名前
          <ContextMenuRadioItemIndicator keepMounted />
        </ContextMenuRadioItem>
        <ContextMenuRadioItem value="date">
          日付
          <ContextMenuRadioItemIndicator keepMounted />
        </ContextMenuRadioItem>
      </ContextMenuRadioGroup>,
    );

    // 検証
    const unchecked = screen
      .getByClassName("sui_context_menu_radio_item_indicator")
      .nth(1)
      .element();
    expect(unchecked.classList.contains("sui_context_menu_item_indicator-unchecked")).toBe(true);
  });
});

describe("ContextMenuCheckboxItem", () => {
  test("チェック状態を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderMenu(
      <ContextMenuCheckboxItem defaultChecked>
        サイドバー
        <ContextMenuCheckboxItemIndicator keepMounted />
      </ContextMenuCheckboxItem>,
    );

    // 検証
    const item = screen.getByRole("menuitemcheckbox", { name: "サイドバー" }).element();
    expect(item.getAttribute("aria-checked")).toBe("true");
    expect(item.classList.contains("sui_context_menu_checkbox_item")).toBe(true);
    expect(item.classList.contains("sui_context_menu_item-checked")).toBe(true);
    const indicator = screen.getByClassName("sui_context_menu_checkbox_item_indicator").element();
    expect(indicator.classList.contains("sui_context_menu_item_indicator")).toBe(true);
  });
});

describe("ContextMenuSubmenu", () => {
  test("親項目からサブメニューへ開ける", async ({ expect }) => {
    // 準備と実行
    const screen = await renderMenu(
      <ContextMenuSubmenuRoot>
        <ContextMenuSubmenuTrigger>共有</ContextMenuSubmenuTrigger>
        <ContextMenuPortal>
          <ContextMenuPositioner>
            <ContextMenuContent>
              <ContextMenuItem>リンクをコピー</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenuPositioner>
        </ContextMenuPortal>
      </ContextMenuSubmenuRoot>,
    );

    // 検証
    const trigger = screen.getByRole("menuitem", { name: "共有" }).element();
    expect(trigger.getAttribute("aria-haspopup")).toBe("menu");
    expect(trigger.classList.contains("sui_context_menu_submenu_trigger")).toBe(true);
  });

  test("項目を渡さないときも右側の配置にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ContextMenuRoot defaultOpen>
        <ContextMenuPortal>
          <ContextMenuPositioner>
            <ContextMenuContent>
              <ContextMenuSubmenuRoot defaultOpen>
                <ContextMenuSubmenuTrigger>共有</ContextMenuSubmenuTrigger>
                <ContextMenuPortal>
                  <ContextMenuPositioner>
                    <ContextMenuContent>
                      <ContextMenuItem>リンクをコピー</ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenuPositioner>
                </ContextMenuPortal>
              </ContextMenuSubmenuRoot>
            </ContextMenuContent>
          </ContextMenuPositioner>
        </ContextMenuPortal>
      </ContextMenuRoot>,
    );
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

describe("ContextMenuArrow", () => {
  test("矢印を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ContextMenuRoot defaultOpen>
        <ContextMenuPortal>
          <ContextMenuPositioner>
            <ContextMenuContent>
              <ContextMenuItem>項目</ContextMenuItem>
              <ContextMenuArrow />
            </ContextMenuContent>
          </ContextMenuPositioner>
        </ContextMenuPortal>
      </ContextMenuRoot>,
    );

    // 検証
    const arrow = screen.getByClassName("sui_context_menu_arrow").element();
    expect(arrow.classList.contains("sui_context_menu_arrow")).toBe(true);
  });
});

describe("ContextMenuTrigger", () => {
  test("右クリックで開く対象として描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ContextMenuRoot>
        <ContextMenuTrigger>{(props) => <div {...props}>右クリック領域</div>}</ContextMenuTrigger>
      </ContextMenuRoot>,
    );

    // 検証
    const trigger = screen.getByText("右クリック領域").element();
    expect(trigger.classList.contains("sui_context_menu_trigger")).toBe(true);
  });
});

describe("ContextMenu の状態伝播", () => {
  test("ポータルの render へスタイル情報を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ContextMenuRoot defaultOpen size="lg" radius="sm" outlined>
        <ContextMenuPortal
          render={(props, state) => (
            <div
              {...props}
              data-probe={`${state.size}/${state.radius}/${String(state.outlined)}`}
            />
          )}
        >
          <ContextMenuPositioner>
            <ContextMenuContent>
              <ContextMenuItem>項目</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenuPositioner>
        </ContextMenuPortal>
      </ContextMenuRoot>,
    );

    // 検証
    expect(
      screen.getByClassName("sui_context_menu_portal").element().getAttribute("data-probe"),
    ).toBe("lg/sm/true");
  });

  test("コンテンツの render へスタイル情報を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ContextMenuRoot defaultOpen size="lg" radius="sm" variant="liquid">
        <ContextMenuPortal>
          <ContextMenuPositioner>
            <ContextMenuContent
              render={(props, state) => (
                <div {...props} data-probe={`${state.size}/${state.radius}/${state.variant}`} />
              )}
            >
              <ContextMenuItem>項目</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenuPositioner>
        </ContextMenuPortal>
      </ContextMenuRoot>,
    );

    // 検証
    expect(screen.getByRole("menu").element().getAttribute("data-probe")).toBe("lg/sm/liquid");
  });

  test("項目の render へスタイル情報と項目の状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ContextMenuRoot defaultOpen size="lg" radius="sm">
        <ContextMenuPortal>
          <ContextMenuPositioner>
            <ContextMenuContent>
              <ContextMenuItem
                disabled
                render={(props, state) => (
                  <div
                    {...props}
                    data-probe={`${state.size}/${state.radius}/${String(state.disabled)}`}
                  />
                )}
              >
                項目
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenuPositioner>
        </ContextMenuPortal>
      </ContextMenuRoot>,
    );

    // 検証
    expect(
      screen.getByClassName("sui_context_menu_item").element().getAttribute("data-probe"),
    ).toBe("lg/sm/true");
  });

  test("トリガーの children へスタイル情報とトリガーの状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ContextMenuRoot size="lg" radius="sm">
        <ContextMenuTrigger>
          {(props, state) => (
            <div {...props} data-probe={`${state.size}/${state.radius}/${state.depth}`}>
              右クリック領域
            </div>
          )}
        </ContextMenuTrigger>
      </ContextMenuRoot>,
    );

    // 検証
    expect(screen.getByText("右クリック領域").element().getAttribute("data-probe")).toBe("lg/sm/1");
  });
});

describe("ContextMenu", () => {
  test("合成した項目一覧を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ContextMenu
        defaultOpen
        items={[
          { label: "編集" },
          { type: "link", label: "ドキュメント", href: "https://example.com" },
          { type: "checkbox", label: "サイドバー", defaultChecked: true },
          {
            type: "radio-group",
            defaultValue: "name",
            items: [
              { type: "radio", label: "名前", value: "name" },
              { type: "radio", label: "日付", value: "date" },
            ],
          },
          { type: "submenu", label: "共有", items: [{ label: "リンクをコピー" }] },
          { label: "果物", items: [{ label: "りんご" }] },
          { items: [{ label: "ログアウト" }] },
        ]}
      />,
    );

    // 検証
    expect(screen.getByRole("menuitem", { name: "編集" }).query()).not.toBe(null);
    expect(screen.getByRole("menuitem", { name: "ドキュメント" }).query()).not.toBe(null);
    expect(screen.getByRole("menuitemcheckbox", { name: "サイドバー" }).query()).not.toBe(null);
    const radio = screen.getByRole("menuitemradio", { name: "名前" }).element();
    expect(radio.getAttribute("type")).toBe("button");
    expect(screen.getByRole("menuitem", { name: /共有/ }).query()).not.toBe(null);
    expect(screen.getByText("果物").query()).not.toBe(null);
    expect(screen.getByText("ログアウト").query()).not.toBe(null);
    expect(screen.getByClassName("sui_context_menu_separator").query()).not.toBe(null);
  });
});
