import { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link ContextMenuArrow} が持つ状態です。
 */
export type ContextMenuArrowState = ContextMenu.Arrow.State;

export namespace ContextMenuArrowProps {
  export type Render = RenderProps<ContextMenuArrowState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof ContextMenu.Arrow>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MenuArrowProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof ContextMenu.Arrow>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ContextMenuArrow} に渡す props です。
 */
export type ContextMenuArrowProps = ContextMenuArrowProps.Render &
  ContextMenuArrowProps.SuruUI &
  ContextMenuArrowProps.BaseUI &
  ContextMenuArrowProps.HTML;

export type IContextMenuArrow = IComponent<ContextMenuArrowProps>;

/**
 * ポップアップとトリガーをつなぐ矢印要素です。
 */
export const ContextMenuArrow: IContextMenuArrow = function SuiContextMenuArrow(props) {
  const { className, ...otherProps } = props;

  return <ContextMenu.Arrow {...otherProps} className={cn(className, "sui_context_menu_arrow")} />;
};

export { ContextMenuArrow as Arrow };

export namespace Arrow {
  export type State = ContextMenuArrowState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ContextMenuArrowProps.Render;

    export type SuruUI = ContextMenuArrowProps.SuruUI;

    export type BaseUI = ContextMenuArrowProps.BaseUI;

    export type HTML = ContextMenuArrowProps.HTML;
  }
}
