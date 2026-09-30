import { NumberField } from "@base-ui/react/number-field";
import * as React from "react";

import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { DISABLE_FOCUS_ON_CLICK_DATA } from "./_number-field.jsx";
import { type NumberFieldContext, useNumberFieldContext } from "./number-field.context.js";

/**
 * {@link NumberFieldGroup} が持つ状態です。
 */
export type NumberFieldGroupState = Override<NumberFieldContext, NumberField.Group.State>;

export namespace NumberFieldGroupProps {
  export type Render = RenderProps<NumberFieldGroupState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof NumberField.Group>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NumberFieldGroupProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof NumberField.Group>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link NumberFieldGroup} に渡す props です。
 */
export type NumberFieldGroupProps = NumberFieldGroupProps.Render &
  NumberFieldGroupProps.SuruUI &
  NumberFieldGroupProps.BaseUI &
  NumberFieldGroupProps.HTML;

export type INumberFieldGroup = IComponent<NumberFieldGroupProps>;

/**
 * 入力欄と増減ボタンをまとめるグループ要素です。
 */
export const NumberFieldGroup: INumberFieldGroup = function SuiNumberFieldGroup(props) {
  const ctx = useNumberFieldContext();
  const { style, render, onClick, className, ...otherProps } = props;
  const handleClick: NonNullable<NumberFieldGroupProps["onClick"]> = (evt) => {
    onClick?.(evt);
    if (evt.defaultPrevented || !(evt.target instanceof Element)) {
      return;
    }

    if (
      evt.target.closest(".sui_number_field_input") !== null ||
      evt.target.closest(`[${DISABLE_FOCUS_ON_CLICK_DATA}="true"]`) !== null
    ) {
      return;
    }

    const input = evt.currentTarget.querySelector<HTMLInputElement>(".sui_number_field_input");
    if (input !== null && !input.disabled) {
      input.focus();
    }
  };

  return (
    <NumberField.Group
      {...otherProps}
      onClick={handleClick}
      {...proxyRenderProps<NumberField.Group.State, NumberFieldGroupState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn(className, "sui_number_field_group"),
        },
      )}
    />
  );
};

export { NumberFieldGroup as Group };

export namespace Group {
  export type State = NumberFieldGroupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = NumberFieldGroupProps.Render;

    export type SuruUI = NumberFieldGroupProps.SuruUI;

    export type BaseUI = NumberFieldGroupProps.BaseUI;

    export type HTML = NumberFieldGroupProps.HTML;
  }
}
