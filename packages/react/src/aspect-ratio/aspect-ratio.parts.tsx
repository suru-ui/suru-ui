import type { Size } from "@suru-ui/theme";
import type * as React from "react";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

import "./aspect-ratio.css";

// Root
// ----

/**
 * アスペクト比コンテナーの角丸の大きさです。
 *
 * - `"none"`: 直角
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type AspectRatioRootRadius = "none" | Size;

/**
 * アスペクト比です。
 *
 * 数値は「幅 / 高さ」として解釈されます。
 * CSS の `aspect-ratio` プロパティーと同じ形式の値を指定できます。
 */
export type AspectRatioRootRatio = number | string;

/**
 * {@link AspectRatioRoot} が持つ状態です。
 */
export type AspectRatioRootState = {};

/**
 * {@link AspectRatioRoot} のインラインスタイルです。
 *
 * 比率の計算に使う CSS 変数を含みます。
 */
type AspectRatioRootStyle = React.CSSProperties & {
  "--sui_aspect_ratio-ratio"?: AspectRatioRootRatio;
};

/**
 * {@link AspectRatioRoot} に渡す props です。
 */
export type AspectRatioRootProps = Omit<React.ComponentProps<"div">, keyof RenderProps> &
  RenderProps<AspectRatioRootState> & {
    /**
     * コンテナーの角丸を指定します。
     *
     * @default "none"
     */
    radius?: AspectRatioRootRadius | undefined;

    /**
     * コンテンツの幅と高さの比率を指定します。
     *
     * 数値は「幅 / 高さ」として解釈されます。
     * `16 / 9` のような計算式や、CSS の `aspect-ratio` プロパティーと同じ形式の文字列も指定できます。
     *
     * @default 1
     */
    ratio?: AspectRatioRootRatio | undefined;
  };

/**
 * 指定した比率で幅と高さを保つコンテナーのルート要素です。
 *
 * 直接の子要素はコンテナーいっぱいに広がるように配置されます。
 * 画像や動画、地図の埋め込みなどの表示に使います。
 */
export const AspectRatioRoot: IComponent<AspectRatioRootProps> = function SuiAspectRatioRoot(
  props,
) {
  const { ratio = 1, radius = "none", className, ...otherDivProps } = props;

  return useRender({
    defaultTagName: "div",
    props: [
      otherDivProps,
      {
        style: {
          "--sui_aspect_ratio-ratio": ratio,
        } as AspectRatioRootStyle,
        className: cn(className, "sui_aspect_ratio", `sui_aspect_ratio-radius_${radius}`),
        "data-scope": "",
      },
    ],
  });
};

export { AspectRatioRoot as Root };

export namespace Root {
  /**
   * {@link AspectRatioRootState}
   */
  export type State = AspectRatioRootState;

  /**
   * {@link AspectRatioRootProps}
   */
  export type Props = AspectRatioRootProps;

  /**
   * {@link AspectRatioRootRadius}
   */
  export type Radius = AspectRatioRootRadius;

  /**
   * {@link AspectRatioRootRatio}
   */
  export type Ratio = AspectRatioRootRatio;
}
