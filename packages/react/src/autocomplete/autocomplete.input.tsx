import { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link AutocompleteInput} の状態です。
 */
export type AutocompleteInputState = Autocomplete.Input.State;

export namespace AutocompleteInputProps {
  export type Render = RenderProps<AutocompleteInputState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Autocomplete.Input>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxInputProps:
      "disabled",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Autocomplete.Input>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompleteInput} に渡すプロパティーです。
 */
export type AutocompleteInputProps = AutocompleteInputProps.Render &
  AutocompleteInputProps.SuruUI &
  AutocompleteInputProps.BaseUI &
  AutocompleteInputProps.HTML;

/**
 * 検索文字列を入力するテキスト入力欄です。
 */
export const AutocompleteInput: IComponent<AutocompleteInputProps> = function SuiAutocompleteInput(
  props,
) {
  const { type = "text", className, ...otherProps } = props;

  return (
    <Autocomplete.Input
      {...otherProps}
      type={type}
      className={cn(
        className,
        "sui_autocomplete_input",
        (state) => state.valid === true && "sui_autocomplete_input-valid",
        (state) => state.valid === false && "sui_autocomplete_input-invalid",
        (state) => state.valid === null && "sui_autocomplete_input-unverified",
      )}
    />
  );
};

export { AutocompleteInput as Input };

export namespace Input {
  export type State = AutocompleteInputState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AutocompleteInputProps.Render;

    export type SuruUI = AutocompleteInputProps.SuruUI;

    export type BaseUI = AutocompleteInputProps.BaseUI;

    export type HTML = AutocompleteInputProps.HTML;
  }
}
