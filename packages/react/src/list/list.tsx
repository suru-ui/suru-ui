import * as React from "react";

import type { LikelyVisibleNode } from "../_is-likely-visible-node.js";
import toReactNode from "../_to-react-node.js";
import type { IComponent } from "../types.js";
import {
  type ListRootSize,
  type ListItemProps,
  type ListRootProps,
  type ListRootState,
  type ListRootItemObject,
  type IListRootItemRenderer,
  type ListItemIndicatorProps,
  ListItem,
  ListRoot,
  ListItemIndicator,
} from "./list.parts.jsx";

// Types
// -----

export type ListItemObject = ListRootItemObject;

export interface IListItemRenderer<TItem = any> extends IListRootItemRenderer<TItem> {}

export type ListSize = ListRootSize;

/**
 * {@link List} が持つ状態です。
 */
export type ListState = ListRootState;

/**
 * {@link List} の各パーツに渡す props です。
 */
export type ListSlotProps = {
  /**
   * {@link ListItemIndicator} に渡す props です。
   *
   * すべてのインジケーターに同じ props が渡されます。`children` は上書きされません。
   */
  readonly indicator?: Omit<ListItemIndicatorProps, "children"> | undefined;

  /**
   * {@link ListItem} に渡す props です。
   *
   * すべての項目に同じ props が渡されます。`children` は上書きされません。
   */
  readonly item?: Omit<ListItemProps, "children"> | undefined;
};

/**
 * {@link List} に渡す props です。
 *
 * @template TItem 項目の型です。
 */
export type ListProps<TItem = any> = ListRootProps<TItem> & {
  /**
   * 各パーツに個別の props を渡すためのオブジェクトです。
   */
  slotProps?: ListSlotProps | undefined;
};

// API
// ---

/**
 * {@link List} を構成する各パーツの props などを作成するための API です。
 *
 * @template TItem 項目の型です。
 */
export interface ListAPI<TItem = any> {
  /**
   * 項目の内容を取得します。
   *
   * @param item 項目です。
   */
  getContent(item: TItem): React.ReactNode;

  /**
   * {@link ListItemIndicator} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getIndicatorProps(item: TItem): Omit<ListItemIndicatorProps, "children"> & {
    children: LikelyVisibleNode | null;
  };

  /**
   * {@link ListItem} に渡す props を取得します。
   *
   * @param item 項目です。
   */
  getItemProps(item: TItem): Omit<ListItemProps, "children">;

  /**
   * {@link ListRoot} に渡す props を取得します。
   */
  getRootProps(): Omit<ListRootProps<TItem>, "children"> & {
    children: LikelyVisibleNode | null;
  };
}

interface IUseListAPI {
  /**
   * {@link ListAPI} を作成します。
   *
   * @template TItem 項目の型です。
   * @param props {@link List} の props です。
   * @returns リストの API です
   */
  <TItem = any>(props: ListProps<TItem>): ListAPI<TItem>;
}

/**
 * {@link ListAPI} を作成するフックです。
 */
export const useListAPI: IUseListAPI = function useSuiListAPI(props) {
  const {
    items = [],
    children,
    slotProps: { item: itemProps = {}, indicator: indicatorProps = {} } = {},
    ...otherRootProps
  } = props;

  return {
    getContent(item) {
      return isItemObject(item) ? toReactNode(item.content) : toReactNode(item);
    },
    getItemProps(item) {
      if (!isItemObject(item)) {
        return itemProps;
      }

      const { content: _content, indicator: _indicator, ...otherItemProps } = item;

      return {
        ...otherItemProps,
        ...itemProps,
      };
    },
    getRootProps() {
      return {
        ...otherRootProps,
        items,
        children: typeof children === "function" ? items.map(children) : toReactNode(children),
      };
    },
    getIndicatorProps(item) {
      return {
        ...indicatorProps,
        children: isItemObject(item) ? toReactNode(item.indicator) : null,
      };
    },
  };
};

function isItemObject(item: unknown): item is ListItemObject {
  return typeof item === "object" && item !== null && "content" in item;
}

export { type ListAPI as API, useListAPI as useAPI };

// Component
// ---------

interface IList extends IComponent<ListProps> {
  /**
   * @template TItem 項目の型です。
   */
  <TItem = any>(props: ListProps<TItem>): IComponent.Return;

  readonly Indicator: typeof ListItemIndicator;

  readonly Item: typeof ListItem;
}

/**
 * 項目を一覧表示するリストコンポーネントです。
 *
 * {@link ListProps.items|items} に項目の配列を渡すと、各項目を {@link List.Item} で描画します。項目の描画内容を変える場合は `children` に関数を指定します。
 */
export const List: IList = /*#__PURE__*/ Object.assign(
  function SuiList(props: ListProps) {
    const api = useListAPI(props);
    const { children, ...otherRootProps } = api.getRootProps();

    return (
      <ListRoot {...otherRootProps}>
        {children ??
          ((item, index) => {
            const { children: indicatorNode, ...otherIndicatorProps } = api.getIndicatorProps(item);

            return (
              <ListItem key={index} {...api.getItemProps(item)}>
                {indicatorNode && (
                  <ListItemIndicator {...otherIndicatorProps}>{indicatorNode}</ListItemIndicator>
                )}
                {api.getContent(item)}
              </ListItem>
            );
          })}
      </ListRoot>
    );
  },
  {
    Item: ListItem,
    Indicator: ListItemIndicator,
  },
);

export namespace List {
  export type State = ListState;

  export type Props<TItem = any> = ListProps<TItem>;

  export type SlotProps = ListSlotProps;

  export type ItemObject = ListItemObject;

  export interface IItemRenderer<TItem = any> extends IListItemRenderer<TItem> {}

  export type Size = ListSize;
}
