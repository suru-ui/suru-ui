import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useComboboxContext } from "../root/combobox.root.context.js";
import { ComboboxTriggerLabelContext } from "./combobox.trigger-label.context.js";

/**
 * {@link ComboboxTriggerLabel} の状態です。
 *
 * @template TItem 項目の型です。
 */
export type ComboboxTriggerLabelState<TItem = any> = ComboboxTriggerLabelContext<TItem>;

export namespace ComboboxTriggerLabelProps {
  export type Render<TItem = any> = RenderProps<ComboboxTriggerLabelState<TItem>>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Combobox.Label>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // ComboboxTriggerLabelProps より:
      never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.Label>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxTriggerLabel} に渡す props です。
 */
export type ComboboxTriggerLabelProps = ComboboxTriggerLabelProps.Render &
  ComboboxTriggerLabelProps.SuruUI &
  ComboboxTriggerLabelProps.BaseUI &
  ComboboxTriggerLabelProps.HTML;

export type IComboboxTriggerLabel = IComponent<ComboboxTriggerLabelProps>;

/**
 * トリガーに対応する表示ラベルです。
 */
export const ComboboxTriggerLabel: IComboboxTriggerLabel = function SuiComboboxTriggerLabel(props) {
  const ctx = useComboboxContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Combobox.Label
      {...otherProps}
      {...proxyRenderProps<Combobox.Label.State, ComboboxTriggerLabelState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <ComboboxTriggerLabelContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </ComboboxTriggerLabelContext>
          ),
          className: cn<ComboboxTriggerLabelState>(
            className,
            "sui_combobox_trigger_label",
            (state) => state.disabled && "sui_combobox_trigger_label-disabled",
            (state) => `sui_combobox_trigger_label-size_${state.size}`,
            (state) => `sui_combobox_trigger_label-color_${state.color}`,
            (state) => `sui_combobox_trigger_label-radius_${state.radius}`,
            (state) => `sui_combobox_trigger_label-variant_${state.variant}`,
            (state) => state.outlined && "sui_combobox_trigger_label-outlined",
            (state) => state.multiple && "sui_combobox_trigger_label-multiple",
            (state) => state.touched && "sui_combobox_trigger_label-touched",
            (state) => state.dirty && "sui_combobox_trigger_label-dirty",
            (state) => state.valid === false && "sui_combobox_trigger_label-invalid",
            (state) => state.valid === true && "sui_combobox_trigger_label-valid",
            (state) => state.valid === null && "sui_combobox_trigger_label-unverified",
            (state) => state.filled && "sui_combobox_trigger_label-filled",
            (state) => state.focused && "sui_combobox_trigger_label-focused",
          ),
        },
      )}
    />
  );
};

export { ComboboxTriggerLabel as TriggerLabel };

export namespace TriggerLabel {
  export type State<TItem = any> = ComboboxTriggerLabelState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = ComboboxTriggerLabelProps.Render<TItem>;

    export type SuruUI = ComboboxTriggerLabelProps.SuruUI;

    export type BaseUI = ComboboxTriggerLabelProps.BaseUI;

    export type HTML = ComboboxTriggerLabelProps.HTML;
  }
}
