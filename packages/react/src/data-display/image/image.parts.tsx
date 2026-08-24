import type { Size } from "@suru-ui/theme";
import type * as React from "react";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

import "./image.css";

// Root
// ----

/**
 * 画像の角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type ImageRootRadius = "none" | Size | "full";

/**
 * 画像の表示方法 (`object-fit`) です。
 *
 * - `"cover"`: 余白を残さずコンテナーに収める (はみ出した部分は切り取る)
 * - `"contain"`: 画像全体をコンテナーに収める (余白が生まれることがある)
 * - `"fill"`: コンテナーに合わせて引き伸ばす
 * - `"none"`: 元の大きさのまま表示する
 * - `"scale-down"`: `none` と `contain` の小さいほうで表示する
 */
export type ImageRootFit = "cover" | "contain" | "fill" | "none" | "scale-down";

/**
 * {@link ImageRoot} の状態です。
 */
export type ImageRootState = {};

/**
 * {@link ImageRoot} に渡すプロパティーです。
 */
export type ImageRootProps = Omit<React.ComponentProps<"img">, keyof RenderProps> &
  RenderProps<ImageRootState> & {
    /**
     * 画像の表示方法 (`object-fit`) を指定します。
     *
     * 指定しない場合、画像は元の比率のまま表示されます。
     */
    fit?: ImageRootFit | undefined;

    /**
     * 画像の角丸を指定します。
     *
     * @default "none"
     */
    radius?: ImageRootRadius | undefined;
  };

/**
 * 画像のルートコンポーネントです。
 */
export const ImageRoot: IComponent<ImageRootProps> = function SuiImageRoot(props) {
  const { fit, radius = "none", ...otherProps } = props;

  return useRender({
    defaultTagName: "img",
    props: [
      otherProps,
      {
        className: cn("sui_image", `sui_image-radius_${radius}`, fit && `sui_image-fit_${fit}`),
      },
    ],
  });
};

/**
 * {@link ImageRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link ImageRootState} です。
   */
  export type State = ImageRootState;

  /**
   * {@link ImageRootProps} です。
   */
  export type Props = ImageRootProps;

  /**
   * {@link ImageRootFit} です。
   */
  export type Fit = ImageRootFit;

  /**
   * {@link ImageRootRadius} です。
   */
  export type Radius = ImageRootRadius;
}

/**
 * {@link ImageRoot} です。
 */
export const Root: IComponent<Root.Props> = ImageRoot;
