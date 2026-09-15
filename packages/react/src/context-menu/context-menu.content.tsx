import { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import { CheckIcon, ChevronRightIcon } from "../_icons.jsx";
import toReactNode from "../_to-react-node.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import {
  isItemObject,
  isGroupObject,
  isLinkItemObject,
  isRadioItemObject,
  isSeparatorObject,
  isRadioGroupObject,
  isCheckboxItemObject,
} from "./_context-menu.jsx";
import { ContextMenuCheckboxItemIndicator } from "./context-menu.checkbox-item-indicator.jsx";
import { ContextMenuCheckboxItem } from "./context-menu.checkbox-item.jsx";
import { useContextMenuContext } from "./context-menu.context.js";
import { ContextMenuGroupLabel } from "./context-menu.group-label.jsx";
import { ContextMenuGroup } from "./context-menu.group.jsx";
import { ContextMenuItem } from "./context-menu.item.jsx";
import { ContextMenuLinkItem } from "./context-menu.link-item.jsx";
import { ContextMenuPortal } from "./context-menu.portal.jsx";
import { ContextMenuPositioner } from "./context-menu.positioner.jsx";
import { ContextMenuRadioGroup } from "./context-menu.radio-group.jsx";
import { ContextMenuRadioItemIndicator } from "./context-menu.radio-item-indicator.jsx";
import { ContextMenuRadioItem } from "./context-menu.radio-item.jsx";
import { type ContextMenuRootItemObject } from "./context-menu.root.jsx";
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
export type ContextMenuContentState = ContextMenu.Popup.State;

export namespace ContextMenuContentProps {
  export type Render = RenderProps<ContextMenuContentState>;

  export type SuruUI = {
    /**
     * ポップアップの内容、または各項目をレンダリングする関数です。
     *
     * 関数を指定した場合は {@link ContextMenuRootProps.items|items} の各項目が引数として渡されます。
     */
    children?: React.ReactNode | IContextMenuContentItemRenderer;
  };

  export type BaseUI = Pick<
    React.ComponentProps<typeof ContextMenu.Popup>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MenuPopupProps:
      "finalFocus",
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
export type ContextMenuContentProps = ContextMenuContentProps.Render &
  ContextMenuContentProps.SuruUI &
  ContextMenuContentProps.BaseUI &
  ContextMenuContentProps.HTML;

/**
 * コンテキストメニュー項目を表示するコンテンツ要素です。
 */
export const ContextMenuContent: IComponent<ContextMenuContentProps> =
  function SuiContextMenuContent(props) {
    const ctx = useContextMenuContext();
    const { children = defaultContentItemRenderer, className, ...otherProps } = props;

    return (
      <ContextMenu.Popup
        {...otherProps}
        className={cn(
          className,
          "sui_context_menu_content",
          (state) =>
            state.transitionStatus !== undefined &&
            `sui_context_menu_content-transition_status_${state.transitionStatus}`,
        )}
      >
        {typeof children === "function" ? ctx.items.map(children) : children}
      </ContextMenu.Popup>
    );
  };

const defaultRadioItemRenderer: IContextMenuContentItemRenderer = (item, index) => {
  if (!isRadioItemObject(item)) {
    return toReactNode(item);
  }

  const { type: _, label, ...otherItemProps } = item;

  return (
    <ContextMenuRadioItem key={index} {...otherItemProps}>
      {toReactNode(label)}
      <ContextMenuRadioItemIndicator>
        <CheckIcon />
      </ContextMenuRadioItemIndicator>
    </ContextMenuRadioItem>
  );
};

const defaultContentItemRenderer: IContextMenuContentItemRenderer = (item, index, items) => {
  if (isSeparatorObject(item)) {
    const { type: _, ...otherProps } = item;

    return <ContextMenuSeparator key={index} {...otherProps} />;
  }

  if (isRadioGroupObject(item)) {
    const { type: _, items: radioItems, ...otherGroupProps } = item;

    return (
      <ContextMenuRadioGroup key={index} {...otherGroupProps}>
        {radioItems.map(defaultRadioItemRenderer)}
      </ContextMenuRadioGroup>
    );
  }

  if (isGroupObject(item)) {
    const { type: _, items: groupItems, label, ...otherGroupProps } = item;
    const labelNode = toReactNode(label);

    return (
      <ContextMenuGroup key={index} {...otherGroupProps}>
        {labelNode === null ? null : <ContextMenuGroupLabel>{labelNode}</ContextMenuGroupLabel>}
        {groupItems.map(defaultContentItemRenderer)}
      </ContextMenuGroup>
    );
  }

  if (!isItemObject(item)) {
    return toReactNode(item);
  }

  if (isCheckboxItemObject(item)) {
    const { type: _, label, ...otherItemProps } = item;

    return (
      <ContextMenuCheckboxItem key={index} {...otherItemProps}>
        {toReactNode(label)}
        <ContextMenuCheckboxItemIndicator>
          <CheckIcon />
        </ContextMenuCheckboxItemIndicator>
      </ContextMenuCheckboxItem>
    );
  }

  if (isRadioItemObject(item)) {
    return defaultRadioItemRenderer(item, index, items);
  }

  if (isLinkItemObject(item)) {
    const { type: _, label, ...otherItemProps } = item;

    return (
      <ContextMenuLinkItem key={index} {...otherItemProps}>
        {toReactNode(label)}
      </ContextMenuLinkItem>
    );
  }

  const { type: _, items: subItems, label, ...otherItemProps } = item;
  if (!subItems) {
    return (
      <ContextMenuItem key={index} {...otherItemProps}>
        {toReactNode(label)}
      </ContextMenuItem>
    );
  }

  return (
    <ContextMenuSubmenuRoot key={index}>
      <ContextMenuSubmenuTrigger {...otherItemProps}>
        {toReactNode(label)}
        <ChevronRightIcon />
      </ContextMenuSubmenuTrigger>
      <ContextMenuPortal>
        <ContextMenuPositioner>
          <ContextMenuContent>{subItems.map(defaultContentItemRenderer)}</ContextMenuContent>
        </ContextMenuPositioner>
      </ContextMenuPortal>
    </ContextMenuSubmenuRoot>
  );
};

export { ContextMenuContent as Content };

export namespace Content {
  export type State = ContextMenuContentState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ContextMenuContentProps.Render;

    export type SuruUI = ContextMenuContentProps.SuruUI;

    export type BaseUI = ContextMenuContentProps.BaseUI;

    export type HTML = ContextMenuContentProps.HTML;
  }

  export type ItemObject = ContextMenuRootItemObject;

  export interface IItemRenderer<TItem = any> extends IContextMenuContentItemRenderer<TItem> {}
}
