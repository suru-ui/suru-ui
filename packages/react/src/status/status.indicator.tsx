import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { useStatusContext } from "./status.context.js";
import type { StatusRootState } from "./status.root.jsx";

/**
 * {@link StatusIndicator} が持つ状態です。
 */
export type StatusIndicatorState = StatusRootState;

export namespace StatusIndicatorProps {
  export type Render = RenderProps<StatusIndicatorState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"span", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link StatusIndicator} に渡す props です。
 */
export type StatusIndicatorProps = StatusIndicatorProps.Render &
  StatusIndicatorProps.SuruUI &
  StatusIndicatorProps.BaseUI &
  StatusIndicatorProps.HTML;

export type IStatusIndicator = IComponent<StatusIndicatorProps>;

/**
 * 状態を示すドットを表示するインジケーターコンポーネントです。
 */
export const StatusIndicator: IStatusIndicator = function SuiStatusIndicator(props) {
  const ctx = useStatusContext();
  const { "aria-hidden": ariaHidden = true, ...otherSpanProps } = props;

  return useRender({
    props: [
      otherSpanProps,
      {
        className: cn<StatusIndicatorState>(
          "sui_status_indicator",
          (state) => `sui_status_indicator-size_${state.size}`,
          (state) => `sui_status_indicator-color_${state.color}`,
          (state) => `sui_status_indicator-ripple_size_${state.rippleSize}`,
          (state) => state.ping && "sui_status_indicator-ping",
          (state) => state.containRipple && "sui_status_indicator-contain_ripple",
        ),
        "aria-hidden": ariaHidden,
      },
    ],
    state: ctx,
    defaultTagName: "span",
  });
};

export { StatusIndicator as Indicator };

export namespace Indicator {
  export type State = StatusIndicatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = StatusIndicatorProps.Render;

    export type SuruUI = StatusIndicatorProps.SuruUI;

    export type BaseUI = StatusIndicatorProps.BaseUI;

    export type HTML = StatusIndicatorProps.HTML;
  }
}
