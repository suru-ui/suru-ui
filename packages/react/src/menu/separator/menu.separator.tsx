import { Menu } from "@base-ui/react/menu";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useMenuContext } from "../root/menu.root.context.js";
import { MenuSeparatorContext } from "./menu.separator.context.js";

/**
 * {@link MenuSeparator} が持つ状態です。
 *
 * @template TItem 項目の型です。
 */
export type MenuSeparatorState<TItem = any> = MenuSeparatorContext<TItem>;

export namespace MenuSeparatorProps {
  export type Render<TItem = any> = RenderProps<MenuSeparatorState<TItem>>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Menu.Separator>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // SeparatorProps より :
      "orientation"
    >,
    keyof Render | keyof SuruUI
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

export type IMenuSeparator = IComponent<MenuSeparatorProps>;

/** メニュー項目を区切る要素です。 */
export const MenuSeparator: IMenuSeparator = (props) => {
  const ctx = useMenuContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Menu.Separator
      {...otherProps}
      {...proxyRenderProps<Menu.Separator.State, MenuSeparatorState>(
        (state) => ({
          ...ctx,
          ...state,
        }),
        {
          style,
          render: (htmlProps, state) => (
            <MenuSeparatorContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </MenuSeparatorContext>
          ),
          className: cn<MenuSeparatorState>(
            className,
            "sui_menu_separator",
            (state) => `sui_menu_separator-size_${state.size}`,
            (state) => `sui_menu_separator-radius_${state.radius}`,
            (state) => `sui_menu_separator-variant_${state.variant}`,
            (state) => state.outlined && "sui_menu_separator-outlined",
          ),
        },
      )}
    />
  );
};

export { MenuSeparator as Separator };
export namespace Separator {
  export type State<TItem = any> = MenuSeparatorState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = MenuSeparatorProps.Render<TItem>;

    export type SuruUI = MenuSeparatorProps.SuruUI;

    export type BaseUI = MenuSeparatorProps.BaseUI;

    export type HTML = MenuSeparatorProps.HTML;
  }
}
