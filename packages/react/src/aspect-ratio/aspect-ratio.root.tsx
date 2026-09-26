import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import type { Size } from "@suru-ui/theme";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

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

export namespace AspectRatioRootProps {
  export type Render = RenderProps<AspectRatioRootState>;

  export type SuruUI = {
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
     * 文字列は CSS の `aspect-ratio` プロパティーと同じ規則で解釈され、`16 / 9` のような比率の表記を指定できます。
     *
     * @default 1
     */
    ratio?: AspectRatioRootRatio | undefined;
  };

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link AspectRatioRoot} に渡す props です。
 */
export type AspectRatioRootProps = AspectRatioRootProps.Render &
  AspectRatioRootProps.SuruUI &
  AspectRatioRootProps.BaseUI &
  AspectRatioRootProps.HTML;

/**
 * 指定した比率で幅と高さを保つコンテナーのルートコンポーネントです。
 *
 * 直接の子要素はコンテナーいっぱいに広がるように配置されます。画像や動画、地図の埋め込みなどの表示に使います。
 */
export const AspectRatioRoot: IComponent<AspectRatioRootProps> = function SuiAspectRatioRoot(
  props,
) {
  const {
    ratio = 1,
    radius = "none",
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherDivProps
  } = props;

  return useRender({
    props: [
      otherDivProps,
      {
        style: {
          "--sui_aspect_ratio-ratio": `${ratio}`,
        },
        className: cn("sui_aspect_ratio", `sui_aspect_ratio-radius_${radius}`),
        "data-scope": dataScope,
      },
    ],
    defaultTagName: "div",
  });
};

export { AspectRatioRoot as Root };

export namespace Root {
  export type State = AspectRatioRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = AspectRatioRootProps.Render;

    export type SuruUI = AspectRatioRootProps.SuruUI;

    export type BaseUI = AspectRatioRootProps.BaseUI;

    export type HTML = AspectRatioRootProps.HTML;
  }

  export type Radius = AspectRatioRootRadius;

  export type Ratio = AspectRatioRootRatio;
}
