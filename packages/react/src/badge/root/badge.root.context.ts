import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";

/**
 * バッジの配色です。
 */
export type BadgeContextColor = Color;

/**
 * バッジを重ねる要素の形状です。
 *
 * - `"rectangular"`: 四角形
 * - `"circular"`: 円形
 */
export type BadgeContextOverlap = "rectangular" | "circular";

/**
 * バッジの配置です。
 *
 * - `"top-left"`: 左上
 * - `"top-right"`: 右上
 * - `"bottom-left"`: 左下
 * - `"bottom-right"`: 右下
 */
export type BadgeContextPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

/**
 * バッジの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 丸形
 */
export type BadgeContextRadius = "none" | Size | "full";

/**
 * バッジの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type BadgeContextSize = Size;

/**
 * バッジの主な外観です。
 *
 * - `"standard"`: 標準
 * - `"dot"`: 内容を表示しない小さな点
 */
export type BadgeContextVariant = "standard" | "dot";

/**
 * {@link BadgeRoot} が提供する状態です。
 */
export type BadgeContext = {
  /**
   * バッジの色です。
   */
  readonly color: BadgeContextColor;

  /**
   * 枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * バッジを重ねる要素の形状です。
   */
  readonly overlap: BadgeContextOverlap;

  /**
   * バッジの配置です。
   */
  readonly position: BadgeContextPosition | undefined;

  /**
   * バッジの角丸の大きさです。
   */
  readonly radius: BadgeContextRadius;

  /**
   * バッジの周囲にリングを表示するかどうかです。
   */
  readonly ring: boolean;

  /**
   * バッジの大きさです。
   */
  readonly size: BadgeContextSize;

  /**
   * バッジの主な外観です。
   */
  readonly variant: BadgeContextVariant;
};

/**
 * バッジの見た目を子孫へ伝播するコンテキストです。
 */
export const BadgeContext: React.Context<BadgeContext | null> =
  React.createContext<BadgeContext | null>(null);

export type IUseBadgeContext = IUseContext<BadgeContext>;

/**
 * {@link BadgeContext} を読み取るフックです。
 */
export const useBadgeContext: IUseBadgeContext = function useSuiBadgeContext(
  optional?: boolean,
): any {
  const ctx = React.use(BadgeContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "BadgeContext",
      providerName: "BadgeRoot",
    });
  }

  return ctx;
};

export { BadgeContext as Context, useBadgeContext as useContext };

export namespace Context {
  export type Color = BadgeContextColor;

  export type Overlap = BadgeContextOverlap;

  export type Position = BadgeContextPosition;

  export type Radius = BadgeContextRadius;

  export type Size = BadgeContextSize;

  export type Variant = BadgeContextVariant;
}
