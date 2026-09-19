import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link ComboboxChips} が持つ状態です。
 */
export type ComboboxChipsState = Combobox.Chips.State;

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
  const { className, ...otherProps } = props;

  return <Combobox.Chips {...otherProps} className={cn(className, "sui_combobox_chips")} />;
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
