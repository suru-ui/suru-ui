import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useButtonCircularProgressContext } from "../circular-progress/button.circular-progress.context.js";
import type { ButtonCircularProgressTrackContext } from "./button.circular-progress-track.context.js";

/**
 * {@link ButtonCircularProgressTrack} が持つ状態です。
 */
export type ButtonCircularProgressTrackState = ButtonCircularProgressTrackContext;

export namespace ButtonCircularProgressTrackProps {
  export type Render = RenderProps<ButtonCircularProgressTrackState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"circle", never, never>,
    keyof Render | keyof SuruUI
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

/** 円形プログレスバーのトラック（背景の円弧）を描画するコンポーネントです。 */
export const ButtonCircularProgressTrack: IButtonCircularProgressTrack = (props) => {
  const ctx = useButtonCircularProgressContext();
  const {
    r,
    cx = "50%",
    cy = "50%",
    stroke = "currentColor",
    strokeWidth = 4,
    ...otherCircleProps
  } = props;
  const strokeWidthCss = typeof strokeWidth === "number" ? `${strokeWidth}px` : strokeWidth;

  return useRender({
    props: [
      otherCircleProps,
      {
        r: r ?? `calc(50% - ${strokeWidthCss} / 2)`,
        cx,
        cy,
        stroke,
        className: cn<ButtonCircularProgressTrackState>(
          "sui_button_circular_progress_track",
          (state) => state.indeterminate && "sui_button_circular_progress_track-indeterminate",
        ),
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
