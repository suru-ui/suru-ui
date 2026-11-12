import { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useGroupContext } from "../group/context-menu.group.context.js";
import { ContextMenuGroupLabelContext } from "./context-menu.group-label.context.js";

/**
 * {@link ContextMenuGroupLabel} が持つ状態です。
 *
 * @template TItem 項目の型です。
 */
export type ContextMenuGroupLabelState<TItem = any> = ContextMenuGroupLabelContext<TItem>;

export namespace ContextMenuGroupLabelProps {
  export type Render<TItem = any> = RenderProps<ContextMenuGroupLabelState<TItem>>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof ContextMenu.GroupLabel>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // MenuGroupLabelProps より :
      never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof ContextMenu.GroupLabel>,
    keyof Render | keyof SuruUI
  >;
}

/**
 * {@link ContextMenuGroupLabel} に渡す props です。
 */
export type ContextMenuGroupLabelProps = ContextMenuGroupLabelProps.Render &
  ContextMenuGroupLabelProps.SuruUI &
  ContextMenuGroupLabelProps.BaseUI &
  ContextMenuGroupLabelProps.HTML;

export type IContextMenuGroupLabel = IComponent<ContextMenuGroupLabelProps>;

/** グループに自動的に対応付けられるラベル要素です。 */
export const ContextMenuGroupLabel: IContextMenuGroupLabel = (props) => {
  const ctx = useGroupContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <ContextMenu.GroupLabel
      {...otherProps}
      {...proxyRenderProps<ContextMenu.GroupLabel.State, ContextMenuGroupLabelState>(
        (state) => ({
          ...ctx,
          ...state,
        }),
        {
          style,
          render: (htmlProps, state) => (
            <ContextMenuGroupLabelContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </ContextMenuGroupLabelContext>
          ),
          className: cn<ContextMenuGroupLabelState>(
            className,
            "sui_context_menu_group_label",
            (state) => `sui_context_menu_group_label-size_${state.size}`,
            (state) => `sui_context_menu_group_label-radius_${state.radius}`,
            (state) => `sui_context_menu_group_label-variant_${state.variant}`,
            (state) => state.outlined && "sui_context_menu_group_label-outlined",
            (state) => state.open && "sui_context_menu_group_label-open",
            (state) => state.anchorHidden && "sui_context_menu_group_label-anchor_hidden",
            (state) => state.nested && "sui_context_menu_group_label-nested",
            (state) => state.instant && "sui_context_menu_group_label-instant",
            (state) => `sui_context_menu_group_label-side_${state.side.replaceAll("-", "_")}`,
            (state) => `sui_context_menu_group_label-align_${state.align}`,
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_context_menu_group_label-transition_status_${state.transitionStatus}`,
          ),
        },
      )}
    />
  );
};

export { ContextMenuGroupLabel as GroupLabel };
export namespace GroupLabel {
  export type State<TItem = any> = ContextMenuGroupLabelState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = ContextMenuGroupLabelProps.Render<TItem>;

    export type SuruUI = ContextMenuGroupLabelProps.SuruUI;

    export type BaseUI = ContextMenuGroupLabelProps.BaseUI;

    export type HTML = ContextMenuGroupLabelProps.HTML;
  }
}
