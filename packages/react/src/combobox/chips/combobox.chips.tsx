import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useComboboxInputGroupContext } from "../input-group/combobox.input-group.context.js";
import { ComboboxChipsContext } from "./combobox.chips.context.js";

/**
 * {@link ComboboxChips} の状態です。
 *
 * @template TItem 項目の型です。
 */
export type ComboboxChipsState<TItem = any> = ComboboxChipsContext<TItem>;

export namespace ComboboxChipsProps {
  export type Render<TItem = any> = RenderProps<ComboboxChipsState<TItem>>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Combobox.Chips>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // ComboboxChipsProps より :
      never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<React.ComponentProps<typeof Combobox.Chips>, keyof Render | keyof SuruUI>;
}

/**
 * {@link ComboboxChips} に渡す props です。
 */
export type ComboboxChipsProps = ComboboxChipsProps.Render &
  ComboboxChipsProps.SuruUI &
  ComboboxChipsProps.BaseUI &
  ComboboxChipsProps.HTML;

export type IComboboxChips = IComponent<ComboboxChipsProps>;

/** 複数選択した値を表示するチップのコンテナーです。 */
export const ComboboxChips: IComboboxChips = (props) => {
  const ctx = useComboboxInputGroupContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Combobox.Chips
      {...otherProps}
      {...proxyRenderProps<Combobox.Chips.State, ComboboxChipsState>(
        (state) => ({
          ...ctx,
          ...state,
        }),
        {
          style,
          render: (htmlProps, state) => (
            <ComboboxChipsContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </ComboboxChipsContext>
          ),
          className: cn<ComboboxChipsState>(
            className,
            "sui_combobox_chips",
            (state) => `sui_combobox_chips-size_${state.size}`,
            (state) => `sui_combobox_chips-color_${state.color}`,
            (state) => `sui_combobox_chips-radius_${state.radius}`,
            (state) => `sui_combobox_chips-variant_${state.variant}`,
            (state) => state.outlined && "sui_combobox_chips-outlined",
            (state) => state.multiple && "sui_combobox_chips-multiple",
            (state) => state.disabled && "sui_combobox_chips-disabled",
            (state) => state.touched && "sui_combobox_chips-touched",
            (state) => state.dirty && "sui_combobox_chips-dirty",
            (state) => state.valid === false && "sui_combobox_chips-invalid",
            (state) => state.valid === true && "sui_combobox_chips-valid",
            (state) => state.valid === null && "sui_combobox_chips-unverified",
            (state) => state.filled && "sui_combobox_chips-filled",
            (state) => state.focused && "sui_combobox_chips-focused",
            (state) => state.open && "sui_combobox_chips-open",
            (state) => state.readOnly && "sui_combobox_chips-readonly",
            (state) =>
              state.popupSide !== null &&
              `sui_combobox_chips-popup_side_${state.popupSide.replaceAll("-", "_")}`,
            (state) => state.listEmpty && "sui_combobox_chips-list_empty",
            (state) => state.placeholder && "sui_combobox_chips-placeholder",
          ),
        },
      )}
    />
  );
};

export { ComboboxChips as Chips };
export namespace Chips {
  export type State<TItem = any> = ComboboxChipsState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = ComboboxChipsProps.Render<TItem>;

    export type SuruUI = ComboboxChipsProps.SuruUI;

    export type BaseUI = ComboboxChipsProps.BaseUI;

    export type HTML = ComboboxChipsProps.HTML;
  }
}
