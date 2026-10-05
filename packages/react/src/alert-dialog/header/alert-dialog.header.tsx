import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import * as Card from "../../card/card.parts.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useAlertDialogPopupContext } from "../popup/alert-dialog.popup.context.js";
import { AlertDialogHeaderContext } from "./alert-dialog.header.context.js";

/**
 * {@link AlertDialogHeader} が持つ状態です。
 */
export type AlertDialogHeaderState = AlertDialogHeaderContext;

export namespace AlertDialogHeaderProps {
  export type Render = RenderProps<AlertDialogHeaderState>;

  export type SuruUI = Card.Header.Props.SuruUI;

  export type BaseUI = Card.Header.Props.BaseUI;

  export type HTML = Card.Header.Props.HTML;
}

/**
 * {@link AlertDialogHeader} に渡す props です。
 */
export type AlertDialogHeaderProps = AlertDialogHeaderProps.Render &
  AlertDialogHeaderProps.SuruUI &
  AlertDialogHeaderProps.BaseUI &
  AlertDialogHeaderProps.HTML;

export type IAlertDialogHeader = IComponent<AlertDialogHeaderProps>;

/**
 * アラートダイアログの見出し・説明・操作をまとめるコンポーネントです。
 */
export const AlertDialogHeader: IAlertDialogHeader = function SuiAlertDialogHeader(props) {
  const ctx = useAlertDialogPopupContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Card.Header
      {...otherProps}
      {...proxyRenderProps<Card.Header.State, AlertDialogHeaderState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <AlertDialogHeaderContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </AlertDialogHeaderContext>
          ),
          className: cn<AlertDialogHeaderState>(
            className,
            "sui_alert_dialog_header",
            (state) => `sui_alert_dialog_header-size_${state.size}`,
            (state) => `sui_alert_dialog_header-radius_${state.radius}`,
            (state) => `sui_alert_dialog_header-variant_${state.variant}`,
            (state) => state.outlined && "sui_alert_dialog_header-outlined",
          ),
        },
      )}
    />
  );
};

export { AlertDialogHeader as Header };

export namespace Header {
  export type State = AlertDialogHeaderState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AlertDialogHeaderProps.Render;

    export type SuruUI = AlertDialogHeaderProps.SuruUI;

    export type BaseUI = AlertDialogHeaderProps.BaseUI;

    export type HTML = AlertDialogHeaderProps.HTML;
  }
}
