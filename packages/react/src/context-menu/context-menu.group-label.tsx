import { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type ContextMenuContext, useContextMenuContext } from "./context-menu.context.js";

/**
 * {@link ContextMenuGroupLabel} が持つ状態です。
 */
export type ContextMenuGroupLabelState = Override<ContextMenuContext, ContextMenu.GroupLabel.State>;

export namespace ContextMenuGroupLabelProps {
  export type Render = RenderProps<ContextMenuGroupLabelState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof ContextMenu.GroupLabel>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MenuGroupLabelProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof ContextMenu.GroupLabel>,
    keyof Render | keyof SuruUI | keyof BaseUI
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

/**
 * グループに自動的に対応付けられるラベル要素です。
 */
export const ContextMenuGroupLabel: IContextMenuGroupLabel = function SuiContextMenuGroupLabel(
  props,
) {
  const ctx = useContextMenuContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <ContextMenu.GroupLabel
      {...otherProps}
      {...proxyRenderProps<ContextMenu.GroupLabel.State, ContextMenuGroupLabelState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn(className, "sui_context_menu_group_label"),
        },
      )}
    />
  );
};

export { ContextMenuGroupLabel as GroupLabel };

export namespace GroupLabel {
  export type State = ContextMenuGroupLabelState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ContextMenuGroupLabelProps.Render;

    export type SuruUI = ContextMenuGroupLabelProps.SuruUI;

    export type BaseUI = ContextMenuGroupLabelProps.BaseUI;

    export type HTML = ContextMenuGroupLabelProps.HTML;
  }
}
