import { Menu } from "@base-ui/react/menu";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { type MenuContext, useMenuContext } from "../root/menu.root.context.js";

/**
 * {@link MenuCheckboxItemIndicator} が持つ状態です。
 */
export type MenuCheckboxItemIndicatorState = Override<
  MenuContext,
  Menu.CheckboxItemIndicator.State
>;

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

export type IMenuCheckboxItemIndicator = IComponent<MenuCheckboxItemIndicatorProps>;

/**
 * チェックされた項目を示す要素です。
 */
export const MenuCheckboxItemIndicator: IMenuCheckboxItemIndicator =
  function SuiMenuCheckboxItemIndicator(props) {
    const ctx = useMenuContext();
    const { style, render, className, ...otherProps } = props;

    return (
      <Menu.CheckboxItemIndicator
        {...otherProps}
        {...proxyRenderProps<Menu.CheckboxItemIndicator.State, MenuCheckboxItemIndicatorState>(
          (state) => ({ ...ctx, ...state }),
          {
            style,
            render,
            className: cn<MenuCheckboxItemIndicatorState>(
              className,
              "sui_menu_item_indicator",
              "sui_menu_checkbox_item_indicator",
              (state) => !state.checked && "sui_menu_item_indicator-unchecked",
              (state) => `sui_menu_item_indicator-size_${state.size}`,
              (state) => `sui_menu_item_indicator-radius_${state.radius}`,
              (state) => `sui_menu_item_indicator-variant_${state.variant}`,
              (state) => state.outlined && "sui_menu_item_indicator-outlined",
              (state) => state.disabled && "sui_menu_item_indicator-disabled",
              (state) => state.highlighted && "sui_menu_item_indicator-highlighted",
              (state) =>
                state.transitionStatus !== undefined &&
                `sui_menu_item_indicator-transition_status_${state.transitionStatus}`,
            ),
          },
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
