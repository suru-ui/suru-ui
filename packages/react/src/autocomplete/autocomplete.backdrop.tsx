// TODO(tai-kun): いつか複合コンポーネントの方に組み込む

import { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link AutocompleteBackdrop} が持つ状態です。
 */
export type AutocompleteBackdropState = Autocomplete.Backdrop.State;

export namespace AutocompleteBackdropProps {
  export type Render = RenderProps<AutocompleteBackdropState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Autocomplete.Backdrop>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // AutocompleteBackdropProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Autocomplete.Backdrop>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompleteBackdrop} に渡す props です。
 */
export type AutocompleteBackdropProps = AutocompleteBackdropProps.Render &
  AutocompleteBackdropProps.SuruUI &
  AutocompleteBackdropProps.BaseUI &
  AutocompleteBackdropProps.HTML;

export type IAutocompleteBackdrop = IComponent<AutocompleteBackdropProps>;

/**
 * ポップアップの背後に表示される要素です。
 */
export const AutocompleteBackdrop: IAutocompleteBackdrop = function SuiAutocompleteBackdrop(props) {
  const { className, ...otherProps } = props;

  return (
    <Autocomplete.Backdrop {...otherProps} className={cn(className, "sui_autocomplete_backdrop")} />
  );
};

export { AutocompleteBackdrop as Backdrop };

export namespace Backdrop {
  export type State = AutocompleteBackdropState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AutocompleteBackdropProps.Render;

    export type SuruUI = AutocompleteBackdropProps.SuruUI;

    export type BaseUI = AutocompleteBackdropProps.BaseUI;

    export type HTML = AutocompleteBackdropProps.HTML;
  }
}
