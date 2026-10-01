import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import * as React from "react";

import { getItemKey } from "../_item.js";
import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { isItemObject, defaultBreadcrumbContext } from "./_breadcrumb.jsx";
import { type BreadcrumbContext, useBreadcrumbContext } from "./breadcrumb.context.js";
import { BreadcrumbItem } from "./breadcrumb.item.jsx";
import { BreadcrumbLink } from "./breadcrumb.link.jsx";
import type { BreadcrumbRootItemObject } from "./breadcrumb.root.jsx";
import { BreadcrumbSeparator } from "./breadcrumb.separator.jsx";
import { decomposeItemObject } from "./breadcrumb.utils.js";

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
export type BreadcrumbListState = BreadcrumbContext;

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

export interface IBreadcrumbList extends IComponent<BreadcrumbListProps> {
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
  const state: BreadcrumbListState = { ...defaultBreadcrumbContext, ...ctx };

  return useRender({
    props: [
      otherOlProps,
      {
        children: typeof children === "function" ? items.map(children) : children,
        className: cn<BreadcrumbListState>(
          "sui_breadcrumb_list",
          (state) => `sui_breadcrumb_list-size_${state.size}`,
          (state) => `sui_breadcrumb_list-color_${state.color}`,
        ),
      },
    ],
    state,
    defaultTagName: "ol",
  });
};

const defaultListItemRenderer: IBreadcrumbListItemRenderer = (item, index, items) => {
  switch (true) {
    case isItemObject(item): {
      const { label, itemProps } = decomposeItemObject(item);
      const current = itemProps.current ?? index === items.length - 1;

      return (
        <React.Fragment key={getItemKey(item) ?? index}>
          {index > 0 && <BreadcrumbSeparator />}
          <BreadcrumbItem>
            <BreadcrumbLink {...itemProps} current={current}>
              {label}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </React.Fragment>
      );
    }

    default:
      return <React.Fragment key={getItemKey(item) ?? index}>{item}</React.Fragment>;
  }
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

  export type IItemRenderer<TItem = any> = IBreadcrumbListItemRenderer<TItem>;

  export type ItemObject = BreadcrumbRootItemObject;
}
