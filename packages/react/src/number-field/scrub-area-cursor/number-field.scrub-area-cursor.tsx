import { NumberField } from "@base-ui/react/number-field";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useNumberFieldScrubAreaContext } from "../scrub-area/number-field.scrub-area.context.js";
import { NumberFieldScrubAreaCursorContext } from "./number-field.scrub-area-cursor.context.js";

/**
 * {@link NumberFieldScrubAreaCursor} が持つ状態です。
 */
export type NumberFieldScrubAreaCursorState = NumberFieldScrubAreaCursorContext;

export namespace NumberFieldScrubAreaCursorProps {
  export type Render = RenderProps<NumberFieldScrubAreaCursorState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof NumberField.ScrubAreaCursor>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // NumberFieldScrubAreaCursorProps より:
      never
    >,
    keyof Render | keyof SuruUI
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
    const ctx = useNumberFieldScrubAreaContext();
    const { style, render, className, ...otherProps } = props;

    return (
      <NumberField.ScrubAreaCursor
        {...otherProps}
        {...proxyRenderProps<NumberField.ScrubAreaCursor.State, NumberFieldScrubAreaCursorState>(
          (state) => ({ ...ctx, ...state }),
          {
            style,
            render: (htmlProps, state) => (
              <NumberFieldScrubAreaCursorContext value={state}>
                <RenderElement
                  state={state}
                  render={render}
                  htmlProps={htmlProps}
                  defaultTagName="span"
                />
              </NumberFieldScrubAreaCursorContext>
            ),
            className: cn<NumberFieldScrubAreaCursorState>(
              className,
              "sui_number_field_scrub_area_cursor",
              (state) => `sui_number_field_scrub_area_cursor-size_${state.size}`,
              (state) => `sui_number_field_scrub_area_cursor-color_${state.color}`,
              (state) => `sui_number_field_scrub_area_cursor-radius_${state.radius}`,
              (state) => `sui_number_field_scrub_area_cursor-variant_${state.variant}`,
              (state) => state.outlined && "sui_number_field_scrub_area_cursor-outlined",
              (state) => state.disabled && "sui_number_field_scrub_area_cursor-disabled",
              (state) => state.readOnly && "sui_number_field_scrub_area_cursor-readonly",
              (state) => state.required && "sui_number_field_scrub_area_cursor-required",
              (state) => state.scrubbing && "sui_number_field_scrub_area_cursor-scrubbing",
              (state) => state.touched && "sui_number_field_scrub_area_cursor-touched",
              (state) => state.dirty && "sui_number_field_scrub_area_cursor-dirty",
              (state) => state.filled && "sui_number_field_scrub_area_cursor-filled",
              (state) => state.focused && "sui_number_field_scrub_area_cursor-focused",
              (state) => state.valid === false && "sui_number_field_scrub_area_cursor-invalid",
              (state) => state.valid === true && "sui_number_field_scrub_area_cursor-valid",
              (state) => state.valid === null && "sui_number_field_scrub_area_cursor-unverified",
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
