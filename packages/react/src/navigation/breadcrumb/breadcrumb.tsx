import * as React from "react";

import type { IComponent } from "../../types.js";
import {
  type BreadcrumbRootSize,
  type BreadcrumbItemProps,
  type BreadcrumbLinkProps,
  type BreadcrumbListProps,
  type BreadcrumbRootColor,
  type BreadcrumbRootProps,
  type BreadcrumbRootState,
  type BreadcrumbSeparatorProps,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbRoot,
  BreadcrumbSeparator,
} from "./breadcrumb.parts.jsx";

/**
 * {@link BreadcrumbRootColor} です。
 */
export type BreadcrumbColor = BreadcrumbRootColor;

/**
 * {@link BreadcrumbRootSize} です。
 */
export type BreadcrumbSize = BreadcrumbRootSize;

/**
 * {@link Breadcrumb} の各項目です。
 */
export type BreadcrumbItemsItem = {
  /**
   * 現在のページかどうかを指定します。
   *
   * 最後の項目は、指定しない場合に現在位置として描画します。
   *
   * @default false
   */
  readonly current?: boolean | undefined;

  /**
   * リンク先の URL です。
   *
   * 未指定の場合、リンクにならない要素として描画します。
   */
  readonly href?: string | undefined;

  /**
   * 項目のラベルです。
   */
  readonly label: React.ReactNode;
};

/**
 * {@link Breadcrumb} の状態です。
 */
export type BreadcrumbState = BreadcrumbRootState;

/**
 * {@link Breadcrumb} の各パーツに渡すプロパティーです。
 */
export type BreadcrumbSlotProps = {
  /**
   * {@link BreadcrumbItem} に渡すプロパティーです。
   *
   * すべての項目に同じプロパティーが渡されます。
   */
  readonly item?: BreadcrumbItemProps | undefined;

  /**
   * {@link BreadcrumbLink} に渡すプロパティーです。
   *
   * すべてのリンクに同じプロパティーが渡されます。`current` と `href` は上書きされません。
   */
  readonly link?: Omit<BreadcrumbLinkProps, "current" | "href"> | undefined;

  /**
   * {@link BreadcrumbList} に渡すプロパティーです。
   */
  readonly list?: BreadcrumbListProps | undefined;

  /**
   * {@link BreadcrumbSeparator} に渡すプロパティーです。
   *
   * すべてのセパレーターに同じプロパティーが渡されます。`children` と `aria-hidden` は上書きされません。
   */
  readonly separator?: Omit<BreadcrumbSeparatorProps, "aria-hidden" | "children"> | undefined;
};

/**
 * {@link Breadcrumb} の各パーツに渡すプロパティーです。
 */
export type BreadcrumbPartsProps = {
  /**
   * {@link BreadcrumbList} に渡すプロパティーです。
   */
  readonly list: BreadcrumbListProps;

  /**
   * {@link BreadcrumbRoot} に渡すプロパティーです。
   */
  readonly root: BreadcrumbRootProps;
};

/**
 * {@link Breadcrumb} コンポーネントのプロパティーです。
 */
export type BreadcrumbProps = Omit<BreadcrumbRootProps, "children"> & {
  /**
   * パンくずの項目を先頭から順に指定します。
   */
  items: readonly BreadcrumbItemsItem[];

  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   *
   * 各パーツのプロパティーが優先されます。
   */
  slotProps?: BreadcrumbSlotProps | undefined;
};

/**
 * {@link Breadcrumb} の各パーツに渡すプロパティーを作るフックです。
 */
export function useBreadcrumb(props: BreadcrumbProps): BreadcrumbPartsProps {
  const { slotProps: { list: listProps } = {}, items: _items, ...rootProps } = props;

  return {
    root: rootProps,
    list: { ...listProps },
  };
}

/**
 * パンくずリストを表示するコンポーネントです。
 *
 * {@link BreadcrumbProps.items|items} に指定した順に項目を並べ、項目の間にセパレーターを挿入します。最後の項目は、{@link BreadcrumbItemsItem.current|current} を指定しない限り現在位置として描画します。
 */
export const Breadcrumb: IComponent<BreadcrumbProps> = function SuiBreadcrumb(props) {
  const partsProps = useBreadcrumb(props);
  const { slotProps: { item: itemProps, link: linkProps, separator: separatorProps } = {}, items } =
    props;

  return (
    <BreadcrumbRoot {...partsProps.root}>
      <BreadcrumbList {...partsProps.list}>
        {items.map((item, index) => {
          const current = item.current ?? index === items.length - 1;

          return (
            <React.Fragment key={index}>
              {index > 0 && <BreadcrumbSeparator {...separatorProps} />}
              <BreadcrumbItem {...itemProps}>
                <BreadcrumbLink
                  {...linkProps}
                  href={current ? undefined : item.href}
                  current={current}
                >
                  {item.label}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbRoot>
  );
};

/**
 * {@link Breadcrumb} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Breadcrumb {
  /**
   * {@link BreadcrumbState} です。
   */
  export type State = BreadcrumbState;

  /**
   * {@link BreadcrumbProps} です。
   */
  export type Props = BreadcrumbProps;

  /**
   * {@link BreadcrumbSlotProps} です。
   */
  export type SlotProps = BreadcrumbSlotProps;

  /**
   * {@link BreadcrumbColor} です。
   */
  export type Color = BreadcrumbColor;

  /**
   * {@link BreadcrumbSize} です。
   */
  export type Size = BreadcrumbSize;
}
