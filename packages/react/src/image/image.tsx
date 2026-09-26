import type { IComponent } from "../types.js";
import {
  type ImageRootFit,
  type ImageRootProps,
  type ImageRootState,
  type ImageRootRadius,
  ImageRoot,
} from "./image.parts.js";

// Types
// -----

export type ImageFit = ImageRootFit;

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
export class ImageAPI {
  private readonly rootProps: ImageRootProps;

  /**
   * @param props {@link Image} の props です。
   * @internal
   */
  public constructor(props: ImageProps) {
    this.rootProps = props;
  }

  /**
   * {@link ImageRoot} に渡す props を取得します。
   */
  public getRootProps(): ImageRootProps {
    return this.rootProps;
  }
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
  return new ImageAPI(props);
};

export { ImageAPI as API, useImageAPI as useAPI };

// Component
// ---------

/**
 * 画像を表示するコンポーネントです。
 *
 * 大きさは `width` と `height` または CSS で指定します。`fit` でコンテナーへのはめ込み方法を、`radius` で角丸を指定できます。
 */
export const Image: IComponent<ImageProps> = function SuiImage(props) {
  const api = useImageAPI(props);

  return <ImageRoot {...api.getRootProps()} />;
};

export namespace Image {
  export type State = ImageState;

  export type Props = ImageProps;

  export type Fit = ImageFit;

  export type Radius = ImageRadius;
}
