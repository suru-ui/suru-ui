import type { Size } from "@suru-ui/theme";
import type * as React from "react";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

import "./skeleton.css";

// Root
// ----

/**
 * スケルトンの角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type SkeletonRootRadius = "none" | Size | "full";

/**
 * {@link SkeletonRoot} の状態です。
 */
export type SkeletonRootState = {};

/**
 * {@link SkeletonRoot} に渡すプロパティーです。
 */
export type SkeletonRootProps = Omit<React.ComponentProps<"span">, keyof RenderProps> &
  RenderProps<SkeletonRootState> & {
    /**
     * スケルトンに波打つようなアニメーションを表示します。
     *
     * @default true
     */
    animated?: boolean | undefined;

    /**
     * スケルトンの角丸を指定します。
     *
     * @default "md"
     */
    radius?: SkeletonRootRadius | undefined;
  };

/**
 * スケルトンのルートコンポーネントです。
 */
export const SkeletonRoot: IComponent<SkeletonRootProps> = function SuiSkeletonRoot(props) {
  const { animated = true, radius = "md", ...otherProps } = props;

  return useRender({
    defaultTagName: "span",
    props: [
      otherProps,
      {
        className: cn(
          "sui_skeleton",
          `sui_skeleton-radius_${radius}`,
          animated && "sui_skeleton-animated",
        ),
      },
    ],
  });
};

/**
 * {@link SkeletonRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link SkeletonRootState} です。
   */
  export type State = SkeletonRootState;

  /**
   * {@link SkeletonRootProps} です。
   */
  export type Props = SkeletonRootProps;

  /**
   * {@link SkeletonRootRadius} です。
   */
  export type Radius = SkeletonRootRadius;
}

/**
 * {@link SkeletonRoot} です。
 */
export const Root: IComponent<Root.Props> = SkeletonRoot;
