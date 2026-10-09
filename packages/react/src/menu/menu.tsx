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
} from "./_menu.utils.jsx";
import {
  type MenuContext,
  type MenuRootSize,
  type MenuItemProps,
  type MenuRootProps,
  type MenuRootState,
  type MenuGroupProps,
  type MenuRootRadius,
  type IUseMenuContext,
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
  useMenuContext,
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

export type IMenuItemRenderer<TItem = any> = IMenuContentItemRenderer<TItem>;

export type MenuRadius = MenuRootRadius;

export type MenuSize = MenuRootSize;

export type MenuVariant = MenuRootVariant;

/**
 * {@link Menu} の各パーツに渡す props です。
 *
 * @template TItem 項目の型です。
 */
export type MenuSlotProps = {
  /**
   * {@link MenuBackdrop} に渡す props です。
   *
   * @template TItem 項目の型です。
   */
  readonly backdrop?: Omit<MenuBackdropProps, "children"> | undefined;

  /**
   * {@link MenuCheckboxItem} に渡す props です。
   *
   * @template TItem 項目の型です。
   */
  readonly checkboxItem?: Omit<MenuCheckboxItemProps, "children"> | undefined;

  /**
   * {@link MenuCheckboxItemIndicator} に渡す props です。
   *
   * @template TItem 項目の型です。
   */
  readonly checkboxItemIndicator?: Omit<MenuCheckboxItemIndicatorProps, "children"> | undefined;

  /**
   * {@link MenuGroup} に渡す props です。
   *
   * @template TItem 項目の型です。
   */
  readonly group?: Omit<MenuGroupProps, "children"> | undefined;

  /**
   * {@link MenuGroupLabel} に渡す props です。
   *
   * @template TItem 項目の型です。
   */
  readonly groupLabel?: Omit<MenuGroupLabelProps, "children"> | undefined;

  /**
   * {@link MenuItem} に渡す props です。
   *
   * @template TItem 項目の型です。
   */
  readonly item?: Omit<MenuItemProps, "children"> | undefined;

  /**
   * {@link MenuLinkItem} に渡す props です。
   *
   * @template TItem 項目の型です。
   */
  readonly linkItem?: Omit<MenuLinkItemProps, "children"> | undefined;

  /**
   * {@link MenuPortal} に渡す props です。
   *
   * @template TItem 項目の型です。
   */
  readonly portal?: Omit<MenuPortalProps, "children"> | undefined;

  /**
   * {@link MenuPositioner} に渡す props です。
   *
   * @template TItem 項目の型です。
   */
  readonly positioner?: Omit<MenuPositionerProps, "children"> | undefined;

  /**
   * {@link MenuRadioGroup} に渡す props です。
   *
   * @template TItem 項目の型です。
   */
  readonly radioGroup?: Omit<MenuRadioGroupProps, "children" | "items"> | undefined;

  /**
   * {@link MenuRadioItem} に渡す props です。
   *
   * @template TItem 項目の型です。
   */
  readonly radioItem?: Omit<MenuRadioItemProps, "children" | "value"> | undefined;

  /**
   * {@link MenuRadioItemIndicator} に渡す props です。
   *
   * @template TItem 項目の型です。
   */
  readonly radioItemIndicator?: Omit<MenuRadioItemIndicatorProps, "children"> | undefined;

  /**
   * {@link MenuSeparator} に渡す props です。
   *
   * @template TItem 項目の型です。
   */
  readonly separator?: MenuSeparatorProps | undefined;

  /**
   * {@link MenuSubmenuRoot} に渡す props です。
   *
   * @template TItem 項目の型です。
   */
  readonly submenuRoot?: Omit<MenuSubmenuRootProps, "children"> | undefined;

  /**
   * {@link MenuSubmenuTrigger} に渡す props です。
   *
   * @template TItem 項目の型です。
   */
  readonly submenuTrigger?: Omit<MenuSubmenuTriggerProps, "children"> | undefined;

  /**
   * {@link MenuTrigger} に渡す props です。
   *
   * @template TItem 項目の型です。
   */
  readonly trigger?: Omit<MenuTriggerProps, "children"> | undefined;
};

/**
 * {@link Menu} が持つ状態です。
 *
 * @template TItem 項目の型です。
 */
export type MenuState<TItem = any> = MenuRootState<TItem>;

namespace MenuProps {
  export type Content = Omit<MenuContentProps, keyof Menu | keyof Root>;

  export type Menu = {
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

  export type Root<TItem = any> = Omit<MenuRootProps<any, TItem>, "children" | keyof Menu>;
}

/**
 * {@link Menu} に渡す props です。
 *
 * @template TItem 項目の型です。
 */
export type MenuProps<TItem = any> = MenuProps.Menu & MenuProps.Root<TItem> & MenuProps.Content;

export interface IUseMenuAPI {
  /**
   * {@link MenuAPI} を作成します。
   *
   * @template TItem 項目の型です。
   * @param props {@link Menu} の props です。
   * @returns メニューの API です。
   */
  <TItem = any>(props: MenuProps<TItem>): MenuAPI<TItem>;
}

// API
// ---

/**
 * {@link Menu} を構成する各パーツの props を作成するための API です。
 *
 * @template TItem 項目の型です。
 */
export class MenuAPI<TItem = any> {
  private readonly checkboxIndicator: React.ReactNode;

  private readonly contentProps: MenuProps.Content;

  private readonly radioIndicator: React.ReactNode;

  private readonly rootProps: MenuProps.Root<TItem>;

  private readonly slotProps: MenuSlotProps;

  private readonly trigger: MenuTriggerProps["children"] | undefined;

  /**
   * @param props {@link Menu} の props です。
   * @internal
   */
  public constructor(props: MenuProps<TItem>) {
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
      slotProps = {},
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

    this.checkboxIndicator = checkboxIndicator;
    this.contentProps = contentProps;
    this.radioIndicator = radioIndicator;
    this.rootProps = {
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
    this.slotProps = slotProps;
    this.trigger = trigger;
  }

  private readonly defaultContentItemRenderer: IMenuContentItemRenderer = (item, index, items) => {
    switch (true) {
      case isLabeledItemObject(item):
        return <MenuItem {...this.getItemProps(item)} key={getItemKey(item) ?? index} />;

      case isLinkItemObject(item):
        return <MenuLinkItem {...this.getLinkItemProps(item)} key={getItemKey(item) ?? index} />;

      case isCheckboxItemObject(item): {
        const { children: label, ...otherProps } = this.getCheckboxItemProps(item);

        return (
          <MenuCheckboxItem {...otherProps} key={getItemKey(item) ?? index}>
            {label}
            <MenuCheckboxItemIndicator {...this.getCheckboxItemIndicatorProps()} />
          </MenuCheckboxItem>
        );
      }

      case isRadioItemObjectGroup(item):
        return (
          <MenuRadioGroup {...this.getRadioGroupProps(item)} key={getItemKey(item) ?? index}>
            {this.defaultRadioItemRenderer}
          </MenuRadioGroup>
        );

      case isSubmenuItemObject(item): {
        const { children: content = this.defaultContentItemRenderer, ...otherContentProps } =
          this.getContentProps();
        const { children: submenuTrigger, ...otherSubmenuTriggerProps } =
          this.getSubmenuTriggerProps(item);

        return (
          <MenuSubmenuRoot {...this.getSubmenuRootProps(item)} key={getItemKey(item) ?? index}>
            <MenuSubmenuTrigger {...otherSubmenuTriggerProps}>
              {submenuTrigger}
              <ChevronRightIcon />
            </MenuSubmenuTrigger>
            <MenuPortal {...this.getPortalProps()}>
              <MenuPositioner {...this.getPositionerProps()}>
                <MenuContent {...otherContentProps}>{content}</MenuContent>
              </MenuPositioner>
            </MenuPortal>
          </MenuSubmenuRoot>
        );
      }

      case isItemObjectGroup(item): {
        const labelProps = this.getGroupLabelProps(item);

        return (
          <React.Fragment key={getItemKey(item) ?? index}>
            <MenuGroup {...this.getGroupProps(item)}>
              {labelProps && <MenuGroupLabel {...labelProps} />}
              {item.items.map(this.defaultContentItemRenderer)}
            </MenuGroup>
            {index < items.length - 1 && <MenuSeparator {...this.getSeparatorProps()} />}
          </React.Fragment>
        );
      }

      default:
        return item;
    }
  };

  private readonly defaultRadioItemRenderer: IMenuContentItemRenderer = (item, index) => {
    switch (true) {
      case isRadioItemObject(item): {
        const { children: label, ...otherProps } = this.getRadioItemProps(item);

        return (
          <MenuRadioItem {...otherProps} key={getItemKey(item) ?? index}>
            {label}
            <MenuRadioItemIndicator {...this.getRadioItemIndicatorProps()} />
          </MenuRadioItem>
        );
      }

      default:
        return item;
    }
  };

  /**
   * {@link MenuBackdrop} に渡す props を取得します。
   */
  public getBackdropProps(): Omit<MenuBackdropProps, "children"> {
    const { backdrop: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link MenuCheckboxItemIndicator} に渡す props を取得します。
   */
  public getCheckboxItemIndicatorProps(): MenuCheckboxItemIndicatorProps {
    const { checkboxItemIndicator: props = {} } = this.slotProps;

    return {
      ...props,
      children: this.checkboxIndicator,
    };
  }

  /**
   * {@link MenuCheckboxItem} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  public getCheckboxItemProps(item?: MenuRootCheckboxItemObject): MenuCheckboxItemProps {
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
   * {@link MenuContent} に渡す props を取得します。
   *
   * @template TContentItem 項目の型です。
   */
  public getContentProps<TContentItem = TItem>(): Override<
    MenuContentProps<TContentItem>,
    {
      children: LikelyVisibleNode | IMenuContentItemRenderer | undefined;
    }
  > {
    const { children = this.defaultContentItemRenderer, ...otherProps } = this.contentProps;

    return {
      ...otherProps,
      children: typeof children === "function" ? children : toReactNode(children),
    };
  }

  /**
   * {@link MenuGroupLabel} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  public getGroupLabelProps(item?: MenuRootItemObjectGroup): MenuGroupLabelProps | null {
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
   * {@link MenuGroup} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  public getGroupProps(item?: MenuRootItemObjectGroup): Omit<MenuGroupProps, "children"> {
    const { group: props = {} } = this.slotProps;

    if (!item) {
      return props;
    }

    const { type: _1, items: _2, label: _3, ...otherProps } = item;

    return mergeProps([props, otherProps]);
  }

  /**
   * {@link MenuItem} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  public getItemProps(item?: MenuRootLabeledItemObject): MenuItemProps {
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
   * {@link MenuLinkItem} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  public getLinkItemProps(item?: MenuRootLinkItemObject): MenuLinkItemProps {
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
   * {@link MenuPortal} に渡す props を取得します。
   */
  public getPortalProps(): Omit<MenuPortalProps, "children"> {
    const { portal: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link MenuPositioner} に渡す props を取得します。
   */
  public getPositionerProps(): Omit<MenuPositionerProps, "children"> {
    const { positioner: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link MenuRadioGroup} に渡す props を取得します。
   *
   * @template TRadioItem 項目の型です。
   */
  public getRadioGroupProps<TRadioItem = TItem>(): Omit<
    MenuRadioGroupProps<TRadioItem>,
    "children" | "value"
  >;
  public getRadioGroupProps(
    item: MenuRootRadioItemObjectGroup,
  ): Omit<MenuRadioGroupProps<MenuRootRadioItemObject>, "children">;
  public getRadioGroupProps(
    item?: MenuRootRadioItemObjectGroup,
  ): Omit<MenuRadioGroupProps, "children"> {
    const { radioGroup: props = {} } = this.slotProps;

    if (!item) {
      return props;
    }

    const { type: _, ...otherProps } = item;

    return mergeProps([props, otherProps]);
  }

  /**
   * {@link MenuRadioItemIndicator} に渡す props を取得します。
   */
  public getRadioItemIndicatorProps(): MenuRadioItemIndicatorProps {
    const { radioItemIndicator: props = {} } = this.slotProps;

    return {
      ...props,
      children: this.radioIndicator,
    };
  }

  /**
   * {@link MenuRadioItem} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  public getRadioItemProps(): Omit<MenuRadioItemProps, "children" | "value">;
  public getRadioItemProps(item: MenuRootRadioItemObject): MenuRadioItemProps;
  public getRadioItemProps(
    item?: MenuRootRadioItemObject,
  ): Omit<MenuRadioItemProps, "children" | "value"> | MenuRadioItemProps {
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
   * {@link MenuRoot} に渡す props を取得します。
   */
  public getRootProps(): Omit<MenuRootProps<TItem>, "children"> {
    return this.rootProps;
  }

  /**
   * {@link MenuSeparator} に渡す props を取得します。
   */
  public getSeparatorProps(): MenuSeparatorProps {
    const { separator: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link MenuSubmenuRoot} に渡す props を取得します。
   *
   * @template TSubmenuItem 項目の型です。
   */
  public getSubmenuRootProps<TSubmenuItem = TItem>(): Omit<
    MenuSubmenuRootProps<TSubmenuItem>,
    "children"
  >;
  public getSubmenuRootProps(
    item: MenuRootSubmenuItemObject,
  ): Omit<MenuSubmenuRootProps<MenuRootItemObject>, "children">;
  public getSubmenuRootProps(
    item?: MenuRootSubmenuItemObject,
  ): Omit<MenuSubmenuRootProps, "children"> {
    const { submenuRoot: props = {} } = this.slotProps;

    if (!item) {
      return props;
    }

    const { type: _1, label: _2, ...otherProps } = item;

    return mergeProps([props, otherProps]);
  }

  /**
   * {@link MenuSubmenuTrigger} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  public getSubmenuTriggerProps(item?: MenuRootSubmenuItemObject): MenuSubmenuTriggerProps {
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
   * {@link MenuTrigger} に渡す props を取得します。
   *
   * @template TPayload 開いたときに渡される値の型です。
   */
  public getTriggerProps<TPayload = any>(): MenuTriggerProps<TPayload> | null {
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
 * {@link MenuAPI} を作成するフックです。
 */
export const useMenuAPI: IUseMenuAPI = function useSuiMenuAPI(props) {
  return new MenuAPI(props);
};

export { type MenuAPI as API, useMenuAPI as useAPI };

// Component
// ---------

export interface IMenu extends IComponent<MenuProps> {
  /**
   * @template TItem 項目の型です。
   */
  <TItem = any>(props: MenuProps<TItem>): IComponent.Return;

  readonly useContext: IUseMenuContext;
}

/**
 * メニューを表示するコンポーネントです。
 */
export const Menu: IMenu = /*#__PURE__*/ Object.assign(
  function SuiMenu(props: MenuProps) {
    const api = useMenuAPI(props);
    const triggerProps = api.getTriggerProps();

    return (
      <MenuRoot {...api.getRootProps()}>
        {triggerProps && <MenuTrigger {...triggerProps} />}
        <MenuPortal {...api.getPortalProps()}>
          <MenuBackdrop {...api.getBackdropProps()} />
          <MenuPositioner {...api.getPositionerProps()}>
            <MenuContent {...api.getContentProps()} />
          </MenuPositioner>
        </MenuPortal>
      </MenuRoot>
    );
  },
  {
    useContext: useMenuContext,
  },
);

export namespace Menu {
  export type State<TItem = any> = MenuState<TItem>;

  export type Props<TItem = any> = MenuProps<TItem>;

  export type SlotProps = MenuSlotProps;

  export type Context<TItem = any> = MenuContext<TItem>;

  export type Actions = MenuActions;

  export type ChangeEventDetails = MenuChangeEventDetails;

  export type ChangeEventReason = MenuChangeEventReason;

  export type CheckboxItemObject = MenuRootCheckboxItemObject;

  export type GroupedItemObject = MenuRootGroupedItemObject;

  export type IItemRenderer<TItem = any> = IMenuItemRenderer<TItem>;

  export type ItemObject = MenuRootItemObject;

  export type ItemObjectGroup = MenuRootItemObjectGroup;

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
