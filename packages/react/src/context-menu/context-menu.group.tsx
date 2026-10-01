import { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type ContextMenuContext, useContextMenuContext } from "./context-menu.context.js";

/**
 * {@link ContextMenuGroup} が持つ状態です。
 */
export type ContextMenuGroupState = Override<ContextMenuContext, ContextMenu.Group.State>;

export namespace ContextMenuGroupProps {
  export type Render = RenderProps<ContextMenuGroupState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof ContextMenu.Group>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MenuGroupProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof ContextMenu.Group>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ContextMenuGroup} に渡す props です。
 */
export type ContextMenuGroupProps = ContextMenuGroupProps.Render &
  ContextMenuGroupProps.SuruUI &
  ContextMenuGroupProps.BaseUI &
  ContextMenuGroupProps.HTML;

export type IContextMenuGroup = IComponent<ContextMenuGroupProps>;

/**
 * 関連するコンテキストメニュー項目をまとめるグループ要素です。
 */
export const ContextMenuGroup: IContextMenuGroup = function SuiContextMenuGroup(props) {
  const ctx = useContextMenuContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <ContextMenu.Group
      {...otherProps}
      {...proxyRenderProps<ContextMenu.Group.State, ContextMenuGroupState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<ContextMenuGroupState>(
            className,
            "sui_context_menu_group",
            (state) => `sui_context_menu_group-size_${state.size}`,
            (state) => `sui_context_menu_group-radius_${state.radius}`,
            (state) => `sui_context_menu_group-variant_${state.variant}`,
            (state) => state.outlined && "sui_context_menu_group-outlined",
          ),
        },
      )}
    />
  );
};

export { ContextMenuGroup as Group };

export namespace Group {
  export type State = ContextMenuGroupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ContextMenuGroupProps.Render;

    export type SuruUI = ContextMenuGroupProps.SuruUI;

    export type BaseUI = ContextMenuGroupProps.BaseUI;

    export type HTML = ContextMenuGroupProps.HTML;
  }
}
