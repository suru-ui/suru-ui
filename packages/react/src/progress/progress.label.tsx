import { Progress } from "@base-ui/react/progress";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link ProgressLabel} が持つ状態です。
 */
export type ProgressLabelState = Progress.Label.State;

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
  const { className, ...otherProps } = props;

  return (
    <Progress.Label
      {...otherProps}
      className={cn<ProgressLabelState>(
        className,
        "sui_progress_label",
        (state) => `sui_progress_label-status_${state.status}`,
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
