import { Menu } from "@base-ui/react/menu";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { useMenuContext } from "./menu.context.js";

/**
 * {@link MenuPortal} が持つ状態です。
 */
export type MenuPortalState = Menu.Portal.State;

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

/**
 * メニューを DOM の別の場所へ移動する要素です。
 *
 * 既定ではポップアップを `<body>` の末尾に配置します。
 */
export const MenuPortal: IComponent<MenuPortalProps> = function SuiMenuPortal(props) {
  const ctx = useMenuContext();
  const {
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;

  return (
    <Menu.Portal
      {...otherProps}
      className={cn(
        className,
        "sui_menu_portal",
        `sui_menu_portal-size_${ctx.size}`,
        `sui_menu_portal-radius_${ctx.radius}`,
        ctx.outlined && "sui_menu_portal-outlined",
      )}
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
