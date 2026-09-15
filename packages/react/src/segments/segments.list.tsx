import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import * as React from "react";

import toReactNode from "../_to-react-node.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { isItemObject } from "./_segments.jsx";
import { type SegmentsItemProps, SegmentsItem } from "./segments.item.jsx";

/**
 * {@link SegmentsList} の項目を表すオブジェクトです。
 *
 * `label` を含み、その他のプロパティーは {@link SegmentsItem} に渡されます。
 */
export type SegmentsListItemObject = Omit<SegmentsItemProps, "children"> & {
  /**
   * 項目に表示するラベルです。
   */
  readonly label: React.ReactNode;
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

export namespace SegmentsListProps {
  export type Render = RenderProps<SegmentsListState>;

  export type SuruUI<TItem = any> = {
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

  export type BaseUI = Pick<
    React.ComponentProps<typeof BaseTabs.List>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // TabsListProps:
      "activateOnFocus" | "loopFocus",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseTabs.List>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SegmentsList} に渡す props です。
 *
 * @template TItem 項目の型です。
 */
export type SegmentsListProps<TItem = any> = SegmentsListProps.Render &
  SegmentsListProps.SuruUI<TItem> &
  SegmentsListProps.BaseUI &
  SegmentsListProps.HTML;

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
  export type State = SegmentsListState;

  export type Props<TItem = any> = Props.Render & Props.SuruUI<TItem> & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SegmentsListProps.Render;

    export type SuruUI<TItem = any> = SegmentsListProps.SuruUI<TItem>;

    export type BaseUI = SegmentsListProps.BaseUI;

    export type HTML = SegmentsListProps.HTML;
  }

  export type ItemObject = SegmentsListItemObject;

  export interface IItemRenderer<TItem = any> extends ISegmentsListItemRenderer<TItem> {}
}
