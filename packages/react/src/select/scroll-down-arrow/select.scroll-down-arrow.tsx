import { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useSelectPopupContext } from "../popup/select.popup.context.js";
import { SelectScrollDownArrowContext } from "./select.scroll-down-arrow.context.js";

/**
 * {@link SelectScrollDownArrow} が持つ状態です。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectScrollDownArrowState<TValue = any> = SelectScrollDownArrowContext<TValue>;

export namespace SelectScrollDownArrowProps {
  export type Render<TValue = any> = RenderProps<SelectScrollDownArrowState<TValue>>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof BaseSelect.ScrollDownArrow>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // SelectScrollDownArrowProps より:
      "keepMounted"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseSelect.ScrollDownArrow>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SelectScrollDownArrow} に渡す props です。
 */
export type SelectScrollDownArrowProps = SelectScrollDownArrowProps.Render &
  SelectScrollDownArrowProps.SuruUI &
  SelectScrollDownArrowProps.BaseUI &
  SelectScrollDownArrowProps.HTML;

export type ISelectScrollDownArrow = IComponent<SelectScrollDownArrowProps>;

/**
 * 下方向へスクロールできることを示す要素です。
 */
export const SelectScrollDownArrow: ISelectScrollDownArrow = function SuiSelectScrollDownArrow(
  props,
) {
  const ctx = useSelectPopupContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <BaseSelect.ScrollDownArrow
      {...otherProps}
      {...proxyRenderProps<BaseSelect.ScrollDownArrow.State, SelectScrollDownArrowState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <SelectScrollDownArrowContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </SelectScrollDownArrowContext>
          ),
          className: cn<SelectScrollDownArrowState>(
            className,
            "sui_select_scroll_down_arrow",
            (state) => `sui_select_scroll_down_arrow-size_${state.size}`,
            (state) => `sui_select_scroll_down_arrow-radius_${state.radius}`,
            (state) => `sui_select_scroll_down_arrow-variant_${state.variant}`,
            (state) => state.outlined && "sui_select_scroll_down_arrow-outlined",
            (state) => state.open && "sui_select_scroll_down_arrow-open",
            (state) => state.anchorHidden && "sui_select_scroll_down_arrow-anchor_hidden",
            (state) => `sui_select_scroll_down_arrow-side_${state.side.replaceAll("-", "_")}`,
            (state) => `sui_select_scroll_down_arrow-align_${state.align}`,
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_select_scroll_down_arrow-transition_status_${state.transitionStatus}`,
          ),
        },
      )}
    />
  );
};

export { SelectScrollDownArrow as ScrollDownArrow };

export namespace ScrollDownArrow {
  export type State<TValue = any> = SelectScrollDownArrowState<TValue>;

  export type Props<TValue = any> = Props.Render<TValue> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TValue = any> = SelectScrollDownArrowProps.Render<TValue>;

    export type SuruUI = SelectScrollDownArrowProps.SuruUI;

    export type BaseUI = SelectScrollDownArrowProps.BaseUI;

    export type HTML = SelectScrollDownArrowProps.HTML;
  }
}
