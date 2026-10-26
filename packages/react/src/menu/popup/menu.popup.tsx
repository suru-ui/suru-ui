import { Menu } from "@base-ui/react/menu";
import * as React from "react";

import { CheckIcon, ChevronRightIcon } from "../../_icons.jsx";
import isLikelyVisibleNode from "../../_is-likely-visible-node.js";
import { getItemKey } from "../../_item.js";
import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import {
  isLinkItemObject,
  isItemObjectGroup,
  isLabeledItemObject,
  isSubmenuItemObject,
  isCheckboxItemObject,
  isRadioItemObjectGroup,
} from "../_menu.utils.jsx";
import { MenuCheckboxItemIndicator } from "../checkbox-item-indicator/menu.checkbox-item-indicator.jsx";
import { MenuCheckboxItem } from "../checkbox-item/menu.checkbox-item.jsx";
import { MenuGroupLabel } from "../group-label/menu.group-label.jsx";
import { MenuGroup } from "../group/menu.group.jsx";
import { MenuItem } from "../item/menu.item.jsx";
import { MenuLinkItem } from "../link-item/menu.link-item.jsx";
import { MenuPortal } from "../portal/menu.portal.jsx";
import { usePositionerContext } from "../positioner/menu.positioner.context.js";
import { MenuPositioner } from "../positioner/menu.positioner.jsx";
import { MenuRadioGroup } from "../radio-group/menu.radio-group.jsx";
import type {
  MenuRootItemObject,
  // oxlint-disable-next-line no-unused-vars JSDoc で使用
  MenuRootProps,
} from "../root/menu.root.jsx";
import { MenuSeparator } from "../separator/menu.separator.jsx";
import { MenuSubmenuRoot } from "../submenu-root/menu.submenu-root.jsx";
import { MenuSubmenuTrigger } from "../submenu-trigger/menu.submenu-trigger.jsx";
import { MenuPopupContext } from "./menu.popup.context.js";

/**
 * ポップアップの各項目をレンダリングする関数のインターフェイスです。
 *
 * @template TItem 項目の型です。
 */
export interface IMenuPopupItemRenderer<TItem = any> {
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
 * {@link MenuPopup} が持つ状態です。
 */
export type MenuPopupState<TItem = any> = MenuPopupContext<TItem>;

export namespace MenuPopupProps {
  export type Render<TItem = any> = RenderProps<MenuPopupState<TItem>>;

  export type SuruUI<TItem = any> = {
    /**
     * ポップアップの内容、または各項目をレンダリングする関数です。
     *
     * 関数を指定した場合は {@link MenuRootProps.items|items} の各項目が引数として渡されます。
     */
    children?: React.ReactNode | IMenuPopupItemRenderer<TItem>;
  };

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Menu.Popup>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // MenuPopupProps より:
      "id" | "finalFocus"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Menu.Popup>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuPopup} に渡す props です。
 */
export type MenuPopupProps<TItem = any> = MenuPopupProps.Render<TItem> &
  MenuPopupProps.SuruUI<TItem> &
  MenuPopupProps.BaseUI &
  MenuPopupProps.HTML;

export interface IMenuPopup extends IComponent<MenuPopupProps> {
  /**
   * @template TItem 項目の型です。
   */
  <TItem = any>(props: MenuPopupProps<TItem>): IComponent.Return;
}

/**
 * メニュー項目を表示するコンテンツ要素です。
 */
export const MenuPopup: IMenuPopup = function SuiMenuPopup(props: MenuPopupProps) {
  const ctx = usePositionerContext();
  const { style, render, children = defaultItemRenderer, className, ...otherProps } = props;

  return (
    <Menu.Popup
      {...otherProps}
      {...proxyRenderProps<Menu.Popup.State, MenuPopupState>((state) => ({ ...ctx, ...state }), {
        style,
        render: (htmlProps, state) => (
          <MenuPopupContext value={state}>
            <RenderElement
              state={state}
              render={render}
              htmlProps={htmlProps}
              defaultTagName="div"
            />
          </MenuPopupContext>
        ),
        className: cn<MenuPopupState>(
          className,
          "sui_menu_popup",
          (state) =>
            state.transitionStatus !== undefined &&
            `sui_menu_popup-transition_status_${state.transitionStatus}`,
          (state) => `sui_menu_popup-size_${state.size}`,
          (state) => `sui_menu_popup-radius_${state.radius}`,
          (state) => `sui_menu_popup-variant_${state.variant}`,
          (state) => state.outlined && "sui_menu_popup-outlined",
          (state) => state.open && "sui_menu_popup-open",
          (state) => state.anchorHidden && "sui_menu_popup-anchor_hidden",
          (state) => state.nested && "sui_menu_popup-nested",
          (state) => state.instant && "sui_menu_popup-instant",
          (state) => `sui_menu_popup-side_${state.side.replaceAll("-", "_")}`,
          (state) => `sui_menu_popup-align_${state.align}`,
        ),
      })}
    >
      {typeof children === "function" ? ctx.items.map(children) : children}
    </Menu.Popup>
  );
};

export { MenuPopup as Popup };

export namespace Popup {
  export type State<TItem = any> = MenuPopupState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> &
    Props.SuruUI<TItem> &
    Props.BaseUI &
    Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = MenuPopupProps.Render<TItem>;

    export type SuruUI<TItem = any> = MenuPopupProps.SuruUI<TItem>;

    export type BaseUI = MenuPopupProps.BaseUI;

    export type HTML = MenuPopupProps.HTML;
  }

  export type IItemRenderer<TItem = any> = IMenuPopupItemRenderer<TItem>;

  export type ItemObject = MenuRootItemObject;
}

const defaultItemRenderer: IMenuPopupItemRenderer = (item, index, items) => {
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
              <MenuPopup>{defaultItemRenderer}</MenuPopup>
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
