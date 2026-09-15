import { Menu } from "@base-ui/react/menu";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link MenuSeparator} が持つ状態です。
 */
export type MenuSeparatorState = Menu.Separator.State;

export namespace MenuSeparatorProps {
  export type Render = RenderProps<MenuSeparatorState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Menu.Separator>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // SeparatorProps:
      "orientation",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Menu.Separator>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuSeparator} に渡す props です。
 */
export type MenuSeparatorProps = MenuSeparatorProps.Render &
  MenuSeparatorProps.SuruUI &
  MenuSeparatorProps.BaseUI &
  MenuSeparatorProps.HTML;

/**
 * メニュー項目を区切る要素です。
 */
export const MenuSeparator: IComponent<MenuSeparatorProps> = function SuiMenuSeparator(props) {
  const { className, ...otherProps } = props;

  return <Menu.Separator {...otherProps} className={cn(className, "sui_menu_separator")} />;
};

export { MenuSeparator as Separator };

export namespace Separator {
  export type State = MenuSeparatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MenuSeparatorProps.Render;

    export type SuruUI = MenuSeparatorProps.SuruUI;

    export type BaseUI = MenuSeparatorProps.BaseUI;

    export type HTML = MenuSeparatorProps.HTML;
  }
}
