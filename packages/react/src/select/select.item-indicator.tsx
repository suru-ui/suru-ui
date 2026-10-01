import { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type SelectContext, useSelectContext } from "./select.context.js";

/**
 * {@link SelectItemIndicator} が持つ状態です。
 */
export type SelectItemIndicatorState = Override<SelectContext, BaseSelect.ItemIndicator.State>;

export namespace SelectItemIndicatorProps {
  export type Render = RenderProps<SelectItemIndicatorState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof BaseSelect.ItemIndicator>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // SelectItemIndicatorProps:
      "children" | "keepMounted",
      keyof Render | keyof SuruUI
    >
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

/**
 * 選択された項目を示す要素です。
 */
export const SelectItemIndicator: ISelectItemIndicator = function SuiSelectItemIndicator(props) {
  const ctx = useSelectContext();
  const { style, render, className, keepMounted = true, ...otherProps } = props;

  return (
    <BaseSelect.ItemIndicator
      {...otherProps}
      {...proxyRenderProps<BaseSelect.ItemIndicator.State, SelectItemIndicatorState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<SelectItemIndicatorState>(
            className,
            "sui_select_item_indicator",
            (state) => `sui_select_item_indicator-size_${state.size}`,
            (state) => `sui_select_item_indicator-radius_${state.radius}`,
            (state) => `sui_select_item_indicator-variant_${state.variant}`,
            (state) => state.outlined && "sui_select_item_indicator-outlined",
          ),
        },
      )}
      keepMounted={keepMounted}
    />
  );
};

export { SelectItemIndicator as ItemIndicator };

export namespace ItemIndicator {
  export type State = SelectItemIndicatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectItemIndicatorProps.Render;

    export type SuruUI = SelectItemIndicatorProps.SuruUI;

    export type BaseUI = SelectItemIndicatorProps.BaseUI;

    export type HTML = SelectItemIndicatorProps.HTML;
  }
}
