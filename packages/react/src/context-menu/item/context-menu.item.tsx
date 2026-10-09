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
import { useContextMenuContext } from "../root/context-menu.root.context.js";
import { ContextMenuItemContext } from "./context-menu.item.context.js";

/**
 * コンテキストメニューの操作項目の配色です。
 */
export type ContextMenuItemColor = Button.Root.Color;

/**
 * コンテキストメニューの操作項目の角丸です。
 */
export type ContextMenuItemRadius = Button.Root.Radius;

/**
 * コンテキストメニューの操作項目の主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type ContextMenuItemVariant = Button.Root.Variant;

/**
 * {@link ContextMenuItem} が持つ状態です。
 *
 * @template TItem 項目の型です。
 */
export type ContextMenuItemState<TItem = any> = ContextMenuItemContext<TItem>;

export namespace ContextMenuItemProps {
  export type Render<TItem = any> = RenderProps<ContextMenuItemState<TItem>>;

  export type SuruUI = {
    /**
     * 項目の配色を指定します。
     *
     * @default "grey"
     */
    color?: ContextMenuItemColor | undefined;

    /**
     * 項目の角丸を指定します。
     *
     * 既定値は {@link ContextMenuRootProps.radius|radius} です。
     */
    radius?: ContextMenuItemRadius | undefined;

    /**
     * 項目の主な外観を指定します。
     *
     * 既定値は {@link ContextMenuRootProps.variant|variant} です。
     */
    variant?: ContextMenuItemVariant | undefined;
  };

  export type BaseUI = Override<
    Button.Root.Props.BaseUI,
    Omit<
      Pick<
        React.ComponentProps<typeof ContextMenu.Item>,
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
    React.ComponentProps<typeof ContextMenu.Item>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ContextMenuItem} に渡す props です。
 */
export type ContextMenuItemProps = ContextMenuItemProps.Render &
  ContextMenuItemProps.SuruUI &
  ContextMenuItemProps.BaseUI &
  ContextMenuItemProps.HTML;

export type IContextMenuItem = IComponent<ContextMenuItemProps>;

/**
 * コンテキストメニューの操作項目です。
 */
export const ContextMenuItem: IContextMenuItem = function SuiContextMenuItem(props) {
  const ctx = useContextMenuContext();
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
  const baseuiProps: Required<ContextMenuItemProps.BaseUI> = {
    id,
    label,
    onClick,
    disabled,
    closeOnClick,
    nativeButton,
    focusableWhenDisabled,
  };

  return (
    <ContextMenu.Item
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
              proxyRenderProps<Button.Root.State, ContextMenuItemState>(
                (state) => ({ ...ctx, ...state, ...itemState }),
                {
                  style,
                  render: (htmlProps, state) => (
                    <ContextMenuItemContext value={state}>
                      <RenderElement
                        state={state}
                        render={render ?? <div />}
                        htmlProps={htmlProps}
                        defaultTagName="div"
                      />
                    </ContextMenuItemContext>
                  ),
                  className: cn<ContextMenuItemState>(
                    className,
                    "sui_context_menu_item",
                    (state) => state.disabled && "sui_context_menu_item-disabled",
                    (state) => state.highlighted && "sui_context_menu_item-highlighted",
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

export { ContextMenuItem as Item };

export namespace Item {
  export type State<TItem = any> = ContextMenuItemState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = ContextMenuItemProps.Render<TItem>;

    export type SuruUI = ContextMenuItemProps.SuruUI;

    export type BaseUI = ContextMenuItemProps.BaseUI;

    export type HTML = ContextMenuItemProps.HTML;
  }

  export type Color = ContextMenuItemColor;

  export type Radius = ContextMenuItemRadius;

  export type Variant = ContextMenuItemVariant;
}
