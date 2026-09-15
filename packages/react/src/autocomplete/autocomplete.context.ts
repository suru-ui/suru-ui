import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import { ContextMissingError } from "../errors.js";
import type { IUseContext } from "../types.js";

/**
 * フォーカス時に枠線へ適用する配色です。
 */
type AutocompleteContextColor = Color;

/**
 * 入力を含むグループ要素の角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
type AutocompleteContextRadius = "none" | Size | "full";

/**
 * 入力欄とリスト項目のサイズです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
type AutocompleteContextSize = Size;

/**
 * 入力欄の主な外観です。
 *
 * - `"naked"`: 背景のない入力欄
 * - `"liquid"`: 薄い塗りつぶし
 */
type AutocompleteContextVariant = "naked" | "liquid";

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
 * オートコンプリートのスタイルを子要素へ伝播するコンテキストです。
 */
export const AutocompleteContext: React.Context<AutocompleteContext | null> =
  React.createContext<AutocompleteContext | null>(null);

function useSuiAutocompleteContext(optional?: false): AutocompleteContext;
function useSuiAutocompleteContext(optional?: boolean): AutocompleteContext | null;
function useSuiAutocompleteContext(optional?: boolean): AutocompleteContext | null {
  const ctx = React.use(AutocompleteContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "AutocompleteContext",
      providerName: "AutocompleteRoot",
    });
  }

  return ctx;
}

/**
 * {@link AutocompleteContext} を読み取るフックです。
 */
export const useAutocompleteContext: IUseContext<AutocompleteContext> = useSuiAutocompleteContext;

export { AutocompleteContext as Context, useAutocompleteContext as useContext };

export namespace Context {
  export type Color = AutocompleteContextColor;

  export type Radius = AutocompleteContextRadius;

  export type Size = AutocompleteContextSize;

  export type Variant = AutocompleteContextVariant;
}
