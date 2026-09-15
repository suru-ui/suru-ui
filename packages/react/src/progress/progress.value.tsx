import { Progress } from "@base-ui/react/progress";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link ProgressValue} が持つ状態です。
 */
export type ProgressValueState = Progress.Value.State;

export namespace ProgressValueProps {
  export type Render = RenderProps<ProgressValueState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Progress.Value>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ProgressValueProps:
      "children",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Progress.Value>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ProgressValue} に渡す props です。
 */
export type ProgressValueProps = ProgressValueProps.Render &
  ProgressValueProps.SuruUI &
  ProgressValueProps.BaseUI &
  ProgressValueProps.HTML;

/**
 * 進捗の現在値を表示するコンポーネントです。
 *
 * 不確定状態では既定の表示が空になります。
 */
export const ProgressValue: IComponent<ProgressValueProps> = function SuiProgressValue(props) {
  const { className, ...otherProps } = props;

  return <Progress.Value {...otherProps} className={cn(className, "sui_progress_value")} />;
};

export { ProgressValue as Value };

export namespace Value {
  export type State = ProgressValueState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ProgressValueProps.Render;

    export type SuruUI = ProgressValueProps.SuruUI;

    export type BaseUI = ProgressValueProps.BaseUI;

    export type HTML = ProgressValueProps.HTML;
  }
}
