import { Combobox } from "@base-ui/react/combobox";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useComboboxGroupContext } from "../group/combobox.group.context.js";
import { ComboboxGroupLabelContext } from "./combobox.group-label.context.js";

/**
 * {@link ComboboxGroupLabel} の状態です。
 *
 * @template TItem 項目の型です。
 */
export type ComboboxGroupLabelState<TItem = any> = ComboboxGroupLabelContext<TItem>;

export namespace ComboboxGroupLabelProps {
  export type Render<TItem = any> = RenderProps<ComboboxGroupLabelState<TItem>>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Combobox.GroupLabel>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // ComboboxGroupLabelProps より:
      never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Combobox.GroupLabel>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ComboboxGroupLabel} に渡す props です。
 */
export type ComboboxGroupLabelProps = ComboboxGroupLabelProps.Render &
  ComboboxGroupLabelProps.SuruUI &
  ComboboxGroupLabelProps.BaseUI &
  ComboboxGroupLabelProps.HTML;

export type IComboboxGroupLabel = IComponent<ComboboxGroupLabelProps>;

/**
 * 候補グループの見出し要素です。
 */
export const ComboboxGroupLabel: IComboboxGroupLabel = function SuiComboboxGroupLabel(props) {
  const ctx = useComboboxGroupContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Combobox.GroupLabel
      {...otherProps}
      {...proxyRenderProps<Combobox.GroupLabel.State, ComboboxGroupLabelState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <ComboboxGroupLabelContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </ComboboxGroupLabelContext>
          ),
          className: cn<ComboboxGroupLabelState>(
            className,
            "sui_combobox_group_label",
            (state) => `sui_combobox_group_label-size_${state.size}`,
            (state) => `sui_combobox_group_label-color_${state.color}`,
            (state) => `sui_combobox_group_label-radius_${state.radius}`,
            (state) => `sui_combobox_group_label-variant_${state.variant}`,
            (state) => state.outlined && "sui_combobox_group_label-outlined",
            (state) => state.multiple && "sui_combobox_group_label-multiple",
          ),
        },
      )}
    />
  );
};

export { ComboboxGroupLabel as GroupLabel };

export namespace GroupLabel {
  export type State<TItem = any> = ComboboxGroupLabelState<TItem>;

  export type Props<TItem = any> = Props.Render<TItem> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TItem = any> = ComboboxGroupLabelProps.Render<TItem>;

    export type SuruUI = ComboboxGroupLabelProps.SuruUI;

    export type BaseUI = ComboboxGroupLabelProps.BaseUI;

    export type HTML = ComboboxGroupLabelProps.HTML;
  }
}
