import { Meter } from "@base-ui/react/meter";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { Override, IComponent } from "../../types.js";
import { type MeterContext, useMeterContext } from "../root/meter.root.context.js";
import { MeterTrackContext } from "./meter.track.context.js";

/**
 * {@link MeterTrack} が持つ状態です。
 */
export type MeterTrackState = Override<MeterContext, Meter.Track.State>;

export namespace MeterTrackProps {
  export type Render = RenderProps<MeterTrackState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Meter.Track>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // MeterTrackProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Meter.Track>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link MeterTrack} に渡す props です。
 */
export type MeterTrackProps = MeterTrackProps.Render &
  MeterTrackProps.SuruUI &
  MeterTrackProps.BaseUI &
  MeterTrackProps.HTML;

export type IMeterTrack = IComponent<MeterTrackProps>;

/**
 * メーターの全範囲を表すトラックコンポーネントです。
 */
export const MeterTrack: IMeterTrack = function SuiMeterTrack(props) {
  const ctx = useMeterContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Meter.Track
      {...otherProps}
      {...proxyRenderProps<Meter.Track.State, MeterTrackState>((state) => ({ ...ctx, ...state }), {
        style,
        render: (htmlProps, state) => (
          <MeterTrackContext value={state}>
            <RenderElement
              state={state}
              render={render}
              htmlProps={htmlProps}
              defaultTagName="div"
            />
          </MeterTrackContext>
        ),
        className: cn<MeterTrackState>(
          className,
          "sui_meter_track",
          (state) => `sui_meter_track-size_${state.size}`,
          (state) => `sui_meter_track-color_${state.color}`,
          (state) => `sui_meter_track-radius_${state.radius}`,
          (state) => `sui_meter_track-variant_${state.variant}`,
          (state) => state.outlined && "sui_meter_track-outlined",
        ),
      })}
    />
  );
};

export { MeterTrack as Track };

export namespace Track {
  export type State = MeterTrackState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = MeterTrackProps.Render;

    export type SuruUI = MeterTrackProps.SuruUI;

    export type BaseUI = MeterTrackProps.BaseUI;

    export type HTML = MeterTrackProps.HTML;
  }
}
