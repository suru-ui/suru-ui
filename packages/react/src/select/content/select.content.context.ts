import type { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { SelectPositionerContext } from "../positioner/select.positioner.context.js";

/**
 * {@link SelectContent} が子パーツへ提供する状態です。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectContentContext<TValue = any> = Readonly<
  Override<SelectPositionerContext<TValue>, BaseSelect.Popup.State>
>;

/**
 * {@link SelectContent} が子パーツへ提供するコンテキストです。
 */
export const SelectContentContext: React.Context<SelectContentContext | null> =
  React.createContext<SelectContentContext | null>(null);

export type IUseSelectContentContext = IUseContext<SelectContentContext>;

/**
 * {@link SelectContentContext} を読み取るフックです。
 */
export const useSelectContentContext: IUseSelectContentContext =
  function useSuiSelectContentContext(optional): any {
    const ctx = React.use(SelectContentContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "SelectContentContext",
        providerName: "SelectContent",
      });
    }

    return ctx;
  };

export { SelectContentContext as ContentContext, useSelectContentContext as useContentContext };
