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

export namespace LabelRootProps {
  export type Render = RenderProps<LabelRootState>;

  export type SuruUI = {
    /**
     * ラベルのサイズを指定します。
     *
     * @default "md"
     */
    size?: LabelRootSize | undefined;
  };

  export type HTML = Omit<React.ComponentProps<"label">, keyof Render | keyof SuruUI>;
}

/**
 * {@link LabelRoot} に渡す props です。
 */
export type LabelRootProps = LabelRootProps.Render & LabelRootProps.SuruUI & LabelRootProps.HTML;

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
    props: [
      otherLabelProps,
      {
        className: cn<LabelRootState>("sui_label", `sui_label-size_${size}`),
        "data-scope": dataScope,
      },
    ],
    defaultTagName: "label",
  });
};

export { LabelRoot as Root };

export namespace Root {
  export type State = LabelRootState;

  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    export type Render = LabelRootProps.Render;

    export type SuruUI = LabelRootProps.SuruUI;

    export type HTML = LabelRootProps.HTML;
  }

  export type Size = LabelRootSize;
}
