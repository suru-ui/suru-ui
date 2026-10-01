import { NumberField } from "@base-ui/react/number-field";
import * as React from "react";

import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type NumberFieldContext, useNumberFieldContext } from "./number-field.context.js";

/**
 * {@link NumberFieldScrubArea} が持つ状態です。
 */
export type NumberFieldScrubAreaState = Override<NumberFieldContext, NumberField.ScrubArea.State>;

export namespace NumberFieldScrubAreaProps {
  export type Render = RenderProps<NumberFieldScrubAreaState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof NumberField.ScrubArea>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NumberFieldScrubAreaProps:
      "direction" | "pixelSensitivity" | "teleportDistance",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof NumberField.ScrubArea>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link NumberFieldScrubArea} に渡す props です。
 */
export type NumberFieldScrubAreaProps = NumberFieldScrubAreaProps.Render &
  NumberFieldScrubAreaProps.SuruUI &
  NumberFieldScrubAreaProps.BaseUI &
  NumberFieldScrubAreaProps.HTML;

export type INumberFieldScrubArea = IComponent<NumberFieldScrubAreaProps>;

/**
 * ドラッグで値を変更できる領域を提供するコンポーネントです。
 */
export const NumberFieldScrubArea: INumberFieldScrubArea = function SuiNumberFieldScrubArea(props) {
  const ctx = useNumberFieldContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <NumberField.ScrubArea
      {...otherProps}
      {...proxyRenderProps<NumberField.ScrubArea.State, NumberFieldScrubAreaState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<NumberFieldScrubAreaState>(
            className,
            "sui_number_field_scrub_area",
            (state) => `sui_number_field_scrub_area-size_${state.size}`,
            (state) => `sui_number_field_scrub_area-color_${state.color}`,
            (state) => `sui_number_field_scrub_area-radius_${state.radius}`,
            (state) => `sui_number_field_scrub_area-variant_${state.variant}`,
            (state) => state.outlined && "sui_number_field_scrub_area-outlined",
            (state) => state.disabled && "sui_number_field_scrub_area-disabled",
            (state) => state.readOnly && "sui_number_field_scrub_area-readonly",
            (state) => state.required && "sui_number_field_scrub_area-required",
            (state) => state.scrubbing && "sui_number_field_scrub_area-scrubbing",
            (state) => state.touched && "sui_number_field_scrub_area-touched",
            (state) => state.dirty && "sui_number_field_scrub_area-dirty",
            (state) => state.filled && "sui_number_field_scrub_area-filled",
            (state) => state.focused && "sui_number_field_scrub_area-focused",
            (state) => state.valid === false && "sui_number_field_scrub_area-invalid",
            (state) => state.valid === true && "sui_number_field_scrub_area-valid",
            (state) => state.valid === null && "sui_number_field_scrub_area-unverified",
          ),
        },
      )}
    />
  );
};

export { NumberFieldScrubArea as ScrubArea };

export namespace ScrubArea {
  export type State = NumberFieldScrubAreaState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = NumberFieldScrubAreaProps.Render;

    export type SuruUI = NumberFieldScrubAreaProps.SuruUI;

    export type BaseUI = NumberFieldScrubAreaProps.BaseUI;

    export type HTML = NumberFieldScrubAreaProps.HTML;
  }
}
