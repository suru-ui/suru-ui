import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import { ContextMissingError } from "../errors.js";
import type { IUseContext } from "../types.js";

/**
 * ラベルの配色です。
 */
export type LabelContextColor = Color;

/**
 * ラベルの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type LabelContextSize = Size;

/**
 * {@link LabelRoot} が提供する状態です。
 */
export type LabelContext = {
  /**
   * ラベルの配色です。
   */
  readonly color: LabelContextColor;

  /**
   * ラベルを無効にするかどうかです。
   */
  readonly disabled: boolean;

  /**
   * ラベルの大きさです。
   */
  readonly size: LabelContextSize;
};

/**
 * ラベルの見た目を子孫へ伝播するコンテキストです。
 */
export const LabelContext: React.Context<LabelContext | null> =
  React.createContext<LabelContext | null>(null);

export type IUseLabelContext = IUseContext<LabelContext>;

/**
 * {@link LabelContext} を読み取るフックです。
 */
export const useLabelContext: IUseLabelContext = function useSuiLabelContext(
  optional?: boolean,
): any {
  const ctx = React.use(LabelContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "LabelContext",
      providerName: "LabelRoot",
    });
  }

  return ctx;
};

export { LabelContext as Context, useLabelContext as useContext };

export namespace Context {
  export type Color = LabelContextColor;

  export type Size = LabelContextSize;
}
