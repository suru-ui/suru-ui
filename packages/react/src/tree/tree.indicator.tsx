import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import { ChevronRightIcon } from "../_icons.jsx";
import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link TreeItemIndicator} の状態です。
 */
export type TreeItemIndicatorState = {};

export namespace TreeItemIndicatorProps {
  export type Render = RenderProps<TreeItemIndicatorState>;

  export type SuruUI = {
    /**
     * 展開インジケーターを表示するかどうかを指定します。
     *
     * `false` の場合、ラベルの桁を揃えるためのスペースのみを確保します。
     *
     * @default true
     */
    visible?: boolean | undefined;
  };

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"span", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link TreeItemIndicator} に渡すプロパティーです。
 */
export type TreeItemIndicatorProps = TreeItemIndicatorProps.Render &
  TreeItemIndicatorProps.SuruUI &
  TreeItemIndicatorProps.BaseUI &
  TreeItemIndicatorProps.HTML;

/**
 * ツリーの項目の展開状態を示すアイコン要素です。
 *
 * 既定では右向きのシェブロンアイコンを表示し、展開時には下向きに回転します。
 */
export const TreeItemIndicator: IComponent<TreeItemIndicatorProps> = function SuiTreeItemIndicator(
  props,
) {
  const { visible = true, children = <ChevronRightIcon />, ...otherSpanProps } = props;

  return useRender({
    props: [
      otherSpanProps,
      {
        children,
        className: cn<TreeItemIndicatorState>(
          "sui_tree_item_indicator",
          !visible && "sui_tree_item_indicator-hidden",
        ),
      },
    ],
    defaultTagName: "span",
  });
};

export { TreeItemIndicator as Indicator };

export namespace Indicator {
  export type State = TreeItemIndicatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = TreeItemIndicatorProps.Render;

    export type SuruUI = TreeItemIndicatorProps.SuruUI;

    export type BaseUI = TreeItemIndicatorProps.BaseUI;

    export type HTML = TreeItemIndicatorProps.HTML;
  }
}
