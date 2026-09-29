import type { RenderProps } from "../_use-render.js";
import * as Card from "../card/card.parts.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link AlertDialogAction} が持つ状態です。
 */
export type AlertDialogActionState = Card.CardActionState;

export namespace AlertDialogActionProps {
  export type Render = RenderProps<AlertDialogActionState>;

  export type SuruUI = Card.CardActionProps.SuruUI;

  export type BaseUI = Card.CardActionProps.BaseUI;

  export type HTML = Card.CardActionProps.HTML;
}

/**
 * {@link AlertDialogAction} に渡す props です。
 */
export type AlertDialogActionProps = AlertDialogActionProps.Render &
  AlertDialogActionProps.SuruUI &
  AlertDialogActionProps.BaseUI &
  AlertDialogActionProps.HTML;

export type IAlertDialogAction = IComponent<AlertDialogActionProps>;

/**
 * アラートダイアログのヘッダー右上に操作要素を配置するコンポーネントです。
 *
 * 積み上げ式では右上へ重ねて配置します。
 */
export const AlertDialogAction: IAlertDialogAction = function SuiAlertDialogAction(props) {
  return <Card.Action {...props} className={cn(props.className, "sui_alert_dialog_action")} />;
};

export { AlertDialogAction as Action };

export namespace Action {
  export type State = AlertDialogActionState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AlertDialogActionProps.Render;

    export type SuruUI = AlertDialogActionProps.SuruUI;

    export type BaseUI = AlertDialogActionProps.BaseUI;

    export type HTML = AlertDialogActionProps.HTML;
  }
}
