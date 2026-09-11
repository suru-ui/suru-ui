import { Menu } from "@base-ui/react/menu";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import { CheckIcon, ChevronRightIcon } from "../_icons.jsx";
import mergeProps from "../_merge-props.js";
import proxyRenderProps from "../_proxy-render-props.js";
import toReactNode from "../_to-react-node.js";
import type { RenderProps } from "../_use-render.js";
import * as Button from "../button/button.parts.jsx";
import cn from "../cn.js";
import { ContextMissingError } from "../errors.js";
import type { Override, IComponent, IUseContext } from "../types.js";
import {
  isItemObject,
  isGroupObject,
  isLinkItemObject,
  isRadioItemObject,
  isSeparatorObject,
  isRadioGroupObject,
  isCheckboxItemObject,
} from "./_menu.jsx";

import "./menu.css";

// Context
// -------

/**
 * ポップアップと項目の角丸です。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
type MenuContextRadius = "none" | Size;

/**
 * ポップアップと項目の大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
type MenuContextSize = Size;

/**
 * 項目の主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
type MenuContextVariant = Button.Root.Variant;

/**
 * {@link MenuRoot} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type MenuContext<TItem = any> = {
  /**
   * メニューの項目です。
   */
  readonly items: readonly TItem[];

  /**
   * ポップアップに枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * ポップアップと項目の角丸です。
   */
  readonly radius: MenuContextRadius;

  /**
   * ポップアップと項目の大きさです。
   */
  readonly size: MenuContextSize;

  /**
   * 項目の主な外観です。
   */
  readonly variant: MenuContextVariant;
};

/**
 * メニューのスタイルを子要素へ伝播するコンテキストです。
 */
export const MenuContext: React.Context<MenuContext | null> =
  React.createContext<MenuContext | null>(null);

function useSuiMenuContext(optional?: false): MenuContext;
function useSuiMenuContext(optional?: boolean): MenuContext | null;
function useSuiMenuContext(optional?: boolean): MenuContext | null {
  const ctx = React.use(MenuContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "MenuContext",
      providerName: "MenuRoot",
    });
  }

  return ctx;
}

/**
 * {@link MenuContext} を読み取るフックです。
 */
export const useMenuContext: IUseContext<MenuContext> = useSuiMenuContext;

export { MenuContext as Context, useMenuContext as useContext };

export namespace Context {
  /**
   * {@link MenuContextRadius}
   */
  export type Radius = MenuContextRadius;

  /**
   * {@link MenuContextSize}
   */
  export type Size = MenuContextSize;

  /**
   * {@link MenuContextVariant}
   */
  export type Variant = MenuContextVariant;
}

// Handle
// ------

/**
 * メニューを制御するハンドルです。
 */
export type MenuHandle<TPayload = unknown> = Menu.Handle<TPayload>;

/**
 * メニューを制御するハンドルを新しく作成します。
 *
 * 作成したハンドルを {@link Root} と {@link Trigger} の `handle` props に渡すことで、トリガーとメニューの内容を関連付けます。
 */
export const createHandle: typeof Menu.createHandle = Menu.createHandle;

// Root
// ----

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

/**
 * {@link MenuRoot} の通常項目です。
 *
 * `label` を含み、その他の props は {@link MenuItem} に渡されます。
 * `items` を指定した場合はサブメニューとして描画されます。
 */
export type MenuRootActionItemObject = Omit<MenuItemProps, "children" | "label"> & {
  /**
   * 子項目です。
   *
   * 指定した場合はサブメニューとして描画されます。
   */
  readonly items?: readonly MenuRootItemObject[] | undefined;

  /**
   * 項目のラベルです。
   */
  readonly label: React.ReactNode;

  /**
   * 項目の種類です。
   *
   * - `"item"`: 通常項目
   * - `"submenu"`: サブメニュー
   */
  readonly type?: "item" | "submenu" | undefined;
};

/**
 * {@link MenuRoot} のチェックボックス項目です。
 *
 * `label` を含み、その他の props は {@link MenuCheckboxItem} に渡されます。
 */
export type MenuRootCheckboxItemObject = Omit<MenuCheckboxItemProps, "children" | "label"> & {
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
 * {@link MenuRoot} のグループです。
 *
 * `label` と `items` を含み、その他の props は {@link MenuGroup} に渡されます。
 * `label` を指定した場合は {@link MenuGroupLabel} として描画されます。
 * 子項目には {@link MenuRootItemObject} を指定します。
 */
export type MenuRootGroupObject = Omit<MenuGroupProps, "children"> & {
  /**
   * 子項目です。
   */
  readonly items: readonly MenuRootItemObject[];

  /**
   * グループのラベルです。
   *
   * 指定した場合は {@link MenuGroupLabel} として描画されます。
   */
  readonly label?: React.ReactNode | undefined;

  /**
   * 項目の種類です。
   *
   * - `"group"`: グループ
   */
  readonly type: "group";
};

/**
 * {@link MenuRoot} のリンク項目です。
 *
 * `label` を含み、その他の props は {@link MenuLinkItem} に渡されます。
 */
export type MenuRootLinkItemObject = Omit<MenuLinkItemProps, "children" | "label"> & {
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
 * {@link MenuRoot} のラジオグループです。
 *
 * `items` を含み、その他の props は {@link MenuRadioGroup} に渡されます。
 * 子項目には {@link MenuRootRadioItemObject} を指定します。
 */
export type MenuRootRadioGroupObject = Omit<MenuRadioGroupProps, "children"> & {
  /**
   * ラジオ項目です。
   */
  readonly items: readonly MenuRootRadioItemObject[];

  /**
   * 項目の種類です。
   *
   * - `"radio-group"`: ラジオグループ
   */
  readonly type: "radio-group";
};

/**
 * {@link MenuRoot} のラジオ項目です。
 *
 * `label` と `value` を含み、その他の props は {@link MenuRadioItem} に渡されます。
 * 単体では選択状態を保持できないため、`items` ではなく {@link MenuRootRadioGroupObject} の子項目として指定します。
 */
export type MenuRootRadioItemObject = Omit<MenuRadioItemProps, "children" | "label"> & {
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
 * {@link MenuRoot} の区切り線です。
 *
 * その他の props は {@link MenuSeparator} に渡されます。
 */
export type MenuRootSeparatorObject = Omit<MenuSeparatorProps, "children"> & {
  /**
   * 項目の種類です。
   *
   * - `"separator"`: 区切り線
   */
  readonly type: "separator";
};

/**
 * {@link MenuRoot} の各項目です。
 *
 * `type` によって通常項目、チェックボックス項目、グループ、リンク項目、ラジオ項目、ラジオグループ、区切り線を使い分けます。
 * `type` を省略した場合は通常項目として描画されます。
 */
export type MenuRootItemObject =
  | MenuRootActionItemObject
  | MenuRootCheckboxItemObject
  | MenuRootGroupObject
  | MenuRootLinkItemObject
  | MenuRootRadioGroupObject
  | MenuRootRadioItemObject
  | MenuRootSeparatorObject;

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

/**
 * {@link MenuRoot} に渡す props です。
 *
 * @template TPayload 開いたときに渡される値の型です。
 * @template TItem 項目の型です。
 */
export type MenuRootProps<TPayload = unknown, TItem = any> = Omit<
  Menu.Root.Props<TPayload>,
  "handle"
> & {
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

interface IMenuRoot extends IComponent<MenuRootProps> {
  /**
   * @template TPayload 開いたときに渡される値の型です。
   * @template TItem 項目の型です。
   */
  <TPayload = unknown, TItem = any>(props: MenuRootProps<TPayload, TItem>): IComponent.Return;
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
  /**
   * {@link MenuRootState}
   */
  export type State = MenuRootState;

  /**
   * {@link MenuRootProps}
   */
  export type Props<TPayload = unknown, TItem = any> = MenuRootProps<TPayload, TItem>;

  /**
   * {@link MenuRootActionItemObject}
   */
  export type ActionItemObject = MenuRootActionItemObject;

  /**
   * {@link MenuRootActions}
   */
  export type Actions = MenuRootActions;

  /**
   * {@link MenuRootChangeEventDetails}
   */
  export type ChangeEventDetails = MenuRootChangeEventDetails;

  /**
   * {@link MenuRootChangeEventReason}
   */
  export type ChangeEventReason = MenuRootChangeEventReason;

  /**
   * {@link MenuRootCheckboxItemObject}
   */
  export type CheckboxItemObject = MenuRootCheckboxItemObject;

  /**
   * {@link MenuRootGroupObject}
   */
  export type GroupObject = MenuRootGroupObject;

  /**
   * {@link MenuRootItemObject}
   */
  export type ItemObject = MenuRootItemObject;

  /**
   * {@link MenuRootLinkItemObject}
   */
  export type LinkItemObject = MenuRootLinkItemObject;

  /**
   * {@link MenuRootOrientation}
   */
  export type Orientation = MenuRootOrientation;

  /**
   * {@link MenuRootRadioGroupObject}
   */
  export type RadioGroupObject = MenuRootRadioGroupObject;

  /**
   * {@link MenuRootRadioItemObject}
   */
  export type RadioItemObject = MenuRootRadioItemObject;

  /**
   * {@link MenuRootRadius}
   */
  export type Radius = MenuRootRadius;

  /**
   * {@link MenuRootSeparatorObject}
   */
  export type SeparatorObject = MenuRootSeparatorObject;

  /**
   * {@link MenuRootSize}
   */
  export type Size = MenuRootSize;

  /**
   * {@link MenuRootVariant}
   */
  export type Variant = MenuRootVariant;
}

// Trigger
// -------

/**
 * {@link MenuTrigger} が持つ状態です。
 */
export type MenuTriggerState = Menu.Trigger.State;

/**
 * {@link MenuTrigger} に渡す props です。
 *
 * @template TPayload 開いたときに渡される値の型です。
 */
export type MenuTriggerProps<TPayload = unknown> = Omit<
  Menu.Trigger.Props<TPayload>,
  "handle" | "children" | "render"
> & {
  /**
   * トリガーとしてレンダリングする要素です。
   *
   * {@link Menu.Trigger} の `render` props と同じ型で、そのまま `render` に渡されます。
   */
  children: NonNullable<Menu.Trigger.Props<TPayload>["render"]>;

  /**
   * メニュー ({@link Root}) を関連付けるハンドルです。
   *
   * {@link createHandle} で作成し、{@link Root} と共有します。Root 内に配置する場合は省略できます。
   */
  handle?: MenuHandle<TPayload> | undefined;
};

interface IMenuTrigger extends IComponent<MenuTriggerProps> {
  /**
   * @template TPayload 開いたときに渡される値の型です。
   */
  <TPayload = unknown>(props: MenuTriggerProps<TPayload>): IComponent.Return;
}

/**
 * メニューを開くトリガーです。
 *
 * 子要素は追加のラッパーなしで `button` 要素に表示されます。
 */
export const MenuTrigger: IMenuTrigger = function SuiMenuTrigger(props: MenuTriggerProps) {
  const { handle, children, className, ...otherProps } = props;

  return (
    <Menu.Trigger
      {...otherProps}
      handle={handle}
      render={children}
      className={cn(
        className,
        "sui_menu_trigger",
        (state) => state.open && "sui_menu_trigger-open",
        (state) => state.disabled && "sui_menu_trigger-disabled",
      )}
    />
  );
};

export { MenuTrigger as Trigger };

export namespace Trigger {
  /**
   * {@link MenuTriggerState}
   */
  export type State = MenuTriggerState;

  /**
   * {@link MenuTriggerProps}
   */
  export type Props<TPayload = unknown> = MenuTriggerProps<TPayload>;
}

// Portal
// ------

/**
 * {@link MenuPortal} が持つ状態です。
 */
export type MenuPortalState = Menu.Portal.State;

/**
 * {@link MenuPortal} に渡す props です。
 */
export type MenuPortalProps = React.ComponentProps<typeof Menu.Portal>;

/**
 * メニューを DOM の別の場所へ移動する要素です。
 *
 * 既定ではポップアップを `<body>` の末尾に配置します。
 */
export const MenuPortal: IComponent<MenuPortalProps> = function SuiMenuPortal(props) {
  const { size, radius, outlined } = useMenuContext();
  const {
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;

  return (
    <Menu.Portal
      {...otherProps}
      className={cn(
        className,
        "sui_menu_portal",
        `sui_menu_portal-size_${size}`,
        `sui_menu_portal-radius_${radius}`,
        outlined && "sui_menu_portal-outlined",
      )}
      data-scope={dataScope}
    />
  );
};

export { MenuPortal as Portal };

export namespace Portal {
  /**
   * {@link MenuPortalState}
   */
  export type State = MenuPortalState;

  /**
   * {@link MenuPortalProps}
   */
  export type Props = MenuPortalProps;
}

// Backdrop
// --------

/**
 * {@link MenuBackdrop} が持つ状態です。
 */
export type MenuBackdropState = Menu.Backdrop.State;

/**
 * {@link MenuBackdrop} に渡す props です。
 */
export type MenuBackdropProps = React.ComponentProps<typeof Menu.Backdrop>;

/**
 * メニューの背後に表示されるオーバーレイ要素です。
 */
export const MenuBackdrop: IComponent<MenuBackdropProps> = function SuiMenuBackdrop(props) {
  const { className, ...otherProps } = props;

  return <Menu.Backdrop {...otherProps} className={cn(className, "sui_menu_backdrop")} />;
};

export { MenuBackdrop as Backdrop };

export namespace Backdrop {
  /**
   * {@link MenuBackdropState}
   */
  export type State = MenuBackdropState;

  /**
   * {@link MenuBackdropProps}
   */
  export type Props = MenuBackdropProps;
}

// Positioner
// ----------

/**
 * {@link MenuPositioner} が持つ状態です。
 */
export type MenuPositionerState = Menu.Positioner.State;

/**
 * {@link MenuPositioner} に渡す props です。
 */
export type MenuPositionerProps = React.ComponentProps<typeof Menu.Positioner>;

/**
 * ポップアップをトリガーに位置合わせする要素です。
 */
export const MenuPositioner: IComponent<MenuPositionerProps> = function SuiMenuPositioner(props) {
  const { className, ...otherProps } = props;

  return <Menu.Positioner {...otherProps} className={cn(className, "sui_menu_positioner")} />;
};

export { MenuPositioner as Positioner };

export namespace Positioner {
  /**
   * {@link MenuPositionerState}
   */
  export type State = MenuPositionerState;

  /**
   * {@link MenuPositionerProps}
   */
  export type Props = MenuPositionerProps;
}

// Popup
// -----

/**
 * ポップアップの各項目をレンダリングする関数のインターフェイスです。
 *
 * @template TItem 項目の型です。
 */
export interface IMenuPopupItemRenderer<TItem = any> {
  /**
   * 項目をレンダリングします。
   *
   * @param item 現在の項目です。
   * @param index 項目のインデックスです。
   * @param items すべての項目です。
   * @returns レンダリングする内容です。
   */
  (item: TItem, index: number, items: readonly TItem[]): React.ReactNode;
}

/**
 * {@link MenuPopup} が持つ状態です。
 */
export type MenuPopupState = Menu.Popup.State;

/**
 * {@link MenuPopup} に渡す props です。
 */
export type MenuPopupProps = Omit<React.ComponentProps<typeof Menu.Popup>, "children"> & {
  /**
   * ポップアップの内容、または各項目をレンダリングする関数です。
   *
   * 関数を指定した場合は {@link MenuRootProps.items|items} の各項目が引数として渡されます。
   */
  children?: React.ReactNode | IMenuPopupItemRenderer;
};

/**
 * メニュー項目を表示するポップアップ要素です。
 */
export const MenuPopup: IComponent<MenuPopupProps> = function SuiMenuPopup(props) {
  const ctx = useMenuContext();
  const { children = defaultPopupItemRenderer, className, ...otherProps } = props;

  return (
    <Menu.Popup
      {...otherProps}
      className={cn(
        className,
        "sui_menu_popup",
        (state) =>
          state.transitionStatus !== undefined &&
          `sui_menu_popup-transition_status_${state.transitionStatus}`,
      )}
    >
      {typeof children === "function" ? ctx.items.map(children) : children}
    </Menu.Popup>
  );
};

const defaultRadioItemRenderer: IMenuPopupItemRenderer = (item, index) => {
  if (!isRadioItemObject(item)) {
    return toReactNode(item);
  }

  const { type: _, label, ...otherItemProps } = item;

  return (
    <MenuRadioItem key={index} {...otherItemProps}>
      {toReactNode(label)}
      <MenuRadioItemIndicator>
        <CheckIcon />
      </MenuRadioItemIndicator>
    </MenuRadioItem>
  );
};

const defaultPopupItemRenderer: IMenuPopupItemRenderer = (item, index, items) => {
  if (isSeparatorObject(item)) {
    const { type: _, ...otherProps } = item;

    return <MenuSeparator key={index} {...otherProps} />;
  }

  if (isRadioGroupObject(item)) {
    const { type: _, items: radioItems, ...otherGroupProps } = item;

    return (
      <MenuRadioGroup key={index} {...otherGroupProps}>
        {radioItems.map(defaultRadioItemRenderer)}
      </MenuRadioGroup>
    );
  }

  if (isGroupObject(item)) {
    const { type: _, items: groupItems, label, ...otherGroupProps } = item;
    const labelNode = toReactNode(label);

    return (
      <MenuGroup key={index} {...otherGroupProps}>
        {labelNode === null ? null : <MenuGroupLabel>{labelNode}</MenuGroupLabel>}
        {groupItems.map(defaultPopupItemRenderer)}
      </MenuGroup>
    );
  }

  if (!isItemObject(item)) {
    return toReactNode(item);
  }

  if (isCheckboxItemObject(item)) {
    const { type: _, label, ...otherItemProps } = item;

    return (
      <MenuCheckboxItem key={index} {...otherItemProps}>
        {toReactNode(label)}
        <MenuCheckboxItemIndicator>
          <CheckIcon />
        </MenuCheckboxItemIndicator>
      </MenuCheckboxItem>
    );
  }

  if (isRadioItemObject(item)) {
    return defaultRadioItemRenderer(item, index, items);
  }

  if (isLinkItemObject(item)) {
    const { type: _, label, ...otherItemProps } = item;

    return (
      <MenuLinkItem key={index} {...otherItemProps}>
        {toReactNode(label)}
      </MenuLinkItem>
    );
  }

  const { type: _, items: subItems, label, ...otherItemProps } = item;
  if (!subItems) {
    return (
      <MenuItem key={index} {...otherItemProps}>
        {toReactNode(label)}
      </MenuItem>
    );
  }

  return (
    <MenuSubmenuRoot key={index}>
      <MenuSubmenuTrigger {...otherItemProps}>
        {toReactNode(label)}
        <ChevronRightIcon />
      </MenuSubmenuTrigger>
      <MenuPortal>
        <MenuPositioner>
          <MenuPopup>{subItems.map(defaultPopupItemRenderer)}</MenuPopup>
        </MenuPositioner>
      </MenuPortal>
    </MenuSubmenuRoot>
  );
};

export { MenuPopup as Popup };

export namespace Popup {
  /**
   * {@link MenuPopupState}
   */
  export type State = MenuPopupState;

  /**
   * {@link MenuPopupProps}
   */
  export type Props = MenuPopupProps;

  /**
   * {@link MenuRootItemObject}
   */
  export type ItemObject = MenuRootItemObject;

  /**
   * {@link IMenuPopupItemRenderer}
   */
  export interface IItemRenderer<TItem = any> extends IMenuPopupItemRenderer<TItem> {}
}

// Arrow
// -----

/**
 * {@link MenuArrow} が持つ状態です。
 */
export type MenuArrowState = Menu.Arrow.State;

/**
 * {@link MenuArrow} に渡す props です。
 */
export type MenuArrowProps = React.ComponentProps<typeof Menu.Arrow>;

/**
 * ポップアップとトリガーをつなぐ矢印要素です。
 */
export const MenuArrow: IComponent<MenuArrowProps> = function SuiMenuArrow(props) {
  const { className, ...otherProps } = props;

  return <Menu.Arrow {...otherProps} className={cn(className, "sui_menu_arrow")} />;
};

export { MenuArrow as Arrow };

export namespace Arrow {
  /**
   * {@link MenuArrowState}
   */
  export type State = MenuArrowState;

  /**
   * {@link MenuArrowProps}
   */
  export type Props = MenuArrowProps;
}

// Viewport
// --------

/**
 * {@link MenuViewport} が持つ状態です。
 */
export type MenuViewportState = Menu.Viewport.State;

/**
 * {@link MenuViewport} に渡す props です。
 */
export type MenuViewportProps = React.ComponentProps<typeof Menu.Viewport>;

/**
 * トリガーの切り替えに伴うメニュー内容のアニメーション用ビューポートです。
 */
export const MenuViewport: IComponent<MenuViewportProps> = function SuiMenuViewport(props) {
  const { className, ...otherProps } = props;

  return <Menu.Viewport {...otherProps} className={cn(className, "sui_menu_viewport")} />;
};

export { MenuViewport as Viewport };

export namespace Viewport {
  /**
   * {@link MenuViewportState}
   */
  export type State = MenuViewportState;

  /**
   * {@link MenuViewportProps}
   */
  export type Props = MenuViewportProps;
}

// Item
// ----

/**
 * 項目の状態に応じた外観を返します。
 *
 * チェックされている場合は指定された外観を返し、それ以外の場合は `"naked"` を返します。
 *
 * @param state 項目の状態です。
 * @param variant チェック状態のときの外観です。
 * @returns 適用する外観です。
 */
function getItemVariant(state: object, variant: Button.Root.Variant): Button.Root.Variant {
  if ("checked" in state && state.checked === true) {
    return variant;
  }

  return "naked";
}

/**
 * メニューの操作項目の配色です。
 */
export type MenuItemColor = Button.Root.Color;

/**
 * メニューの操作項目の角丸です。
 */
export type MenuItemRadius = Button.Root.Radius;

/**
 * メニューの操作項目の主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type MenuItemVariant = Button.Root.Variant;

/**
 * {@link MenuItem} が持つ状態です。
 */
export type MenuItemState = Override<Button.Root.State, Menu.Item.State>;

/**
 * {@link MenuItem} に渡す props です。
 */
export type MenuItemProps = Override<
  Omit<Button.Root.Props, "type">,
  Override<React.ComponentProps<typeof Menu.Item>, RenderProps<MenuItemState>>
> & {
  /**
   * 項目の配色を指定します。
   *
   * @default "grey"
   */
  color?: MenuItemColor | undefined;

  /**
   * 項目の角丸を指定します。
   *
   * 既定値は {@link MenuRootProps.radius|radius} です。
   */
  radius?: MenuItemRadius | undefined;

  /**
   * チェック状態のときの外観を指定します。
   *
   * チェックされていないときは常に `"naked"` になります。
   *
   * 既定値は {@link MenuRootProps.variant|variant} です。
   */
  variant?: MenuItemVariant | undefined;
};

/**
 * メニューの操作項目です。
 */
export const MenuItem: IComponent<MenuItemProps> = function SuiMenuItem(props) {
  const ctx = useMenuContext();
  const {
    size = ctx.size,
    color = "grey",
    style,
    radius = ctx.radius,
    render,
    variant = ctx.variant,
    className,
    ...otherProps
  } = props;

  return (
    <Menu.Item
      {...otherProps}
      render={(htmlProps: {}, state) => (
        <Button.Root
          {...mergeProps<typeof Button.Root>([
            htmlProps,
            {
              item: true,
              size,
              color,
              radius,
              variant: getItemVariant(state, variant),
              disabled: state.disabled,
              nativeButton: false,
            },
            proxyRenderProps(state, {
              style,
              render: render ?? <div />,
              className: cn(
                className,
                "sui_menu_item",
                (state) => state.disabled && "sui_menu_item-disabled",
                (state) => state.highlighted && "sui_menu_item-highlighted",
              ),
            }),
          ])}
        />
      )}
    />
  );
};

export { MenuItem as Item };

export namespace Item {
  /**
   * {@link MenuItemState}
   */
  export type State = MenuItemState;

  /**
   * {@link MenuItemProps}
   */
  export type Props = MenuItemProps;

  /**
   * {@link MenuItemColor}
   */
  export type Color = MenuItemColor;

  /**
   * {@link MenuItemRadius}
   */
  export type Radius = MenuItemRadius;

  /**
   * {@link MenuItemVariant}
   */
  export type Variant = MenuItemVariant;
}

// LinkItem
// --------

/**
 * メニューのリンク項目の配色です。
 */
export type MenuLinkItemColor = Button.Root.Color;

/**
 * メニューのリンク項目の角丸です。
 */
export type MenuLinkItemRadius = Button.Root.Radius;

/**
 * メニューのリンク項目の主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type MenuLinkItemVariant = Button.Root.Variant;

/**
 * {@link MenuLinkItem} が持つ状態です。
 */
export type MenuLinkItemState = Override<Button.Root.State, Menu.LinkItem.State>;

/**
 * {@link MenuLinkItem} に渡す props です。
 */
export type MenuLinkItemProps = Override<
  Omit<Button.Root.Props, "type">,
  Override<React.ComponentProps<typeof Menu.LinkItem>, RenderProps<MenuLinkItemState>>
> & {
  /**
   * 項目の配色を指定します。
   *
   * @default "grey"
   */
  color?: MenuLinkItemColor | undefined;

  /**
   * 項目の角丸を指定します。
   *
   * 既定値は {@link MenuRootProps.radius|radius} です。
   */
  radius?: MenuLinkItemRadius | undefined;

  /**
   * チェック状態のときの外観を指定します。
   *
   * チェックされていないときは常に `"naked"` になります。
   *
   * 既定値は {@link MenuRootProps.variant|variant} です。
   */
  variant?: MenuLinkItemVariant | undefined;
};

/**
 * 別のページやセクションへ移動するメニュー項目です。
 */
export const MenuLinkItem: IComponent<MenuLinkItemProps> = function SuiMenuLinkItem(props) {
  const ctx = useMenuContext();
  const {
    size = ctx.size,
    color = "grey",
    style,
    radius = ctx.radius,
    render,
    variant = ctx.variant,
    className,
    ...otherProps
  } = props;

  return (
    <Menu.LinkItem
      {...otherProps}
      render={(htmlProps: {}, state) => (
        <Button.Root
          {...mergeProps<typeof Button.Root>([
            htmlProps,
            {
              item: true,
              size,
              color,
              radius,
              variant: getItemVariant(state, variant),
              nativeButton: false,
            },
            proxyRenderProps(state, {
              style,
              // oxlint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid
              render: render ?? <a />,
              className: cn(
                className,
                "sui_menu_item",
                "sui_menu_link_item",
                (state) => state.highlighted && "sui_menu_item-highlighted",
              ),
            }),
          ])}
        />
      )}
    />
  );
};

export { MenuLinkItem as LinkItem };

export namespace LinkItem {
  /**
   * {@link MenuLinkItemState}
   */
  export type State = MenuLinkItemState;

  /**
   * {@link MenuLinkItemProps}
   */
  export type Props = MenuLinkItemProps;

  /**
   * {@link MenuLinkItemColor}
   */
  export type Color = MenuLinkItemColor;

  /**
   * {@link MenuLinkItemRadius}
   */
  export type Radius = MenuLinkItemRadius;

  /**
   * {@link MenuLinkItemVariant}
   */
  export type Variant = MenuLinkItemVariant;
}

// SubmenuRoot
// -----------

/**
 * {@link MenuSubmenuRoot} の開閉状態を変更されるイベントの詳細です。
 */
export type MenuSubmenuRootChangeEventDetails = Menu.SubmenuRoot.ChangeEventDetails;

/**
 * {@link MenuSubmenuRoot} の開閉状態が変更される理由です。
 */
export type MenuSubmenuRootChangeEventReason = Menu.SubmenuRoot.ChangeEventReason;

/**
 * {@link MenuSubmenuRoot} が持つ状態です。
 */
export type MenuSubmenuRootState = Menu.SubmenuRoot.State;

/**
 * {@link MenuSubmenuRoot} に渡す props です。
 */
export type MenuSubmenuRootProps = React.ComponentProps<typeof Menu.SubmenuRoot>;

/**
 * サブメニューのルートです。
 *
 * それ自身は HTML 要素をレンダリングしません。
 */
export const MenuSubmenuRoot: IComponent<MenuSubmenuRootProps> = function SuiMenuSubmenuRoot(
  props,
) {
  return <Menu.SubmenuRoot {...props} />;
};

export { MenuSubmenuRoot as SubmenuRoot };

export namespace SubmenuRoot {
  /**
   * {@link MenuSubmenuRootState}
   */
  export type State = MenuSubmenuRootState;

  /**
   * {@link MenuSubmenuRootProps}
   */
  export type Props = MenuSubmenuRootProps;

  /**
   * {@link MenuSubmenuRootChangeEventDetails}
   */
  export type ChangeEventDetails = MenuSubmenuRootChangeEventDetails;

  /**
   * {@link MenuSubmenuRootChangeEventReason}
   */
  export type ChangeEventReason = MenuSubmenuRootChangeEventReason;
}

// SubmenuTrigger
// --------------

/**
 * サブメニュー項目の配色です。
 */
export type MenuSubmenuTriggerColor = Button.Root.Color;

/**
 * サブメニュー項目の角丸です。
 */
export type MenuSubmenuTriggerRadius = Button.Root.Radius;

/**
 * サブメニュー項目の主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type MenuSubmenuTriggerVariant = Button.Root.Variant;

/**
 * {@link MenuSubmenuTrigger} が持つ状態です。
 */
export type MenuSubmenuTriggerState = Override<Button.Root.State, Menu.SubmenuTrigger.State>;

/**
 * {@link MenuSubmenuTrigger} に渡す props です。
 */
export type MenuSubmenuTriggerProps = Override<
  Omit<Button.Root.Props, "type">,
  Override<React.ComponentProps<typeof Menu.SubmenuTrigger>, RenderProps<MenuSubmenuTriggerState>>
> & {
  /**
   * 項目の配色を指定します。
   *
   * @default "grey"
   */
  color?: MenuSubmenuTriggerColor | undefined;

  /**
   * 項目の角丸を指定します。
   *
   * 既定値は {@link MenuRootProps.radius|radius} です。
   */
  radius?: MenuSubmenuTriggerRadius | undefined;

  /**
   * チェック状態のときの外観を指定します。
   *
   * チェックされていないときは常に `"naked"` になります。
   *
   * 既定値は {@link MenuRootProps.variant|variant} です。
   */
  variant?: MenuSubmenuTriggerVariant | undefined;
};

/**
 * サブメニューを開くメニュー項目です。
 */
export const MenuSubmenuTrigger: IComponent<MenuSubmenuTriggerProps> =
  function SuiMenuSubmenuTrigger(props) {
    const ctx = useMenuContext();
    const {
      size = ctx.size,
      color = "grey",
      style,
      radius = ctx.radius,
      render,
      variant = ctx.variant,
      className,
      ...otherProps
    } = props;

    return (
      <Menu.SubmenuTrigger
        {...otherProps}
        render={(htmlProps: {}, state) => (
          <Button.Root
            {...mergeProps<typeof Button.Root>([
              htmlProps,
              {
                item: true,
                size,
                color,
                radius,
                variant: getItemVariant(state, variant),
                disabled: state.disabled,
                nativeButton: false,
              },
              proxyRenderProps(state, {
                style,
                render: render ?? <div />,
                className: cn(
                  className,
                  "sui_menu_item",
                  "sui_menu_submenu_trigger",
                  (state) => state.disabled && "sui_menu_item-disabled",
                  (state) => state.highlighted && "sui_menu_item-highlighted",
                  (state) => state.open && "sui_menu_item-open",
                ),
              }),
            ])}
          />
        )}
      />
    );
  };

export { MenuSubmenuTrigger as SubmenuTrigger };

export namespace SubmenuTrigger {
  /**
   * {@link MenuSubmenuTriggerState}
   */
  export type State = MenuSubmenuTriggerState;

  /**
   * {@link MenuSubmenuTriggerProps}
   */
  export type Props = MenuSubmenuTriggerProps;

  /**
   * {@link MenuSubmenuTriggerColor}
   */
  export type Color = MenuSubmenuTriggerColor;

  /**
   * {@link MenuSubmenuTriggerRadius}
   */
  export type Radius = MenuSubmenuTriggerRadius;

  /**
   * {@link MenuSubmenuTriggerVariant}
   */
  export type Variant = MenuSubmenuTriggerVariant;
}

// Group
// -----

/**
 * {@link MenuGroup} が持つ状態です。
 */
export type MenuGroupState = Menu.Group.State;

/**
 * {@link MenuGroup} に渡す props です。
 */
export type MenuGroupProps = React.ComponentProps<typeof Menu.Group>;

/**
 * 関連するメニュー項目をまとめるグループ要素です。
 */
export const MenuGroup: IComponent<MenuGroupProps> = function SuiMenuGroup(props) {
  const { className, ...otherProps } = props;

  return <Menu.Group {...otherProps} className={cn(className, "sui_menu_group")} />;
};

export { MenuGroup as Group };

export namespace Group {
  /**
   * {@link MenuGroupState}
   */
  export type State = MenuGroupState;

  /**
   * {@link MenuGroupProps}
   */
  export type Props = MenuGroupProps;
}

// GroupLabel
// ----------

/**
 * {@link MenuGroupLabel} が持つ状態です。
 */
export type MenuGroupLabelState = Menu.GroupLabel.State;

/**
 * {@link MenuGroupLabel} に渡す props です。
 */
export type MenuGroupLabelProps = React.ComponentProps<typeof Menu.GroupLabel>;

/**
 * グループに自動的に対応付けられるラベル要素です。
 */
export const MenuGroupLabel: IComponent<MenuGroupLabelProps> = function SuiMenuGroupLabel(props) {
  const { className, ...otherProps } = props;

  return <Menu.GroupLabel {...otherProps} className={cn(className, "sui_menu_group_label")} />;
};

export { MenuGroupLabel as GroupLabel };

export namespace GroupLabel {
  /**
   * {@link MenuGroupLabelState}
   */
  export type State = MenuGroupLabelState;

  /**
   * {@link MenuGroupLabelProps}
   */
  export type Props = MenuGroupLabelProps;
}

// RadioGroup
// ----------

/**
 * {@link MenuRadioGroup} の選択状態を変更されるイベントの詳細です。
 */
export type MenuRadioGroupChangeEventDetails = Menu.RadioGroup.ChangeEventDetails;

/**
 * {@link MenuRadioGroup} の選択状態が変更される理由です。
 */
export type MenuRadioGroupChangeEventReason = Menu.RadioGroup.ChangeEventReason;

/**
 * {@link MenuRadioGroup} が持つ状態です。
 */
export type MenuRadioGroupState = Menu.RadioGroup.State;

/**
 * {@link MenuRadioGroup} に渡す props です。
 */
export type MenuRadioGroupProps = React.ComponentProps<typeof Menu.RadioGroup>;

/**
 * ラジオ項目をまとめるグループ要素です。
 */
export const MenuRadioGroup: IComponent<MenuRadioGroupProps> = function SuiMenuRadioGroup(props) {
  const { className, ...otherProps } = props;

  return (
    <Menu.RadioGroup
      {...otherProps}
      className={cn(
        className,
        "sui_menu_radio_group",
        (state) => state.disabled && "sui_menu_radio_group-disabled",
      )}
    />
  );
};

export { MenuRadioGroup as RadioGroup };

export namespace RadioGroup {
  /**
   * {@link MenuRadioGroupState}
   */
  export type State = MenuRadioGroupState;

  /**
   * {@link MenuRadioGroupProps}
   */
  export type Props = MenuRadioGroupProps;

  /**
   * {@link MenuRadioGroupChangeEventDetails}
   */
  export type ChangeEventDetails = MenuRadioGroupChangeEventDetails;

  /**
   * {@link MenuRadioGroupChangeEventReason}
   */
  export type ChangeEventReason = MenuRadioGroupChangeEventReason;
}

// RadioItem
// ---------

/**
 * ラジオ項目の配色です。
 */
export type MenuRadioItemColor = Button.Root.Color;

/**
 * ラジオ項目の角丸です。
 */
export type MenuRadioItemRadius = Button.Root.Radius;

/**
 * ラジオ項目の主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type MenuRadioItemVariant = Button.Root.Variant;

/**
 * {@link MenuRadioItem} が持つ状態です。
 */
export type MenuRadioItemState = Override<Button.Root.State, Menu.RadioItem.State>;

/**
 * {@link MenuRadioItem} に渡す props です。
 */
export type MenuRadioItemProps = Override<
  Omit<Button.Root.Props, "type">,
  Override<React.ComponentProps<typeof Menu.RadioItem>, RenderProps<MenuRadioItemState>>
> & {
  /**
   * 項目の配色を指定します。
   *
   * @default "grey"
   */
  color?: MenuRadioItemColor | undefined;

  /**
   * 項目の角丸を指定します。
   *
   * 既定値は {@link MenuRootProps.radius|radius} です。
   */
  radius?: MenuRadioItemRadius | undefined;

  /**
   * チェック状態のときの外観を指定します。
   *
   * チェックされていないときは常に `"naked"` になります。
   *
   * 既定値は {@link MenuRootProps.variant|variant} です。
   */
  variant?: MenuRadioItemVariant | undefined;
};

/**
 * ラジオグループ内のメニュー項目です。
 */
export const MenuRadioItem: IComponent<MenuRadioItemProps> = function SuiMenuRadioItem(props) {
  const ctx = useMenuContext();
  const {
    size = ctx.size,
    color = "grey",
    style,
    radius = ctx.radius,
    render,
    variant = ctx.variant,
    className,
    ...otherProps
  } = props;

  return (
    <Menu.RadioItem
      {...otherProps}
      render={(htmlProps: {}, state) => (
        <Button.Root
          {...mergeProps<typeof Button.Root>([
            htmlProps,
            {
              item: true,
              size,
              color,
              radius,
              variant: getItemVariant(state, variant),
              disabled: state.disabled,
              nativeButton: false,
            },
            proxyRenderProps(state, {
              style,
              render: render ?? <div />,
              className: cn(
                className,
                "sui_menu_item",
                "sui_menu_radio_item",
                (state) => state.checked && "sui_menu_item-checked",
                (state) => state.highlighted && "sui_menu_item-highlighted",
                (state) => state.disabled && "sui_menu_item-disabled",
              ),
            }),
          ])}
        />
      )}
    />
  );
};

export { MenuRadioItem as RadioItem };

export namespace RadioItem {
  /**
   * {@link MenuRadioItemState}
   */
  export type State = MenuRadioItemState;

  /**
   * {@link MenuRadioItemProps}
   */
  export type Props = MenuRadioItemProps;

  /**
   * {@link MenuRadioItemColor}
   */
  export type Color = MenuRadioItemColor;

  /**
   * {@link MenuRadioItemRadius}
   */
  export type Radius = MenuRadioItemRadius;

  /**
   * {@link MenuRadioItemVariant}
   */
  export type Variant = MenuRadioItemVariant;
}

// RadioItemIndicator
// ------------------

/**
 * {@link MenuRadioItemIndicator} が持つ状態です。
 */
export type MenuRadioItemIndicatorState = Menu.RadioItemIndicator.State;

/**
 * {@link MenuRadioItemIndicator} に渡す props です。
 */
export type MenuRadioItemIndicatorProps = React.ComponentProps<typeof Menu.RadioItemIndicator>;

/**
 * 選択されたラジオ項目を示す要素です。
 */
export const MenuRadioItemIndicator: IComponent<MenuRadioItemIndicatorProps> =
  function SuiMenuRadioItemIndicator(props) {
    const { className, keepMounted = true, ...otherProps } = props;

    return (
      <Menu.RadioItemIndicator
        {...otherProps}
        className={cn(
          className,
          "sui_menu_item_indicator",
          "sui_menu_radio_item_indicator",
          (state) => !state.checked && "sui_menu_item_indicator-unchecked",
        )}
        keepMounted={keepMounted}
      />
    );
  };

export { MenuRadioItemIndicator as RadioItemIndicator };

export namespace RadioItemIndicator {
  /**
   * {@link MenuRadioItemIndicatorState}
   */
  export type State = MenuRadioItemIndicatorState;

  /**
   * {@link MenuRadioItemIndicatorProps}
   */
  export type Props = MenuRadioItemIndicatorProps;
}

// CheckboxItem
// ------------

/**
 * {@link MenuCheckboxItem} のチェック状態を変更されるイベントの詳細です。
 */
export type MenuCheckboxItemChangeEventDetails = Menu.CheckboxItem.ChangeEventDetails;

/**
 * {@link MenuCheckboxItem} のチェック状態が変更される理由です。
 */
export type MenuCheckboxItemChangeEventReason = Menu.CheckboxItem.ChangeEventReason;

/**
 * チェックボックス項目の配色です。
 */
export type MenuCheckboxItemColor = Button.Root.Color;

/**
 * チェックボックス項目の角丸です。
 */
export type MenuCheckboxItemRadius = Button.Root.Radius;

/**
 * チェックボックス項目の主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type MenuCheckboxItemVariant = Button.Root.Variant;

/**
 * {@link MenuCheckboxItem} が持つ状態です。
 */
export type MenuCheckboxItemState = Override<Button.Root.State, Menu.CheckboxItem.State>;

/**
 * {@link MenuCheckboxItem} に渡す props です。
 */
export type MenuCheckboxItemProps = Override<
  Omit<Button.Root.Props, "type">,
  Override<React.ComponentProps<typeof Menu.CheckboxItem>, RenderProps<MenuCheckboxItemState>>
> & {
  /**
   * 項目の配色を指定します。
   *
   * @default "grey"
   */
  color?: MenuCheckboxItemColor | undefined;

  /**
   * 項目の角丸を指定します。
   *
   * 既定値は {@link MenuRootProps.radius|radius} です。
   */
  radius?: MenuCheckboxItemRadius | undefined;

  /**
   * チェック状態のときの外観を指定します。
   *
   * チェックされていないときは常に `"naked"` になります。
   *
   * 既定値は {@link MenuRootProps.variant|variant} です。
   */
  variant?: MenuCheckboxItemVariant | undefined;
};

/**
 * 設定をオンまたはオフにできるメニュー項目です。
 */
export const MenuCheckboxItem: IComponent<MenuCheckboxItemProps> = function SuiMenuCheckboxItem(
  props,
) {
  const ctx = useMenuContext();
  const {
    size = ctx.size,
    color = "grey",
    style,
    radius = ctx.radius,
    render,
    variant = ctx.variant,
    className,
    ...otherProps
  } = props;

  return (
    <Menu.CheckboxItem
      {...otherProps}
      render={(htmlProps: {}, state) => (
        <Button.Root
          {...mergeProps<typeof Button.Root>([
            htmlProps,
            {
              item: true,
              size,
              color,
              radius,
              variant: getItemVariant(state, variant),
              disabled: state.disabled,
              nativeButton: false,
            },
            proxyRenderProps(state, {
              style,
              render: render ?? <div />,
              className: cn(
                className,
                "sui_menu_item",
                "sui_menu_checkbox_item",
                (state) => state.checked && "sui_menu_item-checked",
                (state) => state.highlighted && "sui_menu_item-highlighted",
                (state) => state.disabled && "sui_menu_item-disabled",
              ),
            }),
          ])}
        />
      )}
    />
  );
};

export { MenuCheckboxItem as CheckboxItem };

export namespace CheckboxItem {
  /**
   * {@link MenuCheckboxItemState}
   */
  export type State = MenuCheckboxItemState;

  /**
   * {@link MenuCheckboxItemProps}
   */
  export type Props = MenuCheckboxItemProps;

  /**
   * {@link MenuCheckboxItemChangeEventDetails}
   */
  export type ChangeEventDetails = MenuCheckboxItemChangeEventDetails;

  /**
   * {@link MenuCheckboxItemChangeEventReason}
   */
  export type ChangeEventReason = MenuCheckboxItemChangeEventReason;

  /**
   * {@link MenuCheckboxItemColor}
   */
  export type Color = MenuCheckboxItemColor;

  /**
   * {@link MenuCheckboxItemRadius}
   */
  export type Radius = MenuCheckboxItemRadius;

  /**
   * {@link MenuCheckboxItemVariant}
   */
  export type Variant = MenuCheckboxItemVariant;
}

// CheckboxItemIndicator
// ---------------------

/**
 * {@link MenuCheckboxItemIndicator} が持つ状態です。
 */
export type MenuCheckboxItemIndicatorState = Menu.CheckboxItemIndicator.State;

/**
 * {@link MenuCheckboxItemIndicator} に渡す props です。
 */
export type MenuCheckboxItemIndicatorProps = React.ComponentProps<
  typeof Menu.CheckboxItemIndicator
>;

/**
 * チェックされた項目を示す要素です。
 */
export const MenuCheckboxItemIndicator: IComponent<MenuCheckboxItemIndicatorProps> =
  function SuiMenuCheckboxItemIndicator(props) {
    const { className, ...otherProps } = props;

    return (
      <Menu.CheckboxItemIndicator
        {...otherProps}
        className={cn(
          className,
          "sui_menu_item_indicator",
          "sui_menu_checkbox_item_indicator",
          (state) => !state.checked && "sui_menu_item_indicator-unchecked",
        )}
      />
    );
  };

export { MenuCheckboxItemIndicator as CheckboxItemIndicator };

export namespace CheckboxItemIndicator {
  /**
   * {@link MenuCheckboxItemIndicatorState}
   */
  export type State = MenuCheckboxItemIndicatorState;

  /**
   * {@link MenuCheckboxItemIndicatorProps}
   */
  export type Props = MenuCheckboxItemIndicatorProps;
}

// Separator
// ---------

/**
 * {@link MenuSeparator} が持つ状態です。
 */
export type MenuSeparatorState = Menu.Separator.State;

/**
 * {@link MenuSeparator} に渡す props です。
 */
export type MenuSeparatorProps = React.ComponentProps<typeof Menu.Separator>;

/**
 * メニュー項目を区切る要素です。
 */
export const MenuSeparator: IComponent<MenuSeparatorProps> = function SuiMenuSeparator(props) {
  const { className, ...otherProps } = props;

  return <Menu.Separator {...otherProps} className={cn(className, "sui_menu_separator")} />;
};

export { MenuSeparator as Separator };

export namespace Separator {
  /**
   * {@link MenuSeparatorState}
   */
  export type State = MenuSeparatorState;

  /**
   * {@link MenuSeparatorProps}
   */
  export type Props = MenuSeparatorProps;
}
