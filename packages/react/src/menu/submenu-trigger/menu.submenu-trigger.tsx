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
import { MenuSubmenuTriggerContext } from "./menu.submenu-trigger.context.js";

/** サブメニュー項目の配色です。 */
export type MenuSubmenuTriggerColor = Button.Root.Color;

/** サブメニュー項目の角丸です。 */
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
 *
 * @template TItem 項目の型です。
 */
export type MenuSubmenuTriggerState<TItem = any> = MenuSubmenuTriggerContext<TItem>;

export namespace MenuSubmenuTriggerProps {
  export type Render<TItem = any> = RenderProps<MenuSubmenuTriggerState<TItem>>;

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
    Omit<
      Pick<
        React.ComponentProps<typeof Menu.SubmenuTrigger>,
        // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
        // NonNativeButtonProps より :
        | keyof NonNativeButtonProps
        // MenuSubmenuTriggerProps より :
        | "onClick"
        | "label"
        | "id"
        | "disabled"
        | "delay"
        | "closeDelay"
        | "openOnHover"
      >,
      keyof Render | keyof SuruUI
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

export type IMenuSubmenuTrigger = IComponent<MenuSubmenuTriggerProps>;

/** サブメニューを開くメニュー項目です。 */
export const MenuSubmenuTrigger: IMenuSubmenuTrigger = (props) => {
  const ctx = useMenuContext();
  const {
    id,
    color = "grey",
    delay,
    label,
    style,
    radius = ctx.radius,
    render,
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
              proxyRenderProps<Button.Root.State, MenuSubmenuTriggerState>(
                (state) => ({
                  ...ctx,
                  ...state,
                  ...itemState,
                }),
                {
                  style,
                  render: (currentHtmlProps, state) => (
                    <MenuSubmenuTriggerContext value={state}>
                      <RenderElement
                        state={state}
                        render={render}
                        htmlProps={currentHtmlProps}
                        defaultTagName="div"
                      />
                    </MenuSubmenuTriggerContext>
                  ),
                  className: cn<MenuSubmenuTriggerState>(
                    className,
                    "sui_menu_item",
                    "sui_menu_submenu_trigger",
                    (state) => state.disabled && "sui_menu_item-disabled",
                    (state) => state.highlighted && "sui_menu_item-highlighted",
                    (state) => state.open && "sui_menu_item-open",
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

export { MenuSubmenuTrigger as SubmenuTrigger };
export namespace SubmenuTrigger {
  export type State<TItem = any> = MenuSubmenuTriggerState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = MenuSubmenuTriggerProps.Render<TItem>;

    export type SuruUI = MenuSubmenuTriggerProps.SuruUI;

    export type BaseUI = MenuSubmenuTriggerProps.BaseUI;

    export type HTML = MenuSubmenuTriggerProps.HTML;
  }

  export type Color = MenuSubmenuTriggerColor;

  export type Radius = MenuSubmenuTriggerRadius;

  export type Variant = MenuSubmenuTriggerVariant;
}
