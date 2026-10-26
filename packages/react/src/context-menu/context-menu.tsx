import * as React from "react";

import { CheckIcon, ChevronRightIcon } from "../_icons.jsx";
import isLikelyVisibleNode, { type LikelyVisibleNode } from "../_is-likely-visible-node.js";
import { getItemKey } from "../_item.js";
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
  type ContextMenuContext,
  type ContextMenuRootSize,
  type ContextMenuItemProps,
  type ContextMenuRootProps,
  type ContextMenuRootState,
  type ContextMenuGroupProps,
  type ContextMenuPopupProps,
  type ContextMenuRootRadius,
  type ContextMenuPortalProps,
  type ContextMenuRootActions,
  type ContextMenuRootVariant,
  type IUseContextMenuContext,
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
  type IContextMenuPopupItemRenderer,
  type ContextMenuRootItemObjectGroup,
  type ContextMenuRootRadioItemObject,
  type ContextMenuSubmenuTriggerProps,
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
  ContextMenuPopup,
  ContextMenuPortal,
  ContextMenuTrigger,
  ContextMenuBackdrop,
  ContextMenuLinkItem,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuGroupLabel,
  ContextMenuPositioner,
  ContextMenuRadioGroup,
  useContextMenuContext,
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

export type IContextMenuItemRenderer<TItem = any> = IContextMenuPopupItemRenderer<TItem>;

export type ContextMenuRadius = ContextMenuRootRadius;

export type ContextMenuSize = ContextMenuRootSize;

export type ContextMenuVariant = ContextMenuRootVariant;

/**
 * {@link ContextMenu} の各パーツに渡す props です。
 *
 * @template TItem 項目の型です。
 */
export type ContextMenuSlotProps = {
  /**
   * {@link ContextMenuBackdrop} に渡す props です。
   *
   * @template TItem 項目の型です。
   */
  readonly backdrop?: Omit<ContextMenuBackdropProps, "children"> | undefined;

  /**
   * {@link ContextMenuCheckboxItem} に渡す props です。
   *
   * @template TItem 項目の型です。
   */
  readonly checkboxItem?: Omit<ContextMenuCheckboxItemProps, "children"> | undefined;

  /**
   * {@link ContextMenuCheckboxItemIndicator} に渡す props です。
   *
   * @template TItem 項目の型です。
   */
  readonly checkboxItemIndicator?:
    | Omit<ContextMenuCheckboxItemIndicatorProps, "children">
    | undefined;

  /**
   * {@link ContextMenuGroup} に渡す props です。
   *
   * @template TItem 項目の型です。
   */
  readonly group?: Omit<ContextMenuGroupProps, "children"> | undefined;

  /**
   * {@link ContextMenuGroupLabel} に渡す props です。
   *
   * @template TItem 項目の型です。
   */
  readonly groupLabel?: Omit<ContextMenuGroupLabelProps, "children"> | undefined;

  /**
   * {@link ContextMenuItem} に渡す props です。
   *
   * @template TItem 項目の型です。
   */
  readonly item?: Omit<ContextMenuItemProps, "children"> | undefined;

  /**
   * {@link ContextMenuLinkItem} に渡す props です。
   *
   * @template TItem 項目の型です。
   */
  readonly linkItem?: Omit<ContextMenuLinkItemProps, "children"> | undefined;

  /**
   * {@link ContextMenuPortal} に渡す props です。
   *
   * @template TItem 項目の型です。
   */
  readonly portal?: Omit<ContextMenuPortalProps, "children"> | undefined;

  /**
   * {@link ContextMenuPositioner} に渡す props です。
   *
   * @template TItem 項目の型です。
   */
  readonly positioner?: Omit<ContextMenuPositionerProps, "children"> | undefined;

  /**
   * {@link ContextMenuRadioGroup} に渡す props です。
   *
   * @template TItem 項目の型です。
   */
  readonly radioGroup?: Omit<ContextMenuRadioGroupProps, "children" | "items"> | undefined;

  /**
   * {@link ContextMenuRadioItem} に渡す props です。
   *
   * @template TItem 項目の型です。
   */
  readonly radioItem?: Omit<ContextMenuRadioItemProps, "children" | "value"> | undefined;

  /**
   * {@link ContextMenuRadioItemIndicator} に渡す props です。
   *
   * @template TItem 項目の型です。
   */
  readonly radioItemIndicator?: Omit<ContextMenuRadioItemIndicatorProps, "children"> | undefined;

  /**
   * {@link ContextMenuSeparator} に渡す props です。
   *
   * @template TItem 項目の型です。
   */
  readonly separator?: ContextMenuSeparatorProps | undefined;

  /**
   * {@link ContextMenuSubmenuRoot} に渡す props です。
   *
   * @template TItem 項目の型です。
   */
  readonly submenuRoot?: Omit<ContextMenuSubmenuRootProps, "children"> | undefined;

  /**
   * {@link ContextMenuSubmenuTrigger} に渡す props です。
   *
   * @template TItem 項目の型です。
   */
  readonly submenuTrigger?: Omit<ContextMenuSubmenuTriggerProps, "children"> | undefined;

  /**
   * {@link ContextMenuTrigger} に渡す props です。
   *
   * @template TItem 項目の型です。
   */
  readonly trigger?: Omit<ContextMenuTriggerProps, "children"> | undefined;
};

/**
 * {@link ContextMenu} が持つ状態です。
 *
 * @template TItem 項目の型です。
 */
export type ContextMenuState<TItem = any> = ContextMenuRootState<TItem>;

namespace ContextMenuProps {
  export type ContextMenu = {
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
     * コンテキストメニューを開く対象です。
     *
     * そのまま {@link ContextMenuTrigger} の `children` に渡されます。
     */
    trigger?: ContextMenuTriggerProps["children"] | undefined;
  };

  export type Popup = Omit<ContextMenuPopupProps, keyof ContextMenu | keyof Root>;

  export type Root<TItem = any> = Omit<ContextMenuRootProps<TItem>, "children" | keyof ContextMenu>;
}

/**
 * {@link ContextMenu} に渡す props です。
 *
 * @template TItem 項目の型です。
 */
export type ContextMenuProps<TItem = any> = ContextMenuProps.ContextMenu &
  ContextMenuProps.Root<TItem> &
  ContextMenuProps.Popup;

export interface IUseContextMenuAPI {
  /**
   * {@link ContextMenuAPI} を作成します。
   *
   * @template TItem 項目の型です。
   * @param props {@link ContextMenu} の props です。
   * @returns コンテキストメニューの API です。
   */
  <TItem = any>(props: ContextMenuProps<TItem>): ContextMenuAPI<TItem>;
}

// API
// ---

/**
 * {@link ContextMenu} を構成する各パーツの props を作成するための API です。
 *
 * @template TItem 項目の型です。
 */
export class ContextMenuAPI<TItem = any> {
  private readonly checkboxIndicator: React.ReactNode;

  private readonly popupProps: ContextMenuProps.Popup;

  private readonly radioIndicator: React.ReactNode;

  private readonly rootProps: ContextMenuProps.Root<TItem>;

  private readonly slotProps: ContextMenuSlotProps;

  private readonly trigger: ContextMenuTriggerProps["children"] | undefined;

  /**
   * @param props {@link ContextMenu} の props です。
   * @internal
   */
  public constructor(props: ContextMenuProps<TItem>) {
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
      slotProps = {},
      actionsRef,
      defaultOpen,
      orientation,
      onOpenChange,
      radioIndicator = <CheckIcon />,
      closeParentOnEsc,
      checkboxIndicator = <CheckIcon />,
      highlightItemOnHover,
      onOpenChangeComplete,
      ...popupProps
    } = props;

    this.checkboxIndicator = checkboxIndicator;
    this.popupProps = popupProps;
    this.radioIndicator = radioIndicator;
    this.rootProps = {
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
    this.slotProps = slotProps;
    this.trigger = trigger;
  }

  private readonly defaultPopupItemRenderer: IContextMenuPopupItemRenderer = (
    item,
    index,
    items,
  ) => {
    switch (true) {
      case isLabeledItemObject(item):
        return <ContextMenuItem {...this.getItemProps(item)} key={getItemKey(item) ?? index} />;

      case isLinkItemObject(item):
        return (
          <ContextMenuLinkItem {...this.getLinkItemProps(item)} key={getItemKey(item) ?? index} />
        );

      case isCheckboxItemObject(item): {
        const { children: label, ...otherProps } = this.getCheckboxItemProps(item);

        return (
          <ContextMenuCheckboxItem {...otherProps} key={getItemKey(item) ?? index}>
            {label}
            <ContextMenuCheckboxItemIndicator {...this.getCheckboxItemIndicatorProps()} />
          </ContextMenuCheckboxItem>
        );
      }

      case isRadioItemObjectGroup(item):
        return (
          <ContextMenuRadioGroup {...this.getRadioGroupProps(item)} key={getItemKey(item) ?? index}>
            {this.defaultRadioItemRenderer}
          </ContextMenuRadioGroup>
        );

      case isSubmenuItemObject(item): {
        const { children: popup = this.defaultPopupItemRenderer, ...otherPopupProps } =
          this.getPopupProps();
        const { children: submenuTrigger, ...otherSubmenuTriggerProps } =
          this.getSubmenuTriggerProps(item);

        return (
          <ContextMenuSubmenuRoot
            {...this.getSubmenuRootProps(item)}
            key={getItemKey(item) ?? index}
          >
            <ContextMenuSubmenuTrigger {...otherSubmenuTriggerProps}>
              {submenuTrigger}
              <ChevronRightIcon />
            </ContextMenuSubmenuTrigger>
            <ContextMenuPortal {...this.getPortalProps()}>
              <ContextMenuPositioner {...this.getPositionerProps()}>
                <ContextMenuPopup {...otherPopupProps}>{popup}</ContextMenuPopup>
              </ContextMenuPositioner>
            </ContextMenuPortal>
          </ContextMenuSubmenuRoot>
        );
      }

      case isItemObjectGroup(item): {
        const labelProps = this.getGroupLabelProps(item);

        return (
          <React.Fragment key={getItemKey(item) ?? index}>
            <ContextMenuGroup {...this.getGroupProps(item)}>
              {labelProps && <ContextMenuGroupLabel {...labelProps} />}
              {item.items.map(this.defaultPopupItemRenderer)}
            </ContextMenuGroup>
            {index < items.length - 1 && <ContextMenuSeparator {...this.getSeparatorProps()} />}
          </React.Fragment>
        );
      }

      default:
        return item;
    }
  };

  private readonly defaultRadioItemRenderer: IContextMenuPopupItemRenderer = (item, index) => {
    switch (true) {
      case isRadioItemObject(item): {
        const { children: label, ...otherProps } = this.getRadioItemProps(item);

        return (
          <ContextMenuRadioItem {...otherProps} key={getItemKey(item) ?? index}>
            {label}
            <ContextMenuRadioItemIndicator {...this.getRadioItemIndicatorProps()} />
          </ContextMenuRadioItem>
        );
      }

      default:
        return item;
    }
  };

  /**
   * {@link ContextMenuBackdrop} に渡す props を取得します。
   */
  public getBackdropProps(): Omit<ContextMenuBackdropProps, "children"> {
    const { backdrop: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link ContextMenuCheckboxItemIndicator} に渡す props を取得します。
   */
  public getCheckboxItemIndicatorProps(): ContextMenuCheckboxItemIndicatorProps {
    const { checkboxItemIndicator: props = {} } = this.slotProps;

    return {
      ...props,
      children: this.checkboxIndicator,
    };
  }

  /**
   * {@link ContextMenuCheckboxItem} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  public getCheckboxItemProps(
    item?: ContextMenuRootCheckboxItemObject,
  ): ContextMenuCheckboxItemProps {
    const { checkboxItem: props = {} } = this.slotProps;

    if (!item) {
      return props;
    }

    const { type: _, label, ...otherProps } = item;

    return {
      ...mergeProps([props, otherProps]),
      children: label,
    };
  }

  /**
   * {@link ContextMenuPopup} に渡す props を取得します。
   *
   * @template TPopupItem 項目の型です。
   */
  public getPopupProps<TPopupItem = TItem>(): Override<
    ContextMenuPopupProps<TPopupItem>,
    {
      children: LikelyVisibleNode | IContextMenuPopupItemRenderer | undefined;
    }
  > {
    const { children = this.defaultPopupItemRenderer, ...otherProps } = this.popupProps;

    return {
      ...otherProps,
      children: typeof children === "function" ? children : toReactNode(children),
    };
  }

  /**
   * {@link ContextMenuGroupLabel} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  public getGroupLabelProps(
    item?: ContextMenuRootItemObjectGroup,
  ): ContextMenuGroupLabelProps | null {
    const { groupLabel: props = {} } = this.slotProps;

    if (!item) {
      return props;
    }

    const { label } = item;
    if (isLikelyVisibleNode(label)) {
      return {
        ...props,
        children: label,
      };
    }

    return null;
  }

  /**
   * {@link ContextMenuGroup} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  public getGroupProps(
    item?: ContextMenuRootItemObjectGroup,
  ): Omit<ContextMenuGroupProps, "children"> {
    const { group: props = {} } = this.slotProps;

    if (!item) {
      return props;
    }

    const { type: _1, items: _2, label: _3, ...otherProps } = item;

    return mergeProps([props, otherProps]);
  }

  /**
   * {@link ContextMenuItem} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  public getItemProps(item?: ContextMenuRootLabeledItemObject): ContextMenuItemProps {
    const { item: props = {} } = this.slotProps;

    if (!item) {
      return props;
    }

    const { type: _, label, ...otherProps } = item;

    return {
      ...mergeProps([props, otherProps]),
      children: label,
    };
  }

  /**
   * {@link ContextMenuLinkItem} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  public getLinkItemProps(item?: ContextMenuRootLinkItemObject): ContextMenuLinkItemProps {
    const { linkItem: props = {} } = this.slotProps;

    if (!item) {
      return props;
    }

    const { type: _, label, ...otherProps } = item;

    return {
      ...mergeProps([props, otherProps]),
      children: label,
    };
  }

  /**
   * {@link ContextMenuPortal} に渡す props を取得します。
   */
  public getPortalProps(): Omit<ContextMenuPortalProps, "children"> {
    const { portal: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link ContextMenuPositioner} に渡す props を取得します。
   */
  public getPositionerProps(): Omit<ContextMenuPositionerProps, "children"> {
    const { positioner: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link ContextMenuRadioGroup} に渡す props を取得します。
   *
   * @template TRadioItem 項目の型です。
   */
  public getRadioGroupProps<TRadioItem = TItem>(): Omit<
    ContextMenuRadioGroupProps<TRadioItem>,
    "children" | "value"
  >;
  public getRadioGroupProps(
    item: ContextMenuRootRadioItemObjectGroup,
  ): Omit<ContextMenuRadioGroupProps<ContextMenuRootRadioItemObject>, "children">;
  public getRadioGroupProps(
    item?: ContextMenuRootRadioItemObjectGroup,
  ): Omit<ContextMenuRadioGroupProps, "children"> {
    const { radioGroup: props = {} } = this.slotProps;

    if (!item) {
      return props;
    }

    const { type: _, ...otherProps } = item;

    return mergeProps([props, otherProps]);
  }

  /**
   * {@link ContextMenuRadioItemIndicator} に渡す props を取得します。
   */
  public getRadioItemIndicatorProps(): ContextMenuRadioItemIndicatorProps {
    const { radioItemIndicator: props = {} } = this.slotProps;

    return {
      ...props,
      children: this.radioIndicator,
    };
  }

  /**
   * {@link ContextMenuRadioItem} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  public getRadioItemProps(): Omit<ContextMenuRadioItemProps, "children" | "value">;
  public getRadioItemProps(item: ContextMenuRootRadioItemObject): ContextMenuRadioItemProps;
  public getRadioItemProps(
    item?: ContextMenuRootRadioItemObject,
  ): Omit<ContextMenuRadioItemProps, "children" | "value"> | ContextMenuRadioItemProps {
    const { radioItem: props = {} } = this.slotProps;

    if (!item) {
      return props;
    }

    const { type: _, label, value, ...otherProps } = item;

    return {
      ...mergeProps([props, otherProps]),
      value,
      children: label,
    };
  }

  /**
   * {@link ContextMenuRoot} に渡す props を取得します。
   */
  public getRootProps(): Omit<ContextMenuRootProps<TItem>, "children"> {
    return this.rootProps;
  }

  /**
   * {@link ContextMenuSeparator} に渡す props を取得します。
   */
  public getSeparatorProps(): ContextMenuSeparatorProps {
    const { separator: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link ContextMenuSubmenuRoot} に渡す props を取得します。
   *
   * @template TSubmenuItem 項目の型です。
   */
  public getSubmenuRootProps<TSubmenuItem = TItem>(): Omit<
    ContextMenuSubmenuRootProps<TSubmenuItem>,
    "children"
  >;
  public getSubmenuRootProps(
    item: ContextMenuRootSubmenuItemObject,
  ): Omit<ContextMenuSubmenuRootProps<ContextMenuRootItemObject>, "children">;
  public getSubmenuRootProps(
    item?: ContextMenuRootSubmenuItemObject,
  ): Omit<ContextMenuSubmenuRootProps, "children"> {
    const { submenuRoot: props = {} } = this.slotProps;

    if (!item) {
      return props;
    }

    const { type: _1, label: _2, ...otherProps } = item;

    return mergeProps([props, otherProps]);
  }

  /**
   * {@link ContextMenuSubmenuTrigger} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  public getSubmenuTriggerProps(
    item?: ContextMenuRootSubmenuItemObject,
  ): ContextMenuSubmenuTriggerProps {
    const { submenuTrigger: props = {} } = this.slotProps;

    if (!item) {
      return {
        ...props,
        // slotProps だけでは children が揃わないため、空の内容を補います。
        children: null,
      };
    }

    const { label } = item;

    return {
      ...props,
      children: label,
    };
  }

  /**
   * {@link ContextMenuTrigger} に渡す props を取得します。
   */
  public getTriggerProps(): ContextMenuTriggerProps | null {
    const { trigger: props = {} } = this.slotProps;

    if (this.trigger) {
      return {
        ...props,
        children: this.trigger,
      };
    }

    return null;
  }
}

/**
 * {@link ContextMenuAPI} を作成するフックです。
 */
export const useContextMenuAPI: IUseContextMenuAPI = function useSuiContextMenuAPI(props) {
  return new ContextMenuAPI(props);
};

export { ContextMenuAPI as API, useContextMenuAPI as useAPI };

// Component
// ---------

export interface IContextMenu extends IComponent<ContextMenuProps> {
  /**
   * @template TItem 項目の型です。
   */
  <TItem = any>(props: ContextMenuProps<TItem>): IComponent.Return;

  readonly useContext: IUseContextMenuContext;
}

/**
 * コンテキストメニューを表示するコンポーネントです。
 *
 * 右クリックまたは長押しの対象とポップアップを組み立てます。
 */
export const ContextMenu: IContextMenu = Object.assign(
  function SuiContextMenu(props: ContextMenuProps) {
    const api = useContextMenuAPI(props);
    const triggerProps = api.getTriggerProps();

    return (
      <ContextMenuRoot {...api.getRootProps()}>
        {triggerProps && <ContextMenuTrigger {...triggerProps} />}
        <ContextMenuPortal {...api.getPortalProps()}>
          <ContextMenuBackdrop {...api.getBackdropProps()} />
          <ContextMenuPositioner {...api.getPositionerProps()}>
            <ContextMenuPopup {...api.getPopupProps()} />
          </ContextMenuPositioner>
        </ContextMenuPortal>
      </ContextMenuRoot>
    );
  },
  {
    useContext: useContextMenuContext,
  },
);

export namespace ContextMenu {
  export type State<TItem = any> = ContextMenuState<TItem>;

  export type Props<TItem = any> = ContextMenuProps<TItem>;

  export type SlotProps = ContextMenuSlotProps;

  export type Context<TItem = any> = ContextMenuContext<TItem>;

  export type Actions = ContextMenuActions;

  export type ChangeEventDetails = ContextMenuChangeEventDetails;

  export type ChangeEventReason = ContextMenuChangeEventReason;

  export type CheckboxItemObject = ContextMenuRootCheckboxItemObject;

  export type GroupedItemObject = ContextMenuRootGroupedItemObject;

  export type IItemRenderer<TItem = any> = IContextMenuItemRenderer<TItem>;

  export type ItemObject = ContextMenuRootItemObject;

  export type ItemObjectGroup = ContextMenuRootItemObjectGroup;

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
