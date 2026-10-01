import { NumberField } from "@base-ui/react/number-field";
import * as React from "react";

import proxyRenderProps from "../_proxy-render-props.js";
import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { Override, IComponent } from "../types.js";
import { type NumberFieldContext, useNumberFieldContext } from "./number-field.context.js";

/**
 * {@link NumberFieldScrubAreaCursor} が持つ状態です。
 */
export type NumberFieldScrubAreaCursorState = Override<
  NumberFieldContext,
  NumberField.ScrubAreaCursor.State
>;

export namespace NumberFieldScrubAreaCursorProps {
  export type Render = RenderProps<NumberFieldScrubAreaCursorState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof NumberField.ScrubAreaCursor>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // NumberFieldScrubAreaCursorProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof NumberField.ScrubAreaCursor>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link NumberFieldScrubAreaCursor} に渡す props です。
 */
export type NumberFieldScrubAreaCursorProps = NumberFieldScrubAreaCursorProps.Render &
  NumberFieldScrubAreaCursorProps.SuruUI &
  NumberFieldScrubAreaCursorProps.BaseUI &
  NumberFieldScrubAreaCursorProps.HTML;

export type INumberFieldScrubAreaCursor = IComponent<NumberFieldScrubAreaCursorProps>;

/**
 * スクラブ中にネイティブカーソルの代わりに表示する要素です。
 */
export const NumberFieldScrubAreaCursor: INumberFieldScrubAreaCursor =
  function SuiNumberFieldScrubAreaCursor(props) {
    const ctx = useNumberFieldContext();
    const { style, render, className, ...otherProps } = props;

    return (
      <NumberField.ScrubAreaCursor
        {...otherProps}
        {...proxyRenderProps<NumberField.ScrubAreaCursor.State, NumberFieldScrubAreaCursorState>(
          (state) => ({ ...ctx, ...state }),
          {
            style,
            render,
            className: cn<NumberFieldScrubAreaCursorState>(
              className,
              "sui_number_field_scrub_area_cursor",
              (state) => `sui_number_field_scrub_area_cursor-size_${state.size}`,
              (state) => `sui_number_field_scrub_area_cursor-color_${state.color}`,
              (state) => `sui_number_field_scrub_area_cursor-radius_${state.radius}`,
              (state) => `sui_number_field_scrub_area_cursor-variant_${state.variant}`,
              (state) => state.outlined && "sui_number_field_scrub_area_cursor-outlined",
            ),
          },
        )}
      />
    );
  };

export { NumberFieldScrubAreaCursor as ScrubAreaCursor };

export namespace ScrubAreaCursor {
  export type State = NumberFieldScrubAreaCursorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = NumberFieldScrubAreaCursorProps.Render;

    export type SuruUI = NumberFieldScrubAreaCursorProps.SuruUI;

    export type BaseUI = NumberFieldScrubAreaCursorProps.BaseUI;

    export type HTML = NumberFieldScrubAreaCursorProps.HTML;
  }
}
