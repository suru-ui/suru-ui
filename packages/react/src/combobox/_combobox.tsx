import type * as React from "react";

/**
 * 関連する項目をまとめるグループオブジェクトです。
 *
 * @template TValue 項目の値の型です。
 */
export interface ItemGroup<TValue = unknown> {
  readonly [key: string]: unknown;

  /**
   * グループに含まれる項目の一覧です。
   */
  readonly items: readonly TValue[];

  /**
   * グループの見出しに表示するラベルです。
   */
  readonly label?: React.ReactNode | undefined;
}

/**
 * グループオブジェクトかどうかを判定します。
 *
 * @template TValue 項目の値の型です。
 * @param x 判定する値です。
 * @returns グループオブジェクトの場合は true です。
 */
export function isItemGroup<TValue = unknown>(x: unknown): x is ItemGroup<TValue> {
  return typeof x === "object" && x !== null && "items" in x && Array.isArray(x.items);
}
