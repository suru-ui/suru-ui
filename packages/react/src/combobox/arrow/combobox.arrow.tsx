import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { type ComboboxContext, useComboboxContext } from "../root/combobox.root.context.js";

/**
 * {@link ComboboxArrow} の状態です。
 */
export type ComboboxArrowState = Override<ComboboxContext, Combobox.Arrow.State>;

export namespace ComboboxArrowProps {
  export type Render = RenderProps<ComboboxArrowState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Arrow>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxArrowProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Arrow>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxArrow} に渡す props です。
 */
export type ComboboxArrowProps = ComboboxArrowProps.Render &
  ComboboxArrowProps.SuruUI &
  ComboboxArrowProps.BaseUI &
  ComboboxArrowProps.HTML;

export type IComboboxArrow = IComponent<ComboboxArrowProps>;

/**
 * ポップアップと入力欄をつなぐ矢印要素です。
 */
export const ComboboxArrow: IComboboxArrow = function SuiComboboxArrow(props) {
  const ctx = useComboboxContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Combobox.Arrow
      {...otherProps}
      {...proxyRenderProps<Combobox.Arrow.State, ComboboxArrowState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<ComboboxArrowState>(
            className,
            "sui_combobox_arrow",
            (state) => `sui_combobox_arrow-side_${state.side.replaceAll("-", "_")}`,
            (state) => `sui_combobox_arrow-size_${state.size}`,
            (state) => `sui_combobox_arrow-color_${state.color}`,
            (state) => `sui_combobox_arrow-radius_${state.radius}`,
            (state) => `sui_combobox_arrow-variant_${state.variant}`,
            (state) => state.outlined && "sui_combobox_arrow-outlined",
            (state) => state.multiple && "sui_combobox_arrow-multiple",
            (state) => state.open && "sui_combobox_arrow-open",
            (state) => state.uncentered && "sui_combobox_arrow-uncentered",
            (state) => `sui_combobox_arrow-align_${state.align}`,
          ),
        },
      )}
    />
  );
};

export { ComboboxArrow as Arrow };

export namespace Arrow {
  export type State = ComboboxArrowState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxArrowProps.Render;

    export type SuruUI = ComboboxArrowProps.SuruUI;

    export type BaseUI = ComboboxArrowProps.BaseUI;

    export type HTML = ComboboxArrowProps.HTML;
  }
}
