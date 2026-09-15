import { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link AutocompleteGroup} の状態です。
 */
export type AutocompleteGroupState = Autocomplete.Group.State;

export namespace AutocompleteGroupProps {
  export type Render = RenderProps<AutocompleteGroupState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Autocomplete.Group>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxGroupProps:
      "items",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Autocomplete.Group>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompleteGroup} に渡すプロパティーです。
 */
export type AutocompleteGroupProps = AutocompleteGroupProps.Render &
  AutocompleteGroupProps.SuruUI &
  AutocompleteGroupProps.BaseUI &
  AutocompleteGroupProps.HTML;

/**
 * 関連する項目をまとめるグループ要素です。
 *
 * {@link Root} の `items` にグループの配列を渡したときに使います。
 */
export const AutocompleteGroup: IComponent<AutocompleteGroupProps> = function SuiAutocompleteGroup(
  props,
) {
  const { className, ...otherProps } = props;

  return <Autocomplete.Group {...otherProps} className={cn(className, "sui_autocomplete_group")} />;
};

export { AutocompleteGroup as Group };

export namespace Group {
  export type State = AutocompleteGroupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AutocompleteGroupProps.Render;

    export type SuruUI = AutocompleteGroupProps.SuruUI;

    export type BaseUI = AutocompleteGroupProps.BaseUI;

    export type HTML = AutocompleteGroupProps.HTML;
  }
}
