import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import { type Size, type Color, isSize, isColor } from "@suru-ui/theme";
import * as React from "react";

import Config from "../_config.jsx";
import { isBool } from "../_is-x.js";
import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * ラベルの配色です。
 */
export type LabelRootColor = Color;

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
     * ラベルの配色を指定します。
     *
     * 既定値は設定コンテクストですが、それが有効な値でなければ `"grey"` です。
     */
    color?: LabelRootColor | undefined;

    /**
     * ラベルを無効にするかどうかを指定します。
     *
     * ラベル自身の見た目だけを変え、関連するコントロールは無効化しません。
     * 関連するコントロールを無効にするときは、そのコントロール自身の `disabled` を指定してください。
     *
     * 既定値は設定コンテクストですが、それが有効な値でなければ `false` です。
     */
    disabled?: boolean | undefined;

    /**
     * ラベルのサイズを指定します。
     *
     * 既定値は設定コンテクストですが、それが有効な値でなければ `"md"` です。
     */
    size?: LabelRootSize | undefined;
  };

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"label", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link LabelRoot} に渡す props です。
 */
export type LabelRootProps = LabelRootProps.Render &
  LabelRootProps.SuruUI &
  LabelRootProps.BaseUI &
  LabelRootProps.HTML;

export type ILabelRoot = IComponent<LabelRootProps>;

/**
 * ラベルのルート要素です。
 *
 * 大きさと配色の外観を自身のスタイルに集約します。
 */
export const LabelRoot: ILabelRoot = function SuiLabelRoot(props) {
  const config = React.use(Config);
  const {
    size = config.get("size", isSize, "md"),
    color = config.get("color", isColor, "grey"),
    disabled = config.get("disabled", isBool, false),
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherLabelProps
  } = props;

  return useRender({
    props: [
      otherLabelProps,
      {
        className: cn(
          "sui_label",
          `sui_label-size_${size}`,
          `sui_label-color_${color}`,
          disabled && "sui_label-disabled",
        ),
        "data-scope": dataScope,
      },
    ],
    defaultTagName: "label",
  });
};

export { LabelRoot as Root };

export namespace Root {
  export type State = LabelRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = LabelRootProps.Render;

    export type SuruUI = LabelRootProps.SuruUI;

    export type BaseUI = LabelRootProps.BaseUI;

    export type HTML = LabelRootProps.HTML;
  }

  export type Color = LabelRootColor;

  export type Size = LabelRootSize;
}
