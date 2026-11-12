import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import * as React from "react";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import {
  type ChipContextSize,
  type ChipContextColor,
  type ChipContextRadius,
  type ChipContextVariant,
  ChipContext,
} from "./chip.root.context.js";

/** チップの配色です。 */
export type ChipRootColor = ChipContextColor;

/**
 * チップの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 丸形
 * - `"circle"`: 完全な円形
 */
export type ChipRootRadius = ChipContextRadius;

/**
 * チップの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type ChipRootSize = ChipContextSize;

/**
 * チップの主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type ChipRootVariant = ChipContextVariant;

/**
 * {@link ChipRoot} が持つ状態です。
 */
export type ChipRootState = ChipContext;

export namespace ChipRootProps {
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

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"span", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ChipRoot} に渡す props です。
 */
export type ChipRootProps = ChipRootProps.Render &
  ChipRootProps.SuruUI &
  ChipRootProps.BaseUI &
  ChipRootProps.HTML;

export type IChipRoot = IComponent<ChipRootProps>;

/**
 * チップのルートコンポーネントです。
 *
 * `render` に `button` 要素を渡すと、押せるチップとして描画できます。
 */
export const ChipRoot: IChipRoot = (props) => {
  const {
    size = "sm",
    color = "grey",
    radius = "full",
    variant = "liquid",
    outlined = false,
    // @ts-expect-error data-scope は Base UI のコンポーネント型に含まれないため。
    "data-scope": dataScope = "",
    ...otherSpanProps
  } = props;
  const ctx = React.useMemo<ChipContext>(
    () => ({
      size,
      color,
      radius,
      variant,
      outlined,
    }),
    [size, color, radius, variant, outlined],
  );
  const element = useRender({
    props: [
      otherSpanProps,
      {
        className: cn<ChipRootState>(
          "sui_chip",
          (state) => `sui_chip-size_${state.size}`,
          (state) => `sui_chip-color_${state.color}`,
          (state) => `sui_chip-radius_${state.radius}`,
          (state) => `sui_chip-variant_${state.variant}`,
          (state) => state.outlined && "sui_chip-outlined",
        ),
        "data-scope": dataScope,
      },
    ],
    state: ctx,
    defaultTagName: "span",
  });

  return <ChipContext value={ctx}>{element}</ChipContext>;
};

export { ChipRoot as Root };
export namespace Root {
  export type State = ChipRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ChipRootProps.Render;

    export type SuruUI = ChipRootProps.SuruUI;

    export type BaseUI = ChipRootProps.BaseUI;

    export type HTML = ChipRootProps.HTML;
  }

  export type Color = ChipRootColor;

  export type Radius = ChipRootRadius;

  export type Size = ChipRootSize;

  export type Variant = ChipRootVariant;
}
