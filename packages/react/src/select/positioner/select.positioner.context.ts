import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { SelectPositionerState } from "./select.positioner.jsx";

/**
 * {@link SelectPositioner} が子パーツへ提供する状態です。
 */
export type SelectPositionerContext = Readonly<SelectPositionerState>;

/**
 * {@link SelectPositioner} が子パーツへ提供するコンテキストです。
 */
export const SelectPositionerContext: React.Context<SelectPositionerContext | null> =
  React.createContext<SelectPositionerContext | null>(null);

export type IUseSelectPositionerContext = IUseContext<SelectPositionerContext>;

/**
 * {@link SelectPositionerContext} を読み取るフックです。
 */
export const useSelectPositionerContext: IUseSelectPositionerContext =
  function useSuiSelectPositionerContext(optional): any {
    const ctx = React.use(SelectPositionerContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "SelectPositionerContext",
        providerName: "SelectPositioner",
      });
    }

    return ctx;
  };

export {
  SelectPositionerContext as PositionerContext,
  useSelectPositionerContext as usePositionerContext,
};
