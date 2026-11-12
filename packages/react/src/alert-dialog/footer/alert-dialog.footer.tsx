import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import * as Card from "../../card/card.parts.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useAlertDialogPopupContext } from "../popup/alert-dialog.popup.context.js";
import { AlertDialogFooterContext } from "./alert-dialog.footer.context.js";

/**
 * {@link AlertDialogFooter} が持つ状態です。
 */
export type AlertDialogFooterState = AlertDialogFooterContext;

export namespace AlertDialogFooterProps {
  export type Render = RenderProps<AlertDialogFooterState>;

  export type SuruUI = Card.Footer.Props.SuruUI;

  export type BaseUI = Card.Footer.Props.BaseUI;

  export type HTML = Card.Footer.Props.HTML;
}

/**
 * {@link AlertDialogFooter} に渡す props です。
 */
export type AlertDialogFooterProps = AlertDialogFooterProps.Render &
  AlertDialogFooterProps.SuruUI &
  AlertDialogFooterProps.BaseUI &
  AlertDialogFooterProps.HTML;

export type IAlertDialogFooter = IComponent<AlertDialogFooterProps>;

/**
 * アラートダイアログの操作や補足情報を末尾に配置するコンポーネントです。
 *
 * 積み上げ式では内容を等幅の 2 列に並べます。
 */
export const AlertDialogFooter: IAlertDialogFooter = (props) => {
  const ctx = useAlertDialogPopupContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Card.Footer
      {...otherProps}
      {...proxyRenderProps<Card.Footer.State, AlertDialogFooterState>(
        (state) => ({
          ...ctx,
          ...state,
        }),
        {
          style,
          render: (htmlProps, state) => (
            <AlertDialogFooterContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </AlertDialogFooterContext>
          ),
          className: cn<AlertDialogFooterState>(
            className,
            "sui_alert_dialog_footer",
            (state) => `sui_alert_dialog_footer-size_${state.size}`,
            (state) => `sui_alert_dialog_footer-radius_${state.radius}`,
            (state) => `sui_alert_dialog_footer-variant_${state.variant}`,
            (state) => state.outlined && "sui_alert_dialog_footer-outlined",
            (state) => state.open && "sui_alert_dialog_footer-open",
            (state) => state.nested && "sui_alert_dialog_footer-nested",
            (state) => state.nestedDialogOpen && "sui_alert_dialog_footer-nested_dialog_open",
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_alert_dialog_footer-transition_status_${state.transitionStatus}`,
          ),
        },
      )}
    />
  );
};

export { AlertDialogFooter as Footer };
export namespace Footer {
  export type State = AlertDialogFooterState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AlertDialogFooterProps.Render;

    export type SuruUI = AlertDialogFooterProps.SuruUI;

    export type BaseUI = AlertDialogFooterProps.BaseUI;

    export type HTML = AlertDialogFooterProps.HTML;
  }
}
