import type * as React from "react";

/**
 * 関連する項目をまとめるグループオブジェクトです。
 *
 * @template TItem 項目の値の型です。
 */
export interface ItemObjectGroup<TItem = any> {
  [key: string]: unknown;

  /**
   * グループに含まれる項目です。
   */
  items: readonly TItem[];

  /**
   * グループのラベルです。
   */
  label?: React.ReactNode | undefined;
}

/**
 * 値がグループオブジェクトかどうかを判定します。
 *
 * @param x 判定する値です。
 * @returns グループオブジェクトの場合に `true` を返します。
 */
export function isItemObjectGroup<TItem = any>(x: unknown): x is ItemObjectGroup<TItem> {
  return typeof x === "object" && x !== null && "items" in x && Array.isArray(x.items);
}
