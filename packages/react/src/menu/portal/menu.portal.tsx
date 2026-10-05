import { Menu } from "@base-ui/react/menu";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useMenuContext } from "../root/menu.root.context.js";
import { MenuPortalContext } from "./menu.portal.context.js";

/**
 * {@link MenuPortal} が持つ状態です。
 */
export type MenuPortalState = MenuPortalContext;

export namespace MenuPortalProps {
  export type Render = RenderProps<MenuPortalState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Menu.Portal>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MenuPortalProps:
      "keepMounted" | "container",
      keyof Render | keyof SuruUI
    >
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
        render: (htmlProps, state) => (
          <MenuPortalContext value={state}>
            <RenderElement
              state={state}
              render={render}
              htmlProps={htmlProps}
              defaultTagName="div"
            />
          </MenuPortalContext>
        ),
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
  export type State = MenuPortalState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MenuPortalProps.Render;

    export type SuruUI = MenuPortalProps.SuruUI;

    export type BaseUI = MenuPortalProps.BaseUI;

    export type HTML = MenuPortalProps.HTML;
  }
}
