import * as React from "react";

import type { LikelyVisibleNode } from "../_is-likely-visible-node.js";
import toReactNode from "../_to-react-node.js";
import type { IComponent } from "../types.js";
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
} from "./breadcrumb.parts.jsx";

// Types
// -----

/**
 * {@link BreadcrumbRootColor}
 */
export type BreadcrumbColor = BreadcrumbRootColor;

/**
 * {@link BreadcrumbRootSize}
 */
export type BreadcrumbSize = BreadcrumbRootSize;

/**
 * {@link BreadcrumbRootItemObject}
 */
export type BreadcrumbItemObject = BreadcrumbRootItemObject;

/**
 * {@link IBreadcrumbListItemRenderer}
 */
export interface IBreadcrumbItemRenderer extends IBreadcrumbListItemRenderer {}

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
   * すべてのリンクに同じ props が渡されます。`children` と `current` と `href` は上書きされません。
   */
  readonly link?: Omit<BreadcrumbLinkProps, "children" | "current" | "href"> | undefined;

  /**
   * {@link BreadcrumbList} に渡す props です。
   */
  readonly list?: Omit<BreadcrumbListProps, "children"> | undefined;

  /**
   * {@link BreadcrumbSeparator} に渡す props です。
   *
   * すべてのセパレーターに同じ props が渡されます。`children` と `aria-hidden` は上書きされません。
   */
  readonly separator?: Omit<BreadcrumbSeparatorProps, "aria-hidden" | "children"> | undefined;
};

/**
 * {@link Breadcrumb} に渡す props です。
 */
export type BreadcrumbProps = Omit<BreadcrumbRootProps, "children" | "items"> &
  Pick<BreadcrumbListProps, "children"> & {
    /**
     * パンくずリストの項目です。
     */
    items: readonly BreadcrumbItemObject[];

    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     *
     * 各パーツの props が優先されます。
     */
    slotProps?: BreadcrumbSlotProps | undefined;
  };

// API
// ---

/**
 * {@link Breadcrumb} を構成する各パーツの props などを作成するための API です。
 */
export interface BreadcrumbAPI {
  /**
   * {@link BreadcrumbItem} に渡す props を取得します。
   */
  getItemProps(): Omit<BreadcrumbItemProps, "children">;

  /**
   * 項目のラベルを取得します。
   *
   * @param item 項目です。
   */
  getLabel(item: BreadcrumbItemObject): React.ReactNode;

  /**
   * {@link BreadcrumbLink} に渡す props を取得します。
   *
   * @param item 項目です。
   * @param index 項目のインデックスです。
   */
  getLinkProps(item: BreadcrumbItemObject, index: number): BreadcrumbLinkProps;

  /**
   * {@link BreadcrumbList} に渡す props を取得します。
   */
  getListProps(): Omit<BreadcrumbListProps, "children"> & {
    children: LikelyVisibleNode | null;
  };

  /**
   * {@link BreadcrumbRoot} に渡す props を取得します。
   */
  getRootProps(): Omit<BreadcrumbRootProps, "children">;

  /**
   * {@link BreadcrumbSeparator} に渡す props を取得します。
   */
  getSeparatorProps(): Omit<BreadcrumbSeparatorProps, "children">;
}

interface IUseBreadcrumbAPI {
  /**
   * {@link BreadcrumbAPI} を作成します。
   *
   * @param props {@link Breadcrumb} の props です。
   * @returns パンくずリストの API です
   */
  (props: BreadcrumbProps): BreadcrumbAPI;
}

/**
 * {@link BreadcrumbAPI} を作成するフックです。
 */
export const useBreadcrumbAPI: IUseBreadcrumbAPI = function useSuiBreadcrumbAPI(props) {
  const {
    items,
    children,
    slotProps: {
      item: itemProps = {},
      link: linkProps = {},
      list: listProps = {},
      separator: separatorProps = {},
    } = {},
    ...otherRootProps
  } = props;

  return {
    getLabel(item) {
      return toReactNode(item.label);
    },
    getItemProps() {
      return itemProps;
    },
    getLinkProps(item, index) {
      const current = item.current ?? index === items.length - 1;

      return {
        ...linkProps,
        href: current ? undefined : item.href,
        current,
        disabled: item.disabled ?? linkProps.disabled ?? false,
        children: toReactNode(item.label),
      };
    },
    getListProps() {
      return {
        ...listProps,
        children: typeof children === "function" ? items.map(children) : toReactNode(children),
      };
    },
    getRootProps() {
      return {
        ...otherRootProps,
        items,
      };
    },
    getSeparatorProps() {
      return separatorProps;
    },
  };
};

export { type BreadcrumbAPI as API, useBreadcrumbAPI as useAPI };

// Component
// ---------

/**
 * パンくずリストを表示するコンポーネントです。
 *
 * {@link BreadcrumbProps.items|items} に指定した順に項目を並べ、項目の間にセパレーターを挿入します。最後の項目は、{@link BreadcrumbItemObject.current|current} を指定しない限り現在位置として描画します。
 */
export const Breadcrumb: IComponent<BreadcrumbProps> = function SuiBreadcrumb(props) {
  const api = useBreadcrumbAPI(props);
  const { children, ...otherListProps } = api.getListProps();

  return (
    <BreadcrumbRoot {...api.getRootProps()}>
      <BreadcrumbList {...otherListProps}>
        {children ??
          ((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && <BreadcrumbSeparator {...api.getSeparatorProps()} />}
              <BreadcrumbItem {...api.getItemProps()}>
                <BreadcrumbLink {...api.getLinkProps(item, index)} />
              </BreadcrumbItem>
            </React.Fragment>
          ))}
      </BreadcrumbList>
    </BreadcrumbRoot>
  );
};

export namespace Breadcrumb {
  /**
   * {@link BreadcrumbState}
   */
  export type State = BreadcrumbState;

  /**
   * {@link BreadcrumbProps}
   */
  export type Props = BreadcrumbProps;

  /**
   * {@link BreadcrumbSlotProps}
   */
  export type SlotProps = BreadcrumbSlotProps;

  /**
   * {@link BreadcrumbColor}
   */
  export type Color = BreadcrumbColor;

  /**
   * {@link BreadcrumbItemObject}
   */
  export type ItemObject = BreadcrumbItemObject;

  /**
   * {@link IBreadcrumbItemRenderer}
   */
  export interface IItemRenderer extends IBreadcrumbItemRenderer {}

  /**
   * {@link BreadcrumbSize}
   */
  export type Size = BreadcrumbSize;
}
