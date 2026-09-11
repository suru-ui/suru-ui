import type { Size, Color, ColorTemplate } from "@suru-ui/theme";
import type * as React from "react";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

import "./chip.css";

// Root
// ----

/**
 * チップの配色です。
 */
export type ChipRootColor = Color;

/**
 * チップの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 丸形
 */
export type ChipRootRadius = "none" | Size | "full";

/**
 * チップの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type ChipRootSize = Size;

/**
 * チップの主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type ChipRootVariant = ColorTemplate;

/**
 * {@link ChipRoot} が持つ状態です。
 */
export type ChipRootState = {};

export namespace ChipRootProps {
  export type HTML = Omit<React.ComponentProps<"span">, keyof Render | keyof SuruUI>;

  export type Render = RenderProps<ChipRootState>;

  export type SuruUI = {
    /**
     * チップの色を指定します。
     *
     * @default "grey"
     */
    color?: ChipRootColor | undefined;

    /**
     * チップに枠線を表示するかどうかを指定します。
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
     * チップの主な外観を指定します。
     *
     * @default "liquid"
     */
    variant?: ChipRootVariant | undefined;
  };
}

/**
 * {@link ChipRoot} に渡す props です。
 */
export type ChipRootProps = ChipRootProps.Render & ChipRootProps.SuruUI & ChipRootProps.HTML;

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
          "sui_chip",
          `sui_chip-size_${size}`,
          `sui_chip-color_${color}`,
          `sui_chip-radius_${radius}`,
          `sui_chip-variant_${variant}`,
          outlined && "sui_chip-outlined",
        ),
        "data-scope": dataScope,
      },
    ],
    defaultTagName: "span",
  });
};

export { ChipRoot as Root };

export namespace Root {
  export type State = ChipRootState;

  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    export type HTML = ChipRootProps.HTML;

    export type Render = ChipRootProps.Render;

    export type SuruUI = ChipRootProps.SuruUI;
  }

  export type Color = ChipRootColor;

  export type Radius = ChipRootRadius;

  export type Size = ChipRootSize;

  export type Variant = ChipRootVariant;
}
