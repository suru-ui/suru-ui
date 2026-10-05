import type { Size } from "@suru-ui/theme";
import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { IUseContext } from "../../types.js";

/**
 * 画像の表示方法 (`object-fit`) です。
 *
 * - `"cover"`: 余白を残さずコンテナーに収める (はみ出した部分は切り取る)
 * - `"contain"`: 画像全体をコンテナーに収める (余白が生まれることがある)
 * - `"fill"`: コンテナーに合わせて引き伸ばす
 * - `"none"`: 元の大きさのまま表示する
 * - `"scale-down"`: `none` と `contain` の小さいほうで表示する
 */
export type ImageContextFit = "cover" | "contain" | "fill" | "none" | "scale-down";

/**
 * 画像の角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type ImageContextRadius = "none" | Size | "full";

/**
 * {@link ImageRoot} が提供する状態です。
 */
export type ImageContext = {
  /**
   * 画像の表示方法 (`object-fit`) です。
   */
  readonly fit: ImageContextFit | undefined;

  /**
   * 画像の角丸です。
   */
  readonly radius: ImageContextRadius;
};

/**
 * 画像の見た目を子孫へ伝播するコンテキストです。
 */
export const ImageContext: React.Context<ImageContext | null> =
  React.createContext<ImageContext | null>(null);

export type IUseImageContext = IUseContext<ImageContext>;

/**
 * {@link ImageContext} を読み取るフックです。
 */
export const useImageContext: IUseImageContext = function useSuiImageContext(
  optional?: boolean,
): any {
  const ctx = React.use(ImageContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "ImageContext",
      providerName: "ImageRoot",
    });
  }

  return ctx;
};

export { ImageContext as Context, useImageContext as useContext };

export namespace Context {
  export type Fit = ImageContextFit;

  export type Radius = ImageContextRadius;
}
