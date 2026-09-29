import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";
import {
  ButtonCircularProgressContext,
  useButtonCircularProgressContext,
} from "./button.circular-progress.context.js";

/**
 * {@link ButtonCircularProgressTrack} が持つ状態です。
 */
export type ButtonCircularProgressTrackState = ButtonCircularProgressContext;

export namespace ButtonCircularProgressTrackProps {
  export type Render = RenderProps<ButtonCircularProgressTrackState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"circle", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ButtonCircularProgressTrack} に渡す props です。
 */
export type ButtonCircularProgressTrackProps = ButtonCircularProgressTrackProps.Render &
  ButtonCircularProgressTrackProps.SuruUI &
  ButtonCircularProgressTrackProps.BaseUI &
  ButtonCircularProgressTrackProps.HTML;

export type IButtonCircularProgressTrack = IComponent<ButtonCircularProgressTrackProps>;

/**
 * 円形プログレスバーのトラック（背景の円弧）を描画するコンポーネントです。
 */
export const ButtonCircularProgressTrack: IButtonCircularProgressTrack =
  function SuiButtonCircularProgressTrack(props) {
    const ctx = useButtonCircularProgressContext();
    const {
      r,
      cx = "50%",
      cy = "50%",
      stroke = "currentColor",
      strokeWidth = 4,
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
          className: "sui_button_circular_progress_track",
          strokeWidth: strokeWidthCss,
        },
      ],
      state: ctx,
      defaultTagName: "circle",
    });
  };

export { ButtonCircularProgressTrack as CircularProgressTrack };

export namespace CircularProgressTrack {
  export type State = ButtonCircularProgressTrackState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ButtonCircularProgressTrackProps.Render;

    export type SuruUI = ButtonCircularProgressTrackProps.SuruUI;

    export type BaseUI = ButtonCircularProgressTrackProps.BaseUI;

    export type HTML = ButtonCircularProgressTrackProps.HTML;
  }
}
