import { Dialog } from "@base-ui/react/dialog";

/**
 * ダイアログを命令的に制御するハンドルです。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export type DialogHandle<TPayload = any> = Dialog.Handle<TPayload>;

export interface ICreateDialogHandle {
  /**
   * @template TPayload トリガーが送信するデータの型です。
   *
   * @returns ダイアログを命令的に制御するハンドルです。
   */
  <TPayload = any>(): DialogHandle<TPayload>;
}

/**
 * {@link DialogHandle} を作成する関数です。
 */
export const createDialogHandle: ICreateDialogHandle = () => Dialog.createHandle();

export { type DialogHandle as Handle, createDialogHandle as createHandle };
