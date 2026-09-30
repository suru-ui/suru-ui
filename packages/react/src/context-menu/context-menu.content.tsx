import { ContextMenu } from "@base-ui/react/context-menu";
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
} from "./_context-menu.utils.jsx";
import { ContextMenuCheckboxItemIndicator } from "./context-menu.checkbox-item-indicator.jsx";
import { ContextMenuCheckboxItem } from "./context-menu.checkbox-item.jsx";
import { type ContextMenuContext, useContextMenuContext } from "./context-menu.context.js";
import { ContextMenuGroupLabel } from "./context-menu.group-label.jsx";
import { ContextMenuGroup } from "./context-menu.group.jsx";
import { ContextMenuItem } from "./context-menu.item.jsx";
import { ContextMenuLinkItem } from "./context-menu.link-item.jsx";
import { ContextMenuPortal } from "./context-menu.portal.jsx";
import { ContextMenuPositioner } from "./context-menu.positioner.jsx";
import { ContextMenuRadioGroup } from "./context-menu.radio-group.jsx";
import type {
  ContextMenuRootItemObject,
  // oxlint-disable-next-line no-unused-vars JSDoc で使用
  ContextMenuRootProps,
} from "./context-menu.root.jsx";
import { ContextMenuSeparator } from "./context-menu.separator.jsx";
import { ContextMenuSubmenuRoot } from "./context-menu.submenu-root.jsx";
import { ContextMenuSubmenuTrigger } from "./context-menu.submenu-trigger.jsx";

/**
 * ポップアップの各項目をレンダリングする関数のインターフェイスです。
 *
 * @template TItem 項目の型です。
 */
export interface IContextMenuContentItemRenderer<TItem = any> {
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
 * {@link ContextMenuContent} が持つ状態です。
 */
export type ContextMenuContentState = Override<ContextMenuContext, ContextMenu.Popup.State>;

export namespace ContextMenuContentProps {
  export type Render = RenderProps<ContextMenuContentState>;

  export type SuruUI<TItem = any> = {
    /**
     * ポップアップの内容、または各項目をレンダリングする関数です。
     *
     * 関数を指定した場合は {@link ContextMenuRootProps.items|items} の各項目が引数として渡されます。
     */
    children?: React.ReactNode | IContextMenuContentItemRenderer<TItem>;
  };

  export type BaseUI = Pick<
    React.ComponentProps<typeof ContextMenu.Popup>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MenuPopupProps:
      "id" | "finalFocus",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof ContextMenu.Popup>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ContextMenuContent} に渡す props です。
 */
export type ContextMenuContentProps<TItem = any> = ContextMenuContentProps.Render &
  ContextMenuContentProps.SuruUI<TItem> &
  ContextMenuContentProps.BaseUI &
  ContextMenuContentProps.HTML;

export interface IContextMenuContent extends IComponent<ContextMenuContentProps> {
  /**
   * @template TItem 項目の型です。
   */
  <TItem = any>(props: ContextMenuContentProps<TItem>): IComponent.Return;
}

/**
 * コンテキストメニュー項目を表示するコンテンツ要素です。
 */
export const ContextMenuContent: IContextMenuContent = function SuiContextMenuContent(
  props: ContextMenuContentProps,
) {
  const ctx = useContextMenuContext();
  const { style, render, children = defaultItemRenderer, className, ...otherProps } = props;

  return (
    <ContextMenu.Popup
      {...otherProps}
      {...proxyRenderProps<ContextMenu.Popup.State, ContextMenuContentState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<ContextMenuContentState>(
            className,
            "sui_context_menu_content",
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_context_menu_content-transition_status_${state.transitionStatus}`,
          ),
        },
      )}
    >
      {typeof children === "function" ? ctx.items.map(children) : children}
    </ContextMenu.Popup>
  );
};

export { ContextMenuContent as Content };

export namespace Content {
  export type State = ContextMenuContentState;

  export type Props<TItem = any> = Props.Render & Props.SuruUI<TItem> & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ContextMenuContentProps.Render;

    export type SuruUI<TItem = any> = ContextMenuContentProps.SuruUI<TItem>;

    export type BaseUI = ContextMenuContentProps.BaseUI;

    export type HTML = ContextMenuContentProps.HTML;
  }

  export type IItemRenderer<TItem = any> = IContextMenuContentItemRenderer<TItem>;

  export type ItemObject = ContextMenuRootItemObject;
}

const defaultItemRenderer: IContextMenuContentItemRenderer = (item, index, items) => {
  switch (true) {
    case isLabeledItemObject(item): {
      const { type: _, label, ...props } = item;

      return (
        <ContextMenuItem {...props} key={getItemKey(item) ?? index}>
          {label}
        </ContextMenuItem>
      );
    }

    case isLinkItemObject(item): {
      const { type: _, label, ...props } = item;

      return (
        <ContextMenuLinkItem {...props} key={getItemKey(item) ?? index}>
          {label}
        </ContextMenuLinkItem>
      );
    }

    case isCheckboxItemObject(item): {
      const { type: _, label, ...props } = item;

      return (
        <ContextMenuCheckboxItem {...props} key={getItemKey(item) ?? index}>
          {label}
          <ContextMenuCheckboxItemIndicator>
            <CheckIcon />
          </ContextMenuCheckboxItemIndicator>
        </ContextMenuCheckboxItem>
      );
    }

    case isRadioItemObjectGroup(item): {
      const { type: _, items: groupItems, ...props } = item;

      return (
        <ContextMenuRadioGroup {...props} key={getItemKey(item) ?? index} items={groupItems} />
      );
    }

    case isSubmenuItemObject(item): {
      const { type: _, items, label, ...props } = item;

      return (
        <ContextMenuSubmenuRoot {...props} key={getItemKey(item) ?? index} items={items}>
          <ContextMenuSubmenuTrigger>
            {label}
            <ChevronRightIcon />
          </ContextMenuSubmenuTrigger>
          <ContextMenuPortal>
            <ContextMenuPositioner>
              <ContextMenuContent>{defaultItemRenderer}</ContextMenuContent>
            </ContextMenuPositioner>
          </ContextMenuPortal>
        </ContextMenuSubmenuRoot>
      );
    }

    case isItemObjectGroup(item): {
      const { type: _, items: groupItems, label, ...props } = item;

      return (
        <React.Fragment key={getItemKey(item) ?? index}>
          <ContextMenuGroup {...props}>
            {isLikelyVisibleNode(label) && <ContextMenuGroupLabel>{label}</ContextMenuGroupLabel>}
            {groupItems.map(defaultItemRenderer)}
          </ContextMenuGroup>
          {index < items.length - 1 && <ContextMenuSeparator />}
        </React.Fragment>
      );
    }

    default:
      return item;
  }
};
