import { Menu } from "@base-ui/react/menu";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link MenuGroupLabel} が持つ状態です。
 */
export type MenuGroupLabelState = Menu.GroupLabel.State;

export namespace MenuGroupLabelProps {
  export type Render = RenderProps<MenuGroupLabelState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Menu.GroupLabel>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MenuGroupLabelProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Menu.GroupLabel>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuGroupLabel} に渡す props です。
 */
export type MenuGroupLabelProps = MenuGroupLabelProps.Render &
  MenuGroupLabelProps.SuruUI &
  MenuGroupLabelProps.BaseUI &
  MenuGroupLabelProps.HTML;

/**
 * グループに自動的に対応付けられるラベル要素です。
 */
export const MenuGroupLabel: IComponent<MenuGroupLabelProps> = function SuiMenuGroupLabel(props) {
  const { className, ...otherProps } = props;

  return <Menu.GroupLabel {...otherProps} className={cn(className, "sui_menu_group_label")} />;
};

export { MenuGroupLabel as GroupLabel };

export namespace GroupLabel {
  export type State = MenuGroupLabelState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MenuGroupLabelProps.Render;

    export type SuruUI = MenuGroupLabelProps.SuruUI;

    export type BaseUI = MenuGroupLabelProps.BaseUI;

    export type HTML = MenuGroupLabelProps.HTML;
  }
}
