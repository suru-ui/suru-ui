// TODO(tai-kun): いつか複合コンポーネントの方に組み込む

import { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useAutocompletePortalContext } from "../portal/autocomplete.portal.context.js";
import { AutocompleteBackdropContext } from "./autocomplete.backdrop.context.js";

/**
 * {@link AutocompleteBackdrop} が持つ状態です。
 */
export type AutocompleteBackdropState = AutocompleteBackdropContext;

export namespace AutocompleteBackdropProps {
  export type Render = RenderProps<AutocompleteBackdropState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Autocomplete.Backdrop>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // AutocompleteBackdropProps より:
      never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Autocomplete.Backdrop>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompleteBackdrop} に渡す props です。
 */
export type AutocompleteBackdropProps = AutocompleteBackdropProps.Render &
  AutocompleteBackdropProps.SuruUI &
  AutocompleteBackdropProps.BaseUI &
  AutocompleteBackdropProps.HTML;

export type IAutocompleteBackdrop = IComponent<AutocompleteBackdropProps>;

/**
 * ポップアップの背後に表示される要素です。
 */
export const AutocompleteBackdrop: IAutocompleteBackdrop = function SuiAutocompleteBackdrop(props) {
  const ctx = useAutocompletePortalContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Autocomplete.Backdrop
      {...otherProps}
      {...proxyRenderProps<Autocomplete.Backdrop.State, AutocompleteBackdropState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <AutocompleteBackdropContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </AutocompleteBackdropContext>
          ),
          className: cn<AutocompleteBackdropState>(
            className,
            "sui_autocomplete_backdrop",
            (state) => `sui_autocomplete_backdrop-size_${state.size}`,
            (state) => `sui_autocomplete_backdrop-color_${state.color}`,
            (state) => `sui_autocomplete_backdrop-radius_${state.radius}`,
            (state) => `sui_autocomplete_backdrop-variant_${state.variant}`,
            (state) => state.outlined && "sui_autocomplete_backdrop-outlined",
          ),
        },
      )}
    />
  );
};

export { AutocompleteBackdrop as Backdrop };

export namespace Backdrop {
  export type State = AutocompleteBackdropState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AutocompleteBackdropProps.Render;

    export type SuruUI = AutocompleteBackdropProps.SuruUI;

    export type BaseUI = AutocompleteBackdropProps.BaseUI;

    export type HTML = AutocompleteBackdropProps.HTML;
  }
}
