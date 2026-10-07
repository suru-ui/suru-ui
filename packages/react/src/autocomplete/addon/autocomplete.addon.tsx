import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useAutocompleteInputGroupContext } from "../input-group/autocomplete.input-group.context.js";
import type { AutocompleteAddonContext } from "./autocomplete.addon.context.js";

/**
 * {@link AutocompleteAddon} の状態です。
 */
export type AutocompleteAddonState = AutocompleteAddonContext;

export namespace AutocompleteAddonProps {
  export type Render = RenderProps<AutocompleteAddonState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"span", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompleteAddon} に渡す props です。
 */
export type AutocompleteAddonProps = AutocompleteAddonProps.Render &
  AutocompleteAddonProps.SuruUI &
  AutocompleteAddonProps.BaseUI &
  AutocompleteAddonProps.HTML;

export type IAutocompleteAddon = IComponent<AutocompleteAddonProps>;

/**
 * 入力欄の左右に表示する補助コンポーネントです。
 *
 * 接頭辞、接尾辞、アイコンなどを表示できます。
 */
export const AutocompleteAddon: IAutocompleteAddon = function SuiAutocompleteAddon(props) {
  const ctx = useAutocompleteInputGroupContext();

  return useRender({
    props: [
      props,
      {
        className: cn<AutocompleteAddonState>(
          "sui_autocomplete_addon",
          (state) => `sui_autocomplete_addon-size_${state.size}`,
          (state) => `sui_autocomplete_addon-color_${state.color}`,
          (state) => `sui_autocomplete_addon-radius_${state.radius}`,
          (state) => `sui_autocomplete_addon-variant_${state.variant}`,
          (state) => state.outlined && "sui_autocomplete_addon-outlined",
        ),
      },
    ],
    state: ctx,
    defaultTagName: "span",
  });
};

export { AutocompleteAddon as Addon };

export namespace Addon {
  export type State = AutocompleteAddonState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AutocompleteAddonProps.Render;

    export type SuruUI = AutocompleteAddonProps.SuruUI;

    export type BaseUI = AutocompleteAddonProps.BaseUI;

    export type HTML = AutocompleteAddonProps.HTML;
  }
}
