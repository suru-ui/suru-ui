import type { Size, Color, ColorTemplate } from "@suru-ui/theme";
import type * as React from "react";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

import "./badge.css";

// Root
// ----

/**
 * バッジの色です。
 */
export type BadgeRootColor = Color;

/**
 * バッジの角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type BadgeRootRadius = "none" | Size | "full";

/**
 * バッジの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type BadgeRootSize = Size;

/**
 * バッジの主な外観の種類です。
 *
 * - `"solid"`: 塗りつぶしスタイル
 * - `"naked"`: 背景のないテキストのみ
 * - `"liquid"`: 薄い塗りつぶし
 */
export type BadgeRootVariant = ColorTemplate;

/**
 * {@link BadgeRoot} の状態です。
 */
export type BadgeRootState = {};

/**
 * {@link BadgeRoot} に渡すプロパティーです。
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
     * バッジの角丸を指定します。
     *
     * @default "full"
     */
    radius?: BadgeRootRadius | undefined;

    /**
     * バッジのサイズを指定します。
     *
     * @default "sm"
     */
    size?: BadgeRootSize | undefined;

    /**
     * バッジの主な外観を指定します。
     *
     * @default "liquid"
     */
    variant?: BadgeRootVariant | undefined;
  };

/**
 * バッジのルートコンポーネントです。
 */
export const BadgeRoot: IComponent<BadgeRootProps> = function SuiBadgeRoot(props) {
  const {
    size = "sm",
    color = "grey",
    radius = "full",
    variant = "liquid",
    outlined = false,
    ...otherProps
  } = props;

  return useRender({
    defaultTagName: "span",
    props: [
      otherProps,
      {
        className: cn(
          "sui_badge",
          `sui_badge-size_${size}`,
          `sui_badge-color_${color}`,
          `sui_badge-radius_${radius}`,
          `sui_badge-variant_${variant}`,
          outlined && "sui_badge-outlined",
        ),
      },
    ],
  });
};

/**
 * {@link BadgeRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link BadgeRootState} です。
   */
  export type State = BadgeRootState;

  /**
   * {@link BadgeRootProps} です。
   */
  export type Props = BadgeRootProps;
}

/**
 * {@link BadgeRoot} です。
 */
export const Root: IComponent<Root.Props> = BadgeRoot;
