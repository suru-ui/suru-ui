import { AlertDialog } from "@base-ui/react/alert-dialog";

/**
 * アラートダイアログを命令的に制御するハンドルです。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export type AlertDialogHandle<TPayload = any> = AlertDialog.Handle<TPayload>;

export interface ICreateAlertDialogHandle {
  /**
   * @template TPayload トリガーが送信するデータの型です。
   * @returns アラートダイアログを命令的に制御するハンドルです。
   */
  <TPayload = any>(): AlertDialogHandle<TPayload>;
}

/**
 * {@link AlertDialogHandle} を作成する関数です。
 */
export const createAlertDialogHandle: ICreateAlertDialogHandle =
  function createSuiAlertDialogHandle() {
    return AlertDialog.createHandle();
  };

export { type AlertDialogHandle as Handle, createAlertDialogHandle as createHandle };
