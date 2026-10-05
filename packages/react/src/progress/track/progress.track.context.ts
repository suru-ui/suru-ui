import type { Progress } from "@base-ui/react/progress";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { ProgressContext } from "../root/progress.root.context.js";

/**
 * {@link ProgressTrack} が子パーツへ提供する状態です。
 */
export type ProgressTrackContext = Readonly<Override<ProgressContext, Progress.Track.State>>;

/**
 * {@link ProgressTrack} が子パーツへ提供するコンテキストです。
 */
export const ProgressTrackContext: React.Context<ProgressTrackContext | null> =
  React.createContext<ProgressTrackContext | null>(null);

export type IUseProgressTrackContext = IUseContext<ProgressTrackContext>;

/**
 * {@link ProgressTrackContext} を読み取るフックです。
 */
export const useProgressTrackContext: IUseProgressTrackContext =
  function useSuiProgressTrackContext(optional): any {
    const ctx = React.use(ProgressTrackContext);
    if (ctx === null && !optional) {
      throw new ContextMissingError({
        contextName: "ProgressTrackContext",
        providerName: "ProgressTrack",
      });
    }

    return ctx;
  };

export { ProgressTrackContext as TrackContext, useProgressTrackContext as useTrackContext };
