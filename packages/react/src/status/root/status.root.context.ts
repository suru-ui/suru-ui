import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";

/**
 * ステータスの配色です。
 */
export type StatusContextColor = Color;

/**
 * インジケーターのリップルの大きさです。
 *
 * ドットの大きさに対する相対的な大きさです。
 * `"md"` の実際の大きさはインジケーターの大きさによって異なります。
 *
 * - `"sm"`: 小さいリップル
 * - `"md"`: 標準的なリップル
 * - `"lg"`: 大きいリップル
 */
export type StatusContextRippleSize = Size;

/**
 * ステータスの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type StatusContextSize = Size;

/**
 * {@link StatusRoot} が提供する状態です。
 */
export type StatusContext = {
  /**
   * ステータスの色です。
   */
  readonly color: StatusContextColor;

  /**
   * リップルを含めた大きさでインジケーターを表示するかどうかです。
   */
  readonly containRipple: boolean;

  /**
   * インジケーターにリップルが広がるアニメーションを表示するかどうかです。
   */
  readonly ping: boolean;

  /**
   * インジケーターのリップルの大きさです。
   */
  readonly rippleSize: StatusContextRippleSize;

  /**
   * ステータスの大きさです。
   */
  readonly size: StatusContextSize;
};

/**
 * ステータスの見た目を子パーツへ伝播するコンテキストです。
 */
export const StatusContext: React.Context<StatusContext | null> =
  React.createContext<StatusContext | null>(null);

export type IUseStatusContext = IUseContext<StatusContext>;

/**
 * {@link StatusContext} を読み取るフックです。
 */
export const useStatusContext: IUseStatusContext = function useSuiStatusContext(
  optional?: boolean,
): any {
  const ctx = React.use(StatusContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "StatusContext",
      providerName: "StatusRoot",
    });
  }

  return ctx;
};

export { StatusContext as Context, useStatusContext as useContext };

export namespace Context {
  export type Color = StatusContextColor;

  export type RippleSize = StatusContextRippleSize;

  export type Size = StatusContextSize;
}
