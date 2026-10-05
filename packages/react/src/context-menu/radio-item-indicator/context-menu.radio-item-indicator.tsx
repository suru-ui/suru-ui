import { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import {
  type ContextMenuContext,
  useContextMenuContext,
} from "../root/context-menu.root.context.js";

/**
 * {@link ContextMenuRadioItemIndicator} が持つ状態です。
 */
export type ContextMenuRadioItemIndicatorState = Override<
  ContextMenuContext,
  ContextMenu.RadioItemIndicator.State
>;

export namespace ContextMenuRadioItemIndicatorProps {
  export type Render = RenderProps<ContextMenuRadioItemIndicatorState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof ContextMenu.RadioItemIndicator>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MenuRadioItemIndicatorProps:
      "keepMounted",
      keyof Render | keyof SuruUI
    >
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

/**
 * 選択されたラジオ項目を示す要素です。
 */
export const ContextMenuRadioItemIndicator: IContextMenuRadioItemIndicator =
  function SuiContextMenuRadioItemIndicator(props) {
    const ctx = useContextMenuContext();
    const { style, render, className, keepMounted = true, ...otherProps } = props;

    return (
      <ContextMenu.RadioItemIndicator
        {...otherProps}
        {...proxyRenderProps<
          ContextMenu.RadioItemIndicator.State,
          ContextMenuRadioItemIndicatorState
        >((state) => ({ ...ctx, ...state }), {
          style,
          render,
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
        })}
        keepMounted={keepMounted}
      />
    );
  };

export { ContextMenuRadioItemIndicator as RadioItemIndicator };

export namespace RadioItemIndicator {
  export type State = ContextMenuRadioItemIndicatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ContextMenuRadioItemIndicatorProps.Render;

    export type SuruUI = ContextMenuRadioItemIndicatorProps.SuruUI;

    export type BaseUI = ContextMenuRadioItemIndicatorProps.BaseUI;

    export type HTML = ContextMenuRadioItemIndicatorProps.HTML;
  }
}
