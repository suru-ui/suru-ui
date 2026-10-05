import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import * as React from "react";

import { ChevronRightIcon } from "../../_icons.jsx";
import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { type TreeContextState, useTreeContext } from "../root/tree.root.context.js";

/**
 * {@link TreeItemIndicator} が持つ状態です。
 */
export type TreeItemIndicatorState = TreeContextState;

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

export type ITreeItemIndicator = IComponent<TreeItemIndicatorProps>;

/**
 * ツリーの項目の展開状態を示すアイコン要素です。
 *
 * 既定では右向きのシェブロンアイコンを表示し、展開時には下向きに回転します。
 */
export const TreeItemIndicator: ITreeItemIndicator = function SuiTreeItemIndicator(props) {
  const ctx = useTreeContext();
  const { visible = true, children = <ChevronRightIcon />, ...otherSpanProps } = props;
  const state = React.useMemo<TreeItemIndicatorState>(
    () => ({
      size: ctx.size,
      color: ctx.color,
      muted: ctx.muted,
      radius: ctx.radius,
      variant: ctx.variant,
      activeId: ctx.activeId,
      expanded: ctx.expanded,
      outlined: ctx.outlined,
      selected: ctx.selected,
    }),
    [ctx],
  );

  return useRender({
    props: [
      otherSpanProps,
      {
        children,
        className: cn<TreeItemIndicatorState>(
          "sui_tree_item_indicator",
          !visible && "sui_tree_item_indicator-hidden",
          (state) => `sui_tree_item_indicator-size_${state.size}`,
          (state) => `sui_tree_item_indicator-color_${state.color}`,
          (state) => `sui_tree_item_indicator-radius_${state.radius}`,
          (state) => `sui_tree_item_indicator-variant_${state.variant}`,
          (state) => state.outlined && "sui_tree_item_indicator-outlined",
          (state) => state.muted && "sui_tree_item_indicator-muted",
        ),
      },
    ],
    state,
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
