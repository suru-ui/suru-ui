// TODO(tai-kun): いつか複合コンポーネントの方に組み込む

import { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useAutocompleteContext } from "../root/autocomplete.root.context.js";
import { AutocompleteSeparatorContext } from "./autocomplete.separator.context.js";

/**
 * {@link AutocompleteSeparator} が持つ状態です。
 */
export type AutocompleteSeparatorState = AutocompleteSeparatorContext;

export namespace AutocompleteSeparatorProps {
  export type Render = RenderProps<AutocompleteSeparatorState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Autocomplete.Separator>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // AutocompleteSeparatorProps より:
      "orientation"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Autocomplete.Separator>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompleteSeparator} に渡す props です。
 */
export type AutocompleteSeparatorProps = AutocompleteSeparatorProps.Render &
  AutocompleteSeparatorProps.SuruUI &
  AutocompleteSeparatorProps.BaseUI &
  AutocompleteSeparatorProps.HTML;

export type IAutocompleteSeparator = IComponent<AutocompleteSeparatorProps>;

/**
 * 項目やグループを区切る要素です。
 */
export const AutocompleteSeparator: IAutocompleteSeparator = function SuiAutocompleteSeparator(
  props,
) {
  const ctx = useAutocompleteContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Autocomplete.Separator
      {...otherProps}
      {...proxyRenderProps<Autocomplete.Separator.State, AutocompleteSeparatorState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <AutocompleteSeparatorContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </AutocompleteSeparatorContext>
          ),
          className: cn<AutocompleteSeparatorState>(
            className,
            "sui_autocomplete_separator",
            (state) => `sui_autocomplete_separator-size_${state.size}`,
            (state) => `sui_autocomplete_separator-color_${state.color}`,
            (state) => `sui_autocomplete_separator-radius_${state.radius}`,
            (state) => `sui_autocomplete_separator-variant_${state.variant}`,
            (state) => state.outlined && "sui_autocomplete_separator-outlined",
            (state) => `sui_autocomplete_separator-orientation_${state.orientation}`,
          ),
        },
      )}
    />
  );
};

export { AutocompleteSeparator as Separator };

export namespace Separator {
  export type State = AutocompleteSeparatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AutocompleteSeparatorProps.Render;

    export type SuruUI = AutocompleteSeparatorProps.SuruUI;

    export type BaseUI = AutocompleteSeparatorProps.BaseUI;

    export type HTML = AutocompleteSeparatorProps.HTML;
  }
}
