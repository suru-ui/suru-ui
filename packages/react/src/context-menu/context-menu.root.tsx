import { ContextMenu } from "@base-ui/react/context-menu";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import * as Button from "../button/button.parts.js";
import type { IComponent } from "../types.js";
import type { ContextMenuCheckboxItemProps } from "./context-menu.checkbox-item.jsx";
import { ContextMenuContext } from "./context-menu.context.js";
import type { ContextMenuGroupProps } from "./context-menu.group.jsx";
import type { ContextMenuItemProps } from "./context-menu.item.jsx";
import type { ContextMenuLinkItemProps } from "./context-menu.link-item.jsx";
import type { ContextMenuRadioGroupProps } from "./context-menu.radio-group.jsx";
import type { ContextMenuRadioItemProps } from "./context-menu.radio-item.jsx";
import type { ContextMenuSeparatorProps } from "./context-menu.separator.jsx";

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
 * {@link ContextMenuRoot} の通常項目です。
 *
 * `label` を含み、その他のプロパティーは {@link ContextMenuItem} に渡されます。
 * `items` を指定した場合はサブメニューとして描画されます。
 */
export type ContextMenuRootActionItemObject = Omit<ContextMenuItemProps, "children" | "label"> & {
  /**
   * 項目のラベルです。
   */
  readonly label: React.ReactNode;

  /**
   * 子項目です。
   *
   * 指定した場合はサブメニューとして描画されます。
   */
  readonly items?: readonly ContextMenuRootItemObject[] | undefined;

  /**
   * 項目の種類です。
   *
   * - `"item"`: 通常項目
   * - `"submenu"`: サブメニュー
   */
  readonly type?: "item" | "submenu" | undefined;
};

/**
 * {@link ContextMenuRoot} のチェックボックス項目です。
 *
 * `label` を含み、その他のプロパティーは {@link ContextMenuCheckboxItem} に渡されます。
 */
export type ContextMenuRootCheckboxItemObject = Omit<
  ContextMenuCheckboxItemProps,
  "children" | "label"
> & {
  /**
   * 項目のラベルです。
   */
  readonly label: React.ReactNode;

  /**
   * 項目の種類です。
   *
   * - `"checkbox"`: チェックボックス項目
   */
  readonly type: "checkbox";
};

/**
 * {@link ContextMenuRoot} のグループです。
 *
 * `label` と `items` を含み、その他のプロパティーは {@link ContextMenuGroup} に渡されます。
 * `label` を指定した場合は {@link ContextMenuGroupLabel} として描画されます。
 * 子項目には {@link ContextMenuRootItemObject} を指定します。
 */
export type ContextMenuRootGroupObject = Omit<ContextMenuGroupProps, "children"> & {
  /**
   * 子項目です。
   */
  readonly items: readonly ContextMenuRootItemObject[];

  /**
   * 項目の種類です。
   *
   * - `"group"`: グループ
   */
  readonly type: "group";

  /**
   * グループのラベルです。
   *
   * 指定した場合は {@link ContextMenuGroupLabel} として描画されます。
   */
  readonly label?: React.ReactNode | undefined;
};

/**
 * {@link ContextMenuRoot} のリンク項目です。
 *
 * `label` を含み、その他のプロパティーは {@link ContextMenuLinkItem} に渡されます。
 */
export type ContextMenuRootLinkItemObject = Omit<ContextMenuLinkItemProps, "children" | "label"> & {
  /**
   * 項目のラベルです。
   */
  readonly label: React.ReactNode;

  /**
   * 項目の種類です。
   *
   * - `"link"`: リンク項目
   */
  readonly type: "link";
};

/**
 * {@link ContextMenuRoot} のラジオグループです。
 *
 * `items` を含み、その他のプロパティーは {@link ContextMenuRadioGroup} に渡されます。
 * 子項目には {@link ContextMenuRootRadioItemObject} を指定します。
 */
export type ContextMenuRootRadioGroupObject = Omit<ContextMenuRadioGroupProps, "children"> & {
  /**
   * ラジオ項目です。
   */
  readonly items: readonly ContextMenuRootRadioItemObject[];

  /**
   * 項目の種類です。
   *
   * - `"radio-group"`: ラジオグループ
   */
  readonly type: "radio-group";
};

/**
 * {@link ContextMenuRoot} のラジオ項目です。
 *
 * `label` と `value` を含み、その他のプロパティーは {@link ContextMenuRadioItem} に渡されます。
 * 単体では選択状態を保持できないため、`items` ではなく {@link ContextMenuRootRadioGroupObject} の子項目として指定します。
 */
export type ContextMenuRootRadioItemObject = Omit<
  ContextMenuRadioItemProps,
  "children" | "label"
> & {
  /**
   * 項目のラベルです。
   */
  readonly label: React.ReactNode;

  /**
   * 項目の種類です。
   *
   * - `"radio"`: ラジオ項目
   */
  readonly type: "radio";
};

/**
 * {@link ContextMenuRoot} の区切り線です。
 *
 * その他のプロパティーは {@link ContextMenuSeparator} に渡されます。
 */
export type ContextMenuRootSeparatorObject = Omit<ContextMenuSeparatorProps, "children"> & {
  /**
   * 項目の種類です。
   *
   * - `"separator"`: 区切り線
   */
  readonly type: "separator";
};

/**
 * {@link ContextMenuRoot} の各項目です。
 *
 * `type` によって通常項目、チェックボックス項目、グループ、リンク項目、ラジオ項目、ラジオグループ、区切り線を使い分けます。
 * `type` を省略した場合は通常項目として描画されます。
 */
export type ContextMenuRootItemObject =
  | ContextMenuRootActionItemObject
  | ContextMenuRootCheckboxItemObject
  | ContextMenuRootGroupObject
  | ContextMenuRootLinkItemObject
  | ContextMenuRootRadioGroupObject
  | ContextMenuRootRadioItemObject
  | ContextMenuRootSeparatorObject;

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
  export type Render = RenderProps<ContextMenuRootState>;

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
      // ContextMenuRootProps:
      | "open"
      | "defaultOpen"
      | "disabled"
      | "loopFocus"
      | "highlightItemOnHover"
      | "orientation"
      | "closeParentOnEsc"
      | "actionsRef"
      | "onOpenChange"
      | "onOpenChangeComplete",
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
    () => ({ size, items, radius, variant, outlined }),
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

  export type ActionItemObject = ContextMenuRootActionItemObject;

  export type Actions = ContextMenuRootActions;

  export type ChangeEventDetails = ContextMenuRootChangeEventDetails;

  export type ChangeEventReason = ContextMenuRootChangeEventReason;

  export type CheckboxItemObject = ContextMenuRootCheckboxItemObject;

  export type GroupObject = ContextMenuRootGroupObject;

  export type ItemObject = ContextMenuRootItemObject;

  export type LinkItemObject = ContextMenuRootLinkItemObject;

  export type RadioGroupObject = ContextMenuRootRadioGroupObject;

  export type RadioItemObject = ContextMenuRootRadioItemObject;

  export type Radius = ContextMenuRootRadius;

  export type SeparatorObject = ContextMenuRootSeparatorObject;

  export type Size = ContextMenuRootSize;

  export type Variant = ContextMenuRootVariant;
}
