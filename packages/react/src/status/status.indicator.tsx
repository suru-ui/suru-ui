import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";

/**
 * {@link StatusIndicator} が持つ状態です。
 */
export type StatusIndicatorState = {};

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

/**
 * 状態を示すドットを表示するインジケーターコンポーネントです。
 */
export const StatusIndicator: IComponent<StatusIndicatorProps> = function SuiStatusIndicator(
  props,
) {
  const { "aria-hidden": ariaHidden = true, ...otherSpanProps } = props;

  return useRender({
    props: [
      otherSpanProps,
      {
        className: "sui_status_indicator",
        "aria-hidden": ariaHidden,
      },
    ],
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
