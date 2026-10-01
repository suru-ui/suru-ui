import { Menu } from "@base-ui/react/menu";
import * as React from "react";

import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type MenuContext, useMenuContext } from "./menu.context.js";

/**
 * {@link MenuRadioItemIndicator} が持つ状態です。
 */
export type MenuRadioItemIndicatorState = Override<MenuContext, Menu.RadioItemIndicator.State>;

export namespace MenuRadioItemIndicatorProps {
  export type Render = RenderProps<MenuRadioItemIndicatorState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Menu.RadioItemIndicator>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MenuRadioItemIndicatorProps:
      "keepMounted",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Menu.RadioItemIndicator>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuRadioItemIndicator} に渡す props です。
 */
export type MenuRadioItemIndicatorProps = MenuRadioItemIndicatorProps.Render &
  MenuRadioItemIndicatorProps.SuruUI &
  MenuRadioItemIndicatorProps.BaseUI &
  MenuRadioItemIndicatorProps.HTML;

export type IMenuRadioItemIndicator = IComponent<MenuRadioItemIndicatorProps>;

/**
 * 選択されたラジオ項目を示す要素です。
 */
export const MenuRadioItemIndicator: IMenuRadioItemIndicator = function SuiMenuRadioItemIndicator(
  props,
) {
  const ctx = useMenuContext();
  const { style, render, className, keepMounted = true, ...otherProps } = props;

  return (
    <Menu.RadioItemIndicator
      {...otherProps}
      {...proxyRenderProps<Menu.RadioItemIndicator.State, MenuRadioItemIndicatorState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<MenuRadioItemIndicatorState>(
            className,
            "sui_menu_item_indicator",
            "sui_menu_radio_item_indicator",
            (state) => !state.checked && "sui_menu_item_indicator-unchecked",
            (state) => `sui_menu_item_indicator-size_${state.size}`,
            (state) => `sui_menu_item_indicator-radius_${state.radius}`,
            (state) => `sui_menu_item_indicator-variant_${state.variant}`,
            (state) => state.outlined && "sui_menu_item_indicator-outlined",
          ),
        },
      )}
      keepMounted={keepMounted}
    />
  );
};

export { MenuRadioItemIndicator as RadioItemIndicator };

export namespace RadioItemIndicator {
  export type State = MenuRadioItemIndicatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MenuRadioItemIndicatorProps.Render;

    export type SuruUI = MenuRadioItemIndicatorProps.SuruUI;

    export type BaseUI = MenuRadioItemIndicatorProps.BaseUI;

    export type HTML = MenuRadioItemIndicatorProps.HTML;
  }
}
