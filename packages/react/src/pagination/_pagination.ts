import * as React from "react";

import type {
  PaginationGoToPage,
  PaginationRootChangeEventDetails,
} from "./root/pagination.root.context.js";

/**
 * 総ページ数を 1 以上の整数へ丸めます。
 *
 * @param totalPages 丸める前の総ページ数です。
 *
 * @returns 1 以上の整数です。
 */
function normalizeTotalPages(totalPages: number): number {
  return Math.max(1, Math.trunc(totalPages));
}

/**
 * ページ番号を 1 以上かつ総ページ数以下へ丸めます。
 *
 * @param page 丸める前のページ番号です。
 * @param totalPages 1 以上の整数に丸め済みの総ページ数です。
 *
 * @returns 1 以上かつ総ページ数以下の整数です。
 */
function clampPage(page: number, totalPages: number): number {
  return Math.min(Math.max(Math.trunc(page), 1), totalPages);
}

/**
 * {@link usePaginationState} のオプションです。
 */
export interface IUsePaginationStateOptions {
  /**
   * 初期表示のページです。
   *
   * @default 1
   */
  readonly defaultPage?: number | undefined;

  /**
   * ページネーションを無効にするかどうかです。
   *
   * @default false
   */
  readonly disabled?: boolean | undefined;

  /** ページが変更されたときに呼び出されるコールバックです。 */
  readonly onPageChange?:
    | ((page: number, details: PaginationRootChangeEventDetails) => void)
    | undefined;

  /**
   * 現在のページです。
   *
   * 省略した場合は内部状態で管理します。
   */
  readonly page?: number | undefined;

  /** 総ページ数です。 */
  readonly totalPages: number;
}

/**
 * {@link usePaginationState} が返す状態です。
 */
export interface IUsePaginationState {
  /** 現在のページです。 */
  readonly page: number;

  /** 指定したページへ移動する関数です。 */
  readonly goToPage: PaginationGoToPage;

  /** 1 以上の整数に丸め済みの総ページ数です。 */
  readonly totalPages: number;
}

/**
 * 制御・非制御の現在ページとページ移動関数を提供します。
 *
 * 総ページ数の丸めとページ番号の範囲制限を一箇所に集約し、ページネーションのルートと合成コンポーネントで共有します。
 */
export function usePaginationState(options: IUsePaginationStateOptions): IUsePaginationState {
  const { page: pageProp, disabled = false, totalPages, defaultPage = 1, onPageChange } = options;
  const maxPage = normalizeTotalPages(totalPages);
  const [innerPage, setInnerPage] = React.useState(() => clampPage(defaultPage, maxPage));
  const page = clampPage(pageProp ?? innerPage, maxPage);
  const goToPage = React.useCallback<PaginationGoToPage>(
    (nextPage, details) => {
      if (disabled || totalPages < 1) {
        return;
      }

      const target = clampPage(nextPage, maxPage);

      if (target === page) {
        return;
      }

      if (pageProp === undefined) {
        setInnerPage(target);
      }

      onPageChange?.(target, details);
    },
    [disabled, maxPage, onPageChange, page, pageProp, totalPages],
  );

  return {
    page,
    goToPage,
    totalPages: maxPage,
  };
}
