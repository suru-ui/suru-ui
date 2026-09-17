import { Combobox } from "@base-ui/react/combobox";
import type { NativeButtonProps } from "@base-ui/react/internals/types";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link ComboboxClear} が持つ状態です。
 */
export type ComboboxClearState = Combobox.Clear.State;

export namespace ComboboxClearProps {
  export type Render = RenderProps<ComboboxClearState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Clear>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NativeButtonProps:
      | keyof NativeButtonProps
      // ComboboxClearProps:
      | "disabled"
      | "keepMounted",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Clear>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxClear} に渡す props です。
 */
export type ComboboxClearProps = ComboboxClearProps.Render &
  ComboboxClearProps.SuruUI &
  ComboboxClearProps.BaseUI &
  ComboboxClearProps.HTML;

/**
 * 選択値を消去するボタン要素です。
 */
export const ComboboxClear: IComponent<ComboboxClearProps> = function SuiComboboxClear(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Clear {...otherProps} className={cn(className, "sui_combobox_clear")} />;
};

export { ComboboxClear as Clear };

export namespace Clear {
  export type State = ComboboxClearState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxClearProps.Render;

    export type SuruUI = ComboboxClearProps.SuruUI;

    export type BaseUI = ComboboxClearProps.BaseUI;

    export type HTML = ComboboxClearProps.HTML;
  }
}
