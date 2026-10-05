// TODO(tai-kun): いつか複合コンポーネントの方に組み込む

import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { type ComboboxContext, useComboboxContext } from "../root/combobox.root.context.js";

/**
 * {@link ComboboxSeparator} の状態です。
 */
export type ComboboxSeparatorState = Override<ComboboxContext, Combobox.Separator.State>;

export namespace ComboboxSeparatorProps {
  export type Render = RenderProps<ComboboxSeparatorState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Separator>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxSeparatorProps:
      "orientation",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Separator>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxSeparator} に渡す props です。
 */
export type ComboboxSeparatorProps = ComboboxSeparatorProps.Render &
  ComboboxSeparatorProps.SuruUI &
  ComboboxSeparatorProps.BaseUI &
  ComboboxSeparatorProps.HTML;

export type IComboboxSeparator = IComponent<ComboboxSeparatorProps>;

/**
 * 項目やグループを区切る要素です。
 */
export const ComboboxSeparator: IComboboxSeparator = function SuiComboboxSeparator(props) {
  const ctx = useComboboxContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Combobox.Separator
      {...otherProps}
      {...proxyRenderProps<Combobox.Separator.State, ComboboxSeparatorState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<ComboboxSeparatorState>(
            className,
            "sui_combobox_separator",
            (state) => `sui_combobox_separator-size_${state.size}`,
            (state) => `sui_combobox_separator-color_${state.color}`,
            (state) => `sui_combobox_separator-radius_${state.radius}`,
            (state) => `sui_combobox_separator-variant_${state.variant}`,
            (state) => state.outlined && "sui_combobox_separator-outlined",
            (state) => state.multiple && "sui_combobox_separator-multiple",
            (state) => `sui_combobox_separator-orientation_${state.orientation}`,
          ),
        },
      )}
    />
  );
};

export { ComboboxSeparator as Separator };

export namespace Separator {
  export type State = ComboboxSeparatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxSeparatorProps.Render;

    export type SuruUI = ComboboxSeparatorProps.SuruUI;

    export type BaseUI = ComboboxSeparatorProps.BaseUI;

    export type HTML = ComboboxSeparatorProps.HTML;
  }
}
