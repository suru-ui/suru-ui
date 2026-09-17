import { AlertDialog } from "@base-ui/react/alert-dialog";
import * as React from "react";

import type { IComponent } from "../types.js";
import type { AlertDialogHandle } from "./alert-dialog.handle.js";

/**
 * アラートダイアログを命令的に操作するためのオブジェクトです。
 */
export type AlertDialogRootActions = AlertDialog.Root.Actions;

/**
 * アラートダイアログの開閉状態を変更されるイベントの詳細です。
 */
export type AlertDialogRootChangeEventDetails = AlertDialog.Root.ChangeEventDetails;

/**
 * アラートダイアログの開閉状態が変更される理由です。
 */
export type AlertDialogRootChangeEventReason = AlertDialog.Root.ChangeEventReason;

/**
 * {@link AlertDialogRoot} が持つ状態です。
 */
export type AlertDialogRootState = AlertDialog.Root.State;

export namespace AlertDialogRootProps {
  export type Render = {};

  export type SuruUI<TPayload = any> = {
    /**
     * トリガーとアラートダイアログに関連付けるためのハンドルです。
     */
    handle: AlertDialogHandle<TPayload>;
  };

  export type BaseUI<TPayload = any> = Pick<
    React.ComponentProps<typeof AlertDialog.Root<TPayload>>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // AlertDialogRootProps:
      | "open"
      | "defaultOpen"
      | "onOpenChange"
      | "onOpenChangeComplete"
      | "actionsRef"
      | "children"
      | "triggerId"
      | "defaultTriggerId",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML<TPayload = any> = Omit<
    React.ComponentProps<typeof AlertDialog.Root<TPayload>>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AlertDialogRoot} に渡す props です。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export type AlertDialogRootProps<TPayload = any> = AlertDialogRootProps.Render &
  AlertDialogRootProps.SuruUI<TPayload> &
  AlertDialogRootProps.BaseUI<TPayload> &
  AlertDialogRootProps.HTML<TPayload>;

interface IAlertDialogRoot extends IComponent<AlertDialogRootProps> {
  /**
   * @template TPayload トリガーが送信するデータの型です。
   */
  <TPayload = any>(props: AlertDialogRootProps<TPayload>): IComponent.Return;
}

/**
 * アラートダイアログのルートコンポーネントです。
 *
 * ダイアログの開閉状態を管理し、各パーツをグループ化します。それ自身は HTML 要素をレンダリングしません。
 */
export const AlertDialogRoot: IAlertDialogRoot = function SuiAlertDialogRoot(
  props: AlertDialogRootProps,
) {
  return <AlertDialog.Root {...props} />;
};

export { AlertDialogRoot as Root };

export namespace Root {
  export type State = AlertDialogRootState;

  export type Props<TPayload = any> = Props.Render &
    Props.SuruUI<TPayload> &
    Props.BaseUI<TPayload> &
    Props.HTML<TPayload>;

  export namespace Props {
    export type Render = AlertDialogRootProps.Render;

    export type SuruUI<TPayload = any> = AlertDialogRootProps.SuruUI<TPayload>;

    export type BaseUI<TPayload = any> = AlertDialogRootProps.BaseUI<TPayload>;

    export type HTML<TPayload = any> = AlertDialogRootProps.HTML<TPayload>;
  }

  export type Actions = AlertDialogRootActions;

  export type ChangeEventDetails = AlertDialogRootChangeEventDetails;

  export type ChangeEventReason = AlertDialogRootChangeEventReason;
}
