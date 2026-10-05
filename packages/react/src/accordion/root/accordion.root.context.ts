import type { Size } from "@suru-ui/theme";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";

/**
 * アコーディオンの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type AccordionContextRadius = "none" | Size;

/**
 * アコーディオンの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type AccordionContextSize = Size;

/**
 * {@link AccordionRoot} が子パーツへ提供する状態です。
 */
export type AccordionContext = {
  /**
   * アコーディオンの角丸の大きさです。
   */
  readonly radius: AccordionContextRadius;

  /**
   * アコーディオンが隣接する項目の区切り線を表示するかどうかです。
   */
  readonly separator: boolean;

  /**
   * アコーディオンの大きさです。
   */
  readonly size: AccordionContextSize;
};

/**
 * アコーディオンの見た目を子パーツへ伝播するコンテキストです。
 */
export const AccordionContext: React.Context<AccordionContext | null> =
  React.createContext<AccordionContext | null>(null);

export type IUseAccordionContext = IUseContext<AccordionContext>;

/**
 * {@link AccordionContext} を読み取るフックです。
 */
export const useAccordionContext: IUseAccordionContext = function useSuiAccordionContext(
  optional?: boolean,
): any {
  const ctx = React.use(AccordionContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "AccordionContext",
      providerName: "AccordionRoot",
    });
  }

  return ctx;
};

export { AccordionContext as Context, useAccordionContext as useContext };

export namespace Context {
  export type Radius = AccordionContextRadius;

  export type Size = AccordionContextSize;
}
