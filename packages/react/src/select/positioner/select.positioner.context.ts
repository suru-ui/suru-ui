import type { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { SelectPortalContext } from "../portal/select.portal.context.js";

/**
 * {@link SelectPositioner} が子パーツへ提供する状態です。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectPositionerContext<TValue = any> = Readonly<
  Override<SelectPortalContext<TValue>, BaseSelect.Positioner.State>
>;

/**
 * {@link SelectPositioner} が子パーツへ提供するコンテキストです。
 */
export const SelectPositionerContext: React.Context<SelectPositionerContext | null> =
  React.createContext<SelectPositionerContext | null>(null);

export type IUseSelectPositionerContext = IUseContext<SelectPositionerContext>;

/**
 * {@link SelectPositionerContext} を読み取るフックです。
 */
export const useSelectPositionerContext: IUseSelectPositionerContext = (optional): any => {
  const ctx = React.use(SelectPositionerContext);

  if (ctx === null && optional !== true) {
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
