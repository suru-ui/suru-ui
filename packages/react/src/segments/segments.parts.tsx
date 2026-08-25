import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import cn from "../cn.js";
import type { IComponent } from "../types.js";

import "./segments.css";

// Root
// ----

/**
 * Segments の色です。
 */
export type SegmentsRootColor = Color;

/**
 * Segments の角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type SegmentsRootRadius = "none" | Size | "full";

/**
 * Segments の大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type SegmentsRootSize = Size;

/**
 * {@link SegmentsRoot} の状態です。
 */
export type SegmentsRootState = BaseTabs.Root.State;

/**
 * {@link SegmentsRoot} に渡すプロパティーです。
 */
export type SegmentsRootProps = React.ComponentProps<typeof BaseTabs.Root> & {
  /**
   * Segments の色を指定します。
   *
   * 選択されている項目の背景と文字色に使われます。
   *
   * @default "grey"
   */
  color?: SegmentsRootColor | undefined;

  /**
   * Segments の角丸を指定します。
   *
   * 既定値は {@link SegmentsRootProps.size|size} です。
   */
  radius?: SegmentsRootRadius | undefined;

  /**
   * Segments のサイズを指定します。
   *
   * @default "md"
   */
  size?: SegmentsRootSize | undefined;
};

/**
 * Segments のルート要素です。
 *
 * 個々のセグメントをグループ化し、選択値を管理します。
 */
export const SegmentsRoot: IComponent<SegmentsRootProps> = function SuiSegmentsRoot(props) {
  const { size = "md", color = "grey", radius = size, className, ...otherProps } = props;

  return (
    <BaseTabs.Root
      {...otherProps}
      className={cn(
        className,
        "sui_segments",
        `sui_segments-color_${color}`,
        `sui_segments-radius_${radius}`,
        `sui_segments-size_${size}`,
      )}
    />
  );
};

/**
 * {@link SegmentsRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link SegmentsRootState} です。
   */
  export type State = SegmentsRootState;

  /**
   * {@link SegmentsRootProps} です。
   */
  export type Props = SegmentsRootProps;

  /**
   * {@link SegmentsRootColor} です。
   */
  export type Color = SegmentsRootColor;

  /**
   * {@link SegmentsRootRadius} です。
   */
  export type Radius = SegmentsRootRadius;

  /**
   * {@link SegmentsRootSize} です。
   */
  export type Size = SegmentsRootSize;
}

/**
 * {@link SegmentsRoot} です。
 */
export const Root: IComponent<Root.Props> = SegmentsRoot;

// List
// ----

/**
 * {@link SegmentsListState} です。
 */
export type SegmentsListState = BaseTabs.List.State;

/**
 * {@link SegmentsListProps} です。
 */
export type SegmentsListProps = React.ComponentProps<typeof BaseTabs.List>;

/**
 * 個々のセグメントをまとめるリスト要素です。
 */
export const SegmentsList: IComponent<SegmentsListProps> = function SuiSegmentsList(props) {
  const { className, ...otherProps } = props;

  return <BaseTabs.List {...otherProps} className={cn(className, "sui_segments_list")} />;
};

/**
 * {@link SegmentsList} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace List {
  /**
   * {@link SegmentsListState} です。
   */
  export type State = SegmentsListState;

  /**
   * {@link SegmentsListProps} です。
   */
  export type Props = SegmentsListProps;
}

/**
 * {@link SegmentsList} です。
 */
export const List: IComponent<List.Props> = SegmentsList;

// Item
// ----

/**
 * {@link SegmentsItemState} です。
 */
export type SegmentsItemState = BaseTabs.Tab.State;

/**
 * {@link SegmentsItemProps} です。
 */
export type SegmentsItemProps = React.ComponentProps<typeof BaseTabs.Tab>;

/**
 * 選択できる個々のセグメントです。
 */
export const SegmentsItem: IComponent<SegmentsItemProps> = function SuiSegmentsItem(props) {
  const { className, ...otherProps } = props;

  return <BaseTabs.Tab {...otherProps} className={cn(className, "sui_segments_item")} />;
};

/**
 * {@link SegmentsItem} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Item {
  /**
   * {@link SegmentsItemState} です。
   */
  export type State = SegmentsItemState;

  /**
   * {@link SegmentsItemProps} です。
   */
  export type Props = SegmentsItemProps;
}

/**
 * {@link SegmentsItem} です。
 */
export const Item: IComponent<Item.Props> = SegmentsItem;

// Indicator
// ---------

/**
 * {@link SegmentsIndicatorState} です。
 */
export type SegmentsIndicatorState = BaseTabs.Indicator.State;

/**
 * {@link SegmentsIndicatorProps} に渡すプロパティーです。
 */
export type SegmentsIndicatorProps = React.ComponentProps<typeof BaseTabs.Indicator>;

/**
 * 選択されているセグメントの位置に追従するインジケーター要素です。
 *
 * `SegmentsParts.List` の子要素として配置します。
 */
export const SegmentsIndicator: IComponent<SegmentsIndicatorProps> = function SuiSegmentsIndicator(
  props,
) {
  const { className, ...otherProps } = props;

  return <BaseTabs.Indicator {...otherProps} className={cn(className, "sui_segments_indicator")} />;
};

/**
 * {@link SegmentsIndicator} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Indicator {
  /**
   * {@link SegmentsIndicatorState} です。
   */
  export type State = SegmentsIndicatorState;

  /**
   * {@link SegmentsIndicatorProps} です。
   */
  export type Props = SegmentsIndicatorProps;
}

/**
 * {@link SegmentsIndicator} です。
 */
export const Indicator: IComponent<Indicator.Props> = SegmentsIndicator;
