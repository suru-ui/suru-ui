import type { Size, Color, ColorTemplate } from "@suru-ui/theme";
import * as React from "react";

import { ContextMissingError } from "../errors.js";
import type { IUseContext } from "../types.js";

/**
 * グループアイテムの配色です。
 */
export type ActionGroupContextColor = Color;

/**
 * グループアイテムの向きです。
 *
 * - `"horizontal"`: 横並び
 * - `"vertical"`: 縦並び
 */
export type ActionGroupContextOrientation = "horizontal" | "vertical";

/**
 * グループアイテムの角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type ActionGroupContextRadius = "none" | Size | "full";

/**
 * グループアイテムのサイズです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type ActionGroupContextSize = Size;

/**
 * グループアイテムの主な外観です。
 *
 * - `"solid"`: 塗りつぶしスタイル
 * - `"naked"`: 背景のないテキストのみ
 * - `"liquid"`: 薄い塗りつぶし
 */
export type ActionGroupContextVariant = ColorTemplate;

/**
 * {@link ActionGroupRoot} が子パーツへ提供するコンテキストです。
 */
export type ActionGroupContext = {
  /**
   * グループアイテムの配色です。
   */
  readonly color: ActionGroupContextColor;

  /**
   * グループアイテムの向きです。
   */
  readonly orientation: ActionGroupContextOrientation;

  /**
   * グループアイテムの枠線を表示するかどうかです。
   */
  readonly outlined: boolean;

  /**
   * グループアイテムの角丸です。
   */
  readonly radius: ActionGroupContextRadius;

  /**
   * グループアイテムのサイズです。
   */
  readonly size: ActionGroupContextSize;

  /**
   * グループアイテムの主な外観です。
   */
  readonly variant: ActionGroupContextVariant;
};

/**
 * {@link ActionGroupRoot} のスタイルを子要素へ伝播するコンテキストです。
 */
export const ActionGroupContext: React.Context<ActionGroupContext | null> =
  React.createContext<ActionGroupContext | null>(null);

function useSuiActionGroupContext(optional?: false): ActionGroupContext;
function useSuiActionGroupContext(optional?: boolean): ActionGroupContext | null;
function useSuiActionGroupContext(optional?: boolean): ActionGroupContext | null {
  const ctx = React.use(ActionGroupContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "ActionGroupContext",
      providerName: "ActionGroupRoot",
    });
  }

  return ctx;
}

/**
 * {@link ActionGroupContext} を読み取るフックです。
 */
export const useActionGroupContext: IUseContext<ActionGroupContext> = useSuiActionGroupContext;

export { ActionGroupContext as Context, useActionGroupContext as useContext };

export namespace Context {
  export type Color = ActionGroupContextColor;

  export type Orientation = ActionGroupContextOrientation;

  export type Radius = ActionGroupContextRadius;

  export type Size = ActionGroupContextSize;

  export type Variant = ActionGroupContextVariant;
}
