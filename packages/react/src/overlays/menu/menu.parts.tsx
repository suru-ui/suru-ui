import { Menu } from "@base-ui/react/menu";
import * as React from "react";

import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

import "./menu.css";

// Types
// -----

// Handle
// ------

/**
 * メニューを制御するハンドルです。
 */
export type MenuHandle<TPayload = unknown> = Menu.Handle<TPayload>;

/**
 * メニューを制御するハンドルを新しく作成します。
 *
 * 作成したハンドルを {@link Root} と {@link Trigger} の `handle` プロパティーに渡すことで、
 * トリガーとメニューの内容を関連付けます。
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
export type MenuRootProps<TPayload = unknown> = Omit<Menu.Root.Props<TPayload>, "handle"> & {
  /**
   * メニューとトリガー ({@link Trigger}) を関連付けるハンドルです。
   *
   * {@link createHandle} で作成します。Root 内に {@link Trigger} を配置する場合は省略できます。
   */
  handle?: MenuHandle<TPayload> | undefined;
};

/**
 * {@link MenuRoot} のコンポーネント型です。
 */
export interface MenuRootComponent extends IComponent<MenuRootProps> {
  <TPayload = unknown>(props: MenuRootProps<TPayload>): React.ReactElement | null;
}

/**
 * メニューのルートです。
 *
 * メニューの開閉状態を管理し、各パーツをグループ化します。
 * それ自身は HTML 要素をレンダリングしません。
 */
export const MenuRoot: MenuRootComponent = function SuiMenuRoot<TPayload>(
  props: MenuRootProps<TPayload>,
) {
  return <Menu.Root {...props} />;
};

/**
 * {@link MenuRoot} の型をまとめた名前空間です。
 */
export namespace Root {
  /**
   * {@link MenuRoot} の状態型です。
   */
  export type State = MenuRootState;

  /**
   * {@link MenuRoot} のプロパティー型です。
   */
  export type Props<TPayload = unknown> = MenuRootProps<TPayload>;
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
export type MenuTriggerProps<TPayload = unknown> = Omit<
  Menu.Trigger.Props<TPayload>,
  "handle" | "children" | "render"
> & {
  /**
   * メニュー ({@link Root}) を関連付けるハンドルです。
   *
   * {@link createHandle} で作成し、{@link Root} と共有します。Root 内に配置する場合は省略できます。
   */
  handle?: MenuHandle<TPayload> | undefined;

  /**
   * ボタンとしてレンダリングする要素です。
   *
   * {@link Menu.Trigger} の `render` プロパティーと同じ型で、そのまま `render` に渡されます。
   */
  children: NonNullable<Menu.Trigger.Props<TPayload>["render"]>;
};

/**
 * {@link MenuTrigger} のコンポーネント型です。
 */
export interface MenuTriggerComponent extends IComponent<MenuTriggerProps> {
  <TPayload = unknown>(props: MenuTriggerProps<TPayload>): React.ReactElement | null;
}

/**
 * メニューを開くボタン要素です。
 *
 * 子要素は何にもラップされず、そのまま {@link Menu.Trigger} の `render` プロパティーに渡されます。
 */
export const MenuTrigger: MenuTriggerComponent = function SuiMenuTrigger<TPayload>(
  props: MenuTriggerProps<TPayload>,
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
  /**
   * {@link MenuTrigger} の状態型です。
   */
  export type State = MenuTriggerState;

  /**
   * {@link MenuTrigger} のプロパティー型です。
   */
  export type Props<TPayload = unknown> = MenuTriggerProps<TPayload>;
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
 */
export const MenuPortal: IComponent<MenuPortalProps> = function SuiMenuPortal(props) {
  const { className, ...otherProps } = props;

  return <Menu.Portal {...otherProps} className={cn(className, "sui_menu_portal")} />;
};

/**
 * {@link MenuPortal} の型をまとめた名前空間です。
 */
export namespace Portal {
  /**
   * {@link MenuPortal} の状態型です。
   */
  export type State = MenuPortalState;

  /**
   * {@link MenuPortal} のプロパティー型です。
   */
  export type Props = MenuPortalProps;
}

/**
 * {@link MenuPortal} の短縮名です。
 */
export const Portal: IComponent<Portal.Props> = MenuPortal;

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
 */
export const MenuBackdrop: IComponent<MenuBackdropProps> = function SuiMenuBackdrop(props) {
  const { className, ...otherProps } = props;

  return <Menu.Backdrop {...otherProps} className={cn(className, "sui_menu_backdrop")} />;
};

/**
 * {@link MenuBackdrop} の型をまとめた名前空間です。
 */
export namespace Backdrop {
  /**
   * {@link MenuBackdrop} の状態型です。
   */
  export type State = MenuBackdropState;

  /**
   * {@link MenuBackdrop} のプロパティー型です。
   */
  export type Props = MenuBackdropProps;
}

/**
 * {@link MenuBackdrop} の短縮名です。
 */
export const Backdrop: IComponent<Backdrop.Props> = MenuBackdrop;

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
 */
export const MenuPositioner: IComponent<MenuPositionerProps> = function SuiMenuPositioner(props) {
  const { className, ...otherProps } = props;

  return <Menu.Positioner {...otherProps} className={cn(className, "sui_menu_positioner")} />;
};

/**
 * {@link MenuPositioner} の型をまとめた名前空間です。
 */
export namespace Positioner {
  /**
   * {@link MenuPositioner} の状態型です。
   */
  export type State = MenuPositionerState;

  /**
   * {@link MenuPositioner} のプロパティー型です。
   */
  export type Props = MenuPositionerProps;
}

/**
 * {@link MenuPositioner} の短縮名です。
 */
export const Positioner: IComponent<Positioner.Props> = MenuPositioner;

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
 */
export const MenuPopup: IComponent<MenuPopupProps> = function SuiMenuPopup(props) {
  const { className, ...otherProps } = props;

  return <Menu.Popup {...otherProps} className={cn(className, "sui_menu_popup")} />;
};

/**
 * {@link MenuPopup} の型をまとめた名前空間です。
 */
export namespace Popup {
  /**
   * {@link MenuPopup} の状態型です。
   */
  export type State = MenuPopupState;

  /**
   * {@link MenuPopup} のプロパティー型です。
   */
  export type Props = MenuPopupProps;
}

/**
 * {@link MenuPopup} の短縮名です。
 */
export const Popup: IComponent<Popup.Props> = MenuPopup;

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
 */
export const MenuArrow: IComponent<MenuArrowProps> = function SuiMenuArrow(props) {
  const { className, ...otherProps } = props;

  return <Menu.Arrow {...otherProps} className={cn(className, "sui_menu_arrow")} />;
};

/**
 * {@link MenuArrow} の型をまとめた名前空間です。
 */
export namespace Arrow {
  /**
   * {@link MenuArrow} の状態型です。
   */
  export type State = MenuArrowState;

  /**
   * {@link MenuArrow} のプロパティー型です。
   */
  export type Props = MenuArrowProps;
}

/**
 * {@link MenuArrow} の短縮名です。
 */
export const Arrow: IComponent<Arrow.Props> = MenuArrow;

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
 */
export const MenuViewport: IComponent<MenuViewportProps> = function SuiMenuViewport(props) {
  const { className, ...otherProps } = props;

  return <Menu.Viewport {...otherProps} className={cn(className, "sui_menu_viewport")} />;
};

/**
 * {@link MenuViewport} の型をまとめた名前空間です。
 */
export namespace Viewport {
  /**
   * {@link MenuViewport} の状態型です。
   */
  export type State = MenuViewportState;

  /**
   * {@link MenuViewport} のプロパティー型です。
   */
  export type Props = MenuViewportProps;
}

/**
 * {@link MenuViewport} の短縮名です。
 */
export const Viewport: IComponent<Viewport.Props> = MenuViewport;

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
 */
export const MenuItem: IComponent<MenuItemProps> = function SuiMenuItem(props) {
  const { className, ...otherProps } = props;

  return <Menu.Item {...otherProps} className={cn(className, "sui_menu_item")} />;
};

/**
 * {@link MenuItem} の型をまとめた名前空間です。
 */
export namespace Item {
  /**
   * {@link MenuItem} の状態型です。
   */
  export type State = MenuItemState;

  /**
   * {@link MenuItem} のプロパティー型です。
   */
  export type Props = MenuItemProps;
}

/**
 * {@link MenuItem} の短縮名です。
 */
export const Item: IComponent<Item.Props> = MenuItem;

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
 */
export const MenuLinkItem: IComponent<MenuLinkItemProps> = function SuiMenuLinkItem(props) {
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
  /**
   * {@link MenuLinkItem} の状態型です。
   */
  export type State = MenuLinkItemState;

  /**
   * {@link MenuLinkItem} のプロパティー型です。
   */
  export type Props = MenuLinkItemProps;
}

/**
 * {@link MenuLinkItem} の短縮名です。
 */
export const LinkItem: IComponent<LinkItem.Props> = MenuLinkItem;

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
 */
export const MenuSubmenuRoot: IComponent<MenuSubmenuRootProps> = function SuiMenuSubmenuRoot(
  props,
) {
  return <Menu.SubmenuRoot {...props} />;
};

/**
 * {@link MenuSubmenuRoot} の型をまとめた名前空間です。
 */
export namespace SubmenuRoot {
  /**
   * {@link MenuSubmenuRoot} の状態型です。
   */
  export type State = MenuSubmenuRootState;

  /**
   * {@link MenuSubmenuRoot} のプロパティー型です。
   */
  export type Props = MenuSubmenuRootProps;
}

/**
 * {@link MenuSubmenuRoot} の短縮名です。
 */
export const SubmenuRoot: IComponent<SubmenuRoot.Props> = MenuSubmenuRoot;

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
 */
export const MenuSubmenuTrigger: IComponent<MenuSubmenuTriggerProps> =
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
  /**
   * {@link MenuSubmenuTrigger} の状態型です。
   */
  export type State = MenuSubmenuTriggerState;

  /**
   * {@link MenuSubmenuTrigger} のプロパティー型です。
   */
  export type Props = MenuSubmenuTriggerProps;
}

/**
 * {@link MenuSubmenuTrigger} の短縮名です。
 */
export const SubmenuTrigger: IComponent<SubmenuTrigger.Props> = MenuSubmenuTrigger;

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
 */
export const MenuGroup: IComponent<MenuGroupProps> = function SuiMenuGroup(props) {
  const { className, ...otherProps } = props;

  return <Menu.Group {...otherProps} className={cn(className, "sui_menu_group")} />;
};

/**
 * {@link MenuGroup} の型をまとめた名前空間です。
 */
export namespace Group {
  /**
   * {@link MenuGroup} の状態型です。
   */
  export type State = MenuGroupState;

  /**
   * {@link MenuGroup} のプロパティー型です。
   */
  export type Props = MenuGroupProps;
}

/**
 * {@link MenuGroup} の短縮名です。
 */
export const Group: IComponent<Group.Props> = MenuGroup;

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
 */
export const MenuGroupLabel: IComponent<MenuGroupLabelProps> = function SuiMenuGroupLabel(props) {
  const { className, ...otherProps } = props;

  return <Menu.GroupLabel {...otherProps} className={cn(className, "sui_menu_group_label")} />;
};

/**
 * {@link MenuGroupLabel} の型をまとめた名前空間です。
 */
export namespace GroupLabel {
  /**
   * {@link MenuGroupLabel} の状態型です。
   */
  export type State = MenuGroupLabelState;

  /**
   * {@link MenuGroupLabel} のプロパティー型です。
   */
  export type Props = MenuGroupLabelProps;
}

/**
 * {@link MenuGroupLabel} の短縮名です。
 */
export const GroupLabel: IComponent<GroupLabel.Props> = MenuGroupLabel;

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
 */
export const MenuRadioGroup: IComponent<MenuRadioGroupProps> = function SuiMenuRadioGroup(props) {
  const { className, ...otherProps } = props;

  return <Menu.RadioGroup {...otherProps} className={cn(className, "sui_menu_radio_group")} />;
};

/**
 * {@link MenuRadioGroup} の型をまとめた名前空間です。
 */
export namespace RadioGroup {
  /**
   * {@link MenuRadioGroup} の状態型です。
   */
  export type State = MenuRadioGroupState;

  /**
   * {@link MenuRadioGroup} のプロパティー型です。
   */
  export type Props = MenuRadioGroupProps;
}

/**
 * {@link MenuRadioGroup} の短縮名です。
 */
export const RadioGroup: IComponent<RadioGroup.Props> = MenuRadioGroup;

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
 */
export const MenuRadioItem: IComponent<MenuRadioItemProps> = function SuiMenuRadioItem(props) {
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
  /**
   * {@link MenuRadioItem} の状態型です。
   */
  export type State = MenuRadioItemState;

  /**
   * {@link MenuRadioItem} のプロパティー型です。
   */
  export type Props = MenuRadioItemProps;
}

/**
 * {@link MenuRadioItem} の短縮名です。
 */
export const RadioItem: IComponent<RadioItem.Props> = MenuRadioItem;

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
 */
export const MenuRadioItemIndicator: IComponent<MenuRadioItemIndicatorProps> =
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
  /**
   * {@link MenuRadioItemIndicator} の状態型です。
   */
  export type State = MenuRadioItemIndicatorState;

  /**
   * {@link MenuRadioItemIndicator} のプロパティー型です。
   */
  export type Props = MenuRadioItemIndicatorProps;
}

/**
 * {@link MenuRadioItemIndicator} の短縮名です。
 */
export const RadioItemIndicator: IComponent<RadioItemIndicator.Props> = MenuRadioItemIndicator;

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
 */
export const MenuCheckboxItem: IComponent<MenuCheckboxItemProps> = function SuiMenuCheckboxItem(
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
  /**
   * {@link MenuCheckboxItem} の状態型です。
   */
  export type State = MenuCheckboxItemState;

  /**
   * {@link MenuCheckboxItem} のプロパティー型です。
   */
  export type Props = MenuCheckboxItemProps;
}

/**
 * {@link MenuCheckboxItem} の短縮名です。
 */
export const CheckboxItem: IComponent<CheckboxItem.Props> = MenuCheckboxItem;

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
 */
export const MenuCheckboxItemIndicator: IComponent<MenuCheckboxItemIndicatorProps> =
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
  /**
   * {@link MenuCheckboxItemIndicator} の状態型です。
   */
  export type State = MenuCheckboxItemIndicatorState;

  /**
   * {@link MenuCheckboxItemIndicator} のプロパティー型です。
   */
  export type Props = MenuCheckboxItemIndicatorProps;
}

/**
 * {@link MenuCheckboxItemIndicator} の短縮名です。
 */
export const CheckboxItemIndicator: IComponent<CheckboxItemIndicator.Props> =
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
 */
export const MenuSeparator: IComponent<MenuSeparatorProps> = function SuiMenuSeparator(props) {
  const { className, ...otherProps } = props;

  return <Menu.Separator {...otherProps} className={cn(className, "sui_menu_separator")} />;
};

/**
 * {@link MenuSeparator} の型をまとめた名前空間です。
 */
export namespace Separator {
  /**
   * {@link MenuSeparator} の状態型です。
   */
  export type State = MenuSeparatorState;

  /**
   * {@link MenuSeparator} のプロパティー型です。
   */
  export type Props = MenuSeparatorProps;
}

/**
 * {@link MenuSeparator} の短縮名です。
 */
export const Separator: IComponent<Separator.Props> = MenuSeparator;
