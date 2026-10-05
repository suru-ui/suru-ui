import type { Collapsible } from "@base-ui/react/collapsible";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";

/**
 * コラプシブルの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type CollapsibleContextSize = Size;

/**
 * {@link CollapsibleRoot} が子パーツへ提供するコンテキストです。
 */
export type CollapsibleContext = Readonly<
  Override<
    Collapsible.Root.State,
    {
      /**
       * コラプシブルの大きさです。
       */
      readonly size: CollapsibleContextSize;
    }
  >
>;

/**
 * {@link CollapsibleRoot} が子パーツへ提供するコンテキストです。
 */
export const CollapsibleContext: React.Context<CollapsibleContext | null> =
  React.createContext<CollapsibleContext | null>(null);

export type IUseCollapsibleContext = IUseContext<CollapsibleContext>;

/**
 * {@link CollapsibleContext} を読み取るフックです。
 */
export const useCollapsibleContext: IUseCollapsibleContext = function useSuiCollapsibleContext(
  optional,
): any {
  const ctx = React.use(CollapsibleContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "CollapsibleContext",
      providerName: "CollapsibleRoot",
    });
  }

  return ctx;
};

export { CollapsibleContext as Context, useCollapsibleContext as useContext };

export namespace Context {
  export type Size = CollapsibleContextSize;
}
