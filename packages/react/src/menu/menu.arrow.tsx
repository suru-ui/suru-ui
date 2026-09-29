import { Menu } from "@base-ui/react/menu";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link MenuArrow} が持つ状態です。
 */
export type MenuArrowState = Menu.Arrow.State;

export namespace MenuArrowProps {
  export type Render = RenderProps<MenuArrowState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Menu.Arrow>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MenuArrowProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Menu.Arrow>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuArrow} に渡す props です。
 */
export type MenuArrowProps = MenuArrowProps.Render &
  MenuArrowProps.SuruUI &
  MenuArrowProps.BaseUI &
  MenuArrowProps.HTML;

export type IMenuArrow = IComponent<MenuArrowProps>;

/**
 * ポップアップとトリガーをつなぐ矢印要素です。
 */
export const MenuArrow: IMenuArrow = function SuiMenuArrow(props) {
  const { className, ...otherProps } = props;

  return <Menu.Arrow {...otherProps} className={cn(className, "sui_menu_arrow")} />;
};

export { MenuArrow as Arrow };

export namespace Arrow {
  export type State = MenuArrowState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MenuArrowProps.Render;

    export type SuruUI = MenuArrowProps.SuruUI;

    export type BaseUI = MenuArrowProps.BaseUI;

    export type HTML = MenuArrowProps.HTML;
  }
}
