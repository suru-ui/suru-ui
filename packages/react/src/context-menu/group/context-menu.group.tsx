import { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useContentContext } from "../content/context-menu.content.context.js";
import { ContextMenuGroupContext } from "./context-menu.group.context.js";

/**
 * {@link ContextMenuGroup} が持つ状態です。
 *
 * @template TItem 項目の型です。
 */
export type ContextMenuGroupState<TItem = any> = ContextMenuGroupContext<TItem>;

export namespace ContextMenuGroupProps {
  export type Render<TItem = any> = RenderProps<ContextMenuGroupState<TItem>>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof ContextMenu.Group>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // MenuGroupProps より:
      never
    >,
    keyof Render | keyof SuruUI
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
  const ctx = useContentContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <ContextMenu.Group
      {...otherProps}
      {...proxyRenderProps<ContextMenu.Group.State, ContextMenuGroupState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <ContextMenuGroupContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </ContextMenuGroupContext>
          ),
          className: cn<ContextMenuGroupState>(
            className,
            "sui_context_menu_group",
            (state) => `sui_context_menu_group-size_${state.size}`,
            (state) => `sui_context_menu_group-radius_${state.radius}`,
            (state) => `sui_context_menu_group-variant_${state.variant}`,
            (state) => state.outlined && "sui_context_menu_group-outlined",
            (state) => state.open && "sui_context_menu_group-open",
            (state) => state.anchorHidden && "sui_context_menu_group-anchor_hidden",
            (state) => state.nested && "sui_context_menu_group-nested",
            (state) => state.instant && "sui_context_menu_group-instant",
            (state) => `sui_context_menu_group-side_${state.side.replaceAll("-", "_")}`,
            (state) => `sui_context_menu_group-align_${state.align}`,
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_context_menu_group-transition_status_${state.transitionStatus}`,
          ),
        },
      )}
    />
  );
};

export { ContextMenuGroup as Group };

export namespace Group {
  export type State<TItem = any> = ContextMenuGroupState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = ContextMenuGroupProps.Render<TItem>;

    export type SuruUI = ContextMenuGroupProps.SuruUI;

    export type BaseUI = ContextMenuGroupProps.BaseUI;

    export type HTML = ContextMenuGroupProps.HTML;
  }
}
