import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { ContextMenuRadioGroupState } from "./context-menu.radio-group.jsx";

/**
 * {@link ContextMenuRadioGroup} が子パーツへ提供する状態です。
 */
export type ContextMenuRadioGroupContext = Readonly<ContextMenuRadioGroupState>;

/**
 * {@link ContextMenuRadioGroup} が子パーツへ提供するコンテキストです。
 */
export const ContextMenuRadioGroupContext: React.Context<ContextMenuRadioGroupContext | null> =
  React.createContext<ContextMenuRadioGroupContext | null>(null);

export type IUseContextMenuRadioGroupContext = IUseContext<ContextMenuRadioGroupContext>;

/**
 * {@link ContextMenuRadioGroupContext} を読み取るフックです。
 */
export const useContextMenuRadioGroupContext: IUseContextMenuRadioGroupContext =
  function useSuiContextMenuRadioGroupContext(optional): any {
    const ctx = React.use(ContextMenuRadioGroupContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "ContextMenuRadioGroupContext",
        providerName: "ContextMenuRadioGroup",
      });
    }

    return ctx;
  };

export {
  ContextMenuRadioGroupContext as RadioGroupContext,
  useContextMenuRadioGroupContext as useRadioGroupContext,
};
