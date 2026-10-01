import { ContextMenu } from "@base-ui/react/context-menu";
import type { NonNativeButtonProps } from "@base-ui/react/internals/types";
import * as React from "react";

import mergeProps from "../_merge-props.js";
import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import * as Button from "../button/button.parts.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type ContextMenuContext, useContextMenuContext } from "./context-menu.context.js";

/**
 * サブメニュー項目の配色です。
 */
export type ContextMenuSubmenuTriggerColor = Button.Root.Color;

/**
 * サブメニュー項目の角丸です。
 */
export type ContextMenuSubmenuTriggerRadius = Button.Root.Radius;

/**
 * サブメニュー項目の主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type ContextMenuSubmenuTriggerVariant = Button.Root.Variant;

/**
 * {@link ContextMenuSubmenuTrigger} が持つ状態です。
 */
export type ContextMenuSubmenuTriggerState = Override<
  ContextMenuContext,
  Override<Button.Root.State, ContextMenu.SubmenuTrigger.State>
>;

export namespace ContextMenuSubmenuTriggerProps {
  export type Render = RenderProps<ContextMenuSubmenuTriggerState>;

  export type SuruUI = {
    /**
     * 項目の配色を指定します。
     *
     * @default "grey"
     */
    color?: ContextMenuSubmenuTriggerColor | undefined;

    /**
     * 項目の角丸を指定します。
     *
     * 既定値は {@link ContextMenuRootProps.radius|radius} です。
     */
    radius?: ContextMenuSubmenuTriggerRadius | undefined;

    /**
     * 項目の主な外観を指定します。
     *
     * 既定値は {@link ContextMenuRootProps.variant|variant} です。
     */
    variant?: ContextMenuSubmenuTriggerVariant | undefined;
  };

  export type BaseUI = Override<
    Button.Root.Props.BaseUI,
    Pick<
      React.ComponentProps<typeof ContextMenu.SubmenuTrigger>,
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
    React.ComponentProps<typeof ContextMenu.SubmenuTrigger>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ContextMenuSubmenuTrigger} に渡す props です。
 */
export type ContextMenuSubmenuTriggerProps = ContextMenuSubmenuTriggerProps.Render &
  ContextMenuSubmenuTriggerProps.SuruUI &
  ContextMenuSubmenuTriggerProps.BaseUI &
  ContextMenuSubmenuTriggerProps.HTML;

export type IContextMenuSubmenuTrigger = IComponent<ContextMenuSubmenuTriggerProps>;

/**
 * サブメニューを開くコンテキストメニュー項目です。
 */
export const ContextMenuSubmenuTrigger: IContextMenuSubmenuTrigger =
  function SuiContextMenuSubmenuTrigger(props) {
    const ctx = useContextMenuContext();
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
    const baseuiProps: Required<ContextMenuSubmenuTriggerProps.BaseUI> = {
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
      <ContextMenu.SubmenuTrigger
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
                proxyRenderProps<Button.Root.State, ContextMenuSubmenuTriggerState>(
                  (state) => ({ ...ctx, ...state, ...itemState }),
                  {
                    style,
                    render,
                    className: cn<ContextMenuSubmenuTriggerState>(
                      className,
                      "sui_context_menu_item",
                      "sui_context_menu_submenu_trigger",
                      (state) => state.disabled && "sui_context_menu_item-disabled",
                      (state) => state.highlighted && "sui_context_menu_item-highlighted",
                      (state) => state.open && "sui_context_menu_item-open",
                      (state) => `sui_context_menu_item-size_${state.size}`,
                      (state) => `sui_context_menu_item-radius_${state.radius}`,
                      (state) => `sui_context_menu_item-variant_${state.variant}`,
                      (state) => state.outlined && "sui_context_menu_item-outlined",
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

export { ContextMenuSubmenuTrigger as SubmenuTrigger };

export namespace SubmenuTrigger {
  export type State = ContextMenuSubmenuTriggerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ContextMenuSubmenuTriggerProps.Render;

    export type SuruUI = ContextMenuSubmenuTriggerProps.SuruUI;

    export type BaseUI = ContextMenuSubmenuTriggerProps.BaseUI;

    export type HTML = ContextMenuSubmenuTriggerProps.HTML;
  }

  export type Color = ContextMenuSubmenuTriggerColor;

  export type Radius = ContextMenuSubmenuTriggerRadius;

  export type Variant = ContextMenuSubmenuTriggerVariant;
}
