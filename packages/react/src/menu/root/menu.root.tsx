import { Menu } from "@base-ui/react/menu";
import * as React from "react";

import type { Override, IComponent } from "../../types.js";
import type { MenuCheckboxItemProps } from "../checkbox-item/menu.checkbox-item.jsx";
import type { MenuGroupLabelProps } from "../group-label/menu.group-label.jsx";
import type { MenuGroupProps } from "../group/menu.group.jsx";
import type { MenuHandle } from "../handle/menu.handle.js";
import type { MenuItemProps } from "../item/menu.item.jsx";
import type { MenuLinkItemProps } from "../link-item/menu.link-item.jsx";
import type { MenuRadioGroupProps } from "../radio-group/menu.radio-group.jsx";
import type { MenuRadioItemProps } from "../radio-item/menu.radio-item.jsx";
import type { MenuSubmenuRootProps } from "../submenu-root/menu.submenu-root.jsx";
import type { MenuSubmenuTriggerProps } from "../submenu-trigger/menu.submenu-trigger.jsx";
import {
  type MenuContextSize,
  type MenuContextRadius,
  type MenuContextVariant,
  MenuContext,
} from "./menu.root.context.js";

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

namespace MenuRootLabeledItemObject {
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

export type MenuRootLabeledItemObject = MenuRootLabeledItemObject.SuruUI &
  MenuRootLabeledItemObject.BaseUI;

namespace MenuRootLinkItemObject {
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

export type MenuRootLinkItemObject = MenuRootLinkItemObject.SuruUI & MenuRootLinkItemObject.BaseUI;

namespace MenuRootCheckboxItemObject {
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

export type MenuRootCheckboxItemObject = MenuRootCheckboxItemObject.SuruUI &
  MenuRootCheckboxItemObject.BaseUI;

namespace MenuRootRadioItemObject {
  export type BaseUI = Omit<MenuRadioItemProps, "children" | keyof SuruUI>;

  export type SuruUI = {
    /**
     * 項目のラベルです。
     */
    readonly label: MenuRadioItemProps["children"];

    /**
     * 項目の種類です。
     */
    readonly type?: "radio" | undefined;
  };
}

export type MenuRootRadioItemObject = MenuRootRadioItemObject.SuruUI &
  MenuRootRadioItemObject.BaseUI;

namespace MenuRootRadioItemObjectGroup {
  // 型引数 TItem は SuruUI.items によって上書きされ、children は削除されるため、指定不要です。
  export type BaseUI = Omit<MenuRadioGroupProps, "children" | keyof SuruUI>;

  export type SuruUI = {
    /**
     * ラジオ項目です。
     */
    readonly items: readonly MenuRootRadioItemObject[];

    /**
     * 項目の種類です。
     */
    readonly type: "radio-group";
  };
}

export type MenuRootRadioItemObjectGroup = MenuRootRadioItemObjectGroup.SuruUI &
  MenuRootRadioItemObjectGroup.BaseUI;

namespace MenuRootSubmenuItemObject {
  // 型引数 TItem は SuruUI.items によって上書きされ、children は削除されるため、指定不要です。
  export type BaseUI = Omit<MenuSubmenuRootProps, "children" | keyof SuruUI>;

  export type SuruUI = {
    /**
     * 子項目です。
     */
    readonly items: readonly MenuRootItemObject[];

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

export type MenuRootSubmenuItemObject = MenuRootSubmenuItemObject.SuruUI &
  MenuRootSubmenuItemObject.BaseUI;

export type MenuRootGroupedItemObject =
  | MenuRootLabeledItemObject
  | MenuRootLinkItemObject
  | MenuRootCheckboxItemObject
  | MenuRootRadioItemObjectGroup
  | MenuRootSubmenuItemObject;

namespace MenuRootItemObjectGroup {
  export type BaseUI = Omit<MenuGroupProps, "children" | keyof SuruUI>;

  export type SuruUI = {
    /**
     * 子項目です。
     */
    readonly items: readonly MenuRootGroupedItemObject[];

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

export type MenuRootItemObjectGroup = MenuRootItemObjectGroup.SuruUI &
  MenuRootItemObjectGroup.BaseUI;

/**
 * {@link MenuRoot} の各項目です。
 */
export type MenuRootItemObject =
  | MenuRootLabeledItemObject
  | MenuRootLinkItemObject
  | MenuRootCheckboxItemObject
  | MenuRootRadioItemObjectGroup
  | MenuRootSubmenuItemObject
  | MenuRootItemObjectGroup;

/**
 * メニューの角丸です。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type MenuRootRadius = MenuContextRadius;

/**
 * メニューの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type MenuRootSize = MenuContextSize;

/**
 * メニューの項目の主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type MenuRootVariant = MenuContextVariant;

/**
 * {@link MenuRoot} が持つ状態です。
 *
 * @template TItem 項目の型です。
 */
export type MenuRootState<TItem = any> = Override<MenuContext<TItem>, Menu.Root.State>;

export namespace MenuRootProps {
  export type Render = {};

  export type SuruUI<TPayload = any, TItem = any> = {
    /**
     * メニューとトリガー ({@link Trigger}) を関連付けるハンドルです。
     *
     * {@link createHandle} で作成します。Root 内に {@link Trigger} を配置する場合は省略できます。
     */
    handle?: MenuHandle<TPayload> | undefined;

    /**
     * ポップアップに表示する項目の一覧です。
     *
     * グループの配列を指定するとグループごとに区切って表示します。
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

  export type BaseUI<TPayload = any> = Omit<
    Pick<
      Menu.Root.Props<TPayload>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // MenuRootProps より:
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
      | "children"
    >,
    keyof Render | keyof SuruUI
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

export interface IMenuRoot extends IComponent<MenuRootProps> {
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
    () => ({ size, depth: 1, items, radius, variant, outlined }),
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
  export type State<TItem = any> = MenuRootState<TItem>;

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

  export type CheckboxItemObject = MenuRootCheckboxItemObject;

  export type Orientation = MenuRootOrientation;

  export type Radius = MenuRootRadius;

  export type Size = MenuRootSize;

  export type Variant = MenuRootVariant;
}
