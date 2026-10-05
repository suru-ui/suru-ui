import type { RenderProps } from "../../_use-render.js";
import * as Button from "../../button/button.parts.js";
import type { IComponent } from "../../types.js";

/**
 * {@link ToggleButtonCircularProgress} が持つ状態です。
 */
export type ToggleButtonCircularProgressState = Button.CircularProgress.State;

export namespace ToggleButtonCircularProgressProps {
  export type Render = RenderProps<ToggleButtonCircularProgressState>;

  export type SuruUI = Button.CircularProgress.Props.SuruUI;

  export type BaseUI = Button.CircularProgress.Props.BaseUI;

  export type HTML = Button.CircularProgress.Props.HTML;
}

/**
 * {@link ToggleButtonCircularProgress} に渡す props です。
 */
export type ToggleButtonCircularProgressProps = ToggleButtonCircularProgressProps.Render &
  ToggleButtonCircularProgressProps.SuruUI &
  ToggleButtonCircularProgressProps.BaseUI &
  ToggleButtonCircularProgressProps.HTML;

export type IToggleButtonCircularProgress = IComponent<ToggleButtonCircularProgressProps>;

/**
 * 円形プログレスバーの SVG ルートコンポーネントです。
 */
export const ToggleButtonCircularProgress: IToggleButtonCircularProgress =
  function SuiToggleButtonCircularProgress(props) {
    return <Button.CircularProgress {...props} />;
  };

export { ToggleButtonCircularProgress as CircularProgress };

export namespace CircularProgress {
  export type State = ToggleButtonCircularProgressState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ToggleButtonCircularProgressProps.Render;

    export type SuruUI = ToggleButtonCircularProgressProps.SuruUI;

    export type BaseUI = ToggleButtonCircularProgressProps.BaseUI;

    export type HTML = ToggleButtonCircularProgressProps.HTML;
  }
}
