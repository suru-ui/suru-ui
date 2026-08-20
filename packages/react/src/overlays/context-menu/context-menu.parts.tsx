import { ContextMenu } from "@base-ui/react/context-menu";
import { Menu } from "@base-ui/react/menu";
import * as React from "react";

import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

import "./context-menu.css";

// Handle
// ------

/**
 * コンテキストメニューを制御するハンドルです。
 */
export type ContextMenuHandle = Menu.Handle<unknown>;

/**
 * コンテキストメニューを制御するハンドルを新しく作成します。
 *
 * 作成したハンドルを {@link ContextMenuRoot} の `handle` プロパティーに渡すことで、
 * コンテキストメニューの開閉状態を外部から制御できます。
 *
 * @example ハンドルを作成する
 * ```ts
 * const handle = createHandle();
 * ```
 */
export const createHandle: typeof Menu.createHandle = Menu.createHandle;

// Root
// ----

/**
 * {@link ContextMenuRoot} の状態です。
 */
export type ContextMenuRootState = ContextMenu.Root.State;

/**
 * {@link ContextMenuRoot} に渡すプロパティーです。
 */
export type ContextMenuRootProps = Omit<React.ComponentProps<typeof ContextMenu.Root>, "handle"> & {
  /**
   * コンテキストメニューを制御するハンドルです。
   *
   * {@link createHandle} で作成します。
   */
  handle?: ContextMenuHandle | undefined;
};

/**
 * 右クリックまたは長押しで開くコンテキストメニューのルートです。
 *
 * 開閉状態を管理し、各パーツをグループ化します。
 * それ自身は HTML 要素をレンダリングしません。
 */
export const ContextMenuRoot: IComponent<ContextMenuRootProps> = function SuiContextMenuRoot(
  props,
) {
  const { handle, ...otherProps } = props;

  return <ContextMenu.Root {...otherProps} handle={handle} />;
};

/**
 * {@link ContextMenuRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link ContextMenuRootState} です。
   */
  export type State = ContextMenuRootState;

  /**
   * {@link ContextMenuRootProps} です。
   */
  export type Props = ContextMenuRootProps;
}

/**
 * {@link ContextMenuRoot} です。
 */
export const Root: IComponent<Root.Props> = ContextMenuRoot;

// Trigger
// -------

/**
 * {@link ContextMenuTrigger} の状態です。
 */
export type ContextMenuTriggerState = ContextMenu.Trigger.State;

/**
 * {@link ContextMenuTrigger} に渡すプロパティーです。
 */
export type ContextMenuTriggerProps = React.ComponentProps<typeof ContextMenu.Trigger>;

/**
 * 右クリックまたは長押しでコンテキストメニューを開く対象です。
 *
 * 子要素は追加のラッパーなしで `div` 要素に表示されます。
 */
export const ContextMenuTrigger: IComponent<ContextMenuTriggerProps> =
  function SuiContextMenuTrigger(props) {
    const { className, ...otherProps } = props;

    return (
      <ContextMenu.Trigger {...otherProps} className={cn(className, "sui_context_menu_trigger")} />
    );
  };

/**
 * {@link ContextMenuTrigger} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Trigger {
  /**
   * {@link ContextMenuTriggerState} です。
   */
  export type State = ContextMenuTriggerState;

  /**
   * {@link ContextMenuTriggerProps} です。
   */
  export type Props = ContextMenuTriggerProps;
}

/**
 * {@link ContextMenuTrigger} です。
 */
export const Trigger: IComponent<Trigger.Props> = ContextMenuTrigger;

// Portal
// ------

/**
 * {@link ContextMenuPortal} の状態です。
 */
export type ContextMenuPortalState = ContextMenu.Portal.State;

/**
 * {@link ContextMenuPortal} に渡すプロパティーです。
 */
export type ContextMenuPortalProps = React.ComponentProps<typeof ContextMenu.Portal>;

/**
 * コンテキストメニューを DOM の別の場所へ移動する要素です。
 *
 * 既定ではポップアップを `<body>` の末尾に配置します。
 */
export const ContextMenuPortal: IComponent<ContextMenuPortalProps> = function SuiContextMenuPortal(
  props,
) {
  const { className, ...otherProps } = props;

  return (
    <ContextMenu.Portal {...otherProps} className={cn(className, "sui_context_menu_portal")} />
  );
};

/**
 * {@link ContextMenuPortal} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Portal {
  /**
   * {@link ContextMenuPortalState} です。
   */
  export type State = ContextMenuPortalState;

  /**
   * {@link ContextMenuPortalProps} です。
   */
  export type Props = ContextMenuPortalProps;
}

/**
 * {@link ContextMenuPortal} です。
 */
export const Portal: IComponent<Portal.Props> = ContextMenuPortal;

// Backdrop
// --------

/**
 * {@link ContextMenuBackdrop} の状態です。
 */
export type ContextMenuBackdropState = ContextMenu.Backdrop.State;

/**
 * {@link ContextMenuBackdrop} に渡すプロパティーです。
 */
export type ContextMenuBackdropProps = React.ComponentProps<typeof ContextMenu.Backdrop>;

/**
 * コンテキストメニューの背後に表示されるオーバーレイ要素です。
 */
export const ContextMenuBackdrop: IComponent<ContextMenuBackdropProps> =
  function SuiContextMenuBackdrop(props) {
    const { className, ...otherProps } = props;

    return (
      <ContextMenu.Backdrop
        {...otherProps}
        className={cn(className, "sui_context_menu_backdrop")}
      />
    );
  };

/**
 * {@link ContextMenuBackdrop} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Backdrop {
  /**
   * {@link ContextMenuBackdropState} です。
   */
  export type State = ContextMenuBackdropState;

  /**
   * {@link ContextMenuBackdropProps} です。
   */
  export type Props = ContextMenuBackdropProps;
}

/**
 * {@link ContextMenuBackdrop} です。
 */
export const Backdrop: IComponent<Backdrop.Props> = ContextMenuBackdrop;

// Positioner
// ----------

/**
 * {@link ContextMenuPositioner} の状態です。
 */
export type ContextMenuPositionerState = ContextMenu.Positioner.State;

/**
 * {@link ContextMenuPositioner} に渡すプロパティーです。
 */
export type ContextMenuPositionerProps = React.ComponentProps<typeof ContextMenu.Positioner>;

/**
 * ポップアップを右クリックまたは長押しした位置に合わせる要素です。
 */
export const ContextMenuPositioner: IComponent<ContextMenuPositionerProps> =
  function SuiContextMenuPositioner(props) {
    const { className, ...otherProps } = props;

    return (
      <ContextMenu.Positioner
        {...otherProps}
        className={cn(className, "sui_context_menu_positioner")}
      />
    );
  };

/**
 * {@link ContextMenuPositioner} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Positioner {
  /**
   * {@link ContextMenuPositionerState} です。
   */
  export type State = ContextMenuPositionerState;

  /**
   * {@link ContextMenuPositionerProps} です。
   */
  export type Props = ContextMenuPositionerProps;
}

/**
 * {@link ContextMenuPositioner} です。
 */
export const Positioner: IComponent<Positioner.Props> = ContextMenuPositioner;

// Popup
// -----

/**
 * {@link ContextMenuPopup} の状態です。
 */
export type ContextMenuPopupState = ContextMenu.Popup.State;

/**
 * {@link ContextMenuPopup} に渡すプロパティーです。
 */
export type ContextMenuPopupProps = React.ComponentProps<typeof ContextMenu.Popup>;

/**
 * コンテキストメニュー項目を表示するポップアップ要素です。
 */
export const ContextMenuPopup: IComponent<ContextMenuPopupProps> = function SuiContextMenuPopup(
  props,
) {
  const { className, ...otherProps } = props;

  return <ContextMenu.Popup {...otherProps} className={cn(className, "sui_context_menu_popup")} />;
};

/**
 * {@link ContextMenuPopup} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Popup {
  /**
   * {@link ContextMenuPopupState} です。
   */
  export type State = ContextMenuPopupState;

  /**
   * {@link ContextMenuPopupProps} です。
   */
  export type Props = ContextMenuPopupProps;
}

/**
 * {@link ContextMenuPopup} です。
 */
export const Popup: IComponent<Popup.Props> = ContextMenuPopup;

// Arrow
// -----

/**
 * {@link ContextMenuArrow} の状態です。
 */
export type ContextMenuArrowState = ContextMenu.Arrow.State;

/**
 * {@link ContextMenuArrow} に渡すプロパティーです。
 */
export type ContextMenuArrowProps = React.ComponentProps<typeof ContextMenu.Arrow>;

/**
 * ポップアップと対象をつなぐ矢印要素です。
 */
export const ContextMenuArrow: IComponent<ContextMenuArrowProps> = function SuiContextMenuArrow(
  props,
) {
  const { className, ...otherProps } = props;

  return <ContextMenu.Arrow {...otherProps} className={cn(className, "sui_context_menu_arrow")} />;
};

/**
 * {@link ContextMenuArrow} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Arrow {
  /**
   * {@link ContextMenuArrowState} です。
   */
  export type State = ContextMenuArrowState;

  /**
   * {@link ContextMenuArrowProps} です。
   */
  export type Props = ContextMenuArrowProps;
}

/**
 * {@link ContextMenuArrow} です。
 */
export const Arrow: IComponent<Arrow.Props> = ContextMenuArrow;

// Item
// ----

/**
 * {@link ContextMenuItem} の状態です。
 */
export type ContextMenuItemState = ContextMenu.Item.State;

/**
 * {@link ContextMenuItem} に渡すプロパティーです。
 */
export type ContextMenuItemProps = React.ComponentProps<typeof ContextMenu.Item>;

/**
 * コンテキストメニューの操作項目です。
 */
export const ContextMenuItem: IComponent<ContextMenuItemProps> = function SuiContextMenuItem(
  props,
) {
  const { className, ...otherProps } = props;

  return <ContextMenu.Item {...otherProps} className={cn(className, "sui_context_menu_item")} />;
};

/**
 * {@link ContextMenuItem} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Item {
  /**
   * {@link ContextMenuItemState} です。
   */
  export type State = ContextMenuItemState;

  /**
   * {@link ContextMenuItemProps} です。
   */
  export type Props = ContextMenuItemProps;
}

/**
 * {@link ContextMenuItem} です。
 */
export const Item: IComponent<Item.Props> = ContextMenuItem;

// LinkItem
// --------

/**
 * {@link ContextMenuLinkItem} の状態です。
 */
export type ContextMenuLinkItemState = ContextMenu.LinkItem.State;

/**
 * {@link ContextMenuLinkItem} に渡すプロパティーです。
 */
export type ContextMenuLinkItemProps = React.ComponentProps<typeof ContextMenu.LinkItem>;

/**
 * 別のページやセクションへ移動するコンテキストメニュー項目です。
 */
export const ContextMenuLinkItem: IComponent<ContextMenuLinkItemProps> =
  function SuiContextMenuLinkItem(props) {
    const { className, ...otherProps } = props;

    return (
      <ContextMenu.LinkItem
        {...otherProps}
        className={cn(className, "sui_context_menu_item", "sui_context_menu_link_item")}
      />
    );
  };

/**
 * {@link ContextMenuLinkItem} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace LinkItem {
  /**
   * {@link ContextMenuLinkItemState} です。
   */
  export type State = ContextMenuLinkItemState;

  /**
   * {@link ContextMenuLinkItemProps} です。
   */
  export type Props = ContextMenuLinkItemProps;
}

/**
 * {@link ContextMenuLinkItem} です。
 */
export const LinkItem: IComponent<LinkItem.Props> = ContextMenuLinkItem;

// SubmenuRoot
// -----------

/**
 * {@link ContextMenuSubmenuRoot} の状態です。
 */
export type ContextMenuSubmenuRootState = ContextMenu.SubmenuRoot.State;

/**
 * {@link ContextMenuSubmenuRoot} に渡すプロパティーです。
 */
export type ContextMenuSubmenuRootProps = React.ComponentProps<typeof ContextMenu.SubmenuRoot>;

/**
 * サブメニューのルートです。
 *
 * それ自身は HTML 要素をレンダリングしません。
 */
export const ContextMenuSubmenuRoot: IComponent<ContextMenuSubmenuRootProps> =
  function SuiContextMenuSubmenuRoot(props) {
    return <ContextMenu.SubmenuRoot {...props} />;
  };

/**
 * {@link ContextMenuSubmenuRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace SubmenuRoot {
  /**
   * {@link ContextMenuSubmenuRootState} です。
   */
  export type State = ContextMenuSubmenuRootState;

  /**
   * {@link ContextMenuSubmenuRootProps} です。
   */
  export type Props = ContextMenuSubmenuRootProps;
}

/**
 * {@link ContextMenuSubmenuRoot} です。
 */
export const SubmenuRoot: IComponent<SubmenuRoot.Props> = ContextMenuSubmenuRoot;

// SubmenuTrigger
// --------------

/**
 * {@link ContextMenuSubmenuTrigger} の状態です。
 */
export type ContextMenuSubmenuTriggerState = ContextMenu.SubmenuTrigger.State;

/**
 * {@link ContextMenuSubmenuTrigger} に渡すプロパティーです。
 */
export type ContextMenuSubmenuTriggerProps = React.ComponentProps<
  typeof ContextMenu.SubmenuTrigger
>;

/**
 * サブメニューを開くコンテキストメニュー項目です。
 */
export const ContextMenuSubmenuTrigger: IComponent<ContextMenuSubmenuTriggerProps> =
  function SuiContextMenuSubmenuTrigger(props) {
    const { className, ...otherProps } = props;

    return (
      <ContextMenu.SubmenuTrigger
        {...otherProps}
        className={cn(className, "sui_context_menu_item", "sui_context_menu_submenu_trigger")}
      />
    );
  };

/**
 * {@link ContextMenuSubmenuTrigger} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace SubmenuTrigger {
  /**
   * {@link ContextMenuSubmenuTriggerState} です。
   */
  export type State = ContextMenuSubmenuTriggerState;

  /**
   * {@link ContextMenuSubmenuTriggerProps} です。
   */
  export type Props = ContextMenuSubmenuTriggerProps;
}

/**
 * {@link ContextMenuSubmenuTrigger} です。
 */
export const SubmenuTrigger: IComponent<SubmenuTrigger.Props> = ContextMenuSubmenuTrigger;

// Group
// -----

/**
 * {@link ContextMenuGroup} の状態です。
 */
export type ContextMenuGroupState = ContextMenu.Group.State;

/**
 * {@link ContextMenuGroup} に渡すプロパティーです。
 */
export type ContextMenuGroupProps = React.ComponentProps<typeof ContextMenu.Group>;

/**
 * 関連するコンテキストメニュー項目をまとめるグループ要素です。
 */
export const ContextMenuGroup: IComponent<ContextMenuGroupProps> = function SuiContextMenuGroup(
  props,
) {
  const { className, ...otherProps } = props;

  return <ContextMenu.Group {...otherProps} className={cn(className, "sui_context_menu_group")} />;
};

/**
 * {@link ContextMenuGroup} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Group {
  /**
   * {@link ContextMenuGroupState} です。
   */
  export type State = ContextMenuGroupState;

  /**
   * {@link ContextMenuGroupProps} です。
   */
  export type Props = ContextMenuGroupProps;
}

/**
 * {@link ContextMenuGroup} です。
 */
export const Group: IComponent<Group.Props> = ContextMenuGroup;

// GroupLabel
// ----------

/**
 * {@link ContextMenuGroupLabel} の状態です。
 */
export type ContextMenuGroupLabelState = ContextMenu.GroupLabel.State;

/**
 * {@link ContextMenuGroupLabel} に渡すプロパティーです。
 */
export type ContextMenuGroupLabelProps = React.ComponentProps<typeof ContextMenu.GroupLabel>;

/**
 * グループに自動的に対応付けられるラベル要素です。
 */
export const ContextMenuGroupLabel: IComponent<ContextMenuGroupLabelProps> =
  function SuiContextMenuGroupLabel(props) {
    const { className, ...otherProps } = props;

    return (
      <ContextMenu.GroupLabel
        {...otherProps}
        className={cn(className, "sui_context_menu_group_label")}
      />
    );
  };

/**
 * {@link ContextMenuGroupLabel} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace GroupLabel {
  /**
   * {@link ContextMenuGroupLabelState} です。
   */
  export type State = ContextMenuGroupLabelState;

  /**
   * {@link ContextMenuGroupLabelProps} です。
   */
  export type Props = ContextMenuGroupLabelProps;
}

/**
 * {@link ContextMenuGroupLabel} です。
 */
export const GroupLabel: IComponent<GroupLabel.Props> = ContextMenuGroupLabel;

// RadioGroup
// ----------

/**
 * {@link ContextMenuRadioGroup} の状態です。
 */
export type ContextMenuRadioGroupState = ContextMenu.RadioGroup.State;

/**
 * {@link ContextMenuRadioGroup} に渡すプロパティーです。
 */
export type ContextMenuRadioGroupProps = React.ComponentProps<typeof ContextMenu.RadioGroup>;

/**
 * ラジオ項目をまとめるグループ要素です。
 */
export const ContextMenuRadioGroup: IComponent<ContextMenuRadioGroupProps> =
  function SuiContextMenuRadioGroup(props) {
    const { className, ...otherProps } = props;

    return (
      <ContextMenu.RadioGroup
        {...otherProps}
        className={cn(className, "sui_context_menu_radio_group")}
      />
    );
  };

/**
 * {@link ContextMenuRadioGroup} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace RadioGroup {
  /**
   * {@link ContextMenuRadioGroupState} です。
   */
  export type State = ContextMenuRadioGroupState;

  /**
   * {@link ContextMenuRadioGroupProps} です。
   */
  export type Props = ContextMenuRadioGroupProps;
}

/**
 * {@link ContextMenuRadioGroup} です。
 */
export const RadioGroup: IComponent<RadioGroup.Props> = ContextMenuRadioGroup;

// RadioItem
// ---------

/**
 * {@link ContextMenuRadioItem} の状態です。
 */
export type ContextMenuRadioItemState = ContextMenu.RadioItem.State;

/**
 * {@link ContextMenuRadioItem} に渡すプロパティーです。
 */
export type ContextMenuRadioItemProps = React.ComponentProps<typeof ContextMenu.RadioItem>;

/**
 * ラジオグループ内のコンテキストメニュー項目です。
 */
export const ContextMenuRadioItem: IComponent<ContextMenuRadioItemProps> =
  function SuiContextMenuRadioItem(props) {
    const { className, ...otherProps } = props;

    return (
      <ContextMenu.RadioItem
        {...otherProps}
        className={cn(className, "sui_context_menu_item", "sui_context_menu_radio_item")}
      />
    );
  };

/**
 * {@link ContextMenuRadioItem} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace RadioItem {
  /**
   * {@link ContextMenuRadioItemState} です。
   */
  export type State = ContextMenuRadioItemState;

  /**
   * {@link ContextMenuRadioItemProps} です。
   */
  export type Props = ContextMenuRadioItemProps;
}

/**
 * {@link ContextMenuRadioItem} です。
 */
export const RadioItem: IComponent<RadioItem.Props> = ContextMenuRadioItem;

// RadioItemIndicator
// ------------------

/**
 * {@link ContextMenuRadioItemIndicator} の状態です。
 */
export type ContextMenuRadioItemIndicatorState = ContextMenu.RadioItemIndicator.State;

/**
 * {@link ContextMenuRadioItemIndicator} に渡すプロパティーです。
 */
export type ContextMenuRadioItemIndicatorProps = React.ComponentProps<
  typeof ContextMenu.RadioItemIndicator
>;

/**
 * 選択されたラジオ項目を示す要素です。
 */
export const ContextMenuRadioItemIndicator: IComponent<ContextMenuRadioItemIndicatorProps> =
  function SuiContextMenuRadioItemIndicator(props) {
    const { className, keepMounted = true, ...otherProps } = props;

    return (
      <ContextMenu.RadioItemIndicator
        {...otherProps}
        className={cn(
          className,
          "sui_context_menu_item_indicator",
          "sui_context_menu_radio_item_indicator",
        )}
        keepMounted={keepMounted}
      />
    );
  };

/**
 * {@link ContextMenuRadioItemIndicator} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace RadioItemIndicator {
  /**
   * {@link ContextMenuRadioItemIndicatorState} です。
   */
  export type State = ContextMenuRadioItemIndicatorState;

  /**
   * {@link ContextMenuRadioItemIndicatorProps} です。
   */
  export type Props = ContextMenuRadioItemIndicatorProps;
}

/**
 * {@link ContextMenuRadioItemIndicator} です。
 */
export const RadioItemIndicator: IComponent<RadioItemIndicator.Props> =
  ContextMenuRadioItemIndicator;

// CheckboxItem
// ------------

/**
 * {@link ContextMenuCheckboxItem} の状態です。
 */
export type ContextMenuCheckboxItemState = ContextMenu.CheckboxItem.State;

/**
 * {@link ContextMenuCheckboxItem} に渡すプロパティーです。
 */
export type ContextMenuCheckboxItemProps = React.ComponentProps<typeof ContextMenu.CheckboxItem>;

/**
 * 設定をオンまたはオフにできるコンテキストメニュー項目です。
 */
export const ContextMenuCheckboxItem: IComponent<ContextMenuCheckboxItemProps> =
  function SuiContextMenuCheckboxItem(props) {
    const { className, ...otherProps } = props;

    return (
      <ContextMenu.CheckboxItem
        {...otherProps}
        className={cn(className, "sui_context_menu_item", "sui_context_menu_checkbox_item")}
      />
    );
  };

/**
 * {@link ContextMenuCheckboxItem} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace CheckboxItem {
  /**
   * {@link ContextMenuCheckboxItemState} です。
   */
  export type State = ContextMenuCheckboxItemState;

  /**
   * {@link ContextMenuCheckboxItemProps} です。
   */
  export type Props = ContextMenuCheckboxItemProps;
}

/**
 * {@link ContextMenuCheckboxItem} です。
 */
export const CheckboxItem: IComponent<CheckboxItem.Props> = ContextMenuCheckboxItem;

// CheckboxItemIndicator
// ---------------------

/**
 * {@link ContextMenuCheckboxItemIndicator} の状態です。
 */
export type ContextMenuCheckboxItemIndicatorState = ContextMenu.CheckboxItemIndicator.State;

/**
 * {@link ContextMenuCheckboxItemIndicator} に渡すプロパティーです。
 */
export type ContextMenuCheckboxItemIndicatorProps = React.ComponentProps<
  typeof ContextMenu.CheckboxItemIndicator
>;

/**
 * チェックされた項目を示す要素です。
 */
export const ContextMenuCheckboxItemIndicator: IComponent<ContextMenuCheckboxItemIndicatorProps> =
  function SuiContextMenuCheckboxItemIndicator(props) {
    const { className, keepMounted = true, ...otherProps } = props;

    return (
      <ContextMenu.CheckboxItemIndicator
        {...otherProps}
        className={cn(
          className,
          "sui_context_menu_item_indicator",
          "sui_context_menu_checkbox_item_indicator",
        )}
        keepMounted={keepMounted}
      />
    );
  };

/**
 * {@link ContextMenuCheckboxItemIndicator} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace CheckboxItemIndicator {
  /**
   * {@link ContextMenuCheckboxItemIndicatorState} です。
   */
  export type State = ContextMenuCheckboxItemIndicatorState;

  /**
   * {@link ContextMenuCheckboxItemIndicatorProps} です。
   */
  export type Props = ContextMenuCheckboxItemIndicatorProps;
}

/**
 * {@link ContextMenuCheckboxItemIndicator} です。
 */
export const CheckboxItemIndicator: IComponent<CheckboxItemIndicator.Props> =
  ContextMenuCheckboxItemIndicator;

// Separator
// ---------

/**
 * {@link ContextMenuSeparator} の状態です。
 */
export type ContextMenuSeparatorState = ContextMenu.Separator.State;

/**
 * {@link ContextMenuSeparator} に渡すプロパティーです。
 */
export type ContextMenuSeparatorProps = React.ComponentProps<typeof ContextMenu.Separator>;

/**
 * コンテキストメニュー項目を区切る要素です。
 */
export const ContextMenuSeparator: IComponent<ContextMenuSeparatorProps> =
  function SuiContextMenuSeparator(props) {
    const { className, ...otherProps } = props;

    return (
      <ContextMenu.Separator
        {...otherProps}
        className={cn(className, "sui_context_menu_separator")}
      />
    );
  };

/**
 * {@link ContextMenuSeparator} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Separator {
  /**
   * {@link ContextMenuSeparatorState} です。
   */
  export type State = ContextMenuSeparatorState;

  /**
   * {@link ContextMenuSeparatorProps} です。
   */
  export type Props = ContextMenuSeparatorProps;
}

/**
 * {@link ContextMenuSeparator} です。
 */
export const Separator: IComponent<Separator.Props> = ContextMenuSeparator;
