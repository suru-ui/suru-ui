import { mergePropsN } from "@base-ui/react";
import * as React from "react";

import { CheckIcon } from "../_icons.jsx";
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
} from "./_context-menu.jsx";
import {
  type ContextMenuRootSize,
  type ContextMenuItemProps,
  type ContextMenuRootProps,
  type ContextMenuRootState,
  type ContextMenuGroupProps,
  type ContextMenuRootRadius,
  type ContextMenuPortalProps,
  type ContextMenuRootActions,
  type ContextMenuContentProps,
  type ContextMenuTriggerProps,
  type ContextMenuLinkItemProps,
  type ContextMenuRadioItemProps,
  type ContextMenuRootItemObject,
  type ContextMenuSeparatorProps,
  type ContextMenuGroupLabelProps,
  type ContextMenuPositionerProps,
  type ContextMenuRadioGroupProps,
  type ContextMenuRootGroupObject,
  type ContextMenuSubmenuRootProps,
  type ContextMenuCheckboxItemProps,
  type ContextMenuRootLinkItemObject,
  type ContextMenuRootRadioItemObject,
  type ContextMenuRootSeparatorObject,
  type ContextMenuSubmenuTriggerProps,
  type ContextMenuRootActionItemObject,
  type ContextMenuRootRadioGroupObject,
  type IContextMenuContentItemRenderer,
  type ContextMenuRootChangeEventReason,
  type ContextMenuRootChangeEventDetails,
  type ContextMenuRootCheckboxItemObject,
  type ContextMenuRadioItemIndicatorProps,
  type ContextMenuCheckboxItemIndicatorProps,
  ContextMenuItem,
  ContextMenuRoot,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuContent,
  ContextMenuTrigger,
  ContextMenuLinkItem,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuGroupLabel,
  ContextMenuPositioner,
  ContextMenuRadioGroup,
  ContextMenuSubmenuRoot,
  ContextMenuCheckboxItem,
  ContextMenuSubmenuTrigger,
  ContextMenuRadioItemIndicator,
  ContextMenuCheckboxItemIndicator,
} from "./context-menu.parts.jsx";

// Types
// -----

/**
 * {@link ContextMenuRootActions}
 */
export type ContextMenuActions = ContextMenuRootActions;

/**
 * {@link ContextMenuRootChangeEventDetails}
 */
export type ContextMenuChangeEventDetails = ContextMenuRootChangeEventDetails;

/**
 * {@link ContextMenuRootChangeEventReason}
 */
export type ContextMenuChangeEventReason = ContextMenuRootChangeEventReason;

/**
 * {@link ContextMenuRootItemObject}
 */
export type ContextMenuItemObject = ContextMenuRootItemObject;

/**
 * {@link ContextMenuRootActionItemObject}
 */
export type ContextMenuActionItemObject = ContextMenuRootActionItemObject;

/**
 * {@link ContextMenuRootCheckboxItemObject}
 */
export type ContextMenuCheckboxItemObject = ContextMenuRootCheckboxItemObject;

/**
 * {@link ContextMenuRootGroupObject}
 */
export type ContextMenuGroupObject = ContextMenuRootGroupObject;

/**
 * {@link ContextMenuRootLinkItemObject}
 */
export type ContextMenuLinkItemObject = ContextMenuRootLinkItemObject;

/**
 * {@link ContextMenuRootRadioGroupObject}
 */
export type ContextMenuRadioGroupObject = ContextMenuRootRadioGroupObject;

/**
 * {@link ContextMenuRootRadioItemObject}
 */
export type ContextMenuRadioItemObject = ContextMenuRootRadioItemObject;

/**
 * {@link ContextMenuRootSeparatorObject}
 */
export type ContextMenuSeparatorObject = ContextMenuRootSeparatorObject;

/**
 * {@link IContextMenuContentItemRenderer}
 */
export interface IContextMenuItemRenderer<
  TItem = any,
> extends IContextMenuContentItemRenderer<TItem> {}

/**
 * {@link ContextMenuRootRadius}
 */
export type ContextMenuRadius = ContextMenuRootRadius;

/**
 * {@link ContextMenuRootSize}
 */
export type ContextMenuSize = ContextMenuRootSize;

/**
 * {@link ContextMenu} の各パーツに渡す props です。
 */
export type ContextMenuSlotProps = {
  /**
   * {@link ContextMenuCheckboxItem} に渡す props です。
   */
  readonly checkboxItem?: Omit<ContextMenuCheckboxItemProps, "children"> | undefined;

  /**
   * {@link ContextMenuCheckboxItemIndicator} に渡す props です。
   */
  readonly checkboxItemIndicator?: ContextMenuCheckboxItemIndicatorProps | undefined;

  /**
   * {@link ContextMenuGroup} に渡す props です。
   */
  readonly group?: Omit<ContextMenuGroupProps, "children"> | undefined;

  /**
   * {@link ContextMenuGroupLabel} に渡す props です。
   */
  readonly groupLabel?: Omit<ContextMenuGroupLabelProps, "children"> | undefined;

  /**
   * {@link ContextMenuItem} に渡す props です。
   */
  readonly item?: Omit<ContextMenuItemProps, "children"> | undefined;

  /**
   * {@link ContextMenuLinkItem} に渡す props です。
   */
  readonly linkItem?: Omit<ContextMenuLinkItemProps, "children"> | undefined;

  /**
   * {@link ContextMenuPortal} に渡す props です。
   */
  readonly portal?: Omit<ContextMenuPortalProps, "children"> | undefined;

  /**
   * {@link ContextMenuPositioner} に渡す props です。
   */
  readonly positioner?: Omit<ContextMenuPositionerProps, "children"> | undefined;

  /**
   * {@link ContextMenuRadioGroup} に渡す props です。
   */
  readonly radioGroup?: Omit<ContextMenuRadioGroupProps, "children"> | undefined;

  /**
   * {@link ContextMenuRadioItem} に渡す props です。
   */
  readonly radioItem?: Omit<ContextMenuRadioItemProps, "children"> | undefined;

  /**
   * {@link ContextMenuRadioItemIndicator} に渡す props です。
   */
  readonly radioItemIndicator?: ContextMenuRadioItemIndicatorProps | undefined;

  /**
   * {@link ContextMenuSeparator} に渡す props です。
   */
  readonly separator?: Omit<ContextMenuSeparatorProps, "children"> | undefined;

  /**
   * {@link ContextMenuSubmenuRoot} に渡す props です。
   */
  readonly submenuRoot?: Omit<ContextMenuSubmenuRootProps, "children"> | undefined;

  /**
   * {@link ContextMenuSubmenuTrigger} に渡す props です。
   */
  readonly submenuTrigger?: Omit<ContextMenuSubmenuTriggerProps, "children"> | undefined;

  /**
   * {@link ContextMenuTrigger} に渡す props です。
   */
  readonly trigger?: Omit<ContextMenuTriggerProps, "children"> | undefined;
};

/**
 * {@link ContextMenu} が持つ状態です。
 */
export type ContextMenuState = ContextMenuRootState;

type ContextMenuPropsMain = {
  /**
   * 各パーツに個別の props を渡すためのオブジェクトです。
   *
   * 各パーツの props が優先されます。
   */
  slotProps?: ContextMenuSlotProps | undefined;

  /**
   * コンテキストメニューを開く対象のコンテンツです。
   *
   * {@link ContextMenuTrigger} の子要素として直接渡されます。
   */
  trigger?: ContextMenuTriggerProps["children"] | undefined;
};

type ContextMenuPropsRoot<TItem = any> = Omit<
  ContextMenuRootProps<TItem>,
  "children" | keyof ContextMenuPropsMain
>;

type ContextMenuPropsContent = Omit<
  ContextMenuContentProps,
  keyof ContextMenuPropsMain | keyof ContextMenuPropsRoot
>;

/**
 * {@link ContextMenu} に渡す props です。
 *
 * @template TItem 項目の型です。
 */
export type ContextMenuProps<TItem = any> = ContextMenuPropsMain &
  ContextMenuPropsRoot<TItem> &
  ContextMenuPropsContent;

// API
// ---

/**
 * {@link ContextMenu} を構成する各パーツの props を作成するための API です。
 */
export interface ContextMenuAPI {
  /**
   * {@link ContextMenuCheckboxItemIndicator} に渡す props を取得します。
   */
  getCheckboxItemIndicatorProps(): ContextMenuCheckboxItemIndicatorProps;

  /**
   * {@link ContextMenuCheckboxItem} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getCheckboxItemProps(item: ContextMenuCheckboxItemObject): Omit<
    ContextMenuCheckboxItemProps,
    "children"
  > & {
    children: LikelyVisibleNode | null;
  };

  /**
   * {@link ContextMenuContent} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getContentProps(item?: ContextMenuItemObject): Omit<ContextMenuContentProps, "children"> & {
    children: LikelyVisibleNode | null;
  };

  /**
   * {@link ContextMenuGroupLabel} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getGroupLabelProps(item: ContextMenuGroupObject): ContextMenuGroupLabelProps | null;

  /**
   * {@link ContextMenuGroup} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getGroupProps(item: ContextMenuGroupObject): Omit<ContextMenuGroupProps, "children">;

  /**
   * {@link ContextMenuItem} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getItemProps(item: ContextMenuItemObject): Omit<ContextMenuItemProps, "children"> & {
    children: LikelyVisibleNode | null;
  };

  /**
   * {@link ContextMenuLinkItem} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getLinkItemProps(item: ContextMenuLinkItemObject): Omit<ContextMenuLinkItemProps, "children"> & {
    children: LikelyVisibleNode | null;
  };

  /**
   * {@link ContextMenuPortal} に渡す props を取得します。
   */
  getPortalProps(): Omit<ContextMenuPortalProps, "children">;

  /**
   * {@link ContextMenuPositioner} に渡す props を取得します。
   */
  getPositionerProps(): Omit<ContextMenuPositionerProps, "children">;

  /**
   * {@link ContextMenuRadioGroup} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getRadioGroupProps(
    item: ContextMenuRadioGroupObject,
  ): Omit<ContextMenuRadioGroupProps, "children">;

  /**
   * {@link ContextMenuRadioItemIndicator} に渡す props を取得します。
   */
  getRadioItemIndicatorProps(): ContextMenuRadioItemIndicatorProps;

  /**
   * {@link ContextMenuRadioItem} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getRadioItemProps(item: ContextMenuRadioItemObject): Omit<
    ContextMenuRadioItemProps,
    "children"
  > & {
    children: LikelyVisibleNode | null;
  };

  /**
   * {@link ContextMenuRoot} に渡す props を取得します。
   */
  getRootProps(): Omit<ContextMenuRootProps, "children">;

  /**
   * {@link ContextMenuSeparator} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getSeparatorProps(item: ContextMenuSeparatorObject): Omit<ContextMenuSeparatorProps, "children">;

  /**
   * {@link ContextMenuSubmenuRoot} に渡す props を取得します。
   */
  getSubmenuRootProps(): Omit<ContextMenuSubmenuRootProps, "children">;

  /**
   * {@link ContextMenuSubmenuTrigger} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getSubmenuTriggerProps(item: ContextMenuItemObject): Omit<
    ContextMenuSubmenuTriggerProps,
    "children"
  > & {
    children: LikelyVisibleNode | null;
  };

  /**
   * {@link ContextMenuTrigger} に渡す props を取得します。
   */
  getTriggerProps(): ContextMenuTriggerProps | null;
}

interface IUseContextMenuAPI {
  /**
   * {@link ContextMenuAPI} を作成します。
   *
   * @template TItem 項目の型です。
   * @param props {@link ContextMenu} の props です。
   * @returns コンテキストメニューの API です。
   */
  <TItem = any>(props: ContextMenuProps<TItem>): ContextMenuAPI;
}

/**
 * {@link ContextMenuAPI} を作成するフックです。
 */
export const useContextMenuAPI: IUseContextMenuAPI = function useSuiContextMenuAPI(props) {
  const {
    open,
    size,
    items,
    radius,
    trigger,
    disabled,
    outlined,
    loopFocus,
    slotProps: {
      item: itemProps = {},
      group: groupProps = {},
      portal: portalProps = {},
      trigger: triggerProps = {},
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
    actionsRef,
    defaultOpen,
    orientation,
    onOpenChange,
    closeParentOnEsc,
    highlightItemOnHover,
    onOpenChangeComplete,
    ...contentProps
  } = props;

  return {
    getItemProps(item) {
      const { label, items: _, type: __, ...otherItemProps } = item as ContextMenuActionItemObject;

      return {
        ...mergePropsN([itemProps, otherItemProps]),
        children: toReactNode(label),
      };
    },
    getRootProps(): Required<Omit<ContextMenuRootProps, "children">> {
      return {
        open,
        size,
        items,
        radius,
        disabled,
        outlined,
        loopFocus,
        actionsRef,
        defaultOpen,
        orientation,
        onOpenChange,
        closeParentOnEsc,
        highlightItemOnHover,
        onOpenChangeComplete,
      };
    },
    getGroupProps(item) {
      const { items: _, label: __, type: ___, ...otherGroupProps } = item;

      return mergePropsN([groupProps, otherGroupProps]);
    },
    getPortalProps() {
      return portalProps;
    },
    getContentProps(item) {
      const { items = [] } = this.getRootProps();
      const { children, ...otherContentProps } = contentProps;

      return {
        ...otherContentProps,
        children: item
          ? null
          : typeof children === "function"
            ? items.map(children)
            : toReactNode(children),
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
    getLinkItemProps(item) {
      const { label, type: _, ...otherItemProps } = item;

      return {
        ...mergePropsN([linkItemProps, otherItemProps]),
        children: toReactNode(label),
      };
    },
    getRadioItemProps(item) {
      const { label, type: _, value, ...otherItemProps } = item;

      return {
        ...mergePropsN([radioItemProps, otherItemProps]),
        value,
        children: toReactNode(label),
      };
    },
    getSeparatorProps(item) {
      const { type: _, ...otherProps } = item;

      return mergePropsN([separatorProps, otherProps]);
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
      const { items: _, type: __, ...otherGroupProps } = item;

      return mergePropsN([radioGroupProps, otherGroupProps]);
    },
    getSubmenuRootProps() {
      return submenuRootProps;
    },
    getCheckboxItemProps(item) {
      const { label, type: _, ...otherItemProps } = item;

      return {
        ...mergePropsN([checkboxItemProps, otherItemProps]),
        children: toReactNode(label),
      };
    },
    getSubmenuTriggerProps(item) {
      const { label, items: _, type: __, ...otherItemProps } = item as ContextMenuActionItemObject;

      return {
        ...mergePropsN([submenuTriggerProps, otherItemProps]),
        children: toReactNode(label),
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

export { type ContextMenuAPI as API, useContextMenuAPI as useAPI };

// Component
// ---------

interface IContextMenu extends IComponent<ContextMenuProps> {
  /**
   * @template TItem 項目の型です。
   */
  <TItem = any>(props: ContextMenuProps<TItem>): IComponent.Return;
}

/**
 * コンテキストメニューを表示するコンポーネントです。
 *
 * 右クリックまたは長押しの対象とポップアップを組み立てます。
 */
export const ContextMenu: IContextMenu = function SuiContextMenu(props: ContextMenuProps) {
  const api = useContextMenuAPI(props);
  const triggerProps = api.getTriggerProps();
  const { children, ...otherContentProps } = api.getContentProps();
  const defaultRadioItemRenderer: IContextMenuContentItemRenderer = (item, index) => {
    if (!isRadioItemObject(item)) {
      return toReactNode(item);
    }

    const { children: label, ...otherItemProps } = api.getRadioItemProps(
      item as ContextMenuRadioItemObject,
    );
    const { children: indicatorChildren, ...otherIndicatorProps } =
      api.getRadioItemIndicatorProps();

    return (
      <ContextMenuRadioItem key={index} {...otherItemProps}>
        {label}
        <ContextMenuRadioItemIndicator {...otherIndicatorProps}>
          {indicatorChildren ?? <CheckIcon />}
        </ContextMenuRadioItemIndicator>
      </ContextMenuRadioItem>
    );
  };
  const defaultContentItemRenderer: IContextMenuContentItemRenderer = (item, index, items) => {
    if (isSeparatorObject(item)) {
      return (
        <ContextMenuSeparator
          key={index}
          {...api.getSeparatorProps(item as ContextMenuSeparatorObject)}
        />
      );
    }

    if (isRadioGroupObject(item)) {
      return (
        <ContextMenuRadioGroup
          key={index}
          {...api.getRadioGroupProps(item as ContextMenuRadioGroupObject)}
        >
          {item.items.map(defaultRadioItemRenderer)}
        </ContextMenuRadioGroup>
      );
    }

    if (isGroupObject(item)) {
      const groupItem = item as ContextMenuGroupObject;
      const labelProps = api.getGroupLabelProps(groupItem);

      return (
        <ContextMenuGroup key={index} {...api.getGroupProps(groupItem)}>
          {labelProps && <ContextMenuGroupLabel {...labelProps} />}
          {groupItem.items.map(defaultContentItemRenderer)}
        </ContextMenuGroup>
      );
    }

    if (!isItemObject(item)) {
      return toReactNode(item);
    }

    if (isCheckboxItemObject(item)) {
      const { children: label, ...otherItemProps } = api.getCheckboxItemProps(
        item as ContextMenuCheckboxItemObject,
      );
      const { children: indicatorChildren, ...otherIndicatorProps } =
        api.getCheckboxItemIndicatorProps();

      return (
        <ContextMenuCheckboxItem key={index} {...otherItemProps}>
          {label}
          <ContextMenuCheckboxItemIndicator {...otherIndicatorProps}>
            {indicatorChildren ?? <CheckIcon />}
          </ContextMenuCheckboxItemIndicator>
        </ContextMenuCheckboxItem>
      );
    }

    if (isRadioItemObject(item)) {
      return defaultRadioItemRenderer(item, index, items);
    }

    if (isLinkItemObject(item)) {
      return (
        <ContextMenuLinkItem
          key={index}
          {...api.getLinkItemProps(item as ContextMenuLinkItemObject)}
        />
      );
    }

    const { items: subItems } = item as ContextMenuActionItemObject;
    if (!subItems) {
      return <ContextMenuItem key={index} {...api.getItemProps(item as ContextMenuItemObject)} />;
    }

    return (
      <ContextMenuSubmenuRoot key={index} {...api.getSubmenuRootProps()}>
        <ContextMenuSubmenuTrigger {...api.getSubmenuTriggerProps(item as ContextMenuItemObject)} />
        <ContextMenuPortal {...api.getPortalProps()}>
          <ContextMenuPositioner {...api.getPositionerProps()}>
            <ContextMenuContent {...api.getContentProps(item as ContextMenuItemObject)}>
              {subItems.map(defaultContentItemRenderer)}
            </ContextMenuContent>
          </ContextMenuPositioner>
        </ContextMenuPortal>
      </ContextMenuSubmenuRoot>
    );
  };

  return (
    <ContextMenuRoot {...api.getRootProps()}>
      {triggerProps && <ContextMenuTrigger {...triggerProps} />}
      <ContextMenuPortal {...api.getPortalProps()}>
        <ContextMenuPositioner {...api.getPositionerProps()}>
          <ContextMenuContent {...otherContentProps}>
            {children ?? defaultContentItemRenderer}
          </ContextMenuContent>
        </ContextMenuPositioner>
      </ContextMenuPortal>
    </ContextMenuRoot>
  );
};

export namespace ContextMenu {
  /**
   * {@link ContextMenuState}
   */
  export type State = ContextMenuState;

  /**
   * {@link ContextMenuProps}
   */
  export type Props<TItem = any> = ContextMenuProps<TItem>;

  /**
   * {@link ContextMenuSlotProps}
   */
  export type SlotProps = ContextMenuSlotProps;

  /**
   * {@link ContextMenuActionItemObject}
   */
  export type ActionItemObject = ContextMenuActionItemObject;

  /**
   * {@link ContextMenuActions}
   */
  export type Actions = ContextMenuActions;

  /**
   * {@link ContextMenuChangeEventDetails}
   */
  export type ChangeEventDetails = ContextMenuChangeEventDetails;

  /**
   * {@link ContextMenuChangeEventReason}
   */
  export type ChangeEventReason = ContextMenuChangeEventReason;

  /**
   * {@link ContextMenuCheckboxItemObject}
   */
  export type CheckboxItemObject = ContextMenuCheckboxItemObject;

  /**
   * {@link ContextMenuGroupObject}
   */
  export type GroupObject = ContextMenuGroupObject;

  /**
   * {@link ContextMenuItemObject}
   */
  export type ItemObject = ContextMenuItemObject;

  /**
   * {@link IContextMenuItemRenderer}
   */
  export interface IItemRenderer<TItem = any> extends IContextMenuItemRenderer<TItem> {}

  /**
   * {@link ContextMenuLinkItemObject}
   */
  export type LinkItemObject = ContextMenuLinkItemObject;

  /**
   * {@link ContextMenuRadioGroupObject}
   */
  export type RadioGroupObject = ContextMenuRadioGroupObject;

  /**
   * {@link ContextMenuRadioItemObject}
   */
  export type RadioItemObject = ContextMenuRadioItemObject;

  /**
   * {@link ContextMenuRadius}
   */
  export type Radius = ContextMenuRadius;

  /**
   * {@link ContextMenuSeparatorObject}
   */
  export type SeparatorObject = ContextMenuSeparatorObject;

  /**
   * {@link ContextMenuSize}
   */
  export type Size = ContextMenuSize;
}
