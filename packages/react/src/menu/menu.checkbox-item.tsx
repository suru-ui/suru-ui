import type { NonNativeButtonProps } from "@base-ui/react/internals/types";
import { Menu } from "@base-ui/react/menu";
import * as React from "react";

import mergeProps from "../_merge-props.js";
import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import * as Button from "../button/button.parts.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { getItemVariant } from "./_menu.utils.jsx";
import { useMenuContext } from "./menu.context.js";

/**
 * {@link MenuCheckboxItem} のチェック状態を変更されるイベントの詳細です。
 */
export type MenuCheckboxItemChangeEventDetails = Menu.CheckboxItem.ChangeEventDetails;

/**
 * {@link MenuCheckboxItem} のチェック状態が変更される理由です。
 */
export type MenuCheckboxItemChangeEventReason = Menu.CheckboxItem.ChangeEventReason;

/**
 * チェックボックス項目の配色です。
 */
export type MenuCheckboxItemColor = Button.Root.Color;

/**
 * チェックボックス項目の角丸です。
 */
export type MenuCheckboxItemRadius = Button.Root.Radius;

/**
 * チェックボックス項目の主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type MenuCheckboxItemVariant = Button.Root.Variant;

/**
 * {@link MenuCheckboxItem} が持つ状態です。
 */
export type MenuCheckboxItemState = Override<Button.Root.State, Menu.CheckboxItem.State>;

export namespace MenuCheckboxItemProps {
  export type Render = RenderProps<MenuCheckboxItemState>;

  export type SuruUI = {
    /**
     * 項目の配色を指定します。
     *
     * @default "grey"
     */
    color?: MenuCheckboxItemColor | undefined;

    /**
     * 項目の角丸を指定します。
     *
     * 既定値は {@link MenuRootProps.radius|radius} です。
     */
    radius?: MenuCheckboxItemRadius | undefined;

    /**
     * チェック状態のときの外観を指定します。
     *
     * チェックされていないときは常に `"naked"` になります。
     *
     * 既定値は {@link MenuRootProps.variant|variant} です。
     */
    variant?: MenuCheckboxItemVariant | undefined;
  };

  export type BaseUI = Override<
    Button.Root.Props.BaseUI,
    Pick<
      React.ComponentProps<typeof Menu.CheckboxItem>,
      Exclude<
        // Base UI の型を確認して取り出すプロパティーを決めます。
        // NonNativeButtonProps:
        | keyof NonNativeButtonProps
        // MenuCheckboxItemProps:
        | "checked"
        | "defaultChecked"
        | "onCheckedChange"
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
    React.ComponentProps<typeof Menu.CheckboxItem>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuCheckboxItem} に渡す props です。
 */
export type MenuCheckboxItemProps = MenuCheckboxItemProps.Render &
  MenuCheckboxItemProps.SuruUI &
  MenuCheckboxItemProps.BaseUI &
  MenuCheckboxItemProps.HTML;

/**
 * 設定をオンまたはオフにできるメニュー項目です。
 */
export const MenuCheckboxItem: IComponent<MenuCheckboxItemProps> = function SuiMenuCheckboxItem(
  props,
) {
  const ctx = useMenuContext();
  const {
    id,
    color = "grey",
    label,
    style,
    radius = ctx.radius,
    render,
    checked,
    onClick,
    variant = ctx.variant,
    disabled,
    className,
    closeOnClick,
    nativeButton = false,
    defaultChecked,
    onCheckedChange,
    focusableWhenDisabled,
    ...otherProps
  } = props;
  const baseuiProps: Required<MenuCheckboxItemProps.BaseUI> = {
    id,
    label,
    checked,
    onClick,
    disabled,
    closeOnClick,
    nativeButton,
    defaultChecked,
    onCheckedChange,
    focusableWhenDisabled,
  };

  return (
    <Menu.CheckboxItem
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
          variant: getItemVariant(state, variant),
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
                render: render ?? <div />,
                className: cn(
                  className,
                  "sui_menu_item",
                  "sui_menu_checkbox_item",
                  (state) => state.checked && "sui_menu_item-checked",
                  (state) => state.disabled && "sui_menu_item-disabled",
                  (state) => state.highlighted && "sui_menu_item-highlighted",
                ),
              }),
            ])}
          />
        );
      }}
    />
  );
};

export { MenuCheckboxItem as CheckboxItem };

export namespace CheckboxItem {
  export type State = MenuCheckboxItemState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MenuCheckboxItemProps.Render;

    export type SuruUI = MenuCheckboxItemProps.SuruUI;

    export type BaseUI = MenuCheckboxItemProps.BaseUI;

    export type HTML = MenuCheckboxItemProps.HTML;
  }

  export type ChangeEventDetails = MenuCheckboxItemChangeEventDetails;

  export type ChangeEventReason = MenuCheckboxItemChangeEventReason;

  export type Color = MenuCheckboxItemColor;

  export type Radius = MenuCheckboxItemRadius;

  export type Variant = MenuCheckboxItemVariant;
}
