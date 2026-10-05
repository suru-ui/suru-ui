import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { ProgressLabelState } from "./progress.label.jsx";

/**
 * {@link ProgressLabel} が子パーツへ提供する状態です。
 */
export type ProgressLabelContext = Readonly<ProgressLabelState>;

/**
 * {@link ProgressLabel} が子パーツへ提供するコンテキストです。
 */
export const ProgressLabelContext: React.Context<ProgressLabelContext | null> =
  React.createContext<ProgressLabelContext | null>(null);

export type IUseProgressLabelContext = IUseContext<ProgressLabelContext>;

/**
 * {@link ProgressLabelContext} を読み取るフックです。
 */
export const useProgressLabelContext: IUseProgressLabelContext =
  function useSuiProgressLabelContext(optional): any {
    const ctx = React.use(ProgressLabelContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "ProgressLabelContext",
        providerName: "ProgressLabel",
      });
    }

    return ctx;
  };

export { ProgressLabelContext as LabelContext, useProgressLabelContext as useLabelContext };
