import { Menu } from "@base-ui/react/menu";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { useMenuContext } from "../root/menu.root.context.js";
import type { MenuPortalContext } from "./menu.portal.context.js";

/**
 * {@link MenuPortal} が持つ状態です。
 *
 * @template TItem 項目の型です。
 */
export type MenuPortalState<TItem = any> = Override<MenuPortalContext<TItem>, Menu.Portal.State>;

export namespace MenuPortalProps {
  export type Render<TItem = any> = RenderProps<MenuPortalState<TItem>>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Menu.Portal>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // MenuPortalProps より:
      "keepMounted" | "container"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Menu.Portal>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuPortal} に渡す props です。
 */
export type MenuPortalProps = MenuPortalProps.Render &
  MenuPortalProps.SuruUI &
  MenuPortalProps.BaseUI &
  MenuPortalProps.HTML;

export type IMenuPortal = IComponent<MenuPortalProps>;

/**
 * メニューを DOM の別の場所へ移動する要素です。
 *
 * 既定ではポップアップを `<body>` の末尾に配置します。
 */
export const MenuPortal: IMenuPortal = function SuiMenuPortal(props) {
  const ctx = useMenuContext();
  const {
    style,
    render,
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;

  return (
    <Menu.Portal
      {...otherProps}
      {...proxyRenderProps<Menu.Portal.State, MenuPortalState>((state) => ({ ...ctx, ...state }), {
        style,
        render,
        className: cn<MenuPortalState>(
          className,
          "sui_menu_portal",
          (state) => `sui_menu_portal-size_${state.size}`,
          (state) => `sui_menu_portal-radius_${state.radius}`,
          (state) => `sui_menu_portal-variant_${state.variant}`,
          (state) => state.outlined && "sui_menu_portal-outlined",
        ),
      })}
      data-scope={dataScope}
    />
  );
};

export { MenuPortal as Portal };

export namespace Portal {
  export type State<TItem = any> = MenuPortalState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = MenuPortalProps.Render<TItem>;

    export type SuruUI = MenuPortalProps.SuruUI;

    export type BaseUI = MenuPortalProps.BaseUI;

    export type HTML = MenuPortalProps.HTML;
  }
}
