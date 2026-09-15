import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";
import { useButtonCircularProgressContext } from "./button.circular-progress.context.js";

/**
 * {@link ButtonCircularProgressFillRotation} が持つ状態です。
 */
export type ButtonCircularProgressFillRotationState = {};

export namespace ButtonCircularProgressFillRotationProps {
  export type Render = RenderProps<ButtonCircularProgressFillRotationState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"animateTransform", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ButtonCircularProgressFillRotation} に渡す props です。
 */
export type ButtonCircularProgressFillRotationProps =
  ButtonCircularProgressFillRotationProps.Render &
    ButtonCircularProgressFillRotationProps.SuruUI &
    ButtonCircularProgressFillRotationProps.BaseUI &
    ButtonCircularProgressFillRotationProps.HTML;

/**
 * 不定モード時に円形プログレスバーを回転させるアニメーションコンポーネントです。
 *
 * 不定モードの場合のみ有効になります。
 */
export const ButtonCircularProgressFillRotation: IComponent<ButtonCircularProgressFillRotationProps> =
  function SuiButtonCircularProgressFillRotation(props) {
    const ctx = useButtonCircularProgressContext();
    const {
      dur = "0.75s",
      type = "rotate",
      values = "0;360",
      repeatCount = "indefinite",
      attributeName = "transform",
      ...otherAnimateTransformProps
    } = props;

    return useRender({
      props: [
        otherAnimateTransformProps,
        {
          dur,
          type,
          values,
          className: "sui_button_circular_progress_fill_rotation",
          repeatCount,
          attributeName,
        },
      ],
      enabled: ctx.indeterminate,
      defaultTagName: "animateTransform",
    });
  };

export { ButtonCircularProgressFillRotation as CircularProgressFillRotation };

export namespace CircularProgressFillRotation {
  export type State = ButtonCircularProgressFillRotationState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ButtonCircularProgressFillRotationProps.Render;

    export type SuruUI = ButtonCircularProgressFillRotationProps.SuruUI;

    export type BaseUI = ButtonCircularProgressFillRotationProps.BaseUI;

    export type HTML = ButtonCircularProgressFillRotationProps.HTML;
  }
}
