import { AlertDialog } from "@base-ui/react/alert-dialog";
import type { NativeButtonProps } from "@base-ui/react/internals/types";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link AlertDialogCloseTrigger} が持つ状態です。
 */
export type AlertDialogCloseTriggerState = AlertDialog.Close.State;

export namespace AlertDialogCloseTriggerProps {
  export type Render = RenderProps<AlertDialogCloseTriggerState>;

  export type SuruUI = {
    /**
     * ボタンとしてレンダリングする要素です。
     */
    children: NonNullable<React.ComponentProps<typeof AlertDialog.Close>["render"]>;
  };

  export type BaseUI = Pick<
    React.ComponentProps<typeof AlertDialog.Close>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NativeButtonProps:
      | keyof NativeButtonProps
      // DialogCloseProps:
      | never,
      keyof Render | keyof SuruUI
    >
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

/**
 * アラートダイアログを閉じるボタンコンポーネントです。
 */
export const AlertDialogCloseTrigger: IComponent<AlertDialogCloseTriggerProps> =
  function SuiAlertDialogCloseTrigger(props) {
    const { children, className, ...otherProps } = props;

    return (
      <AlertDialog.Close
        {...otherProps}
        render={children}
        className={cn(className, "sui_alert_dialog_close")}
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
