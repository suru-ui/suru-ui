import { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type SelectContext, useSelectContext } from "./select.context.js";

/**
 * {@link SelectSeparator} が持つ状態です。
 */
export type SelectSeparatorState = Override<SelectContext, BaseSelect.Separator.State>;

export namespace SelectSeparatorProps {
  export type Render = RenderProps<SelectSeparatorState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof BaseSelect.Separator>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // SelectSeparatorProps:
      "orientation",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseSelect.Separator>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SelectSeparator} に渡す props です。
 */
export type SelectSeparatorProps = SelectSeparatorProps.Render &
  SelectSeparatorProps.SuruUI &
  SelectSeparatorProps.BaseUI &
  SelectSeparatorProps.HTML;

export type ISelectSeparator = IComponent<SelectSeparatorProps>;

/**
 * 項目やグループを区切る要素です。
 */
export const SelectSeparator: ISelectSeparator = function SuiSelectSeparator(props) {
  const ctx = useSelectContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <BaseSelect.Separator
      {...otherProps}
      {...proxyRenderProps<BaseSelect.Separator.State, SelectSeparatorState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<SelectSeparatorState>(
            className,
            "sui_select_separator",
            (state) => `sui_select_separator-size_${state.size}`,
            (state) => `sui_select_separator-radius_${state.radius}`,
            (state) => `sui_select_separator-variant_${state.variant}`,
            (state) => state.outlined && "sui_select_separator-outlined",
            (state) => `sui_select_separator-orientation_${state.orientation}`,
          ),
        },
      )}
    />
  );
};

export { SelectSeparator as Separator };

export namespace Separator {
  export type State = SelectSeparatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectSeparatorProps.Render;

    export type SuruUI = SelectSeparatorProps.SuruUI;

    export type BaseUI = SelectSeparatorProps.BaseUI;

    export type HTML = SelectSeparatorProps.HTML;
  }
}
