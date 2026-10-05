import type { RenderProps } from "../../_use-render.js";
import * as Button from "../../button/button.parts.js";
import type { IComponent } from "../../types.js";

/**
 * {@link ToggleButtonCircularProgressFill} が持つ状態です。
 */
export type ToggleButtonCircularProgressFillState = Button.CircularProgressFill.State;

export namespace ToggleButtonCircularProgressFillProps {
  export type Render = RenderProps<ToggleButtonCircularProgressFillState>;

  export type SuruUI = Button.CircularProgressFill.Props.SuruUI;

  export type BaseUI = Button.CircularProgressFill.Props.BaseUI;

  export type HTML = Button.CircularProgressFill.Props.HTML;
}

/**
 * {@link ToggleButtonCircularProgressFill} に渡す props です。
 */
export type ToggleButtonCircularProgressFillProps = ToggleButtonCircularProgressFillProps.Render &
  ToggleButtonCircularProgressFillProps.SuruUI &
  ToggleButtonCircularProgressFillProps.BaseUI &
  ToggleButtonCircularProgressFillProps.HTML;

export type IToggleButtonCircularProgressFill = IComponent<ToggleButtonCircularProgressFillProps>;

/**
 * 円形プログレスバーのフィル（進捗を表す円弧）を描画するコンポーネントです。
 */
export const ToggleButtonCircularProgressFill: IToggleButtonCircularProgressFill =
  function SuiToggleButtonCircularProgressFill(props) {
    return <Button.CircularProgressFill {...props} />;
  };

export { ToggleButtonCircularProgressFill as CircularProgressFill };

export namespace CircularProgressFill {
  export type State = ToggleButtonCircularProgressFillState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ToggleButtonCircularProgressFillProps.Render;

    export type SuruUI = ToggleButtonCircularProgressFillProps.SuruUI;

    export type BaseUI = ToggleButtonCircularProgressFillProps.BaseUI;

    export type HTML = ToggleButtonCircularProgressFillProps.HTML;
  }
}
