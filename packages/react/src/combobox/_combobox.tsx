import type * as React from "react";

/**
 * 関連する項目をまとめるグループオブジェクトです。
 *
 * @template TValue 項目の値の型です。
 */
export interface ItemGroup<TValue = unknown> {
  [key: string]: unknown;

  /**
   * グループに含まれる項目です。
   */
  items: readonly TValue[];

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
export function isItemGroup<TValue = unknown>(x: unknown): x is ItemGroup<TValue> {
  return typeof x === "object" && x !== null && "items" in x && Array.isArray(x.items);
}
