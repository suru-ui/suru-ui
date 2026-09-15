import { Menu } from "@base-ui/react/menu";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link MenuGroup} が持つ状態です。
 */
export type MenuGroupState = Menu.Group.State;

export namespace MenuGroupProps {
  export type Render = RenderProps<MenuGroupState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Menu.Group>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MenuGroupProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Menu.Group>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuGroup} に渡す props です。
 */
export type MenuGroupProps = MenuGroupProps.Render &
  MenuGroupProps.SuruUI &
  MenuGroupProps.BaseUI &
  MenuGroupProps.HTML;

/**
 * 関連するメニュー項目をまとめるグループ要素です。
 */
export const MenuGroup: IComponent<MenuGroupProps> = function SuiMenuGroup(props) {
  const { className, ...otherProps } = props;

  return <Menu.Group {...otherProps} className={cn(className, "sui_menu_group")} />;
};

export { MenuGroup as Group };

export namespace Group {
  export type State = MenuGroupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MenuGroupProps.Render;

    export type SuruUI = MenuGroupProps.SuruUI;

    export type BaseUI = MenuGroupProps.BaseUI;

    export type HTML = MenuGroupProps.HTML;
  }
}
