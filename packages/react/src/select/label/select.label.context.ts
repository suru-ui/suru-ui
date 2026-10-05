import type { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { SelectContext } from "../root/select.root.context.js";

/**
 * {@link SelectLabel} が子パーツへ提供する状態です。
 */
export type SelectLabelContext = Readonly<Override<SelectContext, BaseSelect.Label.State>>;

/**
 * {@link SelectLabel} が子パーツへ提供するコンテキストです。
 */
export const SelectLabelContext: React.Context<SelectLabelContext | null> =
  React.createContext<SelectLabelContext | null>(null);

export type IUseSelectLabelContext = IUseContext<SelectLabelContext>;

/**
 * {@link SelectLabelContext} を読み取るフックです。
 */
export const useSelectLabelContext: IUseSelectLabelContext = function useSuiSelectLabelContext(
  optional,
): any {
  const ctx = React.use(SelectLabelContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "SelectLabelContext",
      providerName: "SelectLabel",
    });
  }

  return ctx;
};

export { SelectLabelContext as LabelContext, useSelectLabelContext as useLabelContext };
