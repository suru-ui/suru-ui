import type { Size } from "@suru-ui/theme";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";

/**
 * ホバーカードの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type HoverCardContextRadius = "none" | Size;

/**
 * ホバーカードの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type HoverCardContextSize = Size;

/**
 * {@link HoverCardRoot} が子パーツへ提供する状態です。
 */
export type HoverCardContext = {
  /** ホバーカードに枠線を表示するかどうかです。 */
  readonly outlined: boolean;

  /** ホバーカードの角丸の大きさです。 */
  readonly radius: HoverCardContextRadius;

  /** ホバーカードの大きさです。 */
  readonly size: HoverCardContextSize;
};

/** ホバーカードの見た目を子パーツへ伝播するコンテキストです。 */
export const HoverCardContext: React.Context<HoverCardContext | null> =
  React.createContext<HoverCardContext | null>(null);

export type IUseHoverCardContext = IUseContext<HoverCardContext>;

/**
 * {@link HoverCardContext} を読み取るフックです。
 */
export const useHoverCardContext: IUseHoverCardContext = (optional?: boolean): any => {
  const ctx = React.use(HoverCardContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "HoverCardContext",
      providerName: "HoverCardRoot",
    });
  }

  return ctx;
};

export { HoverCardContext as Context, useHoverCardContext as useContext };
export namespace Context {
  export type Radius = HoverCardContextRadius;

  export type Size = HoverCardContextSize;
}
