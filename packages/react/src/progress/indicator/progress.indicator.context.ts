import type { Progress } from "@base-ui/react/progress";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { ProgressContext } from "../root/progress.root.context.js";

/**
 * {@link ProgressIndicator} が子パーツへ提供する状態です。
 */
export type ProgressIndicatorContext = Readonly<
  Override<ProgressContext, Progress.Indicator.State>
>;

/**
 * {@link ProgressIndicator} が子パーツへ提供するコンテキストです。
 */
export const ProgressIndicatorContext: React.Context<ProgressIndicatorContext | null> =
  React.createContext<ProgressIndicatorContext | null>(null);

export type IUseProgressIndicatorContext = IUseContext<ProgressIndicatorContext>;

/**
 * {@link ProgressIndicatorContext} を読み取るフックです。
 */
export const useProgressIndicatorContext: IUseProgressIndicatorContext =
  function useSuiProgressIndicatorContext(optional): any {
    const ctx = React.use(ProgressIndicatorContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "ProgressIndicatorContext",
        providerName: "ProgressIndicator",
      });
    }

    return ctx;
  };

export {
  ProgressIndicatorContext as IndicatorContext,
  useProgressIndicatorContext as useIndicatorContext,
};
