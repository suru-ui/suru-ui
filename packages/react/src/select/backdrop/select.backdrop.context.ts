import type { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { SelectContext } from "../root/select.root.context.js";

/**
 * {@link SelectBackdrop} が子パーツへ提供する状態です。
 */
export type SelectBackdropContext = Readonly<Override<SelectContext, BaseSelect.Backdrop.State>>;

/**
 * {@link SelectBackdrop} が子パーツへ提供するコンテキストです。
 */
export const SelectBackdropContext: React.Context<SelectBackdropContext | null> =
  React.createContext<SelectBackdropContext | null>(null);

export type IUseSelectBackdropContext = IUseContext<SelectBackdropContext>;

/**
 * {@link SelectBackdropContext} を読み取るフックです。
 */
export const useSelectBackdropContext: IUseSelectBackdropContext =
  function useSuiSelectBackdropContext(optional): any {
    const ctx = React.use(SelectBackdropContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "SelectBackdropContext",
        providerName: "SelectBackdrop",
      });
    }

    return ctx;
  };

export { SelectBackdropContext as BackdropContext, useSelectBackdropContext as useBackdropContext };
