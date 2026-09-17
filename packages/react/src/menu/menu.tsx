import * as React from "react";

import { CheckIcon, ChevronRightIcon } from "../_icons.jsx";
import isLikelyVisibleNode, { type LikelyVisibleNode } from "../_is-likely-visible-node.js";
import mergeProps from "../_merge-props.js";
import toReactNode from "../_to-react-node.js";
import type { Override, IComponent } from "../types.js";
import {
  isLinkItemObject,
  isItemObjectGroup,
  isRadioItemObject,
  isLabeledItemObject,
  isSubmenuItemObject,
  isCheckboxItemObject,
  isRadioItemObjectGroup,
} from "./_menu.utils.jsx";
import {
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
  type MenuTriggerProps,
  type MenuBackdropProps,
  type MenuLinkItemProps,
  type MenuRadioItemProps,
  type MenuRootItemObject,
  type MenuSeparatorProps,
  type MenuGroupLabelProps,
  type MenuPositionerProps,
  type MenuRadioGroupProps,
  type MenuRootOrientation,
  type MenuSubmenuRootProps,
  type MenuCheckboxItemProps,
  type MenuRootLinkItemObject,
  type MenuRootItemObjectGroup,
  type MenuRootRadioItemObject,
  type MenuSubmenuTriggerProps,
  type IMenuContentItemRenderer,
  type MenuRootChangeEventReason,
  type MenuRootGroupedItemObject,
  type MenuRootLabeledItemObject,
  type MenuRootSubmenuItemObject,
  type MenuRootChangeEventDetails,
  type MenuRootCheckboxItemObject,
  type MenuRadioItemIndicatorProps,
  type MenuRootRadioItemObjectGroup,
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

export type MenuChangeEventDetails = MenuRootChangeEventDetails;

export type MenuChangeEventReason = MenuRootChangeEventReason;

export type MenuOrientation = MenuRootOrientation;

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
  readonly radioItem?: Omit<MenuRadioItemProps, "children" | "value"> | undefined;

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
  /**
   * チェックボックス項目の選択状態を示す内容です。
   *
   * {@link MenuCheckboxItemIndicator} の子要素として描画されます。
   */
  checkboxIndicator?: React.ReactNode;

  /**
   * ラジオ項目の選択状態を示す内容です。
   *
   * {@link MenuRadioItemIndicator} の子要素として描画されます。
   */
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
 *
 * @template TItem 項目の型です。
 */
export interface MenuAPI<TItem = any> {
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
  getCheckboxItemProps(item?: MenuRootCheckboxItemObject): MenuCheckboxItemProps;

  /**
   * {@link MenuContent} に渡す props を取得します。
   *
   * @template TContentItem 項目の型です。
   */
  getContentProps<TContentItem = TItem>(): Override<
    MenuContentProps<TContentItem>,
    {
      children: LikelyVisibleNode | IMenuContentItemRenderer | undefined;
    }
  >;

  /**
   * {@link MenuGroupLabel} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getGroupLabelProps(item?: MenuRootItemObjectGroup): MenuGroupLabelProps | null;

  /**
   * {@link MenuGroup} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getGroupProps(item?: MenuRootItemObjectGroup): Omit<MenuGroupProps, "children">;

  /**
   * {@link MenuItem} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getItemProps(item?: MenuRootLabeledItemObject): MenuItemProps;

  /**
   * {@link MenuLinkItem} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getLinkItemProps(item?: MenuRootLinkItemObject): MenuLinkItemProps;

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
   * @template TRadioItem 項目の型です。
   * @param item 項目です。
   */
  getRadioGroupProps<TRadioItem = TItem>(): Omit<
    MenuRadioGroupProps<TRadioItem>,
    "children" | "value"
  >;
  getRadioGroupProps(
    item: MenuRootRadioItemObjectGroup,
  ): Omit<MenuRadioGroupProps<MenuRootRadioItemObject>, "children">;

  /**
   * {@link MenuRadioItemIndicator} に渡す props を取得します。
   */
  getRadioItemIndicatorProps(): MenuRadioItemIndicatorProps;

  /**
   * {@link MenuRadioItem} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getRadioItemProps(): Omit<MenuRadioItemProps, "children" | "value">;
  getRadioItemProps(item: MenuRootRadioItemObject): MenuRadioItemProps;
  getRadioItemProps(
    item?: MenuRootRadioItemObject,
  ): Omit<MenuRadioItemProps, "children" | "value"> | MenuRadioItemProps;

  /**
   * {@link MenuRoot} に渡す props を取得します。
   */
  getRootProps(): Omit<MenuRootProps<TItem>, "children">;

  /**
   * {@link MenuSeparator} に渡す props を取得します。
   */
  getSeparatorProps(): MenuSeparatorProps;

  /**
   * {@link MenuSubmenuRoot} に渡す props を取得します。
   *
   * @template TSubmenuItem 項目の型です。
   * @param item 項目です。
   */
  getSubmenuRootProps<TSubmenuItem = TItem>(): Omit<MenuSubmenuRootProps<TSubmenuItem>, "children">;
  getSubmenuRootProps(
    item: MenuRootSubmenuItemObject,
  ): Omit<MenuSubmenuRootProps<MenuRootItemObject>, "children">;

  /**
   * {@link MenuSubmenuTrigger} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getSubmenuTriggerProps(item?: MenuRootSubmenuItemObject): MenuSubmenuTriggerProps;

  /**
   * {@link MenuTrigger} に渡す props を取得します。
   */
  getTriggerProps<TPayload = any>(): MenuTriggerProps<TPayload> | null;
}

interface IUseMenuAPI {
  /**
   * {@link MenuAPI} を作成します。
   *
   * @template TItem 項目の型です。
   * @param props {@link Menu} の props です。
   * @returns メニューの API です。
   */
  <TItem = any>(props: MenuProps<TItem>): MenuAPI<TItem>;
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
      if (!item) {
        return itemProps;
      }

      const { type: _, label, ...otherProps } = item;

      return {
        ...mergeProps([itemProps, otherProps]),
        children: label,
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
      if (!item) {
        return groupProps;
      }

      const { type: _1, items: _2, label: _3, ...otherProps } = item;

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
      if (!item) {
        return linkItemProps;
      }

      const { type: _, label, ...otherProps } = item;

      return {
        ...mergeProps([linkItemProps, otherProps]),
        children: label,
      };
    },
    getRadioItemProps(item?: MenuRootRadioItemObject): any {
      return ((): ReturnType<MenuAPI["getRadioItemProps"]> => {
        if (!item) {
          return radioItemProps;
        }

        const { label, value, ...otherProps } = item;

        return {
          ...mergeProps([radioItemProps, otherProps]),
          value,
          children: label,
        };
      })();
    },
    getSeparatorProps() {
      return separatorProps;
    },
    getGroupLabelProps(item) {
      if (!item) {
        return groupLabelProps;
      }

      const { label } = item;
      if (isLikelyVisibleNode(label)) {
        return {
          ...groupLabelProps,
          children: label,
        };
      }

      return null;
    },
    getPositionerProps() {
      return positionerProps;
    },
    getRadioGroupProps(item?: MenuRootRadioItemObjectGroup) {
      if (!item) {
        return radioGroupProps;
      }

      const { type: _, ...otherProps } = item;

      return mergeProps([radioGroupProps, otherProps]);
    },
    getSubmenuRootProps(item?: MenuRootSubmenuItemObject) {
      if (!item) {
        return submenuRootProps;
      }

      const { type: _1, label: _2, ...otherProps } = item;

      return mergeProps([submenuRootProps, otherProps]);
    },
    getCheckboxItemProps(item) {
      if (!item) {
        return checkboxItemProps;
      }

      const { type: _, label, ...otherProps } = item;

      return {
        ...mergeProps([checkboxItemProps, otherProps]),
        children: label,
      };
    },
    getSubmenuTriggerProps(item) {
      if (!item) {
        return submenuTriggerProps;
      }

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
 */
export const Menu: IMenu = function SuiMenu(props: MenuProps) {
  const api = useMenuAPI(props);

  const defaultRadioItemRenderer: IMenuContentItemRenderer = (item, index) => {
    switch (true) {
      case isRadioItemObject(item): {
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
      case isLabeledItemObject(item):
        return <MenuItem {...api.getItemProps(item)} key={index} />;

      case isLinkItemObject(item):
        return <MenuLinkItem {...api.getLinkItemProps(item)} key={index} />;

      case isCheckboxItemObject(item): {
        const { children: label, ...otherProps } = api.getCheckboxItemProps(item);

        return (
          <MenuCheckboxItem {...otherProps} key={index}>
            {label}
            <MenuCheckboxItemIndicator {...api.getCheckboxItemIndicatorProps()} />
          </MenuCheckboxItem>
        );
      }

      case isRadioItemObjectGroup(item):
        return (
          <MenuRadioGroup {...api.getRadioGroupProps(item)} key={index}>
            {defaultRadioItemRenderer}
          </MenuRadioGroup>
        );

      case isSubmenuItemObject(item): {
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

      case isItemObjectGroup(item): {
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

  export type Actions = MenuActions;

  export type ChangeEventDetails = MenuChangeEventDetails;

  export type ChangeEventReason = MenuChangeEventReason;

  export type CheckboxItemObject = MenuRootCheckboxItemObject;

  export type GroupedItemObject = MenuRootGroupedItemObject;

  export type ItemObject = MenuRootItemObject;

  export type ItemObjectGroup = MenuRootItemObjectGroup;

  export interface IItemRenderer<TItem = any> extends IMenuItemRenderer<TItem> {}

  export type LabeledItemObject = MenuRootLabeledItemObject;

  export type LinkItemObject = MenuRootLinkItemObject;

  export type Orientation = MenuOrientation;

  export type RadioItemObject = MenuRootRadioItemObject;

  export type RadioItemObjectGroup = MenuRootRadioItemObjectGroup;

  export type Radius = MenuRadius;

  export type Size = MenuSize;

  export type SubmenuItemObject = MenuRootSubmenuItemObject;

  export type Variant = MenuVariant;
}
