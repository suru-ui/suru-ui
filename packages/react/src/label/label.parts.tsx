import type { Size } from "@suru-ui/theme";
import type * as React from "react";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

import "./label.css";

// Root
// ----

/**
 * ラベルの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type LabelRootSize = Size;

/**
 * {@link LabelRoot} が持つ状態です。
 */
export type LabelRootState = {};

/**
 * {@link LabelRoot} に渡す props です。
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
  const {
    size = "md",
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherLabelProps
  } = props;

  return useRender({
    defaultTagName: "label",
    props: [
      otherLabelProps,
      {
        className: cn<LabelRootState>("sui_label", `sui_label-size_${size}`),
        "data-scope": dataScope,
      },
    ],
  });
};

export { LabelRoot as Root };

export namespace Root {
  /**
   * {@link LabelRootState}
   */
  export type State = LabelRootState;

  /**
   * {@link LabelRootProps}
   */
  export type Props = LabelRootProps;

  /**
   * {@link LabelRootSize}
   */
  export type Size = LabelRootSize;
}
