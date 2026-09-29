import { PreviewCard } from "@base-ui/react/preview-card";

/**
 * ホバーカードを制御するハンドルです。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export type HoverCardHandle<TPayload = any> = PreviewCard.Handle<TPayload>;

export interface ICreateHoverCardHandle {
  /**
   * @template TPayload トリガーが送信するデータの型です。
   * @returns ホバーカードを制御するハンドルです。
   */
  <TPayload = any>(): HoverCardHandle<TPayload>;
}

/**
 * {@link HoverCardHandle} を作成する関数です。
 */
export const createHoverCardHandle: ICreateHoverCardHandle = function createSuiHoverCardHandle() {
  return PreviewCard.createHandle();
};

export { type HoverCardHandle as Handle, createHoverCardHandle as createHandle };
