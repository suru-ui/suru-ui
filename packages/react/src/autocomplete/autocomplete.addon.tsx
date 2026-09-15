import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";

/**
 * {@link AutocompleteAddon} の状態です。
 */
export type AutocompleteAddonState = {};

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
 * {@link AutocompleteAddon} に渡すプロパティーです。
 */
export type AutocompleteAddonProps = AutocompleteAddonProps.Render &
  AutocompleteAddonProps.SuruUI &
  AutocompleteAddonProps.BaseUI &
  AutocompleteAddonProps.HTML;

/**
 * 入力欄の左右に表示する補助コンポーネントです。
 *
 * 接頭辞、接尾辞、アイコンなどを表示できます。
 */
export const AutocompleteAddon: IComponent<AutocompleteAddonProps> = function SuiAutocompleteAddon(
  props,
) {
  return useRender({
    props: [
      props,
      {
        className: "sui_autocomplete_addon",
      },
    ],
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
