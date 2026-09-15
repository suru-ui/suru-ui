import { Menu } from "@base-ui/react/menu";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import * as Button from "../button/button.parts.js";
import type { IComponent } from "../types.js";
import type { MenuCheckboxItemProps } from "./menu.checkbox-item.jsx";
import { MenuContext } from "./menu.context.js";
import type { MenuGroupLabelProps } from "./menu.group-label.jsx";
import type { MenuGroupProps } from "./menu.group.jsx";
import type { MenuHandle } from "./menu.handle.js";
import type { MenuItemProps } from "./menu.item.jsx";
import type { MenuLinkItemProps } from "./menu.link-item.jsx";
import type { MenuRadioGroupProps } from "./menu.radio-group.jsx";
import type { MenuRadioItemProps } from "./menu.radio-item.jsx";
import type { MenuSubmenuRootProps } from "./menu.submenu-root.jsx";
import type { MenuSubmenuTriggerProps } from "./menu.submenu-trigger.jsx";

/**
 * {@link MenuRoot} を命令的に操作するためのオブジェクトです。
 */
export type MenuRootActions = Menu.Root.Actions;

/**
 * {@link MenuRoot} の開閉状態を変更されるイベントの詳細です。
 */
export type MenuRootChangeEventDetails = Menu.Root.ChangeEventDetails;

/**
 * {@link MenuRoot} の開閉状態が変更される理由です。
 */
export type MenuRootChangeEventReason = Menu.Root.ChangeEventReason;

/**
 * {@link MenuRoot} の向きです。
 */
export type MenuRootOrientation = Menu.Root.Orientation;

namespace MenuRootLabeledItem {
  export type BaseUI = Omit<MenuItemProps, "children" | keyof SuruUI>;

  export type SuruUI = {
    /**
     * 項目のラベルです。
     */
    readonly label: MenuItemProps["children"];

    /**
     * 項目の種類です。
     */
    readonly type?: "item" | undefined;
  };
}

export type MenuRootLabeledItem = MenuRootLabeledItem.SuruUI & MenuRootLabeledItem.BaseUI;

namespace MenuRootLinkItem {
  export type BaseUI = Omit<MenuLinkItemProps, "children" | keyof SuruUI>;

  export type SuruUI = {
    /**
     * 項目のラベルです。
     */
    readonly label: MenuLinkItemProps["children"];

    /**
     * 項目の種類です。
     */
    readonly type: "link";
  };
}

export type MenuRootLinkItem = MenuRootLinkItem.SuruUI & MenuRootLinkItem.BaseUI;

namespace MenuRootCheckboxItem {
  export type BaseUI = Omit<MenuCheckboxItemProps, "children" | keyof SuruUI>;

  export type SuruUI = {
    /**
     * 項目のラベルです。
     */
    readonly label: MenuCheckboxItemProps["children"];

    /**
     * 項目の種類です。
     */
    readonly type: "checkbox";
  };
}

export type MenuRootCheckboxItem = MenuRootCheckboxItem.SuruUI & MenuRootCheckboxItem.BaseUI;

namespace MenuRootRadioItem {
  export type BaseUI = Omit<MenuRadioItemProps, "children" | keyof SuruUI>;

  export type SuruUI = {
    /**
     * 項目のラベルです。
     */
    readonly label: MenuRadioItemProps["children"];

    /**
     * 項目の種類です。
     */
    readonly type: "radio";
  };
}

export type MenuRootRadioItem = MenuRootRadioItem.SuruUI & MenuRootRadioItem.BaseUI;

namespace MenuRootRadioItemGroup {
  export type BaseUI = Omit<MenuRadioGroupProps, "children" | keyof SuruUI>;

  export type SuruUI = {
    /**
     * ラジオ項目です。
     */
    readonly items: readonly MenuRootRadioItem[];

    /**
     * 項目の種類です。
     */
    readonly type: "radio-group";
  };
}

export type MenuRootRadioItemGroup = MenuRootRadioItemGroup.SuruUI & MenuRootRadioItemGroup.BaseUI;

namespace MenuRootSubmenuItem {
  export type BaseUI = Omit<MenuSubmenuRootProps, "children" | keyof SuruUI>;

  export type SuruUI = {
    /**
     * 子項目です。
     */
    readonly items: readonly MenuRootItem[];

    /**
     * 項目のラベルです。
     */
    readonly label: MenuSubmenuTriggerProps["children"];

    /**
     * 項目の種類です。
     */
    readonly type: "submenu";
  };
}

export type MenuRootSubmenuItem = MenuRootSubmenuItem.SuruUI & MenuRootSubmenuItem.BaseUI;

namespace MenuRootItemGroup {
  export type BaseUI = Omit<MenuGroupProps, "children" | keyof SuruUI>;

  export type SuruUI = {
    /**
     * 子項目です。
     */
    readonly items: readonly (
      | MenuRootLabeledItem
      | MenuRootLinkItem
      | MenuRootCheckboxItem
      | MenuRootRadioItemGroup
      | MenuRootRadioItem
      | MenuRootSubmenuItem
    )[];

    /**
     * グループのラベルです。
     */
    readonly label?: MenuGroupLabelProps["children"];

    /**
     * 項目の種類です。
     */
    readonly type?: "group" | undefined;
  };
}

export type MenuRootItemGroup = MenuRootItemGroup.SuruUI & MenuRootItemGroup.BaseUI;

/**
 * {@link MenuRoot} の各項目です。
 */
export type MenuRootItem =
  | MenuRootLabeledItem
  | MenuRootLinkItem
  | MenuRootCheckboxItem
  | MenuRootRadioItemGroup
  | MenuRootRadioItem
  | MenuRootSubmenuItem
  | MenuRootItemGroup;

/**
 * メニューの角丸です。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type MenuRootRadius = "none" | Size;

/**
 * メニューの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type MenuRootSize = Size;

/**
 * メニューの項目の主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type MenuRootVariant = Button.Root.Variant;

/**
 * {@link MenuRoot} が持つ状態です。
 */
export type MenuRootState = Menu.Root.State;

export namespace MenuRootProps {
  export type Render = RenderProps<MenuRootState>;

  export type SuruUI<TPayload = any, TItem = any> = {
    /**
     * メニューとトリガー ({@link Trigger}) を関連付けるハンドルです。
     *
     * {@link createHandle} で作成します。Root 内に {@link Trigger} を配置する場合は省略できます。
     */
    handle?: MenuHandle<TPayload> | undefined;

    /**
     * メニューの項目です。
     */
    items?: readonly TItem[] | undefined;

    /**
     * ポップアップに枠線を表示するかどうかを指定します。
     *
     * @default false
     */
    outlined?: boolean | undefined;

    /**
     * ポップアップと項目の角丸を指定します。
     *
     * 既定値は {@link MenuRootProps.size|size} です。
     */
    radius?: MenuRootRadius | undefined;

    /**
     * ポップアップと項目の大きさを指定します。
     *
     * @default "md"
     */
    size?: MenuRootSize | undefined;

    /**
     * 項目の主な外観を指定します。
     *
     * @default "naked"
     */
    variant?: MenuRootVariant | undefined;
  };

  export type BaseUI<TPayload = any> = Pick<
    Menu.Root.Props<TPayload>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MenuRootProps:
      | "defaultOpen"
      | "loopFocus"
      | "highlightItemOnHover"
      | "modal"
      | "onOpenChange"
      | "onOpenChangeComplete"
      | "open"
      | "orientation"
      | "disabled"
      | "closeParentOnEsc"
      | "actionsRef"
      | "triggerId"
      | "defaultTriggerId"
      | "handle"
      | "children",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML<TPayload = any> = Omit<
    Menu.Root.Props<TPayload>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuRoot} に渡す props です。
 *
 * @template TPayload 開いたときに渡される値の型です。
 * @template TItem 項目の型です。
 */
export type MenuRootProps<TPayload = any, TItem = any> = MenuRootProps.Render &
  MenuRootProps.SuruUI<TPayload, TItem> &
  MenuRootProps.BaseUI<TPayload> &
  MenuRootProps.HTML<TPayload>;

interface IMenuRoot extends IComponent<MenuRootProps> {
  /**
   * @template TPayload 開いたときに渡される値の型です。
   * @template TItem 項目の型です。
   */
  <TPayload = any, TItem = any>(props: MenuRootProps<TPayload, TItem>): IComponent.Return;
}

/**
 * ボタンから開くメニューのルートです。
 *
 * 開閉状態を管理し、各パーツをグループ化します。
 * それ自身は HTML 要素をレンダリングしません。
 */
export const MenuRoot: IMenuRoot = function SuiMenuRoot(props: MenuRootProps) {
  const {
    size = "md",
    items = [],
    radius = size,
    variant = "naked",
    outlined = false,
    ...otherProps
  } = props;
  const ctx = React.useMemo<MenuContext>(
    () => ({ size, items, radius, variant, outlined }),
    [size, items, radius, variant, outlined],
  );

  return (
    <MenuContext value={ctx}>
      <Menu.Root {...otherProps} />
    </MenuContext>
  );
};

export { MenuRoot as Root };

export namespace Root {
  export type State = MenuRootState;

  export type Props<TPayload = any, TItem = any> = Props.Render &
    Props.SuruUI<TPayload, TItem> &
    Props.BaseUI<TPayload> &
    Props.HTML<TPayload>;

  export namespace Props {
    export type Render = MenuRootProps.Render;

    export type SuruUI<TPayload = any, TItem = any> = MenuRootProps.SuruUI<TPayload, TItem>;

    export type BaseUI<TPayload = any> = MenuRootProps.BaseUI<TPayload>;

    export type HTML<TPayload = any> = MenuRootProps.HTML<TPayload>;
  }

  export type Actions = MenuRootActions;

  export type ChangeEventDetails = MenuRootChangeEventDetails;

  export type ChangeEventReason = MenuRootChangeEventReason;

  export type CheckboxItem = MenuRootCheckboxItem;

  export type Orientation = MenuRootOrientation;

  export type Radius = MenuRootRadius;

  export type Size = MenuRootSize;

  export type Variant = MenuRootVariant;
}
