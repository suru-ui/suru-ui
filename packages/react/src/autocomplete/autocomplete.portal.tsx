import { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { useAutocompleteContext } from "./autocomplete.context.js";

/**
 * {@link AutocompletePortal} の状態です。
 */
export type AutocompletePortalState = Autocomplete.Portal.State;

export namespace AutocompletePortalProps {
  export type Render = RenderProps<AutocompletePortalState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Autocomplete.Portal>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxPortalProps:
      "container" | "keepMounted",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Autocomplete.Portal>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompletePortal} に渡すプロパティーです。
 */
export type AutocompletePortalProps = AutocompletePortalProps.Render &
  AutocompletePortalProps.SuruUI &
  AutocompletePortalProps.BaseUI &
  AutocompletePortalProps.HTML;

/**
 * ポップアップを DOM の別の場所へ移動する要素です。
 *
 * 既定では ポップアップを `<body>` の末尾に配置します。
 */
export const AutocompletePortal: IComponent<AutocompletePortalProps> =
  function SuiAutocompletePortal(props) {
    const { size, radius } = useAutocompleteContext();
    const {
      className,
      // @ts-expect-error
      "data-scope": dataScope = "",
      ...otherProps
    } = props;

    return (
      <Autocomplete.Portal
        {...otherProps}
        className={cn(
          className,
          "sui_autocomplete_portal",
          `sui_autocomplete_portal-size_${size}`,
          `sui_autocomplete_portal-radius_${radius}`,
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
