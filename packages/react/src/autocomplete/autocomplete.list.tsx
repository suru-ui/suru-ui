import { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link AutocompleteList} の状態です。
 */
export type AutocompleteListState = Autocomplete.List.State;

export namespace AutocompleteListProps {
  export type Render = RenderProps<AutocompleteListState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Autocomplete.List>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxListProps:
      "children",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Autocomplete.List>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompleteList} に渡すプロパティーです。
 */
export type AutocompleteListProps = AutocompleteListProps.Render &
  AutocompleteListProps.SuruUI &
  AutocompleteListProps.BaseUI &
  AutocompleteListProps.HTML;

/**
 * 検索結果のリストを表示するコンテナー要素です。
 */
export const AutocompleteList: IComponent<AutocompleteListProps> = function SuiAutocompleteList(
  props,
) {
  const { className, ...otherProps } = props;

  return <Autocomplete.List {...otherProps} className={cn(className, "sui_autocomplete_list")} />;
};

export { AutocompleteList as List };

export namespace List {
  export type State = AutocompleteListState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AutocompleteListProps.Render;

    export type SuruUI = AutocompleteListProps.SuruUI;

    export type BaseUI = AutocompleteListProps.BaseUI;

    export type HTML = AutocompleteListProps.HTML;
  }
}
