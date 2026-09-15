import type { RenderProps } from "../_use-render.js";
import * as Button from "../button/button.parts.js";
import type { IComponent } from "../types.js";

/**
 * {@link ToggleButtonPending} が持つ状態です。
 */
export type ToggleButtonPendingState = Button.Pending.State;

export namespace ToggleButtonPendingProps {
  export type Render = RenderProps<ToggleButtonPendingState>;

  export type SuruUI = Button.Pending.Props.SuruUI;

  export type BaseUI = Button.Pending.Props.BaseUI;

  export type HTML = Button.Pending.Props.HTML;
}

/**
 * {@link ToggleButtonPending} に渡す props です。
 */
export type ToggleButtonPendingProps = ToggleButtonPendingProps.Render &
  ToggleButtonPendingProps.SuruUI &
  ToggleButtonPendingProps.BaseUI &
  ToggleButtonPendingProps.HTML;

/**
 * トグルボタンの保留状態を表示するコンポーネントです。
 *
 * 保留中のみ有効になります。
 */
export const ToggleButtonPending: IComponent<ToggleButtonPendingProps> =
  function SuiToggleButtonPending(props) {
    return <Button.Pending {...props} />;
  };

export { ToggleButtonPending as Pending };

export namespace Pending {
  export type State = ToggleButtonPendingState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ToggleButtonPendingProps.Render;

    export type SuruUI = ToggleButtonPendingProps.SuruUI;

    export type BaseUI = ToggleButtonPendingProps.BaseUI;

    export type HTML = ToggleButtonPendingProps.HTML;
  }
}
