import { Progress } from "@base-ui/react/progress";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { type ProgressContext, useProgressContext } from "../root/progress.root.context.js";

/**
 * {@link ProgressIndicator} が持つ状態です。
 */
export type ProgressIndicatorState = Override<ProgressContext, Progress.Indicator.State>;

export namespace ProgressIndicatorProps {
  export type Render = RenderProps<ProgressIndicatorState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Progress.Indicator>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ProgressIndicatorProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Progress.Indicator>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ProgressIndicator} に渡す props です。
 */
export type ProgressIndicatorProps = ProgressIndicatorProps.Render &
  ProgressIndicatorProps.SuruUI &
  ProgressIndicatorProps.BaseUI &
  ProgressIndicatorProps.HTML;

export type IProgressIndicator = IComponent<ProgressIndicatorProps>;

/**
 * 進捗の現在値を示すインジケーターコンポーネントです。
 */
export const ProgressIndicator: IProgressIndicator = function SuiProgressIndicator(props) {
  const ctx = useProgressContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Progress.Indicator
      {...otherProps}
      {...proxyRenderProps<Progress.Indicator.State, ProgressIndicatorState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<ProgressIndicatorState>(
            className,
            "sui_progress_indicator",
            (state) => `sui_progress_indicator-size_${state.size}`,
            (state) => `sui_progress_indicator-color_${state.color}`,
            (state) => `sui_progress_indicator-radius_${state.radius}`,
            (state) => `sui_progress_indicator-variant_${state.variant}`,
            (state) => state.outlined && "sui_progress_indicator-outlined",
            (state) => `sui_progress_indicator-status_${state.status}`,
          ),
        },
      )}
    />
  );
};

export { ProgressIndicator as Indicator };

export namespace Indicator {
  export type State = ProgressIndicatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ProgressIndicatorProps.Render;

    export type SuruUI = ProgressIndicatorProps.SuruUI;

    export type BaseUI = ProgressIndicatorProps.BaseUI;

    export type HTML = ProgressIndicatorProps.HTML;
  }
}
