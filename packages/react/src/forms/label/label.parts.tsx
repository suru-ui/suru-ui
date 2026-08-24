import type { Size } from "@suru-ui/theme";
import type * as React from "react";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

import "./label.css";

// Root
// ----

/**
 * ラベルの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type LabelRootSize = Size;

/**
 * {@link LabelRoot} の状態です。
 */
export type LabelRootState = {};

/**
 * {@link LabelRoot} に渡すプロパティーです。
 */
export type LabelRootProps = Omit<React.ComponentProps<"label">, keyof RenderProps> &
  RenderProps<LabelRootState> & {
    /**
     * ラベルのサイズを指定します。
     *
     * @default "md"
     */
    size?: LabelRootSize | undefined;
  };

/**
 * ラベルのルートコンポーネントです。
 */
export const LabelRoot: IComponent<LabelRootProps> = function SuiLabelRoot(props) {
  const { size = "md", ...otherProps } = props;

  return useRender({
    defaultTagName: "label",
    props: [
      otherProps,
      {
        className: cn("sui_label", `sui_label-size_${size}`),
      },
    ],
  });
};

/**
 * {@link LabelRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link LabelRootState} です。
   */
  export type State = LabelRootState;

  /**
   * {@link LabelRootProps} です。
   */
  export type Props = LabelRootProps;

  /**
   * {@link LabelRootSize} です。
   */
  export type Size = LabelRootSize;
}

/**
 * {@link LabelRoot} です。
 */
export const Root: IComponent<Root.Props> = LabelRoot;
