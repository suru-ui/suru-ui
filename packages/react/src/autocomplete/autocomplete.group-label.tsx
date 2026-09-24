import { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link AutocompleteGroupLabel} の状態です。
 */
export type AutocompleteGroupLabelState = Autocomplete.GroupLabel.State;

export namespace AutocompleteGroupLabelProps {
  export type Render = RenderProps<AutocompleteGroupLabelState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Autocomplete.GroupLabel>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // AutocompleteGroupLabelProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Autocomplete.GroupLabel>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompleteGroupLabel} に渡す props です。
 */
export type AutocompleteGroupLabelProps = AutocompleteGroupLabelProps.Render &
  AutocompleteGroupLabelProps.SuruUI &
  AutocompleteGroupLabelProps.BaseUI &
  AutocompleteGroupLabelProps.HTML;

export type IAutocompleteGroupLabel = IComponent<AutocompleteGroupLabelProps>;

/**
 * グループに自動的に対応付けられるラベル要素です。
 */
export const AutocompleteGroupLabel: IAutocompleteGroupLabel = function SuiAutocompleteGroupLabel(
  props,
) {
  const { className, ...otherProps } = props;

  return (
    <Autocomplete.GroupLabel
      {...otherProps}
      className={cn(className, "sui_autocomplete_group_label")}
    />
  );
};

export { AutocompleteGroupLabel as GroupLabel };

export namespace GroupLabel {
  export type State = AutocompleteGroupLabelState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AutocompleteGroupLabelProps.Render;

    export type SuruUI = AutocompleteGroupLabelProps.SuruUI;

    export type BaseUI = AutocompleteGroupLabelProps.BaseUI;

    export type HTML = AutocompleteGroupLabelProps.HTML;
  }
}
