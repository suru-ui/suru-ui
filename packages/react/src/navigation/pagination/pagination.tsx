import * as React from "react";

import type { IComponent } from "../../types.js";
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

/**
 * {@link PaginationRootColor} です。
 */
export type PaginationColor = PaginationRootColor;

/**
 * {@link PaginationRootRadius} です。
 */
export type PaginationRadius = PaginationRootRadius;

/**
 * {@link PaginationRootSize} です。
 */
export type PaginationSize = PaginationRootSize;

/**
 * {@link PaginationRootChangeEventReason} です。
 */
export type PaginationChangeEventReason = PaginationRootChangeEventReason;

/**
 * {@link PaginationRootChangeEventDetails} です。
 */
export type PaginationChangeEventDetails = PaginationRootChangeEventDetails;

/**
 * {@link Pagination} の状態です。
 */
export type PaginationState = PaginationRootState;

/**
 * {@link Pagination} の各パーツに渡すプロパティーです。
 */
export type PaginationSlotProps = {
  /**
   * {@link PaginationEllipsis} に渡すプロパティーです。
   *
   * すべての省略記号に同じプロパティーが渡されます。
   */
  readonly ellipsis?: PaginationEllipsisProps | undefined;

  /**
   * {@link PaginationItem} に渡すプロパティーです。
   *
   * すべてのページ番号ボタンに同じプロパティーが渡されます。`page` と `selected` は上書きされません。
   */
  readonly item?: Omit<PaginationItemProps, "page" | "selected"> | undefined;

  /**
   * {@link PaginationNextButton} に渡すプロパティーです。
   */
  readonly next?: PaginationNextButtonProps | undefined;

  /**
   * {@link PaginationPreviousButton} に渡すプロパティーです。
   */
  readonly previous?: PaginationPreviousButtonProps | undefined;
};

/**
 * {@link Pagination} の各パーツに渡すプロパティーです。
 */
export type PaginationPartsProps = {
  /**
   * {@link PaginationNextButton} に渡すプロパティーです。
   */
  readonly next: PaginationNextButtonProps;

  /**
   * {@link PaginationPreviousButton} に渡すプロパティーです。
   */
  readonly previous: PaginationPreviousButtonProps;

  /**
   * {@link PaginationRoot} に渡すプロパティーです。
   */
  readonly root: PaginationRootProps;
};

/**
 * {@link Pagination} コンポーネントのプロパティーです。
 */
export type PaginationProps = Omit<PaginationRootProps, "children"> & {
  /**
   * 各パーツに個別のプロパティーを渡すためのオブジェクトです。
   *
   * 各パーツのプロパティーが優先されます。
   */
  slotProps?: PaginationSlotProps | undefined;
};

/**
 * {@link Pagination} の各パーツに渡すプロパティーを作るフックです。
 */
export function usePagination(props: PaginationProps): PaginationPartsProps {
  const { slotProps: { next: nextProps, previous: previousProps } = {}, ...rootProps } = props;

  return {
    root: rootProps,
    previous: { ...previousProps },
    next: { ...nextProps },
  };
}

/**
 * ページ移動を行うページネーションコンポーネントです。
 *
 * 省略記号（…）をクリックすると入力欄が表示され、ページ番号を入力してそのページへ直接移動できます。
 */
export const Pagination: IComponent<PaginationProps> = function SuiPagination(props) {
  const partsProps = usePagination(props);
  const { slotProps: { ellipsis: ellipsisProps, item: itemProps } = {}, ...rootProps } = props;
  const {
    boundaryCount = 1,
    defaultPage = 1,
    onPageChange,
    page: pageProp,
    siblingCount = 1,
    totalPages,
  } = rootProps;
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

  return (
    <PaginationRoot {...partsProps.root} page={page} onPageChange={handlePageChange}>
      <PaginationPreviousButton {...partsProps.previous} />
      {items.map((item, index) =>
        item.type === "item" ? (
          <PaginationItem
            key={index}
            {...itemProps}
            page={item.page}
            selected={item.page === page}
          />
        ) : (
          <PaginationEllipsis end={item.end} {...ellipsisProps} key={index} start={item.start} />
        ),
      )}
      <PaginationNextButton {...partsProps.next} />
    </PaginationRoot>
  );
};

/**
 * {@link Pagination} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Pagination {
  /**
   * {@link PaginationState} です。
   */
  export type State = PaginationState;

  /**
   * {@link PaginationProps} です。
   */
  export type Props = PaginationProps;

  /**
   * {@link PaginationSlotProps} です。
   */
  export type SlotProps = PaginationSlotProps;

  /**
   * {@link PaginationChangeEventDetails} です。
   */
  export type ChangeEventDetails = PaginationChangeEventDetails;

  /**
   * {@link PaginationChangeEventReason} です。
   */
  export type ChangeEventReason = PaginationChangeEventReason;

  /**
   * {@link PaginationColor} です。
   */
  export type Color = PaginationColor;

  /**
   * {@link PaginationRadius} です。
   */
  export type Radius = PaginationRadius;

  /**
   * {@link PaginationSize} です。
   */
  export type Size = PaginationSize;
}

type PaginationItemsItem =
  | { readonly page: number; readonly type: "item" }
  | { readonly end: number; readonly start: number; readonly type: "ellipsis" };

function getPaginationItems(
  totalPages: number,
  page: number,
  siblingCount: number,
  boundaryCount: number,
): PaginationItemsItem[] {
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
  const items: PaginationItemsItem[] = [];
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
