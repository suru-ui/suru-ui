import { AlertDialog } from "@base-ui/react/alert-dialog";
import * as React from "react";

import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

/**
 * {@link AlertDialogBackdrop} が持つ状態です。
 */
export type AlertDialogBackdropState = AlertDialog.Backdrop.State;

export namespace AlertDialogBackdropProps {
  export type Render = RenderProps<AlertDialogBackdropState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof AlertDialog.Backdrop>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // DialogBackdropProps より:
      "forceRender"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof AlertDialog.Backdrop>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AlertDialogBackdrop} に渡す props です。
 */
export type AlertDialogBackdropProps = AlertDialogBackdropProps.Render &
  AlertDialogBackdropProps.SuruUI &
  AlertDialogBackdropProps.BaseUI &
  AlertDialogBackdropProps.HTML;

export type IAlertDialogBackdrop = IComponent<AlertDialogBackdropProps>;

/**
 * ポップアップの背後に表示されるオーバーレイコンポーネントです。
 */
export const AlertDialogBackdrop: IAlertDialogBackdrop = function SuiAlertDialogBackdrop(props) {
  const { className, ...otherProps } = props;

  return (
    <AlertDialog.Backdrop
      {...otherProps}
      className={cn<AlertDialogBackdropState>(
        className,
        "sui_alert_dialog_backdrop",
        (state) => state.open && "sui_alert_dialog_backdrop-open",
        (state) =>
          state.transitionStatus !== undefined &&
          `sui_alert_dialog_backdrop-transition_status_${state.transitionStatus}`,
      )}
    />
  );
};

export { AlertDialogBackdrop as Backdrop };

export namespace Backdrop {
  export type State = AlertDialogBackdropState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AlertDialogBackdropProps.Render;

    export type SuruUI = AlertDialogBackdropProps.SuruUI;

    export type BaseUI = AlertDialogBackdropProps.BaseUI;

    export type HTML = AlertDialogBackdropProps.HTML;
  }
}
