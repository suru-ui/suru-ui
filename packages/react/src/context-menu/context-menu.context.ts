import type { Size } from "@suru-ui/theme";
import * as React from "react";

import * as Button from "../button/button.parts.js";
import { ContextMissingError } from "../errors.js";
import type { IUseContext } from "../types.js";

/**
 * ポップアップと項目の角丸です。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
type ContextMenuContextRadius = "none" | Size;

/**
 * ポップアップと項目の大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
type ContextMenuContextSize = Size;

/**
 * 項目の主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
type ContextMenuContextVariant = Button.Root.Variant;

/**
 * {@link ContextMenuRoot} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type ContextMenuContext<TItem = any> = {
  /**
   * コンテキストメニューの項目です。
   */
  readonly items: readonly TItem[];

  /**
   * ポップアップに枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * ポップアップと項目の角丸です。
   */
  readonly radius: ContextMenuContextRadius;

  /**
   * ポップアップと項目の大きさです。
   */
  readonly size: ContextMenuContextSize;

  /**
   * 項目の主な外観です。
   */
  readonly variant: ContextMenuContextVariant;
};

/**
 * コンテキストメニューのスタイルを子要素へ伝播するコンテキストです。
 */
export const ContextMenuContext: React.Context<ContextMenuContext | null> =
  React.createContext<ContextMenuContext | null>(null);

function useSuiContextMenuContext(optional?: false): ContextMenuContext;
function useSuiContextMenuContext(optional?: boolean): ContextMenuContext | null;
function useSuiContextMenuContext(optional?: boolean): ContextMenuContext | null {
  const ctx = React.use(ContextMenuContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "ContextMenuContext",
      providerName: "ContextMenuRoot",
    });
  }

  return ctx;
}

/**
 * {@link ContextMenuContext} を読み取るフックです。
 */
export const useContextMenuContext: IUseContext<ContextMenuContext> = useSuiContextMenuContext;

export { ContextMenuContext as Context, useContextMenuContext as useContext };

export namespace Context {
  export type Radius = ContextMenuContextRadius;

  export type Size = ContextMenuContextSize;

  export type Variant = ContextMenuContextVariant;
}
