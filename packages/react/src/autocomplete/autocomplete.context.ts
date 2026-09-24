import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import { ContextMissingError } from "../errors.js";
import type { IUseContext } from "../types.js";

/**
 * フォーカス時に枠線へ適用する配色です。
 */
export type AutocompleteContextColor = Color;

/**
 * 入力を含むグループ要素の角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type AutocompleteContextRadius = "none" | Size | "full";

/**
 * 入力欄とリスト項目のサイズです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type AutocompleteContextSize = Size;

/**
 * 入力欄の主な外観です。
 *
 * - `"naked"`: 背景のない入力欄
 * - `"liquid"`: 薄い塗りつぶし
 */
export type AutocompleteContextVariant = "naked" | "liquid";

/**
 * {@link AutocompleteRoot} が子パーツへ提供する状態です。
 */
export type AutocompleteContext = {
  /**
   * フォーカス時に枠線へ適用する配色です。
   */
  readonly color: AutocompleteContextColor;

  /**
   * 枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * 入力を含むグループ要素の角丸です。
   */
  readonly radius: AutocompleteContextRadius;

  /**
   * 入力欄とリスト項目のサイズです。
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
  (optional?: false): AutocompleteContext;
  (optional?: boolean): AutocompleteContext | null;
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
