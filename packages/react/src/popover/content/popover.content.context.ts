import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { PopoverContentState } from "./popover.content.jsx";

/**
 * {@link PopoverContent} が子パーツへ提供する状態です。
 */
export type PopoverContentContext = Readonly<PopoverContentState>;

/**
 * {@link PopoverContent} が子パーツへ提供するコンテキストです。
 */
export const PopoverContentContext: React.Context<PopoverContentContext | null> =
  React.createContext<PopoverContentContext | null>(null);

export type IUsePopoverContentContext = IUseContext<PopoverContentContext>;

/**
 * {@link PopoverContentContext} を読み取るフックです。
 */
export const usePopoverContentContext: IUsePopoverContentContext =
  function useSuiPopoverContentContext(optional): any {
    const ctx = React.use(PopoverContentContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "PopoverContentContext",
        providerName: "PopoverContent",
      });
    }

    return ctx;
  };

export { PopoverContentContext as ContentContext, usePopoverContentContext as useContentContext };
