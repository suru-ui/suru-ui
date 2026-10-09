import { Slider } from "@base-ui/react/slider";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useSliderControlContext } from "../control/slider.control.context.js";
import { SliderTrackContext } from "./slider.track.context.js";

/**
 * {@link SliderTrack} が持つ状態です。
 */
export type SliderTrackState = SliderTrackContext;

export namespace SliderTrackProps {
  export type Render = RenderProps<SliderTrackState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Slider.Track>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // SliderTrackProps より:
      never
    >,
    keyof Render | keyof SuruUI
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

export type ISliderTrack = IComponent<SliderTrackProps>;

/**
 * スライダーの全範囲を表すトラックコンポーネントです。
 */
export const SliderTrack: ISliderTrack = function SuiSliderTrack(props) {
  const ctx = useSliderControlContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Slider.Track
      {...otherProps}
      {...proxyRenderProps<Slider.Track.State, SliderTrackState>(
        (state) => ({ ...ctx, ...state }),
        {
          style,
          render: (htmlProps, state) => (
            <SliderTrackContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </SliderTrackContext>
          ),
          className: cn<SliderTrackState>(
            className,
            "sui_slider_track",
            (state) => `sui_slider_track-size_${state.size}`,
            (state) => `sui_slider_track-color_${state.color}`,
            (state) => `sui_slider_track-radius_${state.radius}`,
            (state) => `sui_slider_track-variant_${state.variant}`,
            (state) => state.outlined && "sui_slider_track-outlined",
            (state) => state.disabled && "sui_slider_track-disabled",
            (state) => state.dragging && "sui_slider_track-dragging",
            (state) => state.touched && "sui_slider_track-touched",
            (state) => state.dirty && "sui_slider_track-dirty",
            (state) => state.filled && "sui_slider_track-filled",
            (state) => state.focused && "sui_slider_track-focused",
            (state) => state.valid === false && "sui_slider_track-invalid",
            (state) => state.valid === true && "sui_slider_track-valid",
            (state) => state.valid === null && "sui_slider_track-unverified",
            (state) => `sui_slider_track-orientation_${state.orientation}`,
            (state) =>
              state.activeThumbIndex >= 0 &&
              `sui_slider_track-active_thumb_index_${state.activeThumbIndex}`,
          ),
        },
      )}
    />
  );
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
