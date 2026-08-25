import type { Size } from "@suru-ui/theme";
import * as React from "react";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import { ContextMissingError } from "../errors.js";
import type { IComponent, IUseContext } from "../types.js";

import "./list.css";

// Context
// -------

/**
 * リストアイテムのサイズです。
 */
type ListContextSize = Size;

/**
 * {@link ListRoot} が子要素へ提供するスタイルです。
 */
export type ListContext = {
  /**
   * リストアイテムのサイズです。
   */
  readonly size: ListContextSize;
};

/**
 * {@link ListRoot} のスタイルを子要素へ伝播するコンテキストです。
 */
export const ListContext: React.Context<ListContext | null> =
  React.createContext<ListContext | null>(null);

function useSuiListContext(optional?: false): ListContext;
function useSuiListContext(optional?: boolean): ListContext | null;
function useSuiListContext(optional?: boolean): ListContext | null {
  const context = React.use(ListContext);
  if (context === null && !optional) {
    throw new ContextMissingError({
      contextName: "ListContext",
      providerName: "ListRoot",
    });
  }

  return context;
}

/**
 * {@link ListContext} を読み取るフックです。
 */
export const useListContext: IUseContext<ListContext> = useSuiListContext;

/**
 * {@link ListContext} です。
 */
export type Context = ListContext;

/**
 * {@link ListContext} です。
 */
export const Context: React.Context<Context | null> = ListContext;

/**
 * {@link Context} の型名前空間です。
 */
export namespace Context {
  /**
   * {@link ListContextSize} です。
   */
  export type Size = ListContextSize;
}

/**
 * {@link useListContext} です。
 */
export const useContext: IUseContext<Context> = useListContext;

// Root
// ----

/**
 * リストの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type ListRootSize = Size;

/**
 * {@link ListRoot} の状態です。
 */
export type ListRootState = {};

/**
 * {@link ListRoot} に渡すプロパティーです。
 *
 * ルートに指定したスタイルプロパティーは、リストアイテムの指定より優先されます。
 */
export type ListRootProps = Omit<React.ComponentProps<"ul">, keyof RenderProps> &
  RenderProps<ListRootState> & {
    /**
     * 順序付きリストにするかどうかを指定します。
     *
     * `true` のとき、`ol` 要素を描画し、各項目の先頭に番号を表示します。
     *
     * @default false
     */
    ordered?: boolean | undefined;

    /**
     * リストアイテムのサイズを指定します。
     *
     * @default "md"
     */
    size?: ListRootSize | undefined;
  };

/**
 * 項目を一覧表示するリストのルート要素です。
 *
 * スタイルプロパティーをコンテキストでリストアイテムへ伝播します。
 */
export const ListRoot: IComponent<ListRootProps> = function SuiListRoot(props) {
  const { ordered = false, size = "md", ...otherProps } = props;
  const context = React.useMemo<ListContext>(() => ({ size }), [size]);
  const element = useRender({
    defaultTagName: ordered ? "ol" : "ul",
    props: [
      otherProps,
      {
        className: cn("sui_list", `sui_list-size_${size}`, ordered && "sui_list-ordered"),
      },
    ],
  });

  return <Context value={context}>{element}</Context>;
};

/**
 * {@link ListRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link ListRootState} です。
   */
  export type State = ListRootState;

  /**
   * {@link ListRootProps} です。
   */
  export type Props = ListRootProps;

  /**
   * {@link ListRootSize} です。
   */
  export type Size = ListRootSize;
}

/**
 * {@link ListRoot} です。
 */
export const Root: IComponent<Root.Props> = ListRoot;

// Item
// ----

/**
 * リストアイテムの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type ListItemSize = Size;

/**
 * {@link ListItem} の状態です。
 */
export type ListItemState = {};

/**
 * {@link ListItem} に渡すプロパティーです。
 *
 * 親 {@link ListRoot} 内で使うときは、サイズを省略するとルートの値を使用します。
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
     * リストアイテムのサイズを指定します。
     *
     * 親 {@link ListRoot} 内では、ルートに指定した値が優先されます。
     */
    size?: ListItemSize | undefined;
  };

/**
 * リストの項目を表す要素です。
 */
export const ListItem: IComponent<ListItemProps> = function SuiListItem(props) {
  const group = useSuiListContext(true);
  const { className, disabled = false, size: sizeProp, ...otherProps } = props;
  const size = group?.size ?? sizeProp ?? "md";

  return useRender({
    defaultTagName: "li",
    props: [
      otherProps,
      {
        className: cn(
          className,
          "sui_list_item",
          `sui_list_item-size_${size}`,
          disabled && "sui_list_item-disabled",
        ),
      },
    ],
  });
};

/**
 * {@link ListItem} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Item {
  /**
   * {@link ListItemState} です。
   */
  export type State = ListItemState;

  /**
   * {@link ListItemProps} です。
   */
  export type Props = ListItemProps;

  /**
   * {@link ListItemSize} です。
   */
  export type Size = ListItemSize;
}

/**
 * {@link ListItem} です。
 */
export const Item: IComponent<Item.Props> = ListItem;

// Indicator
// ---------

/**
 * {@link ListItemIndicator} の状態です。
 */
export type ListItemIndicatorState = {};

/**
 * {@link ListItemIndicator} に渡すプロパティーです。
 */
export type ListItemIndicatorProps = Omit<React.ComponentProps<"span">, keyof RenderProps> &
  RenderProps<ListItemIndicatorState>;

/**
 * リストアイテムの先頭に表示するマーカーやアイコンのコンテナーです。
 */
export const ListItemIndicator: IComponent<ListItemIndicatorProps> = function SuiListItemIndicator(
  props,
) {
  const { className, ...otherProps } = props;

  return useRender({
    defaultTagName: "span",
    props: [
      otherProps,
      {
        className: cn(className, "sui_list_item_indicator"),
      },
    ],
  });
};

/**
 * {@link ListItemIndicator} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Indicator {
  /**
   * {@link ListItemIndicatorState} です。
   */
  export type State = ListItemIndicatorState;

  /**
   * {@link ListItemIndicatorProps} です。
   */
  export type Props = ListItemIndicatorProps;
}

/**
 * {@link ListItemIndicator} です。
 */
export const Indicator: IComponent<Indicator.Props> = ListItemIndicator;
