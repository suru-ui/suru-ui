import { Progress } from "@base-ui/react/progress";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link ProgressTrack} が持つ状態です。
 */
export type ProgressTrackState = Progress.Track.State;

export namespace ProgressTrackProps {
  export type Render = RenderProps<ProgressTrackState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Progress.Track>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // ProgressTrackProps:
      never,
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Progress.Track>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link ProgressTrack} に渡す props です。
 */
export type ProgressTrackProps = ProgressTrackProps.Render &
  ProgressTrackProps.SuruUI &
  ProgressTrackProps.BaseUI &
  ProgressTrackProps.HTML;

export type IProgressTrack = IComponent<ProgressTrackProps>;

/**
 * 進捗の全範囲を表すトラックコンポーネントです。
 */
export const ProgressTrack: IProgressTrack = function SuiProgressTrack(props) {
  const { className, ...otherProps } = props;

  return (
    <Progress.Track
      {...otherProps}
      className={cn<ProgressTrackState>(
        className,
        "sui_progress_track",
        (state) => `sui_progress_track-status_${state.status}`,
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
