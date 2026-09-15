import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link ComboboxBackdrop} が持つ状態です。
 */
export type ComboboxBackdropState = Combobox.Backdrop.State;

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

/**
 * ポップアップの背後に表示される要素です。
 */
export const ComboboxBackdrop: IComponent<ComboboxBackdropProps> = function SuiComboboxBackdrop(
  props,
) {
  const { className, ...otherProps } = props;

  return <Combobox.Backdrop {...otherProps} className={cn(className, "sui_combobox_backdrop")} />;
};

export { ComboboxBackdrop as Backdrop };

/**
 * {@link ComboboxBackdrop} の状態やプロパティーをまとめた型名前空間です。
 */
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
