import type { Size } from "@suru-ui/theme";
import type * as React from "react";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

import "./image.css";

// Root
// ----

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
 * {@link ImageRoot} が持つ状態です。
 */
export type ImageRootState = {};

export namespace ImageRootProps {
  export type Render = RenderProps<ImageRootState>;

  export type SuruUI = {
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

  export type HTML = Omit<React.ComponentProps<"img">, keyof Render | keyof SuruUI>;
}

/**
 * {@link ImageRoot} に渡す props です。
 */
export type ImageRootProps = ImageRootProps.Render & ImageRootProps.SuruUI & ImageRootProps.HTML;

/**
 * 画像のルートコンポーネントです。
 */
export const ImageRoot: IComponent<ImageRootProps> = function SuiImageRoot(props) {
  const {
    fit,
    radius = "none",
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherImgProps
  } = props;

  return useRender({
    props: [
      otherImgProps,
      {
        className: cn<ImageRootState>(
          "sui_image",
          `sui_image-radius_${radius}`,
          fit && `sui_image-fit_${fit}`,
        ),
        "data-scope": dataScope,
      },
    ],
    defaultTagName: "img",
  });
};

export { ImageRoot as Root };

export namespace Root {
  export type State = ImageRootState;

  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    export type Render = ImageRootProps.Render;

    export type SuruUI = ImageRootProps.SuruUI;

    export type HTML = ImageRootProps.HTML;
  }

  export type Fit = ImageRootFit;

  export type Radius = ImageRootRadius;
}
