import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useComboboxInputGroupContext } from "../input-group/combobox.input-group.context.js";
import { ComboboxInputContext } from "./combobox.input.context.js";

/**
 * {@link ComboboxInput} の状態です。
 */
export type ComboboxInputState = ComboboxInputContext;

export namespace ComboboxInputProps {
  export type Render = RenderProps<ComboboxInputState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Combobox.Input>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // ComboboxInputProps より:
      "disabled"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Input>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxInput} に渡す props です。
 */
export type ComboboxInputProps = ComboboxInputProps.Render &
  ComboboxInputProps.SuruUI &
  ComboboxInputProps.BaseUI &
  ComboboxInputProps.HTML;

export type IComboboxInput = IComponent<ComboboxInputProps>;

/**
 * 候補を検索するテキスト入力欄です。
 */
export const ComboboxInput: IComboboxInput = function SuiComboboxInput(props) {
  const ctx = useComboboxInputGroupContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Combobox.Input
      {...otherProps}
      {...proxyRenderProps<Combobox.Input.State, ComboboxInputState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <ComboboxInputContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="input"
              />
            </ComboboxInputContext>
          ),
          className: cn<ComboboxInputState>(
            className,
            "sui_combobox_input",
            (state) => `sui_combobox_input-size_${state.size}`,
            (state) => `sui_combobox_input-color_${state.color}`,
            (state) => `sui_combobox_input-radius_${state.radius}`,
            (state) => `sui_combobox_input-variant_${state.variant}`,
            (state) => state.outlined && "sui_combobox_input-outlined",
            (state) => state.multiple && "sui_combobox_input-multiple",
            (state) => state.disabled && "sui_combobox_input-disabled",
            (state) => state.readOnly && "sui_combobox_input-readonly",
            (state) => state.open && "sui_combobox_input-open",
            (state) => state.listEmpty && "sui_combobox_input-list_empty",
            (state) => state.touched && "sui_combobox_input-touched",
            (state) => state.dirty && "sui_combobox_input-dirty",
            (state) => state.filled && "sui_combobox_input-filled",
            (state) => state.focused && "sui_combobox_input-focused",
            (state) => state.valid === false && "sui_combobox_input-invalid",
            (state) => state.valid === true && "sui_combobox_input-valid",
            (state) => state.valid === null && "sui_combobox_input-unverified",
            (state) =>
              state.popupSide !== null &&
              `sui_combobox_input-popup_side_${state.popupSide.replaceAll("-", "_")}`,
          ),
        },
      )}
    />
  );
};

export { ComboboxInput as Input };

export namespace Input {
  export type State = ComboboxInputState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ComboboxInputProps.Render;

    export type SuruUI = ComboboxInputProps.SuruUI;

    export type BaseUI = ComboboxInputProps.BaseUI;

    export type HTML = ComboboxInputProps.HTML;
  }
}
