import { ContextMenu } from "@base-ui/react/context-menu";
import type { NonNativeButtonProps } from "@base-ui/react/internals/types";
import * as React from "react";

import mergeProps from "../_merge-props.js";
import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import * as Button from "../button/button.parts.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { getItemVariant } from "./_context-menu.jsx";
import { useContextMenuContext } from "./context-menu.context.js";

/**
 * {@link ContextMenuCheckboxItem} のチェック状態を変更されるイベントの詳細です。
 */
export type ContextMenuCheckboxItemChangeEventDetails = ContextMenu.CheckboxItem.ChangeEventDetails;

/**
 * {@link ContextMenuCheckboxItem} のチェック状態が変更される理由です。
 */
export type ContextMenuCheckboxItemChangeEventReason = ContextMenu.CheckboxItem.ChangeEventReason;

/**
 * チェックボックス項目の配色です。
 */
export type ContextMenuCheckboxItemColor = Button.ButtonRootColor;

/**
 * チェックボックス項目の角丸です。
 */
export type ContextMenuCheckboxItemRadius = Button.ButtonRootRadius;

/**
 * チェックボックス項目の主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type ContextMenuCheckboxItemVariant = Button.Root.Variant;

/**
 * {@link ContextMenuCheckboxItem} が持つ状態です。
 */
export type ContextMenuCheckboxItemState = Override<
  Button.ButtonRootState,
  ContextMenu.CheckboxItem.State
>;

export namespace ContextMenuCheckboxItemProps {
  export type Render = RenderProps<ContextMenuCheckboxItemState>;

  export type SuruUI = {
    /**
     * 項目の配色を指定します。
     *
     * @default "grey"
     */
    color?: ContextMenuCheckboxItemColor | undefined;

    /**
     * 項目の角丸を指定します。
     *
     * 既定値は {@link ContextMenuRootProps.radius|radius} です。
     */
    radius?: ContextMenuCheckboxItemRadius | undefined;

    /**
     * チェック状態のときの外観を指定します。
     *
     * チェックされていないときは常に `"naked"` になります。
     *
     * 既定値は {@link ContextMenuRootProps.variant|variant} です。
     */
    variant?: ContextMenuCheckboxItemVariant | undefined;
  };

  export type BaseUI = Override<
    Button.Root.Props.BaseUI,
    Pick<
      React.ComponentProps<typeof ContextMenu.CheckboxItem>,
      Exclude<
        // Base UI の型を確認して取り出すプロパティーを決めます。
        // NonNativeButtonProps:
        | keyof NonNativeButtonProps
        // ComboboxItemProps:
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
    React.ComponentProps<typeof ContextMenu.CheckboxItem>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ContextMenuCheckboxItem} に渡す props です。
 */
export type ContextMenuCheckboxItemProps = ContextMenuCheckboxItemProps.Render &
  ContextMenuCheckboxItemProps.SuruUI &
  ContextMenuCheckboxItemProps.BaseUI &
  ContextMenuCheckboxItemProps.HTML;

/**
 * 設定をオンまたはオフにできるコンテキストメニュー項目です。
 */
export const ContextMenuCheckboxItem: IComponent<ContextMenuCheckboxItemProps> =
  function SuiContextMenuCheckboxItem(props) {
    const ctx = useContextMenuContext();
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
    const baseuiProps: Required<ContextMenuCheckboxItemProps.BaseUI> = {
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
      <ContextMenu.CheckboxItem
        {...otherProps}
        {...baseuiProps}
        render={(htmlProps: {}, state) => {
          const buttonRootProps: Required<Button.Root.Props.SuruUI & Button.Root.Props.BaseUI> &
            Pick<Button.Root.Props.HTML, "disabled"> = {
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
                    "sui_context_menu_item",
                    "sui_context_menu_checkbox_item",
                    (state) => state.checked && "sui_context_menu_item-checked",
                    (state) => state.highlighted && "sui_context_menu_item-highlighted",
                    (state) => state.disabled && "sui_context_menu_item-disabled",
                  ),
                }),
              ])}
            />
          );
        }}
      />
    );
  };

export { ContextMenuCheckboxItem as CheckboxItem };

export namespace CheckboxItem {
  export type State = ContextMenuCheckboxItemState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ContextMenuCheckboxItemProps.Render;

    export type SuruUI = ContextMenuCheckboxItemProps.SuruUI;

    export type BaseUI = ContextMenuCheckboxItemProps.BaseUI;

    export type HTML = ContextMenuCheckboxItemProps.HTML;
  }

  export type ChangeEventDetails = ContextMenuCheckboxItemChangeEventDetails;

  export type ChangeEventReason = ContextMenuCheckboxItemChangeEventReason;

  export type Color = ContextMenuCheckboxItemColor;

  export type Radius = ContextMenuCheckboxItemRadius;

  export type Variant = ContextMenuCheckboxItemVariant;
}
