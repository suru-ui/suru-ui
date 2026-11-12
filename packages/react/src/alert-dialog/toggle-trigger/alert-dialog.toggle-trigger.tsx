import { AlertDialog } from "@base-ui/react/alert-dialog";
import type { NativeButtonProps } from "@base-ui/react/internals/types";
import * as React from "react";

import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

/**
 * {@link AlertDialogToggleTrigger} が持つ状態です。
 */
export type AlertDialogToggleTriggerState = AlertDialog.Trigger.State;

export namespace AlertDialogToggleTriggerProps {
  export type Render = Omit<RenderProps<AlertDialogToggleTriggerState>, "render">;

  export type SuruUI<TPayload = any> = {
    /** ボタンとしてレンダリングする要素です。 */
    children: NonNullable<React.ComponentProps<typeof AlertDialog.Trigger<TPayload>>["render"]>;
  };

  export type BaseUI<TPayload = any> = Omit<
    Pick<
      React.ComponentProps<typeof AlertDialog.Trigger<TPayload>>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // NativeButtonProps より :
      | keyof NativeButtonProps
      // AlertDialogTriggerProps より :
      | "handle"
      | "payload"
      | "id"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML<TPayload = any> = Omit<
    React.ComponentProps<typeof AlertDialog.Trigger<TPayload>>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AlertDialogToggleTrigger} に渡す props です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export type AlertDialogToggleTriggerProps<TPayload = any> = AlertDialogToggleTriggerProps.Render &
  AlertDialogToggleTriggerProps.SuruUI<TPayload> &
  AlertDialogToggleTriggerProps.BaseUI<TPayload> &
  AlertDialogToggleTriggerProps.HTML<TPayload>;

export type IAlertDialogToggleTrigger = IComponent<AlertDialogToggleTriggerProps>;

/** アラートダイアログを開くボタンコンポーネントです。 */
export const AlertDialogToggleTrigger: IAlertDialogToggleTrigger = (props) => {
  const { handle, children, className, ...otherProps } = props;

  return (
    <AlertDialog.Trigger
      {...otherProps}
      handle={handle}
      render={children}
      className={cn<AlertDialogToggleTriggerState>(
        className,
        "sui_alert_dialog_trigger",
        (state) => state.disabled && "sui_alert_dialog_trigger-disabled",
        (state) => state.open && "sui_alert_dialog_trigger-open",
      )}
    />
  );
};

export { AlertDialogToggleTrigger as ToggleTrigger };
export namespace ToggleTrigger {
  export type State = AlertDialogToggleTriggerState;

  export type Props<TPayload = any> = Props.Render &
    Props.SuruUI<TPayload> &
    Props.BaseUI<TPayload> &
    Props.HTML<TPayload>;

  export namespace Props {
    export type Render = AlertDialogToggleTriggerProps.Render;

    export type SuruUI<TPayload = any> = AlertDialogToggleTriggerProps.SuruUI<TPayload>;

    export type BaseUI<TPayload = any> = AlertDialogToggleTriggerProps.BaseUI<TPayload>;

    export type HTML<TPayload = any> = AlertDialogToggleTriggerProps.HTML<TPayload>;
  }
}
