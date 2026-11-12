import { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useAutocompletePopupContext } from "../popup/autocomplete.popup.context.js";
import { AutocompleteEmptyContext } from "./autocomplete.empty.context.js";

/**
 * {@link AutocompleteEmpty} の状態です。
 *
 * @template TItem 項目の型です。
 */
export type AutocompleteEmptyState<TItem = any> = AutocompleteEmptyContext<TItem>;

export namespace AutocompleteEmptyProps {
  export type Render<TItem = any> = RenderProps<AutocompleteEmptyState<TItem>>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Autocomplete.Empty>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // AutocompleteEmptyProps より :
      never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Autocomplete.Empty>,
    keyof Render | keyof SuruUI
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
export const AutocompleteEmpty: IAutocompleteEmpty = (props) => {
  const ctx = useAutocompletePopupContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Autocomplete.Empty
      {...otherProps}
      {...proxyRenderProps<Autocomplete.Empty.State, AutocompleteEmptyState>(
        (state) => ({
          ...ctx,
          ...state,
        }),
        {
          style,
          render: (htmlProps, state) => (
            <AutocompleteEmptyContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </AutocompleteEmptyContext>
          ),
          className: cn<AutocompleteEmptyState>(
            className,
            "sui_autocomplete_empty",
            (state) => `sui_autocomplete_empty-size_${state.size}`,
            (state) => `sui_autocomplete_empty-color_${state.color}`,
            (state) => `sui_autocomplete_empty-radius_${state.radius}`,
            (state) => `sui_autocomplete_empty-variant_${state.variant}`,
            (state) => state.outlined && "sui_autocomplete_empty-outlined",
            (state) => state.open && "sui_autocomplete_empty-open",
            (state) => state.empty && "sui_autocomplete_empty-empty",
            (state) => state.anchorHidden && "sui_autocomplete_empty-anchor_hidden",
            (state) => `sui_autocomplete_empty-side_${state.side.replaceAll("-", "_")}`,
            (state) => `sui_autocomplete_empty-align_${state.align}`,
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_autocomplete_empty-transition_status_${state.transitionStatus}`,
          ),
        },
      )}
    />
  );
};

export { AutocompleteEmpty as Empty };
export namespace Empty {
  export type State<TItem = any> = AutocompleteEmptyState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = AutocompleteEmptyProps.Render<TItem>;

    export type SuruUI = AutocompleteEmptyProps.SuruUI;

    export type BaseUI = AutocompleteEmptyProps.BaseUI;

    export type HTML = AutocompleteEmptyProps.HTML;
  }
}
