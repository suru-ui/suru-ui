import * as React from "react";

import { ContextMissingError } from "../errors.js";
import type { IUseContext } from "../types.js";

/**
 * {@link ToggleButtonRoot} が子パーツへ提供するコンテキストです。
 */
export type ToggleButtonContext = {
  /**
   * トグルボタンが保留状態かどうかです。
   */
  readonly pending: boolean;
};

/**
 * {@link ToggleButtonRoot} が子パーツへ提供するコンテキストです。
 */
export const ToggleButtonContext: React.Context<ToggleButtonContext | null> =
  React.createContext<ToggleButtonContext | null>(null);

export interface IUseToggleButtonContext extends IUseContext<ToggleButtonContext> {
  /**
   * @param optional `true` の場合、コンテキストが見つからなくてもエラーを投げません。
   * @returns コンテキストです。`optional` が `true` でコンテキストがない場合は `null` です。
   */
  (optional?: false): ToggleButtonContext;
  (optional?: boolean): ToggleButtonContext | null;
}

/**
 * {@link ToggleButtonContext} を読み取るフックです。
 */
export const useToggleButtonContext: IUseToggleButtonContext = function useSuiToggleButtonContext(
  optional?: boolean,
): any {
  const ctx = React.use(ToggleButtonContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "ToggleButtonContext",
      providerName: "ToggleButtonRoot",
    });
  }

  return ctx;
};

export { ToggleButtonContext as Context, useToggleButtonContext as useContext };
