import { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useSelectTriggerContext } from "../trigger/select.trigger.context.js";
import { SelectValueContext } from "./select.value.context.js";

/**
 * {@link SelectValue} が持つ状態です。
 *
 * @template TValue 項目の値の型です。
 */
export type SelectValueState<TValue = any> = SelectValueContext<TValue>;

export namespace SelectValueProps {
  export type Render<TValue = any> = RenderProps<SelectValueState<TValue>>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof BaseSelect.Value>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // SelectValueProps より:
      "children" | "placeholder"
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof BaseSelect.Value>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SelectValue} に渡す props です。
 */
export type SelectValueProps = SelectValueProps.Render &
  SelectValueProps.SuruUI &
  SelectValueProps.BaseUI &
  SelectValueProps.HTML;

export type ISelectValue = IComponent<SelectValueProps>;

/**
 * 現在の選択値またはプレースホルダーを表示する要素です。
 */
export const SelectValue: ISelectValue = function SuiSelectValue(props) {
  const ctx = useSelectTriggerContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <BaseSelect.Value
      {...otherProps}
      {...proxyRenderProps<BaseSelect.Value.State, SelectValueState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <SelectValueContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="span"
              />
            </SelectValueContext>
          ),
          className: cn<SelectValueState>(
            className,
            "sui_select_value",
            (state) => state.placeholder && "sui_select_value-placeholder",
            (state) => `sui_select_value-size_${state.size}`,
            (state) => `sui_select_value-radius_${state.radius}`,
            (state) => `sui_select_value-variant_${state.variant}`,
            (state) => state.outlined && "sui_select_value-outlined",
            (state) => state.disabled && "sui_select_value-disabled",
            (state) => state.touched && "sui_select_value-touched",
            (state) => state.dirty && "sui_select_value-dirty",
            (state) => state.valid === false && "sui_select_value-invalid",
            (state) => state.valid === true && "sui_select_value-valid",
            (state) => state.valid === null && "sui_select_value-unverified",
            (state) => state.filled && "sui_select_value-filled",
            (state) => state.focused && "sui_select_value-focused",
            (state) => state.open && "sui_select_value-open",
            (state) => state.readOnly && "sui_select_value-readonly",
            (state) =>
              state.popupSide !== null &&
              `sui_select_value-popup_side_${state.popupSide.replaceAll("-", "_")}`,
          ),
        },
      )}
    />
  );
};

export { SelectValue as Value };

export namespace Value {
  export type State<TValue = any> = SelectValueState<TValue>;

  export type Props<TValue = any> = Props.Render<TValue> & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render<TValue = any> = SelectValueProps.Render<TValue>;

    export type SuruUI = SelectValueProps.SuruUI;

    export type BaseUI = SelectValueProps.BaseUI;

    export type HTML = SelectValueProps.HTML;
  }
}
