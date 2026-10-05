import type { RenderProps } from "../../_use-render.js";
import * as Button from "../../button/button.parts.js";
import type { IComponent } from "../../types.js";

/**
 * {@link ToggleButtonCircularProgressTrack} が持つ状態です。
 */
export type ToggleButtonCircularProgressTrackState = Button.CircularProgressTrack.State;

export namespace ToggleButtonCircularProgressTrackProps {
  export type Render = RenderProps<ToggleButtonCircularProgressTrackState>;

  export type SuruUI = Button.CircularProgressTrack.Props.SuruUI;

  export type BaseUI = Button.CircularProgressTrack.Props.BaseUI;

  export type HTML = Button.CircularProgressTrack.Props.HTML;
}

/**
 * {@link ToggleButtonCircularProgressTrack} に渡す props です。
 */
export type ToggleButtonCircularProgressTrackProps = ToggleButtonCircularProgressTrackProps.Render &
  ToggleButtonCircularProgressTrackProps.SuruUI &
  ToggleButtonCircularProgressTrackProps.BaseUI &
  ToggleButtonCircularProgressTrackProps.HTML;

export type IToggleButtonCircularProgressTrack = IComponent<ToggleButtonCircularProgressTrackProps>;

/**
 * 円形プログレスバーのトラック（背景の円弧）を描画するコンポーネントです。
 */
export const ToggleButtonCircularProgressTrack: IToggleButtonCircularProgressTrack =
  function SuiToggleButtonCircularProgressTrack(props) {
    return <Button.CircularProgressTrack {...props} />;
  };

export { ToggleButtonCircularProgressTrack as CircularProgressTrack };

export namespace CircularProgressTrack {
  export type State = ToggleButtonCircularProgressTrackState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ToggleButtonCircularProgressTrackProps.Render;

    export type SuruUI = ToggleButtonCircularProgressTrackProps.SuruUI;

    export type BaseUI = ToggleButtonCircularProgressTrackProps.BaseUI;

    export type HTML = ToggleButtonCircularProgressTrackProps.HTML;
  }
}
