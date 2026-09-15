import { Meter } from "@base-ui/react/meter";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link MeterLabel} が持つ状態です。
 */
export type MeterLabelState = Meter.Label.State;

export namespace MeterLabelProps {
  export type Render = RenderProps<MeterLabelState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Meter.Label>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MeterLabelProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Meter.Label>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MeterLabel} に渡す props です。
 */
export type MeterLabelProps = MeterLabelProps.Render &
  MeterLabelProps.SuruUI &
  MeterLabelProps.BaseUI &
  MeterLabelProps.HTML;

/**
 * メーターのラベルコンポーネントです。
 */
export const MeterLabel: IComponent<MeterLabelProps> = function SuiMeterLabel(props) {
  const { className, ...otherProps } = props;

  return <Meter.Label {...otherProps} className={cn(className, "sui_meter_label")} />;
};

export { MeterLabel as Label };

export namespace Label {
  export type State = MeterLabelState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MeterLabelProps.Render;

    export type SuruUI = MeterLabelProps.SuruUI;

    export type BaseUI = MeterLabelProps.BaseUI;

    export type HTML = MeterLabelProps.HTML;
  }
}
