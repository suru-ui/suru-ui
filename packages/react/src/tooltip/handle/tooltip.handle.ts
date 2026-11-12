import { Tooltip } from "@base-ui/react/tooltip";

/**
 * ツールチップを制御するハンドルです。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export type TooltipHandle<TPayload = any> = Tooltip.Handle<TPayload>;

export interface ICreateTooltipHandle {
  /**
   * @template TPayload トリガーが送信するデータの型です。
   *
   * @returns ツールチップを制御するハンドルです。
   */
  <TPayload = any>(): TooltipHandle<TPayload>;
}

/**
 * {@link TooltipHandle} を作成する関数です。
 */
export const createTooltipHandle: ICreateTooltipHandle = () => Tooltip.createHandle();

export { type TooltipHandle as Handle, createTooltipHandle as createHandle };
