import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import * as React from "react";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import {
  type SkeletonContextRadius,
  type SkeletonContextAnimation,
  SkeletonContext,
} from "./skeleton.root.context.js";

/**
 * スケルトンの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type SkeletonRootRadius = SkeletonContextRadius;

/**
 * スケルトンのアニメーションです。
 *
 * - `"pulse"`: 明滅するアニメーション
 * - `"shine"`: 光が流れるアニメーション
 * - `"none"`: アニメーションなし
 */
export type SkeletonRootAnimation = SkeletonContextAnimation;

/**
 * {@link SkeletonRoot} が持つ状態です。
 */
export type SkeletonRootState = SkeletonContext;

export namespace SkeletonRootProps {
  export type Render = RenderProps<SkeletonRootState>;

  export type SuruUI = {
    /**
     * スケルトンのアニメーションを指定します。
     *
     * @default "pulse"
     */
    animation?: SkeletonRootAnimation | undefined;

    /**
     * コンテンツに重ねて表示するかどうかを指定します。
     *
     * `true` の場合は `position: absolute`、`inset: 0`、最も大きい `z-index` で表示されます。
     *
     * @default false
     */
    overlay?: boolean | undefined;

    /**
     * スケルトンの角丸を指定します。
     *
     * @default "md"
     */
    radius?: SkeletonRootRadius | undefined;
  };

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"span", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SkeletonRoot} に渡す props です。
 */
export type SkeletonRootProps = SkeletonRootProps.Render &
  SkeletonRootProps.SuruUI &
  SkeletonRootProps.BaseUI &
  SkeletonRootProps.HTML;

export type ISkeletonRoot = IComponent<SkeletonRootProps>;

/** スケルトンのルートコンポーネントです。 */
export const SkeletonRoot: ISkeletonRoot = (props) => {
  const {
    radius = "md",
    overlay = false,
    animation = "pulse",
    // @ts-expect-error data-scope は Base UI のコンポーネント型に含まれないため。
    "data-scope": dataScope = "",
    ...otherSpanProps
  } = props;
  const ctx = React.useMemo<SkeletonContext>(
    () => ({
      radius,
      overlay,
      animation,
    }),
    [radius, overlay, animation],
  );
  const element = useRender({
    props: [
      otherSpanProps,
      {
        className: cn<SkeletonRootState>(
          "sui_skeleton",
          (state) => `sui_skeleton-radius_${state.radius}`,
          (state) => `sui_skeleton-animation_${state.animation}`,
          (state) => state.overlay && "sui_skeleton-overlay",
        ),
        "data-scope": dataScope,
      },
    ],
    state: ctx,
    defaultTagName: "span",
  });

  return <SkeletonContext value={ctx}>{element}</SkeletonContext>;
};

export { SkeletonRoot as Root };
export namespace Root {
  export type State = SkeletonRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SkeletonRootProps.Render;

    export type SuruUI = SkeletonRootProps.SuruUI;

    export type BaseUI = SkeletonRootProps.BaseUI;

    export type HTML = SkeletonRootProps.HTML;
  }

  export type Animation = SkeletonRootAnimation;

  export type Radius = SkeletonRootRadius;
}
