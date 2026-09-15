import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import * as React from "react";

import toReactNode from "../_to-react-node.js";
import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";
import { useBreadcrumbContext } from "./breadcrumb.context.js";
import { BreadcrumbItem } from "./breadcrumb.item.jsx";
import { BreadcrumbLink } from "./breadcrumb.link.jsx";
import type { BreadcrumbRootItemObject } from "./breadcrumb.root.jsx";
import { BreadcrumbSeparator } from "./breadcrumb.separator.jsx";

/**
 * パンくずリストの各項目をレンダリングする関数のインターフェイスです。
 */
export interface IBreadcrumbListItemRenderer {
  /**
   * 項目をレンダリングします。
   *
   * @param item 現在の項目です。
   * @param index 項目のインデックスです。
   * @param items すべての項目です。
   * @returns レンダリングする内容です。
   */
  (
    item: BreadcrumbRootItemObject,
    index: number,
    items: readonly BreadcrumbRootItemObject[],
  ): React.ReactNode;
}

/**
 * {@link BreadcrumbList} が持つ状態です。
 */
export type BreadcrumbListState = {};

export namespace BreadcrumbListProps {
  export type Render = RenderProps<BreadcrumbListState>;

  export type SuruUI = {
    /**
     * パンくずリストの内容、または各項目をレンダリングする関数です。
     *
     * 関数を指定した場合は {@link BreadcrumbRootProps.items|items} の各項目が引数として渡されます。
     */
    children?: React.ReactNode | IBreadcrumbListItemRenderer;
  };

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"ol", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link BreadcrumbList} に渡す props です。
 */
export type BreadcrumbListProps = BreadcrumbListProps.Render &
  BreadcrumbListProps.SuruUI &
  BreadcrumbListProps.BaseUI &
  BreadcrumbListProps.HTML;

/**
 * パンくずの項目を並べるリストコンポーネントです。
 */
export const BreadcrumbList: IComponent<BreadcrumbListProps> = function SuiBreadcrumbList(props) {
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
  if (!isListItemObject(item)) {
    return toReactNode(item);
  }

  const { href, label, current: currentProp, disabled } = item;
  const current = currentProp ?? index === items.length - 1;

  return (
    <React.Fragment key={index}>
      {index > 0 && <BreadcrumbSeparator />}
      <BreadcrumbItem>
        <BreadcrumbLink href={current ? undefined : href} current={current} disabled={disabled}>
          {toReactNode(label)}
        </BreadcrumbLink>
      </BreadcrumbItem>
    </React.Fragment>
  );
};

function isListItemObject(item: unknown): item is BreadcrumbRootItemObject {
  return typeof item === "object" && item !== null && "label" in item;
}

export { BreadcrumbList as List };

export namespace List {
  export type State = BreadcrumbListState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = BreadcrumbListProps.Render;

    export type SuruUI = BreadcrumbListProps.SuruUI;

    export type BaseUI = BreadcrumbListProps.BaseUI;

    export type HTML = BreadcrumbListProps.HTML;
  }

  export type ItemObject = BreadcrumbRootItemObject;

  export interface IItemRenderer extends IBreadcrumbListItemRenderer {}
}
