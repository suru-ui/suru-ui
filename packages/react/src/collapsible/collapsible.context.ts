import type { Collapsible } from "@base-ui/react/collapsible";
import * as React from "react";

import { ContextMissingError } from "../errors.js";
import type { IUseContext } from "../types.js";

/**
 * {@link CollapsibleRoot} が子パーツへ提供するコンテキストです。
 */
export type CollapsibleContext = Readonly<Collapsible.Root.State>;

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
