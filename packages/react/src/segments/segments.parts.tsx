import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import toReactNode from "../_to-react-node.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { isItemObject } from "./_segments.jsx";

import "./segments.css";

// Root
// ----

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

/**
 * {@link SegmentsRoot} に渡す props です。
 */
export type SegmentsRootProps = Omit<React.ComponentProps<typeof BaseTabs.Root>, "children"> & {
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
        `sui_segments-size_${size}`,
        `sui_segments-radius_${radius}`,
        `sui_segments-color_${color}`,
      )}
      data-scope=""
    />
  );
};

export { SegmentsRoot as Root };

export namespace Root {
  /**
   * {@link SegmentsRootState}
   */
  export type State = SegmentsRootState;

  /**
   * {@link SegmentsRootProps}
   */
  export type Props = SegmentsRootProps;

  /**
   * {@link SegmentsRootColor}
   */
  export type Color = SegmentsRootColor;

  /**
   * {@link SegmentsRootRadius}
   */
  export type Radius = SegmentsRootRadius;

  /**
   * {@link SegmentsRootSize}
   */
  export type Size = SegmentsRootSize;
}

// List
// ----

/**
 * {@link SegmentsList} の項目を表すオブジェクトです。
 *
 * `label` を含み、その他のプロパティーは {@link SegmentsItem} に渡されます。
 */
export type SegmentsListItemObject = Omit<SegmentsItemProps, "children"> & {
  /**
   * 項目に表示するラベルです。
   */
  label: React.ReactNode;
};

/**
 * {@link SegmentsList} の各項目をレンダリングする関数のインターフェイスです。
 *
 * @template TItem 項目の型です。
 */
export interface ISegmentsListItemRenderer<TItem = any> {
  /**
   * 項目をレンダリングします。
   *
   * @param item 現在の項目です。
   * @param index 項目のインデックスです。
   * @param items すべての項目です。
   * @returns レンダリングする内容です。
   */
  (item: TItem, index: number, items: readonly TItem[]): React.ReactNode;
}

/**
 * {@link SegmentsList} が持つ状態です。
 */
export type SegmentsListState = BaseTabs.List.State;

/**
 * {@link SegmentsList} に渡す props です。
 *
 * @template TItem 項目の型です。
 */
export type SegmentsListProps<TItem = any> = Omit<
  React.ComponentProps<typeof BaseTabs.List>,
  "children"
> & {
  /**
   * リストの内容、または各項目をレンダリングする関数です。
   *
   * 関数を指定した場合は {@link SegmentsListProps.items|items} の各項目が引数として渡されます。
   */
  children?: React.ReactNode | ISegmentsListItemRenderer<TItem>;

  /**
   * リストの項目です。
   *
   * `children` に関数を指定した場合、この配列の各項目が引数として渡されます。
   */
  items?: readonly TItem[] | undefined;
};

interface ISegmentsList extends IComponent<SegmentsListProps> {
  /**
   * @template TItem 項目の型です。
   */
  <TItem = never>(props: SegmentsListProps<TItem>): IComponent.Return;
}

/**
 * 個々のセグメントをまとめるリスト要素です。
 */
export const SegmentsList: ISegmentsList = function SuiSegmentsList(props: SegmentsListProps) {
  const { items = [], children = defaultListItemRenderer, className, ...otherProps } = props;

  return (
    <BaseTabs.List {...otherProps} className={cn(className, "sui_segments_list")}>
      {typeof children === "function" ? items.map(children) : children}
    </BaseTabs.List>
  );
};

const defaultListItemRenderer: ISegmentsListItemRenderer = (item, index) => {
  if (!isItemObject(item)) {
    return toReactNode(item);
  }

  const { label, value, ...otherItemProps } = item;

  return (
    <SegmentsItem {...otherItemProps} key={index} value={value}>
      {toReactNode(label)}
    </SegmentsItem>
  );
};

export { SegmentsList as List };

export namespace List {
  /**
   * {@link SegmentsListState}
   */
  export type State = SegmentsListState;

  /**
   * {@link SegmentsListProps}
   */
  export type Props<TItem = any> = SegmentsListProps<TItem>;

  /**
   * {@link SegmentsListItemObject}
   */
  export type ItemObject = SegmentsListItemObject;

  /**
   * {@link ISegmentsListItemRenderer}
   */
  export interface IItemRenderer<TItem = any> extends ISegmentsListItemRenderer<TItem> {}
}

// Item
// ----

/**
 * {@link SegmentsItem} が持つ状態です。
 */
export type SegmentsItemState = BaseTabs.Tab.State;

/**
 * {@link SegmentsItem} に渡す props です。
 */
export type SegmentsItemProps = React.ComponentProps<typeof BaseTabs.Tab>;

/**
 * 選択できる個々のセグメントです。
 */
export const SegmentsItem: IComponent<SegmentsItemProps> = function SuiSegmentsItem(props) {
  const { className, ...otherProps } = props;

  return (
    <BaseTabs.Tab
      {...otherProps}
      className={cn(
        className,
        "sui_segments_item",
        (state) => state.active && "sui_segments_item-active",
        (state) => state.disabled && "sui_segments_item-disabled",
      )}
    />
  );
};

export { SegmentsItem as Item };

export namespace Item {
  /**
   * {@link SegmentsItemState}
   */
  export type State = SegmentsItemState;

  /**
   * {@link SegmentsItemProps}
   */
  export type Props = SegmentsItemProps;
}

// Indicator
// ---------

/**
 * {@link SegmentsIndicator} が持つ状態です。
 */
export type SegmentsIndicatorState = BaseTabs.Indicator.State;

/**
 * {@link SegmentsIndicator} に渡す props です。
 */
export type SegmentsIndicatorProps = React.ComponentProps<typeof BaseTabs.Indicator>;

/**
 * 選択されているセグメントの位置に追従するインジケーターです。
 *
 * {@link SegmentsList} の子要素として配置します。
 */
export const SegmentsIndicator: IComponent<SegmentsIndicatorProps> = function SuiSegmentsIndicator(
  props,
) {
  const { className, ...otherProps } = props;

  return <BaseTabs.Indicator {...otherProps} className={cn(className, "sui_segments_indicator")} />;
};

export { SegmentsIndicator as Indicator };

export namespace Indicator {
  /**
   * {@link SegmentsIndicatorState}
   */
  export type State = SegmentsIndicatorState;

  /**
   * {@link SegmentsIndicatorProps}
   */
  export type Props = SegmentsIndicatorProps;
}
