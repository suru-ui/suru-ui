import { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useSelectItemContext } from "../item/select.item.context.js";
import { SelectItemIndicatorContext } from "./select.item-indicator.context.js";

/**
 * {@link SelectItemIndicator} が持つ状態です。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectItemIndicatorState<TValue = any> = SelectItemIndicatorContext<TValue>;

export namespace SelectItemIndicatorProps {
  export type Render<TValue = any> = RenderProps<SelectItemIndicatorState<TValue>>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof BaseSelect.ItemIndicator>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // SelectItemIndicatorProps より :
      "children" | "keepMounted"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseSelect.ItemIndicator>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SelectItemIndicator} に渡す props です。
 */
export type SelectItemIndicatorProps = SelectItemIndicatorProps.Render &
  SelectItemIndicatorProps.SuruUI &
  SelectItemIndicatorProps.BaseUI &
  SelectItemIndicatorProps.HTML;

export type ISelectItemIndicator = IComponent<SelectItemIndicatorProps>;

/** 選択された項目を示す要素です。 */
export const SelectItemIndicator: ISelectItemIndicator = (props) => {
  const ctx = useSelectItemContext();
  const { style, render, className, keepMounted = true, ...otherProps } = props;

  return (
    <BaseSelect.ItemIndicator
      {...otherProps}
      {...proxyRenderProps<BaseSelect.ItemIndicator.State, SelectItemIndicatorState>(
        (state) => ({
          ...ctx,
          ...state,
        }),
        {
          style,
          render: (htmlProps, state) => (
            <SelectItemIndicatorContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="span"
              />
            </SelectItemIndicatorContext>
          ),
          className: cn<SelectItemIndicatorState>(
            className,
            "sui_select_item_indicator",
            (state) => `sui_select_item_indicator-size_${state.size}`,
            (state) => `sui_select_item_indicator-radius_${state.radius}`,
            (state) => `sui_select_item_indicator-variant_${state.variant}`,
            (state) => state.outlined && "sui_select_item_indicator-outlined",
            (state) => state.disabled && "sui_select_item_indicator-disabled",
            (state) => state.highlighted && "sui_select_item_indicator-highlighted",
            (state) => state.open && "sui_select_item_indicator-open",
            (state) => state.anchorHidden && "sui_select_item_indicator-anchor_hidden",
            (state) => `sui_select_item_indicator-side_${state.side.replaceAll("-", "_")}`,
            (state) => `sui_select_item_indicator-align_${state.align}`,
            (state) => state.selected && "sui_select_item_indicator-selected",
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_select_item_indicator-transition_status_${state.transitionStatus}`,
          ),
        },
      )}
      keepMounted={keepMounted}
    />
  );
};

export { SelectItemIndicator as ItemIndicator };
export namespace ItemIndicator {
  export type State<TValue = any> = SelectItemIndicatorState<TValue>;

  export type Props<TValue = any> = Props.Render<TValue> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TValue = any> = SelectItemIndicatorProps.Render<TValue>;

    export type SuruUI = SelectItemIndicatorProps.SuruUI;

    export type BaseUI = SelectItemIndicatorProps.BaseUI;

    export type HTML = SelectItemIndicatorProps.HTML;
  }
}
