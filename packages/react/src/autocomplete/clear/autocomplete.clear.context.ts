import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { AutocompleteClearState } from "./autocomplete.clear.jsx";

/**
 * {@link AutocompleteClear} が子パーツへ提供する状態です。
 */
export type AutocompleteClearContext = Readonly<AutocompleteClearState>;

/**
 * {@link AutocompleteClear} が子パーツへ提供するコンテキストです。
 */
export const AutocompleteClearContext: React.Context<AutocompleteClearContext | null> =
  React.createContext<AutocompleteClearContext | null>(null);

export type IUseAutocompleteClearContext = IUseContext<AutocompleteClearContext>;

/**
 * {@link AutocompleteClearContext} を読み取るフックです。
 */
export const useAutocompleteClearContext: IUseAutocompleteClearContext =
  function useSuiAutocompleteClearContext(optional): any {
    const ctx = React.use(AutocompleteClearContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "AutocompleteClearContext",
        providerName: "AutocompleteClear",
      });
    }

    return ctx;
  };

export { AutocompleteClearContext as ClearContext, useAutocompleteClearContext as useClearContext };
