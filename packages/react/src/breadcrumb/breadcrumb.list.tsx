import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import * as React from "react";

import { getItemKey } from "../_item.js";
import toReactNode from "../_to-react-node.js";
import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";
import { isItemObject } from "./_breadcrumb.jsx";
import { useBreadcrumbContext } from "./breadcrumb.context.js";
import { BreadcrumbItem } from "./breadcrumb.item.jsx";
import { BreadcrumbLink } from "./breadcrumb.link.jsx";
import type { BreadcrumbRootItemObject } from "./breadcrumb.root.jsx";
import { BreadcrumbSeparator } from "./breadcrumb.separator.jsx";

/**
 * パンくずリストの各項目をレンダリングする関数のインターフェイスです。
 *
 * @template TItem 項目の型です。
 */
export interface IBreadcrumbListItemRenderer<TItem = any> {
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
 * {@link BreadcrumbList} が持つ状態です。
 */
export type BreadcrumbListState = {};

export namespace BreadcrumbListProps {
  export type Render = RenderProps<BreadcrumbListState>;

  export type SuruUI<TItem = any> = {
    /**
     * パンくずリストの内容、または各項目をレンダリングする関数です。
     *
     * 関数を指定した場合は {@link BreadcrumbRootProps.items|items} の各項目が引数として渡されます。
     */
    children?: React.ReactNode | IBreadcrumbListItemRenderer<TItem> | undefined;
  };

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"ol", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link BreadcrumbList} に渡す props です。
 *
 * @template TItem 項目の型です。
 */
export type BreadcrumbListProps<TItem = any> = BreadcrumbListProps.Render &
  BreadcrumbListProps.SuruUI<TItem> &
  BreadcrumbListProps.BaseUI &
  BreadcrumbListProps.HTML;

interface IBreadcrumbList extends IComponent<BreadcrumbListProps> {
  /**
   * @template TItem 項目の型です。
   */
  <TItem = any>(props: BreadcrumbListProps<TItem>): IComponent.Return;
}

/**
 * パンくずの項目を並べるリストコンポーネントです。
 */
export const BreadcrumbList: IBreadcrumbList = function SuiBreadcrumbList(
  props: BreadcrumbListProps,
) {
  const ctx = useBreadcrumbContext(true);
  const { children = defaultListItemRenderer, ...otherOlProps } = props;
  const items = ctx?.items ?? [];

  return useRender({
    props: [
      otherOlProps,
      {
        children: typeof children === "function" ? items.map(children) : children,
        className: "sui_breadcrumb_list",
      },
    ],
    defaultTagName: "ol",
  });
};

const defaultListItemRenderer: IBreadcrumbListItemRenderer = (item, index, items) => {
  if (!isItemObject(item)) {
    return toReactNode(item);
  }

  const { label, current: currentProp, ...otherItemProps } = item;
  const current = currentProp ?? index === items.length - 1;

  return (
    <React.Fragment key={getItemKey(item) ?? index}>
      {index > 0 && <BreadcrumbSeparator />}
      <BreadcrumbItem>
        <BreadcrumbLink {...otherItemProps} current={current}>
          {toReactNode(label)}
        </BreadcrumbLink>
      </BreadcrumbItem>
    </React.Fragment>
  );
};

export { BreadcrumbList as List };

export namespace List {
  export type State = BreadcrumbListState;

  export type Props<TItem = any> = Props.Render & Props.SuruUI<TItem> & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = BreadcrumbListProps.Render;

    export type SuruUI<TItem = any> = BreadcrumbListProps.SuruUI<TItem>;

    export type BaseUI = BreadcrumbListProps.BaseUI;

    export type HTML = BreadcrumbListProps.HTML;
  }

  export type ItemObject = BreadcrumbRootItemObject;

  export interface IItemRenderer<TItem = any> extends IBreadcrumbListItemRenderer<TItem> {}
}
