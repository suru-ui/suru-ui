import { Meter } from "@base-ui/react/meter";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useMeterContext } from "../root/meter.root.context.js";
import { MeterLabelContext } from "./meter.label.context.js";

/**
 * {@link MeterLabel} が持つ状態です。
 */
export type MeterLabelState = MeterLabelContext;

export namespace MeterLabelProps {
  export type Render = RenderProps<MeterLabelState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Meter.Label>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // MeterLabelProps より:
      never
    >,
    keyof Render | keyof SuruUI
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

export type IMeterLabel = IComponent<MeterLabelProps>;

/**
 * メーターのラベルコンポーネントです。
 */
export const MeterLabel: IMeterLabel = function SuiMeterLabel(props) {
  const ctx = useMeterContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Meter.Label
      {...otherProps}
      {...proxyRenderProps<Meter.Label.State, MeterLabelState>((state) => ({ ...ctx, ...state }), {
        style,
        render: (htmlProps, state) => (
          <MeterLabelContext value={state}>
            <RenderElement
              state={state}
              render={render}
              htmlProps={htmlProps}
              defaultTagName="span"
            />
          </MeterLabelContext>
        ),
        className: cn<MeterLabelState>(
          className,
          "sui_meter_label",
          (state) => `sui_meter_label-size_${state.size}`,
          (state) => `sui_meter_label-color_${state.color}`,
          (state) => `sui_meter_label-radius_${state.radius}`,
          (state) => `sui_meter_label-variant_${state.variant}`,
          (state) => state.outlined && "sui_meter_label-outlined",
        ),
      })}
    />
  );
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
