import { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useSelectPopupContext } from "../popup/select.popup.context.js";
import { SelectArrowContext } from "./select.arrow.context.js";

/**
 * {@link SelectArrow} が持つ状態です。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectArrowState<TValue = any> = SelectArrowContext<TValue>;

export namespace SelectArrowProps {
  export type Render<TValue = any> = RenderProps<SelectArrowState<TValue>>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof BaseSelect.Arrow>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // SelectArrowProps より :
      never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseSelect.Arrow>,
    keyof Render | keyof SuruUI
  >;
}

/**
 * {@link SelectArrow} に渡す props です。
 */
export type SelectArrowProps = SelectArrowProps.Render &
  SelectArrowProps.SuruUI &
  SelectArrowProps.BaseUI &
  SelectArrowProps.HTML;

export type ISelectArrow = IComponent<SelectArrowProps>;

/** ポップアップとトリガーをつなぐ矢印要素です。 */
export const SelectArrow: ISelectArrow = (props) => {
  const ctx = useSelectPopupContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <BaseSelect.Arrow
      {...otherProps}
      {...proxyRenderProps<BaseSelect.Arrow.State, SelectArrowState>(
        (state) => ({
          ...ctx,
          ...state,
        }),
        {
          style,
          render: (htmlProps, state) => (
            <SelectArrowContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </SelectArrowContext>
          ),
          className: cn<SelectArrowState>(
            className,
            "sui_select_arrow",
            (state) => `sui_select_arrow-size_${state.size}`,
            (state) => `sui_select_arrow-radius_${state.radius}`,
            (state) => `sui_select_arrow-variant_${state.variant}`,
            (state) => state.outlined && "sui_select_arrow-outlined",
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_select_arrow-transition_status_${state.transitionStatus}`,
            (state) => state.open && "sui_select_arrow-open",
            (state) => state.anchorHidden && "sui_select_arrow-anchor_hidden",
            (state) => state.uncentered && "sui_select_arrow-uncentered",
            (state) => `sui_select_arrow-side_${state.side.replaceAll("-", "_")}`,
            (state) => `sui_select_arrow-align_${state.align}`,
          ),
        },
      )}
    />
  );
};

export { SelectArrow as Arrow };
export namespace Arrow {
  export type State<TValue = any> = SelectArrowState<TValue>;

  export type Props<TValue = any> = Props.Render<TValue> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TValue = any> = SelectArrowProps.Render<TValue>;

    export type SuruUI = SelectArrowProps.SuruUI;

    export type BaseUI = SelectArrowProps.BaseUI;

    export type HTML = SelectArrowProps.HTML;
  }
}
