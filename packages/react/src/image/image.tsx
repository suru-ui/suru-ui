import type { IComponent } from "../types.js";
import {
  type ImageRootFit,
  type ImageRootProps,
  type ImageRootState,
  type ImageRootRadius,
  ImageRoot,
} from "./image.parts.jsx";

// Types
// -----

/**
 * {@link ImageRootFit}
 */
export type ImageFit = ImageRootFit;

/**
 * {@link ImageRootRadius}
 */
export type ImageRadius = ImageRootRadius;

/**
 * {@link Image} が持つ状態です。
 */
export type ImageState = ImageRootState;

/**
 * {@link Image} に渡す props です。
 */
export type ImageProps = ImageRootProps;

// API
// ---

/**
 * {@link Image} を構成する各パーツの props を作成するための API です。
 */
export interface ImageAPI {
  /**
   * {@link ImageRoot} に渡す props を取得します。
   */
  getRootProps(): ImageRootProps;
}

interface IUseImageAPI {
  /**
   * {@link ImageAPI} を作成します。
   *
   * @param props {@link Image} の props です。
   * @returns 画像の API です
   */
  (props: ImageProps): ImageAPI;
}

/**
 * {@link ImageAPI} を作成するフックです。
 */
export const useImageAPI: IUseImageAPI = function useSuiImageAPI(props) {
  return {
    getRootProps() {
      return props;
    },
  };
};

export { type ImageAPI as API, useImageAPI as useAPI };

// Component
// ---------

/**
 * 画像を表示するコンポーネントです。
 *
 * 大きさは `width` と `height` プロパティーや CSS で指定します。`fit` プロパティーでコンテナーへのはめ込み方法を、`radius` プロパティーで角丸を指定できます。
 */
export const Image: IComponent<ImageProps> = function SuiImage(props) {
  const api = useImageAPI(props);

  return <ImageRoot {...api.getRootProps()} />;
};

export namespace Image {
  /**
   * {@link ImageState}
   */
  export type State = ImageState;

  /**
   * {@link ImageProps}
   */
  export type Props = ImageProps;

  /**
   * {@link ImageFit}
   */
  export type Fit = ImageFit;

  /**
   * {@link ImageRadius}
   */
  export type Radius = ImageRadius;
}
