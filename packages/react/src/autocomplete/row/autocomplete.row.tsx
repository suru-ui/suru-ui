import { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useAutocompleteListContext } from "../list/autocomplete.list.context.js";
import { AutocompleteRowContext } from "./autocomplete.row.context.js";

/**
 * {@link AutocompleteRow} の状態です。
 */
export type AutocompleteRowState = AutocompleteRowContext;

export namespace AutocompleteRowProps {
  export type Render = RenderProps<AutocompleteRowState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Autocomplete.Row>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // AutocompleteRowProps より:
      never
    >,
    keyof Render | keyof SuruUI
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
  const ctx = useAutocompleteListContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Autocomplete.Row
      {...otherProps}
      {...proxyRenderProps<Autocomplete.Row.State, AutocompleteRowState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <AutocompleteRowContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </AutocompleteRowContext>
          ),
          className: cn<AutocompleteRowState>(
            className,
            "sui_autocomplete_row",
            (state) => `sui_autocomplete_row-size_${state.size}`,
            (state) => `sui_autocomplete_row-color_${state.color}`,
            (state) => `sui_autocomplete_row-radius_${state.radius}`,
            (state) => `sui_autocomplete_row-variant_${state.variant}`,
            (state) => state.outlined && "sui_autocomplete_row-outlined",
          ),
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
