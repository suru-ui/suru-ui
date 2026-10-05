import * as React from "react";

import isReactNode from "../_is-react-node.js";
import { hasLabel, isObject, getItemKey, isPrimitiveItem } from "../_item.js";
import toReactNode from "../_to-react-node.js";
import { type SegmentsItemProps, SegmentsItem } from "./item/segments.item.jsx";
import type { SegmentsRootItemObject, ISegmentsRootItemRenderer } from "./root/segments.root.jsx";
import { decomposeItemObject } from "./utils/segments.utils.js";

/**
 * 項目が `label` を持つオブジェクトかどうかを判定します。
 *
 * @param item 判定する値です。
 * @returns `label` を持つオブジェクトの場合に `true` を返します。
 */
export function isItemObject(item: unknown): item is SegmentsRootItemObject {
  return isObject(item) && hasLabel(item) && isReactNode(item.label);
}

/**
 * 項目から {@link SegmentsItem} に渡す props を取り出します。
 *
 * `label` は children として扱うため取り除きます。
 *
 * @param item 項目です。
 * @returns セグメントの props です。
 */
export function getSegmentsItemProps(item: unknown): Omit<SegmentsItemProps, "children"> {
  switch (true) {
    case isItemObject(item):
      return decomposeItemObject(item).itemProps;

    default:
      return { value: item };
  }
}

/**
 * 項目のラベルを求めます。
 *
 * @param item 項目です。
 * @returns 表示するラベルです。
 */
export function getSegmentsItemLabel(item: unknown): React.ReactNode {
  return isItemObject(item) ? toReactNode(item.label) : toReactNode(item);
}

/**
 * `items` の各項目からセグメントを組み立てる既定のレンダラーを作成します。
 *
 * {@link SegmentsList} と合成の両方で同じ組み立てを使うために使用します。
 *
 * @template TItem 項目の型です。
 * @param getItemProps 項目から {@link SegmentsItem} の props を求める関数です。
 * @param getLabel 項目からラベルを求める関数です。
 * @returns 項目をレンダリングする関数です。
 */
export function createItemRenderer<TItem = any>(
  getItemProps: (item: TItem) => Omit<SegmentsItemProps, "children">,
  getLabel: (item: TItem) => React.ReactNode,
): ISegmentsRootItemRenderer<TItem> {
  return (item, index) => {
    switch (true) {
      case isItemObject(item):
      case isPrimitiveItem(item):
      case !isReactNode(item):
        return (
          <SegmentsItem {...getItemProps(item)} key={getItemKey(item) ?? index}>
            {getLabel(item)}
          </SegmentsItem>
        );

      default:
        return <React.Fragment key={getItemKey(item) ?? index}>{item}</React.Fragment>;
    }
  };
}
