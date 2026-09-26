import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import { ContextMissingError } from "../errors.js";
import type { IUseContext } from "../types.js";

/**
 * {@link PaginationRoot} のページが変更された理由です。
 *
 * - `"item"`: ページ番号ボタンの押下
 * - `"ellipsis"`: 省略記号からのページ指定
 * - `"previous"`: 前へボタンの押下
 * - `"next"`: 次へボタンの押下
 */
export type PaginationRootChangeEventReason = "ellipsis" | "item" | "next" | "previous";

/**
 * {@link PaginationRoot} のページが変更されたイベントの詳細です。
 */
export type PaginationRootChangeEventDetails = {
  /**
   * きっかけとなったイベントです。
   */
  readonly event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;

  /**
   * ページが変更された理由です。
   */
  readonly reason: PaginationRootChangeEventReason;
};

/**
 * 指定したページへ移動する関数です。
 *
 * @param page 移動先のページ番号です。
 * @param details ページが変更されたイベントの詳細です。
 */
export type PaginationGoToPage = (page: number, details: PaginationRootChangeEventDetails) => void;

/**
 * ページネーションの配色です。
 */
export type PaginationContextColor = Color;

/**
 * ページネーションの角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type PaginationContextRadius = "none" | Size | "full";

/**
 * ページネーションの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type PaginationContextSize = Size;

/**
 * {@link PaginationRoot} が子パーツへ提供するコンテキストです。
 */
export type PaginationContext = {
  /**
   * ページネーションの配色です。
   */
  readonly color: PaginationContextColor;

  /**
   * ページネーションが無効かどうかです。
   */
  readonly disabled: boolean;

  /**
   * 指定したページへ移動する関数です。
   */
  readonly goToPage: PaginationGoToPage;

  /**
   * 現在のページです。
   */
  readonly page: number;

  /**
   * ページネーションの角丸です。
   */
  readonly radius: PaginationContextRadius;

  /**
   * ページネーションの大きさです。
   */
  readonly size: PaginationContextSize;

  /**
   * 1 以上の整数に丸め済みの総ページ数です。
   */
  readonly totalPages: number;
};

/**
 * {@link PaginationRoot} が子パーツへ提供するコンテキストです。
 */
export const PaginationContext: React.Context<PaginationContext | null> =
  React.createContext<PaginationContext | null>(null);

export type IUsePaginationContext = IUseContext<PaginationContext>;

/**
 * {@link PaginationContext} を読み取るフックです。
 */
export const usePaginationContext: IUsePaginationContext = function useSuiPaginationContext(
  optional?: boolean,
): any {
  const ctx = React.use(PaginationContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "PaginationContext",
      providerName: "PaginationRoot",
    });
  }

  return ctx;
};

export { PaginationContext as Context, usePaginationContext as useContext };

export namespace Context {
  export type Color = PaginationContextColor;

  export type Radius = PaginationContextRadius;

  export type Size = PaginationContextSize;
}
