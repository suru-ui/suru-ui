import type { Size } from "@suru-ui/theme";
import * as React from "react";

import toReactNode from "../_to-react-node.js";
import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import { ContextMissingError } from "../errors.js";
import type { IComponent, IUseContext } from "../types.js";

import "./list.css";

// Context
// -------

/**
 * リストの大きさです。
 */
export type ListContextSize = Size;

/**
 * {@link ListRoot} が子パーツへ提供するコンテキストです。
 */
export type ListContext = {
  /**
   * リストの大きさです。
   */
  readonly size: ListContextSize;
};

/**
 * {@link ListRoot} が子パーツへ提供するコンテキストです。
 */
export const ListContext: React.Context<ListContext | null> =
  React.createContext<ListContext | null>(null);

function useSuiListContext(optional?: false): ListContext;
function useSuiListContext(optional?: boolean): ListContext | null;
function useSuiListContext(optional?: boolean): ListContext | null {
  const ctx = React.use(ListContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "ListContext",
      providerName: "ListRoot",
    });
  }

  return ctx;
}

/**
 * {@link ListContext} を読み取るフックです。
 */
export const useListContext: IUseContext<ListContext> = useSuiListContext;

export { ListContext as Context, useListContext as useContext };

export namespace Context {
  /**
   * {@link ListContextSize}
   */
  export type Size = ListContextSize;
}

// Root
// ----

/**
 * {@link ListRoot} の項目を表すオブジェクトです。
 *
 * `content` と `indicator` を含み、その他のプロパティーは {@link ListItem} に渡されます。
 */
export type ListRootItemObject = Omit<ListItemProps, "children"> & {
  /**
   * 項目に表示する内容です。
   */
  readonly content: React.ReactNode;

  /**
   * 項目の先頭に表示するマーカーやアイコンです。
   *
   * 指定しない場合、インジケーターを描画しません。
   */
  readonly indicator?: React.ReactNode | undefined;
};

/**
 * {@link ListRoot} の各項目をレンダリングする関数のインターフェイスです。
 *
 * @template TItem 項目の型です。
 */
export interface IListRootItemRenderer<TItem = any> {
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
 * リストの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type ListRootSize = Size;

/**
 * {@link ListRoot} が持つ状態です。
 */
export type ListRootState = {};

/**
 * {@link ListRoot} に渡す props です。
 *
 * @template TItem 項目の型です。
 */
export type ListRootProps<TItem = any> = Omit<
  React.ComponentProps<"ul">,
  keyof RenderProps | "children"
> &
  RenderProps<ListRootState> & {
    /**
     * リストの内容、または各項目をレンダリングする関数です。
     *
     * 関数を指定した場合は {@link ListRootProps.items|items} の各項目が引数として渡されます。
     */
    children?: React.ReactNode | IListRootItemRenderer<TItem>;

    /**
     * リストの項目です。
     *
     * `children` に関数を指定した場合、この配列の各項目が引数として渡されます。
     */
    items?: readonly TItem[] | undefined;

    /**
     * 順序付きリストにするかどうかを指定します。
     *
     * `true` のとき、`ol` 要素を描画し、各項目の先頭に番号を表示します。
     *
     * @default false
     */
    ordered?: boolean | undefined;

    /**
     * リストの大きさを指定します。
     *
     * @default "md"
     */
    size?: ListRootSize | undefined;
  };

interface IListRoot extends IComponent<ListRootProps> {
  /**
   * @template TItem 項目の型です。
   */
  <TItem = any>(props: ListRootProps<TItem>): IComponent.Return;
}

/**
 * 項目を一覧表示するリストのルートコンポーネントです。
 *
 * 大きさをコンテキストで {@link ListItem} へ伝播します。
 */
export const ListRoot: IListRoot = function SuiListRoot(props: ListRootProps) {
  const {
    size = "md",
    items = [],
    ordered = false,
    children = defaultRootItemRenderer,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherListProps
  } = props;
  const ctx = React.useMemo<ListContext>(() => ({ size }), [size]);
  const element = useRender({
    props: [
      otherListProps,
      {
        children: typeof children === "function" ? items.map(children) : children,
        className: cn("sui_list", `sui_list-size_${size}`, ordered && "sui_list-ordered"),
        "data-scope": dataScope,
      },
    ],
    defaultTagName: ordered ? "ol" : "ul",
  });

  return <ListContext value={ctx}>{element}</ListContext>;
};

const defaultRootItemRenderer: IListRootItemRenderer = (item, index) => {
  if (!isItemObject(item)) {
    return <ListItem key={index}>{toReactNode(item)}</ListItem>;
  }

  const { content, indicator, ...otherItemProps } = item;
  const indicatorNode = toReactNode(indicator);

  return (
    <ListItem key={index} {...otherItemProps}>
      {indicatorNode && <ListItemIndicator>{indicatorNode}</ListItemIndicator>}
      {toReactNode(content)}
    </ListItem>
  );
};

function isItemObject(item: unknown): item is ListRootItemObject {
  return typeof item === "object" && item !== null && "content" in item;
}

export { ListRoot as Root };

export namespace Root {
  /**
   * {@link ListRootState}
   */
  export type State = ListRootState;

  /**
   * {@link ListRootProps}
   */
  export type Props<TItem = any> = ListRootProps<TItem>;

  /**
   * {@link ListRootItemObject}
   */
  export type ItemObject = ListRootItemObject;

  /**
   * {@link IListRootItemRenderer}
   */
  export interface IItemRenderer<TItem = any> extends IListRootItemRenderer<TItem> {}

  /**
   * {@link ListRootSize}
   */
  export type Size = ListRootSize;
}

// Item
// ----

/**
 * リストの項目の大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type ListItemSize = Size;

/**
 * {@link ListItem} が持つ状態です。
 */
export type ListItemState = {};

/**
 * {@link ListItem} に渡す props です。
 */
export type ListItemProps = Omit<React.ComponentProps<"li">, keyof RenderProps> &
  RenderProps<ListItemState> & {
    /**
     * 項目を無効な見た目にするかどうかを指定します。
     *
     * @default false
     */
    disabled?: boolean | undefined;

    /**
     * リストの項目の大きさを指定します。
     *
     * {@link ListRoot} の内側ではルートの値が優先されます。
     */
    size?: ListItemSize | undefined;
  };

/**
 * リストの項目コンポーネントです。
 */
export const ListItem: IComponent<ListItemProps> = function SuiListItem(props) {
  const ctx = useSuiListContext(true);
  const { size: sizeProp, disabled = false, ...otherLiProps } = props;
  const size = ctx?.size ?? sizeProp ?? "md";

  return useRender({
    props: [
      otherLiProps,
      {
        className: cn(
          "sui_list_item",
          `sui_list_item-size_${size}`,
          disabled && "sui_list_item-disabled",
        ),
      },
    ],
    defaultTagName: "li",
  });
};

export { ListItem as Item };

export namespace Item {
  /**
   * {@link ListItemState}
   */
  export type State = ListItemState;

  /**
   * {@link ListItemProps}
   */
  export type Props = ListItemProps;

  /**
   * {@link ListItemSize}
   */
  export type Size = ListItemSize;
}

// Indicator
// ---------

/**
 * {@link ListItemIndicator} が持つ状態です。
 */
export type ListItemIndicatorState = {};

/**
 * {@link ListItemIndicator} に渡す props です。
 */
export type ListItemIndicatorProps = Omit<React.ComponentProps<"span">, keyof RenderProps> &
  RenderProps<ListItemIndicatorState>;

/**
 * リストの項目の先頭に表示するマーカーやアイコンのコンテナーです。
 */
export const ListItemIndicator: IComponent<ListItemIndicatorProps> = function SuiListItemIndicator(
  props,
) {
  return useRender({
    props: [
      props,
      {
        className: "sui_list_item_indicator",
      },
    ],
    defaultTagName: "span",
  });
};

export { ListItemIndicator as Indicator };

export namespace Indicator {
  /**
   * {@link ListItemIndicatorState}
   */
  export type State = ListItemIndicatorState;

  /**
   * {@link ListItemIndicatorProps}
   */
  export type Props = ListItemIndicatorProps;
}
