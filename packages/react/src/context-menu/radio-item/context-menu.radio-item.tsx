import { ContextMenu } from "@base-ui/react/context-menu";
import type { NonNativeButtonProps } from "@base-ui/react/internals/types";
import * as React from "react";

import mergeProps from "../../_merge-props.js";
import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import * as Button from "../../button/button.parts.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { getItemVariant } from "../_context-menu.utils.jsx";
import { useContextMenuContext } from "../root/context-menu.root.context.js";
import { ContextMenuRadioItemContext } from "./context-menu.radio-item.context.js";

/**
 * ラジオ項目の配色です。
 */
export type ContextMenuRadioItemColor = Button.Root.Color;

/**
 * ラジオ項目の角丸です。
 */
export type ContextMenuRadioItemRadius = Button.Root.Radius;

/**
 * ラジオ項目の主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type ContextMenuRadioItemVariant = Button.Root.Variant;

/**
 * {@link ContextMenuRadioItem} が持つ状態です。
 */
export type ContextMenuRadioItemState = ContextMenuRadioItemContext;

export namespace ContextMenuRadioItemProps {
  export type Render = RenderProps<ContextMenuRadioItemState>;

  export type SuruUI = {
    /**
     * 項目の配色を指定します。
     *
     * @default "grey"
     */
    color?: ContextMenuRadioItemColor | undefined;

    /**
     * 項目の角丸を指定します。
     *
     * 既定値は {@link ContextMenuRootProps.radius|radius} です。
     */
    radius?: ContextMenuRadioItemRadius | undefined;

    /**
     * チェック状態のときの外観を指定します。
     *
     * チェックされていないときは常に `"naked"` になります。
     *
     * 既定値は {@link ContextMenuRootProps.variant|variant} です。
     */
    variant?: ContextMenuRadioItemVariant | undefined;
  };

  export type BaseUI = Override<
    Button.Root.Props.BaseUI,
    Pick<
      React.ComponentProps<typeof ContextMenu.RadioItem>,
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
    React.ComponentProps<typeof ContextMenu.RadioItem>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ContextMenuRadioItem} に渡す props です。
 */
export type ContextMenuRadioItemProps = ContextMenuRadioItemProps.Render &
  ContextMenuRadioItemProps.SuruUI &
  ContextMenuRadioItemProps.BaseUI &
  ContextMenuRadioItemProps.HTML;

export type IContextMenuRadioItem = IComponent<ContextMenuRadioItemProps>;

/**
 * ラジオグループ内のコンテキストメニュー項目です。
 */
export const ContextMenuRadioItem: IContextMenuRadioItem = function SuiContextMenuRadioItem(props) {
  const ctx = useContextMenuContext();
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
  const baseuiProps: Required<ContextMenuRadioItemProps.BaseUI> = {
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
    <ContextMenu.RadioItem
      {...otherProps}
      {...baseuiProps}
      render={(htmlProps: {}, itemState) => {
        const buttonRootProps: Required<Button.Root.Props.SuruUI & Button.Root.Props.BaseUI> &
          Pick<Button.Root.Props.HTML, "disabled"> = {
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
              proxyRenderProps<Button.Root.State, ContextMenuRadioItemState>(
                (state) => ({ ...ctx, ...state, ...itemState }),
                {
                  style,
                  render: (htmlProps, state) => (
                    <ContextMenuRadioItemContext value={state}>
                      <RenderElement
                        state={state}
                        render={render ?? <div />}
                        htmlProps={htmlProps}
                        defaultTagName="div"
                      />
                    </ContextMenuRadioItemContext>
                  ),
                  className: cn<ContextMenuRadioItemState>(
                    className,
                    "sui_context_menu_item",
                    "sui_context_menu_radio_item",
                    (state) => state.checked && "sui_context_menu_item-checked",
                    (state) => state.highlighted && "sui_context_menu_item-highlighted",
                    (state) => state.disabled && "sui_context_menu_item-disabled",
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

export { ContextMenuRadioItem as RadioItem };

export namespace RadioItem {
  export type State = ContextMenuRadioItemState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ContextMenuRadioItemProps.Render;

    export type SuruUI = ContextMenuRadioItemProps.SuruUI;

    export type BaseUI = ContextMenuRadioItemProps.BaseUI;

    export type HTML = ContextMenuRadioItemProps.HTML;
  }

  export type Color = ContextMenuRadioItemColor;

  export type Radius = ContextMenuRadioItemRadius;

  export type Variant = ContextMenuRadioItemVariant;
}
