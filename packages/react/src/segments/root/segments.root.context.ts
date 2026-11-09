import type { Size, Color, ColorTemplate } from "@suru-ui/theme";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";

/**
 * 選択中のセグメントの主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type SegmentsContextActiveVariant = ColorTemplate;

/**
 * Segments の配色です。
 */
export type SegmentsContextColor = Color;

/**
 * Segments の角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 円形
 */
export type SegmentsContextRadius = "none" | Size | "full";

/**
 * Segments の大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type SegmentsContextSize = Size;

/**
 * {@link SegmentsRoot} が子パーツへ提供するコンテキストです。
 *
 * @template TItem 項目の型です。
 */
export type SegmentsContext<TItem = any> = {
  /**
   * 選択中のセグメントの主な外観です。
   */
  readonly activeVariant: SegmentsContextActiveVariant;

  /**
   * Segments の配色です。
   */
  readonly color: SegmentsContextColor;

  /**
   * セグメントに表示する項目の一覧です。
   */
  readonly items: readonly TItem[];

  /**
   * Segments の角丸の大きさです。
   */
  readonly radius: SegmentsContextRadius;

  /**
   * Segments の大きさです。
   */
  readonly size: SegmentsContextSize;

  /**
   * 上下の余白を半分にして高さを薄くするかどうかです。
   */
  readonly thin: boolean;
};

/**
 * セグメントの項目を子パーツへ伝播するコンテキストです。
 */
export const SegmentsContext: React.Context<SegmentsContext | null> =
  React.createContext<SegmentsContext | null>(null);

export interface IUseSegmentsContext extends IUseContext<SegmentsContext> {
  /**
   * @template TItem 項目の型です。
   * @param optional `true` の場合、コンテキストが見つからなくてもエラーを投げません。
   * @returns コンテキストです。`optional` が `true` でコンテキストがない場合は `null` です。
   */
  <TItem = any>(optional?: false): SegmentsContext<TItem>;
  <TItem = any>(optional?: boolean): SegmentsContext<TItem> | null;
}

/**
 * {@link SegmentsContext} を読み取るフックです。
 */
export const useSegmentsContext: IUseSegmentsContext = function useSuiSegmentsContext(
  optional?: boolean,
): any {
  const ctx = React.use(SegmentsContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "SegmentsContext",
      providerName: "SegmentsRoot",
    });
  }

  return ctx;
};

export { SegmentsContext as Context, useSegmentsContext as useContext };

export namespace Context {
  export type ActiveVariant = SegmentsContextActiveVariant;

  export type Color = SegmentsContextColor;

  export type Radius = SegmentsContextRadius;

  export type Size = SegmentsContextSize;
}
