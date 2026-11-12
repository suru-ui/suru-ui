import { Dialog } from "@base-ui/react/dialog";
import type { NativeButtonProps } from "@base-ui/react/internals/types";
import * as React from "react";

import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

/**
 * {@link DialogToggleTrigger} が持つ状態です。
 */
export type DialogToggleTriggerState = Dialog.Trigger.State;

export namespace DialogToggleTriggerProps {
  export type Render = Omit<RenderProps<DialogToggleTriggerState>, "render">;

  export type SuruUI = {
    /** ボタンとして描画する関数です。 */
    children: NonNullable<RenderProps<DialogToggleTriggerState>["render"]>;
  };

  export type BaseUI<TPayload = any> = Omit<
    Pick<
      React.ComponentProps<typeof Dialog.Trigger<TPayload>>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // NativeButtonProps より :
      | keyof NativeButtonProps
      // DialogTriggerProps より :
      | "handle"
      | "payload"
      | "id"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML<TPayload = any> = Omit<
    React.ComponentProps<typeof Dialog.Trigger<TPayload>>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DialogToggleTrigger} に渡す props です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export type DialogToggleTriggerProps<TPayload = any> = DialogToggleTriggerProps.Render &
  DialogToggleTriggerProps.SuruUI &
  DialogToggleTriggerProps.BaseUI<TPayload> &
  DialogToggleTriggerProps.HTML<TPayload>;

export type IDialogToggleTrigger = IComponent<DialogToggleTriggerProps>;

/** ダイアログを開くボタンコンポーネントです。 */
export const DialogToggleTrigger: IDialogToggleTrigger = (props) => {
  const { handle, children, className, ...otherProps } = props;

  return (
    <Dialog.Trigger
      {...otherProps}
      handle={handle}
      render={children}
      className={cn<DialogToggleTriggerState>(
        className,
        "sui_dialog_trigger",
        (state) => state.disabled && "sui_dialog_trigger-disabled",
        (state) => state.open && "sui_dialog_trigger-open",
      )}
    />
  );
};

export { DialogToggleTrigger as ToggleTrigger };
export namespace ToggleTrigger {
  export type State = DialogToggleTriggerState;

  export type Props<TPayload = any> = Props.Render &
    Props.SuruUI &
    Props.BaseUI<TPayload> &
    Props.HTML<TPayload>;

  export namespace Props {
    export type Render = DialogToggleTriggerProps.Render;

    export type SuruUI = DialogToggleTriggerProps.SuruUI;

    export type BaseUI<TPayload = any> = DialogToggleTriggerProps.BaseUI<TPayload>;

    export type HTML<TPayload = any> = DialogToggleTriggerProps.HTML<TPayload>;
  }
}
