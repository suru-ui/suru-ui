import { Progress } from "@base-ui/react/progress";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { type ProgressContext, useProgressContext } from "../root/progress.root.context.js";

/**
 * {@link ProgressLabel} が持つ状態です。
 */
export type ProgressLabelState = Override<ProgressContext, Progress.Label.State>;

export namespace ProgressLabelProps {
  export type Render = RenderProps<ProgressLabelState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Progress.Label>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ProgressLabelProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Progress.Label>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ProgressLabel} に渡す props です。
 */
export type ProgressLabelProps = ProgressLabelProps.Render &
  ProgressLabelProps.SuruUI &
  ProgressLabelProps.BaseUI &
  ProgressLabelProps.HTML;

export type IProgressLabel = IComponent<ProgressLabelProps>;

/**
 * 進捗のラベルコンポーネントです。
 */
export const ProgressLabel: IProgressLabel = function SuiProgressLabel(props) {
  const ctx = useProgressContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Progress.Label
      {...otherProps}
      {...proxyRenderProps<Progress.Label.State, ProgressLabelState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<ProgressLabelState>(
            className,
            "sui_progress_label",
            (state) => `sui_progress_label-size_${state.size}`,
            (state) => `sui_progress_label-color_${state.color}`,
            (state) => `sui_progress_label-radius_${state.radius}`,
            (state) => `sui_progress_label-variant_${state.variant}`,
            (state) => state.outlined && "sui_progress_label-outlined",
            (state) => `sui_progress_label-status_${state.status}`,
          ),
        },
      )}
    />
  );
};

export { ProgressLabel as Label };

export namespace Label {
  export type State = ProgressLabelState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ProgressLabelProps.Render;

    export type SuruUI = ProgressLabelProps.SuruUI;

    export type BaseUI = ProgressLabelProps.BaseUI;

    export type HTML = ProgressLabelProps.HTML;
  }
}
