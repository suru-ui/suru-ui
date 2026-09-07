import type { Size } from "@suru-ui/theme";
import type * as React from "react";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

import "./skeleton.css";

// Root
// ----

/**
 * スケルトンの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 丸形
 */
export type SkeletonRootRadius = "none" | Size | "full";

/**
 * {@link SkeletonRoot} が持つ状態です。
 */
export type SkeletonRootState = {};

/**
 * {@link SkeletonRoot} に渡す props です。
 */
export type SkeletonRootProps = Omit<React.ComponentProps<"span">, keyof RenderProps> &
  RenderProps<SkeletonRootState> & {
    /**
     * 波打つようなアニメーションを表示するかどうかを指定します。
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
  const { radius = "md", animated = true, className, ...otherSpanProps } = props;

  return useRender({
    defaultTagName: "span",
    props: [
      otherSpanProps,
      {
        className: cn(
          className,
          "sui_skeleton",
          `sui_skeleton-radius_${radius}`,
          animated && "sui_skeleton-animated",
        ),
        "data-scope": "",
      },
    ],
  });
};

export { SkeletonRoot as Root };

export namespace Root {
  /**
   * {@link SkeletonRootState}
   */
  export type State = SkeletonRootState;

  /**
   * {@link SkeletonRootProps}
   */
  export type Props = SkeletonRootProps;

  /**
   * {@link SkeletonRootRadius}
   */
  export type Radius = SkeletonRootRadius;
}
