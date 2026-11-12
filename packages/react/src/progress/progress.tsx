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
} from "./progress.parts.js";

// Types.

export type ProgressStatus = ProgressRootStatus;

export type ProgressColor = ProgressRootColor;

export type ProgressRadius = ProgressRootRadius;

export type ProgressSize = ProgressRootSize;

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

namespace ProgressProps {
  export type Progress = {
    /**
     * 進捗の説明ラベルです。
     *
     * 指定すると {@link ProgressValue} も表示されます。
     */
    label?: ProgressLabelProps["children"] | undefined;

    /** 各パーツに個別の props を渡すためのオブジェクトです。 */
    slotProps?: ProgressSlotProps | undefined;

    /**
     * 現在値です。`null` を指定すると不確定状態になります。
     *
     * @default null
     */
    value?: number | null | undefined;
  };

  export type Root = Omit<ProgressRootProps, "children" | keyof Progress>;
}

/**
 * {@link Progress} に渡す props です。
 */
export type ProgressProps = ProgressProps.Progress & ProgressProps.Root;

export type IProgress = IComponent<ProgressProps>;

export interface IUseProgressAPI {
  /**
   * {@link ProgressAPI} を作成します。
   *
   * @param props {@link Progress} の props です。
   *
   * @returns 進捗の API です
   */
  (props: ProgressProps): ProgressAPI;
}

// API.

/**
 * {@link Progress} を構成する各パーツの props を作成するための API です。
 */
export class ProgressAPI {
  private readonly progressProps: Required<Omit<ProgressProps.Progress, "slotProps" | "value">> & {
    readonly value: number | null;
  };

  private readonly rootProps: ProgressProps.Root;

  private readonly slotProps: ProgressSlotProps;

  /**
   * @param props {@link Progress} の props です。
   *
   * @internal
   */
  public constructor(props: ProgressProps) {
    const { label, value = null, slotProps = {}, ...rootProps } = props;
    this.progressProps = {
      label,
      value,
    };
    this.rootProps = rootProps;
    this.slotProps = slotProps;
  }

  /**
   * {@link ProgressIndicator} に渡す props を取得します。
   */
  public getIndicatorProps(): ProgressIndicatorProps {
    const { indicator: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link ProgressLabel} に渡す props を取得します。
   *
   * ラベルを表示しないときは `null` を返します。
   */
  public getLabelProps(): ProgressLabelProps | null {
    const { label: props = {} } = this.slotProps;
    const { label } = this.progressProps;

    if (isLikelyVisibleNode(label)) {
      return {
        ...props,
        children: label,
      };
    }

    return null;
  }

  /**
   * {@link ProgressRoot} に渡す props を取得します。
   */
  public getRootProps(): Omit<ProgressRootProps, "children"> {
    return {
      ...this.rootProps,
      value: this.progressProps.value,
    };
  }

  /**
   * {@link ProgressTrack} に渡す props を取得します。
   */
  public getTrackProps(): Omit<ProgressTrackProps, "children"> {
    const { track: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link ProgressValue} に渡す props を取得します。
   *
   * 値を表示しないときは `null` を返します。
   */
  public getValueProps(): ProgressValueProps | null {
    const { value: props = {} } = this.slotProps;
    const { label } = this.progressProps;

    if (isLikelyVisibleNode(label)) {
      return props;
    }

    return null;
  }
}

/**
 * {@link ProgressAPI} を作成するフックです。
 */
export const useProgressAPI: IUseProgressAPI = (props) => new ProgressAPI(props);

export { ProgressAPI as API, useProgressAPI as useAPI };

// Component.

/**
 * 時間のかかる処理の進捗を表示するコンポーネントです。
 *
 * `value` に `null` を指定すると不確定状態になります。
 */
export const Progress: IProgress = (props) => {
  const api = useProgressAPI(props);
  const labelProps = api.getLabelProps();
  const valueProps = api.getValueProps();

  return (
    <ProgressRoot {...api.getRootProps()}>
      {labelProps && <ProgressLabel {...labelProps} />}
      {valueProps && <ProgressValue {...valueProps} />}
      <ProgressTrack {...api.getTrackProps()}>
        <ProgressIndicator {...api.getIndicatorProps()} />
      </ProgressTrack>
    </ProgressRoot>
  );
};

export namespace Progress {
  export type State = ProgressState;

  export type Props = ProgressProps;

  export type SlotProps = ProgressSlotProps;

  export type Color = ProgressColor;

  export type Radius = ProgressRadius;

  export type Size = ProgressSize;

  export type Status = ProgressStatus;

  export type Variant = ProgressVariant;
}
