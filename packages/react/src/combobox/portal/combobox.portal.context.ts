import type { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { ComboboxContext } from "../root/combobox.root.context.js";

/**
 * {@link ComboboxPortal} が子パーツへ提供する状態です。
 */
export type ComboboxPortalContext = Readonly<Override<ComboboxContext, Combobox.Portal.State>>;

/**
 * {@link ComboboxPortal} が子パーツへ提供するコンテキストです。
 */
export const ComboboxPortalContext: React.Context<ComboboxPortalContext | null> =
  React.createContext<ComboboxPortalContext | null>(null);

export type IUseComboboxPortalContext = IUseContext<ComboboxPortalContext>;

/**
 * {@link ComboboxPortalContext} を読み取るフックです。
 */
export const useComboboxPortalContext: IUseComboboxPortalContext =
  function useSuiComboboxPortalContext(optional): any {
    const ctx = React.use(ComboboxPortalContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "ComboboxPortalContext",
        providerName: "ComboboxPortal",
      });
    }

    return ctx;
  };

export { ComboboxPortalContext as PortalContext, useComboboxPortalContext as usePortalContext };
