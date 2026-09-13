import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import type { Size } from "@suru-ui/theme";

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
 */
export type SkeletonRootRadius = "none" | Size;

/**
 * スケルトンのアニメーションです。
 *
 * - `"pulse"`: 明滅するアニメーション
 * - `"shine"`: 光が流れるアニメーション
 * - `"none"`: アニメーションなし
 */
export type SkeletonRootAnimation = "pulse" | "shine" | "none";

/**
 * {@link SkeletonRoot} が持つ状態です。
 */
export type SkeletonRootState = {};

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

/**
 * スケルトンのルートコンポーネントです。
 */
export const SkeletonRoot: IComponent<SkeletonRootProps> = function SuiSkeletonRoot(props) {
  const {
    radius = "md",
    overlay = false,
    animation = "pulse",
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherSpanProps
  } = props;

  return useRender({
    props: [
      otherSpanProps,
      {
        className: cn(
          "sui_skeleton",
          `sui_skeleton-radius_${radius}`,
          `sui_skeleton-animation_${animation}`,
          overlay && "sui_skeleton-overlay",
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
