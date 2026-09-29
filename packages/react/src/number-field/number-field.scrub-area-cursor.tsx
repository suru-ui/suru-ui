import { NumberField } from "@base-ui/react/number-field";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link NumberFieldScrubAreaCursor} が持つ状態です。
 */
export type NumberFieldScrubAreaCursorState = NumberField.ScrubAreaCursor.State;

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
    const { className, ...otherProps } = props;

    return (
      <NumberField.ScrubAreaCursor
        {...otherProps}
        className={cn(className, "sui_number_field_scrub_area_cursor")}
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
