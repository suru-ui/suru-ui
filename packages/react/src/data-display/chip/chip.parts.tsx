import type { Size, Color, ColorTemplate } from "@suru-ui/theme";
import type * as React from "react";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

import "./chip.css";

// Root
// ----

/**
 * チップの色です。
 */
export type ChipRootColor = Color;

/**
 * チップの角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type ChipRootRadius = "none" | Size | "full";

/**
 * チップの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type ChipRootSize = Size;

/**
 * チップの主な外観の種類です。
 *
 * - `"solid"`: 塗りつぶしスタイル
 * - `"naked"`: 背景のないテキストのみ
 * - `"liquid"`: 薄い塗りつぶし
 */
export type ChipRootVariant = ColorTemplate;

/**
 * {@link ChipRoot} の状態です。
 */
export type ChipRootState = {};

/**
 * {@link ChipRoot} に渡すプロパティーです。
 */
export type ChipRootProps = Omit<React.ComponentProps<"span">, keyof RenderProps> &
  RenderProps<ChipRootState> & {
    /**
     * チップの色を指定します。
     *
     * @default "grey"
     */
    color?: ChipRootColor | undefined;

    /**
     * 枠線を表示するかどうかを指定します。
     *
     * @default false
     */
    outlined?: boolean | undefined;

    /**
     * チップの角丸を指定します。
     *
     * @default "full"
     */
    radius?: ChipRootRadius | undefined;

    /**
     * チップのサイズを指定します。
     *
     * @default "sm"
     */
    size?: ChipRootSize | undefined;

    /**
     * チップのスタイルバリエーションを指定します。
     *
     * @default "liquid"
     */
    variant?: ChipRootVariant | undefined;
  };

/**
 * チップのルートコンポーネントです。
 */
export const ChipRoot: IComponent<ChipRootProps> = function SuiChipRoot(props) {
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
          "sui_chip",
          `sui_chip-size_${size}`,
          `sui_chip-color_${color}`,
          `sui_chip-radius_${radius}`,
          `sui_chip-variant_${variant}`,
          outlined && "sui_chip-outlined",
        ),
      },
    ],
  });
};

/**
 * {@link ChipRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link ChipRootState} です。
   */
  export type State = ChipRootState;

  /**
   * {@link ChipRootProps} です。
   */
  export type Props = ChipRootProps;
}

/**
 * {@link ChipRoot} です。
 */
export const Root: IComponent<Root.Props> = ChipRoot;
