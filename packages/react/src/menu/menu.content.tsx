import { Menu } from "@base-ui/react/menu";
import * as React from "react";

import { CheckIcon, ChevronRightIcon } from "../_icons.jsx";
import isLikelyVisibleNode from "../_is-likely-visible-node.js";
import { getItemKey } from "../_item.js";
import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import {
  isLinkItemObject,
  isItemObjectGroup,
  isLabeledItemObject,
  isSubmenuItemObject,
  isCheckboxItemObject,
  isRadioItemObjectGroup,
} from "./_menu.utils.jsx";
import { MenuCheckboxItemIndicator } from "./menu.checkbox-item-indicator.jsx";
import { MenuCheckboxItem } from "./menu.checkbox-item.jsx";
import { type MenuContext, useMenuContext } from "./menu.context.js";
import { MenuGroupLabel } from "./menu.group-label.jsx";
import { MenuGroup } from "./menu.group.jsx";
import { MenuItem } from "./menu.item.jsx";
import { MenuLinkItem } from "./menu.link-item.jsx";
import { MenuPortal } from "./menu.portal.jsx";
import { MenuPositioner } from "./menu.positioner.jsx";
import { MenuRadioGroup } from "./menu.radio-group.jsx";
import type {
  MenuRootItemObject,
  // oxlint-disable-next-line no-unused-vars JSDoc で使用
  MenuRootProps,
} from "./menu.root.jsx";
import { MenuSeparator } from "./menu.separator.jsx";
import { MenuSubmenuRoot } from "./menu.submenu-root.jsx";
import { MenuSubmenuTrigger } from "./menu.submenu-trigger.jsx";

/**
 * ポップアップの各項目をレンダリングする関数のインターフェイスです。
 *
 * @template TItem 項目の型です。
 */
export interface IMenuContentItemRenderer<TItem = any> {
  /**
   * 項目をレンダリングします。
   *
   * @param item 現在の項目です。
   * @param index 項目のインデックスです。
   * @param items すべての項目です。
   * @returns レンダリングする内容です。
   */
  (item: TItem, index: number, items: readonly TItem[]): React.ReactNode;
}

/**
 * {@link MenuContent} が持つ状態です。
 */
export type MenuContentState = Override<MenuContext, Menu.Popup.State>;

export namespace MenuContentProps {
  export type Render = RenderProps<MenuContentState>;

  export type SuruUI<TItem = any> = {
    /**
     * ポップアップの内容、または各項目をレンダリングする関数です。
     *
     * 関数を指定した場合は {@link MenuRootProps.items|items} の各項目が引数として渡されます。
     */
    children?: React.ReactNode | IMenuContentItemRenderer<TItem>;
  };

  export type BaseUI = Pick<
    React.ComponentProps<typeof Menu.Popup>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MenuPopupProps:
      "id" | "finalFocus",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Menu.Popup>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuContent} に渡す props です。
 */
export type MenuContentProps<TItem = any> = MenuContentProps.Render &
  MenuContentProps.SuruUI<TItem> &
  MenuContentProps.BaseUI &
  MenuContentProps.HTML;

export interface IMenuContent extends IComponent<MenuContentProps> {
  /**
   * @template TItem 項目の型です。
   */
  <TItem = any>(props: MenuContentProps<TItem>): IComponent.Return;
}

/**
 * メニュー項目を表示するコンテンツ要素です。
 */
export const MenuContent: IMenuContent = function SuiMenuContent(props: MenuContentProps) {
  const ctx = useMenuContext();
  const { style, render, children = defaultItemRenderer, className, ...otherProps } = props;

  return (
    <Menu.Popup
      {...otherProps}
      {...proxyRenderProps<Menu.Popup.State, MenuContentState>((state) => ({ ...ctx, ...state }), {
        style,
        render,
        className: cn<MenuContentState>(
          className,
          "sui_menu_content",
          (state) =>
            state.transitionStatus !== undefined &&
            `sui_menu_content-transition_status_${state.transitionStatus}`,
          (state) => `sui_menu_content-size_${state.size}`,
          (state) => `sui_menu_content-radius_${state.radius}`,
          (state) => `sui_menu_content-variant_${state.variant}`,
          (state) => state.outlined && "sui_menu_content-outlined",
          (state) => state.open && "sui_menu_content-open",
          (state) => state.nested && "sui_menu_content-nested",
          (state) => state.instant && "sui_menu_content-instant",
          (state) => `sui_menu_content-side_${state.side.replaceAll("-", "_")}`,
          (state) => `sui_menu_content-align_${state.align}`,
        ),
      })}
    >
      {typeof children === "function" ? ctx.items.map(children) : children}
    </Menu.Popup>
  );
};

export { MenuContent as Content };

export namespace Content {
  export type State = MenuContentState;

  export type Props<TItem = any> = Props.Render & Props.SuruUI<TItem> & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MenuContentProps.Render;

    export type SuruUI<TItem = any> = MenuContentProps.SuruUI<TItem>;

    export type BaseUI = MenuContentProps.BaseUI;

    export type HTML = MenuContentProps.HTML;
  }

  export type IItemRenderer<TItem = any> = IMenuContentItemRenderer<TItem>;

  export type ItemObject = MenuRootItemObject;
}

const defaultItemRenderer: IMenuContentItemRenderer = (item, index, items) => {
  switch (true) {
    case isLabeledItemObject(item): {
      const { type: _, label, ...props } = item;

      return (
        <MenuItem {...props} key={getItemKey(item) ?? index}>
          {label}
        </MenuItem>
      );
    }

    case isLinkItemObject(item): {
      const { type: _, label, ...props } = item;

      return (
        <MenuLinkItem {...props} key={getItemKey(item) ?? index}>
          {label}
        </MenuLinkItem>
      );
    }

    case isCheckboxItemObject(item): {
      const { type: _, label, ...props } = item;

      return (
        <MenuCheckboxItem {...props} key={getItemKey(item) ?? index}>
          {label}
          <MenuCheckboxItemIndicator>
            <CheckIcon />
          </MenuCheckboxItemIndicator>
        </MenuCheckboxItem>
      );
    }

    case isRadioItemObjectGroup(item): {
      const { type: _, items: groupItems, ...props } = item;

      return <MenuRadioGroup {...props} key={getItemKey(item) ?? index} items={groupItems} />;
    }

    case isSubmenuItemObject(item): {
      const { type: _, items, label, ...props } = item;

      return (
        <MenuSubmenuRoot {...props} key={getItemKey(item) ?? index} items={items}>
          <MenuSubmenuTrigger>
            {label}
            <ChevronRightIcon />
          </MenuSubmenuTrigger>
          <MenuPortal>
            <MenuPositioner>
              <MenuContent>{defaultItemRenderer}</MenuContent>
            </MenuPositioner>
          </MenuPortal>
        </MenuSubmenuRoot>
      );
    }

    case isItemObjectGroup(item): {
      const { type: _, items: groupItems, label, ...props } = item;

      return (
        <React.Fragment key={getItemKey(item) ?? index}>
          <MenuGroup {...props}>
            {isLikelyVisibleNode(label) && <MenuGroupLabel>{label}</MenuGroupLabel>}
            {groupItems.map(defaultItemRenderer)}
          </MenuGroup>
          {index < items.length - 1 && <MenuSeparator />}
        </React.Fragment>
      );
    }

    default:
      return item;
  }
};
