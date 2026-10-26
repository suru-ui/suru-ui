import { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useSelectPopupContext } from "../popup/select.popup.context.js";
import { SelectScrollUpArrowContext } from "./select.scroll-up-arrow.context.js";

/**
 * {@link SelectScrollUpArrow} が持つ状態です。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectScrollUpArrowState<TValue = any> = SelectScrollUpArrowContext<TValue>;

export namespace SelectScrollUpArrowProps {
  export type Render<TValue = any> = RenderProps<SelectScrollUpArrowState<TValue>>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof BaseSelect.ScrollUpArrow>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // SelectScrollUpArrowProps より:
      "keepMounted"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseSelect.ScrollUpArrow>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SelectScrollUpArrow} に渡す props です。
 */
export type SelectScrollUpArrowProps = SelectScrollUpArrowProps.Render &
  SelectScrollUpArrowProps.SuruUI &
  SelectScrollUpArrowProps.BaseUI &
  SelectScrollUpArrowProps.HTML;

export type ISelectScrollUpArrow = IComponent<SelectScrollUpArrowProps>;

/**
 * 上方向へスクロールできることを示す要素です。
 */
export const SelectScrollUpArrow: ISelectScrollUpArrow = function SuiSelectScrollUpArrow(props) {
  const ctx = useSelectPopupContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <BaseSelect.ScrollUpArrow
      {...otherProps}
      {...proxyRenderProps<BaseSelect.ScrollUpArrow.State, SelectScrollUpArrowState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <SelectScrollUpArrowContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </SelectScrollUpArrowContext>
          ),
          className: cn<SelectScrollUpArrowState>(
            className,
            "sui_select_scroll_up_arrow",
            (state) => `sui_select_scroll_up_arrow-size_${state.size}`,
            (state) => `sui_select_scroll_up_arrow-radius_${state.radius}`,
            (state) => `sui_select_scroll_up_arrow-variant_${state.variant}`,
            (state) => state.outlined && "sui_select_scroll_up_arrow-outlined",
            (state) => state.open && "sui_select_scroll_up_arrow-open",
            (state) => state.anchorHidden && "sui_select_scroll_up_arrow-anchor_hidden",
            (state) => `sui_select_scroll_up_arrow-side_${state.side.replaceAll("-", "_")}`,
            (state) => `sui_select_scroll_up_arrow-align_${state.align}`,
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_select_scroll_up_arrow-transition_status_${state.transitionStatus}`,
          ),
        },
      )}
    />
  );
};

export { SelectScrollUpArrow as ScrollUpArrow };

export namespace ScrollUpArrow {
  export type State<TValue = any> = SelectScrollUpArrowState<TValue>;

  export type Props<TValue = any> = Props.Render<TValue> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TValue = any> = SelectScrollUpArrowProps.Render<TValue>;

    export type SuruUI = SelectScrollUpArrowProps.SuruUI;

    export type BaseUI = SelectScrollUpArrowProps.BaseUI;

    export type HTML = SelectScrollUpArrowProps.HTML;
  }
}
