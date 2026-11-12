import type { Size } from "@suru-ui/theme";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";

/**
 * スケルトンの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type SkeletonContextRadius = "none" | Size;

/**
 * スケルトンのアニメーションです。
 *
 * - `"pulse"`: 明滅するアニメーション
 * - `"shine"`: 光が流れるアニメーション
 * - `"none"`: アニメーションなし
 */
export type SkeletonContextAnimation = "pulse" | "shine" | "none";

/**
 * {@link SkeletonRoot} が提供する状態です。
 */
export type SkeletonContext = {
  /** スケルトンのアニメーションです。 */
  readonly animation: SkeletonContextAnimation;

  /** コンテンツに重ねて表示するかどうかです。 */
  readonly overlay: boolean;

  /** スケルトンの角丸の大きさです。 */
  readonly radius: SkeletonContextRadius;
};

/** スケルトンの見た目を子孫へ伝播するコンテキストです。 */
export const SkeletonContext: React.Context<SkeletonContext | null> =
  React.createContext<SkeletonContext | null>(null);

export type IUseSkeletonContext = IUseContext<SkeletonContext>;

/**
 * {@link SkeletonContext} を読み取るフックです。
 */
export const useSkeletonContext: IUseSkeletonContext = (optional?: boolean): any => {
  const ctx = React.use(SkeletonContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "SkeletonContext",
      providerName: "SkeletonRoot",
    });
  }

  return ctx;
};

export { SkeletonContext as Context, useSkeletonContext as useContext };
export namespace Context {
  export type Animation = SkeletonContextAnimation;

  export type Radius = SkeletonContextRadius;
}
