import { Progress } from "@base-ui/react/progress";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link ProgressIndicator} が持つ状態です。
 */
export type ProgressIndicatorState = Progress.Indicator.State;

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

/**
 * 進捗の現在値を示すインジケーターコンポーネントです。
 */
export const ProgressIndicator: IComponent<ProgressIndicatorProps> = function SuiProgressIndicator(
  props,
) {
  const { className, ...otherProps } = props;

  return <Progress.Indicator {...otherProps} className={cn(className, "sui_progress_indicator")} />;
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
