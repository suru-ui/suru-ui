import mergeProps from "../_merge-props.js";
import * as React from "react";

import { CheckIcon, ChevronRightIcon } from "../_icons.jsx";
import isLikelyVisibleNode, { type LikelyVisibleNode } from "../_is-likely-visible-node.js";
import toReactNode from "../_to-react-node.js";
import type { IComponent } from "../types.js";
import {
  isItemObject,
  isGroupObject,
  isLinkItemObject,
  isRadioItemObject,
  isSeparatorObject,
  isRadioGroupObject,
  isCheckboxItemObject,
} from "./_menu.jsx";
import {
  type MenuRootSize,
  type MenuItemProps,
  type MenuRootProps,
  type MenuRootState,
  type MenuGroupProps,
  type MenuPopupProps,
  type MenuRootRadius,
  type MenuPortalProps,
  type MenuRootActions,
  type MenuRootVariant,
  type MenuTriggerProps,
  type MenuBackdropProps,
  type MenuLinkItemProps,
  type MenuRadioItemProps,
  type MenuRootItemObject,
  type MenuSeparatorProps,
  type MenuGroupLabelProps,
  type MenuPositionerProps,
  type MenuRadioGroupProps,
  type MenuRootGroupObject,
  type MenuRootOrientation,
  type MenuSubmenuRootProps,
  type MenuCheckboxItemProps,
  type IMenuPopupItemRenderer,
  type MenuRootLinkItemObject,
  type MenuRootRadioItemObject,
  type MenuRootSeparatorObject,
  type MenuSubmenuTriggerProps,
  type MenuRootActionItemObject,
  type MenuRootRadioGroupObject,
  type MenuRootChangeEventReason,
  type MenuRootChangeEventDetails,
  type MenuRootCheckboxItemObject,
  type MenuRadioItemIndicatorProps,
  type MenuCheckboxItemIndicatorProps,
  MenuItem,
  MenuRoot,
  MenuGroup,
  MenuPopup,
  MenuPortal,
  MenuTrigger,
  MenuBackdrop,
  MenuLinkItem,
  MenuRadioItem,
  MenuSeparator,
  MenuGroupLabel,
  MenuPositioner,
  MenuRadioGroup,
  MenuSubmenuRoot,
  MenuCheckboxItem,
  MenuSubmenuTrigger,
  MenuRadioItemIndicator,
  MenuCheckboxItemIndicator,
} from "./menu.parts.jsx";

// Types
// -----

export type MenuActions = MenuRootActions;

export type MenuChangeEventDetails = MenuRootChangeEventDetails;

export type MenuChangeEventReason = MenuRootChangeEventReason;

export type MenuItemObject = MenuRootItemObject;

export type MenuActionItemObject = MenuRootActionItemObject;

export type MenuCheckboxItemObject = MenuRootCheckboxItemObject;

export type MenuGroupObject = MenuRootGroupObject;

export type MenuLinkItemObject = MenuRootLinkItemObject;

export type MenuRadioGroupObject = MenuRootRadioGroupObject;

export type MenuRadioItemObject = MenuRootRadioItemObject;

export type MenuSeparatorObject = MenuRootSeparatorObject;

export type MenuOrientation = MenuRootOrientation;

export interface IMenuItemRenderer<TItem = any> extends IMenuPopupItemRenderer<TItem> {}

export type MenuRadius = MenuRootRadius;

export type MenuSize = MenuRootSize;

export type MenuVariant = MenuRootVariant;

/**
 * {@link Menu} の各パーツに渡す props です。
 */
export type MenuSlotProps = {
  /**
   * {@link MenuBackdrop} に渡す props です。
   */
  readonly backdrop?: Omit<MenuBackdropProps, "children"> | undefined;

  /**
   * {@link MenuCheckboxItem} に渡す props です。
   */
  readonly checkboxItem?: Omit<MenuCheckboxItemProps, "children"> | undefined;

  /**
   * {@link MenuCheckboxItemIndicator} に渡す props です。
   */
  readonly checkboxItemIndicator?: MenuCheckboxItemIndicatorProps | undefined;

  /**
   * {@link MenuGroup} に渡す props です。
   */
  readonly group?: Omit<MenuGroupProps, "children"> | undefined;

  /**
   * {@link MenuGroupLabel} に渡す props です。
   */
  readonly groupLabel?: Omit<MenuGroupLabelProps, "children"> | undefined;

  /**
   * {@link MenuItem} に渡す props です。
   */
  readonly item?: Omit<MenuItemProps, "children"> | undefined;

  /**
   * {@link MenuLinkItem} に渡す props です。
   */
  readonly linkItem?: Omit<MenuLinkItemProps, "children"> | undefined;

  /**
   * {@link MenuPopup} に渡す props です。
   */
  readonly popup?: Omit<MenuPopupProps, "children"> | undefined;

  /**
   * {@link MenuPortal} に渡す props です。
   */
  readonly portal?: Omit<MenuPortalProps, "children"> | undefined;

  /**
   * {@link MenuPositioner} に渡す props です。
   */
  readonly positioner?: Omit<MenuPositionerProps, "children"> | undefined;

  /**
   * {@link MenuRadioGroup} に渡す props です。
   */
  readonly radioGroup?: Omit<MenuRadioGroupProps, "children"> | undefined;

  /**
   * {@link MenuRadioItem} に渡す props です。
   */
  readonly radioItem?: Omit<MenuRadioItemProps, "children"> | undefined;

  /**
   * {@link MenuRadioItemIndicator} に渡す props です。
   */
  readonly radioItemIndicator?: MenuRadioItemIndicatorProps | undefined;

  /**
   * {@link MenuSeparator} に渡す props です。
   */
  readonly separator?: Omit<MenuSeparatorProps, "children"> | undefined;

  /**
   * {@link MenuSubmenuRoot} に渡す props です。
   */
  readonly submenuRoot?: Omit<MenuSubmenuRootProps, "children"> | undefined;

  /**
   * {@link MenuSubmenuTrigger} に渡す props です。
   */
  readonly submenuTrigger?: Omit<MenuSubmenuTriggerProps, "children"> | undefined;

  /**
   * {@link MenuTrigger} に渡す props です。
   */
  readonly trigger?: Omit<MenuTriggerProps, "children"> | undefined;
};

/**
 * {@link Menu} が持つ状態です。
 */
export type MenuState = MenuRootState;

type MenuPropsMain = {
  /**
   * 各パーツに個別の props を渡すためのオブジェクトです。
   */
  slotProps?: MenuSlotProps | undefined;

  /**
   * メニューを開くトリガーに表示する要素です。
   *
   * {@link MenuTrigger} の子要素として直接渡されます。
   */
  trigger?: MenuTriggerProps["children"] | undefined;
};

type MenuPropsRoot<TItem = any> = Omit<
  MenuRootProps<unknown, TItem>,
  "children" | keyof MenuPropsMain
>;

type MenuPropsPopup = Omit<MenuPopupProps, keyof MenuPropsMain | keyof MenuPropsRoot>;

/**
 * {@link Menu} に渡す props です。
 *
 * @template TItem 項目の型です。
 */
export type MenuProps<TItem = any> = MenuPropsMain & MenuPropsRoot<TItem> & MenuPropsPopup;

// API
// ---

/**
 * {@link Menu} を構成する各パーツの props を作成するための API です。
 */
export interface MenuAPI {
  /**
   * {@link MenuBackdrop} に渡す props を取得します。
   */
  getBackdropProps(): Omit<MenuBackdropProps, "children">;

  /**
   * {@link MenuCheckboxItemIndicator} に渡す props を取得します。
   */
  getCheckboxItemIndicatorProps(): MenuCheckboxItemIndicatorProps;

  /**
   * {@link MenuCheckboxItem} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getCheckboxItemProps(item: MenuCheckboxItemObject): Omit<MenuCheckboxItemProps, "children"> & {
    children: LikelyVisibleNode | null;
  };

  /**
   * {@link MenuGroupLabel} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getGroupLabelProps(item: MenuGroupObject): MenuGroupLabelProps | null;

  /**
   * {@link MenuGroup} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getGroupProps(item: MenuGroupObject): Omit<MenuGroupProps, "children">;

  /**
   * {@link MenuItem} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getItemProps(item: MenuItemObject): Omit<MenuItemProps, "children"> & {
    children: LikelyVisibleNode | null;
  };

  /**
   * {@link MenuLinkItem} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getLinkItemProps(item: MenuLinkItemObject): Omit<MenuLinkItemProps, "children"> & {
    children: LikelyVisibleNode | null;
  };

  /**
   * {@link MenuPopup} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getPopupProps(item?: MenuItemObject): Omit<MenuPopupProps, "children"> & {
    children: LikelyVisibleNode | null;
  };

  /**
   * {@link MenuPortal} に渡す props を取得します。
   */
  getPortalProps(): Omit<MenuPortalProps, "children">;

  /**
   * {@link MenuPositioner} に渡す props を取得します。
   */
  getPositionerProps(): Omit<MenuPositionerProps, "children">;

  /**
   * {@link MenuRadioGroup} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getRadioGroupProps(item: MenuRadioGroupObject): Omit<MenuRadioGroupProps, "children">;

  /**
   * {@link MenuRadioItemIndicator} に渡す props を取得します。
   */
  getRadioItemIndicatorProps(): MenuRadioItemIndicatorProps;

  /**
   * {@link MenuRadioItem} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getRadioItemProps(item: MenuRadioItemObject): Omit<MenuRadioItemProps, "children"> & {
    children: LikelyVisibleNode | null;
  };

  /**
   * {@link MenuRoot} に渡す props を取得します。
   */
  getRootProps(): Omit<MenuRootProps, "children">;

  /**
   * {@link MenuSeparator} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getSeparatorProps(item: MenuSeparatorObject): Omit<MenuSeparatorProps, "children">;

  /**
   * {@link MenuSubmenuRoot} に渡す props を取得します。
   */
  getSubmenuRootProps(): Omit<MenuSubmenuRootProps, "children">;

  /**
   * {@link MenuSubmenuTrigger} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getSubmenuTriggerProps(item: MenuItemObject): Omit<MenuSubmenuTriggerProps, "children"> & {
    children: LikelyVisibleNode | null;
  };

  /**
   * {@link MenuTrigger} に渡す props を取得します。
   */
  getTriggerProps(): MenuTriggerProps | null;
}

interface IUseMenuAPI {
  /**
   * {@link MenuAPI} を作成します。
   *
   * @template TItem 項目の型です。
   * @param props {@link Menu} の props です。
   * @returns メニューの API です。
   */
  <TItem = any>(props: MenuProps<TItem>): MenuAPI;
}

/**
 * {@link MenuAPI} を作成するフックです。
 */
export const useMenuAPI: IUseMenuAPI = function useSuiMenuAPI(props) {
  const {
    open,
    size,
    items,
    modal,
    handle,
    radius,
    trigger,
    variant,
    disabled,
    outlined,
    loopFocus,
    slotProps: {
      item: itemProps = {},
      group: groupProps = {},
      popup: popupProps = {},
      portal: portalProps = {},
      trigger: triggerProps = {},
      backdrop: backdropProps = {},
      linkItem: linkItemProps = {},
      radioItem: radioItemProps = {},
      separator: separatorProps = {},
      groupLabel: groupLabelProps = {},
      positioner: positionerProps = {},
      radioGroup: radioGroupProps = {},
      submenuRoot: submenuRootProps = {},
      checkboxItem: checkboxItemProps = {},
      submenuTrigger: submenuTriggerProps = {},
      radioItemIndicator: radioItemIndicatorProps = {},
      checkboxItemIndicator: checkboxItemIndicatorProps = {},
    } = {},
    triggerId,
    actionsRef,
    defaultOpen,
    orientation,
    onOpenChange,
    closeParentOnEsc,
    defaultTriggerId,
    highlightItemOnHover,
    onOpenChangeComplete,
    ...contentProps
  } = props;

  return {
    getItemProps(item) {
      const { type: __, items: _, label, ...otherProps } = item as MenuActionItemObject;

      return {
        ...mergeProps([otherProps, itemProps]),
        children: toReactNode(label),
      };
    },
    getRootProps(): Omit<MenuRootProps, "children"> {
      return {
        open,
        size,
        items,
        modal,
        handle,
        radius,
        variant,
        disabled,
        outlined,
        loopFocus,
        triggerId,
        actionsRef,
        defaultOpen,
        orientation,
        onOpenChange,
        closeParentOnEsc,
        defaultTriggerId,
        highlightItemOnHover,
        onOpenChangeComplete,
      };
    },
    getGroupProps(item) {
      const { type: ___, items: _, label: __, ...otherProps } = item;

      return mergeProps([otherProps, groupProps]);
    },
    getPopupProps(item) {
      const { items = [] } = this.getRootProps();
      const { children, ...otherProps } = { ...contentProps, ...popupProps };

      return {
        ...otherProps,
        children: item
          ? null
          : typeof children === "function"
            ? items.map(children)
            : toReactNode(children),
      };
    },
    getPortalProps() {
      return portalProps;
    },
    getTriggerProps() {
      if (trigger) {
        return {
          ...triggerProps,
          children: trigger,
        };
      }

      return null;
    },
    getBackdropProps() {
      return backdropProps;
    },
    getLinkItemProps(item) {
      const { type: _, label, ...otherProps } = item;

      return {
        ...mergeProps([otherProps, linkItemProps]),
        children: toReactNode(label),
      };
    },
    getRadioItemProps(item) {
      const { type: _, label, value, ...otherProps } = item;

      return {
        ...mergeProps([otherProps, radioItemProps]),
        value,
        children: toReactNode(label),
      };
    },
    getSeparatorProps(item) {
      const { type: _, ...otherProps } = item;

      return mergeProps([otherProps, separatorProps]);
    },
    getGroupLabelProps(item) {
      if (!isLikelyVisibleNode(item.label)) {
        return null;
      }

      return {
        ...groupLabelProps,
        children: toReactNode(item.label),
      };
    },
    getPositionerProps() {
      const {
        side = "bottom",
        align = "start",
        sideOffset = 8,
        ...otherPositionerProps
      } = positionerProps;

      return {
        ...otherPositionerProps,
        side,
        align,
        sideOffset,
      };
    },
    getRadioGroupProps(item) {
      const { type: __, items: _, ...otherProps } = item;

      return mergeProps([otherProps, radioGroupProps]);
    },
    getSubmenuRootProps() {
      return submenuRootProps;
    },
    getCheckboxItemProps(item) {
      const { type: _, label, ...otherProps } = item;

      return {
        ...mergeProps([otherProps, checkboxItemProps]),
        children: toReactNode(label),
      };
    },
    getSubmenuTriggerProps(item) {
      const { type: __, items: _, label, ...otherProps } = item as MenuActionItemObject;

      return {
        ...mergeProps([otherProps, submenuTriggerProps]),
        children: (
          <>
            {toReactNode(label)}
            <ChevronRightIcon />
          </>
        ),
      };
    },
    getRadioItemIndicatorProps() {
      return radioItemIndicatorProps;
    },
    getCheckboxItemIndicatorProps() {
      return checkboxItemIndicatorProps;
    },
  };
};

export { type MenuAPI as API, useMenuAPI as useAPI };

// Component
// ---------

interface IMenu extends IComponent<MenuProps> {
  /**
   * @template TItem 項目の型です。
   */
  <TItem = any>(props: MenuProps<TItem>): IComponent.Return;
}

/**
 * メニューを表示するコンポーネントです。
 *
 * トリガーとポップアップを組み立てます。項目の種類や構成を細かく制御する場合は、{@link MenuRoot|Root} を直接組み立てます。
 */
export const Menu: IMenu = function SuiMenu(props: MenuProps) {
  const api = useMenuAPI(props);
  const triggerProps = api.getTriggerProps();
  const { children, ...otherPopupProps } = api.getPopupProps();
  const defaultRadioItemRenderer: IMenuPopupItemRenderer = (item, index) => {
    if (!isRadioItemObject(item)) {
      return toReactNode(item);
    }

    const { children: label, ...otherItemProps } = api.getRadioItemProps(
      item as MenuRadioItemObject,
    );
    const { children: indicatorChildren, ...otherIndicatorProps } =
      api.getRadioItemIndicatorProps();

    return (
      <MenuRadioItem key={index} {...otherItemProps}>
        {label}
        <MenuRadioItemIndicator {...otherIndicatorProps}>
          {indicatorChildren ?? <CheckIcon />}
        </MenuRadioItemIndicator>
      </MenuRadioItem>
    );
  };
  const defaultPopupItemRenderer: IMenuPopupItemRenderer = (item, index, items) => {
    if (isSeparatorObject(item)) {
      return <MenuSeparator key={index} {...api.getSeparatorProps(item as MenuSeparatorObject)} />;
    }

    if (isRadioGroupObject(item)) {
      return (
        <MenuRadioGroup key={index} {...api.getRadioGroupProps(item as MenuRadioGroupObject)}>
          {item.items.map(defaultRadioItemRenderer)}
        </MenuRadioGroup>
      );
    }

    if (isGroupObject(item)) {
      const groupItem = item as MenuGroupObject;
      const labelProps = api.getGroupLabelProps(groupItem);

      return (
        <MenuGroup key={index} {...api.getGroupProps(groupItem)}>
          {labelProps && <MenuGroupLabel {...labelProps} />}
          {groupItem.items.map(defaultPopupItemRenderer)}
        </MenuGroup>
      );
    }

    if (!isItemObject(item)) {
      return toReactNode(item);
    }

    if (isCheckboxItemObject(item)) {
      const { children: label, ...otherItemProps } = api.getCheckboxItemProps(
        item as MenuCheckboxItemObject,
      );
      const { children: indicatorChildren, ...otherIndicatorProps } =
        api.getCheckboxItemIndicatorProps();

      return (
        <MenuCheckboxItem key={index} {...otherItemProps}>
          {label}
          <MenuCheckboxItemIndicator {...otherIndicatorProps}>
            {indicatorChildren ?? <CheckIcon />}
          </MenuCheckboxItemIndicator>
        </MenuCheckboxItem>
      );
    }

    if (isRadioItemObject(item)) {
      return defaultRadioItemRenderer(item, index, items);
    }

    if (isLinkItemObject(item)) {
      return <MenuLinkItem key={index} {...api.getLinkItemProps(item as MenuLinkItemObject)} />;
    }

    const { items: subItems } = item as MenuActionItemObject;
    if (!subItems) {
      return <MenuItem key={index} {...api.getItemProps(item as MenuItemObject)} />;
    }

    return (
      <MenuSubmenuRoot key={index} {...api.getSubmenuRootProps()}>
        <MenuSubmenuTrigger {...api.getSubmenuTriggerProps(item as MenuItemObject)} />
        <MenuPortal {...api.getPortalProps()}>
          <MenuPositioner {...api.getPositionerProps()}>
            <MenuPopup {...api.getPopupProps(item as MenuItemObject)}>
              {subItems.map(defaultPopupItemRenderer)}
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </MenuSubmenuRoot>
    );
  };

  return (
    <MenuRoot {...api.getRootProps()}>
      {triggerProps && <MenuTrigger {...triggerProps} />}
      <MenuPortal {...api.getPortalProps()}>
        <MenuBackdrop {...api.getBackdropProps()} />
        <MenuPositioner {...api.getPositionerProps()}>
          <MenuPopup {...otherPopupProps}>{children ?? defaultPopupItemRenderer}</MenuPopup>
        </MenuPositioner>
      </MenuPortal>
    </MenuRoot>
  );
};

export namespace Menu {
  export type State = MenuState;

  export type Props<TItem = any> = MenuProps<TItem>;

  export type SlotProps = MenuSlotProps;

  export type ActionItemObject = MenuActionItemObject;

  export type Actions = MenuActions;

  export type ChangeEventDetails = MenuChangeEventDetails;

  export type ChangeEventReason = MenuChangeEventReason;

  export type CheckboxItemObject = MenuCheckboxItemObject;

  export type GroupObject = MenuGroupObject;

  export type ItemObject = MenuItemObject;

  export interface IItemRenderer<TItem = any> extends IMenuItemRenderer<TItem> {}

  export type LinkItemObject = MenuLinkItemObject;

  export type Orientation = MenuOrientation;

  export type RadioGroupObject = MenuRadioGroupObject;

  export type RadioItemObject = MenuRadioItemObject;

  export type Radius = MenuRadius;

  export type SeparatorObject = MenuSeparatorObject;

  export type Size = MenuSize;

  export type Variant = MenuVariant;
}
