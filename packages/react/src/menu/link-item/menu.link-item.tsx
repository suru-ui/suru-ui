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
import { MenuLinkItemContext } from "./menu.link-item.context.js";

/**
 * メニューのリンク項目の配色です。
 */
export type MenuLinkItemColor = Button.Root.Color;

/**
 * メニューのリンク項目の角丸です。
 */
export type MenuLinkItemRadius = Button.Root.Radius;

/**
 * メニューのリンク項目の主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type MenuLinkItemVariant = Button.Root.Variant;

/**
 * {@link MenuLinkItem} が持つ状態です。
 */
export type MenuLinkItemState = MenuLinkItemContext;

export namespace MenuLinkItemProps {
  export type Render = RenderProps<MenuLinkItemState>;

  export type SuruUI = {
    /**
     * 項目の配色を指定します。
     *
     * @default "grey"
     */
    color?: MenuLinkItemColor | undefined;

    /**
     * リンクを無効にするかどうかを指定します。
     *
     * `true` の場合、リンク先へ遷移できなくなります。
     *
     * @default false
     */
    disabled?: boolean | undefined;

    /**
     * 項目の角丸を指定します。
     *
     * 既定値は {@link MenuRootProps.radius|radius} です。
     */
    radius?: MenuLinkItemRadius | undefined;

    /**
     * 項目の主な外観を指定します。
     *
     * 既定値は {@link MenuRootProps.variant|variant} です。
     */
    variant?: MenuLinkItemVariant | undefined;
  };

  export type BaseUI = Override<
    Button.Root.Props.BaseUI,
    Pick<
      React.ComponentProps<typeof Menu.LinkItem>,
      Exclude<
        // Base UI の型を確認して取り出すプロパティーを決めます。
        // MenuLinkItemProps:
        "label" | "id" | "closeOnClick",
        keyof Render | keyof SuruUI
      >
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Menu.LinkItem>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MenuLinkItem} に渡す props です。
 */
export type MenuLinkItemProps = MenuLinkItemProps.Render &
  MenuLinkItemProps.SuruUI &
  MenuLinkItemProps.BaseUI &
  MenuLinkItemProps.HTML;

export type IMenuLinkItem = IComponent<MenuLinkItemProps>;

/**
 * 別のページやセクションへ移動するメニュー項目です。
 */
export const MenuLinkItem: IMenuLinkItem = function SuiMenuLinkItem(props) {
  const ctx = useMenuContext();
  const {
    id,
    color = "grey",
    label,
    style,
    radius = ctx.radius,
    // oxlint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid
    render = <a />,
    variant = ctx.variant,
    disabled,
    className,
    closeOnClick,
    nativeButton = false,
    focusableWhenDisabled,
    ...otherProps
  } = props;
  const baseuiProps: Required<MenuLinkItemProps.BaseUI> = {
    id,
    label,
    closeOnClick,
    nativeButton,
    focusableWhenDisabled,
  };

  return (
    <Menu.LinkItem
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
          disabled,
          outlined: undefined,
          nativeButton,
          focusableWhenDisabled,
        };

        return (
          <Button.Root
            {...mergeProps<typeof Button.Root>([
              htmlProps,
              buttonRootProps,
              proxyRenderProps<Button.Root.State, MenuLinkItemState>(
                (state) => ({ ...ctx, ...state, ...itemState }),
                {
                  style,
                  // oxlint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid
                  render: (htmlProps, state) => (
                    <MenuLinkItemContext value={state}>
                      <RenderElement
                        state={state}
                        render={render}
                        htmlProps={htmlProps}
                        defaultTagName="a"
                      />
                    </MenuLinkItemContext>
                  ),
                  className: cn<MenuLinkItemState>(
                    className,
                    "sui_menu_item",
                    "sui_menu_link_item",
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

export { MenuLinkItem as LinkItem };

export namespace LinkItem {
  export type State = MenuLinkItemState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MenuLinkItemProps.Render;

    export type SuruUI = MenuLinkItemProps.SuruUI;

    export type BaseUI = MenuLinkItemProps.BaseUI;

    export type HTML = MenuLinkItemProps.HTML;
  }

  export type Color = MenuLinkItemColor;

  export type Radius = MenuLinkItemRadius;

  export type Variant = MenuLinkItemVariant;
}
