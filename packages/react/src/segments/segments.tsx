import * as React from "react";

import type { LikelyVisibleNode } from "../_is-likely-visible-node.js";
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
  type SegmentsRootChangeEventDetails,
  type SegmentsRootChangeEventReason,
  SegmentsItem,
  SegmentsList,
  SegmentsRoot,
  SegmentsIndicator,
} from "./segments.parts.jsx";

// Types
// -----

/**
 * {@link SegmentsRootChangeEventDetails}
 */
export type SegmentsChangeEventDetails = SegmentsRootChangeEventDetails;

/**
 * {@link SegmentsRootChangeEventReason}
 */
export type SegmentsChangeEventReason = SegmentsRootChangeEventReason;

/**
 * {@link SegmentsRootColor}
 */
export type SegmentsColor = SegmentsRootColor;

/**
 * {@link SegmentsListItemObject}
 */
export type SegmentsItemObject = SegmentsListItemObject;

/**
 * {@link ISegmentsListItemRenderer}
 */
export interface ISegmentsItemRenderer<TItem = any> extends ISegmentsListItemRenderer<TItem> {}

/**
 * {@link SegmentsRootRadius}
 */
export type SegmentsRadius = SegmentsRootRadius;

/**
 * {@link SegmentsRootSize}
 */
export type SegmentsSize = SegmentsRootSize;

/**
 * {@link SegmentsRootOrientation}
 */
export type SegmentsOrientation = SegmentsRootOrientation;

/**
 * {@link SegmentsItemValue}
 */
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
     *
     * 各パーツの props が優先されます。
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
    children: LikelyVisibleNode | null;
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
    getItemProps(item) {
      if (!isItemObject(item)) {
        return {
          ...itemProps,
          value: item,
        };
      }

      const {
        // label を取り除いた props を SegmentsItem の props とします。
        label: _label,
        value,
        ...otherItemProps
      } = item;

      return {
        ...otherItemProps,
        value,
        ...itemProps, // JSDoc 通り、`slotProps.item` を優先します。
      };
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
  const { children, items = [], ...otherListProps } = api.getListProps();

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
  /**
   * {@link SegmentsState}
   */
  export type State = SegmentsState;

  /**
   * {@link SegmentsProps}
   */
  export type Props = SegmentsProps;

  /**
   * {@link SegmentsSlotProps}
   */
  export type SlotProps = SegmentsSlotProps;

  /**
   * {@link SegmentsChangeEventDetails}
   */
  export type ChangeEventDetails = SegmentsChangeEventDetails;

  /**
   * {@link SegmentsChangeEventReason}
   */
  export type ChangeEventReason = SegmentsChangeEventReason;

  /**
   * {@link SegmentsColor}
   */
  export type Color = SegmentsColor;

  /**
   * {@link SegmentsItemObject}
   */
  export type ItemObject = SegmentsItemObject;

  /**
   * {@link ISegmentsItemRenderer}
   */
  export interface IItemRenderer<TItem = any> extends ISegmentsItemRenderer<TItem> {}

  /**
   * {@link SegmentsOrientation}
   */
  export type Orientation = SegmentsOrientation;

  /**
   * {@link SegmentsRadius}
   */
  export type Radius = SegmentsRadius;

  /**
   * {@link SegmentsSize}
   */
  export type Size = SegmentsSize;

  /**
   * {@link SegmentsValue}
   */
  export type Value = SegmentsValue;
}
