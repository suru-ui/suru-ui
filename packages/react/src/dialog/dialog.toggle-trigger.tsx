import { Dialog } from "@base-ui/react/dialog";
import type { NativeButtonProps } from "@base-ui/react/internals/types";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import type { DialogHandle } from "./dialog.handle.js";

/**
 * {@link DialogToggleTrigger} が持つ状態です。
 */
export type DialogToggleTriggerState = Dialog.Trigger.State;

export namespace DialogToggleTriggerProps {
  export type Render = RenderProps<DialogToggleTriggerState>;

  export type SuruUI<TPayload = any> = {
    /**
     * ボタンとしてレンダリングする要素です。
     */
    children: NonNullable<React.ComponentProps<typeof Dialog.Trigger>["render"]>;

    /**
     * トリガーとダイアログに関連付けるためのハンドルです。
     */
    handle: DialogHandle<TPayload>;
  };

  export type BaseUI<TPayload = any> = Pick<
    React.ComponentProps<typeof Dialog.Trigger<TPayload>>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NativeButtonProps:
      | keyof NativeButtonProps
      // DialogTriggerProps:
      | "payload"
      | "id",
      keyof Render | keyof SuruUI
    >
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
  DialogToggleTriggerProps.SuruUI<TPayload> &
  DialogToggleTriggerProps.BaseUI<TPayload> &
  DialogToggleTriggerProps.HTML<TPayload>;

/**
 * ダイアログを開くボタンコンポーネントです。
 */
export const DialogToggleTrigger: IComponent<DialogToggleTriggerProps> =
  function SuiDialogToggleTrigger(props) {
    const { handle, children, className, ...otherProps } = props;

    return (
      <Dialog.Trigger
        {...otherProps}
        handle={handle}
        render={children}
        className={cn(className, "sui_dialog_trigger")}
      />
    );
  };

export { DialogToggleTrigger as ToggleTrigger };

export namespace ToggleTrigger {
  export type State = DialogToggleTriggerState;

  export type Props<TPayload = any> = Props.Render &
    Props.SuruUI<TPayload> &
    Props.BaseUI<TPayload> &
    Props.HTML<TPayload>;

  export namespace Props {
    export type Render = DialogToggleTriggerProps.Render;

    export type SuruUI<TPayload = any> = DialogToggleTriggerProps.SuruUI<TPayload>;

    export type BaseUI<TPayload = any> = DialogToggleTriggerProps.BaseUI<TPayload>;

    export type HTML<TPayload = any> = DialogToggleTriggerProps.HTML<TPayload>;
  }
}
