import type { IComponent } from "../types.js";
import {
  type AspectRatioRootProps,
  type AspectRatioRootRatio,
  type AspectRatioRootState,
  AspectRatioRoot,
} from "./aspect-ratio.parts.jsx";

/**
 * {@link AspectRatioRootRatio} です。
 */
export type AspectRatioRatio = AspectRatioRootRatio;

/**
 * {@link AspectRatio} の各パーツに渡すプロパティーです。
 */
export type AspectRatioPartsProps = {
  /**
   * {@link AspectRatioRoot} に渡すプロパティーです。
   */
  readonly root: AspectRatioRootProps;
};

/**
 * {@link AspectRatio} の状態です。
 */
export type AspectRatioState = AspectRatioRootState;

/**
 * {@link AspectRatio} コンポーネントのプロパティーです。
 */
export type AspectRatioProps = AspectRatioRootProps;

/**
 * {@link AspectRatio} の各パーツに渡すプロパティーを作るフックです。
 */
export function useAspectRatio(props: AspectRatioProps): AspectRatioPartsProps {
  return {
    root: props,
  };
}

/**
 * 指定した比率で幅と高さを保つコンテナーコンポーネントです。
 *
 * レスポンシブに決まる幅に対して、画像や動画、地図の埋め込みなどを一定の比率で表示します。直接の子要素はコンテナーいっぱいに配置されます。
 */
export const AspectRatio: IComponent<AspectRatioProps> = function SuiAspectRatio(props) {
  const partsProps = useAspectRatio(props);

  return <AspectRatioRoot {...partsProps.root} />;
};

/**
 * {@link AspectRatio} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace AspectRatio {
  /**
   * {@link AspectRatioState} です。
   */
  export type State = AspectRatioState;

  /**
   * {@link AspectRatioProps} です。
   */
  export type Props = AspectRatioProps;

  /**
   * {@link AspectRatioRatio} です。
   */
  export type Ratio = AspectRatioRatio;
}
