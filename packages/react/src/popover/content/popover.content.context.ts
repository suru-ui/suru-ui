import type { Popover } from "@base-ui/react/popover";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { PopoverContext } from "../root/popover.root.context.js";

/**
 * {@link PopoverContent} が子パーツへ提供する状態です。
 */
export type PopoverContentContext = Readonly<Override<PopoverContext, Popover.Popup.State>>;

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
