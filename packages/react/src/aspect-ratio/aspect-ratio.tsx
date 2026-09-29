import type { IComponent } from "../types.js";
import {
  type AspectRatioRootProps,
  type AspectRatioRootRatio,
  type AspectRatioRootState,
  type AspectRatioRootRadius,
  AspectRatioRoot,
} from "./aspect-ratio.parts.js";

// Types
// -----

export type AspectRatioRadius = AspectRatioRootRadius;

export type AspectRatioRatio = AspectRatioRootRatio;

/**
 * {@link AspectRatio} が持つ状態です。
 */
export type AspectRatioState = AspectRatioRootState;

/**
 * {@link AspectRatio} に渡す props です。
 */
export type AspectRatioProps = AspectRatioRootProps;

export type IAspectRatio = IComponent<AspectRatioProps>;

// API
// ---

/**
 * {@link AspectRatio} を構成する各パーツの props を作成するための API です。
 */
export class AspectRatioAPI {
  private readonly rootProps: AspectRatioRootProps;

  /**
   * @param props {@link AspectRatio} の props です。
   * @internal
   */
  public constructor(props: AspectRatioProps) {
    this.rootProps = props;
  }

  /**
   * {@link AspectRatioRoot} に渡す props を取得します。
   */
  public getRootProps(): AspectRatioRootProps {
    return this.rootProps;
  }
}

interface IUseAspectRatioAPI {
  /**
   * {@link AspectRatioAPI} を作成します。
   *
   * @param props {@link AspectRatio} の props です。
   * @returns アスペクト比の API です
   */
  (props: AspectRatioProps): AspectRatioAPI;
}

/**
 * {@link AspectRatioAPI} を作成するフックです。
 */
export const useAspectRatioAPI: IUseAspectRatioAPI = function useSuiAspectRatioAPI(props) {
  return new AspectRatioAPI(props);
};

export { AspectRatioAPI as API, useAspectRatioAPI as useAPI };

// Component
// ---------

/**
 * 指定した比率で幅と高さを保つコンテナーコンポーネントです。
 *
 * レスポンシブに決まる幅に対して、画像や動画、地図の埋め込みなどを一定の比率で表示します。
 * 直接の子要素はコンテナーいっぱいに配置されます。
 */
export const AspectRatio: IAspectRatio = function SuiAspectRatio(props) {
  const api = useAspectRatioAPI(props);

  return <AspectRatioRoot {...api.getRootProps()} />;
};

export namespace AspectRatio {
  export type State = AspectRatioState;

  export type Props = AspectRatioProps;

  export type Radius = AspectRatioRadius;

  export type Ratio = AspectRatioRatio;
}
