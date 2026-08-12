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
     * チップのスタイルバリエーションを指定します。
     *
     * @default "liquid"
     */
    variant?: Variant | undefined;

    /**
     * チップの色を指定します。
     *
     * @default "grey"
     */
    color?: Color | undefined;

    /**
     * チップのサイズを指定します。
     *
     * @default "sm"
     */
    size?: Size | undefined;

    /**
     * チップの角丸を指定します。
     *
     * @default "full"
     */
    radius?: "none" | Size | "full" | undefined;

    /**
     * 枠線を表示するかどうかを指定します。
     */
    outlined?: boolean | undefined;
  };

/**
 * チップのルート要素です。
 *
 * @example
 * ```tsx
 * <ChipParts.Root color="blue">ラベル</ChipParts.Root>
 * ```
 */
export const ChipRoot: Component<ChipRootProps> = function SuiChipRoot(props) {
  const {
    size = "sm",
    color = "grey",
    radius = "full",
    variant = "liquid",
    outlined = variant !== "solid",
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

export const Root: Component<Root.Props> = ChipRoot;
