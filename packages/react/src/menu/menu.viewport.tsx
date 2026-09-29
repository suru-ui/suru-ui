import { Menu } from "@base-ui/react/menu";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link MenuViewport} が持つ状態です。
 */
export type MenuViewportState = Menu.Viewport.State;

export namespace MenuViewportProps {
  export type Render = RenderProps<MenuViewportState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Menu.Viewport>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MenuViewportProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Menu.Viewport>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuViewport} に渡す props です。
 */
export type MenuViewportProps = MenuViewportProps.Render &
  MenuViewportProps.SuruUI &
  MenuViewportProps.BaseUI &
  MenuViewportProps.HTML;

export type IMenuViewport = IComponent<MenuViewportProps>;

/**
 * トリガーの切り替えに伴うメニュー内容のアニメーション用ビューポートです。
 */
export const MenuViewport: IMenuViewport = function SuiMenuViewport(props) {
  const { className, ...otherProps } = props;

  return <Menu.Viewport {...otherProps} className={cn(className, "sui_menu_viewport")} />;
};

export { MenuViewport as Viewport };

export namespace Viewport {
  export type State = MenuViewportState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MenuViewportProps.Render;

    export type SuruUI = MenuViewportProps.SuruUI;

    export type BaseUI = MenuViewportProps.BaseUI;

    export type HTML = MenuViewportProps.HTML;
  }
}
