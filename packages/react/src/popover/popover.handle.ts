import { Popover } from "@base-ui/react/popover";

/**
 * ポップオーバーを制御するハンドルです。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export type PopoverHandle<TPayload = any> = Popover.Handle<TPayload>;

interface ICreatePopoverHandle {
  /**
   * @template TPayload トリガーが送信するデータの型です。
   * @returns ポップオーバーを制御するハンドルです。
   */
  <TPayload = any>(): PopoverHandle<TPayload>;
}

/**
 * {@link PopoverHandle} を作成する関数です。
 */
export const createPopoverHandle: ICreatePopoverHandle = function createSuiPopoverHandle() {
  return Popover.createHandle();
};

export { type PopoverHandle as Handle, createPopoverHandle as createHandle };
