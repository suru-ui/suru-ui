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

export namespace SkeletonRootProps {
  export type HTML = Omit<React.ComponentProps<"span">, keyof Render | keyof SuruUI>;

  export type Render = RenderProps<SkeletonRootState>;

  export type SuruUI = {
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
}

/**
 * {@link SkeletonRoot} に渡す props です。
 */
export type SkeletonRootProps = SkeletonRootProps.Render &
  SkeletonRootProps.SuruUI &
  SkeletonRootProps.HTML;

/**
 * スケルトンのルートコンポーネントです。
 */
export const SkeletonRoot: IComponent<SkeletonRootProps> = function SuiSkeletonRoot(props) {
  const {
    radius = "md",
    animated = true,
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherSpanProps
  } = props;

  return useRender({
    props: [
      otherSpanProps,
      {
        className: cn(
          className,
          "sui_skeleton",
          `sui_skeleton-radius_${radius}`,
          animated && "sui_skeleton-animated",
        ),
        "data-scope": dataScope,
      },
    ],
    defaultTagName: "span",
  });
};

export { SkeletonRoot as Root };

export namespace Root {
  export type State = SkeletonRootState;

  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    export type HTML = SkeletonRootProps.HTML;

    export type Render = SkeletonRootProps.Render;

    export type SuruUI = SkeletonRootProps.SuruUI;
  }

  export type Radius = SkeletonRootRadius;
}
