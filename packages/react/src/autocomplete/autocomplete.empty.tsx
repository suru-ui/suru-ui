import { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type AutocompleteContext, useAutocompleteContext } from "./autocomplete.context.js";

/**
 * {@link AutocompleteEmpty} の状態です。
 */
export type AutocompleteEmptyState = Override<AutocompleteContext, Autocomplete.Empty.State>;

export namespace AutocompleteEmptyProps {
  export type Render = RenderProps<AutocompleteEmptyState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Autocomplete.Empty>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // AutocompleteEmptyProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Autocomplete.Empty>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompleteEmpty} に渡す props です。
 */
export type AutocompleteEmptyProps = AutocompleteEmptyProps.Render &
  AutocompleteEmptyProps.SuruUI &
  AutocompleteEmptyProps.BaseUI &
  AutocompleteEmptyProps.HTML;

export type IAutocompleteEmpty = IComponent<AutocompleteEmptyProps>;

/**
 * リストが空のときだけ、その children を表示する要素です。
 *
 * この要素自体は常に DOM に残します。表示内容の切り替えは children で行います。
 */
export const AutocompleteEmpty: IAutocompleteEmpty = function SuiAutocompleteEmpty(props) {
  const ctx = useAutocompleteContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Autocomplete.Empty
      {...otherProps}
      {...proxyRenderProps<Autocomplete.Empty.State, AutocompleteEmptyState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<AutocompleteEmptyState>(className, "sui_autocomplete_empty"),
        },
      )}
    />
  );
};

export { AutocompleteEmpty as Empty };

export namespace Empty {
  export type State = AutocompleteEmptyState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AutocompleteEmptyProps.Render;

    export type SuruUI = AutocompleteEmptyProps.SuruUI;

    export type BaseUI = AutocompleteEmptyProps.BaseUI;

    export type HTML = AutocompleteEmptyProps.HTML;
  }
}
