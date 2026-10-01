import { Autocomplete } from "@base-ui/react/autocomplete";
import type { NativeButtonProps } from "@base-ui/react/internals/types";
import * as React from "react";

import { ClearIcon } from "../_icons.jsx";
import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type AutocompleteContext, useAutocompleteContext } from "./autocomplete.context.js";

/**
 * {@link AutocompleteClear} の状態です。
 */
export type AutocompleteClearState = Override<AutocompleteContext, Autocomplete.Clear.State>;

export namespace AutocompleteClearProps {
  export type Render = RenderProps<AutocompleteClearState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Autocomplete.Clear>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NativeButtonProps:
      | keyof NativeButtonProps
      // ComboboxClearProps:
      | "disabled"
      | "keepMounted",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Autocomplete.Clear>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompleteClear} に渡す props です。
 */
export type AutocompleteClearProps = AutocompleteClearProps.Render &
  AutocompleteClearProps.SuruUI &
  AutocompleteClearProps.BaseUI &
  AutocompleteClearProps.HTML;

export type IAutocompleteClear = IComponent<AutocompleteClearProps>;

/**
 * 入力値を消去するボタン要素です。
 *
 * 入力値があるときだけ表示されます。
 */
export const AutocompleteClear: IAutocompleteClear = function SuiAutocompleteClear(props) {
  const ctx = useAutocompleteContext();
  const {
    style,
    render,
    children = <ClearIcon />,
    className,
    "aria-label": ariaLabel = "入力値を消去",
    ...otherProps
  } = props;

  return (
    <Autocomplete.Clear
      {...otherProps}
      {...proxyRenderProps<Autocomplete.Clear.State, AutocompleteClearState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<AutocompleteClearState>(
            className,
            "sui_autocomplete_clear",
            (state) => `sui_autocomplete_clear-size_${state.size}`,
            (state) => `sui_autocomplete_clear-color_${state.color}`,
            (state) => `sui_autocomplete_clear-radius_${state.radius}`,
            (state) => `sui_autocomplete_clear-variant_${state.variant}`,
            (state) => state.outlined && "sui_autocomplete_clear-outlined",
          ),
        },
      )}
      aria-label={ariaLabel}
    >
      {children}
    </Autocomplete.Clear>
  );
};

export { AutocompleteClear as Clear };

export namespace Clear {
  export type State = AutocompleteClearState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AutocompleteClearProps.Render;

    export type SuruUI = AutocompleteClearProps.SuruUI;

    export type BaseUI = AutocompleteClearProps.BaseUI;

    export type HTML = AutocompleteClearProps.HTML;
  }
}
