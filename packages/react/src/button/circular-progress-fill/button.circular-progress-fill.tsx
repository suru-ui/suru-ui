import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import {
  ButtonCircularProgressContext,
  useButtonCircularProgressContext,
} from "../circular-progress/button.circular-progress.context.js";

/**
 * {@link ButtonCircularProgressFill} が持つ状態です。
 */
export type ButtonCircularProgressFillState = ButtonCircularProgressContext;

export namespace ButtonCircularProgressFillProps {
  export type Render = RenderProps<ButtonCircularProgressFillState>;

  export type SuruUI = {
    /**
     * 円弧の開始位置のずれです。
     *
     * 関数の場合は現在の状態から値を求めます。
     *
     * @see https://developer.mozilla.org/docs/Web/SVG/Reference/Attribute/stroke-dashoffset
     */
    strokeDashoffset?:
      | string
      | number
      | ((state: ButtonCircularProgressFillState) => string | number | undefined)
      | undefined;
  };

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"circle", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ButtonCircularProgressFill} に渡す props です。
 */
export type ButtonCircularProgressFillProps = ButtonCircularProgressFillProps.Render &
  ButtonCircularProgressFillProps.SuruUI &
  ButtonCircularProgressFillProps.BaseUI &
  ButtonCircularProgressFillProps.HTML;

export type IButtonCircularProgressFill = IComponent<ButtonCircularProgressFillProps>;

/**
 * 円形プログレスバーのフィル（進捗を表す円弧）を描画するコンポーネントです。
 */
export const ButtonCircularProgressFill: IButtonCircularProgressFill =
  function SuiButtonCircularProgressFill(props) {
    const ctx = useButtonCircularProgressContext();
    const {
      r,
      cx = "50%",
      cy = "50%",
      stroke = "currentColor",
      pathLength = "100",
      strokeWidth = 4,
      strokeLinecap = "round",
      strokeDasharray = "100 200",
      strokeDashoffset = (state) =>
        100 - (state.indeterminate || state.percentage === undefined ? 25 : state.percentage),
      ...otherCircleProps
    } = props;
    const strokeWidthCss = typeof strokeWidth === "number" ? strokeWidth + "px" : strokeWidth;

    return useRender({
      props: [
        otherCircleProps,
        {
          r: r ?? `calc(50% - ${strokeWidthCss} / 2)`,
          cx,
          cy,
          stroke,
          className: cn<ButtonCircularProgressFillState>(
            "sui_button_circular_progress_fill",
            (state) => state.indeterminate && "sui_button_circular_progress_fill-indeterminate",
          ),
          pathLength,
          strokeWidth: strokeWidthCss,
          strokeLinecap,
          strokeDasharray,
          strokeDashoffset:
            typeof strokeDashoffset === "function" ? strokeDashoffset(ctx) : strokeDashoffset,
        },
      ],
      state: ctx,
      defaultTagName: "circle",
    });
  };

export { ButtonCircularProgressFill as CircularProgressFill };

export namespace CircularProgressFill {
  export type State = ButtonCircularProgressFillState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ButtonCircularProgressFillProps.Render;

    export type SuruUI = ButtonCircularProgressFillProps.SuruUI;

    export type BaseUI = ButtonCircularProgressFillProps.BaseUI;

    export type HTML = ButtonCircularProgressFillProps.HTML;
  }
}
