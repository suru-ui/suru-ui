import { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link AutocompleteEmpty} の状態です。
 */
export type AutocompleteEmptyState = Autocomplete.Empty.State;

export namespace AutocompleteEmptyProps {
  export type Render = RenderProps<AutocompleteEmptyState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Autocomplete.Empty>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxEmptyProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Autocomplete.Empty>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompleteEmpty} に渡すプロパティーです。
 */
export type AutocompleteEmptyProps = AutocompleteEmptyProps.Render &
  AutocompleteEmptyProps.SuruUI &
  AutocompleteEmptyProps.BaseUI &
  AutocompleteEmptyProps.HTML;

/**
 * リストが空のときだけ、その children を表示する要素です。
 *
 * この要素自体は常に DOM に残します。表示内容の切り替えは children で行います。
 */
export const AutocompleteEmpty: IComponent<AutocompleteEmptyProps> = function SuiAutocompleteEmpty(
  props,
) {
  const { className, ...otherProps } = props;

  return <Autocomplete.Empty {...otherProps} className={cn(className, "sui_autocomplete_empty")} />;
};

export { AutocompleteEmpty as Empty };

export namespace Empty {
  export type State = AutocompleteEmptyState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AutocompleteEmptyProps.Render;

    export type SuruUI = AutocompleteEmptyProps.SuruUI;

    export type BaseUI = AutocompleteEmptyProps.BaseUI;

    export type HTML = AutocompleteEmptyProps.HTML;
  }
}
