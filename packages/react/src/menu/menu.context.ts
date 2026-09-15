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
type MenuContextRadius = "none" | Size;

/**
 * ポップアップと項目の大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
type MenuContextSize = Size;

/**
 * 項目の主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
type MenuContextVariant = Button.Root.Variant;

/**
 * {@link MenuRoot} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type MenuContext<TItem = any> = {
  /**
   * メニューの項目です。
   */
  readonly items: readonly TItem[];

  /**
   * ポップアップに枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * ポップアップと項目の角丸です。
   */
  readonly radius: MenuContextRadius;

  /**
   * ポップアップと項目の大きさです。
   */
  readonly size: MenuContextSize;

  /**
   * 項目の主な外観です。
   */
  readonly variant: MenuContextVariant;
};

/**
 * メニューのスタイルを子要素へ伝播するコンテキストです。
 */
export const MenuContext: React.Context<MenuContext | null> =
  React.createContext<MenuContext | null>(null);

function useSuiMenuContext(optional?: false): MenuContext;
function useSuiMenuContext(optional?: boolean): MenuContext | null;
function useSuiMenuContext(optional?: boolean): MenuContext | null {
  const ctx = React.use(MenuContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "MenuContext",
      providerName: "MenuRoot",
    });
  }

  return ctx;
}

/**
 * {@link MenuContext} を読み取るフックです。
 */
export const useMenuContext: IUseContext<MenuContext> = useSuiMenuContext;

export { MenuContext as Context, useMenuContext as useContext };

export namespace Context {
  export type Radius = MenuContextRadius;

  export type Size = MenuContextSize;

  export type Variant = MenuContextVariant;
}
