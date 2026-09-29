import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import type { Size, Color } from "@suru-ui/theme";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * ステータスの配色です。
 */
export type StatusRootColor = Color;

/**
 * インジケーターのリップルの大きさです。
 *
 * ドットの大きさに対する相対的な大きさです。
 * `"md"` の実際の大きさはインジケーターの大きさによって異なります。
 *
 * - `"sm"`: 小さいリップル
 * - `"md"`: 標準的なリップル
 * - `"lg"`: 大きいリップル
 */
export type StatusRootRippleSize = Size;

/**
 * ステータスの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type StatusRootSize = Size;

/**
 * {@link StatusRoot} が持つ状態です。
 */
export type StatusRootState = {};

export namespace StatusRootProps {
  export type Render = RenderProps<StatusRootState>;

  export type SuruUI = {
    /**
     * ステータスの色を指定します。
     *
     * 色はインジケーターのドットに適用されます。
     *
     * @default "grey"
     */
    color?: StatusRootColor | undefined;

    /**
     * リップルを含めた大きさでインジケーターを表示します。
     *
     * `true` の場合はリップルがはみ出す分の余白を確保し、レイアウト上の占有範囲がリップルを含めた大きさになります。
     *
     * @default false
     */
    containRipple?: boolean | undefined;

    /**
     * インジケーターにリップルが広がるアニメーションを表示します。
     *
     * @default false
     */
    ping?: boolean | undefined;

    /**
     * インジケーターのリップルの大きさを指定します。
     *
     * ドットの大きさに対する相対的な大きさです。
     *
     * @default "md"
     */
    rippleSize?: StatusRootRippleSize | undefined;

    /**
     * ステータスの大きさを指定します。
     *
     * @default "md"
     */
    size?: StatusRootSize | undefined;
  };

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"span", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link StatusRoot} に渡す props です。
 */
export type StatusRootProps = StatusRootProps.Render &
  StatusRootProps.SuruUI &
  StatusRootProps.BaseUI &
  StatusRootProps.HTML;

export type IStatusRoot = IComponent<StatusRootProps>;

/**
 * 状態を示すドットとラベルを並べて表示するルートコンポーネントです。
 *
 * 大きさと配色、リップルの修飾を自身のクラスに集約し、子のインジケーターへ反映します。
 */
export const StatusRoot: IStatusRoot = function SuiStatusRoot(props) {
  const {
    ping = false,
    size = "md",
    color = "grey",
    rippleSize = "md",
    containRipple = false,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherSpanProps
  } = props;

  return useRender({
    props: [
      otherSpanProps,
      {
        className: cn(
          "sui_status",
          `sui_status-size_${size}`,
          `sui_status-color_${color}`,
          `sui_status-ripple_size_${rippleSize}`,
          ping && "sui_status-ping",
          containRipple && "sui_status-contain_ripple",
        ),
        "data-scope": dataScope,
      },
    ],
    defaultTagName: "span",
  });
};

export { StatusRoot as Root };

export namespace Root {
  export type State = StatusRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = StatusRootProps.Render;

    export type SuruUI = StatusRootProps.SuruUI;

    export type BaseUI = StatusRootProps.BaseUI;

    export type HTML = StatusRootProps.HTML;
  }

  export type Color = StatusRootColor;

  export type RippleSize = StatusRootRippleSize;

  export type Size = StatusRootSize;
}
