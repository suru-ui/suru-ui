import type { Autocomplete } from "@base-ui/react/autocomplete";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { GroupContext } from "../group/autocomplete.group.context.js";

/**
 * {@link AutocompleteGroupLabel} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type AutocompleteGroupLabelContext<TItem = any> = Readonly<
  Override<GroupContext<TItem>, Autocomplete.GroupLabel.State>
>;

/**
 * {@link AutocompleteGroupLabel} が子パーツへ提供するコンテキストです。
 */
export const AutocompleteGroupLabelContext: React.Context<AutocompleteGroupLabelContext | null> =
  React.createContext<AutocompleteGroupLabelContext | null>(null);

export type IUseAutocompleteGroupLabelContext = IUseContext<AutocompleteGroupLabelContext>;

/**
 * {@link AutocompleteGroupLabelContext} を読み取るフックです。
 */
export const useAutocompleteGroupLabelContext: IUseAutocompleteGroupLabelContext =
  function useSuiAutocompleteGroupLabelContext(optional): any {
    const ctx = React.use(AutocompleteGroupLabelContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "AutocompleteGroupLabelContext",
        providerName: "AutocompleteGroupLabel",
      });
    }

    return ctx;
  };

export {
  AutocompleteGroupLabelContext as GroupLabelContext,
  useAutocompleteGroupLabelContext as useGroupLabelContext,
};
