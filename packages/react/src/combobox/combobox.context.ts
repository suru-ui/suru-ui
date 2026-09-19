import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import { ContextMissingError } from "../errors.js";
import type { IUseContext } from "../types.js";

/**
 * フォーカス時に枠線へ適用する配色です。
 */
export type ComboboxContextColor = Color;

/**
 * 入力を含むグループ要素の角丸です。
 */
export type ComboboxContextRadius = "none" | Size | "full";

/**
 * 入力欄とリスト項目のサイズです。
 */
export type ComboboxContextSize = Size;

/**
 * 項目を表示ラベルへ変換する関数です。
 *
 * @template TItem 項目の型です。
 */
export interface IComboboxContextItemToStringLabel<TItem = any> {
  (item: TItem): string;
}

/**
 * 入力欄の主な外観です。
 */
export type ComboboxContextVariant = "naked" | "liquid";

/**
 * {@link ComboboxRoot} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type ComboboxContext<TItem = any> = {
  /**
   * フォーカス時に枠線へ適用する配色です。
   */
  readonly color: ComboboxContextColor;

  /**
   * リストに表示する項目の一覧です。
   */
  readonly items: readonly TItem[] | undefined;

  /**
   * 項目を表示ラベルへ変換する関数です。
   */
  readonly itemToStringLabel: IComboboxContextItemToStringLabel<TItem>;

  /**
   * 複数選択かどうかです。
   */
  readonly multiple: boolean;

  /**
   * 枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * 入力を含むグループ要素の角丸です。
   */
  readonly radius: ComboboxContextRadius;

  /**
   * 入力欄とリスト項目のサイズです。
   */
  readonly size: ComboboxContextSize;

  /**
   * 入力欄の主な外観です。
   */
  readonly variant: ComboboxContextVariant;
};

/**
 * コンボボックスのスタイルを子要素へ伝播するコンテキストです。
 */
export const ComboboxContext: React.Context<ComboboxContext | null> =
  React.createContext<ComboboxContext | null>(null);

function useSuiComboboxContext(optional?: false): ComboboxContext;
function useSuiComboboxContext(optional?: boolean): ComboboxContext | null;
function useSuiComboboxContext(optional?: boolean): ComboboxContext | null {
  const ctx = React.use(ComboboxContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "ComboboxContext",
      providerName: "ComboboxRoot",
    });
  }

  return ctx;
}

/**
 * {@link ComboboxContext} を読み取るフックです。
 */
export const useComboboxContext: IUseContext<ComboboxContext> = useSuiComboboxContext;

export { ComboboxContext as Context, useComboboxContext as useContext };

export namespace Context {
  export type Color = ComboboxContextColor;

  export interface IItemToStringLabel<
    TItem = any,
  > extends IComboboxContextItemToStringLabel<TItem> {}

  export type Radius = ComboboxContextRadius;

  export type Size = ComboboxContextSize;

  export type Variant = ComboboxContextVariant;
}
