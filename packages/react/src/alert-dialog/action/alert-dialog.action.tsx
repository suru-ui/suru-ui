import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import * as Card from "../../card/card.parts.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useAlertDialogPopupContext } from "../popup/alert-dialog.popup.context.js";
import { AlertDialogActionContext } from "./alert-dialog.action.context.js";

/**
 * {@link AlertDialogAction} が持つ状態です。
 */
export type AlertDialogActionState = AlertDialogActionContext;

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
export const AlertDialogAction: IAlertDialogAction = (props) => {
  const ctx = useAlertDialogPopupContext();
  const { style, render, absolute = ctx.variant === "stacked", className, ...otherProps } = props;

  return (
    <Card.Action
      {...otherProps}
      {...proxyRenderProps<Card.Action.State, AlertDialogActionState>(
        (state) => ({
          ...ctx,
          ...state,
        }),
        {
          style,
          render: (htmlProps, state) => (
            <AlertDialogActionContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </AlertDialogActionContext>
          ),
          className: cn<AlertDialogActionState>(
            className,
            "sui_alert_dialog_action",
            (state) => `sui_alert_dialog_action-size_${state.size}`,
            (state) => `sui_alert_dialog_action-radius_${state.radius}`,
            (state) => `sui_alert_dialog_action-variant_${state.variant}`,
            (state) => state.absolute && "sui_alert_dialog_action-absolute",
            (state) => state.outlined && "sui_alert_dialog_action-outlined",
            (state) => state.open && "sui_alert_dialog_action-open",
            (state) => state.nested && "sui_alert_dialog_action-nested",
            (state) => state.nestedDialogOpen && "sui_alert_dialog_action-nested_dialog_open",
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_alert_dialog_action-transition_status_${state.transitionStatus}`,
          ),
        },
      )}
      absolute={absolute}
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
