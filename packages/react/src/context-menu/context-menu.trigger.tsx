import { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type ContextMenuContext, useContextMenuContext } from "./context-menu.context.js";

/**
 * {@link ContextMenuTrigger} が持つ状態です。
 */
export type ContextMenuTriggerState = Override<ContextMenuContext, ContextMenu.Trigger.State>;

export namespace ContextMenuTriggerProps {
  export type Render = Omit<RenderProps<ContextMenuTriggerState>, "render">;

  export type SuruUI = {
    /**
     * トリガーとしてレンダリングする要素です。
     *
     * `render` props と同じ型で、そのまま `render` に渡されます。
     */
    children: NonNullable<RenderProps<ContextMenuTriggerState>["render"]>;
  };

  export type BaseUI = Pick<
    React.ComponentProps<typeof ContextMenu.Trigger>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ContextMenuTriggerProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof ContextMenu.Trigger>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ContextMenuTrigger} に渡す props です。
 */
export type ContextMenuTriggerProps = ContextMenuTriggerProps.Render &
  ContextMenuTriggerProps.SuruUI &
  ContextMenuTriggerProps.BaseUI &
  ContextMenuTriggerProps.HTML;

export type IContextMenuTrigger = IComponent<ContextMenuTriggerProps>;

/**
 * 右クリックまたは長押しでコンテキストメニューを開く対象です。
 *
 * `children` には表示する内容ではなく、トリガーとしてレンダリングする要素を渡します。
 */
export const ContextMenuTrigger: IContextMenuTrigger = function SuiContextMenuTrigger(props) {
  const ctx = useContextMenuContext();
  const { style, children, className, ...otherProps } = props;

  return (
    <ContextMenu.Trigger
      {...otherProps}
      {...proxyRenderProps<ContextMenu.Trigger.State, ContextMenuTriggerState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: children,
          className: cn<ContextMenuTriggerState>(
            className,
            "sui_context_menu_trigger",
            (state) => state.open && "sui_context_menu_trigger-open",
          ),
        },
      )}
    />
  );
};

export { ContextMenuTrigger as Trigger };

export namespace Trigger {
  export type State = ContextMenuTriggerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ContextMenuTriggerProps.Render;

    export type SuruUI = ContextMenuTriggerProps.SuruUI;

    export type BaseUI = ContextMenuTriggerProps.BaseUI;

    export type HTML = ContextMenuTriggerProps.HTML;
  }
}
