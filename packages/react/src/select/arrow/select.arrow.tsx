import { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useSelectContext } from "../root/select.root.context.js";
import { SelectArrowContext } from "./select.arrow.context.js";

/**
 * {@link SelectArrow} が持つ状態です。
 */
export type SelectArrowState = SelectArrowContext;

export namespace SelectArrowProps {
  export type Render = RenderProps<SelectArrowState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof BaseSelect.Arrow>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // SelectArrowProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseSelect.Arrow>,
    keyof Render | keyof SuruUI | keyof BaseUI
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

/**
 * ポップアップとトリガーをつなぐ矢印要素です。
 */
export const SelectArrow: ISelectArrow = function SuiSelectArrow(props) {
  const ctx = useSelectContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <BaseSelect.Arrow
      {...otherProps}
      {...proxyRenderProps<BaseSelect.Arrow.State, SelectArrowState>(
        (state) => ({ ...ctx, ...state }),
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
            (state) => state.open && "sui_select_arrow-open",
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
  export type State = SelectArrowState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectArrowProps.Render;

    export type SuruUI = SelectArrowProps.SuruUI;

    export type BaseUI = SelectArrowProps.BaseUI;

    export type HTML = SelectArrowProps.HTML;
  }
}
