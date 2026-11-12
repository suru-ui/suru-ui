import type { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { SelectTriggerContext } from "../trigger/select.trigger.context.js";

/**
 * {@link SelectIcon} が子パーツへ提供する状態です。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectIconContext<TValue = any> = Readonly<
  Override<SelectTriggerContext<TValue>, BaseSelect.Icon.State>
>;

/**
 * {@link SelectIcon} が子パーツへ提供するコンテキストです。
 */
export const SelectIconContext: React.Context<SelectIconContext | null> =
  React.createContext<SelectIconContext | null>(null);

export type IUseSelectIconContext = IUseContext<SelectIconContext>;

/**
 * {@link SelectIconContext} を読み取るフックです。
 */
export const useSelectIconContext: IUseSelectIconContext = (optional): any => {
  const ctx = React.use(SelectIconContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "SelectIconContext",
      providerName: "SelectIcon",
    });
  }

  return ctx;
};

export { SelectIconContext as IconContext, useSelectIconContext as useIconContext };
