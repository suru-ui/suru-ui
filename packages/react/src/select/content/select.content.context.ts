import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { SelectContentState } from "./select.content.jsx";

/**
 * {@link SelectContent} が子パーツへ提供する状態です。
 */
export type SelectContentContext = Readonly<SelectContentState>;

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
