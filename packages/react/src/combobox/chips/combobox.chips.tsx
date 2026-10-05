import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { type ComboboxContext, useComboboxContext } from "../root/combobox.root.context.js";

/**
 * {@link ComboboxChips} の状態です。
 */
export type ComboboxChipsState = Override<ComboboxContext, Combobox.Chips.State>;

export namespace ComboboxChipsProps {
  export type Render = RenderProps<ComboboxChipsState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Chips>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxChipsProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Chips>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxChips} に渡す props です。
 */
export type ComboboxChipsProps = ComboboxChipsProps.Render &
  ComboboxChipsProps.SuruUI &
  ComboboxChipsProps.BaseUI &
  ComboboxChipsProps.HTML;

export type IComboboxChips = IComponent<ComboboxChipsProps>;

/**
 * 複数選択した値を表示するチップのコンテナーです。
 */
export const ComboboxChips: IComboboxChips = function SuiComboboxChips(props) {
  const ctx = useComboboxContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Combobox.Chips
      {...otherProps}
      {...proxyRenderProps<Combobox.Chips.State, ComboboxChipsState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<ComboboxChipsState>(
            className,
            "sui_combobox_chips",
            (state) => `sui_combobox_chips-size_${state.size}`,
            (state) => `sui_combobox_chips-color_${state.color}`,
            (state) => `sui_combobox_chips-radius_${state.radius}`,
            (state) => `sui_combobox_chips-variant_${state.variant}`,
            (state) => state.outlined && "sui_combobox_chips-outlined",
            (state) => state.multiple && "sui_combobox_chips-multiple",
          ),
        },
      )}
    />
  );
};

export { ComboboxChips as Chips };

export namespace Chips {
  export type State = ComboboxChipsState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxChipsProps.Render;

    export type SuruUI = ComboboxChipsProps.SuruUI;

    export type BaseUI = ComboboxChipsProps.BaseUI;

    export type HTML = ComboboxChipsProps.HTML;
  }
}
