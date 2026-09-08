import isLikelyVisibleNode from "../_is-likely-visible-node.js";
import type { IComponent } from "../types.js";
import {
  type ProgressRootSize,
  type ProgressRootColor,
  type ProgressRootProps,
  type ProgressRootState,
  type ProgressLabelProps,
  type ProgressRootRadius,
  type ProgressRootStatus,
  type ProgressTrackProps,
  type ProgressValueProps,
  type ProgressRootVariant,
  type ProgressIndicatorProps,
  ProgressRoot,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
  ProgressIndicator,
} from "./progress.parts.jsx";

// Types
// -----

/**
 * {@link ProgressRootStatus}
 */
export type ProgressStatus = ProgressRootStatus;

/**
 * {@link ProgressRootColor}
 */
export type ProgressColor = ProgressRootColor;

/**
 * {@link ProgressRootRadius}
 */
export type ProgressRadius = ProgressRootRadius;

/**
 * {@link ProgressRootSize}
 */
export type ProgressSize = ProgressRootSize;

/**
 * {@link ProgressRootVariant}
 */
export type ProgressVariant = ProgressRootVariant;

/**
 * {@link Progress} の各パーツに渡す props です。
 */
export type ProgressSlotProps = {
  /**
   * {@link ProgressIndicator} に渡す props です。
   */
  readonly indicator?: ProgressIndicatorProps | undefined;

  /**
   * {@link ProgressLabel} に渡す props です。
   */
  readonly label?: Omit<ProgressLabelProps, "children"> | undefined;

  /**
   * {@link ProgressTrack} に渡す props です。
   */
  readonly track?: Omit<ProgressTrackProps, "children"> | undefined;

  /**
   * {@link ProgressValue} に渡す props です。
   */
  readonly value?: ProgressValueProps | undefined;
};

/**
 * {@link Progress} が持つ状態です。
 */
export type ProgressState = ProgressRootState;

/**
 * {@link Progress} に渡す props です。
 */
export type ProgressProps = Omit<ProgressRootProps, "children" | "value"> & {
  /**
   * 進捗の説明ラベルです。
   */
  label?: ProgressLabelProps["children"] | undefined;

  /**
   * 各パーツに個別の props を渡すためのオブジェクトです。
   */
  slotProps?: ProgressSlotProps | undefined;

  /**
   * 現在値です。`null` を指定すると不確定状態になります。
   *
   * @default null
   */
  value?: number | null | undefined;
};

// API
// ---

/**
 * {@link Progress} を構成する各パーツの props を作成するための API です。
 */
export interface ProgressAPI {
  /**
   * {@link ProgressIndicator} に渡す props を取得します。
   */
  getIndicatorProps(): ProgressIndicatorProps;

  /**
   * {@link ProgressLabel} に渡す props を取得します。
   *
   * それを表示しないときは `null` を返します。
   */
  getLabelProps(): ProgressLabelProps | null;

  /**
   * {@link ProgressRoot} に渡す props を取得します。
   */
  getRootProps(): Omit<ProgressRootProps, "children">;

  /**
   * {@link ProgressTrack} に渡す props を取得します。
   */
  getTrackProps(): Omit<ProgressTrackProps, "children">;

  /**
   * {@link ProgressValue} に渡す props を取得します。
   */
  getValueProps(): ProgressValueProps;
}

interface IUseProgressAPI {
  /**
   * {@link ProgressAPI} を作成します。
   *
   * @param props {@link Progress} の props です。
   * @returns 進捗の API です
   */
  (props: ProgressProps): ProgressAPI;
}

/**
 * {@link ProgressAPI} を作成するフックです。
 */
export const useProgressAPI: IUseProgressAPI = function useSuiProgressAPI(props) {
  const {
    label,
    value = null,
    slotProps: {
      label: labelProps = {},
      track: trackProps = {},
      value: valueProps = {},
      indicator: indicatorProps = {},
    } = {},
    ...otherRootProps
  } = props;

  return {
    getRootProps() {
      return { value, ...otherRootProps };
    },
    getLabelProps() {
      return isLikelyVisibleNode(label) ? { ...labelProps, children: label } : null;
    },
    getTrackProps() {
      return trackProps;
    },
    getValueProps() {
      return valueProps;
    },
    getIndicatorProps() {
      return indicatorProps;
    },
  };
};

export { type ProgressAPI as API, useProgressAPI as useAPI };

// Component
// ---------

/**
 * 時間のかかる処理の進捗を表示するコンポーネントです。
 *
 * `value` に `null` を指定すると不確定状態になります。
 */
export const Progress: IComponent<ProgressProps> = function SuiProgress(props) {
  const api = useProgressAPI(props);
  const labelProps = api.getLabelProps();

  return (
    <ProgressRoot {...api.getRootProps()}>
      {labelProps && <ProgressLabel {...labelProps} />}
      <ProgressValue {...api.getValueProps()} />
      <ProgressTrack {...api.getTrackProps()}>
        <ProgressIndicator {...api.getIndicatorProps()} />
      </ProgressTrack>
    </ProgressRoot>
  );
};

export namespace Progress {
  /**
   * {@link ProgressState}
   */
  export type State = ProgressState;

  /**
   * {@link ProgressProps}
   */
  export type Props = ProgressProps;

  /**
   * {@link ProgressSlotProps}
   */
  export type SlotProps = ProgressSlotProps;

  /**
   * {@link ProgressColor}
   */
  export type Color = ProgressColor;

  /**
   * {@link ProgressRadius}
   */
  export type Radius = ProgressRadius;

  /**
   * {@link ProgressSize}
   */
  export type Size = ProgressSize;

  /**
   * {@link ProgressStatus}
   */
  export type Status = ProgressStatus;

  /**
   * {@link ProgressVariant}
   */
  export type Variant = ProgressVariant;
}
