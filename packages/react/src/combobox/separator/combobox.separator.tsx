// NOTE(tai-kun): いつか複合コンポーネントの方に組み込みます。

import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useComboboxGroupContext } from "../group/combobox.group.context.js";
import { useComboboxListContext } from "../list/combobox.list.context.js";
import { ComboboxSeparatorContext } from "./combobox.separator.context.js";

/**
 * {@link ComboboxSeparator} の状態です。
 *
 * @template TItem 項目の型です。
 */
export type ComboboxSeparatorState<TItem = any> = ComboboxSeparatorContext<TItem>;

export namespace ComboboxSeparatorProps {
  export type Render<TItem = any> = RenderProps<ComboboxSeparatorState<TItem>>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Combobox.Separator>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // ComboboxSeparatorProps より :
      "orientation"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Separator>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxSeparator} に渡す props です。
 */
export type ComboboxSeparatorProps = ComboboxSeparatorProps.Render &
  ComboboxSeparatorProps.SuruUI &
  ComboboxSeparatorProps.BaseUI &
  ComboboxSeparatorProps.HTML;

export type IComboboxSeparator = IComponent<ComboboxSeparatorProps>;

/** 項目やグループを区切る要素です。 */
export const ComboboxSeparator: IComboboxSeparator = (props) => {
  const listCtx = useComboboxListContext();
  const groupCtx = useComboboxGroupContext(true);
  const ctx = groupCtx ?? listCtx;
  const { style, render, className, ...otherProps } = props;

  return (
    <Combobox.Separator
      {...otherProps}
      {...proxyRenderProps<Combobox.Separator.State, ComboboxSeparatorState>(
        (state) => ({
          ...ctx,
          ...state,
        }),
        {
          style,
          render: (htmlProps, state) => (
            <ComboboxSeparatorContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </ComboboxSeparatorContext>
          ),
          className: cn<ComboboxSeparatorState>(
            className,
            "sui_combobox_separator",
            (state) => `sui_combobox_separator-size_${state.size}`,
            (state) => `sui_combobox_separator-color_${state.color}`,
            (state) => `sui_combobox_separator-radius_${state.radius}`,
            (state) => `sui_combobox_separator-variant_${state.variant}`,
            (state) => state.outlined && "sui_combobox_separator-outlined",
            (state) => state.multiple && "sui_combobox_separator-multiple",
            (state) => state.open && "sui_combobox_separator-open",
            (state) => state.empty && "sui_combobox_separator-empty",
            (state) => state.anchorHidden && "sui_combobox_separator-anchor_hidden",
            (state) => `sui_combobox_separator-side_${state.side.replaceAll("-", "_")}`,
            (state) => `sui_combobox_separator-align_${state.align}`,
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_combobox_separator-transition_status_${state.transitionStatus}`,
            (state) => `sui_combobox_separator-orientation_${state.orientation}`,
          ),
        },
      )}
    />
  );
};

export { ComboboxSeparator as Separator };
export namespace Separator {
  export type State<TItem = any> = ComboboxSeparatorState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = ComboboxSeparatorProps.Render<TItem>;

    export type SuruUI = ComboboxSeparatorProps.SuruUI;

    export type BaseUI = ComboboxSeparatorProps.BaseUI;

    export type HTML = ComboboxSeparatorProps.HTML;
  }
}
