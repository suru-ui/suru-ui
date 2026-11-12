import { Progress } from "@base-ui/react/progress";
import * as React from "react";

import proxyRenderProps from "../../_proxy-render-props.js";
import RenderElement from "../../_render-element.jsx";
import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useProgressContext } from "../root/progress.root.context.js";
import { ProgressTrackContext } from "./progress.track.context.js";

/**
 * {@link ProgressTrack} が持つ状態です。
 */
export type ProgressTrackState = ProgressTrackContext;

export namespace ProgressTrackProps {
  export type Render = RenderProps<ProgressTrackState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Progress.Track>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // ProgressTrackProps より :
      never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<React.ComponentProps<typeof Progress.Track>, keyof Render | keyof SuruUI>;
}

/**
 * {@link ProgressTrack} に渡す props です。
 */
export type ProgressTrackProps = ProgressTrackProps.Render &
  ProgressTrackProps.SuruUI &
  ProgressTrackProps.BaseUI &
  ProgressTrackProps.HTML;

export type IProgressTrack = IComponent<ProgressTrackProps>;

/** 進捗の全範囲を表すトラックコンポーネントです。 */
export const ProgressTrack: IProgressTrack = (props) => {
  const ctx = useProgressContext();
  const { style, render, className, ...otherProps } = props;

  return (
    <Progress.Track
      {...otherProps}
      {...proxyRenderProps<Progress.Track.State, ProgressTrackState>(
        (state) => ({
          ...ctx,
          ...state,
        }),
        {
          style,
          render: (htmlProps, state) => (
            <ProgressTrackContext value={state}>
              <RenderElement
                state={state}
                render={render}
                htmlProps={htmlProps}
                defaultTagName="div"
              />
            </ProgressTrackContext>
          ),
          className: cn<ProgressTrackState>(
            className,
            "sui_progress_track",
            (state) => `sui_progress_track-size_${state.size}`,
            (state) => `sui_progress_track-color_${state.color}`,
            (state) => `sui_progress_track-radius_${state.radius}`,
            (state) => `sui_progress_track-variant_${state.variant}`,
            (state) => state.outlined && "sui_progress_track-outlined",
            (state) => `sui_progress_track-status_${state.status}`,
          ),
        },
      )}
    />
  );
};

export { ProgressTrack as Track };
export namespace Track {
  export type State = ProgressTrackState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ProgressTrackProps.Render;

    export type SuruUI = ProgressTrackProps.SuruUI;

    export type BaseUI = ProgressTrackProps.BaseUI;

    export type HTML = ProgressTrackProps.HTML;
  }
}
