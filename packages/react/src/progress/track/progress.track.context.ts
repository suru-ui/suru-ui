import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { ProgressTrackState } from "./progress.track.jsx";

/**
 * {@link ProgressTrack} が子パーツへ提供する状態です。
 */
export type ProgressTrackContext = Readonly<ProgressTrackState>;

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
