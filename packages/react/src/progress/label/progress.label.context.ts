import type { Progress } from "@base-ui/react/progress";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { ProgressContext } from "../root/progress.root.context.js";

/**
 * {@link ProgressLabel} が子パーツへ提供する状態です。
 */
export type ProgressLabelContext = Readonly<Override<ProgressContext, Progress.Label.State>>;

/**
 * {@link ProgressLabel} が子パーツへ提供するコンテキストです。
 */
export const ProgressLabelContext: React.Context<ProgressLabelContext | null> =
  React.createContext<ProgressLabelContext | null>(null);

export type IUseProgressLabelContext = IUseContext<ProgressLabelContext>;

/**
 * {@link ProgressLabelContext} を読み取るフックです。
 */
export const useProgressLabelContext: IUseProgressLabelContext = (optional): any => {
  const ctx = React.use(ProgressLabelContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "ProgressLabelContext",
      providerName: "ProgressLabel",
    });
  }

  return ctx;
};

export { ProgressLabelContext as LabelContext, useProgressLabelContext as useLabelContext };
