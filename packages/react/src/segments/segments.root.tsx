import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import type { Size, Color, ColorTemplate } from "@suru-ui/theme";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * Segments のアクティブなセグメントが変更されるイベントの詳細です。
 */
export type SegmentsRootChangeEventDetails = BaseTabs.Root.ChangeEventDetails;

/**
 * Segments のアクティブなセグメントを変更する理由です。
 */
export type SegmentsRootChangeEventReason = BaseTabs.Root.ChangeEventReason;

/**
 * Segments の方向です。
 *
 * - `"horizontal"`: 水平方向
 * - `"vertical"`: 垂直方向
 */
export type SegmentsRootOrientation = BaseTabs.Root.Orientation;

/**
 * 選択中のセグメントの主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type SegmentsRootActiveVariant = ColorTemplate;

/**
 * Segments の配色です。
 */
export type SegmentsRootColor = Color;

/**
 * Segments の角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 円形
 */
export type SegmentsRootRadius = "none" | Size | "full";

/**
 * Segments の大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type SegmentsRootSize = Size;

/**
 * {@link SegmentsRoot} が持つ状態です。
 */
export type SegmentsRootState = BaseTabs.Root.State;

export namespace SegmentsRootProps {
  export type Render = RenderProps<SegmentsRootState>;

  export type SuruUI = {
    /**
     * 選択中のセグメントの主な外観を指定します。
     *
     * @default "solid"
     */
    activeVariant?: SegmentsRootActiveVariant | undefined;

    /**
     * Segments の配色を指定します。
     *
     * 選択されている項目の背景と文字色に使われます。
     *
     * @default "grey"
     */
    color?: SegmentsRootColor | undefined;

    /**
     * Segments の角丸の大きさを指定します。
     *
     * 既定値は {@link SegmentsRootProps.size|size}
     */
    radius?: SegmentsRootRadius | undefined;

    /**
     * Segments の大きさを指定します。
     *
     * @default "md"
     */
    size?: SegmentsRootSize | undefined;
  };

  export type BaseUI = Pick<
    React.ComponentProps<typeof BaseTabs.Root>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // TabsRootProps:
      "value" | "defaultValue" | "orientation" | "onValueChange",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseTabs.Root>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SegmentsRoot} に渡す props です。
 */
export type SegmentsRootProps = SegmentsRootProps.Render &
  SegmentsRootProps.SuruUI &
  SegmentsRootProps.BaseUI &
  SegmentsRootProps.HTML;

/**
 * Segments のルート要素です。
 *
 * 個々のセグメントをグループ化し、選択値を管理します。
 */
export const SegmentsRoot: IComponent<SegmentsRootProps> = function SuiSegmentsRoot(props) {
  const {
    size = "md",
    color = "grey",
    radius = size,
    className,
    activeVariant = "solid",
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;

  return (
    <BaseTabs.Root
      {...otherProps}
      className={cn(
        className,
        "sui_segments",
        `sui_segments-size_${size}`,
        `sui_segments-color_${color}`,
        `sui_segments-radius_${radius}`,
        `sui_segments-active_variant_${activeVariant}`,
        (state) => `sui_segments-orientation_${state.orientation}`,
      )}
      data-scope={dataScope}
    />
  );
};

export { SegmentsRoot as Root };

export namespace Root {
  export type State = SegmentsRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SegmentsRootProps.Render;

    export type SuruUI = SegmentsRootProps.SuruUI;

    export type BaseUI = SegmentsRootProps.BaseUI;

    export type HTML = SegmentsRootProps.HTML;
  }

  export type ActiveVariant = SegmentsRootActiveVariant;

  export type ChangeEventDetails = SegmentsRootChangeEventDetails;

  export type ChangeEventReason = SegmentsRootChangeEventReason;

  export type Color = SegmentsRootColor;

  export type Orientation = SegmentsRootOrientation;

  export type Radius = SegmentsRootRadius;

  export type Size = SegmentsRootSize;
}
