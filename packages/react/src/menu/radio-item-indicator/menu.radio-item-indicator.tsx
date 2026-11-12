import { Menu } from "@base-ui/react/menu";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useMenuContext } from "../root/menu.root.context.js";
import { MenuRadioItemIndicatorContext } from "./menu.radio-item-indicator.context.js";

/**
 * {@link MenuRadioItemIndicator} が持つ状態です。
 *
 * @template TItem 項目の型です。
 */
export type MenuRadioItemIndicatorState<TItem = any> = MenuRadioItemIndicatorContext<TItem>;

export namespace MenuRadioItemIndicatorProps {
  export type Render<TItem = any> = RenderProps<MenuRadioItemIndicatorState<TItem>>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Menu.RadioItemIndicator>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // MenuRadioItemIndicatorProps より :
      "keepMounted"
    >,
    keyof Render | keyof SuruUI
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

/** 選択されたラジオ項目を示す要素です。 */
export const MenuRadioItemIndicator: IMenuRadioItemIndicator = (props) => {
  const ctx = useMenuContext();
  const { style, render, className, keepMounted = true, ...otherProps } = props;

  return (
    <Menu.RadioItemIndicator
      {...otherProps}
      {...proxyRenderProps<Menu.RadioItemIndicator.State, MenuRadioItemIndicatorState>(
        (state) => ({
          ...ctx,
          ...state,
        }),
        {
          style,
          render: (htmlProps, state) => (
            <MenuRadioItemIndicatorContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="span"
              />
            </MenuRadioItemIndicatorContext>
          ),
          className: cn<MenuRadioItemIndicatorState>(
            className,
            "sui_menu_item_indicator",
            "sui_menu_radio_item_indicator",
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
      keepMounted={keepMounted}
    />
  );
};

export { MenuRadioItemIndicator as RadioItemIndicator };
export namespace RadioItemIndicator {
  export type State<TItem = any> = MenuRadioItemIndicatorState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = MenuRadioItemIndicatorProps.Render<TItem>;

    export type SuruUI = MenuRadioItemIndicatorProps.SuruUI;

    export type BaseUI = MenuRadioItemIndicatorProps.BaseUI;

    export type HTML = MenuRadioItemIndicatorProps.HTML;
  }
}
