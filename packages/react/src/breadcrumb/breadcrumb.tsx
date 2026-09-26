import * as React from "react";

import { getItemKey } from "../_item.js";
import mergeProps from "../_merge-props.js";
import toReactNode from "../_to-react-node.js";
import type { IComponent } from "../types.js";
import { isItemObject } from "./_breadcrumb.jsx";
import type { BreadcrumbContext } from "./breadcrumb.context.js";
import {
  type BreadcrumbRootSize,
  type BreadcrumbItemProps,
  type BreadcrumbLinkProps,
  type BreadcrumbListProps,
  type BreadcrumbRootColor,
  type BreadcrumbRootProps,
  type BreadcrumbRootState,
  type BreadcrumbRootItemObject,
  type BreadcrumbSeparatorProps,
  type IBreadcrumbListItemRenderer,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbRoot,
  BreadcrumbSeparator,
} from "./breadcrumb.parts.js";

// Types
// -----

export type BreadcrumbColor = BreadcrumbRootColor;

export type BreadcrumbSize = BreadcrumbRootSize;

export type BreadcrumbItemObject = BreadcrumbRootItemObject;

export interface IBreadcrumbItemRenderer<TItem = any> extends IBreadcrumbListItemRenderer<TItem> {}

/**
 * {@link Breadcrumb} が持つ状態です。
 */
export type BreadcrumbState = BreadcrumbRootState;

/**
 * {@link Breadcrumb} の各パーツに渡す props です。
 */
export type BreadcrumbSlotProps = {
  /**
   * {@link BreadcrumbItem} に渡す props です。
   *
   * すべての項目に同じ props が渡されます。
   */
  readonly item?: Omit<BreadcrumbItemProps, "children"> | undefined;

  /**
   * {@link BreadcrumbLink} に渡す props です。
   *
   * すべてのリンクに同じ props が渡されます。`children` と `current` と `href` は項目ごとの値で上書きされます。
   */
  readonly link?: Omit<BreadcrumbLinkProps, "children" | "current" | "href"> | undefined;

  /**
   * {@link BreadcrumbList} に渡す props です。
   */
  readonly list?: Omit<BreadcrumbListProps, "children"> | undefined;

  /**
   * {@link BreadcrumbSeparator} に渡す props です。
   *
   * すべてのセパレーターに同じ props が渡されます。`aria-hidden` は上書きされません。
   */
  readonly separator?: Omit<BreadcrumbSeparatorProps, "aria-hidden"> | undefined;
};

namespace BreadcrumbProps {
  export type Breadcrumb<TItem = any> = {
    /**
     * パンくずリストの項目です。
     */
    items: readonly TItem[];

    /**
     * パンくずリストの内容、または各項目をレンダリングする関数です。
     *
     * 省略した場合は {@link BreadcrumbRootProps.items|items} の各項目を既定の並びで表示します。
     */
    children?: BreadcrumbListProps<TItem>["children"] | undefined;

    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     */
    slotProps?: BreadcrumbSlotProps | undefined;
  };

  export type Root<TItem = any> = Omit<
    BreadcrumbRootProps<TItem>,
    "children" | "items" | keyof Breadcrumb
  >;
}

/**
 * {@link Breadcrumb} に渡す props です。
 *
 * @template TItem 項目の型です。
 */
export type BreadcrumbProps<TItem = any> = BreadcrumbProps.Breadcrumb<TItem> &
  BreadcrumbProps.Root<TItem>;

// API
// ---

/**
 * {@link Breadcrumb} を構成する各パーツの props などを作成するための API です。
 *
 * @template TItem 項目の型です。
 */
export class BreadcrumbAPI<TItem = any> {
  private readonly breadcrumbProps: Required<Omit<BreadcrumbProps.Breadcrumb<TItem>, "slotProps">>;

  private readonly slotProps: BreadcrumbSlotProps;

  private readonly rootProps: BreadcrumbProps.Root<TItem>;

  /**
   * @param props {@link Breadcrumb} の props です。
   * @internal
   */
  public constructor(props: BreadcrumbProps<TItem>) {
    const { items, children, slotProps = {}, ...rootProps } = props;
    this.breadcrumbProps = { items, children };
    this.slotProps = slotProps;
    this.rootProps = rootProps;
  }

  private defaultItemRenderer: IBreadcrumbItemRenderer<TItem> = (item, index) => {
    if (!isItemObject(item)) {
      return toReactNode(item);
    }

    return (
      <React.Fragment key={getItemKey(item) ?? index}>
        {index > 0 && <BreadcrumbSeparator {...this.getSeparatorProps()} />}
        <BreadcrumbItem {...this.getItemProps()}>
          <BreadcrumbLink {...this.getLinkProps(item, index)} />
        </BreadcrumbItem>
      </React.Fragment>
    );
  };

  /**
   * {@link BreadcrumbItem} に渡す props を取得します。
   */
  public getItemProps(): Omit<BreadcrumbItemProps, "children"> {
    const { item: props = {} } = this.slotProps;

    return props;
  }

  /**
   * 項目のラベルを取得します。
   *
   * @param item 項目です。
   */
  public getLabel(item: BreadcrumbItemObject): React.ReactNode {
    return toReactNode(item.label);
  }

  /**
   * {@link BreadcrumbLink} に渡す props を取得します。
   *
   * @param item 項目です。
   * @param index 項目のインデックスです。
   */
  public getLinkProps(item: BreadcrumbItemObject, index: number): BreadcrumbLinkProps {
    const { link: props = {} } = this.slotProps;
    const { label: _label, current: currentProp, ...otherItemProps } = item;
    const current = currentProp ?? index === this.breadcrumbProps.items.length - 1;

    return mergeProps([props, otherItemProps, { current, children: this.getLabel(item) }]);
  }

  /**
   * {@link BreadcrumbList} に渡す props を取得します。
   */
  public getListProps(): BreadcrumbListProps<TItem> {
    const { list: props = {} } = this.slotProps;
    const { children } = this.breadcrumbProps;

    return {
      ...props,
      children: typeof children === "function" ? children : (children ?? this.defaultItemRenderer),
    };
  }

  /**
   * {@link BreadcrumbRoot} に渡す props を取得します。
   */
  public getRootProps(): BreadcrumbRootProps<TItem> {
    return {
      ...this.rootProps,
      items: this.breadcrumbProps.items,
    };
  }

  /**
   * {@link BreadcrumbSeparator} に渡す props を取得します。
   */
  public getSeparatorProps(): Omit<BreadcrumbSeparatorProps, "aria-hidden"> {
    const { separator: props = {} } = this.slotProps;

    return props;
  }
}

interface IUseBreadcrumbAPI {
  /**
   * {@link BreadcrumbAPI} を作成します。
   *
   * @template TItem 項目の型です。
   * @param props {@link Breadcrumb} の props です。
   * @returns パンくずリストの API です
   */
  <TItem = any>(props: BreadcrumbProps<TItem>): BreadcrumbAPI<TItem>;
}

/**
 * {@link BreadcrumbAPI} を作成するフックです。
 */
export const useBreadcrumbAPI: IUseBreadcrumbAPI = function useSuiBreadcrumbAPI(props) {
  return new BreadcrumbAPI(props);
};

export { BreadcrumbAPI as API, useBreadcrumbAPI as useAPI };

// Component
// ---------

interface IBreadcrumb extends IComponent<BreadcrumbProps> {
  /**
   * @template TItem 項目の型です。
   */
  <TItem = any>(props: BreadcrumbProps<TItem>): IComponent.Return;
}

/**
 * パンくずリストを表示するコンポーネントです。
 *
 * {@link BreadcrumbRootProps.items|items} を順に並べ、最後の項目を現在のページとして表示します。
 */
export const Breadcrumb: IBreadcrumb = function SuiBreadcrumb(props: BreadcrumbProps) {
  const api = useBreadcrumbAPI(props);

  return (
    <BreadcrumbRoot {...api.getRootProps()}>
      <BreadcrumbList {...api.getListProps()} />
    </BreadcrumbRoot>
  );
};

export namespace Breadcrumb {
  export type State = BreadcrumbState;

  export type Props<TItem = any> = BreadcrumbProps<TItem>;

  export type SlotProps = BreadcrumbSlotProps;

  export type Context<TItem = any> = BreadcrumbContext<TItem>;

  export type Color = BreadcrumbColor;

  export type ItemObject = BreadcrumbItemObject;

  export interface IItemRenderer<TItem = any> extends IBreadcrumbItemRenderer<TItem> {}

  export type Size = BreadcrumbSize;
}
