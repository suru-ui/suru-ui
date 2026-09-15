import { Menu } from "@base-ui/react/menu";
import * as React from "react";

import { CheckIcon, ChevronRightIcon } from "../_icons.jsx";
import isLikelyVisibleNode from "../_is-likely-visible-node.js";
import toReactNode from "../_to-react-node.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { MenuCheckboxItemIndicator } from "./menu.checkbox-item-indicator.jsx";
import { MenuCheckboxItem } from "./menu.checkbox-item.jsx";
import { useMenuContext } from "./menu.context.js";
import { MenuGroupLabel } from "./menu.group-label.jsx";
import { MenuGroup } from "./menu.group.jsx";
import { MenuItem } from "./menu.item.jsx";
import { MenuLinkItem } from "./menu.link-item.jsx";
import { MenuPortal } from "./menu.portal.jsx";
import { MenuPositioner } from "./menu.positioner.jsx";
import { MenuRadioGroup } from "./menu.radio-group.jsx";
import { MenuRadioItemIndicator } from "./menu.radio-item-indicator.jsx";
import { MenuRadioItem } from "./menu.radio-item.jsx";
import type {
  MenuRootItem,
  MenuRootLinkItem,
  MenuRootItemGroup,
  MenuRootRadioItem,
  MenuRootLabeledItem,
  MenuRootSubmenuItem,
  MenuRootCheckboxItem,
  MenuRootRadioItemGroup,
} from "./menu.root.jsx";
import { MenuSeparator } from "./menu.separator.jsx";
import { MenuSubmenuRoot } from "./menu.submenu-root.jsx";
import { MenuSubmenuTrigger } from "./menu.submenu-trigger.jsx";

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
export type MenuPopupState = Menu.Popup.State;

export namespace MenuPopupProps {
  export type Render = RenderProps<MenuPopupState>;

  export type SuruUI = {
    /**
     * ポップアップの内容、または各項目をレンダリングする関数です。
     *
     * 関数を指定した場合は {@link MenuRootProps.items|items} の各項目が引数として渡されます。
     */
    children?: React.ReactNode | IMenuPopupItemRenderer;
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
 * {@link MenuPopup} に渡す props です。
 */
export type MenuPopupProps = MenuPopupProps.Render &
  MenuPopupProps.SuruUI &
  MenuPopupProps.BaseUI &
  MenuPopupProps.HTML;

/**
 * メニュー項目を表示するポップアップ要素です。
 */
export const MenuPopup: IComponent<MenuPopupProps> = function SuiMenuPopup(props) {
  const ctx = useMenuContext();
  const { children = defaultPopupItemRenderer, className, ...otherProps } = props;

  return (
    <Menu.Popup
      {...otherProps}
      className={cn(
        className,
        "sui_menu_popup",
        (state) =>
          state.transitionStatus !== undefined &&
          `sui_menu_popup-transition_status_${state.transitionStatus}`,
      )}
    >
      {typeof children === "function" ? ctx.items.map(children) : children}
    </Menu.Popup>
  );
};

const defaultPopupItemRenderer: IMenuPopupItemRenderer = (item, index, items) => {
  switch (true) {
    case isLabeledItem(item): {
      const { type: _, label, ...props } = item;
      return (
        <MenuItem {...props} key={index}>
          {label}
        </MenuItem>
      );
    }
    case isLinkItem(item): {
      const { type: _, label, ...props } = item;
      return (
        <MenuLinkItem {...props} key={index}>
          {label}
        </MenuLinkItem>
      );
    }
    case isCheckboxItem(item): {
      const { type: _, label, ...props } = item;
      return (
        <MenuCheckboxItem {...props} key={index}>
          {label}
          <MenuCheckboxItemIndicator>
            <CheckIcon />
          </MenuCheckboxItemIndicator>
        </MenuCheckboxItem>
      );
    }
    case isRadioItem(item): {
      const { type: _, label, ...props } = item;
      return (
        <MenuRadioItem {...props} key={index}>
          {label}
          <MenuRadioItemIndicator>
            <CheckIcon />
          </MenuRadioItemIndicator>
        </MenuRadioItem>
      );
    }
    case isRadioItemGroup(item): {
      const { type: _, items: groupItems, ...props } = item;
      return (
        <React.Fragment key={index}>
          <MenuRadioGroup {...props} key={index}>
            {groupItems.map(defaultPopupItemRenderer)}
          </MenuRadioGroup>
          {index < items.length - 1 && <MenuSeparator />}
        </React.Fragment>
      );
    }
    case isSubmenuItem(item): {
      const { type: _, items, label, ...props } = item;
      return (
        <MenuSubmenuRoot {...props} key={index}>
          <MenuSubmenuTrigger>
            {label}
            <ChevronRightIcon />
          </MenuSubmenuTrigger>
          <MenuPortal>
            <MenuPositioner>
              <MenuPopup>{items.map(defaultPopupItemRenderer)}</MenuPopup>
            </MenuPositioner>
          </MenuPortal>
        </MenuSubmenuRoot>
      );
    }
    case isItemGroup(item): {
      const { type: _, items, label, ...props } = item;
      return (
        <MenuGroup {...props} key={index}>
          {isLikelyVisibleNode(label) && <MenuGroupLabel>{label}</MenuGroupLabel>}
          {items.map(defaultPopupItemRenderer)}
        </MenuGroup>
      );
    }
    default:
      return toReactNode(item);
  }
};

export function isLabeledItem(item: unknown): item is MenuRootLabeledItem {
  return (
    typeof item === "object" &&
    item !== null &&
    "label" in item &&
    !("type" in item) &&
    !("items" in item)
  );
}

export function isLinkItem(item: unknown): item is MenuRootLinkItem {
  return typeof item === "object" && item !== null && "type" in item && item.type === "link";
}

export function isCheckboxItem(item: unknown): item is MenuRootCheckboxItem {
  return typeof item === "object" && item !== null && "type" in item && item.type === "checkbox";
}

export function isRadioItem(item: unknown): item is MenuRootRadioItem {
  return typeof item === "object" && item !== null && "type" in item && item.type === "radio";
}

export function isRadioItemGroup(item: unknown): item is MenuRootRadioItemGroup {
  return typeof item === "object" && item !== null && "type" in item && item.type === "radio-group";
}

export function isSubmenuItem(item: unknown): item is MenuRootSubmenuItem {
  return (
    typeof item === "object" &&
    item !== null &&
    "label" in item &&
    !("type" in item) &&
    "items" in item
  );
}

export function isItemGroup(item: unknown): item is MenuRootItemGroup {
  return typeof item === "object" && item !== null && "type" in item && item.type === "group";
}

export { MenuPopup as Popup };

export namespace Popup {
  export type State = MenuPopupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MenuPopupProps.Render;

    export type SuruUI = MenuPopupProps.SuruUI;

    export type BaseUI = MenuPopupProps.BaseUI;

    export type HTML = MenuPopupProps.HTML;
  }

  export type Item = MenuRootItem;

  export interface IItemRenderer<TItem = any> extends IMenuPopupItemRenderer<TItem> {}
}
