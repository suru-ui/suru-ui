import * as React from "react";

import { ContextMissingError } from "../errors.js";
import type { IUseContext } from "../types.js";

/**
 * パネル群の向きです。
 *
 * - `"horizontal"`: 水平方向にパネルを並べます。
 * - `"vertical"`: 垂直方向にパネルを並べます。
 */
export type ResizableContextOrientation = "horizontal" | "vertical";

/**
 * {@link ResizableRoot} が子パーツへ提供するコンテキストの型です。
 */
export type ResizableContext = {
  /**
   * パネル群の向きです。
   */
  readonly orientation: ResizableContextOrientation;
};

/**
 * {@link ResizableRoot} が子パーツへ提供するコンテキストです。
 */
export const ResizableContext: React.Context<ResizableContext | null> =
  React.createContext<ResizableContext | null>(null);

export type IUseResizableContext = IUseContext<ResizableContext>;

/**
 * {@link ResizableContext} を読み取るフックです。
 */
export const useResizableContext: IUseResizableContext = function useSuiResizableContext(
  optional?: boolean,
): any {
  const ctx = React.use(ResizableContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "ResizableContext",
      providerName: "ResizableRoot",
    });
  }

  return ctx;
};

export { ResizableContext as Context, useResizableContext as useContext };

export namespace Context {
  export type Orientation = ResizableContextOrientation;
}
