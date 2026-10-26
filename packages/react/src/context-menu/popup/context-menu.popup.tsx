import { ContextMenu } from "@base-ui/react/context-menu";
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
} from "../_context-menu.utils.jsx";
import { ContextMenuCheckboxItemIndicator } from "../checkbox-item-indicator/context-menu.checkbox-item-indicator.jsx";
import { ContextMenuCheckboxItem } from "../checkbox-item/context-menu.checkbox-item.jsx";
import { ContextMenuGroupLabel } from "../group-label/context-menu.group-label.jsx";
import { ContextMenuGroup } from "../group/context-menu.group.jsx";
import { ContextMenuItem } from "../item/context-menu.item.jsx";
import { ContextMenuLinkItem } from "../link-item/context-menu.link-item.jsx";
import { ContextMenuPortal } from "../portal/context-menu.portal.jsx";
import { usePositionerContext } from "../positioner/context-menu.positioner.context.js";
import { ContextMenuPositioner } from "../positioner/context-menu.positioner.jsx";
import { ContextMenuRadioGroup } from "../radio-group/context-menu.radio-group.jsx";
import type {
  ContextMenuRootItemObject,
  // oxlint-disable-next-line no-unused-vars JSDoc で使用
  ContextMenuRootProps,
} from "../root/context-menu.root.jsx";
import { ContextMenuSeparator } from "../separator/context-menu.separator.jsx";
import { ContextMenuSubmenuRoot } from "../submenu-root/context-menu.submenu-root.jsx";
import { ContextMenuSubmenuTrigger } from "../submenu-trigger/context-menu.submenu-trigger.jsx";
import { ContextMenuPopupContext } from "./context-menu.popup.context.js";

/**
 * ポップアップの各項目をレンダリングする関数のインターフェイスです。
 *
 * @template TItem 項目の型です。
 */
export interface IContextMenuPopupItemRenderer<TItem = any> {
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
 * {@link ContextMenuPopup} が持つ状態です。
 */
export type ContextMenuPopupState<TItem = any> = ContextMenuPopupContext<TItem>;

export namespace ContextMenuPopupProps {
  export type Render<TItem = any> = RenderProps<ContextMenuPopupState<TItem>>;

  export type SuruUI<TItem = any> = {
    /**
     * ポップアップの内容、または各項目をレンダリングする関数です。
     *
     * 関数を指定した場合は {@link ContextMenuRootProps.items|items} の各項目が引数として渡されます。
     */
    children?: React.ReactNode | IContextMenuPopupItemRenderer<TItem>;
  };

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof ContextMenu.Popup>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // MenuPopupProps より:
      "id" | "finalFocus"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof ContextMenu.Popup>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ContextMenuPopup} に渡す props です。
 */
export type ContextMenuPopupProps<TItem = any> = ContextMenuPopupProps.Render<TItem> &
  ContextMenuPopupProps.SuruUI<TItem> &
  ContextMenuPopupProps.BaseUI &
  ContextMenuPopupProps.HTML;

export interface IContextMenuPopup extends IComponent<ContextMenuPopupProps> {
  /**
   * @template TItem 項目の型です。
   */
  <TItem = any>(props: ContextMenuPopupProps<TItem>): IComponent.Return;
}

/**
 * コンテキストメニュー項目を表示するコンテンツ要素です。
 */
export const ContextMenuPopup: IContextMenuPopup = function SuiContextMenuPopup(
  props: ContextMenuPopupProps,
) {
  const ctx = usePositionerContext();
  const { style, render, children = defaultItemRenderer, className, ...otherProps } = props;

  return (
    <ContextMenu.Popup
      {...otherProps}
      {...proxyRenderProps<ContextMenu.Popup.State, ContextMenuPopupState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <ContextMenuPopupContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </ContextMenuPopupContext>
          ),
          className: cn<ContextMenuPopupState>(
            className,
            "sui_context_menu_popup",
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_context_menu_popup-transition_status_${state.transitionStatus}`,
            (state) => `sui_context_menu_popup-size_${state.size}`,
            (state) => `sui_context_menu_popup-radius_${state.radius}`,
            (state) => `sui_context_menu_popup-variant_${state.variant}`,
            (state) => state.outlined && "sui_context_menu_popup-outlined",
            (state) => state.open && "sui_context_menu_popup-open",
            (state) => state.anchorHidden && "sui_context_menu_popup-anchor_hidden",
            (state) => state.nested && "sui_context_menu_popup-nested",
            (state) => state.instant && "sui_context_menu_popup-instant",
            (state) => `sui_context_menu_popup-side_${state.side.replaceAll("-", "_")}`,
            (state) => `sui_context_menu_popup-align_${state.align}`,
          ),
        },
      )}
    >
      {typeof children === "function" ? ctx.items.map(children) : children}
    </ContextMenu.Popup>
  );
};

export { ContextMenuPopup as Popup };

export namespace Popup {
  export type State<TItem = any> = ContextMenuPopupState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> &
    Props.SuruUI<TItem> &
    Props.BaseUI &
    Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = ContextMenuPopupProps.Render<TItem>;

    export type SuruUI<TItem = any> = ContextMenuPopupProps.SuruUI<TItem>;

    export type BaseUI = ContextMenuPopupProps.BaseUI;

    export type HTML = ContextMenuPopupProps.HTML;
  }

  export type IItemRenderer<TItem = any> = IContextMenuPopupItemRenderer<TItem>;

  export type ItemObject = ContextMenuRootItemObject;
}

const defaultItemRenderer: IContextMenuPopupItemRenderer = (item, index, items) => {
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
              <ContextMenuPopup>{defaultItemRenderer}</ContextMenuPopup>
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
