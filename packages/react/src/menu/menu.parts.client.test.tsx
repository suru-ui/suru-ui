import * as React from "react";
import { vi, test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { MenuArrow } from "./arrow/menu.arrow.jsx";
import { MenuBackdrop } from "./backdrop/menu.backdrop.jsx";
import { MenuCheckboxItemIndicator } from "./checkbox-item-indicator/menu.checkbox-item-indicator.jsx";
import { MenuCheckboxItem } from "./checkbox-item/menu.checkbox-item.jsx";
import { MenuGroupLabel } from "./group-label/menu.group-label.jsx";
import { MenuGroup } from "./group/menu.group.jsx";
import { MenuItem } from "./item/menu.item.jsx";
import { MenuLinkItem } from "./link-item/menu.link-item.jsx";
import { Menu } from "./menu.jsx";
import { MenuPopup } from "./popup/menu.popup.jsx";
import { MenuPortal } from "./portal/menu.portal.jsx";
import { MenuPositioner } from "./positioner/menu.positioner.jsx";
import { MenuRadioGroup } from "./radio-group/menu.radio-group.jsx";
import { MenuRadioItemIndicator } from "./radio-item-indicator/menu.radio-item-indicator.jsx";
import { MenuRadioItem } from "./radio-item/menu.radio-item.jsx";
import { MenuRoot } from "./root/menu.root.jsx";
import { MenuSeparator } from "./separator/menu.separator.jsx";
import { MenuSubmenuRoot } from "./submenu-root/menu.submenu-root.jsx";
import { MenuSubmenuTrigger } from "./submenu-trigger/menu.submenu-trigger.jsx";
import { MenuTrigger } from "./trigger/menu.trigger.jsx";
import { MenuViewport } from "./viewport/menu.viewport.jsx";
import "./menu.parts.js";
import "../../tests/src/_locators.js";

/**
 * 開いた状態のメニューを組み立てます。
 * ポップアップ系のパーツは Base UI のルートコンテキストを必要とするため、単体では描画できません。
 */
function renderMenu(children: React.ReactNode) {
  return render(
    <MenuRoot defaultOpen>
      <MenuPortal>
        <MenuBackdrop />
        <MenuPositioner>
          <MenuPopup>{children}</MenuPopup>
        </MenuPositioner>
      </MenuPortal>
    </MenuRoot>,
  );
}

describe("MenuPortal", () => {
  test("ポップアップを別の場所へ配置する", async ({ expect }) => {
    // 準備と実行。
    const screen = await renderMenu(<MenuItem>項目</MenuItem>);

    // 検証。
    const portal = screen.getByClassName("sui_menu_portal").element();
    expect(portal.tagName).toBe("DIV");
    expect(portal.getAttribute("data-scope")).toBe("");
  });

  test("大きさと角丸と枠線を引き継ぐ", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <MenuRoot size="lg" radius="sm" outlined defaultOpen>
        <MenuPortal>
          <MenuPositioner>
            <MenuPopup>
              <MenuItem>項目</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </MenuRoot>,
    );

    // 検証。
    const portal = screen.getByClassName("sui_menu_portal").element();
    expect(portal.classList.contains("sui_menu_portal-size_lg")).toBe(true);
    expect(portal.classList.contains("sui_menu_portal-radius_sm")).toBe(true);
    expect(portal.classList.contains("sui_menu_portal-outlined")).toBe(true);
  });
});

describe("MenuBackdrop", () => {
  test("オーバーレイを描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await renderMenu(<MenuItem>項目</MenuItem>);

    // 検証。
    const backdrop = screen.getByClassName("sui_menu_backdrop").element();
    expect(backdrop.tagName).toBe("DIV");
  });
});

describe("MenuPositioner", () => {
  test("ポップアップの位置を決める", async ({ expect }) => {
    // 準備と実行。
    const screen = await renderMenu(<MenuItem>項目</MenuItem>);

    // 検証。
    const positioner = screen.getByClassName("sui_menu_positioner").element();
    expect(positioner.tagName).toBe("DIV");
  });

  test("既定では下端の先頭へ寄せる", async ({ expect }) => {
    // 準備と実行。
    const screen = await renderMenu(<MenuItem>項目</MenuItem>);
    await vi.waitFor(() => {
      expect(screen.getByClassName("sui_menu_positioner").element().dataset["side"]).toBe("bottom");
    });

    // 検証。
    const content = screen.getByRole("menu").element();
    expect(content.dataset["align"]).toBe("start");
    expect(content.dataset["side"]).toBe("bottom");
  });
});

describe("MenuPopup", () => {
  test("内容を表示する", async ({ expect }) => {
    // 準備と実行。
    const screen = await renderMenu(<MenuItem>編集</MenuItem>);

    // 検証。
    const content = screen.getByRole("menu").element();
    expect(content.classList.contains("sui_menu_popup")).toBe(true);
    expect(content.textContent).toBe("編集");
  });
});

describe("MenuItem", () => {
  test("項目として描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await renderMenu(<MenuItem>編集</MenuItem>);

    // 検証。
    const item = screen.getByRole("menuitem", { name: "編集" }).element();
    expect(item.classList.contains("sui_menu_item")).toBe(true);
    expect(item.classList.contains("sui_button-item")).toBe(true);
  });

  test("無効状態をクラスに反映する", async ({ expect }) => {
    // 準備と実行。
    const screen = await renderMenu(<MenuItem disabled>編集</MenuItem>);

    // 検証。
    const item = screen.getByRole("menuitem", { name: "編集" }).element();
    expect(item.classList.contains("sui_menu_item-disabled")).toBe(true);
  });

  test("配色と大きさと角丸と外観を反映する", async ({ expect }) => {
    // 準備と実行。
    const screen = await renderMenu(
      <MenuItem color="red" radius="sm" variant="liquid">
        削除
      </MenuItem>,
    );

    // 検証。
    const item = screen.getByRole("menuitem", { name: "削除" }).element();
    expect(item.classList.contains("sui_button-color_red")).toBe(true);
    expect(item.classList.contains("sui_button-size_md")).toBe(true);
    expect(item.classList.contains("sui_button-radius_sm")).toBe(true);
    expect(item.classList.contains("sui_button-variant_liquid")).toBe(true);
  });
});

describe("MenuLinkItem", () => {
  test("リンクとして描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await renderMenu(
      <MenuLinkItem href="https://example.com">ドキュメント</MenuLinkItem>,
    );

    // 検証。
    const link = screen.getByRole("menuitem", { name: "ドキュメント" }).element();
    expect(link.tagName).toBe("A");
    expect(link.getAttribute("href")).toBe("https://example.com");
    expect(link.classList.contains("sui_menu_link_item")).toBe(true);
  });
});

describe("MenuSeparator", () => {
  test("区切りとして描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await renderMenu(
      <>
        <MenuItem>編集</MenuItem>
        <MenuSeparator />
        <MenuItem>複製</MenuItem>
      </>,
    );

    // 検証。
    const separator = screen.getByRole("separator").element();
    expect(separator.classList.contains("sui_menu_separator")).toBe(true);
  });
});

describe("MenuGroup", () => {
  test("ラベルと項目をまとめる", async ({ expect }) => {
    // 準備と実行。
    const screen = await renderMenu(
      <MenuGroup>
        <MenuGroupLabel>果物</MenuGroupLabel>
        <MenuItem>りんご</MenuItem>
      </MenuGroup>,
    );

    // 検証。
    const group = screen.getByRole("group").element();
    expect(group.classList.contains("sui_menu_group")).toBe(true);
    expect(screen.getByText("果物").element().classList.contains("sui_menu_group_label")).toBe(
      true,
    );
  });
});

describe("MenuRadioGroup", () => {
  test("ラジオ項目と選択状態を表示する", async ({ expect }) => {
    // 準備と実行。
    const screen = await renderMenu(
      <MenuRadioGroup defaultValue="name">
        <MenuRadioItem value="name">
          名前
          <MenuRadioItemIndicator keepMounted />
        </MenuRadioItem>
        <MenuRadioItem value="date">
          日付
          <MenuRadioItemIndicator keepMounted />
        </MenuRadioItem>
      </MenuRadioGroup>,
    );

    // 検証。
    const group = screen.getByRole("group").element();
    expect(group.classList.contains("sui_menu_radio_group")).toBe(true);

    const selected = screen.getByRole("menuitemradio", { name: "名前" }).element();
    expect(selected.classList.contains("sui_menu_radio_item")).toBe(true);
    expect(selected.classList.contains("sui_menu_item-checked")).toBe(true);

    const indicator = screen.getByClassName("sui_menu_radio_item_indicator").first().element();
    expect(indicator.classList.contains("sui_menu_item_indicator")).toBe(true);
  });

  test("未選択の表示を隠す", async ({ expect }) => {
    // 準備と実行。
    const screen = await renderMenu(
      <MenuRadioGroup defaultValue="name">
        <MenuRadioItem value="name">
          名前
          <MenuRadioItemIndicator keepMounted />
        </MenuRadioItem>
        <MenuRadioItem value="date">
          日付
          <MenuRadioItemIndicator keepMounted />
        </MenuRadioItem>
      </MenuRadioGroup>,
    );

    // 検証。
    const unchecked = screen.getByClassName("sui_menu_radio_item_indicator").nth(1).element();
    expect(unchecked.classList.contains("sui_menu_item_indicator-unchecked")).toBe(true);
  });
});

describe("MenuCheckboxItem", () => {
  test("チェック状態を表示する", async ({ expect }) => {
    // 準備と実行。
    const screen = await renderMenu(
      <MenuCheckboxItem defaultChecked>
        サイドバー
        <MenuCheckboxItemIndicator keepMounted />
      </MenuCheckboxItem>,
    );

    // 検証。
    const item = screen.getByRole("menuitemcheckbox", { name: "サイドバー" }).element();
    expect(item.classList.contains("sui_menu_checkbox_item")).toBe(true);
    expect(item.classList.contains("sui_menu_item-checked")).toBe(true);

    const indicator = screen.getByClassName("sui_menu_checkbox_item_indicator").element();
    expect(indicator.classList.contains("sui_menu_item_indicator")).toBe(true);
  });
});

describe("MenuSubmenu", () => {
  test("親項目からサブメニューへ開ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await renderMenu(
      <MenuSubmenuRoot>
        <MenuSubmenuTrigger>共有</MenuSubmenuTrigger>
        <MenuPortal>
          <MenuPositioner>
            <MenuPopup>
              <MenuItem>リンクをコピー</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </MenuSubmenuRoot>,
    );

    // 検証。
    const trigger = screen.getByRole("menuitem", { name: "共有" }).element();
    expect(trigger.classList.contains("sui_menu_submenu_trigger")).toBe(true);
  });
});

describe("MenuArrow", () => {
  test("矢印を描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <MenuRoot defaultOpen>
        <MenuPortal>
          <MenuPositioner>
            <MenuPopup>
              <MenuItem>項目</MenuItem>
              <MenuArrow />
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </MenuRoot>,
    );

    // 検証。
    const arrow = screen.getByClassName("sui_menu_arrow").element();
    expect(arrow.classList.contains("sui_menu_arrow")).toBe(true);
  });
});

describe("MenuViewport", () => {
  test("内容の表示領域を描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await renderMenu(
      <MenuViewport>
        <MenuItem>項目</MenuItem>
      </MenuViewport>,
    );

    // 検証。
    const viewport = screen.getByClassName("sui_menu_viewport").element();
    expect(viewport.classList.contains("sui_menu_viewport")).toBe(true);
  });
});

describe("MenuTrigger", () => {
  test("メニューを開く対象として描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <MenuRoot>
        <MenuTrigger>{(props) => <button {...props}>メニューを開く</button>}</MenuTrigger>
      </MenuRoot>,
    );

    // 検証。
    const trigger = screen.getByText("メニューを開く").element();
    expect(trigger.classList.contains("sui_menu_trigger")).toBe(true);
  });
});

describe("Menu の状態伝播", () => {
  test("ポータルの render へスタイル情報を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <MenuRoot size="lg" radius="sm" outlined defaultOpen>
        <MenuPortal
          render={(props, state) => (
            <div
              {...props}
              data-probe={`${state.size}/${state.radius}/${String(state.outlined)}`}
            />
          )}
        >
          <MenuPositioner>
            <MenuPopup>
              <MenuItem>項目</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </MenuRoot>,
    );

    // 検証。
    expect(screen.getByClassName("sui_menu_portal").element().getAttribute("data-probe")).toBe(
      "lg/sm/true",
    );
  });

  test("コンテンツの render へスタイル情報を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <MenuRoot size="lg" radius="sm" variant="liquid" defaultOpen>
        <MenuPortal>
          <MenuPositioner>
            <MenuPopup
              render={(props, state) => (
                <div {...props} data-probe={`${state.size}/${state.radius}/${state.variant}`} />
              )}
            >
              <MenuItem>項目</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </MenuRoot>,
    );

    // 検証。
    expect(screen.getByRole("menu").element().getAttribute("data-probe")).toBe("lg/sm/liquid");
  });

  test("項目の render へスタイル情報と項目の状態を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <MenuRoot size="lg" radius="sm" defaultOpen>
        <MenuPortal>
          <MenuPositioner>
            <MenuPopup>
              <MenuItem
                render={(props, state) => (
                  <div
                    {...props}
                    data-probe={`${state.size}/${state.radius}/${String(state.disabled)}`}
                  />
                )}
                disabled
              >
                項目
              </MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </MenuRoot>,
    );

    // 検証。
    expect(screen.getByClassName("sui_menu_item").element().getAttribute("data-probe")).toBe(
      "lg/sm/true",
    );
  });

  test("トリガーの children へスタイル情報とトリガーの状態を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <MenuRoot size="lg" radius="sm">
        <MenuTrigger>
          {(props, state) => (
            <button {...props} data-probe={`${state.size}/${state.radius}/${state.depth}`}>
              メニューを開く
            </button>
          )}
        </MenuTrigger>
      </MenuRoot>,
    );

    // 検証。
    expect(screen.getByText("メニューを開く").element().getAttribute("data-probe")).toBe("lg/sm/1");
  });
});

describe("Menu", () => {
  test("合成した項目一覧を表示する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Menu
        items={[
          { label: "編集" },
          {
            href: "https://example.com",
            type: "link",
            label: "ドキュメント",
          },
          {
            type: "checkbox",
            label: "サイドバー",
            defaultChecked: true,
          },
          {
            type: "radio-group",
            items: [
              {
                type: "radio",
                label: "名前",
                value: "name",
              },
              {
                type: "radio",
                label: "日付",
                value: "date",
              },
            ],
            defaultValue: "name",
          },
          {
            type: "submenu",
            items: [{ label: "リンクをコピー" }],
            label: "共有",
          },
          {
            items: [{ label: "りんご" }],
            label: "果物",
          },
          { items: [{ label: "ログアウト" }] },
        ]}
        defaultOpen
      />,
    );

    // 検証。
    expect(screen.getByRole("menuitem", { name: "編集" }).query()).not.toBe(null);
    expect(screen.getByRole("menuitem", { name: "ドキュメント" }).query()).not.toBe(null);
    expect(screen.getByRole("menuitemcheckbox", { name: "サイドバー" }).query()).not.toBe(null);

    const radio = screen.getByRole("menuitemradio", { name: "名前" }).element();
    expect(radio.getAttribute("type")).toBe("button");

    expect(screen.getByRole("menuitem", { name: /共有/u }).query()).not.toBe(null);
    expect(screen.getByText("果物").query()).not.toBe(null);
    expect(screen.getByText("ログアウト").query()).not.toBe(null);
    expect(screen.getByClassName("sui_menu_separator").query()).not.toBe(null);
  });
});
