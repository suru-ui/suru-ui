import * as React from "react";

import isReactNode from "../_is-react-node.js";
import { hasLabel, isObject, getItemKey, isPrimitiveItem } from "../_item.js";
import toReactNode from "../_to-react-node.js";
import type { TabsRootItemObject, ITabsRootItemRenderer } from "./tabs.root.jsx";
import { type TabsTabProps, TabsTab } from "./tabs.tab.jsx";

/**
 * 項目が `label` を持つオブジェクトかどうかを判定します。
 *
 * @param item 判定する値です。
 * @returns `label` が ReactNode であるオブジェクトの場合に `true` を返します。
 */
export function isItemObject(item: unknown): item is TabsRootItemObject {
  return isObject(item) && hasLabel(item) && isReactNode(item.label);
}

/**
 * 項目から {@link TabsTab} に渡す props を取り出します。
 *
 * `label` はタブの子要素、`content` はパネルの内容として扱うため取り除きます。
 * 項目オブジェクト以外は `{ value: item }` を返します。
 *
 * @param item 項目です。
 * @returns タブの props です。
 */
export function getTabsItemProps(item: unknown): Omit<TabsTabProps, "children"> {
  if (!isItemObject(item)) {
    return { value: item };
  }

  const { label: _label, content: _content, ...otherItemProps } = item;

  return otherItemProps;
}

/**
 * 項目のラベルを求めます。
 *
 * @param item 項目です。
 * @returns 表示するラベルです。
 */
export function getTabsItemLabel(item: unknown): React.ReactNode {
  return isItemObject(item) ? toReactNode(item.label) : toReactNode(item);
}

/**
 * 項目に対応するパネルの内容を求めます。
 *
 * @param item 項目です。
 * @returns パネルに表示する内容です。項目オブジェクト以外は `undefined` を返します。
 */
export function getTabsItemContent(item: unknown): React.ReactNode {
  return isItemObject(item) ? toReactNode(item.content) : undefined;
}

/**
 * `items` の各項目からタブを組み立てる既定のレンダラーを作成します。
 *
 * {@link TabsList} と合成の両方で同じ組み立てを使うために使用します。
 *
 * @template TItem 項目の型です。
 * @param getItemProps 項目から {@link TabsTab} の props を求める関数です。
 * @param getLabel 項目からラベルを求める関数です。
 * @returns 項目をレンダリングする関数です。
 */
export function createItemRenderer<TItem = any>(
  getItemProps: (item: TItem) => Omit<TabsTabProps, "children">,
  getLabel: (item: TItem) => React.ReactNode,
): ITabsRootItemRenderer<TItem> {
  return (item, index) => {
    switch (true) {
      case isItemObject(item):
      case isPrimitiveItem(item):
      case !isReactNode(item):
        return (
          <TabsTab {...getItemProps(item)} key={getItemKey(item) ?? index}>
            {getLabel(item)}
          </TabsTab>
        );

      default:
        return <React.Fragment key={getItemKey(item) ?? index}>{item}</React.Fragment>;
    }
  };
}
