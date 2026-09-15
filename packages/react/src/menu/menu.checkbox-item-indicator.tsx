import { Menu } from "@base-ui/react/menu";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link MenuCheckboxItemIndicator} が持つ状態です。
 */
export type MenuCheckboxItemIndicatorState = Menu.CheckboxItemIndicator.State;

export namespace MenuCheckboxItemIndicatorProps {
  export type Render = RenderProps<MenuCheckboxItemIndicatorState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Menu.CheckboxItemIndicator>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MenuCheckboxItemIndicatorProps:
      "keepMounted",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Menu.CheckboxItemIndicator>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuCheckboxItemIndicator} に渡す props です。
 */
export type MenuCheckboxItemIndicatorProps = MenuCheckboxItemIndicatorProps.Render &
  MenuCheckboxItemIndicatorProps.SuruUI &
  MenuCheckboxItemIndicatorProps.BaseUI &
  MenuCheckboxItemIndicatorProps.HTML;

/**
 * チェックされた項目を示す要素です。
 */
export const MenuCheckboxItemIndicator: IComponent<MenuCheckboxItemIndicatorProps> =
  function SuiMenuCheckboxItemIndicator(props) {
    const { className, ...otherProps } = props;

    return (
      <Menu.CheckboxItemIndicator
        {...otherProps}
        className={cn(
          className,
          "sui_menu_item_indicator",
          "sui_menu_checkbox_item_indicator",
          (state) => !state.checked && "sui_menu_item_indicator-unchecked",
        )}
      />
    );
  };

export { MenuCheckboxItemIndicator as CheckboxItemIndicator };

export namespace CheckboxItemIndicator {
  export type State = MenuCheckboxItemIndicatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MenuCheckboxItemIndicatorProps.Render;

    export type SuruUI = MenuCheckboxItemIndicatorProps.SuruUI;

    export type BaseUI = MenuCheckboxItemIndicatorProps.BaseUI;

    export type HTML = MenuCheckboxItemIndicatorProps.HTML;
  }
}
