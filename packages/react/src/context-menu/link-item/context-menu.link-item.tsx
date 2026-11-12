import { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import mergeProps from "../../_merge-props.js";
import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import * as Button from "../../button/button.parts.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { useContextMenuContext } from "../root/context-menu.root.context.js";
import { ContextMenuLinkItemContext } from "./context-menu.link-item.context.js";

/** コンテキストメニューのリンク項目の配色です。 */
export type ContextMenuLinkItemColor = Button.Root.Color;

/** コンテキストメニューのリンク項目の角丸です。 */
export type ContextMenuLinkItemRadius = Button.Root.Radius;

/**
 * コンテキストメニューのリンク項目の主な外観です。
 *
 * - `"solid"`: 塗りつぶし
 * - `"naked"`: 背景なし
 * - `"liquid"`: 薄い塗りつぶし
 */
export type ContextMenuLinkItemVariant = Button.Root.Variant;

/**
 * {@link ContextMenuLinkItem} が持つ状態です。
 *
 * @template TItem 項目の型です。
 */
export type ContextMenuLinkItemState<TItem = any> = ContextMenuLinkItemContext<TItem>;

export namespace ContextMenuLinkItemProps {
  export type Render<TItem = any> = RenderProps<ContextMenuLinkItemState<TItem>>;

  export type SuruUI = {
    /**
     * 項目の配色を指定します。
     *
     * @default "grey"
     */
    color?: ContextMenuLinkItemColor | undefined;

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
     * 既定値は {@link ContextMenuRootProps.radius|radius} です。
     */
    radius?: ContextMenuLinkItemRadius | undefined;

    /**
     * 項目の主な外観を指定します。
     *
     * 既定値は {@link ContextMenuRootProps.variant|variant} です。
     */
    variant?: ContextMenuLinkItemVariant | undefined;
  };

  export type BaseUI = Override<
    Button.Root.Props.BaseUI,
    Omit<
      Pick<
        React.ComponentProps<typeof ContextMenu.LinkItem>,
        // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
        // MenuLinkItemProps より :
        "label" | "id" | "closeOnClick"
      >,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof ContextMenu.LinkItem>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ContextMenuLinkItem} に渡す props です。
 */
export type ContextMenuLinkItemProps = ContextMenuLinkItemProps.Render &
  ContextMenuLinkItemProps.SuruUI &
  ContextMenuLinkItemProps.BaseUI &
  ContextMenuLinkItemProps.HTML;

export type IContextMenuLinkItem = IComponent<ContextMenuLinkItemProps>;

/** 別のページやセクションへ移動するコンテキストメニュー項目です。 */
export const ContextMenuLinkItem: IContextMenuLinkItem = (props) => {
  const ctx = useContextMenuContext();
  const {
    id,
    color = "grey",
    label,
    style,
    radius = ctx.radius,
    render,
    variant = ctx.variant,
    disabled,
    className,
    closeOnClick,
    nativeButton = false,
    focusableWhenDisabled,
    ...otherProps
  } = props;
  const baseuiProps: Required<ContextMenuLinkItemProps.BaseUI> = {
    id,
    label,
    closeOnClick,
    nativeButton,
    focusableWhenDisabled,
  };

  return (
    <ContextMenu.LinkItem
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
              proxyRenderProps<Button.Root.State, ContextMenuLinkItemState>(
                (state) => ({
                  ...ctx,
                  ...state,
                  ...itemState,
                }),
                {
                  style,
                  render: (currentHtmlProps, state) => (
                    <ContextMenuLinkItemContext value={state}>
                      <RenderElement
                        state={state}
                        render={render}
                        htmlProps={currentHtmlProps}
                        defaultTagName="a"
                      />
                    </ContextMenuLinkItemContext>
                  ),
                  className: cn<ContextMenuLinkItemState>(
                    className,
                    "sui_context_menu_item",
                    "sui_context_menu_link_item",
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

export { ContextMenuLinkItem as LinkItem };
export namespace LinkItem {
  export type State<TItem = any> = ContextMenuLinkItemState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = ContextMenuLinkItemProps.Render<TItem>;

    export type SuruUI = ContextMenuLinkItemProps.SuruUI;

    export type BaseUI = ContextMenuLinkItemProps.BaseUI;

    export type HTML = ContextMenuLinkItemProps.HTML;
  }

  export type Color = ContextMenuLinkItemColor;

  export type Radius = ContextMenuLinkItemRadius;

  export type Variant = ContextMenuLinkItemVariant;
}
