import type { Size } from "@suru-ui/theme";
import * as React from "react";

import { ContextMissingError } from "../errors.js";
import type { IUseContext } from "../types.js";

/**
 * カードの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type CardContextRadius = "none" | Size;

/**
 * カードの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type CardContextSize = Size;

/**
 * {@link CardRoot} が子パーツへ提供する状態です。
 */
export type CardContext = {
  /**
   * カードに枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * カードの角丸の大きさです。
   */
  readonly radius: CardContextRadius;

  /**
   * カードの大きさです。
   */
  readonly size: CardContextSize;
};

/**
 * カードの見た目を子パーツへ伝播するコンテキストです。
 */
export const CardContext: React.Context<CardContext | null> =
  React.createContext<CardContext | null>(null);

export type IUseCardContext = IUseContext<CardContext>;

/**
 * {@link CardContext} を読み取るフックです。
 */
export const useCardContext: IUseCardContext = function useSuiCardContext(optional?: boolean): any {
  const ctx = React.use(CardContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "CardContext",
      providerName: "CardRoot",
    });
  }

  return ctx;
};

export { CardContext as Context, useCardContext as useContext };

export namespace Context {
  export type Radius = CardContextRadius;

  export type Size = CardContextSize;
}
