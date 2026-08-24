import type { IComponent } from "../../types.js";
import {
  type ImageRootFit,
  type ImageRootProps,
  type ImageRootState,
  type ImageRootRadius,
  ImageRoot,
} from "./image.parts.jsx";

/**
 * {@link ImageRootFit} です。
 */
export type ImageFit = ImageRootFit;

/**
 * {@link ImageRootRadius} です。
 */
export type ImageRadius = ImageRootRadius;

/**
 * {@link Image} の各パーツに渡すプロパティーです。
 */
export type ImagePartsProps = {
  /**
   * {@link ImageRoot} に渡すプロパティーです。
   */
  readonly root: ImageRootProps;
};

/**
 * {@link Image} の状態です。
 */
export type ImageState = ImageRootState;

/**
 * {@link Image} コンポーネントのプロパティーです。
 */
export type ImageProps = ImageRootProps;

/**
 * {@link Image} の各パーツに渡すプロパティーを作るフックです。
 */
export function useImage(props: ImageProps): ImagePartsProps {
  return {
    root: props,
  };
}

/**
 * 画像を表示するコンポーネントです。
 *
 * 大きさは `width` と `height` プロパティーや CSS で指定します。`fit` プロパティーでコンテナーへのはめ込み方法を、`radius` プロパティーで角丸を指定できます。
 */
export const Image: IComponent<ImageProps> = function SuiImage(props) {
  const partsProps = useImage(props);

  return <ImageRoot {...partsProps.root} />;
};

/**
 * {@link Image} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Image {
  /**
   * {@link ImageState} です。
   */
  export type State = ImageState;

  /**
   * {@link ImageProps} です。
   */
  export type Props = ImageProps;

  /**
   * {@link ImageFit} です。
   */
  export type Fit = ImageFit;

  /**
   * {@link ImageRadius} です。
   */
  export type Radius = ImageRadius;
}
