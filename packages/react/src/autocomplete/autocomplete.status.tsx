import { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link AutocompleteStatus} の状態です。
 */
export type AutocompleteStatusState = Autocomplete.Status.State;

export namespace AutocompleteStatusProps {
  export type Render = RenderProps<AutocompleteStatusState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Autocomplete.Status>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxStatusProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Autocomplete.Status>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompleteStatus} に渡すプロパティーです。
 */
export type AutocompleteStatusProps = AutocompleteStatusProps.Render &
  AutocompleteStatusProps.SuruUI &
  AutocompleteStatusProps.BaseUI &
  AutocompleteStatusProps.HTML;

/**
 * リストの状態を読み上げるための非表示の要素です。
 *
 * この要素は常に DOM にマウントされたままにしてください。内容を変更するときは、要素を出し入れするのではなく children を差し替えます。
 */
export const AutocompleteStatus: IComponent<AutocompleteStatusProps> =
  function SuiAutocompleteStatus(props) {
    const { className, ...otherProps } = props;

    return (
      <Autocomplete.Status {...otherProps} className={cn(className, "sui_autocomplete_status")} />
    );
  };

export { AutocompleteStatus as Status };

export namespace Status {
  export type State = AutocompleteStatusState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AutocompleteStatusProps.Render;

    export type SuruUI = AutocompleteStatusProps.SuruUI;

    export type BaseUI = AutocompleteStatusProps.BaseUI;

    export type HTML = AutocompleteStatusProps.HTML;
  }
}
