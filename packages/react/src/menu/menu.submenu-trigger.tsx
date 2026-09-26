import type { NonNativeButtonProps } from "@base-ui/react/internals/types";
import { Menu } from "@base-ui/react/menu";
import * as React from "react";

import mergeProps from "../_merge-props.js";
import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import * as Button from "../button/button.parts.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { useMenuContext } from "./menu.context.js";

/**
 * サブメニュー項目の配色です。
 */
export type MenuSubmenuTriggerColor = Button.Root.Color;

/**
 * サブメニュー項目の角丸です。
 */
export type MenuSubmenuTriggerRadius = Button.Root.Radius;

/**
 * サブメニュー項目の主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type MenuSubmenuTriggerVariant = Button.Root.Variant;

/**
 * {@link MenuSubmenuTrigger} が持つ状態です。
 */
export type MenuSubmenuTriggerState = Override<Button.Root.State, Menu.SubmenuTrigger.State>;

export namespace MenuSubmenuTriggerProps {
  export type Render = RenderProps<MenuSubmenuTriggerState>;

  export type SuruUI = {
    /**
     * 項目の配色を指定します。
     *
     * @default "grey"
     */
    color?: MenuSubmenuTriggerColor | undefined;

    /**
     * 項目の角丸を指定します。
     *
     * 既定値は {@link MenuRootProps.radius|radius} です。
     */
    radius?: MenuSubmenuTriggerRadius | undefined;

    /**
     * 項目の主な外観を指定します。
     *
     * 既定値は {@link MenuRootProps.variant|variant} です。
     */
    variant?: MenuSubmenuTriggerVariant | undefined;
  };

  export type BaseUI = Override<
    Button.Root.Props.BaseUI,
    Pick<
      React.ComponentProps<typeof Menu.SubmenuTrigger>,
      Exclude<
        // Base UI の型を確認して取り出すプロパティーを決めます。
        // NonNativeButtonProps:
        | keyof NonNativeButtonProps
        // MenuSubmenuTriggerProps:
        | "onClick"
        | "label"
        | "id"
        | "disabled"
        | "delay"
        | "closeDelay"
        | "openOnHover",
        keyof Render | keyof SuruUI
      >
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Menu.SubmenuTrigger>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuSubmenuTrigger} に渡す props です。
 */
export type MenuSubmenuTriggerProps = MenuSubmenuTriggerProps.Render &
  MenuSubmenuTriggerProps.SuruUI &
  MenuSubmenuTriggerProps.BaseUI &
  MenuSubmenuTriggerProps.HTML;

/**
 * サブメニューを開くメニュー項目です。
 */
export const MenuSubmenuTrigger: IComponent<MenuSubmenuTriggerProps> =
  function SuiMenuSubmenuTrigger(props) {
    const ctx = useMenuContext();
    const {
      id,
      color = "grey",
      delay,
      label,
      style,
      radius = ctx.radius,
      render = <div />,
      onClick,
      variant = ctx.variant,
      disabled,
      className,
      closeDelay,
      openOnHover,
      nativeButton = false,
      focusableWhenDisabled,
      ...otherProps
    } = props;
    const baseuiProps: Required<MenuSubmenuTriggerProps.BaseUI> = {
      id,
      delay,
      label,
      onClick,
      disabled,
      closeDelay,
      openOnHover,
      nativeButton,
      focusableWhenDisabled,
    };

    return (
      <Menu.SubmenuTrigger
        {...otherProps}
        {...baseuiProps}
        render={(htmlProps: {}, state) => {
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
            disabled: state.disabled,
            outlined: undefined,
            nativeButton,
            focusableWhenDisabled,
          };

          return (
            <Button.Root
              {...mergeProps<typeof Button.Root>([
                htmlProps,
                buttonRootProps,
                proxyRenderProps(state, {
                  style,
                  render,
                  className: cn(
                    className,
                    "sui_menu_item",
                    "sui_menu_submenu_trigger",
                    (state) => state.disabled && "sui_menu_item-disabled",
                    (state) => state.highlighted && "sui_menu_item-highlighted",
                    (state) => state.open && "sui_menu_item-open",
                  ),
                }),
              ])}
            />
          );
        }}
      />
    );
  };

export { MenuSubmenuTrigger as SubmenuTrigger };

export namespace SubmenuTrigger {
  export type State = MenuSubmenuTriggerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MenuSubmenuTriggerProps.Render;

    export type SuruUI = MenuSubmenuTriggerProps.SuruUI;

    export type BaseUI = MenuSubmenuTriggerProps.BaseUI;

    export type HTML = MenuSubmenuTriggerProps.HTML;
  }

  export type Color = MenuSubmenuTriggerColor;

  export type Radius = MenuSubmenuTriggerRadius;

  export type Variant = MenuSubmenuTriggerVariant;
}
