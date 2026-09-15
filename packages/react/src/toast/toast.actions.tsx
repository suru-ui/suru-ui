import type { RenderProps } from "../_use-render.js";
import * as Alert from "../alert/alert.parts.js";
import type { IComponent } from "../types.js";

/**
 * {@link ToastActions} が持つ状態です。
 */
export type ToastActionsState = Alert.Actions.State;

export namespace ToastActionsProps {
  export type Render = RenderProps<ToastActionsState>;

  export type SuruUI = Alert.Actions.Props.SuruUI;

  export type BaseUI = Alert.Actions.Props.BaseUI;

  export type HTML = Alert.Actions.Props.HTML;
}

/**
 * {@link ToastActions} に渡す props です。
 */
export type ToastActionsProps = ToastActionsProps.Render &
  ToastActionsProps.SuruUI &
  ToastActionsProps.BaseUI &
  ToastActionsProps.HTML;

/**
 * 通知の操作ボタンを右寄せでまとめるコンポーネントです。
 */
export const ToastActions: IComponent<ToastActionsProps> = function SuiToastActions(props) {
  return <Alert.Actions {...props} />;
};

export { ToastActions as Actions };

export namespace Actions {
  export type State = ToastActionsState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ToastActionsProps.Render;

    export type SuruUI = ToastActionsProps.SuruUI;

    export type BaseUI = ToastActionsProps.BaseUI;

    export type HTML = ToastActionsProps.HTML;
  }
}
