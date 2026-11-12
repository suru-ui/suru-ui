import { AlertDialog } from "@base-ui/react/alert-dialog";
import type { NativeButtonProps } from "@base-ui/react/internals/types";
import * as React from "react";

import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

/**
 * {@link AlertDialogCloseTrigger} が持つ状態です。
 */
export type AlertDialogCloseTriggerState = AlertDialog.Close.State;

export namespace AlertDialogCloseTriggerProps {
  export type Render = Omit<RenderProps<AlertDialogCloseTriggerState>, "render">;

  export type SuruUI = {
    /** ボタンとしてレンダリングする要素です。 */
    children: NonNullable<React.ComponentProps<typeof AlertDialog.Close>["render"]>;
  };

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof AlertDialog.Close>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // NativeButtonProps より :
      | keyof NativeButtonProps
      // DialogCloseProps より :
      | never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof AlertDialog.Close>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AlertDialogCloseTrigger} に渡す props です。
 */
export type AlertDialogCloseTriggerProps = AlertDialogCloseTriggerProps.Render &
  AlertDialogCloseTriggerProps.SuruUI &
  AlertDialogCloseTriggerProps.BaseUI &
  AlertDialogCloseTriggerProps.HTML;

export type IAlertDialogCloseTrigger = IComponent<AlertDialogCloseTriggerProps>;

/** アラートダイアログを閉じるボタンコンポーネントです。 */
export const AlertDialogCloseTrigger: IAlertDialogCloseTrigger = (props) => {
  const { children, className, ...otherProps } = props;

  return (
    <AlertDialog.Close
      {...otherProps}
      render={children}
      className={cn<AlertDialogCloseTriggerState>(
        className,
        "sui_alert_dialog_close",
        (state) => state.disabled && "sui_alert_dialog_close-disabled",
      )}
    />
  );
};

export { AlertDialogCloseTrigger as CloseTrigger };
export namespace CloseTrigger {
  export type State = AlertDialogCloseTriggerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AlertDialogCloseTriggerProps.Render;

    export type SuruUI = AlertDialogCloseTriggerProps.SuruUI;

    export type BaseUI = AlertDialogCloseTriggerProps.BaseUI;

    export type HTML = AlertDialogCloseTriggerProps.HTML;
  }
}
