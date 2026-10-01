import { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type ContextMenuContext, useContextMenuContext } from "./context-menu.context.js";

/**
 * {@link ContextMenuBackdrop} が持つ状態です。
 */
export type ContextMenuBackdropState = Override<ContextMenuContext, ContextMenu.Backdrop.State>;

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
  const ctx = useContextMenuContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <ContextMenu.Backdrop
      {...otherProps}
      {...proxyRenderProps<ContextMenu.Backdrop.State, ContextMenuBackdropState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<ContextMenuBackdropState>(
            className,
            "sui_context_menu_backdrop",
            (state) => `sui_context_menu_backdrop-size_${state.size}`,
            (state) => `sui_context_menu_backdrop-radius_${state.radius}`,
            (state) => `sui_context_menu_backdrop-variant_${state.variant}`,
            (state) => state.outlined && "sui_context_menu_backdrop-outlined",
          ),
        },
      )}
    />
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
