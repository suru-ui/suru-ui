import { NumberField } from "@base-ui/react/number-field";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link NumberFieldScrubArea} が持つ状態です。
 */
export type NumberFieldScrubAreaState = NumberField.ScrubArea.State;

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

/**
 * ドラッグで値を変更できる領域を提供するコンポーネントです。
 */
export const NumberFieldScrubArea: IComponent<NumberFieldScrubAreaProps> =
  function SuiNumberFieldScrubArea(props) {
    const { className, ...otherProps } = props;

    return (
      <NumberField.ScrubArea
        {...otherProps}
        className={cn(className, "sui_number_field_scrub_area")}
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
