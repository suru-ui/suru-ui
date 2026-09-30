import { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type ContextMenuContext, useContextMenuContext } from "./context-menu.context.js";

/**
 * {@link ContextMenuPortal} が持つ状態です。
 */
export type ContextMenuPortalState = Override<ContextMenuContext, ContextMenu.Portal.State>;

export namespace ContextMenuPortalProps {
  export type Render = RenderProps<ContextMenuPortalState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof ContextMenu.Portal>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MenuPortalProps:
      "keepMounted" | "container",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof ContextMenu.Portal>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ContextMenuPortal} に渡す props です。
 */
export type ContextMenuPortalProps = ContextMenuPortalProps.Render &
  ContextMenuPortalProps.SuruUI &
  ContextMenuPortalProps.BaseUI &
  ContextMenuPortalProps.HTML;

export type IContextMenuPortal = IComponent<ContextMenuPortalProps>;

/**
 * コンテキストメニューを DOM の別の場所へ移動する要素です。
 *
 * 既定ではポップアップを `<body>` の末尾に配置します。
 */
export const ContextMenuPortal: IContextMenuPortal = function SuiContextMenuPortal(props) {
  const ctx = useContextMenuContext();
  const {
    style,
    render,
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;

  return (
    <ContextMenu.Portal
      {...otherProps}
      {...proxyRenderProps<ContextMenu.Portal.State, ContextMenuPortalState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<ContextMenuPortalState>(
            className,
            "sui_context_menu_portal",
            (state) => `sui_context_menu_portal-size_${state.size}`,
            (state) => `sui_context_menu_portal-radius_${state.radius}`,
            (state) => state.outlined && "sui_context_menu_portal-outlined",
          ),
        },
      )}
      data-scope={dataScope}
    />
  );
};

export { ContextMenuPortal as Portal };

export namespace Portal {
  export type State = ContextMenuPortalState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ContextMenuPortalProps.Render;

    export type SuruUI = ContextMenuPortalProps.SuruUI;

    export type BaseUI = ContextMenuPortalProps.BaseUI;

    export type HTML = ContextMenuPortalProps.HTML;
  }
}
