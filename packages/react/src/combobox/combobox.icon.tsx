import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import { ChevronIcon } from "../_icons.jsx";
import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type ComboboxContext, useComboboxContext } from "./combobox.context.js";

/**
 * {@link ComboboxIcon} の状態です。
 */
export type ComboboxIconState = Override<ComboboxContext, Combobox.Icon.State>;

export namespace ComboboxIconProps {
  export type Render = RenderProps<ComboboxIconState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Icon>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxIconProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Icon>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxIcon} に渡す props です。
 */
export type ComboboxIconProps = ComboboxIconProps.Render &
  ComboboxIconProps.SuruUI &
  ComboboxIconProps.BaseUI &
  ComboboxIconProps.HTML;

export type IComboboxIcon = IComponent<ComboboxIconProps>;

/**
 * トリガーの操作を示すアイコンのラッパー要素です。
 */
export const ComboboxIcon: IComboboxIcon = function SuiComboboxIcon(props) {
  const ctx = useComboboxContext();
  const { style, render, children = <ChevronIcon />, className, ...otherProps } = props;

  return (
    <Combobox.Icon
      {...otherProps}
      {...proxyRenderProps<Combobox.Icon.State, ComboboxIconState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<ComboboxIconState>(
            className,
            "sui_combobox_icon",
            (state) => `sui_combobox_icon-size_${state.size}`,
            (state) => `sui_combobox_icon-color_${state.color}`,
            (state) => `sui_combobox_icon-radius_${state.radius}`,
            (state) => `sui_combobox_icon-variant_${state.variant}`,
            (state) => state.outlined && "sui_combobox_icon-outlined",
            (state) => state.multiple && "sui_combobox_icon-multiple",
          ),
        },
      )}
    >
      {children}
    </Combobox.Icon>
  );
};

export { ComboboxIcon as Icon };

export namespace Icon {
  export type State = ComboboxIconState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxIconProps.Render;

    export type SuruUI = ComboboxIconProps.SuruUI;

    export type BaseUI = ComboboxIconProps.BaseUI;

    export type HTML = ComboboxIconProps.HTML;
  }
}
