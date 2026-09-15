import { Dialog } from "@base-ui/react/dialog";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";
import type { DialogHandle } from "./dialog.handle.js";

/**
 * ダイアログを命令的に操作するためのオブジェクトです。
 */
export type DialogRootActions = Dialog.Root.Actions;

/**
 * ダイアログの開閉状態を変更されるイベントの詳細です。
 */
export type DialogRootChangeEventDetails = Dialog.Root.ChangeEventDetails;

/**
 * ダイアログの開閉状態が変更される理由です。
 */
export type DialogRootChangeEventReason = Dialog.Root.ChangeEventReason;

/**
 * {@link DialogRoot} が持つ状態です。
 */
export type DialogRootState = Dialog.Root.State;

export namespace DialogRootProps {
  export type Render = RenderProps<DialogRootState>;

  export type SuruUI<TPayload = any> = {
    /**
     * トリガーとダイアログに関連付けるためのハンドルです。
     */
    handle: DialogHandle<TPayload>;
  };

  export type BaseUI<TPayload = any> = Pick<
    React.ComponentProps<typeof Dialog.Root<TPayload>>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // DialogRootProps:
      | "open"
      | "defaultOpen"
      | "modal"
      | "onOpenChange"
      | "onOpenChangeComplete"
      | "disablePointerDismissal"
      | "actionsRef"
      | "children"
      | "triggerId"
      | "defaultTriggerId",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML<TPayload = any> = Omit<
    React.ComponentProps<typeof Dialog.Root<TPayload>>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link DialogRoot} に渡す props です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export type DialogRootProps<TPayload = any> = DialogRootProps.Render &
  DialogRootProps.SuruUI<TPayload> &
  DialogRootProps.BaseUI<TPayload> &
  DialogRootProps.HTML<TPayload>;

interface IDialogRoot extends IComponent<DialogRootProps> {
  /**
   * @template TPayload トリガーが送信するデータの型です。
   */
  <TPayload = any>(props: DialogRootProps<TPayload>): IComponent.Return;
}

/**
 * ダイアログのルートコンポーネントです。
 *
 * ダイアログの開閉状態を管理し、各パーツをグループ化します。それ自身は HTML 要素をレンダリングしません。
 */
export const DialogRoot: IDialogRoot = function SuiDialogRoot(props: DialogRootProps) {
  return <Dialog.Root {...props} />;
};

export { DialogRoot as Root };

export namespace Root {
  export type State = DialogRootState;

  export type Props<TPayload = any> = Props.Render &
    Props.SuruUI<TPayload> &
    Props.BaseUI<TPayload> &
    Props.HTML<TPayload>;

  export namespace Props {
    export type Render = DialogRootProps.Render;

    export type SuruUI<TPayload = any> = DialogRootProps.SuruUI<TPayload>;

    export type BaseUI<TPayload = any> = DialogRootProps.BaseUI<TPayload>;

    export type HTML<TPayload = any> = DialogRootProps.HTML<TPayload>;
  }

  export type Actions = DialogRootActions;

  export type ChangeEventDetails = DialogRootChangeEventDetails;

  export type ChangeEventReason = DialogRootChangeEventReason;
}
