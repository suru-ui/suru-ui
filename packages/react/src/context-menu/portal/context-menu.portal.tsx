import { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { useContextMenuContext } from "../root/context-menu.root.context.js";
import type { ContextMenuPortalContext } from "./context-menu.portal.context.js";

/**
 * {@link ContextMenuPortal} が持つ状態です。
 *
 * @template TItem 項目の型です。
 */
export type ContextMenuPortalState<TItem = any> = Override<
  ContextMenuPortalContext<TItem>,
  ContextMenu.Portal.State
>;

export namespace ContextMenuPortalProps {
  export type Render<TItem = any> = RenderProps<ContextMenuPortalState<TItem>>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof ContextMenu.Portal>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // ContextMenuPortalProps より:
      "keepMounted" | "container"
    >,
    keyof Render | keyof SuruUI
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
            (state) => `sui_context_menu_portal-variant_${state.variant}`,
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
  export type State<TItem = any> = ContextMenuPortalState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = ContextMenuPortalProps.Render<TItem>;

    export type SuruUI = ContextMenuPortalProps.SuruUI;

    export type BaseUI = ContextMenuPortalProps.BaseUI;

    export type HTML = ContextMenuPortalProps.HTML;
  }
}
