import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import type { Size } from "@suru-ui/theme";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

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

/**
 * ラベルのルートコンポーネントです。
 *
 * フォームコントロールと関連付けられる見出しを表示します。
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

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = LabelRootProps.Render;

    export type SuruUI = LabelRootProps.SuruUI;

    export type BaseUI = LabelRootProps.BaseUI;

    export type HTML = LabelRootProps.HTML;
  }

  export type Size = LabelRootSize;
}
