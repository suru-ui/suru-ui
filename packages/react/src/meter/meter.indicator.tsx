import { Meter } from "@base-ui/react/meter";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link MeterIndicator} が持つ状態です。
 */
export type MeterIndicatorState = Meter.Indicator.State;

export namespace MeterIndicatorProps {
  export type Render = RenderProps<MeterIndicatorState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Meter.Indicator>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MeterIndicatorProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Meter.Indicator>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MeterIndicator} に渡す props です。
 */
export type MeterIndicatorProps = MeterIndicatorProps.Render &
  MeterIndicatorProps.SuruUI &
  MeterIndicatorProps.BaseUI &
  MeterIndicatorProps.HTML;

/**
 * メーターの現在値を示すインジケーターコンポーネントです。
 */
export const MeterIndicator: IComponent<MeterIndicatorProps> = function SuiMeterIndicator(props) {
  const { className, ...otherProps } = props;

  return <Meter.Indicator {...otherProps} className={cn(className, "sui_meter_indicator")} />;
};

export { MeterIndicator as Indicator };

export namespace Indicator {
  export type State = MeterIndicatorState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MeterIndicatorProps.Render;

    export type SuruUI = MeterIndicatorProps.SuruUI;

    export type BaseUI = MeterIndicatorProps.BaseUI;

    export type HTML = MeterIndicatorProps.HTML;
  }
}
