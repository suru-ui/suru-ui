import { Meter } from "@base-ui/react/meter";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link MeterTrack} が持つ状態です。
 */
export type MeterTrackState = Meter.Track.State;

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

/**
 * メーターの全範囲を表すトラックコンポーネントです。
 */
export const MeterTrack: IComponent<MeterTrackProps> = function SuiMeterTrack(props) {
  const { className, ...otherProps } = props;

  return <Meter.Track {...otherProps} className={cn(className, "sui_meter_track")} />;
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
