import type { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { ContextMenuContext } from "../root/context-menu.root.context.js";

/**
 * {@link ContextMenuGroupLabel} が子パーツへ提供する状態です。
 */
export type ContextMenuGroupLabelContext = Readonly<
  Override<ContextMenuContext, ContextMenu.GroupLabel.State>
>;

/**
 * {@link ContextMenuGroupLabel} が子パーツへ提供するコンテキストです。
 */
export const ContextMenuGroupLabelContext: React.Context<ContextMenuGroupLabelContext | null> =
  React.createContext<ContextMenuGroupLabelContext | null>(null);

export type IUseContextMenuGroupLabelContext = IUseContext<ContextMenuGroupLabelContext>;

/**
 * {@link ContextMenuGroupLabelContext} を読み取るフックです。
 */
export const useContextMenuGroupLabelContext: IUseContextMenuGroupLabelContext =
  function useSuiContextMenuGroupLabelContext(optional): any {
    const ctx = React.use(ContextMenuGroupLabelContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "ContextMenuGroupLabelContext",
        providerName: "ContextMenuGroupLabel",
      });
    }

    return ctx;
  };

export {
  ContextMenuGroupLabelContext as GroupLabelContext,
  useContextMenuGroupLabelContext as useGroupLabelContext,
};
