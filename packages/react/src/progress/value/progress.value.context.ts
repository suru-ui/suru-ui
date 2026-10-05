import type { Progress } from "@base-ui/react/progress";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { ProgressContext } from "../root/progress.root.context.js";

/**
 * {@link ProgressValue} が子パーツへ提供する状態です。
 */
export type ProgressValueContext = Readonly<Override<ProgressContext, Progress.Value.State>>;

/**
 * {@link ProgressValue} が子パーツへ提供するコンテキストです。
 */
export const ProgressValueContext: React.Context<ProgressValueContext | null> =
  React.createContext<ProgressValueContext | null>(null);

export type IUseProgressValueContext = IUseContext<ProgressValueContext>;

/**
 * {@link ProgressValueContext} を読み取るフックです。
 */
export const useProgressValueContext: IUseProgressValueContext =
  function useSuiProgressValueContext(optional): any {
    const ctx = React.use(ProgressValueContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "ProgressValueContext",
        providerName: "ProgressValue",
      });
    }

    return ctx;
  };

export { ProgressValueContext as ValueContext, useProgressValueContext as useValueContext };
