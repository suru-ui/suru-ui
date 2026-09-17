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
} from "./_context-menu.utils.jsx";
import {
  type ContextMenuRootSize,
  type ContextMenuItemProps,
  type ContextMenuRootProps,
  type ContextMenuRootState,
  type ContextMenuGroupProps,
  type ContextMenuRootRadius,
  type ContextMenuPortalProps,
  type ContextMenuRootActions,
  type ContextMenuRootVariant,
  type ContextMenuContentProps,
  type ContextMenuTriggerProps,
  type ContextMenuBackdropProps,
  type ContextMenuLinkItemProps,
  type ContextMenuRadioItemProps,
  type ContextMenuRootItemObject,
  type ContextMenuSeparatorProps,
  type ContextMenuGroupLabelProps,
  type ContextMenuPositionerProps,
  type ContextMenuRadioGroupProps,
  type ContextMenuRootOrientation,
  type ContextMenuSubmenuRootProps,
  type ContextMenuCheckboxItemProps,
  type ContextMenuRootLinkItemObject,
  type ContextMenuRootItemObjectGroup,
  type ContextMenuRootRadioItemObject,
  type ContextMenuSubmenuTriggerProps,
  type IContextMenuContentItemRenderer,
  type ContextMenuRootChangeEventReason,
  type ContextMenuRootGroupedItemObject,
  type ContextMenuRootLabeledItemObject,
  type ContextMenuRootSubmenuItemObject,
  type ContextMenuRootChangeEventDetails,
  type ContextMenuRootCheckboxItemObject,
  type ContextMenuRadioItemIndicatorProps,
  type ContextMenuRootRadioItemObjectGroup,
  type ContextMenuCheckboxItemIndicatorProps,
  ContextMenuItem,
  ContextMenuRoot,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuContent,
  ContextMenuTrigger,
  ContextMenuBackdrop,
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
} from "./context-menu.parts.js";

// Types
// -----

export type ContextMenuActions = ContextMenuRootActions;

export type ContextMenuChangeEventDetails = ContextMenuRootChangeEventDetails;

export type ContextMenuChangeEventReason = ContextMenuRootChangeEventReason;

export type ContextMenuOrientation = ContextMenuRootOrientation;

export interface IContextMenuItemRenderer<
  TItem = any,
> extends IContextMenuContentItemRenderer<TItem> {}

export type ContextMenuRadius = ContextMenuRootRadius;

export type ContextMenuSize = ContextMenuRootSize;

export type ContextMenuVariant = ContextMenuRootVariant;

/**
 * {@link ContextMenu} の各パーツに渡す props です。
 */
export type ContextMenuSlotProps = {
  /**
   * {@link ContextMenuBackdrop} に渡す props です。
   */
  readonly backdrop?: Omit<ContextMenuBackdropProps, "children"> | undefined;

  /**
   * {@link ContextMenuCheckboxItem} に渡す props です。
   */
  readonly checkboxItem?: Omit<ContextMenuCheckboxItemProps, "children"> | undefined;

  /**
   * {@link ContextMenuCheckboxItemIndicator} に渡す props です。
   */
  readonly checkboxItemIndicator?:
    | Omit<ContextMenuCheckboxItemIndicatorProps, "children">
    | undefined;

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
  readonly radioGroup?: Omit<ContextMenuRadioGroupProps, "children" | "items"> | undefined;

  /**
   * {@link ContextMenuRadioItem} に渡す props です。
   */
  readonly radioItem?: Omit<ContextMenuRadioItemProps, "children" | "value"> | undefined;

  /**
   * {@link ContextMenuRadioItemIndicator} に渡す props です。
   */
  readonly radioItemIndicator?: Omit<ContextMenuRadioItemIndicatorProps, "children"> | undefined;

  /**
   * {@link ContextMenuSeparator} に渡す props です。
   */
  readonly separator?: ContextMenuSeparatorProps | undefined;

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
   * チェックボックス項目の選択状態を示す内容です。
   *
   * {@link ContextMenuCheckboxItemIndicator} の子要素として描画されます。
   */
  checkboxIndicator?: React.ReactNode;

  /**
   * ラジオ項目の選択状態を示す内容です。
   *
   * {@link ContextMenuRadioItemIndicator} の子要素として描画されます。
   */
  radioIndicator?: React.ReactNode;

  /**
   * 各パーツに個別の props を渡すためのオブジェクトです。
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
 *
 * @template TItem 項目の型です。
 */
export interface ContextMenuAPI<TItem = any> {
  /**
   * {@link ContextMenuBackdrop} に渡す props を取得します。
   */
  getBackdropProps(): Omit<ContextMenuBackdropProps, "children">;

  /**
   * {@link ContextMenuCheckboxItemIndicator} に渡す props を取得します。
   */
  getCheckboxItemIndicatorProps(): ContextMenuCheckboxItemIndicatorProps;

  /**
   * {@link ContextMenuCheckboxItem} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getCheckboxItemProps(item?: ContextMenuRootCheckboxItemObject): ContextMenuCheckboxItemProps;

  /**
   * {@link ContextMenuContent} に渡す props を取得します。
   *
   * @template TContentItem 項目の型です。
   */
  getContentProps<TContentItem = TItem>(): Override<
    ContextMenuContentProps<TContentItem>,
    {
      children: LikelyVisibleNode | IContextMenuContentItemRenderer | undefined;
    }
  >;

  /**
   * {@link ContextMenuGroupLabel} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getGroupLabelProps(item?: ContextMenuRootItemObjectGroup): ContextMenuGroupLabelProps | null;

  /**
   * {@link ContextMenuGroup} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getGroupProps(item?: ContextMenuRootItemObjectGroup): Omit<ContextMenuGroupProps, "children">;

  /**
   * {@link ContextMenuItem} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getItemProps(item?: ContextMenuRootLabeledItemObject): ContextMenuItemProps;

  /**
   * {@link ContextMenuLinkItem} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getLinkItemProps(item?: ContextMenuRootLinkItemObject): ContextMenuLinkItemProps;

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
   * @template TRadioItem 項目の型です。
   * @param item 項目です。
   */
  getRadioGroupProps<TRadioItem = TItem>(): Omit<
    ContextMenuRadioGroupProps<TRadioItem>,
    "children" | "value"
  >;
  getRadioGroupProps(
    item: ContextMenuRootRadioItemObjectGroup,
  ): Omit<ContextMenuRadioGroupProps<ContextMenuRootRadioItemObject>, "children">;

  /**
   * {@link ContextMenuRadioItemIndicator} に渡す props を取得します。
   */
  getRadioItemIndicatorProps(): ContextMenuRadioItemIndicatorProps;

  /**
   * {@link ContextMenuRadioItem} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getRadioItemProps(): Omit<ContextMenuRadioItemProps, "children" | "value">;
  getRadioItemProps(item: ContextMenuRootRadioItemObject): ContextMenuRadioItemProps;
  getRadioItemProps(
    item?: ContextMenuRootRadioItemObject,
  ): Omit<ContextMenuRadioItemProps, "children" | "value"> | ContextMenuRadioItemProps;

  /**
   * {@link ContextMenuRoot} に渡す props を取得します。
   */
  getRootProps(): Omit<ContextMenuRootProps<TItem>, "children">;

  /**
   * {@link ContextMenuSeparator} に渡す props を取得します。
   */
  getSeparatorProps(): ContextMenuSeparatorProps;

  /**
   * {@link ContextMenuSubmenuRoot} に渡す props を取得します。
   *
   * @template TSubmenuItem 項目の型です。
   * @param item 項目です。
   */
  getSubmenuRootProps<TSubmenuItem = TItem>(): Omit<
    ContextMenuSubmenuRootProps<TSubmenuItem>,
    "children"
  >;
  getSubmenuRootProps(
    item: ContextMenuRootSubmenuItemObject,
  ): Omit<ContextMenuSubmenuRootProps<ContextMenuRootItemObject>, "children">;

  /**
   * {@link ContextMenuSubmenuTrigger} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getSubmenuTriggerProps(item?: ContextMenuRootSubmenuItemObject): ContextMenuSubmenuTriggerProps;

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
  <TItem = any>(props: ContextMenuProps<TItem>): ContextMenuAPI<TItem>;
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
    actionsRef,
    defaultOpen,
    orientation,
    onOpenChange,
    radioIndicator = <CheckIcon />,
    closeParentOnEsc,
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
    getRootProps(): Omit<ContextMenuRootProps, "children"> {
      return {
        open,
        size,
        items,
        radius,
        variant,
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
    getRadioItemProps(item?: ContextMenuRootRadioItemObject): any {
      return ((): ReturnType<ContextMenuAPI["getRadioItemProps"]> => {
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
    getRadioGroupProps(item?: ContextMenuRootRadioItemObjectGroup) {
      if (!item) {
        return radioGroupProps;
      }

      const { type: _, ...otherProps } = item;

      return mergeProps([radioGroupProps, otherProps]);
    },
    getSubmenuRootProps(item?: ContextMenuRootSubmenuItemObject) {
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

  const defaultRadioItemRenderer: IContextMenuContentItemRenderer = (item, index) => {
    switch (true) {
      case isRadioItemObject(item): {
        const { children: label, ...otherProps } = api.getRadioItemProps(item);

        return (
          <ContextMenuRadioItem {...otherProps} key={index}>
            {label}
            <ContextMenuRadioItemIndicator {...api.getRadioItemIndicatorProps()} />
          </ContextMenuRadioItem>
        );
      }

      default:
        return item;
    }
  };
  const defaultContentItemRenderer: IContextMenuContentItemRenderer = (item, index, items) => {
    switch (true) {
      case isLabeledItemObject(item):
        return <ContextMenuItem {...api.getItemProps(item)} key={index} />;

      case isLinkItemObject(item):
        return <ContextMenuLinkItem {...api.getLinkItemProps(item)} key={index} />;

      case isCheckboxItemObject(item): {
        const { children: label, ...otherProps } = api.getCheckboxItemProps(item);

        return (
          <ContextMenuCheckboxItem {...otherProps} key={index}>
            {label}
            <ContextMenuCheckboxItemIndicator {...api.getCheckboxItemIndicatorProps()} />
          </ContextMenuCheckboxItem>
        );
      }

      case isRadioItemObjectGroup(item):
        return (
          <ContextMenuRadioGroup {...api.getRadioGroupProps(item)} key={index}>
            {defaultRadioItemRenderer}
          </ContextMenuRadioGroup>
        );

      case isSubmenuItemObject(item): {
        const { children: content = defaultContentItemRenderer, ...otherContentProps } =
          api.getContentProps();
        const { children: submenuTrigger, ...otherSubmenuTriggerProps } =
          api.getSubmenuTriggerProps(item);

        return (
          <ContextMenuSubmenuRoot {...api.getSubmenuRootProps(item)} key={index}>
            <ContextMenuSubmenuTrigger {...otherSubmenuTriggerProps}>
              {submenuTrigger}
              <ChevronRightIcon />
            </ContextMenuSubmenuTrigger>
            <ContextMenuPortal {...api.getPortalProps()}>
              <ContextMenuPositioner {...api.getPositionerProps()}>
                <ContextMenuContent {...otherContentProps}>{content}</ContextMenuContent>
              </ContextMenuPositioner>
            </ContextMenuPortal>
          </ContextMenuSubmenuRoot>
        );
      }

      case isItemObjectGroup(item): {
        const labelProps = api.getGroupLabelProps(item);

        return (
          <React.Fragment key={index}>
            <ContextMenuGroup {...api.getGroupProps(item)}>
              {labelProps && <ContextMenuGroupLabel {...labelProps} />}
              {item.items.map(defaultContentItemRenderer)}
            </ContextMenuGroup>
            {index < items.length - 1 && <ContextMenuSeparator {...api.getSeparatorProps()} />}
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
    <ContextMenuRoot {...api.getRootProps()}>
      {triggerProps && <ContextMenuTrigger {...triggerProps} />}
      <ContextMenuPortal {...api.getPortalProps()}>
        <ContextMenuBackdrop {...api.getBackdropProps()} />
        <ContextMenuPositioner {...api.getPositionerProps()}>
          <ContextMenuContent {...otherContentProps}>{children}</ContextMenuContent>
        </ContextMenuPositioner>
      </ContextMenuPortal>
    </ContextMenuRoot>
  );
};

export namespace ContextMenu {
  export type State = ContextMenuState;

  export type Props<TItem = any> = ContextMenuProps<TItem>;

  export type SlotProps = ContextMenuSlotProps;

  export type Actions = ContextMenuActions;

  export type ChangeEventDetails = ContextMenuChangeEventDetails;

  export type ChangeEventReason = ContextMenuChangeEventReason;

  export type CheckboxItemObject = ContextMenuRootCheckboxItemObject;

  export type GroupedItemObject = ContextMenuRootGroupedItemObject;

  export type ItemObject = ContextMenuRootItemObject;

  export type ItemObjectGroup = ContextMenuRootItemObjectGroup;

  export interface IItemRenderer<TItem = any> extends IContextMenuItemRenderer<TItem> {}

  export type LabeledItemObject = ContextMenuRootLabeledItemObject;

  export type LinkItemObject = ContextMenuRootLinkItemObject;

  export type Orientation = ContextMenuOrientation;

  export type RadioItemObject = ContextMenuRootRadioItemObject;

  export type RadioItemObjectGroup = ContextMenuRootRadioItemObjectGroup;

  export type Radius = ContextMenuRadius;

  export type Size = ContextMenuSize;

  export type SubmenuItemObject = ContextMenuRootSubmenuItemObject;

  export type Variant = ContextMenuVariant;
}
