import type { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { AddonContext } from "../addon/autocomplete.addon.context.js";

/**
 * {@link AutocompleteClear} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type AutocompleteClearContext<TItem = any> = Readonly<
  Override<AddonContext<TItem>, Autocomplete.Clear.State>
>;

/**
 * {@link AutocompleteClear} が子パーツへ提供するコンテキストです。
 */
export const AutocompleteClearContext: React.Context<AutocompleteClearContext | null> =
  React.createContext<AutocompleteClearContext | null>(null);

export type IUseAutocompleteClearContext = IUseContext<AutocompleteClearContext>;

/**
 * {@link AutocompleteClearContext} を読み取るフックです。
 */
export const useAutocompleteClearContext: IUseAutocompleteClearContext = (optional): any => {
  const ctx = React.use(AutocompleteClearContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "AutocompleteClearContext",
      providerName: "AutocompleteClear",
    });
  }

  return ctx;
};

export { AutocompleteClearContext as ClearContext, useAutocompleteClearContext as useClearContext };
