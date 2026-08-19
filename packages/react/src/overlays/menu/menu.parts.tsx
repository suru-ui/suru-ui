import { Menu } from "@base-ui/react/menu";
import * as React from "react";

import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

import "./menu.css";

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
 * {@link MenuRoot} の状態です。
 */
export type MenuRootState = Menu.Root.State;

/**
 * {@link MenuRoot} に渡すプロパティーです。
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
 * {@link MenuRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link MenuRootState} です。
   */
  export type State = MenuRootState;

  /**
   * {@link MenuRootProps} です。
   */
  export type Props<TPayload = unknown> = MenuRootProps<TPayload>;
}

/**
 * {@link MenuRoot} です。
 */
export const Root: MenuRootComponent = MenuRoot;

// Trigger
// -------

/**
 * {@link MenuTrigger} の状態です。
 */
export type MenuTriggerState = Menu.Trigger.State;

/**
 * {@link MenuTrigger} に渡すプロパティーです。
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
  const { handle, children, className, ...otherProps } = props;

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
 * {@link MenuTrigger} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Trigger {
  /**
   * {@link MenuTriggerState} です。
   */
  export type State = MenuTriggerState;

  /**
   * {@link MenuTriggerProps} です。
   */
  export type Props<TPayload = unknown> = MenuTriggerProps<TPayload>;
}

/**
 * {@link MenuTrigger} です。
 */
export const Trigger: MenuTriggerComponent = MenuTrigger;

// Portal
// ------

/**
 * {@link MenuPortal} の状態です。
 */
export type MenuPortalState = Menu.Portal.State;

/**
 * {@link MenuPortal} に渡すプロパティーです。
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
 * {@link MenuPortal} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Portal {
  /**
   * {@link MenuPortalState} です。
   */
  export type State = MenuPortalState;

  /**
   * {@link MenuPortalProps} です。
   */
  export type Props = MenuPortalProps;
}

/**
 * {@link MenuPortal} です。
 */
export const Portal: IComponent<Portal.Props> = MenuPortal;

// Backdrop
// --------

/**
 * {@link MenuBackdrop} の状態です。
 */
export type MenuBackdropState = Menu.Backdrop.State;

/**
 * {@link MenuBackdrop} に渡すプロパティーです。
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
 * {@link MenuBackdrop} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Backdrop {
  /**
   * {@link MenuBackdropState} です。
   */
  export type State = MenuBackdropState;

  /**
   * {@link MenuBackdropProps} です。
   */
  export type Props = MenuBackdropProps;
}

/**
 * {@link MenuBackdrop} です。
 */
export const Backdrop: IComponent<Backdrop.Props> = MenuBackdrop;

// Positioner
// ----------

/**
 * {@link MenuPositioner} の状態です。
 */
export type MenuPositionerState = Menu.Positioner.State;

/**
 * {@link MenuPositioner} に渡すプロパティーです。
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
 * {@link MenuPositioner} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Positioner {
  /**
   * {@link MenuPositionerState} です。
   */
  export type State = MenuPositionerState;

  /**
   * {@link MenuPositionerProps} です。
   */
  export type Props = MenuPositionerProps;
}

/**
 * {@link MenuPositioner} です。
 */
export const Positioner: IComponent<Positioner.Props> = MenuPositioner;

// Popup
// -----

/**
 * {@link MenuPopup} の状態です。
 */
export type MenuPopupState = Menu.Popup.State;

/**
 * {@link MenuPopup} に渡すプロパティーです。
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
 * {@link MenuPopup} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Popup {
  /**
   * {@link MenuPopupState} です。
   */
  export type State = MenuPopupState;

  /**
   * {@link MenuPopupProps} です。
   */
  export type Props = MenuPopupProps;
}

/**
 * {@link MenuPopup} です。
 */
export const Popup: IComponent<Popup.Props> = MenuPopup;

// Arrow
// -----

/**
 * {@link MenuArrow} の状態です。
 */
export type MenuArrowState = Menu.Arrow.State;

/**
 * {@link MenuArrow} に渡すプロパティーです。
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
 * {@link MenuArrow} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Arrow {
  /**
   * {@link MenuArrowState} です。
   */
  export type State = MenuArrowState;

  /**
   * {@link MenuArrowProps} です。
   */
  export type Props = MenuArrowProps;
}

/**
 * {@link MenuArrow} です。
 */
export const Arrow: IComponent<Arrow.Props> = MenuArrow;

// Viewport
// --------

/**
 * {@link MenuViewport} の状態です。
 */
export type MenuViewportState = Menu.Viewport.State;

/**
 * {@link MenuViewport} に渡すプロパティーです。
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
 * {@link MenuViewport} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Viewport {
  /**
   * {@link MenuViewportState} です。
   */
  export type State = MenuViewportState;

  /**
   * {@link MenuViewportProps} です。
   */
  export type Props = MenuViewportProps;
}

/**
 * {@link MenuViewport} です。
 */
export const Viewport: IComponent<Viewport.Props> = MenuViewport;

// Item
// ----

/**
 * {@link MenuItem} の状態です。
 */
export type MenuItemState = Menu.Item.State;

/**
 * {@link MenuItem} に渡すプロパティーです。
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
 * {@link MenuItem} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Item {
  /**
   * {@link MenuItemState} です。
   */
  export type State = MenuItemState;

  /**
   * {@link MenuItemProps} です。
   */
  export type Props = MenuItemProps;
}

/**
 * {@link MenuItem} です。
 */
export const Item: IComponent<Item.Props> = MenuItem;

// LinkItem
// --------

/**
 * {@link MenuLinkItem} の状態です。
 */
export type MenuLinkItemState = Menu.LinkItem.State;

/**
 * {@link MenuLinkItem} に渡すプロパティーです。
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
 * {@link MenuLinkItem} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace LinkItem {
  /**
   * {@link MenuLinkItemState} です。
   */
  export type State = MenuLinkItemState;

  /**
   * {@link MenuLinkItemProps} です。
   */
  export type Props = MenuLinkItemProps;
}

/**
 * {@link MenuLinkItem} です。
 */
export const LinkItem: IComponent<LinkItem.Props> = MenuLinkItem;

// SubmenuRoot
// -----------

/**
 * {@link MenuSubmenuRoot} の状態です。
 */
export type MenuSubmenuRootState = Menu.SubmenuRoot.State;

/**
 * {@link MenuSubmenuRoot} に渡すプロパティーです。
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
 * {@link MenuSubmenuRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace SubmenuRoot {
  /**
   * {@link MenuSubmenuRootState} です。
   */
  export type State = MenuSubmenuRootState;

  /**
   * {@link MenuSubmenuRootProps} です。
   */
  export type Props = MenuSubmenuRootProps;
}

/**
 * {@link MenuSubmenuRoot} です。
 */
export const SubmenuRoot: IComponent<SubmenuRoot.Props> = MenuSubmenuRoot;

// SubmenuTrigger
// --------------

/**
 * {@link MenuSubmenuTrigger} の状態です。
 */
export type MenuSubmenuTriggerState = Menu.SubmenuTrigger.State;

/**
 * {@link MenuSubmenuTrigger} に渡すプロパティーです。
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
 * {@link MenuSubmenuTrigger} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace SubmenuTrigger {
  /**
   * {@link MenuSubmenuTriggerState} です。
   */
  export type State = MenuSubmenuTriggerState;

  /**
   * {@link MenuSubmenuTriggerProps} です。
   */
  export type Props = MenuSubmenuTriggerProps;
}

/**
 * {@link MenuSubmenuTrigger} です。
 */
export const SubmenuTrigger: IComponent<SubmenuTrigger.Props> = MenuSubmenuTrigger;

// Group
// -----

/**
 * {@link MenuGroup} の状態です。
 */
export type MenuGroupState = Menu.Group.State;

/**
 * {@link MenuGroup} に渡すプロパティーです。
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
 * {@link MenuGroup} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Group {
  /**
   * {@link MenuGroupState} です。
   */
  export type State = MenuGroupState;

  /**
   * {@link MenuGroupProps} です。
   */
  export type Props = MenuGroupProps;
}

/**
 * {@link MenuGroup} です。
 */
export const Group: IComponent<Group.Props> = MenuGroup;

// GroupLabel
// ----------

/**
 * {@link MenuGroupLabel} の状態です。
 */
export type MenuGroupLabelState = Menu.GroupLabel.State;

/**
 * {@link MenuGroupLabel} に渡すプロパティーです。
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
 * {@link MenuGroupLabel} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace GroupLabel {
  /**
   * {@link MenuGroupLabelState} です。
   */
  export type State = MenuGroupLabelState;

  /**
   * {@link MenuGroupLabelProps} です。
   */
  export type Props = MenuGroupLabelProps;
}

/**
 * {@link MenuGroupLabel} です。
 */
export const GroupLabel: IComponent<GroupLabel.Props> = MenuGroupLabel;

// RadioGroup
// ----------

/**
 * {@link MenuRadioGroup} の状態です。
 */
export type MenuRadioGroupState = Menu.RadioGroup.State;

/**
 * {@link MenuRadioGroup} に渡すプロパティーです。
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
 * {@link MenuRadioGroup} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace RadioGroup {
  /**
   * {@link MenuRadioGroupState} です。
   */
  export type State = MenuRadioGroupState;

  /**
   * {@link MenuRadioGroupProps} です。
   */
  export type Props = MenuRadioGroupProps;
}

/**
 * {@link MenuRadioGroup} です。
 */
export const RadioGroup: IComponent<RadioGroup.Props> = MenuRadioGroup;

// RadioItem
// ---------

/**
 * {@link MenuRadioItem} の状態です。
 */
export type MenuRadioItemState = Menu.RadioItem.State;

/**
 * {@link MenuRadioItem} に渡すプロパティーです。
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
 * {@link MenuRadioItem} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace RadioItem {
  /**
   * {@link MenuRadioItemState} です。
   */
  export type State = MenuRadioItemState;

  /**
   * {@link MenuRadioItemProps} です。
   */
  export type Props = MenuRadioItemProps;
}

/**
 * {@link MenuRadioItem} です。
 */
export const RadioItem: IComponent<RadioItem.Props> = MenuRadioItem;

// RadioItemIndicator
// ------------------

/**
 * {@link MenuRadioItemIndicator} の状態です。
 */
export type MenuRadioItemIndicatorState = Menu.RadioItemIndicator.State;

/**
 * {@link MenuRadioItemIndicator} に渡すプロパティーです。
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
 * {@link MenuRadioItemIndicator} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace RadioItemIndicator {
  /**
   * {@link MenuRadioItemIndicatorState} です。
   */
  export type State = MenuRadioItemIndicatorState;

  /**
   * {@link MenuRadioItemIndicatorProps} です。
   */
  export type Props = MenuRadioItemIndicatorProps;
}

/**
 * {@link MenuRadioItemIndicator} です。
 */
export const RadioItemIndicator: IComponent<RadioItemIndicator.Props> = MenuRadioItemIndicator;

// CheckboxItem
// ------------

/**
 * {@link MenuCheckboxItem} の状態です。
 */
export type MenuCheckboxItemState = Menu.CheckboxItem.State;

/**
 * {@link MenuCheckboxItem} に渡すプロパティーです。
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
 * {@link MenuCheckboxItem} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace CheckboxItem {
  /**
   * {@link MenuCheckboxItemState} です。
   */
  export type State = MenuCheckboxItemState;

  /**
   * {@link MenuCheckboxItemProps} です。
   */
  export type Props = MenuCheckboxItemProps;
}

/**
 * {@link MenuCheckboxItem} です。
 */
export const CheckboxItem: IComponent<CheckboxItem.Props> = MenuCheckboxItem;

// CheckboxItemIndicator
// ---------------------

/**
 * {@link MenuCheckboxItemIndicator} の状態です。
 */
export type MenuCheckboxItemIndicatorState = Menu.CheckboxItemIndicator.State;

/**
 * {@link MenuCheckboxItemIndicator} に渡すプロパティーです。
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
 * {@link MenuCheckboxItemIndicator} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace CheckboxItemIndicator {
  /**
   * {@link MenuCheckboxItemIndicatorState} です。
   */
  export type State = MenuCheckboxItemIndicatorState;

  /**
   * {@link MenuCheckboxItemIndicatorProps} です。
   */
  export type Props = MenuCheckboxItemIndicatorProps;
}

/**
 * {@link MenuCheckboxItemIndicator} です。
 */
export const CheckboxItemIndicator: IComponent<CheckboxItemIndicator.Props> =
  MenuCheckboxItemIndicator;

// Separator
// ---------

/**
 * {@link MenuSeparator} の状態です。
 */
export type MenuSeparatorState = Menu.Separator.State;

/**
 * {@link MenuSeparator} に渡すプロパティーです。
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
 * {@link MenuSeparator} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Separator {
  /**
   * {@link MenuSeparatorState} です。
   */
  export type State = MenuSeparatorState;

  /**
   * {@link MenuSeparatorProps} です。
   */
  export type Props = MenuSeparatorProps;
}

/**
 * {@link MenuSeparator} です。
 */
export const Separator: IComponent<Separator.Props> = MenuSeparator;
