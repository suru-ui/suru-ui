import { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link AutocompletePopup} の状態です。
 */
export type AutocompletePopupState = Autocomplete.Popup.State;

export namespace AutocompletePopupProps {
  export type Render = RenderProps<AutocompletePopupState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Autocomplete.Popup>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxPopupProps:
      "finalFocus" | "initialFocus",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Autocomplete.Popup>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompletePopup} に渡すプロパティーです。
 */
export type AutocompletePopupProps = AutocompletePopupProps.Render &
  AutocompletePopupProps.SuruUI &
  AutocompletePopupProps.BaseUI &
  AutocompletePopupProps.HTML;

/**
 * 検索結果リストを表示するポップアップ要素です。
 */
export const AutocompletePopup: IComponent<AutocompletePopupProps> = function SuiAutocompletePopup(
  props,
) {
  const { className, ...otherProps } = props;

  return <Autocomplete.Popup {...otherProps} className={cn(className, "sui_autocomplete_popup")} />;
};

export { AutocompletePopup as Popup };

export namespace Popup {
  export type State = AutocompletePopupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AutocompletePopupProps.Render;

    export type SuruUI = AutocompletePopupProps.SuruUI;

    export type BaseUI = AutocompletePopupProps.BaseUI;

    export type HTML = AutocompletePopupProps.HTML;
  }
}
