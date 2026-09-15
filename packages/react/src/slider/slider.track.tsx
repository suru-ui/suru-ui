import { Slider } from "@base-ui/react/slider";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link SliderTrack} が持つ状態です。
 */
export type SliderTrackState = Slider.Track.State;

export namespace SliderTrackProps {
  export type Render = RenderProps<SliderTrackState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Slider.Track>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // SliderTrackProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Slider.Track>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link SliderTrack} に渡す props です。
 */
export type SliderTrackProps = SliderTrackProps.Render &
  SliderTrackProps.SuruUI &
  SliderTrackProps.BaseUI &
  SliderTrackProps.HTML;

/**
 * スライダーの全範囲を表すトラックコンポーネントです。
 */
export const SliderTrack: IComponent<SliderTrackProps> = function SuiSliderTrack(props) {
  const { className, ...otherProps } = props;

  return <Slider.Track {...otherProps} className={cn(className, "sui_slider_track")} />;
};

export { SliderTrack as Track };

/**
 * {@link SliderTrack} の状態や props をまとめた型名前空間です。
 */
export namespace Track {
  export type State = SliderTrackState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = SliderTrackProps.Render;

    export type SuruUI = SliderTrackProps.SuruUI;

    export type BaseUI = SliderTrackProps.BaseUI;

    export type HTML = SliderTrackProps.HTML;
  }
}
