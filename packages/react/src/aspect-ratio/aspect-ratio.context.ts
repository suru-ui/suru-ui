import type { Size } from "@suru-ui/theme";
import * as React from "react";

import { ContextMissingError } from "../errors.js";
import type { IUseContext } from "../types.js";

/**
 * アスペクト比コンテナーの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type AspectRatioContextRadius = "none" | Size;

/**
 * アスペクト比です。
 *
 * 数値は「幅 / 高さ」として解釈されます。
 * CSS の `aspect-ratio` プロパティーと同じ形式の値を指定できます。
 */
export type AspectRatioContextRatio = NonNullable<React.CSSProperties["aspectRatio"]>;

/**
 * {@link AspectRatioRoot} が提供する状態です。
 */
export type AspectRatioContext = {
  /**
   * コンテナーの角丸の大きさです。
   */
  readonly radius: AspectRatioContextRadius;

  /**
   * コンテンツの幅と高さの比率です。
   */
  readonly ratio: AspectRatioContextRatio;
};

/**
 * アスペクト比コンテナーの見た目を子孫へ伝播するコンテキストです。
 */
export const AspectRatioContext: React.Context<AspectRatioContext | null> =
  React.createContext<AspectRatioContext | null>(null);

export type IUseAspectRatioContext = IUseContext<AspectRatioContext>;

/**
 * {@link AspectRatioContext} を読み取るフックです。
 */
export const useAspectRatioContext: IUseAspectRatioContext = function useSuiAspectRatioContext(
  optional?: boolean,
): any {
  const ctx = React.use(AspectRatioContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "AspectRatioContext",
      providerName: "AspectRatioRoot",
    });
  }

  return ctx;
};

export { AspectRatioContext as Context, useAspectRatioContext as useContext };

export namespace Context {
  export type Radius = AspectRatioContextRadius;

  export type Ratio = AspectRatioContextRatio;
}
