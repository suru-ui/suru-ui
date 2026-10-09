import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import { ChevronIcon } from "../../_icons.jsx";
import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useComboboxAddonContext } from "../addon/combobox.addon.context.js";
import { ComboboxIconContext } from "./combobox.icon.context.js";

/**
 * {@link ComboboxIcon} の状態です。
 *
 * @template TItem 項目の型です。
 */
export type ComboboxIconState<TItem = any> = ComboboxIconContext<TItem>;

export namespace ComboboxIconProps {
  export type Render<TItem = any> = RenderProps<ComboboxIconState<TItem>>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Combobox.Icon>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // ComboboxIconProps より:
      never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Icon>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxIcon} に渡す props です。
 */
export type ComboboxIconProps = ComboboxIconProps.Render &
  ComboboxIconProps.SuruUI &
  ComboboxIconProps.BaseUI &
  ComboboxIconProps.HTML;

export type IComboboxIcon = IComponent<ComboboxIconProps>;

/**
 * トリガーの操作を示すアイコンのラッパー要素です。
 */
export const ComboboxIcon: IComboboxIcon = function SuiComboboxIcon(props) {
  const ctx = useComboboxAddonContext();
  const { style, render, children = <ChevronIcon />, className, ...otherProps } = props;

  return (
    <Combobox.Icon
      {...otherProps}
      {...proxyRenderProps<Combobox.Icon.State, ComboboxIconState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <ComboboxIconContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="span"
              />
            </ComboboxIconContext>
          ),
          className: cn<ComboboxIconState>(
            className,
            "sui_combobox_icon",
            (state) => `sui_combobox_icon-size_${state.size}`,
            (state) => `sui_combobox_icon-color_${state.color}`,
            (state) => `sui_combobox_icon-radius_${state.radius}`,
            (state) => `sui_combobox_icon-variant_${state.variant}`,
            (state) => state.outlined && "sui_combobox_icon-outlined",
            (state) => state.multiple && "sui_combobox_icon-multiple",
          ),
        },
      )}
    >
      {children}
    </Combobox.Icon>
  );
};

export { ComboboxIcon as Icon };

export namespace Icon {
  export type State<TItem = any> = ComboboxIconState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = ComboboxIconProps.Render<TItem>;

    export type SuruUI = ComboboxIconProps.SuruUI;

    export type BaseUI = ComboboxIconProps.BaseUI;

    export type HTML = ComboboxIconProps.HTML;
  }
}
