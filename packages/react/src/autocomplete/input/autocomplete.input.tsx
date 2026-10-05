import { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import {
  type AutocompleteContext,
  useAutocompleteContext,
} from "../root/autocomplete.root.context.js";
import { AutocompleteInputContext } from "./autocomplete.input.context.js";

/**
 * {@link AutocompleteInput} の状態です。
 */
export type AutocompleteInputState = Override<AutocompleteContext, Autocomplete.Input.State>;

export namespace AutocompleteInputProps {
  export type Render = RenderProps<AutocompleteInputState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Autocomplete.Input>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // AutocompleteInputProps:
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
 * {@link AutocompleteInput} に渡す props です。
 */
export type AutocompleteInputProps = AutocompleteInputProps.Render &
  AutocompleteInputProps.SuruUI &
  AutocompleteInputProps.BaseUI &
  AutocompleteInputProps.HTML;

export type IAutocompleteInput = IComponent<AutocompleteInputProps>;

/**
 * 検索文字列を入力するテキスト入力欄です。
 */
export const AutocompleteInput: IAutocompleteInput = function SuiAutocompleteInput(props) {
  const ctx = useAutocompleteContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Autocomplete.Input
      {...otherProps}
      {...proxyRenderProps<Autocomplete.Input.State, AutocompleteInputState>(
        (state) => ({ ...ctx, ...state }),
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
          ),
        },
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
