import type { Size } from "@suru-ui/theme";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";
import type { SelectRootItems } from "./select.root.jsx";

/**
 * 選択欄とポップアップの角丸です。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 丸形
 */
export type SelectContextRadius = "none" | Size | "full";

/**
 * 選択欄とリスト項目のサイズです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type SelectContextSize = Size;

/**
 * 選択欄の主な外観です。
 *
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type SelectContextVariant = "naked" | "liquid";

/**
 * {@link SelectRoot} が子パーツへ提供する状態です。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectContext<TValue = any> = {
  /**
   * リストに表示する項目の一覧です。
   */
  readonly items: SelectRootItems<TValue> | undefined;

  /**
   * 枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * 選択欄とポップアップの角丸です。
   */
  readonly radius: SelectContextRadius;

  /**
   * 選択欄とリスト項目のサイズです。
   */
  readonly size: SelectContextSize;

  /**
   * 選択欄の主な外観です。
   */
  readonly variant: SelectContextVariant;
};

/**
 * Select のスタイルと項目を子パーツへ伝播するコンテキストです。
 */
export const SelectContext: React.Context<SelectContext | null> =
  React.createContext<SelectContext | null>(null);

export interface IUseSelectContext extends IUseContext<SelectContext> {
  /**
   * @template TValue 項目の値の型です。
   * @param optional `true` の場合、コンテキストが見つからなくてもエラーを投げません。
   * @returns コンテキストです。`optional` が `true` でコンテキストがない場合は `null` です。
   */
  <TValue = any>(optional?: false): SelectContext<TValue>;
  <TValue = any>(optional?: boolean): SelectContext<TValue> | null;
}

/**
 * {@link SelectContext} を読み取るフックです。
 */
export const useSelectContext: IUseSelectContext = function useSuiSelectContext(
  optional?: boolean,
): any {
  const ctx = React.use(SelectContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "SelectContext",
      providerName: "SelectRoot",
    });
  }

  return ctx;
};

export { SelectContext as Context, useSelectContext as useContext };

export namespace Context {
  export type Radius = SelectContextRadius;

  export type Size = SelectContextSize;

  export type Variant = SelectContextVariant;
}
