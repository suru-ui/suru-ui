import { Autocomplete } from "@base-ui/react/autocomplete";
import type { NativeButtonProps } from "@base-ui/react/internals/types";
import * as React from "react";

import { ClearIcon } from "../../_icons.jsx";
import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useAutocompleteAddonContext } from "../addon/autocomplete.addon.context.js";
import { AutocompleteClearContext } from "./autocomplete.clear.context.js";

/**
 * {@link AutocompleteClear} の状態です。
 *
 * @template TItem 項目の型です。
 */
export type AutocompleteClearState<TItem = any> = AutocompleteClearContext<TItem>;

export namespace AutocompleteClearProps {
  export type Render<TItem = any> = RenderProps<AutocompleteClearState<TItem>>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Autocomplete.Clear>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // NativeButtonProps より:
      | keyof NativeButtonProps
      // ComboboxClearProps より:
      | "disabled"
      | "keepMounted"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Autocomplete.Clear>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AutocompleteClear} に渡す props です。
 */
export type AutocompleteClearProps = AutocompleteClearProps.Render &
  AutocompleteClearProps.SuruUI &
  AutocompleteClearProps.BaseUI &
  AutocompleteClearProps.HTML;

export type IAutocompleteClear = IComponent<AutocompleteClearProps>;

/**
 * 入力値を消去するボタン要素です。
 *
 * 入力値があるときだけ表示されます。
 */
export const AutocompleteClear: IAutocompleteClear = function SuiAutocompleteClear(props) {
  const ctx = useAutocompleteAddonContext();
  const {
    style,
    render,
    children = <ClearIcon />,
    className,
    "aria-label": ariaLabel = "入力値を消去",
    ...otherProps
  } = props;

  return (
    <Autocomplete.Clear
      {...otherProps}
      {...proxyRenderProps<Autocomplete.Clear.State, AutocompleteClearState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <AutocompleteClearContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="button"
              />
            </AutocompleteClearContext>
          ),
          className: cn<AutocompleteClearState>(
            className,
            "sui_autocomplete_clear",
            (state) => `sui_autocomplete_clear-size_${state.size}`,
            (state) => `sui_autocomplete_clear-color_${state.color}`,
            (state) => `sui_autocomplete_clear-radius_${state.radius}`,
            (state) => `sui_autocomplete_clear-variant_${state.variant}`,
            (state) => state.outlined && "sui_autocomplete_clear-outlined",
            (state) => state.disabled && "sui_autocomplete_clear-disabled",
            (state) => state.touched && "sui_autocomplete_clear-touched",
            (state) => state.dirty && "sui_autocomplete_clear-dirty",
            (state) => state.valid === false && "sui_autocomplete_clear-invalid",
            (state) => state.valid === true && "sui_autocomplete_clear-valid",
            (state) => state.valid === null && "sui_autocomplete_clear-unverified",
            (state) => state.filled && "sui_autocomplete_clear-filled",
            (state) => state.focused && "sui_autocomplete_clear-focused",
            (state) => state.open && "sui_autocomplete_clear-open",
            (state) => state.readOnly && "sui_autocomplete_clear-readonly",
            (state) =>
              state.popupSide !== null &&
              `sui_autocomplete_clear-popup_side_${state.popupSide.replaceAll("-", "_")}`,
            (state) => state.listEmpty && "sui_autocomplete_clear-list_empty",
            (state) => state.visible && "sui_autocomplete_clear-visible",
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_autocomplete_clear-transition_status_${state.transitionStatus}`,
          ),
        },
      )}
      aria-label={ariaLabel}
    >
      {children}
    </Autocomplete.Clear>
  );
};

export { AutocompleteClear as Clear };

export namespace Clear {
  export type State<TItem = any> = AutocompleteClearState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = AutocompleteClearProps.Render<TItem>;

    export type SuruUI = AutocompleteClearProps.SuruUI;

    export type BaseUI = AutocompleteClearProps.BaseUI;

    export type HTML = AutocompleteClearProps.HTML;
  }
}
