import { Combobox } from "@base-ui/react/combobox";
import type { NativeButtonProps } from "@base-ui/react/internals/types";
import * as React from "react";

import { ClearIcon } from "../../_icons.jsx";
import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useComboboxContext } from "../root/combobox.root.context.js";
import { ComboboxClearContext } from "./combobox.clear.context.js";

/**
 * {@link ComboboxClear} の状態です。
 */
export type ComboboxClearState = ComboboxClearContext;

export namespace ComboboxClearProps {
  export type Render = RenderProps<ComboboxClearState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Combobox.Clear>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // NativeButtonProps より:
      | keyof NativeButtonProps
      // ComboboxClearProps より:
      | "disabled"
      | "keepMounted"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Clear>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxClear} に渡す props です。
 */
export type ComboboxClearProps = ComboboxClearProps.Render &
  ComboboxClearProps.SuruUI &
  ComboboxClearProps.BaseUI &
  ComboboxClearProps.HTML;

export type IComboboxClear = IComponent<ComboboxClearProps>;

/**
 * 選択値を消去するボタン要素です。
 */
export const ComboboxClear: IComboboxClear = function SuiComboboxClear(props) {
  const ctx = useComboboxContext();
  const {
    style,
    render,
    children = <ClearIcon />,
    className,
    "aria-label": ariaLabel = "選択値を消去",
    ...otherProps
  } = props;

  return (
    <Combobox.Clear
      {...otherProps}
      {...proxyRenderProps<Combobox.Clear.State, ComboboxClearState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <ComboboxClearContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="button"
              />
            </ComboboxClearContext>
          ),
          className: cn<ComboboxClearState>(
            className,
            "sui_combobox_clear",
            (state) => `sui_combobox_clear-size_${state.size}`,
            (state) => `sui_combobox_clear-color_${state.color}`,
            (state) => `sui_combobox_clear-radius_${state.radius}`,
            (state) => `sui_combobox_clear-variant_${state.variant}`,
            (state) => state.outlined && "sui_combobox_clear-outlined",
            (state) => state.multiple && "sui_combobox_clear-multiple",
            (state) => state.disabled && "sui_combobox_clear-disabled",
            (state) => state.open && "sui_combobox_clear-open",
            (state) => state.visible && "sui_combobox_clear-visible",
            (state) =>
              state.transitionStatus !== undefined &&
              `sui_combobox_clear-transition_status_${state.transitionStatus}`,
          ),
        },
      )}
      aria-label={ariaLabel}
    >
      {children}
    </Combobox.Clear>
  );
};

export { ComboboxClear as Clear };

export namespace Clear {
  export type State = ComboboxClearState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxClearProps.Render;

    export type SuruUI = ComboboxClearProps.SuruUI;

    export type BaseUI = ComboboxClearProps.BaseUI;

    export type HTML = ComboboxClearProps.HTML;
  }
}
