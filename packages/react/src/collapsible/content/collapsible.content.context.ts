import type { Collapsible } from "@base-ui/react/collapsible";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { CollapsibleContext } from "../root/collapsible.root.context.js";

/**
 * {@link CollapsibleContent} が子パーツへ提供する状態です。
 */
export type CollapsibleContentContext = Readonly<
  Override<CollapsibleContext, Collapsible.Panel.State>
>;

/**
 * {@link CollapsibleContent} が子パーツへ提供するコンテキストです。
 */
export const CollapsibleContentContext: React.Context<CollapsibleContentContext | null> =
  React.createContext<CollapsibleContentContext | null>(null);

export type IUseCollapsibleContentContext = IUseContext<CollapsibleContentContext>;

/**
 * {@link CollapsibleContentContext} を読み取るフックです。
 */
export const useCollapsibleContentContext: IUseCollapsibleContentContext =
  function useSuiCollapsibleContentContext(optional): any {
    const ctx = React.use(CollapsibleContentContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "CollapsibleContentContext",
        providerName: "CollapsibleContent",
      });
    }

    return ctx;
  };

export {
  CollapsibleContentContext as ContentContext,
  useCollapsibleContentContext as useContentContext,
};
