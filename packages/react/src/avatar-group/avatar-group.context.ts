import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import { ContextMissingError } from "../errors.js";
import type { IUseContext } from "../types.js";

/**
 * アバターの配色です。
 */
export type AvatarGroupContextColor = Color;

/**
 * アバターの角丸です。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 完全な丸形
 */
export type AvatarGroupContextRadius = "none" | Size | "full";

/**
 * アバターの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type AvatarGroupContextSize = Size;

/**
 * {@link AvatarGroupRoot} が子パーツへ提供するコンテキストです。
 */
export type AvatarGroupContext = {
  /**
   * アバターの背景配色です。
   */
  readonly color: AvatarGroupContextColor;

  /**
   * アバターの角丸です。
   */
  readonly radius: AvatarGroupContextRadius;

  /**
   * アバターの大きさです。
   */
  readonly size: AvatarGroupContextSize;
};

/**
 * アバターグループのスタイルを子要素へ伝播するコンテキストです。
 */
export const AvatarGroupContext: React.Context<AvatarGroupContext | null> =
  React.createContext<AvatarGroupContext | null>(null);

export type IUseAvatarGroupContext = IUseContext<AvatarGroupContext>;

/**
 * {@link AvatarGroupContext} を読み取るフックです。
 */
export const useAvatarGroupContext: IUseAvatarGroupContext = function useSuiAvatarGroupContext(
  optional?: boolean,
): any {
  const ctx = React.use(AvatarGroupContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "AvatarGroupContext",
      providerName: "AvatarGroupRoot",
    });
  }

  return ctx;
};

export { AvatarGroupContext as Context, useAvatarGroupContext as useContext };

export namespace Context {
  export type Color = AvatarGroupContextColor;

  export type Radius = AvatarGroupContextRadius;

  export type Size = AvatarGroupContextSize;
}
