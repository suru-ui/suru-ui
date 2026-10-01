import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type ComboboxContext, useComboboxContext } from "./combobox.context.js";

/**
 * {@link ComboboxGroupLabel} の状態です。
 */
export type ComboboxGroupLabelState = Override<ComboboxContext, Combobox.GroupLabel.State>;

export namespace ComboboxGroupLabelProps {
  export type Render = RenderProps<ComboboxGroupLabelState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.GroupLabel>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxGroupLabelProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.GroupLabel>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxGroupLabel} に渡す props です。
 */
export type ComboboxGroupLabelProps = ComboboxGroupLabelProps.Render &
  ComboboxGroupLabelProps.SuruUI &
  ComboboxGroupLabelProps.BaseUI &
  ComboboxGroupLabelProps.HTML;

export type IComboboxGroupLabel = IComponent<ComboboxGroupLabelProps>;

/**
 * 候補グループの見出し要素です。
 */
export const ComboboxGroupLabel: IComboboxGroupLabel = function SuiComboboxGroupLabel(props) {
  const ctx = useComboboxContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Combobox.GroupLabel
      {...otherProps}
      {...proxyRenderProps<Combobox.GroupLabel.State, ComboboxGroupLabelState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<ComboboxGroupLabelState>(
            className,
            "sui_combobox_group_label",
            (state) => `sui_combobox_group_label-size_${state.size}`,
            (state) => `sui_combobox_group_label-color_${state.color}`,
            (state) => `sui_combobox_group_label-radius_${state.radius}`,
            (state) => `sui_combobox_group_label-variant_${state.variant}`,
            (state) => state.outlined && "sui_combobox_group_label-outlined",
            (state) => state.multiple && "sui_combobox_group_label-multiple",
          ),
        },
      )}
    />
  );
};

export { ComboboxGroupLabel as GroupLabel };

export namespace GroupLabel {
  export type State = ComboboxGroupLabelState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxGroupLabelProps.Render;

    export type SuruUI = ComboboxGroupLabelProps.SuruUI;

    export type BaseUI = ComboboxGroupLabelProps.BaseUI;

    export type HTML = ComboboxGroupLabelProps.HTML;
  }
}
