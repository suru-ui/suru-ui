import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import * as React from "react";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import {
  type ImageContextFit,
  type ImageContextRadius,
  ImageContext,
} from "./image.root.context.js";

/**
 * 画像の表示方法 (`object-fit`) です。
 *
 * - `"cover"`: 余白を残さずコンテナーに収める (はみ出した部分は切り取る)
 * - `"contain"`: 画像全体をコンテナーに収める (余白が生まれることがある)
 * - `"fill"`: コンテナーに合わせて引き伸ばす
 * - `"none"`: 元の大きさのまま表示する
 * - `"scale-down"`: `none` と `contain` の小さいほうで表示する
 */
export type ImageRootFit = ImageContextFit;

/**
 * 画像の角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type ImageRootRadius = ImageContextRadius;

/**
 * {@link ImageRoot} が持つ状態です。
 */
export type ImageRootState = ImageContext;

export namespace ImageRootProps {
  export type Render = RenderProps<ImageRootState>;

  export type SuruUI = {
    /**
     * 画像の表示方法 (`object-fit`) を指定します。
     *
     * 指定しない場合、`object-fit` は指定されません。
     */
    fit?: ImageRootFit | undefined;

    /**
     * 画像の角丸を指定します。
     *
     * @default "none"
     */
    radius?: ImageRootRadius | undefined;
  };

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"img", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ImageRoot} に渡す props です。
 */
export type ImageRootProps = ImageRootProps.Render &
  ImageRootProps.SuruUI &
  ImageRootProps.BaseUI &
  ImageRootProps.HTML;

export type IImageRoot = IComponent<ImageRootProps>;

/**
 * 画像のルートコンポーネントです。
 *
 * 既定では `object-fit` を指定せず、画像は元の比率のまま表示されます。`fit` でコンテナーへのはめ込み方法を、`radius` で角丸を指定できます。
 */
export const ImageRoot: IImageRoot = (props) => {
  const {
    fit,
    radius = "none",
    // @ts-expect-error data-scope は Base UI のコンポーネント型に含まれないため。
    "data-scope": dataScope = "",
    ...otherImgProps
  } = props;
  const ctx = React.useMemo<ImageContext>(
    () => ({
      fit,
      radius,
    }),
    [fit, radius],
  );
  const element = useRender({
    props: [
      otherImgProps,
      {
        className: cn<ImageRootState>(
          "sui_image",
          (state) => `sui_image-radius_${state.radius}`,
          (state) => state.fit && `sui_image-fit_${state.fit}`,
        ),
        "data-scope": dataScope,
      },
    ],
    state: ctx,
    defaultTagName: "img",
  });

  return <ImageContext value={ctx}>{element}</ImageContext>;
};

export { ImageRoot as Root };
export namespace Root {
  export type State = ImageRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ImageRootProps.Render;

    export type SuruUI = ImageRootProps.SuruUI;

    export type BaseUI = ImageRootProps.BaseUI;

    export type HTML = ImageRootProps.HTML;
  }

  export type Fit = ImageRootFit;

  export type Radius = ImageRootRadius;
}
