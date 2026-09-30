import { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type ContextMenuContext, useContextMenuContext } from "./context-menu.context.js";

/**
 * {@link ContextMenuSeparator} が持つ状態です。
 */
export type ContextMenuSeparatorState = Override<ContextMenuContext, ContextMenu.Separator.State>;

export namespace ContextMenuSeparatorProps {
  export type Render = RenderProps<ContextMenuSeparatorState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof ContextMenu.Separator>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // SeparatorProps:
      "orientation",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof ContextMenu.Separator>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ContextMenuSeparator} に渡す props です。
 */
export type ContextMenuSeparatorProps = ContextMenuSeparatorProps.Render &
  ContextMenuSeparatorProps.SuruUI &
  ContextMenuSeparatorProps.BaseUI &
  ContextMenuSeparatorProps.HTML;

export type IContextMenuSeparator = IComponent<ContextMenuSeparatorProps>;

/**
 * コンテキストメニュー項目を区切る要素です。
 */
export const ContextMenuSeparator: IContextMenuSeparator = function SuiContextMenuSeparator(props) {
  const ctx = useContextMenuContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <ContextMenu.Separator
      {...otherProps}
      {...proxyRenderProps<ContextMenu.Separator.State, ContextMenuSeparatorState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn(className, "sui_context_menu_separator"),
        },
      )}
    />
  );
};

export { ContextMenuSeparator as Separator };

export namespace Separator {
  export type State = ContextMenuSeparatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ContextMenuSeparatorProps.Render;

    export type SuruUI = ContextMenuSeparatorProps.SuruUI;

    export type BaseUI = ContextMenuSeparatorProps.BaseUI;

    export type HTML = ContextMenuSeparatorProps.HTML;
  }
}
