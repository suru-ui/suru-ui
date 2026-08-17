import type { Color, ColorTemplate as Variant, Size } from "@suru-ui/theme";
import type * as React from "react";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Component } from "../../types.js";

import "./chip.css";

// Root
// ----

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
    color?: Color | undefined;

    /**
     * 枠線を表示するかどうかを指定します。
     */
    outlined?: boolean | undefined;

    /**
     * チップの角丸を指定します。
     *
     * @default "full"
     */
    radius?: "none" | Size | "full" | undefined;

    /**
     * チップのサイズを指定します。
     *
     * @default "sm"
     */
    size?: Size | undefined;

    /**
     * チップのスタイルバリエーションを指定します。
     *
     * @default "liquid"
     */
    variant?: Variant | undefined;
  };

/**
 * チップのルートコンポーネントです。
 *
 * @example
 * ```tsx
 * <ChipRoot color="blue">ラベル</ChipRoot>
 * ```
 */
export const ChipRoot: Component<ChipRootProps> = function SuiChipRoot(props) {
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
   * {@link ChipRoot} の状態型です。
   */
  export type State = ChipRootState;

  /**
   * {@link ChipRoot} のプロパティー型です。
   */
  export type Props = ChipRootProps;
}

/**
 * {@link ChipRoot} です。
 */
export const Root: Component<Root.Props> = ChipRoot;
