import { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useAutocompleteContext } from "../root/autocomplete.root.context.js";
import type { AutocompletePortalContext } from "./autocomplete.portal.context.js";

/**
 * {@link AutocompletePortal} の状態です。
 */
export type AutocompletePortalState = AutocompletePortalContext;

export namespace AutocompletePortalProps {
  export type Render = RenderProps<AutocompletePortalState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Autocomplete.Portal>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // AutocompletePortalProps より:
      "container" | "keepMounted"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Autocomplete.Portal>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompletePortal} に渡す props です。
 */
export type AutocompletePortalProps = AutocompletePortalProps.Render &
  AutocompletePortalProps.SuruUI &
  AutocompletePortalProps.BaseUI &
  AutocompletePortalProps.HTML;

export type IAutocompletePortal = IComponent<AutocompletePortalProps>;

/**
 * ポップアップを DOM の別の場所へ移動する要素です。
 *
 * 既定では ポップアップを `<body>` の末尾に配置します。
 */
export const AutocompletePortal: IAutocompletePortal = function SuiAutocompletePortal(props) {
  const ctx = useAutocompleteContext();
  const {
    style,
    render,
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;

  return (
    <Autocomplete.Portal
      {...otherProps}
      {...proxyRenderProps<Autocomplete.Portal.State, AutocompletePortalState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<AutocompletePortalState>(
            className,
            "sui_autocomplete_portal",
            (state) => `sui_autocomplete_portal-size_${state.size}`,
            (state) => `sui_autocomplete_portal-radius_${state.radius}`,
            (state) => `sui_autocomplete_portal-color_${state.color}`,
            (state) => `sui_autocomplete_portal-variant_${state.variant}`,
            (state) => state.outlined && "sui_autocomplete_portal-outlined",
          ),
        },
      )}
      data-scope={dataScope}
    />
  );
};

export { AutocompletePortal as Portal };

export namespace Portal {
  export type State = AutocompletePortalState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AutocompletePortalProps.Render;

    export type SuruUI = AutocompletePortalProps.SuruUI;

    export type BaseUI = AutocompletePortalProps.BaseUI;

    export type HTML = AutocompletePortalProps.HTML;
  }
}
