import { Select as BaseSelect } from "@base-ui/react/select";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { type SelectContext, useSelectContext } from "../root/select.root.context.js";
import { SelectValueContext } from "./select.value.context.js";

/**
 * {@link SelectValue} が持つ状態です。
 */
export type SelectValueState = Override<SelectContext, BaseSelect.Value.State>;

export namespace SelectValueProps {
  export type Render = RenderProps<SelectValueState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof BaseSelect.Value>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // SelectValueProps:
      "children" | "placeholder",
      keyof Render | keyof SuruUI
    >
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
  const ctx = useSelectContext();
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
          ),
        },
      )}
    />
  );
};

export { SelectValue as Value };

export namespace Value {
  export type State = SelectValueState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SelectValueProps.Render;

    export type SuruUI = SelectValueProps.SuruUI;

    export type BaseUI = SelectValueProps.BaseUI;

    export type HTML = SelectValueProps.HTML;
  }
}
