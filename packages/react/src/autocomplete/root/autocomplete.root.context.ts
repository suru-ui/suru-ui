import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";

/**
 * フォーカス時に枠線へ適用する配色です。
 */
export type AutocompleteContextColor = Color;

/**
 * 入力を含むグループ要素の角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 * - `"full"`: 丸形
 * - `"circle"`: 完全な丸形
 */
export type AutocompleteContextRadius = "none" | Size | "full" | "circle";

/**
 * 入力欄とリスト項目の大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type AutocompleteContextSize = Size;

/**
 * 入力欄の主な外観です。
 *
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type AutocompleteContextVariant = "naked" | "liquid";

/**
 * {@link AutocompleteRoot} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type AutocompleteContext<TItem = any> = {
  /**
   * フォーカス時に枠線へ適用する配色です。
   */
  readonly color: AutocompleteContextColor;

  /**
   * リストに表示する項目の一覧です。
   */
  readonly items: readonly TItem[] | undefined;

  /**
   * 枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * 入力を含むグループ要素の角丸の大きさです。
   */
  readonly radius: AutocompleteContextRadius;

  /**
   * 入力欄とリスト項目の大きさです。
   */
  readonly size: AutocompleteContextSize;

  /**
   * 入力欄の主な外観です。
   */
  readonly variant: AutocompleteContextVariant;
};

/**
 * オートコンプリートの情報を子要素へ伝播するコンテキストです。
 */
export const AutocompleteContext: React.Context<AutocompleteContext | null> =
  React.createContext<AutocompleteContext | null>(null);

export interface IUseAutocompleteContext extends IUseContext<AutocompleteContext> {
  /**
   * @template TItem 項目の型です。
   * @param optional `true` の場合、コンテキストが見つからなくてもエラーを投げません。
   * @returns コンテキストです。`optional` が `true` でコンテキストがない場合は `null` です。
   */
  <TItem = any>(optional?: false): AutocompleteContext<TItem>;
  <TItem = any>(optional?: boolean): AutocompleteContext<TItem> | null;
}

/**
 * {@link AutocompleteContext} を読み取るフックです。
 */
export const useAutocompleteContext: IUseAutocompleteContext = function useSuiAutocompleteContext(
  optional?: boolean,
): any {
  const ctx = React.use(AutocompleteContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "AutocompleteContext",
      providerName: "AutocompleteRoot",
    });
  }

  return ctx;
};

export { AutocompleteContext as Context, useAutocompleteContext as useContext };

export namespace Context {
  export type Color = AutocompleteContextColor;

  export type Radius = AutocompleteContextRadius;

  export type Size = AutocompleteContextSize;

  export type Variant = AutocompleteContextVariant;
}
