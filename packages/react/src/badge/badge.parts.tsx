import type { Size, Color } from "@suru-ui/theme";
import type * as React from "react";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

import "./badge.css";

// Root
// ----

/**
 * バッジの配色です。
 */
export type BadgeRootColor = Color;

/**
 * バッジの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 丸形
 */
export type BadgeRootRadius = "none" | Size | "full";

/**
 * バッジの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type BadgeRootSize = Size;

/**
 * バッジを重ねる要素の形状です。
 *
 * - `"rectangular"`: 四角形
 * - `"circular"`: 円形
 */
export type BadgeRootOverlap = "rectangular" | "circular";

/**
 * バッジの配置です。
 *
 * - `"top-left"`: 左上
 * - `"top-right"`: 右上
 * - `"bottom-left"`: 左下
 * - `"bottom-right"`: 右下
 */
export type BadgeRootPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

/**
 * バッジの主な外観です。
 *
 * - `"standard"`: 標準
 * - `"dot"`: 内容を表示しない小さな点
 */
export type BadgeRootVariant = "standard" | "dot";

/**
 * {@link BadgeRoot} が持つ状態です。
 */
export type BadgeRootState = {};

/**
 * {@link BadgeRoot} に渡す props です。
 */
export type BadgeRootProps = Omit<React.ComponentProps<"span">, keyof RenderProps> &
  RenderProps<BadgeRootState> & {
    /**
     * バッジの色を指定します。
     *
     * @default "grey"
     */
    color?: BadgeRootColor | undefined;

    /**
     * 枠線を表示するかどうかを指定します。
     *
     * @default false
     */
    outlined?: boolean | undefined;

    /**
     * バッジを重ねる要素の形状を指定します。
     *
     * `position` と組み合わせて使い、`"circular"` では円形の円周上に、`"rectangular"` では四角形の角にバッジの中心が来るように調整されます。
     *
     * @default "rectangular"
     */
    overlap?: BadgeRootOverlap | undefined;

    /**
     * バッジの配置を指定します。
     *
     * 指定すると祖先の位置指定要素を基準に絶対位置で四隅のいずれかに配置されます。省略すると通常フローで表示されます。
     */
    position?: BadgeRootPosition | undefined;

    /**
     * バッジの角丸を指定します。
     *
     * @default "full"
     */
    radius?: BadgeRootRadius | undefined;

    /**
     * 仮想リングを表示するかどうかを指定します。
     *
     * @default false
     */
    ring?: boolean | undefined;

    /**
     * バッジのサイズを指定します。
     *
     * @default "sm"
     */
    size?: BadgeRootSize | undefined;

    /**
     * バッジの主な外観を指定します。
     *
     * @default "standard"
     */
    variant?: BadgeRootVariant | undefined;
  };

/**
 * バッジのルートコンポーネントです。
 */
export const BadgeRoot: IComponent<BadgeRootProps> = function SuiBadgeRoot(props) {
  const {
    ring = false,
    size = "sm",
    color = "grey",
    radius = "full",
    overlap = "rectangular",
    variant = "standard",
    outlined = false,
    children: childrenProp,
    position,
    className,
    ...otherSpanProps
  } = props;

  return useRender({
    defaultTagName: "span",
    props: [
      otherSpanProps,
      {
        children: variant === "dot" ? null : childrenProp,
        className: cn(
          className,
          "sui_badge",
          `sui_badge-size_${size}`,
          `sui_badge-color_${color}`,
          `sui_badge-radius_${radius}`,
          `sui_badge-overlap_${overlap}`,
          `sui_badge-variant_${variant}`,
          ring && "sui_badge-ring",
          outlined && "sui_badge-outlined",
          position && `sui_badge-position_${position.replace("-", "_")}`,
        ),
        "data-scope": "",
      },
    ],
  });
};

export { BadgeRoot as Root };

export namespace Root {
  /**
   * {@link BadgeRootState}
   */
  export type State = BadgeRootState;

  /**
   * {@link BadgeRootProps}
   */
  export type Props = BadgeRootProps;

  /**
   * {@link BadgeRootColor}
   */
  export type Color = BadgeRootColor;

  /**
   * {@link BadgeRootOverlap}
   */
  export type Overlap = BadgeRootOverlap;

  /**
   * {@link BadgeRootPosition}
   */
  export type Position = BadgeRootPosition;

  /**
   * {@link BadgeRootRadius}
   */
  export type Radius = BadgeRootRadius;

  /**
   * {@link BadgeRootSize}
   */
  export type Size = BadgeRootSize;

  /**
   * {@link BadgeRootVariant}
   */
  export type Variant = BadgeRootVariant;
}
