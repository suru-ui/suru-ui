import * as React from "react";

import type { LikelyVisibleNode } from "../_is-likely-visible-node.js";
import toReactNode from "../_to-react-node.js";
import type { IComponent } from "../types.js";
import {
  type PaginationGoToPage,
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
} from "./pagination.parts.jsx";

// Types
// -----

/**
 * {@link PaginationRootColor}
 */
export type PaginationColor = PaginationRootColor;

/**
 * {@link PaginationRootRadius}
 */
export type PaginationRadius = PaginationRootRadius;

/**
 * {@link PaginationRootSize}
 */
export type PaginationSize = PaginationRootSize;

/**
 * {@link PaginationRootChangeEventReason}
 */
export type PaginationChangeEventReason = PaginationRootChangeEventReason;

/**
 * {@link PaginationRootChangeEventDetails}
 */
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
  readonly item?: Omit<PaginationItemProps, "page" | "selected"> | undefined;

  /**
   * {@link PaginationNextButton} に渡す props です。
   */
  readonly next?: PaginationNextButtonProps | undefined;

  /**
   * {@link PaginationPreviousButton} に渡す props です。
   */
  readonly previous?: PaginationPreviousButtonProps | undefined;
};

/**
 * {@link Pagination} に渡す props です。
 */
export type PaginationProps = Omit<PaginationRootProps, "children"> & {
  /**
   * 先頭と末尾に常に表示するページ数を指定します。
   *
   * @default 1
   */
  boundaryCount?: number | undefined;

  /**
   * 現在のページの前後に表示するページ数を指定します。
   *
   * @default 1
   */
  siblingCount?: number | undefined;

  /**
   * 各パーツに個別の props を渡すためのオブジェクトです。
   *
   * 各パーツの props が優先されます。
   */
  slotProps?: PaginationSlotProps | undefined;
};

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
  getItemProps(page: number): Omit<PaginationItemProps, "children"> & {
    children: LikelyVisibleNode | null;
  };

  /**
   * 表示する項目の一覧を取得します。
   */
  getItems(): PaginationItemObject[];

  /**
   * {@link PaginationNextButton} に渡す props を取得します。
   */
  getNextProps(): PaginationNextButtonProps;

  /**
   * {@link PaginationPreviousButton} に渡す props を取得します。
   */
  getPreviousProps(): PaginationPreviousButtonProps;

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
 */
export const usePaginationAPI: IUsePaginationAPI = function useSuiPaginationAPI(props) {
  const {
    page: pageProp,
    slotProps: {
      item: itemProps = {},
      next: nextProps = {},
      ellipsis: ellipsisProps = {},
      previous: previousProps = {},
    } = {},
    totalPages,
    defaultPage = 1,
    onPageChange,
    siblingCount = 1,
    boundaryCount = 1,
    ...otherRootProps
  } = props;
  const maxPage = Math.max(totalPages, 1);
  const [innerPage, setInnerPage] = React.useState(() =>
    Math.min(Math.max(Math.trunc(defaultPage), 1), maxPage),
  );
  const page = Math.min(Math.max(pageProp ?? innerPage, 1), maxPage);
  const handlePageChange: PaginationGoToPage = (nextPage, details) => {
    if (pageProp === undefined) {
      setInnerPage(nextPage);
    }

    onPageChange?.(nextPage, details);
  };
  const items = getPaginationItems(totalPages, page, siblingCount, boundaryCount);

  return {
    getItems() {
      return items;
    },
    getItemProps(itemPage) {
      return {
        ...itemProps,
        page: itemPage,
        children: toReactNode(itemPage),
        selected: itemPage === page,
      };
    },
    getNextProps() {
      return nextProps;
    },
    getRootProps() {
      return {
        ...otherRootProps,
        page,
        totalPages,
        onPageChange: handlePageChange,
      };
    },
    getEllipsisProps(start, end) {
      return {
        ...ellipsisProps,
        end,
        start,
      };
    },
    getPreviousProps() {
      return previousProps;
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
  const items = api.getItems();

  return (
    <PaginationRoot {...api.getRootProps()}>
      <PaginationPreviousButton {...api.getPreviousProps()} />
      {items.map((item) =>
        item.type === "item" ? (
          <PaginationItem {...api.getItemProps(item.page)} key={`page-${item.page}`} />
        ) : (
          <PaginationEllipsis
            {...api.getEllipsisProps(item.start, item.end)}
            key={`ellipsis-${item.start}-${item.end}`}
          />
        ),
      )}
      <PaginationNextButton {...api.getNextProps()} />
    </PaginationRoot>
  );
};

export namespace Pagination {
  /**
   * {@link PaginationState}
   */
  export type State = PaginationState;

  /**
   * {@link PaginationProps}
   */
  export type Props = PaginationProps;

  /**
   * {@link PaginationSlotProps}
   */
  export type SlotProps = PaginationSlotProps;

  /**
   * {@link PaginationChangeEventDetails}
   */
  export type ChangeEventDetails = PaginationChangeEventDetails;

  /**
   * {@link PaginationChangeEventReason}
   */
  export type ChangeEventReason = PaginationChangeEventReason;

  /**
   * {@link PaginationColor}
   */
  export type Color = PaginationColor;

  /**
   * {@link PaginationItemObject}
   */
  export type ItemObject = PaginationItemObject;

  /**
   * {@link PaginationRadius}
   */
  export type Radius = PaginationRadius;

  /**
   * {@link PaginationSize}
   */
  export type Size = PaginationSize;
}

function getPaginationItems(
  totalPages: number,
  page: number,
  siblingCount: number,
  boundaryCount: number,
): PaginationItemObject[] {
  const maxPage = Math.max(totalPages, 1);
  const pages = new Set<number>();

  for (let i = 1; i <= Math.min(boundaryCount, maxPage); i++) {
    pages.add(i);
  }

  for (let i = Math.max(1, maxPage - boundaryCount + 1); i <= maxPage; i++) {
    pages.add(i);
  }

  for (let i = Math.max(1, page - siblingCount); i <= Math.min(maxPage, page + siblingCount); i++) {
    pages.add(i);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const items: PaginationItemObject[] = [];
  let previous = 0;

  for (const current of sorted) {
    if (current - previous > 2) {
      items.push({ type: "ellipsis", start: previous + 1, end: current - 1 });
    } else if (current - previous === 2) {
      items.push({ type: "item", page: previous + 1 });
    }

    items.push({ type: "item", page: current });
    previous = current;
  }

  return items;
}
