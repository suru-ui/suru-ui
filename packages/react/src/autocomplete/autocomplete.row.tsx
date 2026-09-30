import { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type AutocompleteContext, useAutocompleteContext } from "./autocomplete.context.js";

/**
 * {@link AutocompleteRow} の状態です。
 */
export type AutocompleteRowState = Override<AutocompleteContext, Autocomplete.Row.State>;

export namespace AutocompleteRowProps {
  export type Render = RenderProps<AutocompleteRowState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Autocomplete.Row>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // AutocompleteRowProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Autocomplete.Row>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompleteRow} に渡す props です。
 */
export type AutocompleteRowProps = AutocompleteRowProps.Render &
  AutocompleteRowProps.SuruUI &
  AutocompleteRowProps.BaseUI &
  AutocompleteRowProps.HTML;

export type IAutocompleteRow = IComponent<AutocompleteRowProps>;

/**
 * グリッドリストの 1 行を表示する要素です。
 *
 * {@link Root} の `grid` プロパティーと一緒に使います。
 */
export const AutocompleteRow: IAutocompleteRow = function SuiAutocompleteRow(props) {
  const ctx = useAutocompleteContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Autocomplete.Row
      {...otherProps}
      {...proxyRenderProps<Autocomplete.Row.State, AutocompleteRowState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<AutocompleteRowState>(className, "sui_autocomplete_row"),
        },
      )}
    />
  );
};

export { AutocompleteRow as Row };

export namespace Row {
  export type State = AutocompleteRowState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AutocompleteRowProps.Render;

    export type SuruUI = AutocompleteRowProps.SuruUI;

    export type BaseUI = AutocompleteRowProps.BaseUI;

    export type HTML = AutocompleteRowProps.HTML;
  }
}
