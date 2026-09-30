import type { NonNativeButtonProps } from "@base-ui/react/internals/types";
import { Menu } from "@base-ui/react/menu";
import * as React from "react";

import mergeProps from "../_merge-props.js";
import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import * as Button from "../button/button.parts.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type MenuContext, useMenuContext } from "./menu.context.js";

/**
 * メニューの操作項目の配色です。
 */
export type MenuItemColor = Button.Root.Color;

/**
 * メニューの操作項目の角丸です。
 */
export type MenuItemRadius = Button.Root.Radius;

/**
 * メニューの操作項目の主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type MenuItemVariant = Button.Root.Variant;

/**
 * {@link MenuItem} が持つ状態です。
 */
export type MenuItemState = Override<MenuContext, Override<Button.Root.State, Menu.Item.State>>;

export namespace MenuItemProps {
  export type Render = RenderProps<MenuItemState>;

  export type SuruUI = {
    /**
     * 項目の配色を指定します。
     *
     * @default "grey"
     */
    color?: MenuItemColor | undefined;

    /**
     * 項目の角丸を指定します。
     *
     * 既定値は {@link MenuRootProps.radius|radius} です。
     */
    radius?: MenuItemRadius | undefined;

    /**
     * 項目の主な外観を指定します。
     *
     * 既定値は {@link MenuRootProps.variant|variant} です。
     */
    variant?: MenuItemVariant | undefined;
  };

  export type BaseUI = Override<
    Button.Root.Props.BaseUI,
    Pick<
      React.ComponentProps<typeof Menu.Item>,
      Exclude<
        // Base UI の型を確認して取り出すプロパティーを決めます。
        // NonNativeButtonProps:
        | keyof NonNativeButtonProps
        // MenuItemProps:
        | "onClick"
        | "disabled"
        | "label"
        | "id"
        | "closeOnClick",
        keyof Render | keyof SuruUI
      >
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Menu.Item>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuItem} に渡す props です。
 */
export type MenuItemProps = MenuItemProps.Render &
  MenuItemProps.SuruUI &
  MenuItemProps.BaseUI &
  MenuItemProps.HTML;

export type IMenuItem = IComponent<MenuItemProps>;

/**
 * メニューの操作項目です。
 */
export const MenuItem: IMenuItem = function SuiMenuItem(props) {
  const ctx = useMenuContext();
  const {
    id,
    color = "grey",
    label,
    style,
    radius = ctx.radius,
    render,
    onClick,
    variant = ctx.variant,
    disabled,
    className,
    closeOnClick,
    nativeButton = false,
    focusableWhenDisabled,
    ...otherProps
  } = props;
  const baseuiProps: Required<MenuItemProps.BaseUI> = {
    id,
    label,
    onClick,
    disabled,
    closeOnClick,
    nativeButton,
    focusableWhenDisabled,
  };

  return (
    <Menu.Item
      {...otherProps}
      {...baseuiProps}
      render={(htmlProps: {}, itemState) => {
        const buttonRootProps: Required<
          Button.Root.Props.SuruUI &
            Button.Root.Props.BaseUI &
            Pick<Button.Root.Props.HTML, "disabled">
        > = {
          item: true,
          size: ctx.size,
          color,
          muted: undefined,
          radius,
          pending: undefined,
          squared: undefined,
          variant,
          disabled: itemState.disabled,
          outlined: undefined,
          nativeButton,
          focusableWhenDisabled,
        };

        return (
          <Button.Root
            {...mergeProps<typeof Button.Root>([
              htmlProps,
              buttonRootProps,
              proxyRenderProps<Button.Root.State, MenuItemState>(
                (state) => ({ ...ctx, ...state, ...itemState }),
                {
                  style,
                  render: render ?? <div />,
                  className: cn<MenuItemState>(
                    className,
                    "sui_menu_item",
                    (state) => state.disabled && "sui_menu_item-disabled",
                    (state) => state.highlighted && "sui_menu_item-highlighted",
                  ),
                },
              ),
            ])}
          />
        );
      }}
    />
  );
};

export { MenuItem as Item };

export namespace Item {
  export type State = MenuItemState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MenuItemProps.Render;

    export type SuruUI = MenuItemProps.SuruUI;

    export type BaseUI = MenuItemProps.BaseUI;

    export type HTML = MenuItemProps.HTML;
  }

  export type Color = MenuItemColor;

  export type Radius = MenuItemRadius;

  export type Variant = MenuItemVariant;
}
