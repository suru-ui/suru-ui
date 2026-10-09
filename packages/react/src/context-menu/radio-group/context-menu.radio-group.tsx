import { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import { CheckIcon } from "../../_icons.jsx";
import { getItemKey } from "../../_item.js";
import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { isRadioItemObject } from "../_context-menu.utils.jsx";
import { ContextMenuRadioItemIndicator } from "../radio-item-indicator/context-menu.radio-item-indicator.jsx";
import { ContextMenuRadioItem } from "../radio-item/context-menu.radio-item.jsx";
import { useContextMenuContext } from "../root/context-menu.root.context.js";
import { ContextMenuRadioGroupContext } from "./context-menu.radio-group.context.js";

/**
 * {@link ContextMenuRadioGroup} の選択状態を変更されるイベントの詳細です。
 */
export type ContextMenuRadioGroupChangeEventDetails = ContextMenu.RadioGroup.ChangeEventDetails;

/**
 * {@link ContextMenuRadioGroup} の選択状態が変更される理由です。
 */
export type ContextMenuRadioGroupChangeEventReason = ContextMenu.RadioGroup.ChangeEventReason;

/**
 * ラジオ項目をレンダリングする関数のインターフェイスです。
 *
 * @template TItem 項目の型です。
 */
export interface IContextMenuRadioGroupItemRenderer<TItem = any> {
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
 * {@link ContextMenuRadioGroup} が持つ状態です。
 */
export type ContextMenuRadioGroupState<TItem = any> = ContextMenuRadioGroupContext<TItem>;

export namespace ContextMenuRadioGroupProps {
  export type Render<TItem = any> = RenderProps<ContextMenuRadioGroupState<TItem>>;

  export type SuruUI<TItem = any> = {
    /**
     * グループの内容、または各項目をレンダリングする関数です。
     *
     * 関数を指定した場合は {@link ContextMenuRadioGroupProps.items|items} の各項目が引数として渡されます。
     */
    children?: React.ReactNode | IContextMenuRadioGroupItemRenderer<TItem>;

    /**
     * ラジオ項目です。
     */
    items?: readonly TItem[] | undefined;
  };

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof ContextMenu.RadioGroup>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // MenuRadioGroupProps より:
      "value" | "defaultValue" | "onValueChange" | "disabled"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof ContextMenu.RadioGroup>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ContextMenuRadioGroup} に渡す props です。
 */
export type ContextMenuRadioGroupProps<TItem = any> = ContextMenuRadioGroupProps.Render<TItem> &
  ContextMenuRadioGroupProps.SuruUI<TItem> &
  ContextMenuRadioGroupProps.BaseUI &
  ContextMenuRadioGroupProps.HTML;

export interface IContextMenuRadioGroup extends IComponent<ContextMenuRadioGroupProps> {
  /**
   * @template TItem 項目の型です。
   */
  <TItem = any>(props: ContextMenuRadioGroupProps<TItem>): IComponent.Return;
}

/**
 * ラジオ項目をまとめるグループ要素です。
 */
export const ContextMenuRadioGroup: IContextMenuRadioGroup = function SuiContextMenuRadioGroup(
  props: ContextMenuRadioGroupProps,
) {
  const ctx = useContextMenuContext();
  const { items, style, render, children = defaultItemRenderer, className, ...otherProps } = props;

  return (
    <ContextMenu.RadioGroup
      {...otherProps}
      {...proxyRenderProps<ContextMenu.RadioGroup.State, ContextMenuRadioGroupState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <ContextMenuRadioGroupContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </ContextMenuRadioGroupContext>
          ),
          className: cn<ContextMenuRadioGroupState>(
            className,
            "sui_context_menu_radio_group",
            (state) => state.disabled && "sui_context_menu_radio_group-disabled",
            (state) => `sui_context_menu_radio_group-size_${state.size}`,
            (state) => `sui_context_menu_radio_group-radius_${state.radius}`,
            (state) => `sui_context_menu_radio_group-variant_${state.variant}`,
            (state) => state.outlined && "sui_context_menu_radio_group-outlined",
          ),
        },
      )}
    >
      {typeof children === "function" ? items?.map(children) : children}
    </ContextMenu.RadioGroup>
  );
};

export { ContextMenuRadioGroup as RadioGroup };

export namespace RadioGroup {
  export type State<TItem = any> = ContextMenuRadioGroupState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> &
    Props.SuruUI<TItem> &
    Props.BaseUI &
    Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = ContextMenuRadioGroupProps.Render<TItem>;

    export type SuruUI<TItem = any> = ContextMenuRadioGroupProps.SuruUI<TItem>;

    export type BaseUI = ContextMenuRadioGroupProps.BaseUI;

    export type HTML = ContextMenuRadioGroupProps.HTML;
  }

  export type ChangeEventDetails = ContextMenuRadioGroupChangeEventDetails;

  export type ChangeEventReason = ContextMenuRadioGroupChangeEventReason;

  export type IItemRenderer<TItem = any> = IContextMenuRadioGroupItemRenderer<TItem>;
}

const defaultItemRenderer: IContextMenuRadioGroupItemRenderer = (item, index) => {
  switch (true) {
    case isRadioItemObject(item): {
      const { type: _, label, ...props } = item;

      return (
        <ContextMenuRadioItem {...props} key={getItemKey(item) ?? index}>
          {label}
          <ContextMenuRadioItemIndicator>
            <CheckIcon />
          </ContextMenuRadioItemIndicator>
        </ContextMenuRadioItem>
      );
    }

    default:
      return item;
  }
};
