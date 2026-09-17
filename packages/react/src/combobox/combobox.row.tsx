import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link ComboboxRow} が持つ状態です。
 */
export type ComboboxRowState = Combobox.Row.State;

export namespace ComboboxRowProps {
  export type Render = RenderProps<ComboboxRowState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.Row>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxRowProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Row>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxRow} に渡す props です。
 */
export type ComboboxRowProps = ComboboxRowProps.Render &
  ComboboxRowProps.SuruUI &
  ComboboxRowProps.BaseUI &
  ComboboxRowProps.HTML;

/**
 * グリッドリストの 1 行を表示する要素です。
 */
export const ComboboxRow: IComponent<ComboboxRowProps> = function SuiComboboxRow(props) {
  const { className, ...otherProps } = props;

  return <Combobox.Row {...otherProps} className={cn(className, "sui_combobox_row")} />;
};

export { ComboboxRow as Row };

export namespace Row {
  export type State = ComboboxRowState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxRowProps.Render;

    export type SuruUI = ComboboxRowProps.SuruUI;

    export type BaseUI = ComboboxRowProps.BaseUI;

    export type HTML = ComboboxRowProps.HTML;
  }
}
