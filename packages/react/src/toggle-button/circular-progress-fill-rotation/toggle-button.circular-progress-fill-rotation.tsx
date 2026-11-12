import type { RenderProps } from "../../_use-render.js";
import * as Button from "../../button/button.parts.js";
import type { IComponent } from "../../types.js";

/**
 * {@link ToggleButtonCircularProgressFillRotation} が持つ状態です。
 */
export type ToggleButtonCircularProgressFillRotationState =
  Button.CircularProgressFillRotation.State;

export namespace ToggleButtonCircularProgressFillRotationProps {
  export type Render = RenderProps<ToggleButtonCircularProgressFillRotationState>;

  export type SuruUI = Button.CircularProgressFillRotation.Props.SuruUI;

  export type BaseUI = Button.CircularProgressFillRotation.Props.BaseUI;

  export type HTML = Button.CircularProgressFillRotation.Props.HTML;
}

/**
 * {@link ToggleButtonCircularProgressFillRotation} に渡す props です。
 */
export type ToggleButtonCircularProgressFillRotationProps =
  ToggleButtonCircularProgressFillRotationProps.Render &
    ToggleButtonCircularProgressFillRotationProps.SuruUI &
    ToggleButtonCircularProgressFillRotationProps.BaseUI &
    ToggleButtonCircularProgressFillRotationProps.HTML;

export type IToggleButtonCircularProgressFillRotation =
  IComponent<ToggleButtonCircularProgressFillRotationProps>;

/**
 * 不定モード時に円形プログレスバーを回転させるアニメーションコンポーネントです。
 *
 * 不定モードの場合のみ有効になります。
 */
export const ToggleButtonCircularProgressFillRotation: IToggleButtonCircularProgressFillRotation = (
  props,
) => <Button.CircularProgressFillRotation {...props} />;

export { ToggleButtonCircularProgressFillRotation as CircularProgressFillRotation };
export namespace CircularProgressFillRotation {
  export type State = ToggleButtonCircularProgressFillRotationState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ToggleButtonCircularProgressFillRotationProps.Render;

    export type SuruUI = ToggleButtonCircularProgressFillRotationProps.SuruUI;

    export type BaseUI = ToggleButtonCircularProgressFillRotationProps.BaseUI;

    export type HTML = ToggleButtonCircularProgressFillRotationProps.HTML;
  }
}
