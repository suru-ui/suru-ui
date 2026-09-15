import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";

/**
 * {@link ComboboxValue} が持つ状態です。
 */
export type ComboboxValueState = Combobox.Value.State;

export namespace ComboboxValueProps {
  export type Render = RenderProps<ComboboxValueState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Value>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxValueProps:
      "children" | "placeholder",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Value>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxValue} に渡す props です。
 */
export type ComboboxValueProps = ComboboxValueProps.Render &
  ComboboxValueProps.SuruUI &
  ComboboxValueProps.BaseUI &
  ComboboxValueProps.HTML;

/**
 * 現在の選択値を子要素へ反映する要素です。
 */
export const ComboboxValue: IComponent<ComboboxValueProps> = function SuiComboboxValue(props) {
  return <Combobox.Value {...props} />;
};

export { ComboboxValue as Value };

/**
 * {@link ComboboxValue} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Value {
  export type State = ComboboxValueState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxValueProps.Render;

    export type SuruUI = ComboboxValueProps.SuruUI;

    export type BaseUI = ComboboxValueProps.BaseUI;

    export type HTML = ComboboxValueProps.HTML;
  }
}
