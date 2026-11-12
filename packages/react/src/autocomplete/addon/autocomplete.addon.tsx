import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useInputGroupContext } from "../input-group/autocomplete.input-group.context.js";
import type { AutocompleteAddonContext } from "./autocomplete.addon.context.js";

/**
 * {@link AutocompleteAddon} の状態です。
 *
 * @template TItem 項目の型です。
 */
export type AutocompleteAddonState<TItem = any> = AutocompleteAddonContext<TItem>;

export namespace AutocompleteAddonProps {
  export type Render<TItem = any> = RenderProps<AutocompleteAddonState<TItem>>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<BaseUIComponentProps<"span", never, never>, keyof Render | keyof SuruUI>;
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
export const AutocompleteAddon: IAutocompleteAddon = (props) => {
  const ctx = useInputGroupContext();

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
          (state) => state.disabled && "sui_autocomplete_addon-disabled",
          (state) => state.touched && "sui_autocomplete_addon-touched",
          (state) => state.dirty && "sui_autocomplete_addon-dirty",
          (state) => state.valid === false && "sui_autocomplete_addon-invalid",
          (state) => state.valid === true && "sui_autocomplete_addon-valid",
          (state) => state.valid === null && "sui_autocomplete_addon-unverified",
          (state) => state.filled && "sui_autocomplete_addon-filled",
          (state) => state.focused && "sui_autocomplete_addon-focused",
          (state) => state.open && "sui_autocomplete_addon-open",
          (state) => state.readOnly && "sui_autocomplete_addon-readonly",
          (state) =>
            state.popupSide !== null &&
            `sui_autocomplete_addon-popup_side_${state.popupSide.replaceAll("-", "_")}`,
          (state) => state.listEmpty && "sui_autocomplete_addon-list_empty",
        ),
      },
    ],
    state: ctx,
    defaultTagName: "span",
  });
};

export { AutocompleteAddon as Addon };
export namespace Addon {
  export type State<TItem = any> = AutocompleteAddonState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = AutocompleteAddonProps.Render<TItem>;

    export type SuruUI = AutocompleteAddonProps.SuruUI;

    export type BaseUI = AutocompleteAddonProps.BaseUI;

    export type HTML = AutocompleteAddonProps.HTML;
  }
}
