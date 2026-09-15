import { Autocomplete } from "@base-ui/react/autocomplete";
import type { NativeButtonProps } from "@base-ui/react/internals/types";
import * as React from "react";

import { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link AutocompleteClear} の状態です。
 */
export type AutocompleteClearState = Autocomplete.Clear.State;

export namespace AutocompleteClearProps {
  export type Render = RenderProps<AutocompleteClearState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Autocomplete.Clear>,
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
    React.ComponentProps<typeof Autocomplete.Clear>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompleteClear} に渡すプロパティーです。
 */
export type AutocompleteClearProps = AutocompleteClearProps.Render &
  AutocompleteClearProps.SuruUI &
  AutocompleteClearProps.BaseUI &
  AutocompleteClearProps.HTML;

/**
 * 入力値を消去するボタン要素です。
 *
 * 入力値があるときだけ表示されます。
 */
export const AutocompleteClear: IComponent<AutocompleteClearProps> = function SuiAutocompleteClear(
  props,
) {
  const { className, ...otherProps } = props;

  return <Autocomplete.Clear {...otherProps} className={cn(className, "sui_autocomplete_clear")} />;
};

export { AutocompleteClear as Clear };

export namespace Clear {
  export type State = AutocompleteClearState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AutocompleteClearProps.Render;

    export type SuruUI = AutocompleteClearProps.SuruUI;

    export type BaseUI = AutocompleteClearProps.BaseUI;

    export type HTML = AutocompleteClearProps.HTML;
  }
}
