import { Menu } from "@base-ui/react/menu";
import * as React from "react";

import { CheckIcon, ChevronRightIcon } from "../_icons.jsx";
import isLikelyVisibleNode from "../_is-likely-visible-node.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import {
  isLinkItem,
  isItemGroup,
  isRadioItem,
  isLabeledItem,
  isSubmenuItem,
  isCheckboxItem,
  isRadioItemGroup,
} from "./_menu.utils.jsx";
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
export type MenuContentState = Menu.Popup.State;

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
      // MenuContentProps:
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

interface IMenuContent extends IComponent<MenuContentProps> {
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
  const { children = defaultContentItemRenderer, className, ...otherProps } = props;

  return (
    <Menu.Popup
      {...otherProps}
      className={cn(
        className,
        "sui_menu_content",
        (state) =>
          state.transitionStatus !== undefined &&
          `sui_menu_content-transition_status_${state.transitionStatus}`,
      )}
    >
      {typeof children === "function" ? ctx.items.map(children) : children}
    </Menu.Popup>
  );
};

export { MenuContent as Content };

export namespace Content {
  export type State = MenuContentState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MenuContentProps.Render;

    export type SuruUI<TItem = any> = MenuContentProps.SuruUI<TItem>;

    export type BaseUI = MenuContentProps.BaseUI;

    export type HTML = MenuContentProps.HTML;
  }

  export type Item = MenuRootItem;

  export interface IItemRenderer<TItem = any> extends IMenuContentItemRenderer<TItem> {}
}

const defaultContentItemRenderer: IMenuContentItemRenderer = (item, index, items) => {
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

    case isRadioItemGroup(item): {
      const { type: _, items: groupItems, ...props } = item;

      return <MenuRadioGroup {...props} key={index} items={groupItems} />;
    }

    case isSubmenuItem(item): {
      const { type: _, items, label, ...props } = item;

      return (
        <MenuSubmenuRoot {...props} key={index} items={items}>
          <MenuSubmenuTrigger>
            {label}
            <ChevronRightIcon />
          </MenuSubmenuTrigger>
          <MenuPortal>
            <MenuPositioner>
              <MenuContent>{defaultContentItemRenderer}</MenuContent>
            </MenuPositioner>
          </MenuPortal>
        </MenuSubmenuRoot>
      );
    }

    case isItemGroup(item): {
      const { type: _, items: groupItems, label, ...props } = item;

      return (
        <React.Fragment key={index}>
          <MenuGroup {...props} key={index}>
            {isLikelyVisibleNode(label) && <MenuGroupLabel>{label}</MenuGroupLabel>}
            {groupItems.map(defaultContentItemRenderer)}
          </MenuGroup>
          {index < items.length - 1 && <MenuSeparator />}
        </React.Fragment>
      );
    }

    default:
      return item;
  }
};
