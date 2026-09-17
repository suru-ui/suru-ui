import { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { useAutocompleteContext } from "./autocomplete.context.js";

/**
 * {@link AutocompleteInputGroup} の状態です。
 */
export type AutocompleteInputGroupState = Autocomplete.InputGroup.State;

export namespace AutocompleteInputGroupProps {
  export type Render = RenderProps<AutocompleteInputGroupState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Autocomplete.InputGroup>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // AutocompleteInputGroupProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Autocomplete.InputGroup>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompleteInputGroup} に渡す props です。
 */
export type AutocompleteInputGroupProps = AutocompleteInputGroupProps.Render &
  AutocompleteInputGroupProps.SuruUI &
  AutocompleteInputGroupProps.BaseUI &
  AutocompleteInputGroupProps.HTML;

/**
 * 入力欄とその付属コントロールをまとめるグループ要素です。
 */
export const AutocompleteInputGroup: IComponent<AutocompleteInputGroupProps> =
  function SuiAutocompleteInputGroup(props) {
    const ctx = useAutocompleteContext();
    const {
      className,
      // @ts-expect-error
      "data-scope": dataScope = "",
      ...otherProps
    } = props;

    return (
      <Autocomplete.InputGroup
        {...otherProps}
        className={cn(
          className,
          "sui_autocomplete",
          `sui_autocomplete-size_${ctx.size}`,
          `sui_autocomplete-color_${ctx.color}`,
          `sui_autocomplete-radius_${ctx.radius}`,
          `sui_autocomplete-variant_${ctx.variant}`,
          ctx.outlined && "sui_autocomplete-outlined",
          (state) => state.disabled && "sui_autocomplete-disabled",
        )}
        data-scope={dataScope}
      />
    );
  };

export { AutocompleteInputGroup as InputGroup };

export namespace InputGroup {
  export type State = AutocompleteInputGroupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AutocompleteInputGroupProps.Render;

    export type SuruUI = AutocompleteInputGroupProps.SuruUI;

    export type BaseUI = AutocompleteInputGroupProps.BaseUI;

    export type HTML = AutocompleteInputGroupProps.HTML;
  }
}
