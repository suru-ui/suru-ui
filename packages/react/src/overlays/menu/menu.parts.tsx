import { Menu } from "@base-ui/react/menu";
import * as React from "react";

import cn from "../../cn.js";
import type { Component } from "../../types.js";

import "./menu.css";

// Handle
// ------

/**
 * メニューを制御するハンドルです。
 */
export type MenuHandle<Payload = unknown> = Menu.Handle<Payload>;

/**
 * メニューを制御するハンドルを新しく作成します。
 *
 * 作成したハンドルを {@link Root} と {@link Trigger} の `handle` プロパティーに渡すことで、
 * トリガーとメニューの内容を関連付けます。
 *
 * @example
 * ```tsx
 * const handle = MenuParts.createHandle();
 * ```
 */
export const createHandle: typeof Menu.createHandle = Menu.createHandle;

// Root
// ----

/**
 * {@link Root} の状態です。
 */
export type MenuRootState = Menu.Root.State;

/**
 * {@link Root} に渡すプロパティーです。
 */
export type MenuRootProps<Payload = unknown> = Omit<Menu.Root.Props<Payload>, "handle"> & {
  /**
   * メニューとトリガー ({@link Trigger}) を関連付けるハンドルです。
   *
   * {@link createHandle} で作成します。Root 内に {@link Trigger} を配置する場合は省略できます。
   */
  handle?: MenuHandle<Payload> | undefined;
};

/**
 * {@link MenuRoot} のコンポーネント型です。
 */
export interface MenuRootComponent {
  <Payload = unknown>(props: MenuRootProps<Payload>): React.ReactElement | null;

  displayName?: string | undefined;
}

/**
 * メニューのルートです。
 *
 * メニューの開閉状態を管理し、各パーツをグループ化します。
 * それ自身は HTML 要素をレンダリングしません。
 *
 * @example
 * ```tsx
 * const handle = MenuParts.createHandle();
 *
 * <MenuParts.Root handle={handle}>
 *   <MenuParts.Trigger handle={handle}>
 *     {(props) => <button type="button" {...props}>操作</button>}
 *   </MenuParts.Trigger>
 *   <MenuParts.Portal>
 *     <MenuParts.Positioner>
 *       <MenuParts.Popup>
 *         <MenuParts.Item>編集</MenuParts.Item>
 *       </MenuParts.Popup>
 *     </MenuParts.Positioner>
 *   </MenuParts.Portal>
 * </MenuParts.Root>
 * ```
 */
export const MenuRoot: MenuRootComponent = function SuiMenuRoot<Payload>(
  props: MenuRootProps<Payload>,
) {
  return <Menu.Root {...props} />;
};

/**
 * {@link MenuRoot} の型をまとめた名前空間です。
 */
export namespace Root {
  export type State = MenuRootState;
  export type Props<Payload = unknown> = MenuRootProps<Payload>;
}

/**
 * {@link MenuRoot} の短縮名です。
 */
export const Root: MenuRootComponent = MenuRoot;

// Trigger
// -------

/**
 * {@link Trigger} の状態です。
 */
export type MenuTriggerState = Menu.Trigger.State;

/**
 * {@link Trigger} に渡すプロパティーです。
 */
export type MenuTriggerProps<Payload = unknown> = Omit<
  Menu.Trigger.Props<Payload>,
  "handle" | "children" | "render"
> & {
  /**
   * メニュー ({@link Root}) を関連付けるハンドルです。
   *
   * {@link createHandle} で作成し、{@link Root} と共有します。Root 内に配置する場合は省略できます。
   */
  handle?: MenuHandle<Payload> | undefined;

  /**
   * ボタンとしてレンダリングする要素です。
   *
   * {@link Menu.Trigger} の `render` プロパティーと同じ型で、そのまま `render` に渡されます。
   */
  children: NonNullable<Menu.Trigger.Props<Payload>["render"]>;
};

/**
 * {@link MenuTrigger} のコンポーネント型です。
 */
export interface MenuTriggerComponent {
  <Payload = unknown>(props: MenuTriggerProps<Payload>): React.ReactElement | null;

  displayName?: string | undefined;
}

/**
 * メニューを開くボタン要素です。
 *
 * 子要素は何にもラップされず、そのまま {@link Menu.Trigger} の `render` プロパティーに渡されます。
 *
 * @example
 * ```tsx
 * <MenuParts.Trigger handle={handle}>
 *   {(props) => <button type="button" {...props}>操作</button>}
 * </MenuParts.Trigger>
 * ```
 */
export const MenuTrigger: MenuTriggerComponent = function SuiMenuTrigger<Payload>(
  props: MenuTriggerProps<Payload>,
) {
  const { className, handle, children, ...otherProps } = props;

  return (
    <Menu.Trigger
      {...otherProps}
      handle={handle}
      className={cn(className, "sui_menu_trigger")}
      render={children}
    />
  );
};

/**
 * {@link MenuTrigger} の型をまとめた名前空間です。
 */
export namespace Trigger {
  export type State = MenuTriggerState;
  export type Props<Payload = unknown> = MenuTriggerProps<Payload>;
}

/**
 * {@link MenuTrigger} の短縮名です。
 */
export const Trigger: MenuTriggerComponent = MenuTrigger;

// Portal
// ------

/**
 * {@link Portal} の状態です。
 */
export type MenuPortalState = Menu.Portal.State;

/**
 * {@link Portal} に渡すプロパティーです。
 */
export type MenuPortalProps = React.ComponentProps<typeof Menu.Portal>;

/**
 * メニューを DOM の別の場所へ移動する要素です。
 *
 * 既定ではポップアップを `<body>` の末尾に配置します。
 *
 * @example
 * ```tsx
 * <MenuParts.Portal>
 *   <MenuParts.Positioner>…</MenuParts.Positioner>
 * </MenuParts.Portal>
 * ```
 */
export const MenuPortal: Component<MenuPortalProps> = function SuiMenuPortal(props) {
  const { className, ...otherProps } = props;

  return <Menu.Portal {...otherProps} className={cn(className, "sui_menu_portal")} />;
};

/**
 * {@link MenuPortal} の型をまとめた名前空間です。
 */
export namespace Portal {
  export type State = MenuPortalState;
  export type Props = MenuPortalProps;
}

/**
 * {@link MenuPortal} の短縮名です。
 */
export const Portal: Component<Portal.Props> = MenuPortal;

// Backdrop
// --------

/**
 * {@link Backdrop} の状態です。
 */
export type MenuBackdropState = Menu.Backdrop.State;

/**
 * {@link Backdrop} に渡すプロパティーです。
 */
export type MenuBackdropProps = React.ComponentProps<typeof Menu.Backdrop>;

/**
 * メニューの背後に表示されるオーバーレイ要素です。
 *
 * @example
 * ```tsx
 * <MenuParts.Backdrop />
 * ```
 */
export const MenuBackdrop: Component<MenuBackdropProps> = function SuiMenuBackdrop(props) {
  const { className, ...otherProps } = props;

  return <Menu.Backdrop {...otherProps} className={cn(className, "sui_menu_backdrop")} />;
};

/**
 * {@link MenuBackdrop} の型をまとめた名前空間です。
 */
export namespace Backdrop {
  export type State = MenuBackdropState;
  export type Props = MenuBackdropProps;
}

/**
 * {@link MenuBackdrop} の短縮名です。
 */
export const Backdrop: Component<Backdrop.Props> = MenuBackdrop;

// Positioner
// ----------

/**
 * {@link Positioner} の状態です。
 */
export type MenuPositionerState = Menu.Positioner.State;

/**
 * {@link Positioner} に渡すプロパティーです。
 */
export type MenuPositionerProps = React.ComponentProps<typeof Menu.Positioner>;

/**
 * ポップアップをトリガーに位置合わせする要素です。
 *
 * @example
 * ```tsx
 * <MenuParts.Positioner side="bottom" align="start" sideOffset={8}>
 *   <MenuParts.Popup>…</MenuParts.Popup>
 * </MenuParts.Positioner>
 * ```
 */
export const MenuPositioner: Component<MenuPositionerProps> = function SuiMenuPositioner(props) {
  const { className, ...otherProps } = props;

  return <Menu.Positioner {...otherProps} className={cn(className, "sui_menu_positioner")} />;
};

/**
 * {@link MenuPositioner} の型をまとめた名前空間です。
 */
export namespace Positioner {
  export type State = MenuPositionerState;
  export type Props = MenuPositionerProps;
}

/**
 * {@link MenuPositioner} の短縮名です。
 */
export const Positioner: Component<Positioner.Props> = MenuPositioner;

// Popup
// -----

/**
 * {@link Popup} の状態です。
 */
export type MenuPopupState = Menu.Popup.State;

/**
 * {@link Popup} に渡すプロパティーです。
 */
export type MenuPopupProps = React.ComponentProps<typeof Menu.Popup>;

/**
 * メニュー項目を表示するポップアップ要素です。
 *
 * @example
 * ```tsx
 * <MenuParts.Popup>
 *   <MenuParts.Item>編集</MenuParts.Item>
 * </MenuParts.Popup>
 * ```
 */
export const MenuPopup: Component<MenuPopupProps> = function SuiMenuPopup(props) {
  const { className, ...otherProps } = props;

  return <Menu.Popup {...otherProps} className={cn(className, "sui_menu_popup")} />;
};

/**
 * {@link MenuPopup} の型をまとめた名前空間です。
 */
export namespace Popup {
  export type State = MenuPopupState;
  export type Props = MenuPopupProps;
}

/**
 * {@link MenuPopup} の短縮名です。
 */
export const Popup: Component<Popup.Props> = MenuPopup;

// Arrow
// -----

/**
 * {@link Arrow} の状態です。
 */
export type MenuArrowState = Menu.Arrow.State;

/**
 * {@link Arrow} に渡すプロパティーです。
 */
export type MenuArrowProps = React.ComponentProps<typeof Menu.Arrow>;

/**
 * ポップアップとトリガーをつなぐ矢印要素です。
 *
 * @example
 * ```tsx
 * <MenuParts.Popup>
 *   <MenuParts.Arrow />
 *   …
 * </MenuParts.Popup>
 * ```
 */
export const MenuArrow: Component<MenuArrowProps> = function SuiMenuArrow(props) {
  const { className, ...otherProps } = props;

  return <Menu.Arrow {...otherProps} className={cn(className, "sui_menu_arrow")} />;
};

/**
 * {@link MenuArrow} の型をまとめた名前空間です。
 */
export namespace Arrow {
  export type State = MenuArrowState;
  export type Props = MenuArrowProps;
}

/**
 * {@link MenuArrow} の短縮名です。
 */
export const Arrow: Component<Arrow.Props> = MenuArrow;

// Viewport
// --------

/**
 * {@link Viewport} の状態です。
 */
export type MenuViewportState = Menu.Viewport.State;

/**
 * {@link Viewport} に渡すプロパティーです。
 */
export type MenuViewportProps = React.ComponentProps<typeof Menu.Viewport>;

/**
 * トリガーの切り替えに伴うメニュー内容のアニメーション用ビューポートです。
 *
 * @example
 * ```tsx
 * <MenuParts.Viewport>
 *   <MenuParts.Item>編集</MenuParts.Item>
 * </MenuParts.Viewport>
 * ```
 */
export const MenuViewport: Component<MenuViewportProps> = function SuiMenuViewport(props) {
  const { className, ...otherProps } = props;

  return <Menu.Viewport {...otherProps} className={cn(className, "sui_menu_viewport")} />;
};

/**
 * {@link MenuViewport} の型をまとめた名前空間です。
 */
export namespace Viewport {
  export type State = MenuViewportState;
  export type Props = MenuViewportProps;
}

/**
 * {@link MenuViewport} の短縮名です。
 */
export const Viewport: Component<Viewport.Props> = MenuViewport;

// Item
// ----

/**
 * {@link Item} の状態です。
 */
export type MenuItemState = Menu.Item.State;

/**
 * {@link Item} に渡すプロパティーです。
 */
export type MenuItemProps = React.ComponentProps<typeof Menu.Item>;

/**
 * メニューの操作項目です。
 *
 * @example
 * ```tsx
 * <MenuParts.Item>編集</MenuParts.Item>
 * ```
 */
export const MenuItem: Component<MenuItemProps> = function SuiMenuItem(props) {
  const { className, ...otherProps } = props;

  return <Menu.Item {...otherProps} className={cn(className, "sui_menu_item")} />;
};

/**
 * {@link MenuItem} の型をまとめた名前空間です。
 */
export namespace Item {
  export type State = MenuItemState;
  export type Props = MenuItemProps;
}

/**
 * {@link MenuItem} の短縮名です。
 */
export const Item: Component<Item.Props> = MenuItem;

// LinkItem
// --------

/**
 * {@link LinkItem} の状態です。
 */
export type MenuLinkItemState = Menu.LinkItem.State;

/**
 * {@link LinkItem} に渡すプロパティーです。
 */
export type MenuLinkItemProps = React.ComponentProps<typeof Menu.LinkItem>;

/**
 * 別のページやセクションへ移動するメニュー項目です。
 *
 * @example
 * ```tsx
 * <MenuParts.LinkItem href="/settings">設定</MenuParts.LinkItem>
 * ```
 */
export const MenuLinkItem: Component<MenuLinkItemProps> = function SuiMenuLinkItem(props) {
  const { className, ...otherProps } = props;

  return (
    <Menu.LinkItem
      {...otherProps}
      className={cn(className, "sui_menu_item", "sui_menu_link_item")}
    />
  );
};

/**
 * {@link MenuLinkItem} の型をまとめた名前空間です。
 */
export namespace LinkItem {
  export type State = MenuLinkItemState;
  export type Props = MenuLinkItemProps;
}

/**
 * {@link MenuLinkItem} の短縮名です。
 */
export const LinkItem: Component<LinkItem.Props> = MenuLinkItem;

// SubmenuRoot
// -----------

/**
 * {@link SubmenuRoot} の状態です。
 */
export type MenuSubmenuRootState = Menu.SubmenuRoot.State;

/**
 * {@link SubmenuRoot} に渡すプロパティーです。
 */
export type MenuSubmenuRootProps = React.ComponentProps<typeof Menu.SubmenuRoot>;

/**
 * サブメニューのルートです。
 *
 * それ自身は HTML 要素をレンダリングしません。
 *
 * @example
 * ```tsx
 * <MenuParts.SubmenuRoot>
 *   <MenuParts.SubmenuTrigger>その他</MenuParts.SubmenuTrigger>
 * </MenuParts.SubmenuRoot>
 * ```
 */
export const MenuSubmenuRoot: Component<MenuSubmenuRootProps> = function SuiMenuSubmenuRoot(props) {
  return <Menu.SubmenuRoot {...props} />;
};

/**
 * {@link MenuSubmenuRoot} の型をまとめた名前空間です。
 */
export namespace SubmenuRoot {
  export type State = MenuSubmenuRootState;
  export type Props = MenuSubmenuRootProps;
}

/**
 * {@link MenuSubmenuRoot} の短縮名です。
 */
export const SubmenuRoot: Component<SubmenuRoot.Props> = MenuSubmenuRoot;

// SubmenuTrigger
// --------------

/**
 * {@link SubmenuTrigger} の状態です。
 */
export type MenuSubmenuTriggerState = Menu.SubmenuTrigger.State;

/**
 * {@link SubmenuTrigger} に渡すプロパティーです。
 */
export type MenuSubmenuTriggerProps = React.ComponentProps<typeof Menu.SubmenuTrigger>;

/**
 * サブメニューを開くメニュー項目です。
 *
 * @example
 * ```tsx
 * <MenuParts.SubmenuTrigger>その他</MenuParts.SubmenuTrigger>
 * ```
 */
export const MenuSubmenuTrigger: Component<MenuSubmenuTriggerProps> =
  function SuiMenuSubmenuTrigger(props) {
    const { className, ...otherProps } = props;

    return (
      <Menu.SubmenuTrigger
        {...otherProps}
        className={cn(className, "sui_menu_item", "sui_menu_submenu_trigger")}
      />
    );
  };

/**
 * {@link MenuSubmenuTrigger} の型をまとめた名前空間です。
 */
export namespace SubmenuTrigger {
  export type State = MenuSubmenuTriggerState;
  export type Props = MenuSubmenuTriggerProps;
}

/**
 * {@link MenuSubmenuTrigger} の短縮名です。
 */
export const SubmenuTrigger: Component<SubmenuTrigger.Props> = MenuSubmenuTrigger;

// Group
// -----

/**
 * {@link Group} の状態です。
 */
export type MenuGroupState = Menu.Group.State;

/**
 * {@link Group} に渡すプロパティーです。
 */
export type MenuGroupProps = React.ComponentProps<typeof Menu.Group>;

/**
 * 関連するメニュー項目をまとめるグループ要素です。
 *
 * @example
 * ```tsx
 * <MenuParts.Group>
 *   <MenuParts.GroupLabel>ファイル</MenuParts.GroupLabel>
 *   <MenuParts.Item>新規作成</MenuParts.Item>
 * </MenuParts.Group>
 * ```
 */
export const MenuGroup: Component<MenuGroupProps> = function SuiMenuGroup(props) {
  const { className, ...otherProps } = props;

  return <Menu.Group {...otherProps} className={cn(className, "sui_menu_group")} />;
};

/**
 * {@link MenuGroup} の型をまとめた名前空間です。
 */
export namespace Group {
  export type State = MenuGroupState;
  export type Props = MenuGroupProps;
}

/**
 * {@link MenuGroup} の短縮名です。
 */
export const Group: Component<Group.Props> = MenuGroup;

// GroupLabel
// ----------

/**
 * {@link GroupLabel} の状態です。
 */
export type MenuGroupLabelState = Menu.GroupLabel.State;

/**
 * {@link GroupLabel} に渡すプロパティーです。
 */
export type MenuGroupLabelProps = React.ComponentProps<typeof Menu.GroupLabel>;

/**
 * グループに自動的に対応付けられるラベル要素です。
 *
 * @example
 * ```tsx
 * <MenuParts.GroupLabel>ファイル</MenuParts.GroupLabel>
 * ```
 */
export const MenuGroupLabel: Component<MenuGroupLabelProps> = function SuiMenuGroupLabel(props) {
  const { className, ...otherProps } = props;

  return <Menu.GroupLabel {...otherProps} className={cn(className, "sui_menu_group_label")} />;
};

/**
 * {@link MenuGroupLabel} の型をまとめた名前空間です。
 */
export namespace GroupLabel {
  export type State = MenuGroupLabelState;
  export type Props = MenuGroupLabelProps;
}

/**
 * {@link MenuGroupLabel} の短縮名です。
 */
export const GroupLabel: Component<GroupLabel.Props> = MenuGroupLabel;

// RadioGroup
// ----------

/**
 * {@link RadioGroup} の状態です。
 */
export type MenuRadioGroupState = Menu.RadioGroup.State;

/**
 * {@link RadioGroup} に渡すプロパティーです。
 */
export type MenuRadioGroupProps = React.ComponentProps<typeof Menu.RadioGroup>;

/**
 * ラジオ項目をまとめるグループ要素です。
 *
 * @example
 * ```tsx
 * <MenuParts.RadioGroup defaultValue="name">
 *   <MenuParts.RadioItem value="name">名前</MenuParts.RadioItem>
 *   <MenuParts.RadioItem value="date">日付</MenuParts.RadioItem>
 * </MenuParts.RadioGroup>
 * ```
 */
export const MenuRadioGroup: Component<MenuRadioGroupProps> = function SuiMenuRadioGroup(props) {
  const { className, ...otherProps } = props;

  return <Menu.RadioGroup {...otherProps} className={cn(className, "sui_menu_radio_group")} />;
};

/**
 * {@link MenuRadioGroup} の型をまとめた名前空間です。
 */
export namespace RadioGroup {
  export type State = MenuRadioGroupState;
  export type Props = MenuRadioGroupProps;
}

/**
 * {@link MenuRadioGroup} の短縮名です。
 */
export const RadioGroup: Component<RadioGroup.Props> = MenuRadioGroup;

// RadioItem
// ---------

/**
 * {@link RadioItem} の状態です。
 */
export type MenuRadioItemState = Menu.RadioItem.State;

/**
 * {@link RadioItem} に渡すプロパティーです。
 */
export type MenuRadioItemProps = React.ComponentProps<typeof Menu.RadioItem>;

/**
 * ラジオグループ内のメニュー項目です。
 *
 * @example
 * ```tsx
 * <MenuParts.RadioItem value="name">名前</MenuParts.RadioItem>
 * ```
 */
export const MenuRadioItem: Component<MenuRadioItemProps> = function SuiMenuRadioItem(props) {
  const { className, ...otherProps } = props;

  return (
    <Menu.RadioItem
      {...otherProps}
      className={cn(className, "sui_menu_item", "sui_menu_radio_item")}
    />
  );
};

/**
 * {@link MenuRadioItem} の型をまとめた名前空間です。
 */
export namespace RadioItem {
  export type State = MenuRadioItemState;
  export type Props = MenuRadioItemProps;
}

/**
 * {@link MenuRadioItem} の短縮名です。
 */
export const RadioItem: Component<RadioItem.Props> = MenuRadioItem;

// RadioItemIndicator
// ------------------

/**
 * {@link RadioItemIndicator} の状態です。
 */
export type MenuRadioItemIndicatorState = Menu.RadioItemIndicator.State;

/**
 * {@link RadioItemIndicator} に渡すプロパティーです。
 */
export type MenuRadioItemIndicatorProps = React.ComponentProps<typeof Menu.RadioItemIndicator>;

/**
 * 選択されたラジオ項目を示す要素です。
 *
 * @example
 * ```tsx
 * <MenuParts.RadioItemIndicator>✓</MenuParts.RadioItemIndicator>
 * ```
 */
export const MenuRadioItemIndicator: Component<MenuRadioItemIndicatorProps> =
  function SuiMenuRadioItemIndicator(props) {
    const { className, keepMounted = true, ...otherProps } = props;

    return (
      <Menu.RadioItemIndicator
        {...otherProps}
        keepMounted={keepMounted}
        className={cn(className, "sui_menu_item_indicator", "sui_menu_radio_item_indicator")}
      />
    );
  };

/**
 * {@link MenuRadioItemIndicator} の型をまとめた名前空間です。
 */
export namespace RadioItemIndicator {
  export type State = MenuRadioItemIndicatorState;
  export type Props = MenuRadioItemIndicatorProps;
}

/**
 * {@link MenuRadioItemIndicator} の短縮名です。
 */
export const RadioItemIndicator: Component<RadioItemIndicator.Props> = MenuRadioItemIndicator;

// CheckboxItem
// ------------

/**
 * {@link CheckboxItem} の状態です。
 */
export type MenuCheckboxItemState = Menu.CheckboxItem.State;

/**
 * {@link CheckboxItem} に渡すプロパティーです。
 */
export type MenuCheckboxItemProps = React.ComponentProps<typeof Menu.CheckboxItem>;

/**
 * 設定をオン・オフできるメニュー項目です。
 *
 * @example
 * ```tsx
 * <MenuParts.CheckboxItem defaultChecked>サイドバー</MenuParts.CheckboxItem>
 * ```
 */
export const MenuCheckboxItem: Component<MenuCheckboxItemProps> = function SuiMenuCheckboxItem(
  props,
) {
  const { className, ...otherProps } = props;

  return (
    <Menu.CheckboxItem
      {...otherProps}
      className={cn(className, "sui_menu_item", "sui_menu_checkbox_item")}
    />
  );
};

/**
 * {@link MenuCheckboxItem} の型をまとめた名前空間です。
 */
export namespace CheckboxItem {
  export type State = MenuCheckboxItemState;
  export type Props = MenuCheckboxItemProps;
}

/**
 * {@link MenuCheckboxItem} の短縮名です。
 */
export const CheckboxItem: Component<CheckboxItem.Props> = MenuCheckboxItem;

// CheckboxItemIndicator
// ---------------------

/**
 * {@link CheckboxItemIndicator} の状態です。
 */
export type MenuCheckboxItemIndicatorState = Menu.CheckboxItemIndicator.State;

/**
 * {@link CheckboxItemIndicator} に渡すプロパティーです。
 */
export type MenuCheckboxItemIndicatorProps = React.ComponentProps<
  typeof Menu.CheckboxItemIndicator
>;

/**
 * チェックされた項目を示す要素です。
 *
 * @example
 * ```tsx
 * <MenuParts.CheckboxItemIndicator>✓</MenuParts.CheckboxItemIndicator>
 * ```
 */
export const MenuCheckboxItemIndicator: Component<MenuCheckboxItemIndicatorProps> =
  function SuiMenuCheckboxItemIndicator(props) {
    const { className, keepMounted = true, ...otherProps } = props;

    return (
      <Menu.CheckboxItemIndicator
        {...otherProps}
        keepMounted={keepMounted}
        className={cn(className, "sui_menu_item_indicator", "sui_menu_checkbox_item_indicator")}
      />
    );
  };

/**
 * {@link MenuCheckboxItemIndicator} の型をまとめた名前空間です。
 */
export namespace CheckboxItemIndicator {
  export type State = MenuCheckboxItemIndicatorState;
  export type Props = MenuCheckboxItemIndicatorProps;
}

/**
 * {@link MenuCheckboxItemIndicator} の短縮名です。
 */
export const CheckboxItemIndicator: Component<CheckboxItemIndicator.Props> =
  MenuCheckboxItemIndicator;

// Separator
// ---------

/**
 * {@link Separator} の状態です。
 */
export type MenuSeparatorState = Menu.Separator.State;

/**
 * {@link Separator} に渡すプロパティーです。
 */
export type MenuSeparatorProps = React.ComponentProps<typeof Menu.Separator>;

/**
 * メニュー項目を区切る要素です。
 *
 * @example
 * ```tsx
 * <MenuParts.Separator />
 * ```
 */
export const MenuSeparator: Component<MenuSeparatorProps> = function SuiMenuSeparator(props) {
  const { className, ...otherProps } = props;

  return <Menu.Separator {...otherProps} className={cn(className, "sui_menu_separator")} />;
};

/**
 * {@link MenuSeparator} の型をまとめた名前空間です。
 */
export namespace Separator {
  export type State = MenuSeparatorState;
  export type Props = MenuSeparatorProps;
}

/**
 * {@link MenuSeparator} の短縮名です。
 */
export const Separator: Component<Separator.Props> = MenuSeparator;
