import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import * as Card from "../card/card.parts.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import {
  type AlertDialogPopupContext,
  useAlertDialogPopupContext,
} from "./alert-dialog.popup.context.js";

/**
 * {@link AlertDialogAction} が持つ状態です。
 */
export type AlertDialogActionState = Override<Card.Action.State, AlertDialogPopupContext>;

export namespace AlertDialogActionProps {
  export type Render = RenderProps<AlertDialogActionState>;

  export type SuruUI = Card.Action.Props.SuruUI;

  export type BaseUI = Card.Action.Props.BaseUI;

  export type HTML = Card.Action.Props.HTML;
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
  const ctx = useAlertDialogPopupContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Card.Action
      {...otherProps}
      {...proxyRenderProps<Card.Action.State, AlertDialogActionState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<AlertDialogActionState>(className, "sui_alert_dialog_action"),
        },
      )}
    />
  );
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
