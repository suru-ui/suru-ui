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
import { getItemVariant } from "../_menu.utils.jsx";
import { type MenuContext, useMenuContext } from "../root/menu.root.context.js";
import { MenuRadioItemContext } from "./menu.radio-item.context.js";

/**
 * ラジオ項目の配色です。
 */
export type MenuRadioItemColor = Button.Root.Color;

/**
 * ラジオ項目の角丸です。
 */
export type MenuRadioItemRadius = Button.Root.Radius;

/**
 * ラジオ項目の主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type MenuRadioItemVariant = Button.Root.Variant;

/**
 * {@link MenuRadioItem} が持つ状態です。
 */
export type MenuRadioItemState = Override<
  MenuContext,
  Override<Button.Root.State, Menu.RadioItem.State>
>;

export namespace MenuRadioItemProps {
  export type Render = RenderProps<MenuRadioItemState>;

  export type SuruUI = {
    /**
     * 項目の配色を指定します。
     *
     * @default "grey"
     */
    color?: MenuRadioItemColor | undefined;

    /**
     * 項目の角丸を指定します。
     *
     * 既定値は {@link MenuRootProps.radius|radius} です。
     */
    radius?: MenuRadioItemRadius | undefined;

    /**
     * チェック状態のときの外観を指定します。
     *
     * チェックされていないときは常に `"naked"` になります。
     *
     * 既定値は {@link MenuRootProps.variant|variant} です。
     */
    variant?: MenuRadioItemVariant | undefined;
  };

  export type BaseUI = Override<
    Button.Root.Props.BaseUI,
    Pick<
      React.ComponentProps<typeof Menu.RadioItem>,
      Exclude<
        // Base UI の型を確認して取り出すプロパティーを決めます。
        // NonNativeButtonProps:
        | keyof NonNativeButtonProps
        // MenuRadioItemProps:
        | "value"
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
    React.ComponentProps<typeof Menu.RadioItem>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuRadioItem} に渡す props です。
 */
export type MenuRadioItemProps = MenuRadioItemProps.Render &
  MenuRadioItemProps.SuruUI &
  MenuRadioItemProps.BaseUI &
  MenuRadioItemProps.HTML;

export type IMenuRadioItem = IComponent<MenuRadioItemProps>;

/**
 * ラジオグループ内のメニュー項目です。
 */
export const MenuRadioItem: IMenuRadioItem = function SuiMenuRadioItem(props) {
  const ctx = useMenuContext();
  const {
    id,
    color = "grey",
    label,
    style,
    value,
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
  const baseuiProps: Required<MenuRadioItemProps.BaseUI> = {
    id,
    label,
    value,
    onClick,
    disabled,
    closeOnClick,
    nativeButton,
    focusableWhenDisabled,
  };

  return (
    <Menu.RadioItem
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
          variant: getItemVariant(itemState, variant),
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
              proxyRenderProps<Button.Root.State, MenuRadioItemState>(
                (state) => ({ ...ctx, ...state, ...itemState }),
                {
                  style,
                  render: (htmlProps, state) => (
                    <MenuRadioItemContext value={state}>
                      <RenderElement
                        state={state}
                        render={render ?? <div />}
                        htmlProps={htmlProps}
                        defaultTagName="div"
                      />
                    </MenuRadioItemContext>
                  ),
                  className: cn<MenuRadioItemState>(
                    className,
                    "sui_menu_item",
                    "sui_menu_radio_item",
                    (state) => state.checked && "sui_menu_item-checked",
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

export { MenuRadioItem as RadioItem };

export namespace RadioItem {
  export type State = MenuRadioItemState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MenuRadioItemProps.Render;

    export type SuruUI = MenuRadioItemProps.SuruUI;

    export type BaseUI = MenuRadioItemProps.BaseUI;

    export type HTML = MenuRadioItemProps.HTML;
  }

  export type Color = MenuRadioItemColor;

  export type Radius = MenuRadioItemRadius;

  export type Variant = MenuRadioItemVariant;
}
