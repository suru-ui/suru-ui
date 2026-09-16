import * as React from "react";

import type { LikelyVisibleNode } from "../_is-likely-visible-node.js";
import mergeProps from "../_merge-props.js";
import toReactNode from "../_to-react-node.js";
import type { IComponent } from "../types.js";
import { isItemObject } from "./_segments.jsx";
import {
  type SegmentsRootSize,
  type SegmentsItemProps,
  type SegmentsItemValue,
  type SegmentsListProps,
  type SegmentsRootColor,
  type SegmentsRootProps,
  type SegmentsRootState,
  type SegmentsRootRadius,
  type SegmentsIndicatorProps,
  type SegmentsListItemObject,
  type SegmentsRootOrientation,
  type ISegmentsListItemRenderer,
  type SegmentsRootActiveVariant,
  type SegmentsRootChangeEventReason,
  type SegmentsRootChangeEventDetails,
  SegmentsItem,
  SegmentsList,
  SegmentsRoot,
  SegmentsIndicator,
} from "./segments.parts.js";

// Types
// -----

export type SegmentsChangeEventDetails = SegmentsRootChangeEventDetails;

export type SegmentsChangeEventReason = SegmentsRootChangeEventReason;

export type SegmentsActiveVariant = SegmentsRootActiveVariant;

export type SegmentsColor = SegmentsRootColor;

export type SegmentsItemObject = SegmentsListItemObject;

export interface ISegmentsItemRenderer<TItem = any> extends ISegmentsListItemRenderer<TItem> {}

export type SegmentsRadius = SegmentsRootRadius;

export type SegmentsSize = SegmentsRootSize;

export type SegmentsOrientation = SegmentsRootOrientation;

export type SegmentsValue = SegmentsItemValue;

/**
 * {@link Segments} が持つ状態です。
 */
export type SegmentsState = SegmentsRootState;

/**
 * {@link Segments} の各パーツに渡す props です。
 */
export type SegmentsSlotProps = {
  /**
   * {@link SegmentsIndicator} に渡す props です。
   */
  readonly indicator?: SegmentsIndicatorProps | undefined;

  /**
   * {@link SegmentsItem} に渡す props です。
   *
   * すべての項目に同じ props が渡されます。`children` と `value` は上書きされません。
   */
  readonly item?: Omit<SegmentsItemProps, "children" | "value"> | undefined;

  /**
   * {@link SegmentsList} に渡す props です。
   *
   * `children` と `items` は上書きされません。
   */
  readonly list?: Omit<SegmentsListProps, "children" | "items"> | undefined;
};

/**
 * {@link Segments} に渡す props です。
 *
 * @template TItem 項目の型です。
 */
export type SegmentsProps<TItem = any> = Omit<SegmentsRootProps, "children"> &
  Pick<SegmentsListProps<TItem>, "children"> & {
    /**
     * セグメントの項目です。
     */
    items?: readonly TItem[] | undefined;

    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     */
    slotProps?: SegmentsSlotProps | undefined;
  };

// API
// ---

/**
 * {@link Segments} を構成する各パーツの props などを作成するための API です。
 *
 * @template TItem 項目の型です。
 */
export interface SegmentsAPI<TItem = any> {
  /**
   * {@link SegmentsIndicator} に渡す props を取得します。
   */
  getIndicatorProps(): SegmentsIndicatorProps;

  /**
   * {@link SegmentsItem} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getItemProps(item: TItem): Omit<SegmentsItemProps, "children">;

  /**
   * 項目のラベルを取得します。
   *
   * @param item 項目です。
   */
  getLabel(item: TItem): React.ReactNode;

  /**
   * {@link SegmentsList} に渡す props を取得します。
   */
  getListProps(): Omit<SegmentsListProps, "children"> & {
    children: LikelyVisibleNode | undefined;
  };

  /**
   * {@link SegmentsRoot} に渡す props を取得します。
   */
  getRootProps(): Omit<SegmentsRootProps, "children">;
}

interface IUseSegmentsAPI {
  /**
   * {@link SegmentsAPI} を作成します。
   *
   * @template TItem 項目の型です。
   * @param props {@link Segments} の props です。
   * @returns セグメントの API です
   */
  <TItem = never>(props: SegmentsProps<TItem>): SegmentsAPI<TItem>;
}

/**
 * {@link SegmentsAPI} を作成するフックです。
 */
export const useSegmentsAPI: IUseSegmentsAPI = function useSuiSegmentsAPI(props) {
  const {
    items = [],
    children,
    slotProps: { item: itemProps = {}, list: listProps = {}, indicator: indicatorProps = {} } = {},
    ...otherRootProps
  } = props;

  return {
    getLabel(item) {
      return isItemObject(item) ? toReactNode(item.label) : toReactNode(item);
    },
    getItemProps(item): any {
      if (!isItemObject(item)) {
        return {
          ...itemProps,
          value: item,
        };
      }

      const {
        // label を取り除いた props を SegmentsItem の props とします。
        label: _label,
        ...otherItemProps
      } = item;

      return mergeProps([itemProps, otherItemProps]);
    },
    getListProps() {
      return {
        ...listProps,
        items,
        children: typeof children === "function" ? items.map(children) : toReactNode(children),
      };
    },
    getRootProps() {
      return otherRootProps;
    },
    getIndicatorProps() {
      return indicatorProps;
    },
  };
};

export { type SegmentsAPI as API, useSegmentsAPI as useAPI };

// Component
// ---------

interface ISegments extends IComponent<SegmentsProps> {
  /**
   * @template TItem 項目の型です。
   */
  <TItem = never>(props: SegmentsProps<TItem>): IComponent.Return;
}

/**
 * 関連する選択肢から 1 つを選ばせるセグメントコントロールです。
 *
 * `items` からセグメントの並びを組み立てます。レイアウトを細かく制御する場合は、{@link SegmentsRoot} と各パーツを直接組み立てます。
 */
export const Segments: ISegments = function SuiSegments(props: SegmentsProps) {
  const api = useSegmentsAPI(props);
  const { items = [], children, ...otherListProps } = api.getListProps();

  return (
    <SegmentsRoot {...api.getRootProps()}>
      <SegmentsList {...otherListProps} items={items}>
        {children ??
          items.map((item, index) => (
            <SegmentsItem key={index} {...api.getItemProps(item)}>
              {api.getLabel(item)}
            </SegmentsItem>
          ))}
        <SegmentsIndicator {...api.getIndicatorProps()} />
      </SegmentsList>
    </SegmentsRoot>
  );
};

export namespace Segments {
  export type State = SegmentsState;

  export type Props = SegmentsProps;

  export type SlotProps = SegmentsSlotProps;

  export type ActiveVariant = SegmentsActiveVariant;

  export type ChangeEventDetails = SegmentsChangeEventDetails;

  export type ChangeEventReason = SegmentsChangeEventReason;

  export type Color = SegmentsColor;

  export type ItemObject = SegmentsItemObject;

  export interface IItemRenderer<TItem = any> extends ISegmentsItemRenderer<TItem> {}

  export type Orientation = SegmentsOrientation;

  export type Radius = SegmentsRadius;

  export type Size = SegmentsSize;

  export type Value = SegmentsValue;
}
