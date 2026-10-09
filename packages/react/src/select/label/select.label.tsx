import { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useSelectContext } from "../root/select.root.context.js";
import { SelectLabelContext } from "./select.label.context.js";

/**
 * {@link SelectLabel} が持つ状態です。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectLabelState<TValue = any> = SelectLabelContext<TValue>;

export namespace SelectLabelProps {
  export type Render<TValue = any> = RenderProps<SelectLabelState<TValue>>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof BaseSelect.Label>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // SelectLabelProps より:
      never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseSelect.Label>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SelectLabel} に渡す props です。
 */
export type SelectLabelProps = SelectLabelProps.Render &
  SelectLabelProps.SuruUI &
  SelectLabelProps.BaseUI &
  SelectLabelProps.HTML;

export type ISelectLabel = IComponent<SelectLabelProps>;

/**
 * 選択欄に対応する表示ラベルです。
 */
export const SelectLabel: ISelectLabel = function SuiSelectLabel(props) {
  const ctx = useSelectContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <BaseSelect.Label
      {...otherProps}
      {...proxyRenderProps<BaseSelect.Label.State, SelectLabelState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <SelectLabelContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </SelectLabelContext>
          ),
          className: cn<SelectLabelState>(
            className,
            "sui_select_label",
            (state) => `sui_select_label-size_${state.size}`,
            (state) => `sui_select_label-radius_${state.radius}`,
            (state) => `sui_select_label-variant_${state.variant}`,
            (state) => state.outlined && "sui_select_label-outlined",
            (state) => state.disabled && "sui_select_label-disabled",
            (state) => state.touched && "sui_select_label-touched",
            (state) => state.dirty && "sui_select_label-dirty",
            (state) => state.filled && "sui_select_label-filled",
            (state) => state.focused && "sui_select_label-focused",
            (state) => state.valid === false && "sui_select_label-invalid",
            (state) => state.valid === true && "sui_select_label-valid",
            (state) => state.valid === null && "sui_select_label-unverified",
          ),
        },
      )}
    />
  );
};

export { SelectLabel as Label };

export namespace Label {
  export type State<TValue = any> = SelectLabelState<TValue>;

  export type Props<TValue = any> = Props.Render<TValue> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TValue = any> = SelectLabelProps.Render<TValue>;

    export type SuruUI = SelectLabelProps.SuruUI;

    export type BaseUI = SelectLabelProps.BaseUI;

    export type HTML = SelectLabelProps.HTML;
  }
}
