import { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useAutocompleteInputGroupContext } from "../input-group/autocomplete.input-group.context.js";
import { AutocompleteInputContext } from "./autocomplete.input.context.js";

/**
 * {@link AutocompleteInput} の状態です。
 *
 * @template TItem 項目の型です。
 */
export type AutocompleteInputState<TItem = any> = AutocompleteInputContext<TItem>;

export namespace AutocompleteInputProps {
  export type Render<TItem = any> = RenderProps<AutocompleteInputState<TItem>>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Autocomplete.Input>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // AutocompleteInputProps より :
      "disabled"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Autocomplete.Input>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompleteInput} に渡す props です。
 */
export type AutocompleteInputProps = AutocompleteInputProps.Render &
  AutocompleteInputProps.SuruUI &
  AutocompleteInputProps.BaseUI &
  AutocompleteInputProps.HTML;

export type IAutocompleteInput = IComponent<AutocompleteInputProps>;

/** 検索文字列を入力するテキスト入力欄です。 */
export const AutocompleteInput: IAutocompleteInput = (props) => {
  const ctx = useAutocompleteInputGroupContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Autocomplete.Input
      {...otherProps}
      {...proxyRenderProps<Autocomplete.Input.State, AutocompleteInputState>(
        (state) => ({
          ...ctx,
          ...state,
        }),
        {
          style,
          render: (htmlProps, state) => (
            <AutocompleteInputContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="input"
              />
            </AutocompleteInputContext>
          ),
          className: cn<AutocompleteInputState>(
            className,
            "sui_autocomplete_input",
            (state) => `sui_autocomplete_input-size_${state.size}`,
            (state) => `sui_autocomplete_input-color_${state.color}`,
            (state) => `sui_autocomplete_input-radius_${state.radius}`,
            (state) => `sui_autocomplete_input-variant_${state.variant}`,
            (state) => state.outlined && "sui_autocomplete_input-outlined",
            (state) => state.disabled && "sui_autocomplete_input-disabled",
            (state) => state.readOnly && "sui_autocomplete_input-readonly",
            (state) => state.open && "sui_autocomplete_input-open",
            (state) => state.listEmpty && "sui_autocomplete_input-list_empty",
            (state) => state.touched && "sui_autocomplete_input-touched",
            (state) => state.dirty && "sui_autocomplete_input-dirty",
            (state) => state.filled && "sui_autocomplete_input-filled",
            (state) => state.focused && "sui_autocomplete_input-focused",
            (state) => state.valid === false && "sui_autocomplete_input-invalid",
            (state) => state.valid === true && "sui_autocomplete_input-valid",
            (state) => state.valid === null && "sui_autocomplete_input-unverified",
            (state) =>
              state.popupSide !== null &&
              `sui_autocomplete_input-popup_side_${state.popupSide.replaceAll("-", "_")}`,
          ),
        },
      )}
    />
  );
};

export { AutocompleteInput as Input };
export namespace Input {
  export type State<TItem = any> = AutocompleteInputState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = AutocompleteInputProps.Render<TItem>;

    export type SuruUI = AutocompleteInputProps.SuruUI;

    export type BaseUI = AutocompleteInputProps.BaseUI;

    export type HTML = AutocompleteInputProps.HTML;
  }
}
