import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import { CheckIcon } from "../../_icons.jsx";
import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useComboboxContext } from "../root/combobox.root.context.js";
import { ComboboxItemIndicatorContext } from "./combobox.item-indicator.context.js";

/**
 * {@link ComboboxItemIndicator} の状態です。
 */
export type ComboboxItemIndicatorState = ComboboxItemIndicatorContext;

export namespace ComboboxItemIndicatorProps {
  export type Render = RenderProps<ComboboxItemIndicatorState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Combobox.ItemIndicator>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ComboboxItemIndicatorProps:
      "keepMounted",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.ItemIndicator>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxItemIndicator} に渡す props です。
 */
export type ComboboxItemIndicatorProps = ComboboxItemIndicatorProps.Render &
  ComboboxItemIndicatorProps.SuruUI &
  ComboboxItemIndicatorProps.BaseUI &
  ComboboxItemIndicatorProps.HTML;

export type IComboboxItemIndicator = IComponent<ComboboxItemIndicatorProps>;

/**
 * 項目が選択されていることを示す要素です。
 */
export const ComboboxItemIndicator: IComboboxItemIndicator = function SuiComboboxItemIndicator(
  props,
) {
  const ctx = useComboboxContext();
  const { style, render, children = <CheckIcon />, className, ...otherProps } = props;

  return (
    <Combobox.ItemIndicator
      {...otherProps}
      {...proxyRenderProps<Combobox.ItemIndicator.State, ComboboxItemIndicatorState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <ComboboxItemIndicatorContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="span"
              />
            </ComboboxItemIndicatorContext>
          ),
          className: cn<ComboboxItemIndicatorState>(
            className,
            "sui_combobox_item_indicator",
            (state) => `sui_combobox_item_indicator-size_${state.size}`,
            (state) => `sui_combobox_item_indicator-color_${state.color}`,
            (state) => `sui_combobox_item_indicator-radius_${state.radius}`,
            (state) => `sui_combobox_item_indicator-variant_${state.variant}`,
            (state) => state.outlined && "sui_combobox_item_indicator-outlined",
            (state) => state.multiple && "sui_combobox_item_indicator-multiple",
            (state) => state.selected && "sui_combobox_item_indicator-selected",
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_combobox_item_indicator-transition_status_${state.transitionStatus}`,
          ),
        },
      )}
    >
      {children}
    </Combobox.ItemIndicator>
  );
};

export { ComboboxItemIndicator as ItemIndicator };

export namespace ItemIndicator {
  export type State = ComboboxItemIndicatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxItemIndicatorProps.Render;

    export type SuruUI = ComboboxItemIndicatorProps.SuruUI;

    export type BaseUI = ComboboxItemIndicatorProps.BaseUI;

    export type HTML = ComboboxItemIndicatorProps.HTML;
  }
}
