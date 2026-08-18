import { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

import "./context-menu.css";
import "../menu/menu.css";

// Types
// -----

// Root
// ----

/**
 * {@link Root} の状態です。
 */
export type ContextMenuRootState = ContextMenu.Root.State;

/**
 * {@link Root} に渡すプロパティーです。
 */
export type ContextMenuRootProps = React.ComponentProps<typeof ContextMenu.Root>;

/**
 * 右クリックまたは長押しで開くコンテキストメニューのルートです。
 *
 * 開閉状態を管理し、各パーツをグループ化します。
 * それ自身は HTML 要素をレンダリングしません。
 */
export const ContextMenuRoot: IComponent<ContextMenuRootProps> = function SuiContextMenuRoot(
  props,
) {
  return <ContextMenu.Root {...props} />;
};

/**
 * {@link ContextMenuRoot} の型をまとめた名前空間です。
 */
export namespace Root {
  /**
   * {@link ContextMenuRoot} の状態型です。
   */
  export type State = ContextMenuRootState;

  /**
   * {@link ContextMenuRoot} のプロパティー型です。
   */
  export type Props = ContextMenuRootProps;
}

/**
 * {@link ContextMenuRoot} の短縮名です。
 */
export const Root: IComponent<Root.Props> = ContextMenuRoot;

// Trigger
// -------

/**
 * {@link Trigger} の状態です。
 */
export type ContextMenuTriggerState = ContextMenu.Trigger.State;

/**
 * {@link Trigger} に渡すプロパティーです。
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
 * {@link ContextMenuTrigger} の型をまとめた名前空間です。
 */
export namespace Trigger {
  /**
   * {@link ContextMenuTrigger} の状態型です。
   */
  export type State = ContextMenuTriggerState;

  /**
   * {@link ContextMenuTrigger} のプロパティー型です。
   */
  export type Props = ContextMenuTriggerProps;
}

/**
 * {@link ContextMenuTrigger} の短縮名です。
 */
export const Trigger: IComponent<Trigger.Props> = ContextMenuTrigger;

// Portal
// ------

/**
 * {@link Portal} の状態です。
 */
export type ContextMenuPortalState = ContextMenu.Portal.State;

/**
 * {@link Portal} に渡すプロパティーです。
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
    <ContextMenu.Portal
      {...otherProps}
      className={cn(className, "sui_context_menu_portal", "sui_menu_portal")}
    />
  );
};

/**
 * {@link ContextMenuPortal} の型をまとめた名前空間です。
 */
export namespace Portal {
  /**
   * {@link ContextMenuPortal} の状態型です。
   */
  export type State = ContextMenuPortalState;

  /**
   * {@link ContextMenuPortal} のプロパティー型です。
   */
  export type Props = ContextMenuPortalProps;
}

/**
 * {@link ContextMenuPortal} の短縮名です。
 */
export const Portal: IComponent<Portal.Props> = ContextMenuPortal;

// Backdrop
// --------

/**
 * {@link Backdrop} の状態です。
 */
export type ContextMenuBackdropState = ContextMenu.Backdrop.State;

/**
 * {@link Backdrop} に渡すプロパティーです。
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
        className={cn(className, "sui_context_menu_backdrop", "sui_menu_backdrop")}
      />
    );
  };

/**
 * {@link ContextMenuBackdrop} の型をまとめた名前空間です。
 */
export namespace Backdrop {
  /**
   * {@link ContextMenuBackdrop} の状態型です。
   */
  export type State = ContextMenuBackdropState;

  /**
   * {@link ContextMenuBackdrop} のプロパティー型です。
   */
  export type Props = ContextMenuBackdropProps;
}

/**
 * {@link ContextMenuBackdrop} の短縮名です。
 */
export const Backdrop: IComponent<Backdrop.Props> = ContextMenuBackdrop;

// Positioner
// ----------

/**
 * {@link Positioner} の状態です。
 */
export type ContextMenuPositionerState = ContextMenu.Positioner.State;

/**
 * {@link Positioner} に渡すプロパティーです。
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
        className={cn(className, "sui_context_menu_positioner", "sui_menu_positioner")}
      />
    );
  };

/**
 * {@link ContextMenuPositioner} の型をまとめた名前空間です。
 */
export namespace Positioner {
  /**
   * {@link ContextMenuPositioner} の状態型です。
   */
  export type State = ContextMenuPositionerState;

  /**
   * {@link ContextMenuPositioner} のプロパティー型です。
   */
  export type Props = ContextMenuPositionerProps;
}

/**
 * {@link ContextMenuPositioner} の短縮名です。
 */
export const Positioner: IComponent<Positioner.Props> = ContextMenuPositioner;

// Popup
// -----

/**
 * {@link Popup} の状態です。
 */
export type ContextMenuPopupState = ContextMenu.Popup.State;

/**
 * {@link Popup} に渡すプロパティーです。
 */
export type ContextMenuPopupProps = React.ComponentProps<typeof ContextMenu.Popup>;

/**
 * コンテキストメニュー項目を表示するポップアップ要素です。
 */
export const ContextMenuPopup: IComponent<ContextMenuPopupProps> = function SuiContextMenuPopup(
  props,
) {
  const { className, ...otherProps } = props;

  return (
    <ContextMenu.Popup
      {...otherProps}
      className={cn(className, "sui_context_menu_popup", "sui_menu_popup")}
    />
  );
};

/**
 * {@link ContextMenuPopup} の型をまとめた名前空間です。
 */
export namespace Popup {
  /**
   * {@link ContextMenuPopup} の状態型です。
   */
  export type State = ContextMenuPopupState;

  /**
   * {@link ContextMenuPopup} のプロパティー型です。
   */
  export type Props = ContextMenuPopupProps;
}

/**
 * {@link ContextMenuPopup} の短縮名です。
 */
export const Popup: IComponent<Popup.Props> = ContextMenuPopup;

// Arrow
// -----

/**
 * {@link Arrow} の状態です。
 */
export type ContextMenuArrowState = ContextMenu.Arrow.State;

/**
 * {@link Arrow} に渡すプロパティーです。
 */
export type ContextMenuArrowProps = React.ComponentProps<typeof ContextMenu.Arrow>;

/**
 * ポップアップと対象をつなぐ矢印要素です。
 */
export const ContextMenuArrow: IComponent<ContextMenuArrowProps> = function SuiContextMenuArrow(
  props,
) {
  const { className, ...otherProps } = props;

  return (
    <ContextMenu.Arrow
      {...otherProps}
      className={cn(className, "sui_context_menu_arrow", "sui_menu_arrow")}
    />
  );
};

/**
 * {@link ContextMenuArrow} の型をまとめた名前空間です。
 */
export namespace Arrow {
  /**
   * {@link ContextMenuArrow} の状態型です。
   */
  export type State = ContextMenuArrowState;

  /**
   * {@link ContextMenuArrow} のプロパティー型です。
   */
  export type Props = ContextMenuArrowProps;
}

/**
 * {@link ContextMenuArrow} の短縮名です。
 */
export const Arrow: IComponent<Arrow.Props> = ContextMenuArrow;

// Item
// ----

/**
 * {@link Item} の状態です。
 */
export type ContextMenuItemState = ContextMenu.Item.State;

/**
 * {@link Item} に渡すプロパティーです。
 */
export type ContextMenuItemProps = React.ComponentProps<typeof ContextMenu.Item>;

/**
 * コンテキストメニューの操作項目です。
 */
export const ContextMenuItem: IComponent<ContextMenuItemProps> = function SuiContextMenuItem(
  props,
) {
  const { className, ...otherProps } = props;

  return (
    <ContextMenu.Item
      {...otherProps}
      className={cn(className, "sui_context_menu_item", "sui_menu_item")}
    />
  );
};

/**
 * {@link ContextMenuItem} の型をまとめた名前空間です。
 */
export namespace Item {
  /**
   * {@link ContextMenuItem} の状態型です。
   */
  export type State = ContextMenuItemState;

  /**
   * {@link ContextMenuItem} のプロパティー型です。
   */
  export type Props = ContextMenuItemProps;
}

/**
 * {@link ContextMenuItem} の短縮名です。
 */
export const Item: IComponent<Item.Props> = ContextMenuItem;

// LinkItem
// --------

/**
 * {@link LinkItem} の状態です。
 */
export type ContextMenuLinkItemState = ContextMenu.LinkItem.State;

/**
 * {@link LinkItem} に渡すプロパティーです。
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
        className={cn(
          className,
          "sui_context_menu_item",
          "sui_context_menu_link_item",
          "sui_menu_item",
          "sui_menu_link_item",
        )}
      />
    );
  };

/**
 * {@link ContextMenuLinkItem} の型をまとめた名前空間です。
 */
export namespace LinkItem {
  /**
   * {@link ContextMenuLinkItem} の状態型です。
   */
  export type State = ContextMenuLinkItemState;

  /**
   * {@link ContextMenuLinkItem} のプロパティー型です。
   */
  export type Props = ContextMenuLinkItemProps;
}

/**
 * {@link ContextMenuLinkItem} の短縮名です。
 */
export const LinkItem: IComponent<LinkItem.Props> = ContextMenuLinkItem;

// SubmenuRoot
// -----------

/**
 * {@link SubmenuRoot} の状態です。
 */
export type ContextMenuSubmenuRootState = ContextMenu.SubmenuRoot.State;

/**
 * {@link SubmenuRoot} に渡すプロパティーです。
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
 * {@link ContextMenuSubmenuRoot} の型をまとめた名前空間です。
 */
export namespace SubmenuRoot {
  /**
   * {@link ContextMenuSubmenuRoot} の状態型です。
   */
  export type State = ContextMenuSubmenuRootState;

  /**
   * {@link ContextMenuSubmenuRoot} のプロパティー型です。
   */
  export type Props = ContextMenuSubmenuRootProps;
}

/**
 * {@link ContextMenuSubmenuRoot} の短縮名です。
 */
export const SubmenuRoot: IComponent<SubmenuRoot.Props> = ContextMenuSubmenuRoot;

// SubmenuTrigger
// --------------

/**
 * {@link SubmenuTrigger} の状態です。
 */
export type ContextMenuSubmenuTriggerState = ContextMenu.SubmenuTrigger.State;

/**
 * {@link SubmenuTrigger} に渡すプロパティーです。
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
        className={cn(
          className,
          "sui_context_menu_item",
          "sui_context_menu_submenu_trigger",
          "sui_menu_item",
          "sui_menu_submenu_trigger",
        )}
      />
    );
  };

/**
 * {@link ContextMenuSubmenuTrigger} の型をまとめた名前空間です。
 */
export namespace SubmenuTrigger {
  /**
   * {@link ContextMenuSubmenuTrigger} の状態型です。
   */
  export type State = ContextMenuSubmenuTriggerState;

  /**
   * {@link ContextMenuSubmenuTrigger} のプロパティー型です。
   */
  export type Props = ContextMenuSubmenuTriggerProps;
}

/**
 * {@link ContextMenuSubmenuTrigger} の短縮名です。
 */
export const SubmenuTrigger: IComponent<SubmenuTrigger.Props> = ContextMenuSubmenuTrigger;

// Group
// -----

/**
 * {@link Group} の状態です。
 */
export type ContextMenuGroupState = ContextMenu.Group.State;

/**
 * {@link Group} に渡すプロパティーです。
 */
export type ContextMenuGroupProps = React.ComponentProps<typeof ContextMenu.Group>;

/**
 * 関連するコンテキストメニュー項目をまとめるグループ要素です。
 */
export const ContextMenuGroup: IComponent<ContextMenuGroupProps> = function SuiContextMenuGroup(
  props,
) {
  const { className, ...otherProps } = props;

  return (
    <ContextMenu.Group
      {...otherProps}
      className={cn(className, "sui_context_menu_group", "sui_menu_group")}
    />
  );
};

/**
 * {@link ContextMenuGroup} の型をまとめた名前空間です。
 */
export namespace Group {
  /**
   * {@link ContextMenuGroup} の状態型です。
   */
  export type State = ContextMenuGroupState;

  /**
   * {@link ContextMenuGroup} のプロパティー型です。
   */
  export type Props = ContextMenuGroupProps;
}

/**
 * {@link ContextMenuGroup} の短縮名です。
 */
export const Group: IComponent<Group.Props> = ContextMenuGroup;

// GroupLabel
// ----------

/**
 * {@link GroupLabel} の状態です。
 */
export type ContextMenuGroupLabelState = ContextMenu.GroupLabel.State;

/**
 * {@link GroupLabel} に渡すプロパティーです。
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
        className={cn(className, "sui_context_menu_group_label", "sui_menu_group_label")}
      />
    );
  };

/**
 * {@link ContextMenuGroupLabel} の型をまとめた名前空間です。
 */
export namespace GroupLabel {
  /**
   * {@link ContextMenuGroupLabel} の状態型です。
   */
  export type State = ContextMenuGroupLabelState;

  /**
   * {@link ContextMenuGroupLabel} のプロパティー型です。
   */
  export type Props = ContextMenuGroupLabelProps;
}

/**
 * {@link ContextMenuGroupLabel} の短縮名です。
 */
export const GroupLabel: IComponent<GroupLabel.Props> = ContextMenuGroupLabel;

// RadioGroup
// ----------

/**
 * {@link RadioGroup} の状態です。
 */
export type ContextMenuRadioGroupState = ContextMenu.RadioGroup.State;

/**
 * {@link RadioGroup} に渡すプロパティーです。
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
        className={cn(className, "sui_context_menu_radio_group", "sui_menu_radio_group")}
      />
    );
  };

/**
 * {@link ContextMenuRadioGroup} の型をまとめた名前空間です。
 */
export namespace RadioGroup {
  /**
   * {@link ContextMenuRadioGroup} の状態型です。
   */
  export type State = ContextMenuRadioGroupState;

  /**
   * {@link ContextMenuRadioGroup} のプロパティー型です。
   */
  export type Props = ContextMenuRadioGroupProps;
}

/**
 * {@link ContextMenuRadioGroup} の短縮名です。
 */
export const RadioGroup: IComponent<RadioGroup.Props> = ContextMenuRadioGroup;

// RadioItem
// ---------

/**
 * {@link RadioItem} の状態です。
 */
export type ContextMenuRadioItemState = ContextMenu.RadioItem.State;

/**
 * {@link RadioItem} に渡すプロパティーです。
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
        className={cn(
          className,
          "sui_context_menu_item",
          "sui_context_menu_radio_item",
          "sui_menu_item",
          "sui_menu_radio_item",
        )}
      />
    );
  };

/**
 * {@link ContextMenuRadioItem} の型をまとめた名前空間です。
 */
export namespace RadioItem {
  /**
   * {@link ContextMenuRadioItem} の状態型です。
   */
  export type State = ContextMenuRadioItemState;

  /**
   * {@link ContextMenuRadioItem} のプロパティー型です。
   */
  export type Props = ContextMenuRadioItemProps;
}

/**
 * {@link ContextMenuRadioItem} の短縮名です。
 */
export const RadioItem: IComponent<RadioItem.Props> = ContextMenuRadioItem;

// RadioItemIndicator
// ------------------

/**
 * {@link RadioItemIndicator} の状態です。
 */
export type ContextMenuRadioItemIndicatorState = ContextMenu.RadioItemIndicator.State;

/**
 * {@link RadioItemIndicator} に渡すプロパティーです。
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
        keepMounted={keepMounted}
        className={cn(
          className,
          "sui_context_menu_item_indicator",
          "sui_context_menu_radio_item_indicator",
          "sui_menu_item_indicator",
          "sui_menu_radio_item_indicator",
        )}
      />
    );
  };

/**
 * {@link ContextMenuRadioItemIndicator} の型をまとめた名前空間です。
 */
export namespace RadioItemIndicator {
  /**
   * {@link ContextMenuRadioItemIndicator} の状態型です。
   */
  export type State = ContextMenuRadioItemIndicatorState;

  /**
   * {@link ContextMenuRadioItemIndicator} のプロパティー型です。
   */
  export type Props = ContextMenuRadioItemIndicatorProps;
}

/**
 * {@link ContextMenuRadioItemIndicator} の短縮名です。
 */
export const RadioItemIndicator: IComponent<RadioItemIndicator.Props> =
  ContextMenuRadioItemIndicator;

// CheckboxItem
// ------------

/**
 * {@link CheckboxItem} の状態です。
 */
export type ContextMenuCheckboxItemState = ContextMenu.CheckboxItem.State;

/**
 * {@link CheckboxItem} に渡すプロパティーです。
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
        className={cn(
          className,
          "sui_context_menu_item",
          "sui_context_menu_checkbox_item",
          "sui_menu_item",
          "sui_menu_checkbox_item",
        )}
      />
    );
  };

/**
 * {@link ContextMenuCheckboxItem} の型をまとめた名前空間です。
 */
export namespace CheckboxItem {
  /**
   * {@link ContextMenuCheckboxItem} の状態型です。
   */
  export type State = ContextMenuCheckboxItemState;

  /**
   * {@link ContextMenuCheckboxItem} のプロパティー型です。
   */
  export type Props = ContextMenuCheckboxItemProps;
}

/**
 * {@link ContextMenuCheckboxItem} の短縮名です。
 */
export const CheckboxItem: IComponent<CheckboxItem.Props> = ContextMenuCheckboxItem;

// CheckboxItemIndicator
// ---------------------

/**
 * {@link CheckboxItemIndicator} の状態です。
 */
export type ContextMenuCheckboxItemIndicatorState = ContextMenu.CheckboxItemIndicator.State;

/**
 * {@link CheckboxItemIndicator} に渡すプロパティーです。
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
        keepMounted={keepMounted}
        className={cn(
          className,
          "sui_context_menu_item_indicator",
          "sui_context_menu_checkbox_item_indicator",
          "sui_menu_item_indicator",
          "sui_menu_checkbox_item_indicator",
        )}
      />
    );
  };

/**
 * {@link ContextMenuCheckboxItemIndicator} の型をまとめた名前空間です。
 */
export namespace CheckboxItemIndicator {
  /**
   * {@link ContextMenuCheckboxItemIndicator} の状態型です。
   */
  export type State = ContextMenuCheckboxItemIndicatorState;

  /**
   * {@link ContextMenuCheckboxItemIndicator} のプロパティー型です。
   */
  export type Props = ContextMenuCheckboxItemIndicatorProps;
}

/**
 * {@link ContextMenuCheckboxItemIndicator} の短縮名です。
 */
export const CheckboxItemIndicator: IComponent<CheckboxItemIndicator.Props> =
  ContextMenuCheckboxItemIndicator;

// Separator
// ---------

/**
 * {@link Separator} の状態です。
 */
export type ContextMenuSeparatorState = ContextMenu.Separator.State;

/**
 * {@link Separator} に渡すプロパティーです。
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
        className={cn(className, "sui_context_menu_separator", "sui_menu_separator")}
      />
    );
  };

/**
 * {@link ContextMenuSeparator} の型をまとめた名前空間です。
 */
export namespace Separator {
  /**
   * {@link ContextMenuSeparator} の状態型です。
   */
  export type State = ContextMenuSeparatorState;

  /**
   * {@link ContextMenuSeparator} のプロパティー型です。
   */
  export type Props = ContextMenuSeparatorProps;
}

/**
 * {@link ContextMenuSeparator} の短縮名です。
 */
export const Separator: IComponent<Separator.Props> = ContextMenuSeparator;
