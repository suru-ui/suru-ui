import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import * as React from "react";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import {
  type BadgeContextSize,
  type BadgeContextColor,
  type BadgeContextRadius,
  type BadgeContextOverlap,
  type BadgeContextVariant,
  type BadgeContextPosition,
  BadgeContext,
} from "./badge.root.context.js";

/**
 * バッジの配色です。
 */
export type BadgeRootColor = BadgeContextColor;

/**
 * バッジを重ねる要素の形状です。
 *
 * - `"rectangular"`: 四角形
 * - `"circular"`: 円形
 */
export type BadgeRootOverlap = BadgeContextOverlap;

/**
 * バッジの配置です。
 *
 * - `"top-left"`: 左上
 * - `"top-right"`: 右上
 * - `"bottom-left"`: 左下
 * - `"bottom-right"`: 右下
 */
export type BadgeRootPosition = BadgeContextPosition;

/**
 * バッジの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 丸形
 */
export type BadgeRootRadius = BadgeContextRadius;

/**
 * バッジの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type BadgeRootSize = BadgeContextSize;

/**
 * バッジの主な外観です。
 *
 * - `"standard"`: 標準
 * - `"dot"`: 内容を表示しない小さな点
 */
export type BadgeRootVariant = BadgeContextVariant;

/**
 * {@link BadgeRoot} が持つ状態です。
 */
export type BadgeRootState = BadgeContext;

export namespace BadgeRootProps {
  export type Render = RenderProps<BadgeRootState>;

  export type SuruUI = {
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
     * バッジの周囲にリングを表示するかどうかを指定します。
     *
     * 重ねた要素との境界を分けるために使います。
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

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"span", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link BadgeRoot} に渡す props です。
 */
export type BadgeRootProps = BadgeRootProps.Render &
  BadgeRootProps.SuruUI &
  BadgeRootProps.BaseUI &
  BadgeRootProps.HTML;

export type IBadgeRoot = IComponent<BadgeRootProps>;

/**
 * バッジのルート要素です。
 *
 * 大きさ、配色、角丸などの外観を自身のスタイルに集約します。
 */
export const BadgeRoot: IBadgeRoot = function SuiBadgeRoot(props) {
  const {
    ring = false,
    size = "sm",
    color = "grey",
    radius = "full",
    overlap = "rectangular",
    variant = "standard",
    children,
    outlined = false,
    position,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherSpanProps
  } = props;

  const ctx = React.useMemo<BadgeContext>(
    () => ({ ring, size, color, radius, overlap, variant, outlined, position }),
    [ring, size, color, radius, overlap, variant, outlined, position],
  );
  const element = useRender({
    props: [
      otherSpanProps,
      {
        children: variant === "dot" ? null : children,
        className: cn<BadgeRootState>(
          "sui_badge",
          (state) => `sui_badge-size_${state.size}`,
          (state) => `sui_badge-color_${state.color}`,
          (state) => `sui_badge-radius_${state.radius}`,
          (state) => `sui_badge-overlap_${state.overlap}`,
          (state) => `sui_badge-variant_${state.variant}`,
          (state) => state.position && `sui_badge-position_${state.position.replaceAll("-", "_")}`,
          (state) => state.ring && "sui_badge-ring",
          (state) => state.outlined && "sui_badge-outlined",
        ),
        "data-scope": dataScope,
      },
    ],
    state: ctx,
    defaultTagName: "span",
  });

  return <BadgeContext value={ctx}>{element}</BadgeContext>;
};

export { BadgeRoot as Root };

export namespace Root {
  export type State = BadgeRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = BadgeRootProps.Render;

    export type SuruUI = BadgeRootProps.SuruUI;

    export type BaseUI = BadgeRootProps.BaseUI;

    export type HTML = BadgeRootProps.HTML;
  }

  export type Color = BadgeRootColor;

  export type Overlap = BadgeRootOverlap;

  export type Position = BadgeRootPosition;

  export type Radius = BadgeRootRadius;

  export type Size = BadgeRootSize;

  export type Variant = BadgeRootVariant;
}
