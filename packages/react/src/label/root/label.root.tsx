import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import * as React from "react";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import {
  type LabelContextSize,
  type LabelContextColor,
  LabelContext,
} from "./label.root.context.js";

/** ラベルの配色です。 */
export type LabelRootColor = LabelContextColor;

/**
 * ラベルの大きさです。
 *
 * - `"sm"`: 小さめ
 * - `"md"`: 標準的
 * - `"lg"`: 大きめ
 */
export type LabelRootSize = LabelContextSize;

/**
 * {@link LabelRoot} が持つ状態です。
 */
export type LabelRootState = LabelContext;

export namespace LabelRootProps {
  export type Render = RenderProps<LabelRootState>;

  export type SuruUI = {
    /**
     * ラベルの配色を指定します。
     *
     * @default "grey"
     */
    color?: LabelRootColor | undefined;

    /**
     * ラベルを無効にするかどうかを指定します。
     *
     * ラベル自身の見た目だけを変え、関連するコントロールは無効化しません。
     * 関連するコントロールを無効にするときは、そのコントロール自身の `disabled` を指定してください。
     *
     * @default false
     */
    disabled?: boolean | undefined;

    /**
     * ラベルのサイズを指定します。
     *
     * @default "md"
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
export const LabelRoot: ILabelRoot = (props) => {
  const {
    size = "md",
    color = "grey",
    disabled = false,
    // @ts-expect-error data-scope は Base UI のコンポーネント型に含まれないため。
    "data-scope": dataScope = "",
    ...otherLabelProps
  } = props;
  const ctx = React.useMemo<LabelContext>(
    () => ({
      size,
      color,
      disabled,
    }),
    [size, color, disabled],
  );
  const element = useRender({
    props: [
      otherLabelProps,
      {
        className: cn<LabelRootState>(
          "sui_label",
          (state) => `sui_label-size_${state.size}`,
          (state) => `sui_label-color_${state.color}`,
          (state) => state.disabled && "sui_label-disabled",
        ),
        "data-scope": dataScope,
      },
    ],
    state: ctx,
    defaultTagName: "label",
  });

  return <LabelContext value={ctx}>{element}</LabelContext>;
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
