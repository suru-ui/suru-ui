import { mergePropsN } from "@base-ui/react";
import * as React from "react";

import type { LikelyVisibleNode } from "../_is-likely-visible-node.js";
import toReactNode from "../_to-react-node.js";
import type { IComponent } from "../types.js";
import { isItemObject } from "./_context-menu.jsx";
import {
  type ContextMenuRootSize,
  type ContextMenuItemProps,
  type ContextMenuRootProps,
  type ContextMenuRootState,
  type ContextMenuRootRadius,
  type ContextMenuPortalProps,
  type ContextMenuRootActions,
  type ContextMenuContentProps,
  type ContextMenuTriggerProps,
  type ContextMenuRootItemObject,
  type ContextMenuPositionerProps,
  type ContextMenuSubmenuRootProps,
  type ContextMenuSubmenuTriggerProps,
  type IContextMenuContentItemRenderer,
  type ContextMenuRootChangeEventReason,
  type ContextMenuRootChangeEventDetails,
  ContextMenuItem,
  ContextMenuRoot,
  ContextMenuPortal,
  ContextMenuContent,
  ContextMenuTrigger,
  ContextMenuPositioner,
  ContextMenuSubmenuRoot,
  ContextMenuSubmenuTrigger,
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
   * {@link ContextMenuContent} に渡す props です。
   */
  readonly content?: Omit<ContextMenuContentProps, "children"> | undefined;

  /**
   * {@link ContextMenuItem} に渡す props です。
   */
  readonly item?: Omit<ContextMenuItemProps, "children"> | undefined;

  /**
   * {@link ContextMenuPortal} に渡す props です。
   */
  readonly portal?: Omit<ContextMenuPortalProps, "children"> | undefined;

  /**
   * {@link ContextMenuPositioner} に渡す props です。
   */
  readonly positioner?: Omit<ContextMenuPositionerProps, "children"> | undefined;

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

/**
 * {@link ContextMenu} に渡す props です。
 *
 * @template TItem 項目の型です。
 */
export type ContextMenuProps<TItem = any> = Omit<ContextMenuRootProps<TItem>, "children"> &
  Pick<ContextMenuContentProps, "children"> & {
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

// API
// ---

/**
 * {@link ContextMenu} を構成する各パーツの props を作成するための API です。
 */
export interface ContextMenuAPI {
  /**
   * {@link ContextMenuContent} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getContentProps(item?: ContextMenuItemObject): Omit<ContextMenuContentProps, "children"> & {
    children: LikelyVisibleNode | null;
  };

  /**
   * {@link ContextMenuItem} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getItemProps(item: ContextMenuItemObject): Omit<ContextMenuItemProps, "children"> & {
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
   * {@link ContextMenuRoot} に渡す props を取得します。
   */
  getRootProps(): Omit<ContextMenuRootProps, "children">;

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
   * @returns コンテキストメニューの API です
   */
  <TItem = any>(props: ContextMenuProps<TItem>): ContextMenuAPI;
}

/**
 * {@link ContextMenuAPI} を作成するフックです。
 */
export const useContextMenuAPI: IUseContextMenuAPI = function useSuiContextMenuAPI(props) {
  const {
    trigger,
    children,
    slotProps: {
      item: itemProps = {},
      portal: portalProps = {},
      content: contentProps = {},
      trigger: triggerProps = {},
      positioner: positionerProps = {},
      submenuRoot: submenuRootProps = {},
      submenuTrigger: submenuTriggerProps = {},
    } = {},
    ...rootProps
  } = props;

  return {
    getItemProps(item) {
      const { label, items: _, ...otherItemProps } = item;

      return {
        ...mergePropsN([itemProps, otherItemProps]),
        children: toReactNode(label),
      };
    },
    getRootProps() {
      return rootProps;
    },
    getPortalProps() {
      return portalProps;
    },
    getContentProps(item) {
      const { items = [] } = this.getRootProps();

      return {
        ...contentProps,
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
    getPositionerProps() {
      return positionerProps;
    },
    getSubmenuRootProps() {
      return submenuRootProps;
    },
    getSubmenuTriggerProps(item) {
      const { label, items: _, ...otherItemProps } = item;

      return {
        ...mergePropsN([submenuTriggerProps, otherItemProps]),
        children: toReactNode(label),
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
  const triggerProps = api.getTriggerProps();
  const { children, ...otherContentProps } = api.getContentProps();
  const defaultContentItemRenderer: IContextMenuContentItemRenderer = (item, index) => {
    if (!isItemObject(item)) {
      return toReactNode(item);
    }

    const { items: subItems } = item;
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
   * {@link ContextMenuItemObject}
   */
  export type ItemObject = ContextMenuItemObject;

  /**
   * {@link IContextMenuItemRenderer}
   */
  export interface IItemRenderer<TItem = any> extends IContextMenuItemRenderer<TItem> {}

  /**
   * {@link ContextMenuRadius}
   */
  export type Radius = ContextMenuRadius;

  /**
   * {@link ContextMenuSize}
   */
  export type Size = ContextMenuSize;
}
