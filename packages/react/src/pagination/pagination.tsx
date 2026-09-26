import * as React from "react";

import type { IComponent } from "../types.js";
import { usePaginationState } from "./_pagination.js";
import {
  type PaginationRootSize,
  type PaginationItemProps,
  type PaginationRootColor,
  type PaginationRootProps,
  type PaginationRootState,
  type PaginationRootRadius,
  type PaginationEllipsisProps,
  type PaginationNextButtonProps,
  type PaginationPreviousButtonProps,
  type PaginationRootChangeEventReason,
  type PaginationRootChangeEventDetails,
  PaginationItem,
  PaginationRoot,
  PaginationEllipsis,
  PaginationNextButton,
  PaginationPreviousButton,
} from "./pagination.parts.js";

// Types
// -----

export type PaginationColor = PaginationRootColor;

export type PaginationRadius = PaginationRootRadius;

export type PaginationSize = PaginationRootSize;

export type PaginationChangeEventReason = PaginationRootChangeEventReason;

export type PaginationChangeEventDetails = PaginationRootChangeEventDetails;

/**
 * {@link Pagination} が表示する項目のオブジェクトです。
 */
export type PaginationItemObject =
  | {
      /**
       * 項目のページ番号です。
       */
      readonly page: number;

      /**
       * 項目の種類です。
       */
      readonly type: "item";
    }
  | {
      /**
       * 省略範囲の終了ページです。
       */
      readonly end: number;

      /**
       * 省略範囲の開始ページです。
       */
      readonly start: number;

      /**
       * 項目の種類です。
       */
      readonly type: "ellipsis";
    };

/**
 * {@link Pagination} が持つ状態です。
 */
export type PaginationState = PaginationRootState;

/**
 * {@link Pagination} の各パーツに渡す props です。
 */
export type PaginationSlotProps = {
  /**
   * {@link PaginationEllipsis} に渡す props です。
   *
   * すべての省略記号に同じ props が渡されます。`start` と `end` は上書きされません。
   */
  readonly ellipsis?: Omit<PaginationEllipsisProps, "start" | "end"> | undefined;

  /**
   * {@link PaginationItem} に渡す props です。
   *
   * すべてのページ番号ボタンに同じ props が渡されます。`page` と `selected` は上書きされません。
   */
  readonly item?: Omit<PaginationItemProps, "children" | "page" | "selected"> | undefined;

  /**
   * {@link PaginationNextButton} に渡す props です。
   */
  readonly nextButton?: PaginationNextButtonProps | undefined;

  /**
   * {@link PaginationPreviousButton} に渡す props です。
   */
  readonly previousButton?: PaginationPreviousButtonProps | undefined;
};

namespace PaginationProps {
  export type Pagination = {
    /**
     * 先頭と末尾に常に表示するページ数を指定します。
     *
     * 小数値は切り捨て、負の値は 0 として扱います。
     *
     * @default 1
     */
    boundaryCount?: number | undefined;

    /**
     * 現在のページの前後に表示するページ数を指定します。
     *
     * 小数値は切り捨て、負の値は 0 として扱います。
     *
     * @default 1
     */
    siblingCount?: number | undefined;

    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     */
    slotProps?: PaginationSlotProps | undefined;
  };

  export type Root = Omit<PaginationRootProps, "children" | keyof Pagination>;
}

/**
 * {@link Pagination} に渡す props です。
 */
export type PaginationProps = PaginationProps.Pagination & PaginationProps.Root;

// API
// ---

/**
 * {@link Pagination} を構成する各パーツの props などを作成するための API です。
 */
export interface PaginationAPI {
  /**
   * {@link PaginationEllipsis} に渡す props を取得します。
   *
   * @param start 省略範囲の開始ページです。
   * @param end 省略範囲の終了ページです。
   */
  getEllipsisProps(start: number, end: number): PaginationEllipsisProps;

  /**
   * {@link PaginationItem} に渡す props を取得します。
   *
   * @param page 項目のページ番号です。
   */
  getItemProps(page: number): PaginationItemProps;

  /**
   * 表示する項目の一覧を取得します。
   */
  getItems(): PaginationItemObject[];

  /**
   * {@link PaginationNextButton} に渡す props を取得します。
   */
  getNextButtonProps(): PaginationNextButtonProps;

  /**
   * {@link PaginationPreviousButton} に渡す props を取得します。
   */
  getPreviousButtonProps(): PaginationPreviousButtonProps;

  /**
   * {@link PaginationRoot} に渡す props を取得します。
   */
  getRootProps(): Omit<PaginationRootProps, "children">;
}

interface IUsePaginationAPI {
  /**
   * {@link PaginationAPI} を作成します。
   *
   * @param props {@link Pagination} の props です。
   * @returns ページネーションの API です
   */
  (props: PaginationProps): PaginationAPI;
}

/**
 * {@link PaginationAPI} を作成するフックです。
 *
 * 非制御の現在ページを内部状態で管理するため、API はクラスではなくフックとして提供します。
 */
export const usePaginationAPI: IUsePaginationAPI = function useSuiPaginationAPI(props) {
  const {
    page: pageProp,
    disabled = false,
    slotProps: {
      item: itemProps = {},
      ellipsis: ellipsisProps = {},
      nextButton: nextButtonProps = {},
      previousButton: previousButtonProps = {},
    } = {},
    totalPages: totalPagesProp,
    defaultPage,
    onPageChange,
    siblingCount = 1,
    boundaryCount = 1,
    ...otherRootProps
  } = props;
  const { page, goToPage, totalPages } = usePaginationState({
    page: pageProp,
    disabled,
    totalPages: totalPagesProp,
    defaultPage,
    onPageChange,
  });
  const items = getPaginationItems(
    totalPages,
    page,
    Math.max(0, Math.trunc(siblingCount)),
    Math.max(0, Math.trunc(boundaryCount)),
  );

  return {
    getItems() {
      return items;
    },
    getItemProps(itemPage) {
      return {
        ...itemProps,
        page: itemPage,
        children: itemPage,
        selected: itemPage === page,
      };
    },
    getRootProps() {
      return {
        ...otherRootProps,
        page,
        disabled,
        totalPages: totalPagesProp,
        onPageChange: goToPage,
      };
    },
    getEllipsisProps(start, end) {
      return {
        ...ellipsisProps,
        end,
        start,
      };
    },
    getNextButtonProps() {
      return nextButtonProps;
    },
    getPreviousButtonProps() {
      return previousButtonProps;
    },
  };
};

export { type PaginationAPI as API, usePaginationAPI as useAPI };

// Component
// ---------

/**
 * ページ移動を行うページネーションコンポーネントです。
 *
 * 総ページ数から表示する項目を組み立て、前後の移動ボタンとページ番号ボタンを並べます。省略記号（…）を押下すると入力欄が表示され、ページ番号を入力してそのページへ直接移動できます。
 */
export const Pagination: IComponent<PaginationProps> = function SuiPagination(props) {
  const api = usePaginationAPI(props);

  return (
    <PaginationRoot {...api.getRootProps()}>
      <PaginationPreviousButton {...api.getPreviousButtonProps()} />
      {api
        .getItems()
        .map((item) =>
          item.type === "item" ? (
            <PaginationItem {...api.getItemProps(item.page)} key={`page-${item.page}`} />
          ) : (
            <PaginationEllipsis
              {...api.getEllipsisProps(item.start, item.end)}
              key={`ellipsis-${item.start}-${item.end}`}
            />
          ),
        )}
      <PaginationNextButton {...api.getNextButtonProps()} />
    </PaginationRoot>
  );
};

export namespace Pagination {
  export type State = PaginationState;

  export type Props = PaginationProps;

  export type SlotProps = PaginationSlotProps;

  export type ChangeEventDetails = PaginationChangeEventDetails;

  export type ChangeEventReason = PaginationChangeEventReason;

  export type Color = PaginationColor;

  export type ItemObject = PaginationItemObject;

  export type Radius = PaginationRadius;

  export type Size = PaginationSize;
}

/**
 * 表示する項目の一覧を組み立てます。
 *
 * 先頭末尾の固定表示と現在ページ前後の表示から重複を取り除き、離れた区間を省略記号でつなぎます。
 *
 * @param totalPages 1 以上の整数に丸め済みの総ページ数です。
 * @param page 現在のページです。
 * @param siblingCount 現在のページの前後に表示するページ数です。
 * @param boundaryCount 先頭と末尾に常に表示するページ数です。
 * @returns 表示する項目の一覧です。
 */
function getPaginationItems(
  totalPages: number,
  page: number,
  siblingCount: number,
  boundaryCount: number,
): PaginationItemObject[] {
  const pages = new Set<number>();

  for (let i = 1; i <= Math.min(boundaryCount, totalPages); i++) {
    pages.add(i);
  }

  for (let i = Math.max(1, totalPages - boundaryCount + 1); i <= totalPages; i++) {
    pages.add(i);
  }

  for (
    let i = Math.max(1, page - siblingCount);
    i <= Math.min(totalPages, page + siblingCount);
    i++
  ) {
    pages.add(i);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const items: PaginationItemObject[] = [];
  let previous = 0;

  for (const current of sorted) {
    if (current - previous > 2) {
      items.push({ end: current - 1, type: "ellipsis", start: previous + 1 });
    } else if (current - previous === 2) {
      items.push({ page: previous + 1, type: "item" });
    }

    items.push({ page: current, type: "item" });
    previous = current;
  }

  return items;
}
