import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useComboboxPopupContext } from "../popup/combobox.popup.context.js";
import { ComboboxArrowContext } from "./combobox.arrow.context.js";

/**
 * {@link ComboboxArrow} の状態です。
 *
 * @template TItem 項目の型です。
 */
export type ComboboxArrowState<TItem = any> = ComboboxArrowContext<TItem>;

export namespace ComboboxArrowProps {
  export type Render<TItem = any> = RenderProps<ComboboxArrowState<TItem>>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Combobox.Arrow>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // ComboboxArrowProps より :
      never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<React.ComponentProps<typeof Combobox.Arrow>, keyof Render | keyof SuruUI>;
}

/**
 * {@link ComboboxArrow} に渡す props です。
 */
export type ComboboxArrowProps = ComboboxArrowProps.Render &
  ComboboxArrowProps.SuruUI &
  ComboboxArrowProps.BaseUI &
  ComboboxArrowProps.HTML;

export type IComboboxArrow = IComponent<ComboboxArrowProps>;

/** ポップアップと入力欄をつなぐ矢印要素です。 */
export const ComboboxArrow: IComboboxArrow = (props) => {
  const ctx = useComboboxPopupContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Combobox.Arrow
      {...otherProps}
      {...proxyRenderProps<Combobox.Arrow.State, ComboboxArrowState>(
        (state) => ({
          ...ctx,
          ...state,
        }),
        {
          style,
          render: (htmlProps, state) => (
            <ComboboxArrowContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </ComboboxArrowContext>
          ),
          className: cn<ComboboxArrowState>(
            className,
            "sui_combobox_arrow",
            (state) => `sui_combobox_arrow-side_${state.side.replaceAll("-", "_")}`,
            (state) => `sui_combobox_arrow-size_${state.size}`,
            (state) => `sui_combobox_arrow-color_${state.color}`,
            (state) => `sui_combobox_arrow-radius_${state.radius}`,
            (state) => `sui_combobox_arrow-variant_${state.variant}`,
            (state) => state.outlined && "sui_combobox_arrow-outlined",
            (state) => state.multiple && "sui_combobox_arrow-multiple",
            (state) => state.open && "sui_combobox_arrow-open",
            (state) => state.uncentered && "sui_combobox_arrow-uncentered",
            (state) => `sui_combobox_arrow-align_${state.align}`,
            (state) => state.anchorHidden && "sui_combobox_arrow-anchor_hidden",
            (state) => state.empty && "sui_combobox_arrow-empty",
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_combobox_arrow-transition_status_${state.transitionStatus}`,
          ),
        },
      )}
    />
  );
};

export { ComboboxArrow as Arrow };
export namespace Arrow {
  export type State<TItem = any> = ComboboxArrowState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = ComboboxArrowProps.Render<TItem>;

    export type SuruUI = ComboboxArrowProps.SuruUI;

    export type BaseUI = ComboboxArrowProps.BaseUI;

    export type HTML = ComboboxArrowProps.HTML;
  }
}
