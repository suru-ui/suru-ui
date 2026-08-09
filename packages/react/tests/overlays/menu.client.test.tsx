import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import "@suru-ui/theme/suru.css";
import { Button } from "../../src/buttons/button/index.js";
import { Menu } from "../../src/overlays/menu/index.js";
import * as MenuParts from "../../src/overlays/menu/index.js";
import { clickElement } from "../_click.js";

describe("Menu", () => {
  test("トリガーをクリックするとメニューが開く", async () => {
    // 実行
    const screen = await render(
      <Menu trigger={<Button>ファイル</Button>}>
        <MenuParts.Item>開く</MenuParts.Item>
        <MenuParts.Item>保存</MenuParts.Item>
      </Menu>,
    );
    const trigger = screen.getByRole("button", { name: "ファイル" });

    // 検証
    await expect.element(trigger).toHaveClass("sui_menu_trigger");
    await expect.element(screen.getByRole("menu")).not.toBeInTheDocument();

    // 実行
    clickElement(trigger);

    // 検証
    const menu = screen.getByRole("menu");
    await expect.element(menu).toHaveClass("sui_menu_popup");
    await expect.element(screen.getByRole("menuitem", { name: "開く" })).toBeVisible();
    await expect.element(screen.getByRole("menuitem", { name: "保存" })).toBeVisible();
  });

  test("項目をクリックするとメニューが閉じる", async () => {
    // 実行
    const screen = await render(
      <Menu defaultOpen trigger={<Button>操作</Button>}>
        <MenuParts.Item>編集</MenuParts.Item>
      </Menu>,
    );
    const menu = screen.getByRole("menu");

    // 実行
    clickElement(screen.getByRole("menuitem", { name: "編集" }));

    // 検証
    await expect.element(menu).not.toBeInTheDocument();
  });

  test("チェック項目の状態を切り替える", async () => {
    // 実行
    const screen = await render(
      <Menu defaultOpen trigger={<Button>表示</Button>}>
        <MenuParts.CheckboxItem defaultChecked>
          <MenuParts.CheckboxItemIndicator>✓</MenuParts.CheckboxItemIndicator>
          サイドバー
        </MenuParts.CheckboxItem>
      </Menu>,
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

  test("通常項目は naked、選択済み項目は solid のスタイルになる", async () => {
    // 実行
    const screen = await render(
      <>
        <Button variant="naked" color="grey">
          naked
        </Button>
        <Button variant="solid" color="grey">
          solid
        </Button>
        <Menu defaultOpen trigger={<Button>表示</Button>}>
          <MenuParts.Item>通常</MenuParts.Item>
          <MenuParts.CheckboxItem defaultChecked>選択済み</MenuParts.CheckboxItem>
        </Menu>
      </>,
    );
    const normalItem = screen.getByRole("menuitem", { name: "通常" }).element();
    const checkedItem = screen.getByRole("menuitemcheckbox", { name: "選択済み" }).element();
    const nakedButton = screen.getByRole("button", { name: "naked" }).element();
    const solidButton = screen.getByRole("button", { name: "solid" }).element();
    const nakedContent = nakedButton.querySelector<HTMLElement>(".sui_button_content");
    const solidContent = solidButton.querySelector<HTMLElement>(".sui_button_content");

    if (nakedContent === null || solidContent === null) {
      throw new Error("Button content was not rendered.");
    }

    // 検証
    expect(getComputedStyle(normalItem).backgroundColor).toBe(
      getComputedStyle(nakedButton).backgroundColor,
    );
    expect(getComputedStyle(normalItem).color).toBe(getComputedStyle(nakedContent).color);
    expect(getComputedStyle(checkedItem).backgroundColor).toBe(
      getComputedStyle(solidButton).backgroundColor,
    );
    expect(getComputedStyle(checkedItem).color).toBe(getComputedStyle(solidContent).color);
    expect(getComputedStyle(normalItem).paddingInline).toBe(
      getComputedStyle(solidButton).paddingInline,
    );
    expect(getComputedStyle(normalItem).borderRadius).toBe(
      getComputedStyle(solidButton).borderRadius,
    );
  });

  test("未チェックの ItemIndicator をマウントしたまま幅を維持する", async () => {
    // 実行
    const screen = await render(
      <Menu defaultOpen trigger={<Button>表示</Button>}>
        <MenuParts.RadioGroup defaultValue="first">
          <MenuParts.RadioItem value="first">
            <MenuParts.RadioItemIndicator>✓</MenuParts.RadioItemIndicator>
            先頭
          </MenuParts.RadioItem>
          <MenuParts.RadioItem value="second">
            <MenuParts.RadioItemIndicator>✓</MenuParts.RadioItemIndicator>2 番目
          </MenuParts.RadioItem>
        </MenuParts.RadioGroup>
        <MenuParts.CheckboxItem>
          <MenuParts.CheckboxItemIndicator>✓</MenuParts.CheckboxItemIndicator>
          未チェック
        </MenuParts.CheckboxItem>
      </Menu>,
    );
    const checkedRadio = screen.getByRole("menuitemradio", { name: "先頭" }).element();
    const uncheckedRadio = screen.getByRole("menuitemradio", { name: "2 番目" }).element();
    const uncheckedCheckbox = screen
      .getByRole("menuitemcheckbox", { name: "未チェック" })
      .element();
    const checkedRadioIndicator = checkedRadio.querySelector<HTMLElement>(
      ".sui_menu_radio_item_indicator",
    );
    const uncheckedRadioIndicator = uncheckedRadio.querySelector<HTMLElement>(
      ".sui_menu_radio_item_indicator",
    );
    const uncheckedCheckboxIndicator = uncheckedCheckbox.querySelector<HTMLElement>(
      ".sui_menu_checkbox_item_indicator",
    );

    if (
      checkedRadioIndicator === null ||
      uncheckedRadioIndicator === null ||
      uncheckedCheckboxIndicator === null
    ) {
      throw new Error("Menu item indicators were not rendered.");
    }

    // 検証
    expect(uncheckedRadioIndicator.hasAttribute("data-unchecked")).toBe(true);
    expect(uncheckedCheckboxIndicator.hasAttribute("data-unchecked")).toBe(true);
    expect(getComputedStyle(uncheckedRadioIndicator).opacity).toBe("0");
    expect(getComputedStyle(uncheckedCheckboxIndicator).opacity).toBe("0");
    expect(uncheckedRadioIndicator.getBoundingClientRect().width).toBeGreaterThan(0);
    expect(uncheckedCheckboxIndicator.getBoundingClientRect().width).toBeGreaterThan(0);
    expect(uncheckedRadioIndicator.getBoundingClientRect().width).toBe(
      checkedRadioIndicator.getBoundingClientRect().width,
    );
  });

  test("項目をホバーすると背景色が変わる", async () => {
    // 実行
    const screen = await render(
      <Menu trigger={<Button>操作</Button>}>
        <MenuParts.Item>編集</MenuParts.Item>
        <MenuParts.Item>共有</MenuParts.Item>
      </Menu>,
    );
    clickElement(screen.getByRole("button", { name: "操作" }));
    const popup = screen.getByRole("menu");
    await expect.element(popup).toBeInTheDocument();
    const item = screen.getByRole("menuitem", { name: "共有" });

    // 実行
    await userEvent.hover(item);

    // 検証
    expect(getComputedStyle(item.element()).backgroundColor).not.toBe(
      getComputedStyle(popup.element()).backgroundColor,
    );
  });

  test("メニューリストとホバーした項目にアウトラインを表示しない", async () => {
    // 準備
    const screen = await render(
      <Menu defaultOpen trigger={<Button>操作</Button>}>
        <MenuParts.Item>編集</MenuParts.Item>
      </Menu>,
    );
    const popup = screen.getByRole("menu");
    const item = screen.getByRole("menuitem", { name: "編集" });

    // 実行
    popup.element().focus();
    await userEvent.hover(item);

    // 検証
    expect(getComputedStyle(popup.element()).outlineStyle).toBe("none");
    expect(getComputedStyle(item.element()).outlineStyle).toBe("none");
  });

  test("disabled を指定するとトリガーが無効になる", async () => {
    // 実行
    const screen = await render(
      <Menu disabled trigger={<Button>操作</Button>}>
        <MenuParts.Item>編集</MenuParts.Item>
      </Menu>,
    );
    const trigger = screen.getByRole("button", { name: "操作" });

    // 検証
    await expect.element(trigger).toBeDisabled();

    // 実行
    clickElement(trigger);

    // 検証
    await expect.element(screen.getByRole("menu")).not.toBeInTheDocument();
  });

  test("slotProps でポップアップとトリガーにクラスを追加できる", async () => {
    // 実行
    const screen = await render(
      <Menu
        trigger={<Button>操作</Button>}
        slotProps={{
          trigger: { className: "custom-trigger" },
          popup: { className: "custom-popup" },
          positioner: { className: "custom-positioner" },
        }}
      >
        <MenuParts.Item>編集</MenuParts.Item>
      </Menu>,
    );

    // 検証
    await expect
      .element(screen.getByRole("button", { name: "操作" }))
      .toHaveClass("custom-trigger");

    // 実行
    clickElement(screen.getByRole("button", { name: "操作" }));

    // 検証
    await expect.element(screen.getByRole("menu")).toHaveClass("custom-popup");
    await expect
      .element(screen.getByRole("menu").element().parentElement as HTMLElement)
      .toHaveClass("custom-positioner");
  });
});

describe("MenuParts", () => {
  test("ハンドルを共有した Trigger と Root を組み合わせて開ける", async () => {
    // 準備
    const handle = MenuParts.createHandle();

    // 実行
    const screen = await render(
      <>
        <MenuParts.Trigger handle={handle}>
          {(props) => (
            <button type="button" {...props}>
              開く
            </button>
          )}
        </MenuParts.Trigger>
        <MenuParts.Root handle={handle}>
          <MenuParts.Portal>
            <MenuParts.Positioner>
              <MenuParts.Popup>
                <MenuParts.Item>編集</MenuParts.Item>
              </MenuParts.Popup>
            </MenuParts.Positioner>
          </MenuParts.Portal>
        </MenuParts.Root>
      </>,
    );

    // 実行
    clickElement(screen.getByRole("button", { name: "開く" }));

    // 検証
    await expect.element(screen.getByRole("menu")).toBeInTheDocument();
    await expect.element(screen.getByRole("menuitem", { name: "編集" })).toBeVisible();
  });
});
