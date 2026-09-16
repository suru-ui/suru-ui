import * as React from "react";

import { CheckIcon, ChevronRightIcon } from "../_icons.jsx";
import isLikelyVisibleNode, { type LikelyVisibleNode } from "../_is-likely-visible-node.js";
import mergeProps from "../_merge-props.js";
import toReactNode from "../_to-react-node.js";
import type { Override, IComponent } from "../types.js";
import {
  isLinkItem,
  isItemGroup,
  isRadioItem,
  isLabeledItem,
  isSubmenuItem,
  isCheckboxItem,
  isRadioItemGroup,
} from "./_menu.utils.jsx";
import {
  type MenuRootItem,
  type MenuRootSize,
  type MenuItemProps,
  type MenuRootProps,
  type MenuRootState,
  type MenuGroupProps,
  type MenuRootRadius,
  type MenuPortalProps,
  type MenuRootActions,
  type MenuRootVariant,
  type MenuContentProps,
  type MenuRootLinkItem,
  type MenuTriggerProps,
  type MenuBackdropProps,
  type MenuLinkItemProps,
  type MenuRootItemGroup,
  type MenuRootRadioItem,
  type MenuRadioItemProps,
  type MenuSeparatorProps,
  type MenuGroupLabelProps,
  type MenuPositionerProps,
  type MenuRadioGroupProps,
  type MenuRootLabeledItem,
  type MenuRootOrientation,
  type MenuRootSubmenuItem,
  type MenuRootCheckboxItem,
  type MenuSubmenuRootProps,
  type MenuCheckboxItemProps,
  type MenuRootRadioItemGroup,
  type MenuSubmenuTriggerProps,
  type IMenuContentItemRenderer,
  type MenuRootChangeEventReason,
  type MenuRootChangeEventDetails,
  type MenuRadioItemIndicatorProps,
  type MenuCheckboxItemIndicatorProps,
  MenuItem,
  MenuRoot,
  MenuGroup,
  MenuPortal,
  MenuContent,
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
} from "./menu.parts.js";

// Types
// -----

export type MenuActions = MenuRootActions;

export type MenuActionItem = MenuRootLabeledItem & {
  readonly items?: readonly MenuRootItem[] | undefined;
};

export type MenuChangeEventDetails = MenuRootChangeEventDetails;

export type MenuChangeEventReason = MenuRootChangeEventReason;

export type MenuCheckboxItem = MenuRootCheckboxItem;

export type MenuItemGroup = MenuRootItemGroup;

export type MenuItem = MenuRootItem;

export type MenuLinkItem = MenuRootLinkItem;

export type MenuOrientation = MenuRootOrientation;

export type MenuRadioItemGroup = MenuRootRadioItemGroup;

export type MenuRadioItem = MenuRootRadioItem;

export interface IMenuItemRenderer<TItem = any> extends IMenuContentItemRenderer<TItem> {}

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
  readonly checkboxItemIndicator?: Omit<MenuCheckboxItemIndicatorProps, "children"> | undefined;

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
  readonly radioGroup?: Omit<MenuRadioGroupProps, "children" | "items"> | undefined;

  /**
   * {@link MenuRadioItem} に渡す props です。
   */
  readonly radioItem?: Omit<MenuRadioItemProps, "children"> | undefined;

  /**
   * {@link MenuRadioItemIndicator} に渡す props です。
   */
  readonly radioItemIndicator?: Omit<MenuRadioItemIndicatorProps, "children"> | undefined;

  /**
   * {@link MenuSeparator} に渡す props です。
   */
  readonly separator?: MenuSeparatorProps | undefined;

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
  checkboxIndicator?: React.ReactNode;

  radioIndicator?: React.ReactNode;

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

type MenuPropsRoot<TItem = any> = Omit<MenuRootProps<any, TItem>, "children" | keyof MenuPropsMain>;

type MenuPropsContent = Omit<MenuContentProps, keyof MenuPropsMain | keyof MenuPropsRoot>;

/**
 * {@link Menu} に渡す props です。
 *
 * @template TItem 項目の型です。
 */
export type MenuProps<TItem = any> = MenuPropsMain & MenuPropsRoot<TItem> & MenuPropsContent;

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
  getCheckboxItemProps(item: MenuCheckboxItem): Override<
    MenuCheckboxItemProps,
    {
      children: LikelyVisibleNode | undefined;
    }
  >;

  /**
   * {@link MenuContent} に渡す props を取得します。
   */
  getContentProps(): Override<
    MenuContentProps,
    {
      children: LikelyVisibleNode | IMenuContentItemRenderer | undefined;
    }
  >;

  /**
   * {@link MenuGroupLabel} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getGroupLabelProps(item: MenuItemGroup): MenuGroupLabelProps | null;

  /**
   * {@link MenuGroup} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getGroupProps(item: MenuItemGroup): Omit<MenuGroupProps, "children">;

  /**
   * {@link MenuItem} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getItemProps(item: MenuItem): Override<
    MenuItemProps,
    {
      children: LikelyVisibleNode | undefined;
    }
  >;

  /**
   * {@link MenuLinkItem} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getLinkItemProps(item: MenuLinkItem): Override<
    MenuLinkItemProps,
    {
      children: LikelyVisibleNode | undefined;
    }
  >;

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
  getRadioGroupProps(item: MenuRadioItemGroup): Omit<MenuRadioGroupProps, "children">;

  /**
   * {@link MenuRadioItemIndicator} に渡す props を取得します。
   */
  getRadioItemIndicatorProps(): MenuRadioItemIndicatorProps;

  /**
   * {@link MenuRadioItem} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getRadioItemProps(item: MenuRadioItem): MenuRadioItemProps;

  /**
   * {@link MenuRoot} に渡す props を取得します。
   */
  getRootProps(): Omit<MenuRootProps, "children">;

  /**
   * {@link MenuSeparator} に渡す props を取得します。
   */
  getSeparatorProps(): MenuSeparatorProps;

  /**
   * {@link MenuSubmenuRoot} に渡す props を取得します。
   */
  getSubmenuRootProps(item: MenuRootSubmenuItem): Omit<MenuSubmenuRootProps, "children">;

  /**
   * {@link MenuSubmenuTrigger} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getSubmenuTriggerProps(item: MenuRootSubmenuItem): MenuSubmenuTriggerProps;

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
    radioIndicator = <CheckIcon />,
    closeParentOnEsc,
    defaultTriggerId,
    checkboxIndicator = <CheckIcon />,
    highlightItemOnHover,
    onOpenChangeComplete,
    ...contentProps
  } = props;

  return {
    getItemProps(item) {
      const { type: __, items: _, label, ...otherProps } = item as MenuActionItem;

      return {
        ...mergeProps([itemProps, otherProps]),
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

      return mergeProps([groupProps, otherProps]);
    },
    getPortalProps() {
      return portalProps;
    },
    getContentProps() {
      const { children, ...otherProps } = contentProps;

      return {
        ...otherProps,
        children: typeof children === "function" ? children : toReactNode(children),
      };
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
        ...mergeProps([linkItemProps, otherProps]),
        children: toReactNode(label),
      };
    },
    getRadioItemProps(item) {
      const { label, value, ...otherProps } = item;

      return {
        ...mergeProps([radioItemProps, otherProps]),
        value,
        children: label,
      };
    },
    getSeparatorProps() {
      return separatorProps;
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
      return positionerProps;
    },
    getRadioGroupProps(item) {
      const { type: __, ...otherProps } = item;

      return mergeProps([radioGroupProps, otherProps]);
    },
    getSubmenuRootProps(item) {
      const { type: _, label: __, ...otherProps } = item;

      return mergeProps([submenuRootProps, otherProps]);
    },
    getCheckboxItemProps(item) {
      const { type: _, label, ...otherProps } = item;

      return {
        ...mergeProps([checkboxItemProps, otherProps]),
        children: toReactNode(label),
      };
    },
    getSubmenuTriggerProps(item) {
      const { label } = item;

      return {
        ...submenuTriggerProps,
        children: label,
      };
    },
    getRadioItemIndicatorProps() {
      return {
        ...radioItemIndicatorProps,
        children: radioIndicator,
      };
    },
    getCheckboxItemIndicatorProps() {
      return {
        ...checkboxItemIndicatorProps,
        children: checkboxIndicator,
      };
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

  const defaultRadioItemRenderer: IMenuContentItemRenderer = (item, index) => {
    switch (true) {
      case isRadioItem(item): {
        const { children: label, ...otherProps } = api.getRadioItemProps(item);

        return (
          <MenuRadioItem {...otherProps} key={index}>
            {label}
            <MenuRadioItemIndicator {...api.getRadioItemIndicatorProps()} />
          </MenuRadioItem>
        );
      }

      default:
        return item;
    }
  };
  const defaultContentItemRenderer: IMenuContentItemRenderer = (item, index, items) => {
    switch (true) {
      case isLabeledItem(item):
        return <MenuItem {...api.getItemProps(item)} key={index} />;

      case isLinkItem(item):
        return <MenuLinkItem {...api.getLinkItemProps(item)} key={index} />;

      case isCheckboxItem(item): {
        const { children: label, ...otherProps } = api.getCheckboxItemProps(item);

        return (
          <MenuCheckboxItem {...otherProps} key={index}>
            {label}
            <MenuCheckboxItemIndicator {...api.getCheckboxItemIndicatorProps()} />
          </MenuCheckboxItem>
        );
      }

      case isRadioItemGroup(item):
        return (
          <MenuRadioGroup {...api.getRadioGroupProps(item)} key={index}>
            {defaultRadioItemRenderer}
          </MenuRadioGroup>
        );

      case isSubmenuItem(item): {
        const { children: content = defaultContentItemRenderer, ...otherContentProps } =
          api.getContentProps();
        const { children: submenuTrigger, ...otherSubmenuTriggerProps } =
          api.getSubmenuTriggerProps(item);

        return (
          <MenuSubmenuRoot {...api.getSubmenuRootProps(item)} key={index}>
            <MenuSubmenuTrigger {...otherSubmenuTriggerProps}>
              {submenuTrigger}
              <ChevronRightIcon />
            </MenuSubmenuTrigger>
            <MenuPortal {...api.getPortalProps()}>
              <MenuPositioner {...api.getPositionerProps()}>
                <MenuContent {...otherContentProps}>{content}</MenuContent>
              </MenuPositioner>
            </MenuPortal>
          </MenuSubmenuRoot>
        );
      }

      case isItemGroup(item): {
        const labelProps = api.getGroupLabelProps(item);

        return (
          <React.Fragment key={index}>
            <MenuGroup {...api.getGroupProps(item)}>
              {labelProps && <MenuGroupLabel {...labelProps} />}
              {item.items.map(defaultContentItemRenderer)}
            </MenuGroup>
            {index < items.length - 1 && <MenuSeparator {...api.getSeparatorProps()} />}
          </React.Fragment>
        );
      }

      default:
        return item;
    }
  };

  const triggerProps = api.getTriggerProps();
  const { children = defaultContentItemRenderer, ...otherContentProps } = api.getContentProps();

  return (
    <MenuRoot {...api.getRootProps()}>
      {triggerProps && <MenuTrigger {...triggerProps} />}
      <MenuPortal {...api.getPortalProps()}>
        <MenuBackdrop {...api.getBackdropProps()} />
        <MenuPositioner {...api.getPositionerProps()}>
          <MenuContent {...otherContentProps}>{children}</MenuContent>
        </MenuPositioner>
      </MenuPortal>
    </MenuRoot>
  );
};

export namespace Menu {
  export type State = MenuState;

  export type Props<TItem = any> = MenuProps<TItem>;

  export type SlotProps = MenuSlotProps;

  export type ActionItem = MenuActionItem;

  export type Actions = MenuActions;

  export type ChangeEventDetails = MenuChangeEventDetails;

  export type ChangeEventReason = MenuChangeEventReason;

  export type CheckboxItem = MenuCheckboxItem;

  export type Item = MenuItem;

  export type ItemGroup = MenuItemGroup;

  export interface IItemRenderer<TItem = any> extends IMenuItemRenderer<TItem> {}

  export type LinkItem = MenuLinkItem;

  export type Orientation = MenuOrientation;

  export type RadioItem = MenuRadioItem;

  export type RadioItemGroup = MenuRadioItemGroup;

  export type Radius = MenuRadius;

  export type Size = MenuSize;

  export type Variant = MenuVariant;
}
