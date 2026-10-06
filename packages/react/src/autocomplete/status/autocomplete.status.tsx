import { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useAutocompleteContext } from "../root/autocomplete.root.context.js";
import { AutocompleteStatusContext } from "./autocomplete.status.context.js";

/**
 * {@link AutocompleteStatus} の状態です。
 */
export type AutocompleteStatusState = AutocompleteStatusContext;

export namespace AutocompleteStatusProps {
  export type Render = RenderProps<AutocompleteStatusState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Autocomplete.Status>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // AutocompleteStatusProps より:
      never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Autocomplete.Status>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompleteStatus} に渡す props です。
 */
export type AutocompleteStatusProps = AutocompleteStatusProps.Render &
  AutocompleteStatusProps.SuruUI &
  AutocompleteStatusProps.BaseUI &
  AutocompleteStatusProps.HTML;

export type IAutocompleteStatus = IComponent<AutocompleteStatusProps>;

/**
 * リストの状態を読み上げるための非表示の要素です。
 *
 * この要素は常に DOM にマウントされたままにしてください。内容を変更するときは、要素を出し入れするのではなく children を差し替えます。
 */
export const AutocompleteStatus: IAutocompleteStatus = function SuiAutocompleteStatus(props) {
  const ctx = useAutocompleteContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Autocomplete.Status
      {...otherProps}
      {...proxyRenderProps<Autocomplete.Status.State, AutocompleteStatusState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <AutocompleteStatusContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </AutocompleteStatusContext>
          ),
          className: cn<AutocompleteStatusState>(
            className,
            "sui_autocomplete_status",
            (state) => `sui_autocomplete_status-size_${state.size}`,
            (state) => `sui_autocomplete_status-color_${state.color}`,
            (state) => `sui_autocomplete_status-radius_${state.radius}`,
            (state) => `sui_autocomplete_status-variant_${state.variant}`,
            (state) => state.outlined && "sui_autocomplete_status-outlined",
          ),
        },
      )}
    />
  );
};

export { AutocompleteStatus as Status };

export namespace Status {
  export type State = AutocompleteStatusState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AutocompleteStatusProps.Render;

    export type SuruUI = AutocompleteStatusProps.SuruUI;

    export type BaseUI = AutocompleteStatusProps.BaseUI;

    export type HTML = AutocompleteStatusProps.HTML;
  }
}
