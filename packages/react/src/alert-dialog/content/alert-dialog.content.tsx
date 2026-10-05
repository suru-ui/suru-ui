import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import * as Card from "../../card/card.parts.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useAlertDialogPopupContext } from "../popup/alert-dialog.popup.context.js";
import { AlertDialogContentContext } from "./alert-dialog.content.context.js";

/**
 * {@link AlertDialogContent} が持つ状態です。
 */
export type AlertDialogContentState = AlertDialogContentContext;

export namespace AlertDialogContentProps {
  export type Render = RenderProps<AlertDialogContentState>;

  export type SuruUI = Card.Content.Props.SuruUI;

  export type BaseUI = Card.Content.Props.BaseUI;

  export type HTML = Card.Content.Props.HTML;
}

/**
 * {@link AlertDialogContent} に渡す props です。
 */
export type AlertDialogContentProps = AlertDialogContentProps.Render &
  AlertDialogContentProps.SuruUI &
  AlertDialogContentProps.BaseUI &
  AlertDialogContentProps.HTML;

export type IAlertDialogContent = IComponent<AlertDialogContentProps>;

/**
 * アラートダイアログの本文を表示するコンポーネントです。
 */
export const AlertDialogContent: IAlertDialogContent = function SuiAlertDialogContent(props) {
  const ctx = useAlertDialogPopupContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Card.Content
      {...otherProps}
      {...proxyRenderProps<Card.Content.State, AlertDialogContentState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <AlertDialogContentContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </AlertDialogContentContext>
          ),
          className: cn<AlertDialogContentState>(
            className,
            "sui_alert_dialog_content",
            (state) => `sui_alert_dialog_content-size_${state.size}`,
            (state) => `sui_alert_dialog_content-radius_${state.radius}`,
            (state) => `sui_alert_dialog_content-variant_${state.variant}`,
            (state) => state.outlined && "sui_alert_dialog_content-outlined",
          ),
        },
      )}
    />
  );
};

export { AlertDialogContent as Content };

export namespace Content {
  export type State = AlertDialogContentState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AlertDialogContentProps.Render;

    export type SuruUI = AlertDialogContentProps.SuruUI;

    export type BaseUI = AlertDialogContentProps.BaseUI;

    export type HTML = AlertDialogContentProps.HTML;
  }
}
