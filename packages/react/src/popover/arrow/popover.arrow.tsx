import { Popover } from "@base-ui/react/popover";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { usePopoverContext } from "../root/popover.root.context.js";
import { PopoverArrowContext } from "./popover.arrow.context.js";

/**
 * {@link PopoverArrow} が持つ状態です。
 */
export type PopoverArrowState = PopoverArrowContext;

export namespace PopoverArrowProps {
  export type Render = RenderProps<PopoverArrowState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Popover.Arrow>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // PopoverArrowProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Popover.Arrow>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link PopoverArrow} に渡す props です。
 */
export type PopoverArrowProps = PopoverArrowProps.Render &
  PopoverArrowProps.SuruUI &
  PopoverArrowProps.BaseUI &
  PopoverArrowProps.HTML;

export type IPopoverArrow = IComponent<PopoverArrowProps>;

/**
 * ポップアップとトリガーをつなぐ矢印要素です。
 */
export const PopoverArrow: IPopoverArrow = function SuiPopoverArrow(props) {
  const ctx = usePopoverContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Popover.Arrow
      {...otherProps}
      {...proxyRenderProps<Popover.Arrow.State, PopoverArrowState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <PopoverArrowContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </PopoverArrowContext>
          ),
          className: cn<PopoverArrowState>(
            className,
            "sui_popover_arrow",
            (state) => `sui_popover_arrow-side_${state.side.replaceAll("-", "_")}`,
            (state) => `sui_popover_arrow-size_${state.size}`,
            (state) => `sui_popover_arrow-radius_${state.radius}`,
            (state) => state.outlined && "sui_popover_arrow-outlined",
            (state) => state.open && "sui_popover_arrow-open",
            (state) => state.uncentered && "sui_popover_arrow-uncentered",
            (state) => `sui_popover_arrow-align_${state.align}`,
          ),
        },
      )}
    />
  );
};

export { PopoverArrow as Arrow };

export namespace Arrow {
  export type State = PopoverArrowState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = PopoverArrowProps.Render;

    export type SuruUI = PopoverArrowProps.SuruUI;

    export type BaseUI = PopoverArrowProps.BaseUI;

    export type HTML = PopoverArrowProps.HTML;
  }
}
