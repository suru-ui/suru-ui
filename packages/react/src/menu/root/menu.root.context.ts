import type { Size } from "@suru-ui/theme";
import * as React from "react";

import * as Button from "../../button/button.parts.js";
import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";

/**
 * ポップアップと項目の角丸です。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type MenuContextRadius = "none" | Size;

/**
 * ポップアップと項目の大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type MenuContextSize = Size;

/**
 * 項目の主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type MenuContextVariant = Button.Root.Variant;

/**
 * {@link MenuRoot} が子パーツへ提供する状態です。
 *
 * @template TItem 項目の型です。
 */
export type MenuContext<TItem = any> = {
  /**
   * メニューの現在の深さです。
   */
  readonly depth: number;

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

export interface IUseMenuContext extends IUseContext<MenuContext> {
  /**
   * @template TItem 項目の型です。
   * @param optional `true` の場合、コンテキストが見つからなくてもエラーを投げません。
   * @returns コンテキストです。`optional` が `true` でコンテキストがない場合は `null` です。
   */
  <TItem = any>(optional?: false): MenuContext<TItem>;
  <TItem = any>(optional?: boolean): MenuContext<TItem> | null;
}

/**
 * {@link MenuContext} を読み取るフックです。
 */
export const useMenuContext: IUseMenuContext = function useSuiMenuContext(optional?: boolean): any {
  const ctx = React.use(MenuContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "MenuContext",
      providerName: "MenuRoot",
    });
  }

  return ctx;
};

export { MenuContext as Context, useMenuContext as useContext };

export namespace Context {
  export type Radius = MenuContextRadius;

  export type Size = MenuContextSize;

  export type Variant = MenuContextVariant;
}
