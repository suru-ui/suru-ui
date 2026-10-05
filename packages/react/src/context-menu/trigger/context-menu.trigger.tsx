import { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useContextMenuContext } from "../root/context-menu.root.context.js";
import { ContextMenuTriggerContext } from "./context-menu.trigger.context.js";

/**
 * {@link ContextMenuTrigger} が持つ状態です。
 */
export type ContextMenuTriggerState = ContextMenuTriggerContext;

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
          render: (htmlProps, state) => (
            <ContextMenuTriggerContext value={state}>
              <RenderElement
                state={state}
                render={children}
                htmlProps={htmlProps}
                defaultTagName="button"
              />
            </ContextMenuTriggerContext>
          ),
          className: cn<ContextMenuTriggerState>(
            className,
            "sui_context_menu_trigger",
            (state) => state.open && "sui_context_menu_trigger-open",
            (state) => `sui_context_menu_trigger-size_${state.size}`,
            (state) => `sui_context_menu_trigger-radius_${state.radius}`,
            (state) => `sui_context_menu_trigger-variant_${state.variant}`,
            (state) => state.outlined && "sui_context_menu_trigger-outlined",
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
