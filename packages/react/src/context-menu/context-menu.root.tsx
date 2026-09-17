import { ContextMenu } from "@base-ui/react/context-menu";
import { Menu } from "@base-ui/react/menu";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import * as Button from "../button/button.parts.js";
import type { IComponent } from "../types.js";
import type { ContextMenuCheckboxItemProps } from "./context-menu.checkbox-item.jsx";
import { ContextMenuContext } from "./context-menu.context.js";
import type { ContextMenuGroupLabelProps } from "./context-menu.group-label.jsx";
import type { ContextMenuGroupProps } from "./context-menu.group.jsx";
import type { ContextMenuItemProps } from "./context-menu.item.jsx";
import type { ContextMenuLinkItemProps } from "./context-menu.link-item.jsx";
import type { ContextMenuRadioGroupProps } from "./context-menu.radio-group.jsx";
import type { ContextMenuRadioItemProps } from "./context-menu.radio-item.jsx";
import type { ContextMenuSubmenuRootProps } from "./context-menu.submenu-root.jsx";
import type { ContextMenuSubmenuTriggerProps } from "./context-menu.submenu-trigger.jsx";

/**
 * {@link ContextMenuRoot} を命令的に操作するためのオブジェクトです。
 */
export type ContextMenuRootActions = ContextMenu.Root.Actions;

/**
 * {@link ContextMenuRoot} の開閉状態を変更されるイベントの詳細です。
 */
export type ContextMenuRootChangeEventDetails = ContextMenu.Root.ChangeEventDetails;

/**
 * {@link ContextMenuRoot} の開閉状態が変更される理由です。
 */
export type ContextMenuRootChangeEventReason = ContextMenu.Root.ChangeEventReason;

/**
 * {@link ContextMenuRoot} の向きです。
 */
export type ContextMenuRootOrientation = Menu.Root.Orientation;

namespace ContextMenuRootLabeledItemObject {
  export type BaseUI = Omit<ContextMenuItemProps, "children" | keyof SuruUI>;

  export type SuruUI = {
    /**
     * 項目のラベルです。
     */
    readonly label: ContextMenuItemProps["children"];

    /**
     * 項目の種類です。
     */
    readonly type?: "item" | undefined;
  };
}

export type ContextMenuRootLabeledItemObject = ContextMenuRootLabeledItemObject.SuruUI &
  ContextMenuRootLabeledItemObject.BaseUI;

namespace ContextMenuRootLinkItemObject {
  export type BaseUI = Omit<ContextMenuLinkItemProps, "children" | keyof SuruUI>;

  export type SuruUI = {
    /**
     * 項目のラベルです。
     */
    readonly label: ContextMenuLinkItemProps["children"];

    /**
     * 項目の種類です。
     */
    readonly type: "link";
  };
}

export type ContextMenuRootLinkItemObject = ContextMenuRootLinkItemObject.SuruUI &
  ContextMenuRootLinkItemObject.BaseUI;

namespace ContextMenuRootCheckboxItemObject {
  export type BaseUI = Omit<ContextMenuCheckboxItemProps, "children" | keyof SuruUI>;

  export type SuruUI = {
    /**
     * 項目のラベルです。
     */
    readonly label: ContextMenuCheckboxItemProps["children"];

    /**
     * 項目の種類です。
     */
    readonly type: "checkbox";
  };
}

export type ContextMenuRootCheckboxItemObject = ContextMenuRootCheckboxItemObject.SuruUI &
  ContextMenuRootCheckboxItemObject.BaseUI;

namespace ContextMenuRootRadioItemObject {
  export type BaseUI = Omit<ContextMenuRadioItemProps, "children" | keyof SuruUI>;

  export type SuruUI = {
    /**
     * 項目のラベルです。
     */
    readonly label: ContextMenuRadioItemProps["children"];
  };
}

export type ContextMenuRootRadioItemObject = ContextMenuRootRadioItemObject.SuruUI &
  ContextMenuRootRadioItemObject.BaseUI;

namespace ContextMenuRootRadioItemObjectGroup {
  // 型引数 TItem は SuruUI.items によって上書きされ、children は削除されるため、指定不要です。
  export type BaseUI = Omit<ContextMenuRadioGroupProps, "children" | keyof SuruUI>;

  export type SuruUI = {
    /**
     * ラジオ項目です。
     */
    readonly items: readonly ContextMenuRootRadioItemObject[];

    /**
     * 項目の種類です。
     */
    readonly type: "radio-group";
  };
}

export type ContextMenuRootRadioItemObjectGroup = ContextMenuRootRadioItemObjectGroup.SuruUI &
  ContextMenuRootRadioItemObjectGroup.BaseUI;

namespace ContextMenuRootSubmenuItemObject {
  // 型引数 TItem は SuruUI.items によって上書きされ、children は削除されるため、指定不要です。
  export type BaseUI = Omit<ContextMenuSubmenuRootProps, "children" | keyof SuruUI>;

  export type SuruUI = {
    /**
     * 子項目です。
     */
    readonly items: readonly ContextMenuRootItemObject[];

    /**
     * 項目のラベルです。
     */
    readonly label: ContextMenuSubmenuTriggerProps["children"];

    /**
     * 項目の種類です。
     */
    readonly type: "submenu";
  };
}

export type ContextMenuRootSubmenuItemObject = ContextMenuRootSubmenuItemObject.SuruUI &
  ContextMenuRootSubmenuItemObject.BaseUI;

export type ContextMenuRootGroupedItemObject =
  | ContextMenuRootLabeledItemObject
  | ContextMenuRootLinkItemObject
  | ContextMenuRootCheckboxItemObject
  | ContextMenuRootRadioItemObjectGroup
  | ContextMenuRootSubmenuItemObject;

namespace ContextMenuRootItemObjectGroup {
  export type BaseUI = Omit<ContextMenuGroupProps, "children" | keyof SuruUI>;

  export type SuruUI = {
    /**
     * 子項目です。
     */
    readonly items: readonly ContextMenuRootGroupedItemObject[];

    /**
     * グループのラベルです。
     */
    readonly label?: ContextMenuGroupLabelProps["children"];

    /**
     * 項目の種類です。
     */
    readonly type?: "group" | undefined;
  };
}

export type ContextMenuRootItemObjectGroup = ContextMenuRootItemObjectGroup.SuruUI &
  ContextMenuRootItemObjectGroup.BaseUI;

/**
 * {@link ContextMenuRoot} の各項目です。
 */
export type ContextMenuRootItemObject =
  | ContextMenuRootLabeledItemObject
  | ContextMenuRootLinkItemObject
  | ContextMenuRootCheckboxItemObject
  | ContextMenuRootRadioItemObjectGroup
  | ContextMenuRootSubmenuItemObject
  | ContextMenuRootItemObjectGroup;

/**
 * コンテキストメニューの角丸です。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type ContextMenuRootRadius = "none" | Size;

/**
 * コンテキストメニューの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type ContextMenuRootSize = Size;

/**
 * コンテキストメニューの項目の主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type ContextMenuRootVariant = Button.Root.Variant;

/**
 * {@link ContextMenuRoot} が持つ状態です。
 */
export type ContextMenuRootState = ContextMenu.Root.State;

export namespace ContextMenuRootProps {
  export type Render = {};

  export type SuruUI<TItem = any> = {
    /**
     * コンテキストメニューの項目です。
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
     * 既定値は {@link ContextMenuRootProps.size|size} です。
     */
    radius?: ContextMenuRootRadius | undefined;

    /**
     * ポップアップと項目の大きさを指定します。
     *
     * @default "md"
     */
    size?: ContextMenuRootSize | undefined;

    /**
     * 項目の主な外観を指定します。
     *
     * @default "naked"
     */
    variant?: ContextMenuRootVariant | undefined;
  };

  export type BaseUI = Pick<
    React.ComponentProps<typeof ContextMenu.Root>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MenuRootProps:
      | "defaultOpen"
      | "loopFocus"
      | "highlightItemOnHover"
      | "onOpenChangeComplete"
      | "open"
      | "orientation"
      | "disabled"
      | "closeParentOnEsc"
      | "actionsRef"
      | "onOpenChange"
      | "children",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof ContextMenu.Root>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ContextMenuRoot} に渡す props です。
 *
 * @template TItem 項目の型です。
 */
export type ContextMenuRootProps<TItem = any> = ContextMenuRootProps.Render &
  ContextMenuRootProps.SuruUI<TItem> &
  ContextMenuRootProps.BaseUI &
  ContextMenuRootProps.HTML;

interface IContextMenuRoot extends IComponent<ContextMenuRootProps> {
  /**
   * @template TItem 項目の型です。
   */
  <TItem = any>(props: ContextMenuRootProps<TItem>): IComponent.Return;
}

/**
 * 右クリックまたは長押しで開くコンテキストメニューのルートです。
 *
 * 開閉状態を管理し、各パーツをグループ化します。
 * それ自身は HTML 要素をレンダリングしません。
 */
export const ContextMenuRoot: IContextMenuRoot = function SuiContextMenuRoot(
  props: ContextMenuRootProps,
) {
  const {
    size = "md",
    items = [],
    radius = size,
    variant = "naked",
    outlined = false,
    ...otherProps
  } = props;
  const ctx = React.useMemo<ContextMenuContext>(
    () => ({ size, depth: 1, items, radius, variant, outlined }),
    [size, items, radius, variant, outlined],
  );

  return (
    <ContextMenuContext value={ctx}>
      <ContextMenu.Root {...otherProps} />
    </ContextMenuContext>
  );
};

export { ContextMenuRoot as Root };

export namespace Root {
  export type State = ContextMenuRootState;

  export type Props<TItem = any> = Props.Render & Props.SuruUI<TItem> & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ContextMenuRootProps.Render;

    export type SuruUI<TItem = any> = ContextMenuRootProps.SuruUI<TItem>;

    export type BaseUI = ContextMenuRootProps.BaseUI;

    export type HTML = ContextMenuRootProps.HTML;
  }

  export type Actions = ContextMenuRootActions;

  export type ChangeEventDetails = ContextMenuRootChangeEventDetails;

  export type ChangeEventReason = ContextMenuRootChangeEventReason;

  export type Orientation = ContextMenuRootOrientation;

  export type Radius = ContextMenuRootRadius;

  export type Size = ContextMenuRootSize;

  export type Variant = ContextMenuRootVariant;
}
