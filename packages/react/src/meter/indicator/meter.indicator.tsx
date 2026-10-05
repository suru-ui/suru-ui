import { Meter } from "@base-ui/react/meter";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { type MeterContext, useMeterContext } from "../root/meter.root.context.js";

/**
 * {@link MeterIndicator} が持つ状態です。
 */
export type MeterIndicatorState = Override<MeterContext, Meter.Indicator.State>;

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

export type IMeterIndicator = IComponent<MeterIndicatorProps>;

/**
 * メーターの現在値を示すインジケーターコンポーネントです。
 */
export const MeterIndicator: IMeterIndicator = function SuiMeterIndicator(props) {
  const ctx = useMeterContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Meter.Indicator
      {...otherProps}
      {...proxyRenderProps<Meter.Indicator.State, MeterIndicatorState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render,
          className: cn<MeterIndicatorState>(
            className,
            "sui_meter_indicator",
            (state) => `sui_meter_indicator-size_${state.size}`,
            (state) => `sui_meter_indicator-color_${state.color}`,
            (state) => `sui_meter_indicator-radius_${state.radius}`,
            (state) => `sui_meter_indicator-variant_${state.variant}`,
            (state) => state.outlined && "sui_meter_indicator-outlined",
          ),
        },
      )}
    />
  );
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
