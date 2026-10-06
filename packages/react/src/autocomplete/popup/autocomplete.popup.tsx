import { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useAutocompleteContext } from "../root/autocomplete.root.context.js";
import { AutocompletePopupContext } from "./autocomplete.popup.context.js";

/**
 * {@link AutocompletePopup} の状態です。
 */
export type AutocompletePopupState = AutocompletePopupContext;

export namespace AutocompletePopupProps {
  export type Render = RenderProps<AutocompletePopupState>;

  export type SuruUI = {
    /**
     * ポップアップに枠線を表示するかどうかを指定します。
     *
     * 省略時はコンテキストの `outlined` を使います。
     */
    outlined?: boolean | undefined;
  };

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Autocomplete.Popup>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // AutocompletePopupProps より:
      "finalFocus" | "initialFocus"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Autocomplete.Popup>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompletePopup} に渡す props です。
 */
export type AutocompletePopupProps = AutocompletePopupProps.Render &
  AutocompletePopupProps.SuruUI &
  AutocompletePopupProps.BaseUI &
  AutocompletePopupProps.HTML;

export type IAutocompletePopup = IComponent<AutocompletePopupProps>;

/**
 * 検索結果リストを表示するポップアップ要素です。
 */
export const AutocompletePopup: IAutocompletePopup = function SuiAutocompletePopup(props) {
  const ctx = useAutocompleteContext();
  const { style, render, outlined = ctx.outlined, className, ...otherProps } = props;
  return (
    <Autocomplete.Popup
      {...otherProps}
      {...proxyRenderProps<Autocomplete.Popup.State, AutocompletePopupState>(
        (state) => ({ ...ctx, outlined, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <AutocompletePopupContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </AutocompletePopupContext>
          ),
          className: cn<AutocompletePopupState>(
            className,
            "sui_autocomplete_popup",
            (state) => state.outlined && "sui_autocomplete_popup-outlined",
            (state) => `sui_autocomplete_popup-size_${state.size}`,
            (state) => `sui_autocomplete_popup-color_${state.color}`,
            (state) => `sui_autocomplete_popup-radius_${state.radius}`,
            (state) => `sui_autocomplete_popup-variant_${state.variant}`,
          ),
        },
      )}
    />
  );
};

export { AutocompletePopup as Popup };

export namespace Popup {
  export type State = AutocompletePopupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AutocompletePopupProps.Render;

    export type SuruUI = AutocompletePopupProps.SuruUI;

    export type BaseUI = AutocompletePopupProps.BaseUI;

    export type HTML = AutocompletePopupProps.HTML;
  }
}
