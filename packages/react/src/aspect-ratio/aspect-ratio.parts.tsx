import type * as React from "react";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

import "./aspect-ratio.css";

// Root
// ----

/**
 * アスペクト比です。
 *
 * 数値は「幅 / 高さ」として解釈されます。CSS の `aspect-ratio` プロパティーと同じ形式の値を指定できます。
 */
export type AspectRatioRootRatio = number | string;

/**
 * {@link AspectRatioRoot} のインラインスタイルです。
 *
 * 比率の指定に使う CSS 変数を含みます。
 */
type AspectRatioRootStyle = React.CSSProperties & {
  "--sui_aspect_ratio-ratio"?: AspectRatioRootRatio;
};

/**
 * {@link AspectRatioRoot} の状態です。
 */
export type AspectRatioRootState = {};

/**
 * {@link AspectRatioRoot} に渡すプロパティーです。
 */
export type AspectRatioRootProps = Omit<React.ComponentProps<"div">, keyof RenderProps> &
  RenderProps<AspectRatioRootState> & {
    /**
     * コンテンツの幅と高さの比率を指定します。
     *
     * 数値は「幅 / 高さ」として解釈されます。`16 / 9` のような計算式や、CSS の `aspect-ratio` プロパティーと同じ形式の文字列も指定できます。
     *
     * @default 1
     */
    ratio?: AspectRatioRootRatio | undefined;
  };

/**
 * 指定した比率で幅と高さを保つコンテナーのルート要素です。
 *
 * 直接の子要素はコンテナーいっぱいに広がるように配置されます。画像や動画、地図の埋め込みなどの表示に使います。
 */
export const AspectRatioRoot: IComponent<AspectRatioRootProps> = function SuiAspectRatioRoot(
  props,
) {
  const { ratio, className, ...otherProps } = props;

  return useRender({
    defaultTagName: "div",
    props: [
      otherProps,
      {
        className: cn(className, "sui_aspect_ratio"),
        style: (ratio === undefined
          ? {}
          : { "--sui_aspect_ratio-ratio": ratio }) as AspectRatioRootStyle,
      },
    ],
  });
};

/**
 * {@link AspectRatioRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link AspectRatioRootState} です。
   */
  export type State = AspectRatioRootState;

  /**
   * {@link AspectRatioRootProps} です。
   */
  export type Props = AspectRatioRootProps;

  /**
   * {@link AspectRatioRootRatio} です。
   */
  export type Ratio = AspectRatioRootRatio;
}

/**
 * {@link AspectRatioRoot} です。
 */
export const Root: IComponent<Root.Props> = AspectRatioRoot;
