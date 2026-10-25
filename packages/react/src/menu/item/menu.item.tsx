import type { NonNativeButtonProps } from "@base-ui/react/internals/types";
import { Menu } from "@base-ui/react/menu";
import * as React from "react";

import mergeProps from "../../_merge-props.js";
import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import * as Button from "../../button/button.parts.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { useMenuContext } from "../root/menu.root.context.js";
import { MenuItemContext } from "./menu.item.context.js";

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
 *
 * @template TItem 項目の型です。
 */
export type MenuItemState<TItem = any> = MenuItemContext<TItem>;

export namespace MenuItemProps {
  export type Render<TItem = any> = RenderProps<MenuItemState<TItem>>;

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
    Omit<
      Pick<
        React.ComponentProps<typeof Menu.Item>,
        // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
        // NonNativeButtonProps より:
        | keyof NonNativeButtonProps
        // MenuItemProps より:
        | "onClick"
        | "disabled"
        | "label"
        | "id"
        | "closeOnClick"
      >,
      keyof Render | keyof SuruUI
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
          thin: undefined,
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
                  render: (htmlProps, state) => (
                    <MenuItemContext value={state}>
                      <RenderElement
                        state={state}
                        render={render ?? <div />}
                        htmlProps={htmlProps}
                        defaultTagName="div"
                      />
                    </MenuItemContext>
                  ),
                  className: cn<MenuItemState>(
                    className,
                    "sui_menu_item",
                    (state) => state.disabled && "sui_menu_item-disabled",
                    (state) => state.highlighted && "sui_menu_item-highlighted",
                    (state) => `sui_menu_item-size_${state.size}`,
                    (state) => `sui_menu_item-radius_${state.radius}`,
                    (state) => `sui_menu_item-variant_${state.variant}`,
                    (state) => state.outlined && "sui_menu_item-outlined",
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
  export type State<TItem = any> = MenuItemState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = MenuItemProps.Render<TItem>;

    export type SuruUI = MenuItemProps.SuruUI;

    export type BaseUI = MenuItemProps.BaseUI;

    export type HTML = MenuItemProps.HTML;
  }

  export type Color = MenuItemColor;

  export type Radius = MenuItemRadius;

  export type Variant = MenuItemVariant;
}
