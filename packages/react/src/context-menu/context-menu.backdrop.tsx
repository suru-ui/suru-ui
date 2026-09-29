import { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link ContextMenuBackdrop} が持つ状態です。
 */
export type ContextMenuBackdropState = ContextMenu.Backdrop.State;

export namespace ContextMenuBackdropProps {
  export type Render = RenderProps<ContextMenuBackdropState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof ContextMenu.Backdrop>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MenuBackdropProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof ContextMenu.Backdrop>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ContextMenuBackdrop} に渡す props です。
 */
export type ContextMenuBackdropProps = ContextMenuBackdropProps.Render &
  ContextMenuBackdropProps.SuruUI &
  ContextMenuBackdropProps.BaseUI &
  ContextMenuBackdropProps.HTML;

export type IContextMenuBackdrop = IComponent<ContextMenuBackdropProps>;

/**
 * コンテキストメニューの背後に表示されるオーバーレイ要素です。
 */
export const ContextMenuBackdrop: IContextMenuBackdrop = function SuiContextMenuBackdrop(props) {
  const { className, ...otherProps } = props;

  return (
    <ContextMenu.Backdrop {...otherProps} className={cn(className, "sui_context_menu_backdrop")} />
  );
};

export { ContextMenuBackdrop as Backdrop };

export namespace Backdrop {
  export type State = ContextMenuBackdropState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ContextMenuBackdropProps.Render;

    export type SuruUI = ContextMenuBackdropProps.SuruUI;

    export type BaseUI = ContextMenuBackdropProps.BaseUI;

    export type HTML = ContextMenuBackdropProps.HTML;
  }
}
