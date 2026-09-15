import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import type { Size } from "@suru-ui/theme";
import * as React from "react";

import toReactNode from "../_to-react-node.js";
import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { ListContext } from "./list.context.js";
import { ListItemIndicator } from "./list.indicator.jsx";
import { type ListItemProps, ListItem } from "./list.item.jsx";

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

export namespace ListRootProps {
  export type Render = RenderProps<ListRootState>;

  export type SuruUI<TItem = any> = {
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

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"ul", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ListRoot} に渡す props です。
 *
 * @template TItem 項目の型です。
 */
export type ListRootProps<TItem = any> = ListRootProps.Render &
  ListRootProps.SuruUI<TItem> &
  ListRootProps.BaseUI &
  ListRootProps.HTML;

interface IListRoot extends IComponent<ListRootProps> {
  /**
   * @template TItem 項目の型です。
   */
  <TItem = any>(props: ListRootProps<TItem>): IComponent.Return;
}

/**
 * 項目を一覧表示するリストのルートコンポーネントです。
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
  export type State = ListRootState;

  export type Props<TItem = any> = Props.Render & Props.SuruUI<TItem> & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ListRootProps.Render;

    export type SuruUI<TItem = any> = ListRootProps.SuruUI<TItem>;

    export type BaseUI = ListRootProps.BaseUI;

    export type HTML = ListRootProps.HTML;
  }

  export type ItemObject = ListRootItemObject;

  export interface IItemRenderer<TItem = any> extends IListRootItemRenderer<TItem> {}

  export type Size = ListRootSize;
}
