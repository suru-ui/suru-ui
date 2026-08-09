import {
  useRenderElement,
  type UseRenderElementComponentProps,
} from "@base-ui/react/internals/useRenderElement";
import type { Color, ColorTemplate as Variant, Size } from "@suru-ui/theme";
import * as React from "react";

import splitRenderProps from "../../_split-render-props.js";
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
export type ChipRootProps = Omit<
  React.ComponentProps<"span">,
  keyof UseRenderElementComponentProps<ChipRootState>
> &
  UseRenderElementComponentProps<ChipRootState> & {
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
    radius?: "none" | "rounded" | "full" | undefined;

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
  const [renderProps, componentProps] = splitRenderProps(props);
  const {
    variant = "liquid",
    color = "grey",
    size = "sm",
    radius = "full",
    outlined = false,
    ref,
    ...elementProps
  } = componentProps;

  return useRenderElement("span", renderProps, {
    ref,
    props: [
      elementProps,
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
  export type State = ChipRootState;
  export type Props = ChipRootProps;
}

export const Root: Component<Root.Props> = ChipRoot;
