import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link ComboboxInput} が持つ状態です。
 */
export type ComboboxInputState = Combobox.Input.State;

export namespace ComboboxInputProps {
  export type Render = RenderProps<ComboboxInputState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Input>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxInputProps:
      "disabled",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Input>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxInput} に渡す props です。
 */
export type ComboboxInputProps = ComboboxInputProps.Render &
  ComboboxInputProps.SuruUI &
  ComboboxInputProps.BaseUI &
  ComboboxInputProps.HTML;

export type IComboboxInput = IComponent<ComboboxInputProps>;

/**
 * 候補を検索するテキスト入力欄です。
 */
export const ComboboxInput: IComboboxInput = function SuiComboboxInput(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Input {...otherProps} className={cn(className, "sui_combobox_input")} />;
};

export { ComboboxInput as Input };

export namespace Input {
  export type State = ComboboxInputState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxInputProps.Render;

    export type SuruUI = ComboboxInputProps.SuruUI;

    export type BaseUI = ComboboxInputProps.BaseUI;

    export type HTML = ComboboxInputProps.HTML;
  }
}
