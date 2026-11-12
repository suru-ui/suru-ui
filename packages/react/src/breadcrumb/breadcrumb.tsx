import * as React from "react";

import { getItemKey } from "../_item.js";
import mergeProps from "../_merge-props.js";
import type { IComponent } from "../types.js";
import { isItemObject } from "./_breadcrumb.jsx";
import {
  type BreadcrumbRootSize,
  type BreadcrumbItemProps,
  type BreadcrumbLinkProps,
  type BreadcrumbListProps,
  type BreadcrumbRootColor,
  type BreadcrumbRootProps,
  type BreadcrumbRootState,
  type IUseBreadcrumbContext,
  type BreadcrumbRootItemObject,
  type BreadcrumbSeparatorProps,
  type IBreadcrumbListItemRenderer,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbRoot,
  BreadcrumbSeparator,
  useBreadcrumbContext,
} from "./breadcrumb.parts.js";
import { BreadcrumbEllipsis } from "./ellipsis/breadcrumb.ellipsis.jsx";
import type { BreadcrumbContext } from "./root/breadcrumb.root.context.js";
import { decomposeItemObject } from "./utils/breadcrumb.utils.js";

// Types.

export type BreadcrumbColor = BreadcrumbRootColor;

export type BreadcrumbSize = BreadcrumbRootSize;

export type BreadcrumbItemObject = BreadcrumbRootItemObject;

export type IBreadcrumbItemRenderer<TItem = any> = IBreadcrumbListItemRenderer<TItem>;

/**
 * {@link Breadcrumb} が持つ状態です。
 *
 * @template TItem 項目の型です。
 */
export type BreadcrumbState<TItem = any> = BreadcrumbRootState<TItem>;

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
    /** パンくずリストの項目です。 */
    items: readonly TItem[];

    /**
     * 省略記号を含めて表示する項目の最大数です。
     *
     * 項目数がこの数を超える場合、先頭の項目と末尾側の項目を残し、それ以外を省略記号にまとめます。
     * 省略記号を押すと、省略された項目を選択するための候補リストが開きます。
     *
     * `children` を指定した場合は適用されません。
     *
     * 3 未満の値は 3 として扱います。
     *
     * @default undefined
     */
    maxItems?: number | undefined;

    /** 各パーツに個別の props を渡すためのオブジェクトです。 */
    slotProps?: BreadcrumbSlotProps | undefined;
  };

  export type List<TItem = any> = Pick<BreadcrumbListProps<TItem>, "children">;

  export type Root<TItem = any> = Omit<BreadcrumbRootProps<TItem>, keyof Breadcrumb | keyof List>;
}

/**
 * {@link Breadcrumb} に渡す props です。
 *
 * @template TItem 項目の型です。
 */
export type BreadcrumbProps<TItem = any> = BreadcrumbProps.Breadcrumb<TItem> &
  BreadcrumbProps.Root<TItem> &
  BreadcrumbProps.List<TItem>;

export interface IUseBreadcrumbAPI {
  /**
   * {@link BreadcrumbAPI} を作成します。
   *
   * @template TItem 項目の型です。
   *
   * @param props {@link Breadcrumb} の props です。
   *
   * @returns パンくずリストの API です
   */
  <TItem = any>(props: BreadcrumbProps<TItem>): BreadcrumbAPI<TItem>;
}

// API.

/**
 * {@link Breadcrumb} を構成する各パーツの props などを作成するための API です。
 *
 * @template TItem 項目の型です。
 */
export class BreadcrumbAPI<TItem = any> {
  private readonly breadcrumbProps: Required<Omit<BreadcrumbProps.Breadcrumb<TItem>, "slotProps">>;

  private readonly listProps: BreadcrumbProps.List<TItem>;

  private readonly slotProps: BreadcrumbSlotProps;

  private readonly rootProps: BreadcrumbProps.Root<TItem>;

  private readonly defaultItemRenderer: IBreadcrumbItemRenderer = (item, index, items) => {
    const layout = this.getCollapsedLayout(items.length);

    if (layout && index >= layout.hiddenStart && index < layout.hiddenEnd) {
      if (index !== layout.hiddenStart) {
        return null;
      }

      const hiddenItems = items
        .slice(layout.hiddenStart, layout.hiddenEnd)
        .map((hiddenItem, offset) => ({
          item: hiddenItem,
          index: layout.hiddenStart + offset,
        }));

      return (
        <React.Fragment key="sui_breadcrumb_ellipsis">
          {layout.hiddenStart > 0 && <BreadcrumbSeparator {...this.getSeparatorProps()} />}
          <BreadcrumbItem {...this.getItemProps()}>
            <BreadcrumbEllipsis
              items={hiddenItems}
              getItemLabel={(hiddenItem) =>
                isItemObject(hiddenItem) ? this.getLabel(hiddenItem) : hiddenItem
              }
              getItemLinkProps={(hiddenItem, hiddenIndex) =>
                isItemObject(hiddenItem) ? this.getLinkProps(hiddenItem, hiddenIndex) : null
              }
            />
          </BreadcrumbItem>
        </React.Fragment>
      );
    }

    switch (true) {
      case isItemObject(item):
        return (
          <React.Fragment key={getItemKey(item) ?? index}>
            {index > 0 && <BreadcrumbSeparator {...this.getSeparatorProps()} />}
            <BreadcrumbItem {...this.getItemProps()}>
              <BreadcrumbLink {...this.getLinkProps(item, index)} />
            </BreadcrumbItem>
          </React.Fragment>
        );

      default:
        return <React.Fragment key={getItemKey(item) ?? index}>{item}</React.Fragment>;
    }
  };

  /**
   * @param props {@link Breadcrumb} の props です。
   *
   * @internal
   */
  public constructor(props: BreadcrumbProps<TItem>) {
    const { items, children, maxItems, slotProps = {}, ...rootProps } = props;
    this.breadcrumbProps = {
      items,
      maxItems,
    };
    this.listProps = {
      children,
    };
    this.slotProps = slotProps;
    this.rootProps = rootProps;
  }

  /**
   * 項目を省略する範囲を取得します。
   *
   * @param itemCount 項目数です。
   *
   * @returns 省略する範囲です。省略しない場合は `null` を返します。
   */

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
    return item.label;
  }

  /**
   * {@link BreadcrumbLink} に渡す props を取得します。
   *
   * @param item 項目です。
   * @param index 項目のインデックスです。
   */
  public getLinkProps(item: BreadcrumbItemObject, index: number): BreadcrumbLinkProps {
    const { link: props = {} } = this.slotProps;
    const { itemProps } = decomposeItemObject(item);
    const current = itemProps.current ?? index === this.breadcrumbProps.items.length - 1;

    return mergeProps([
      props,
      itemProps,
      {
        current,
        children: this.getLabel(item),
      },
    ]);
  }

  /**
   * {@link BreadcrumbList} に渡す props を取得します。
   */
  public getListProps(): BreadcrumbListProps<TItem> {
    const { list: props = {} } = this.slotProps;
    const { children } = this.listProps;

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

  private getCollapsedLayout(itemCount: number): {
    hiddenEnd: number;
    hiddenStart: number;
  } | null {
    const { maxItems } = this.breadcrumbProps;

    if (maxItems === undefined) {
      return null;
    }

    const limit = Math.max(3, Math.trunc(maxItems));

    if (itemCount <= limit) {
      return null;
    }

    const hiddenStart = 1;
    const hiddenEnd = itemCount - (limit - 2);

    return hiddenStart < hiddenEnd
      ? {
          hiddenEnd,
          hiddenStart,
        }
      : null;
  }
}

/**
 * {@link BreadcrumbAPI} を作成するフックです。
 */
export const useBreadcrumbAPI: IUseBreadcrumbAPI = (props) => new BreadcrumbAPI(props);

export { BreadcrumbAPI as API, useBreadcrumbAPI as useAPI };

// Component.

export interface IBreadcrumb extends IComponent<BreadcrumbProps> {
  /**
   * @template TItem 項目の型です。
   */
  <TItem = any>(props: BreadcrumbProps<TItem>): IComponent.Return;
  readonly useContext: IUseBreadcrumbContext;
}

/**
 * パンくずリストを表示するコンポーネントです。
 *
 * {@link BreadcrumbRootProps.items|items} を順に並べ、最後の項目を現在のページとして表示します。
 * {@link BreadcrumbProps.maxItems|maxItems} を指定すると、超過分を省略記号にまとめ、省略記号から項目を選択できます。
 */
export const Breadcrumb: IBreadcrumb = Object.assign(
  (props: BreadcrumbProps) => {
    const api = useBreadcrumbAPI(props);

    return (
      <BreadcrumbRoot {...api.getRootProps()}>
        <BreadcrumbList {...api.getListProps()} />
      </BreadcrumbRoot>
    );
  },
  {
    useContext: useBreadcrumbContext,
  },
);

export namespace Breadcrumb {
  export type State<TItem = any> = BreadcrumbState<TItem>;

  export type Props<TItem = any> = BreadcrumbProps<TItem>;

  export type SlotProps = BreadcrumbSlotProps;

  export type Context<TItem = any> = BreadcrumbContext<TItem>;

  export type Color = BreadcrumbColor;

  export type IItemRenderer<TItem = any> = IBreadcrumbItemRenderer<TItem>;

  export type ItemObject = BreadcrumbItemObject;

  export type Size = BreadcrumbSize;
}
