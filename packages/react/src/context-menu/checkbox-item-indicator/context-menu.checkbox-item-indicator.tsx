import { ContextMenu } from "@base-ui/react/context-menu";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useContextMenuContext } from "../root/context-menu.root.context.js";
import { ContextMenuCheckboxItemIndicatorContext } from "./context-menu.checkbox-item-indicator.context.js";

/**
 * {@link ContextMenuCheckboxItemIndicator} が持つ状態です。
 */
export type ContextMenuCheckboxItemIndicatorState = ContextMenuCheckboxItemIndicatorContext;

export namespace ContextMenuCheckboxItemIndicatorProps {
  export type Render = RenderProps<ContextMenuCheckboxItemIndicatorState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof ContextMenu.CheckboxItemIndicator>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MenuCheckboxItemIndicatorProps:
      "keepMounted",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof ContextMenu.CheckboxItemIndicator>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ContextMenuCheckboxItemIndicator} に渡す props です。
 */
export type ContextMenuCheckboxItemIndicatorProps = ContextMenuCheckboxItemIndicatorProps.Render &
  ContextMenuCheckboxItemIndicatorProps.SuruUI &
  ContextMenuCheckboxItemIndicatorProps.BaseUI &
  ContextMenuCheckboxItemIndicatorProps.HTML;

export type IContextMenuCheckboxItemIndicator = IComponent<ContextMenuCheckboxItemIndicatorProps>;

/**
 * チェックされた項目を示す要素です。
 */
export const ContextMenuCheckboxItemIndicator: IContextMenuCheckboxItemIndicator =
  function SuiContextMenuCheckboxItemIndicator(props) {
    const ctx = useContextMenuContext();
    const { style, render, className, ...otherProps } = props;

    return (
      <ContextMenu.CheckboxItemIndicator
        {...otherProps}
        {...proxyRenderProps<
          ContextMenu.CheckboxItemIndicator.State,
          ContextMenuCheckboxItemIndicatorState
        >((state) => ({ ...ctx, ...state }), {
          style,
          render: (htmlProps, state) => (
            <ContextMenuCheckboxItemIndicatorContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="span"
              />
            </ContextMenuCheckboxItemIndicatorContext>
          ),
          className: cn<ContextMenuCheckboxItemIndicatorState>(
            className,
            "sui_context_menu_item_indicator",
            "sui_context_menu_checkbox_item_indicator",
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
      />
    );
  };

export { ContextMenuCheckboxItemIndicator as CheckboxItemIndicator };

export namespace CheckboxItemIndicator {
  export type State = ContextMenuCheckboxItemIndicatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ContextMenuCheckboxItemIndicatorProps.Render;

    export type SuruUI = ContextMenuCheckboxItemIndicatorProps.SuruUI;

    export type BaseUI = ContextMenuCheckboxItemIndicatorProps.BaseUI;

    export type HTML = ContextMenuCheckboxItemIndicatorProps.HTML;
  }
}
