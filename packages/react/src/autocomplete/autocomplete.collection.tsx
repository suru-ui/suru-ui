import { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";

/**
 * {@link AutocompleteCollection} の状態です。
 */
export type AutocompleteCollectionState = Autocomplete.Collection.State;

export namespace AutocompleteCollectionProps {
  export type Render = RenderProps<AutocompleteCollectionState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Autocomplete.Collection>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxCollectionProps:
      "children",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Autocomplete.Collection>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompleteCollection} に渡すプロパティーです。
 */
export type AutocompleteCollectionProps = AutocompleteCollectionProps.Render &
  AutocompleteCollectionProps.SuruUI &
  AutocompleteCollectionProps.BaseUI &
  AutocompleteCollectionProps.HTML;

/**
 * フィルタリングされた項目を列挙する要素です。
 *
 * これ自身は HTML 要素をレンダリングしません。
 */
export const AutocompleteCollection: IComponent<AutocompleteCollectionProps> =
  function SuiAutocompleteCollection(props) {
    return <Autocomplete.Collection {...props} />;
  };

export { AutocompleteCollection as Collection };

export namespace Collection {
  export type State = AutocompleteCollectionState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AutocompleteCollectionProps.Render;

    export type SuruUI = AutocompleteCollectionProps.SuruUI;

    export type BaseUI = AutocompleteCollectionProps.BaseUI;

    export type HTML = AutocompleteCollectionProps.HTML;
  }
}
