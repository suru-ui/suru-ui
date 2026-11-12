import { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useContextMenuContext } from "../root/context-menu.root.context.js";
import { ContextMenuRadioItemIndicatorContext } from "./context-menu.radio-item-indicator.context.js";

/**
 * {@link ContextMenuRadioItemIndicator} が持つ状態です。
 *
 * @template TItem 項目の型です。
 */
export type ContextMenuRadioItemIndicatorState<TItem = any> =
  ContextMenuRadioItemIndicatorContext<TItem>;

export namespace ContextMenuRadioItemIndicatorProps {
  export type Render<TItem = any> = RenderProps<ContextMenuRadioItemIndicatorState<TItem>>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof ContextMenu.RadioItemIndicator>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // MenuRadioItemIndicatorProps より :
      "keepMounted"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof ContextMenu.RadioItemIndicator>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ContextMenuRadioItemIndicator} に渡す props です。
 */
export type ContextMenuRadioItemIndicatorProps = ContextMenuRadioItemIndicatorProps.Render &
  ContextMenuRadioItemIndicatorProps.SuruUI &
  ContextMenuRadioItemIndicatorProps.BaseUI &
  ContextMenuRadioItemIndicatorProps.HTML;

export type IContextMenuRadioItemIndicator = IComponent<ContextMenuRadioItemIndicatorProps>;

/** 選択されたラジオ項目を示す要素です。 */
export const ContextMenuRadioItemIndicator: IContextMenuRadioItemIndicator = (props) => {
  const ctx = useContextMenuContext();
  const { style, render, className, keepMounted = true, ...otherProps } = props;

  return (
    <ContextMenu.RadioItemIndicator
      {...otherProps}
      {...proxyRenderProps<
        ContextMenu.RadioItemIndicator.State,
        ContextMenuRadioItemIndicatorState
      >(
        (state) => ({
          ...ctx,
          ...state,
        }),
        {
          style,
          render: (htmlProps, state) => (
            <ContextMenuRadioItemIndicatorContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="span"
              />
            </ContextMenuRadioItemIndicatorContext>
          ),
          className: cn<ContextMenuRadioItemIndicatorState>(
            className,
            "sui_context_menu_item_indicator",
            "sui_context_menu_radio_item_indicator",
            (state) => !state.checked && "sui_context_menu_item_indicator-unchecked",
            (state) => `sui_context_menu_item_indicator-size_${state.size}`,
            (state) => `sui_context_menu_item_indicator-radius_${state.radius}`,
            (state) => `sui_context_menu_item_indicator-variant_${state.variant}`,
            (state) => state.outlined && "sui_context_menu_item_indicator-outlined",
            (state) => state.disabled && "sui_context_menu_item_indicator-disabled",
            (state) => state.highlighted && "sui_context_menu_item_indicator-highlighted",
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_context_menu_item_indicator-transition_status_${state.transitionStatus}`,
          ),
        },
      )}
      keepMounted={keepMounted}
    />
  );
};

export { ContextMenuRadioItemIndicator as RadioItemIndicator };
export namespace RadioItemIndicator {
  export type State<TItem = any> = ContextMenuRadioItemIndicatorState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = ContextMenuRadioItemIndicatorProps.Render<TItem>;

    export type SuruUI = ContextMenuRadioItemIndicatorProps.SuruUI;

    export type BaseUI = ContextMenuRadioItemIndicatorProps.BaseUI;

    export type HTML = ContextMenuRadioItemIndicatorProps.HTML;
  }
}
