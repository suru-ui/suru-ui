// TODO(tai-kun): いつか複合コンポーネントの方に組み込む

import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type ComboboxContext, useComboboxContext } from "./combobox.context.js";

/**
 * {@link ComboboxBackdrop} の状態です。
 */
export type ComboboxBackdropState = Override<ComboboxContext, Combobox.Backdrop.State>;

export namespace ComboboxBackdropProps {
  export type Render = RenderProps<ComboboxBackdropState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Backdrop>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxBackdropProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Backdrop>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxBackdrop} に渡す props です。
 */
export type ComboboxBackdropProps = ComboboxBackdropProps.Render &
  ComboboxBackdropProps.SuruUI &
  ComboboxBackdropProps.BaseUI &
  ComboboxBackdropProps.HTML;

export type IComboboxBackdrop = IComponent<ComboboxBackdropProps>;

/**
 * ポップアップの背後に表示される要素です。
 */
export const ComboboxBackdrop: IComboboxBackdrop = function SuiComboboxBackdrop(props) {
  const ctx = useComboboxContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Combobox.Backdrop
      {...otherProps}
      {...proxyRenderProps<Combobox.Backdrop.State, ComboboxBackdropState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<ComboboxBackdropState>(className, "sui_combobox_backdrop"),
        },
      )}
    />
  );
};

export { ComboboxBackdrop as Backdrop };

export namespace Backdrop {
  export type State = ComboboxBackdropState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxBackdropProps.Render;

    export type SuruUI = ComboboxBackdropProps.SuruUI;

    export type BaseUI = ComboboxBackdropProps.BaseUI;

    export type HTML = ComboboxBackdropProps.HTML;
  }
}
