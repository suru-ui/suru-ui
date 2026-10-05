import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { PopoverDescriptionState } from "./popover.description.jsx";

/**
 * {@link PopoverDescription} が子パーツへ提供する状態です。
 */
export type PopoverDescriptionContext = Readonly<PopoverDescriptionState>;

/**
 * {@link PopoverDescription} が子パーツへ提供するコンテキストです。
 */
export const PopoverDescriptionContext: React.Context<PopoverDescriptionContext | null> =
  React.createContext<PopoverDescriptionContext | null>(null);

export type IUsePopoverDescriptionContext = IUseContext<PopoverDescriptionContext>;

/**
 * {@link PopoverDescriptionContext} を読み取るフックです。
 */
export const usePopoverDescriptionContext: IUsePopoverDescriptionContext =
  function useSuiPopoverDescriptionContext(optional): any {
    const ctx = React.use(PopoverDescriptionContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "PopoverDescriptionContext",
        providerName: "PopoverDescription",
      });
    }

    return ctx;
  };

export {
  PopoverDescriptionContext as DescriptionContext,
  usePopoverDescriptionContext as useDescriptionContext,
};
